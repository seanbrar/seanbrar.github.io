---
layout: page
title: Pollux
description: Multimodal LLM orchestration with deterministic caching and concurrent correctness guarantees
img: assets/img/projects/pollux-thumbnail.png
importance: 1
category: [ml infrastructure]
---

## The Waste Problem

If you ask an AI ten questions about the same hour-long video, most approaches send the entire video with each question. That's roughly 9.5 million input tokens, of which about 8.5 million are redundant: the same content, transmitted ten times.

The fix is conceptually simple: upload the video once, cache it, and reference the cache for each question. On a fan-out workload (one source, many prompts), this cuts token usage by about 90%. The savings scale with every additional question. The same principle extends to fan-in (many sources, one prompt) and broadcast (many sources × many prompts) patterns.

Pollux is built around this: calling an LLM ten times without paying ten times.

## How I Got Here

Google Summer of Code 2025 wasn't on my radar until it suddenly was, with only a few weeks left to submit proposals. I was taking two summer classes, which limited me to medium-sized projects, and I was drawn to DeepMind, probably the most competitive organization in the program.

DeepMind had posted a list of suggested project ideas. The one that caught my attention was "Batch Prediction with Long Context and Context Caching Code Sample." The premise was constrained: write example code showing how to use Gemini's Batch API with multimodal inputs. A video, some prompts, a few scripts.

I saw the fan-out pattern underneath that suggestion. The Batch API prioritizes throughput, but what interested me was a framework for leveraging Gemini's multimodal capabilities to integrate research on fan-out prompting with extremely efficient token economics. My proposal took the idea in that direction: not code samples, but a library.

Looking back, the proposal tried to include too many features. The project would have been better served with a tighter scope. But the core idea was right, and I'm still proud of how the proposal turned out.

## Three Problems Without Obvious Solutions

The fan-out pattern, caching content and reusing it, creates specific engineering problems when you need it to work reliably.

**Cache identity.** What uniquely identifies a cached entry? The naive answer is the file path, but that breaks immediately: the same file copied to two locations creates duplicate cache entries for identical content, and the same path after an edit incorrectly serves stale results. Pollux uses content-hash caching: the key is a SHA-256 of the model, system instruction, and each source's content hash. Same content, same key, regardless of where the file lives. An earlier version used file identifiers and size, which caused exactly the collision bugs you'd predict.

**Concurrent coordination.** When ten prompts fan out over the same video, all ten coroutines need that video uploaded and cached. Without coordination, all ten independently do the upload: ten duplicates, ten times the cost. Pollux uses single-flight deduplication: the first coroutine to request a given key does the actual work, and all others share that single Future. When the work completes, everyone gets the same result. If it fails, everyone gets the same exception. This eliminates N-1 redundant API calls in any fan-out.

**Failure semantics.** When should a failed operation be retried? A `generate()` call is idempotent, so retry is always safe. But `upload_file()` and `create_cache()` are side effects. If the request reached the server but the response was lost, the operation may have already succeeded. Retrying could create duplicate artifacts. Pollux separates retry policy into two categories: idempotent operations retry on any transient error, while side-effect operations only retry when the error is explicitly marked as safe to retry. Ambiguous failures are surfaced to the caller rather than silently duplicated. An LLM library that quietly creates duplicate cached contexts wastes money and causes subtle bugs downstream.

## The GSoC Build

I worked solo for the GSoC period, with mentorship from DeepMind for review, guidance, and advice. The project shipped with Jinja templates, automated semantic releases, a cookbook of recipes, and a full documentation site. I also built a custom telemetry system that became its own library (Nullscope, zero-overhead telemetry). By the end of GSoC, the project fulfilled everything in my proposal. The functionality was there.

But it was overbuilt. Around 15,000 lines of library code. Roughly 25,000 lines of documentation. Multi-provider support was theoretically possible (a user could build and inject their own provider) but no one would want to. The project worked. It also optimized for being impressive over being good.

## The Rebuild

I didn't want to archive the project as a GSoC artifact. I picked it back up in January, rebranded from `gemini-batch-prediction` to Pollux, a name that recalls the Gemini heritage while forming its own identity, and rebuilt the core.

2,500 lines of code, down from 15,000. About 25,000 lines of documentation removed. OpenAI went from "theoretically possible if you build and inject your own provider" to a first-class citizen with an official implementation. The public API is two async functions:

```python
result = await run_many(
    ["Summarize the methodology", "List the key findings"],
    sources=[Source.from_file("paper.pdf"), Source.from_youtube("...")],
    config=Config(provider="gemini", model="gemini-2.5-flash"),
)
```

The v0.9 architecture could do this too. The difference is everything underneath, and how much less of it there is. I'm much happier about the project's long-term maintainability, and I learned something I keep coming back to: the version that tries to be impressive and the version that tries to be good are rarely the same, and the gap between them is usually measured in lines of code you're willing to delete.

## Where It Stands

Pollux v1.0 shipped across 113+ merged PRs over 8.5 months. Two providers: Gemini with caching and uploads, OpenAI with uploads and structured output. 72 tests across 2,295 lines of test code (contract, integration, characterization, property-based, and mutation testing) sized to the consequence of failure rather than the size of the codebase, because bugs in caching logic waste money and bugs in retry logic create duplicates. Twelve cookbook recipes. CI across Python 3.10–3.14 with strict mypy and ruff. Full documentation at [polluxlib.dev](https://polluxlib.dev).

The project is open source: [GitHub](https://github.com/seanbrar/pollux) &#124; [PyPI](https://pypi.org/project/pollux-ai/) &#124; [Docs](https://polluxlib.dev)
