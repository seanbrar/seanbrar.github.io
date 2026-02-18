---
layout: page
title: paperweight
description: Automated arXiv paper discovery and triage with configurable research interest profiles
img: assets/img/projects/paperweight-thumbnail.png
importance: 5
category: [research tooling]
---

## What It Does

paperweight is a CLI tool that fetches recent arXiv papers, scores them against configurable research interests, optionally summarizes the top matches with an LLM, and delivers a ranked digest via stdout, JSON, Atom feed, or email. It solves the daily "keep up with papers" problem: what used to take 30–60 minutes of manual browsing becomes 5–10 minutes of reviewing pre-filtered results.

The tool is published on [PyPI](https://pypi.org/project/academic-paperweight/) and runs as a daily cron job for my own research tracking.

## Design Decisions

**RSS-first routing.** For daily fetches (the common case), paperweight hits arXiv's RSS feed rather than its API. RSS responses are sub-second and have no rate limits. The API is a fallback for multi-day windows or when RSS doesn't cover a category. This means the tool stays fast and polite to arXiv's infrastructure without user configuration.

**Batched API queries.** When the API fallback is needed, paperweight batches categories into a single query (`cat:cs.AI OR cat:cs.CL`) rather than issuing one request per category. This reduces API calls linearly with the number of categories tracked.

**Logarithmic scoring with per-component caps.** The relevance scorer uses `log(count+1)` weighting with separate caps for title, abstract, and content matches, plus min-max normalization. This prevents a single section with many keyword hits from dominating the score — a paper with "reinforcement learning" in every paragraph shouldn't score dramatically higher than one with the term in the title and abstract.

**Retry at every external boundary.** arXiv's API, RSS feeds, and content downloads each have independent Tenacity retry strategies with exponential backoff. A transient failure fetching one paper's PDF doesn't block the rest of the pipeline.

## Testing Infrastructure

The testing approach is the most interesting engineering decision in the project. paperweight has a ~1:1 test-to-source ratio (3,453 test lines across 15 test files for 3,500 lines of source), organized around a few key patterns:

**Golden-set validation.** A `MockArxivClient` backed by SQLite stores a curated set of known papers with known scores. Tests assert that specific papers score above threshold and rank in expected order. This catches regressions in the scoring algorithm without relying on live data.

**Offline integration testing.** The mock client enables full pipeline runs — fetch through delivery — without touching the network. Tests exercise the real pipeline code paths with deterministic data, which is harder to set up than mocking individual functions but catches integration bugs that unit tests miss.

**Network isolation verification.** A `TestNoNetworkCalls` suite patches `requests` at the module level and asserts zero network calls during offline test runs. This verifies that the mock infrastructure actually prevents network access rather than just happening not to make requests.

**`doctor --strict` as CI gate.** The CLI includes a self-diagnostic command that validates configuration (11 dedicated validation functions with specific error messages). Running it in strict mode serves as a CI gate — broken configs fail the build.

## Connection to Other Work

paperweight was my first project that took testing infrastructure seriously as a design concern rather than an afterthought. The golden-set validation pattern — known inputs with expected outputs, used as a regression safety net — later informed the characterization tests in [Pollux](/projects/pollux/) and the evaluation methodology in [ContextRAG](/projects/contextrag/). The `doctor --strict` pattern (self-diagnostic CLI as CI gate) appears in several of my subsequent projects.

The project is open source: [GitHub](https://github.com/seanbrar/paperweight) &#124; [PyPI](https://pypi.org/project/academic-paperweight/)
