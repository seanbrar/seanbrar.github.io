---
layout: page
title: chromaroute
description: Provider-agnostic embedding infrastructure for ChromaDB with intelligent fallback
img: assets/img/projects/chromaroute-thumbnail.png
importance: 4
category: [ml infrastructure]
---

## Summary

chromaroute is a Python library that abstracts embedding provider complexity for ChromaDB applications. It provides drop-in `EmbeddingFunction` implementations with automatic fallback from cloud providers (OpenRouter) to local models (SentenceTransformers), enabling seamless development and production deployments without provider lock-in.

The library emerged from my work on [ContextRAG](/projects/contextrag/), where I needed reliable embedding infrastructure that could gracefully handle API failures, work offline during development, and integrate cleanly with ChromaDB's persistence model. Rather than copy that code into future projects, I extracted, refined, and published it as a standalone package [on PyPI](https://pypi.org/project/chromaroute/).

## Motivation

Building RAG systems involves a recurring infrastructure problem: embedding providers are unreliable (rate limits, outages, API changes), switching between development and production environments requires code changes, and ChromaDB's embedding function interface has specific requirements for persistence that are easy to get wrong.

The typical workarounds - hardcoded API keys, manual fallback logic, environment-specific code paths - create fragile systems that break at inconvenient times. I wanted infrastructure that would:

1. **Just work** in development (no API key required)
2. **Gracefully degrade** when cloud providers fail
3. **Integrate correctly** with ChromaDB's persistence model
4. **Provide actionable errors** when things go wrong

chromaroute addresses these requirements through an opinionated design with intentional escape hatches.

## Design Philosophy

The library is optimized for a specific workflow: OpenRouter as the primary provider (for its model routing and cost efficiency), with local SentenceTransformers as an automatic fallback. This isn't the only way to do embeddings, but it's a good default that covers most use cases.

**Opinionated defaults, escape hatches for edge cases.** The `build_embedding_function()` factory does the right thing automatically: detecting available providers, loading configuration from environment variables, and returning a working embedding function. For users who need more control, direct instantiation of `OpenRouterEmbeddingFunction` exposes all parameters.

```python
# The common case: auto-detection handles everything
from chromaroute import build_embedding_function
embed_fn = build_embedding_function()

# The escape hatch: full control when needed
from chromaroute import OpenRouterEmbeddingFunction
embed_fn = OpenRouterEmbeddingFunction(
    model="openai/text-embedding-3-small",
    api_key="sk-or-...",
    provider={"order": ["openai", "azure"], "allow_fallbacks": True},
)
```

**Production-ready error handling.** API failures shouldn't require reading stack traces to diagnose. chromaroute maps HTTP status codes to actionable suggestions:

| Status | Hint |
| ------ | ---- |
| 401 | "Verify OPENROUTER_API_KEY" |
| 402 | "Check OpenRouter credits" |
| 404 | "Verify OPENROUTER_EMBEDDINGS_MODEL" |
| 429 | "Rate limit exceeded; retry later" |
| 529 | "Provider overloaded; consider allow_fallbacks" |

The library also detects common configuration mistakes, like using a third-party API key with OpenRouter without registering it as a BYOK integration.

## Technical Architecture

chromaroute is organized into three focused modules:

**`config.py`** — Configuration management via a frozen dataclass (`EmbedConfig`) with environment variable loading. The `resolve_provider()` and `resolve_model()` methods implement the fallback logic, keeping decision-making centralized and testable.

**`embedding.py`** — The core `OpenRouterEmbeddingFunction` class implementing ChromaDB's `EmbeddingFunction` protocol. It includes retry logic with exponential backoff, proper request/response handling, and - critically - the `build_from_config()` and `get_config()` methods required for ChromaDB persistence. Without these, collections using custom embedding functions can't be restored after restart.

**`vector_store.py`** — A high-level `VectorStore` wrapper providing simplified collection management with automatic batching. This is optional convenience for users who want less boilerplate.

```python
from chromaroute import VectorStore

store = VectorStore("my_docs", persist_path="./chroma_db")
store.add_documents(["doc1", "doc2", "doc3"])  # Auto-batched
results = store.query(["search term"], n_results=5)
```

The codebase follows strict engineering practices: full type annotations with a `py.typed` marker (PEP 561), strict mypy configuration, comprehensive linting via ruff, and CI through GitHub Actions.

## Connection to Broader Work

chromaroute powers the embedding layer in [ContextRAG](/projects/contextrag/), where it handles all vector store operations for the chunking strategy evaluation. The library will soon be integrated into [paperweight](/projects/paperweight/), replacing its current embedding implementation with a more robust foundation.

This pattern - extracting reusable infrastructure from research projects - reflects how I think about systems development. Research code tends to accumulate useful abstractions that deserve independent existence. By publishing chromaroute as a standalone library, I can iterate on the embedding infrastructure independently of the projects that use it, and other developers can benefit from the work.

The design decisions in chromaroute also informed my approach to provider abstraction in [Pollux](/projects/pollux/) (Google Summer of Code 2025 with Google DeepMind). While that project targets a different API and use case, the underlying philosophy — opinionated defaults, escape hatches, actionable errors — carries through.

## Limitations

chromaroute is intentionally focused:

- **OpenRouter-first**: Other providers (OpenAI direct, Azure, etc.) work via the base URL override, but aren't first-class citizens
- **ChromaDB-specific**: The embedding functions implement ChromaDB's interface, not a generic protocol
- **Two-provider fallback**: The chain is OpenRouter → Local; more complex routing isn't supported

These constraints are features, not bugs. A library that tries to support every provider and every vector database becomes a framework with its own learning curve. chromaroute solves one problem well.

## Conclusion

chromaroute demonstrates that focused infrastructure can meaningfully accelerate higher-level work. By handling provider fallback, environment configuration, and ChromaDB integration correctly once, I can build RAG applications without re-solving these problems each time.

The library is open source and available on [GitHub](https://github.com/seanbrar/chromaroute) and [PyPI](https://pypi.org/project/chromaroute/).

```bash
pip install chromaroute
```
