---
layout: page
title: ContextRAG
description: Evaluation framework for RAG chunking strategies with formal statistical validation
img: assets/img/projects/contextrag-thumbnail.png
importance: 2
category: [ml research]
---

## The Question

Does adaptive chunking — routing documents to different chunk sizes based on length — improve retrieval quality in RAG systems?

The intuition seems sound: short documents lose context when chunked unnecessarily, while long documents benefit from finer granularity. A length-aware router should outperform a fixed-size strategy. I built ContextRAG to find out whether that intuition holds up under controlled evaluation.

**The answer is no.** Adaptive chunking is statistically equivalent to uniform chunking within a preregistered nDCG margin of 0.02, confirmed by TOST equivalence testing across three datasets. This null result is itself informative — it suggests that modern embedding models are robust to chunk boundary placement, which simplifies RAG system design considerably.

## The Evaluation Harness

ContextRAG is a CLI-driven evaluation pipeline that runs controlled experiments across datasets and applies formal statistical comparison to produce a defensible answer. A single `run_eval` call chains: document loading → token-level chunking via a strategy registry → embedding via [chromaroute](/projects/chromaroute/) → ChromaDB vector indexing → multi-modal retrieval → per-query metric calculation → artifact emission. A separate comparison layer loads paired per-query results and runs a full statistical inference suite.

The framework computes **7 retrieval metrics** per query: precision@k, recall@k, hit@k, hit@1, MRR@k, nDCG@k, and unique_doc_ratio@k. It supports four retrieval modes — dense, BM25 (implemented from scratch), hybrid via reciprocal rank fusion, and dense with token-overlap reranking — enabling comparison across retrieval approaches within a single evaluation framework.

## Why Statistical Rigor Matters Here

Showing that two systems perform *differently* is straightforward: run a significance test, reject the null. Showing that two systems perform *equivalently* is a harder claim. A non-significant difference doesn't prove equivalence — it might just mean you lack statistical power.

This is why ContextRAG uses **TOST (two one-sided tests) equivalence testing** rather than standard significance testing. TOST requires you to preregister an equivalence margin (here, 0.02 nDCG) and demonstrate that the observed difference falls within that margin with statistical confidence. It's the methodology used in clinical trials when you need to prove a generic drug works the same as the branded version — the burden of proof is on equivalence, not difference.

The statistical suite also includes bootstrap confidence intervals, paired randomization tests, Cohen's d and Cliff's delta effect sizes, and **Holm-Bonferroni correction** for multiple comparisons. When you're computing 7 metrics across multiple datasets, controlling Type I error isn't optional — it's the difference between a defensible finding and a p-hacking exercise.

## Reproducibility

Every experiment run emits a **reproducibility manifest** capturing the git SHA, dependency versions, dataset SHA-256 fingerprints, and config hash. This means any result can be traced back to the exact code, data, and configuration that produced it. The framework enforces this: there is no way to generate results without generating a manifest alongside them.

All configuration flows through frozen dataclasses with YAML experiment configs validated before execution — type coercion, range checking, and accumulated error reporting. An experiment matrix runner orchestrates baseline × k sweeps across datasets and generates aggregate comparison dashboards.

60+ experiment runs across 3 datasets (eval-expanded, eval-external, eval-scifact-mini) are archived with their manifests.

## Results

On eval-expanded at k=5, uniform chunking achieves recall@5 of 0.835 versus the router's 0.785 — the adaptive strategy performs *slightly worse*. Across all three datasets, the preregistered null hypothesis holds: adaptive ≈ uniform within the 0.02 nDCG equivalence margin.

This is a legitimate scientific finding, not an absence of results. The framework was designed to produce a defensible answer regardless of which direction the evidence pointed. It happened to point toward equivalence, which required more statistical machinery to support than a simple difference would have.

## Historical Context

This project originated in 2022–2023 when GPT-3.5 (4K context) was significantly cheaper than GPT-3.5-16K. The original motivation was cost-based model routing:

```python
# Original model selection logic (2022-2023)
if token_count <= 3500:
    model = ChatModels.GPT_3_5_TURBO_1106  # Cheaper, 4K context
elif token_count < 15000:
    model = ChatModels.GPT_3_5_TURBO_16K   # More expensive, 16K context
```

As context windows expanded (128K–2M tokens by 2024–2025), the cost-routing motivation became obsolete. The project evolved: first to chunking strategies, then to rigorous evaluation of those strategies. The provider-agnostic embedding infrastructure developed during this work was extracted into [chromaroute](https://github.com/seanbrar/chromaroute), a standalone library [available on PyPI](https://pypi.org/project/chromaroute/).

## On Null Results

This project reinforced something I believe about research: **null results are results**.

A well-documented negative finding has value:
- It prevents others from pursuing unproductive approaches
- It requires (and demonstrates) rigorous methodology to be convincing
- It often reveals unexpected insights — here, the robustness of modern embeddings

The temptation with null results is to keep tweaking until something "works." I chose instead to document the finding honestly. The hypothesis was reasonable, the methodology was sound, and the result was clear. That's the output of research, whether or not it confirms the initial intuition.

## Connection to Other Work

ContextRAG is an evaluation harness — it measures whether a system modification produces measurably different outputs using preregistered endpoints, equivalence margins, and formal statistical tests. This is the same fundamental question that runs through my other work: [Pollux](/projects/pollux/) ensures infrastructure-level correctness (deterministic caching, idempotent retries), and [gh-templates](https://github.com/seanbrar/gh-templates) validates that LLM extractions conform to a schema. ContextRAG asks the evaluation version of that question: does this change actually make the system better, and can you prove it?

The project is open source: [GitHub](https://github.com/seanbrar/ContextRAG)
