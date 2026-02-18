---
layout: page
title: Pollux
description: Multimodal LLM orchestration with deterministic caching and concurrent correctness guarantees
img: assets/img/projects/project-placeholder.png
importance: 1
category: [ml infrastructure]
---

## What Pollux Does

Pollux is a multimodal orchestration library for LLM APIs. You describe what to analyze — PDFs, images, video, YouTube URLs, arXiv papers — and Pollux handles source patterns, context caching, and concurrent execution. The public API is two async functions:

```python
result = await run_many(
    ["Summarize the methodology", "List the key findings"],
    sources=[Source.from_file("paper.pdf"), Source.from_youtube("...")],
    config=Config(provider="gemini", model="gemini-2.5-flash"),
)
```

Behind this call, four things happen in sequence: inputs are normalized into a frozen `Request`, a `Plan` computes cache keys from content hashes, the execution phase handles file uploads and API calls with concurrency control, and the extraction phase parses responses into a typed `ResultEnvelope`. This pipeline looks straightforward. The complexity is in three specific problems that don't have obvious solutions.

I built Pollux as my [Google Summer of Code 2025](https://summerofcode.withgoogle.com/) project with Google DeepMind. It started as a batch prediction framework for Gemini and shipped v1.0 eight months later as a provider-agnostic library supporting both Gemini and OpenAI, published on [PyPI](https://pypi.org/project/pollux-ai/) with full documentation at [polluxlib.dev](https://polluxlib.dev).

## Three Hard Problems

### Cache Identity

When multiple prompts share the same sources (a video, a set of PDFs), you want to cache that context once and reuse it across all prompts. The question is: *what identifies a cache entry?*

The naive answer is the file path. But that breaks immediately — the same file copied to two locations creates two cache entries for identical content, and the same path after an edit would incorrectly serve stale results.

Pollux uses **content-hash caching**: the cache key is a SHA-256 digest of the model name, the system instruction, and each source's content hash (itself a SHA-256 of the raw bytes). Same content, same key, regardless of path or filename. Different content, different key, even at the same path.

This sounds obvious in hindsight. An earlier version used file identifiers and size, which caused exactly the collision bugs you'd expect. The fix was to make cache identity a pure function of content.

On fan-out workloads — say, a one-hour video with 10 different analysis prompts — this reduces token usage from ~9.5M to ~950K. That's where the 90% cost reduction comes from. The savings scale with how much context is shared across prompts.

### Concurrent Correctness

When Pollux fans out 10 prompts over the same video, all 10 coroutines need that video uploaded and its context cache created. Without coordination, all 10 would independently upload the same file and create the same cache — 10 duplicate uploads, 10 duplicate cache entries, 10x the cost.

The solution is **single-flight deduplication**: a generic async primitive where the first coroutine to request a given key does the actual work (upload or cache creation), and all concurrent coroutines requesting the same key share that single `Future`. When the work completes, all waiters unblock with the same result. If it fails, all waiters receive the same exception.

The implementation uses double-checked locking with an `asyncio.Lock`: check the cache, acquire the lock, re-check (someone may have completed while you waited), then either await an in-flight `Future` or create a new one. It's the same pattern as Go's `singleflight` package, adapted for asyncio.

This eliminates N-1 duplicate API calls in any fan-out pattern.

### Failure Semantics

When should Pollux retry a failed operation?

The obvious answer — retry on transient errors — is incomplete. A `generate()` call is idempotent: retrying it is always safe; the worst case is a duplicate answer you discard. But a `create_cache()` or `upload_file()` call is a side effect. If the request reached the server but the response was lost (a timeout, a connection reset), the operation may have already succeeded. Retrying it could create a duplicate artifact.

Pollux separates retry policy into two predicates: `should_retry_generate()` retries on any transient error (including raw network exceptions like timeouts), while `should_retry_side_effect()` only retries errors where the `APIError` is explicitly marked `retryable` — meaning Pollux is confident the operation didn't complete. Ambiguous failures on side effects are surfaced to the caller rather than silently duplicated.

This distinction matters in production. An LLM orchestration library that quietly creates duplicate cached contexts wastes money and can cause subtle bugs downstream. The retry-policy separation makes failure handling explicit rather than hopeful.

## Fault Attribution

Pollux's exceptions aren't just error messages — they carry operational metadata. Every `APIError` includes: `retryable` (bool), `status_code`, `retry_after_s` (parsed from HTTP headers or Google's protobuf `RetryInfo`), `provider` (which backend failed), `phase` (which pipeline stage: `"upload"`, `"cache"`, `"generate"`), and `call_idx` (which prompt in a fan-out). All exceptions also carry an optional `hint` with a human-readable suggestion.

When a fan-out of 10 prompts has one failure on prompt #7 during the generate phase, the error tells you exactly what failed, where, and whether it's worth retrying. In a pipeline making multiple concurrent API calls, this level of fault attribution is the difference between debugging and guessing.

## Verification

The library has 72 tests across 2,295 lines of test code, organized by concern: **contract tests** verify architectural invariants (the pipeline produces valid envelopes, providers conform to the Protocol, errors carry required metadata); **integration tests** exercise cross-component flows (full `run_many()` calls through mock providers, caching roundtrips, concurrent deduplication); **characterization tests** capture golden outputs as YAML fixtures and fail on unexpected changes; **property-based tests** (Hypothesis) generate random inputs to verify pipeline invariants across the input space; and **mutation testing** (mutmut) injects faults into source code and verifies the test suite catches them.

This might seem like a lot of verification for ~2,600 lines of library code. The reason is that the library touches money (API costs) and correctness (duplicate artifacts, lost responses). A bug in the caching logic wastes tokens. A bug in the retry logic creates duplicates. A bug in the single-flight dedup means concurrent requests silently diverge. The test suite is sized to the consequence of failure, not the size of the codebase.

## The Numbers

Pollux v1.0 shipped across **113+ merged PRs** over 8.5 months of development. The library is **2,597 lines** across 19 modules, supporting **2 providers** (Gemini with caching and uploads; OpenAI with uploads and structured output). It includes **12 runnable cookbook recipes**, a CI matrix across **Python 3.10–3.14** with strict mypy and ruff (25+ rule families including bandit security checks), and full documentation at [polluxlib.dev](https://polluxlib.dev).

The project is open source: [GitHub](https://github.com/seanbrar/pollux) &#124; [PyPI](https://pypi.org/project/pollux-ai/) &#124; [Docs](https://polluxlib.dev)
