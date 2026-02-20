---
layout: page
title: paperweight
description: Automated arXiv paper discovery and triage with configurable research interest profiles
img: assets/img/projects/paperweight-thumbnail.png
importance: 5
category: [research tooling]
---

## Why Would Someone Use This Over Just Checking the Website?

That's the question that drives every design decision in paperweight. arXiv is free, fast, and already organized by category. If the tool can't justify its existence against "just go to arxiv.org," it shouldn't exist.

The answer I've landed on: paperweight isn't for discovery. It's for triage. It fetches recent papers, filters them against your research interests, scores them by relevance, and produces a ranked digest you can read in minutes. The value isn't showing you papers you couldn't find yourself. It's cutting a 30-60 minute browsing session down to 5-10 minutes of reviewing a pre-filtered list, and producing output in formats (stdout, JSON, Atom) that plug into whatever workflow you already have.

## Learning What "Usable" Means

The original version was oriented around a daily email digest: paperweight runs on a cron job, queries arXiv, and sends you an email with the top matches. This sounds reasonable until you think about what it asks of the user. Setting up SMTP credentials in a config file is the kind of thing a developer will tolerate in their own tool and no one else will ever do.

After thinking about what it would take for paperweight to be simple, usable, and fast, I moved toward a different model: a scriptable CLI that does one thing and gets out of your way. `paperweight run` prints a ranked digest to stdout. If you want JSON for scripting, pass `--delivery json`. If you want an Atom feed, pass `--delivery atom`. Email is still there as an option, but it's not the primary interface. The primary interface is text you can pipe.

The first run backfills a week of papers automatically. After that, `paperweight run` fetches only what's new. No configuration required beyond `paperweight init` to generate defaults. The tool works without API keys. Heuristic triage and abstracts as summaries are the baseline, LLM-powered triage and summarization are opt-in upgrades.

This is still a work in progress. UX and interface are ongoing priorities, and there are improvements I want to make. But the direction feels right: give users information in a format they can build on, rather than trying to be the entire workflow.

## Design Decisions

A few design decisions that keep the tool fast and polite to arXiv's infrastructure:

Daily fetches hit arXiv's RSS feed rather than its API. RSS responses are sub-second and have no rate limits. The API is a fallback for multi-day windows or categories RSS doesn't cover. The relevance scorer uses logarithmic weighting with per-component caps, so a paper mentioning "reinforcement learning" in every paragraph doesn't score dramatically higher than one with the term in the title and abstract. Every external boundary (API, RSS, content downloads) has independent retry with exponential backoff, so a transient failure fetching one paper doesn't block the rest of the pipeline.

The testing infrastructure is disproportionately thorough for a tool this size, with roughly a 1:1 test-to-source ratio. A `MockArxivClient` backed by SQLite enables full pipeline runs offline with deterministic data. A network isolation suite patches `requests` at the module level and asserts zero network calls, verifying that the mocks actually prevent network access rather than just happening not to make requests. `paperweight doctor --strict` validates configuration and serves as a CI gate. This level of testing exists because the scoring algorithm is the kind of thing where regressions are subtle: a changed weight or a broken normalization quietly produces worse rankings without failing loudly.

The tool is published on [PyPI](https://pypi.org/project/academic-paperweight/) and runs as a daily cron job for my own research tracking.

The project is open source: [GitHub](https://github.com/seanbrar/paperweight) &#124; [PyPI](https://pypi.org/project/academic-paperweight/)
