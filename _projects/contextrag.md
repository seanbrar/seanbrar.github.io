---
layout: page
title: ContextRAG
description: Empirical investigation of adaptive chunking strategies in retrieval-augmented generation
img: assets/img/projects/contextrag-thumbnail.png
importance: 2
category: [ml research]
---

## Summary

ContextRAG is an evaluation framework I built to answer a specific research question: **does adaptive chunking - routing documents to different chunk sizes based on length - improve retrieval accuracy in RAG systems?**

The intuition seemed sound: short documents lose context when chunked unnecessarily, while long documents benefit from finer granularity. I designed a controlled experiment to test this hypothesis.

**The finding**: Adaptive chunking provides no measurable improvement over uniform chunking. Both strategies achieve identical precision@5 and recall@5 on a mixed-domain corpus. This null result is itself informative, it suggests that modern embedding models (e.g., OpenAI's text-embedding-3-small) are robust to chunk boundary placement, simplifying RAG system design.

## Research Question

The hypothesis emerged from a reasonable intuition about semantic coherence:

| Document Length | Chunking Strategy | Rationale |
|-----------------|-------------------|-----------|
| Short (≤3,500 tokens) | No chunking | Preserve complete semantic context |
| Medium (3,500–15,000 tokens) | 2,000-token chunks | Balance coherence and retrieval granularity |
| Long (>15,000 tokens) | 1,000-token chunks | Enable fine-grained retrieval |

The underlying assumption was that chunk boundaries disrupt semantic units, and that "intelligent" boundary placement should improve retrieval quality. This assumption is common in RAG literature and practitioner discussions.

## Methodology

### Corpus

I constructed a mixed-domain evaluation corpus to test generalization across document types:

- **Technical documents** (7): IETF RFCs covering email formats, TLS 1.3, HTTP/1.1, HTTP/2, and YANG schema identifiers
- **Literary texts** (5): Classic short fiction (Poe, O. Henry, Gilman, Doyle) and the Gettysburg Address

Total: 12 documents, ~493,000 tokens, spanning all three length categories.

### Evaluation Protocol

- **Queries**: 60 factual retrieval questions (5 per document), each with a single ground-truth relevant document
- **Metrics**: Precision@5 and Recall@5
- **Runs**: 3 independent runs per strategy to assess variance
- **Embedding model**: OpenAI text-embedding-3-small
- **Baseline**: Uniform 1,000-token chunks (standard practice)
- **Treatment**: Adaptive chunking based on document length (router strategy)

The framework logs all artifacts (chunk counts, token distributions, costs) for reproducibility.

### Strategies Compared

```
Uniform (baseline):  All documents → 1,000-token chunks
Router (adaptive):   Short → no chunking | Medium → 2,000-token | Long → 1,000-token
```

## Results

| Strategy | Precision@5 | Recall@5 | Chunks | Variance |
|----------|-------------|----------|--------|----------|
| Uniform | 0.197 | 0.983 | 499 | 0 |
| Router | 0.197 | 0.983 | 490 | 0 |

**Both strategies achieve identical retrieval accuracy.** The router produces 1.8% fewer chunks, but this marginal efficiency gain does not translate to accuracy improvement. Results are deterministic across runs (zero variance), indicating the finding is not due to stochastic variation.

## Interpretation

This null result challenges a common assumption in RAG system design. Three implications:

1. **Embedding robustness**: Modern embedding models handle chunk boundaries well. The semantic information captured by text-embedding-3-small appears resilient to arbitrary segmentation, at least for the retrieval task measured here.

2. **Complexity cost**: Adaptive chunking adds routing logic, configuration parameters, and testing surface area. If it provides no accuracy benefit, uniform chunking is strictly preferable (simpler, fewer failure modes).

3. **Hypothesis refinement**: The original intuition conflated "semantic coherence" with "retrieval utility." A chunk can be semantically incomplete yet still contain sufficient signal for embedding-based retrieval. This distinction matters for future chunking research.

### Limitations

This study has clear boundaries:

- **Corpus size**: 12 documents, 60 queries. Sufficient for detecting large effects, but may miss subtle improvements.
- **Single embedding model**: Results may not generalize to older or smaller embedding models.
- **Retrieval-only evaluation**: Does not measure downstream generation quality (full RAG pipeline).
- **Fixed thresholds**: The length boundaries (3.5K, 15K tokens) were not tuned; different thresholds might yield different results.

These limitations are documented for transparency, not as caveats that undermine the finding. The result - no improvement with adaptive chunking - is clear within this experimental scope.

## Historical Context

This project originated in 2022–2023 when GPT-3.5 (4K context) was significantly cheaper than GPT-3.5-16K. The original motivation was cost-based model routing:

```python
# Original model selection logic (2022-2023)
if token_count <= 3500:
    model = ChatModels.GPT_3_5_TURBO_1106  # Cheaper, 4K context
elif token_count < 15000:
    model = ChatModels.GPT_3_5_TURBO_16K   # More expensive, 16K context
```

As context windows expanded (128K–2M tokens by 2024–2025), the cost-routing motivation became obsolete. The project evolved: first to chunking strategies, then to rigorous evaluation of those strategies.

The provider-agnostic embedding infrastructure developed during this work - automatic fallback chains, cost tracking, ChromaDB integration - has been extracted into [chromaroute](https://github.com/seanbrar/chromaroute), a standalone library [available on PyPI](https://pypi.org/project/chromaroute/).

## On Null Results

This project reinforced something I believe about research: **null results are results**.

A well-documented negative finding has value:
- It prevents others from pursuing unproductive approaches
- It requires (and demonstrates) rigorous methodology to be convincing
- It often reveals unexpected insights - here, the robustness of modern embeddings

The temptation with null results is to keep tweaking until something "works." I chose instead to document the finding honestly. The hypothesis was reasonable, the methodology was sound, and the result was clear. That's the output of research, whether or not it confirms the initial intuition.

## Connection to Further Work

Concepts from ContextRAG - context management, provider abstraction, cost-aware processing - informed my [Google Summer of Code 2025 project with Google DeepMind](https://github.com/seanbrar/gemini-batch-prediction), which focused on efficient multimodal inference pipelines.

## Future Directions

Given the null result on adaptive chunking, more promising directions include:

- **Semantic chunking**: Use model-based boundary detection (e.g., sentence embeddings, topic segmentation) rather than token counts. This addresses the hypothesis more directly than length-based routing.
- **Hybrid retrieval**: Combine dense embeddings with sparse methods (BM25) to leverage complementary signals.
- **Downstream evaluation**: Measure generation quality, not just retrieval accuracy, to capture effects that retrieval metrics miss.
- **Benchmark expansion**: Evaluate on standard IR datasets (BEIR, MTEB) for broader validation.

## Conclusion

ContextRAG tested whether adaptive chunking improves retrieval accuracy in RAG systems. The answer, based on controlled evaluation, is **no**:modern embedding models are robust to chunk boundary placement, and uniform chunking performs equally well with less complexity.

This negative result simplifies RAG system design decisions and suggests that chunking research should focus elsewhere (semantic boundaries, hybrid retrieval) rather than document-length heuristics.

The project is open source: [GitHub](https://github.com/seanbrar/ContextRAG).
