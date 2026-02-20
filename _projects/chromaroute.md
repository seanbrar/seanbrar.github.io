---
layout: page
title: chromaroute
description: Provider-agnostic embedding infrastructure for ChromaDB with intelligent fallback
img: assets/img/projects/chromaroute-thumbnail.png
importance: 4
category: [ml infrastructure]
---

## Writing the Same Code Twice

OpenRouter has no built-in adapter for ChromaDB. When I needed embeddings for [ContextRAG](/projects/contextrag/), I wrote one inline: OpenRouter as the primary provider, SentenceTransformers as a local fallback for development and API outages, with the fallback logic, error handling, and ChromaDB integration all living inside the project.

Then I started building similar functionality for [paperweight](/projects/paperweight/). Same provider, same vector store, same fallback pattern. Writing the same adapter a second time felt like a signal that this code didn't belong inside either project.

chromaroute is what I pulled out. It's a small, opinionated library: OpenRouter for cloud embeddings, SentenceTransformers for local fallback, ChromaDB as the vector store. That's it. There are escape hatches for custom setups (you can override the base URL, bring your own API key configuration, use a different model) but those are supported on a best-effort basis. The library solves one problem well rather than trying to be an abstraction over every provider and every vector database.

## What Made It Worth Extracting

The ChromaDB integration has specific requirements that are easy to get wrong. Custom embedding functions need `build_from_config()` and `get_config()` methods to work with ChromaDB's persistence model. Without them, collections using your embedding function can't be restored after a restart. Getting this right once, in a tested library, is meaningfully better than getting it right (or wrong) in every project that needs embeddings.

The same applies to the error handling. API failures map to actionable suggestions: a 401 means "verify your API key," a 402 means "check your credits," a 529 means "provider overloaded, consider enabling fallbacks." These aren't complex, but they're the kind of thing you don't bother implementing when the adapter is inline code in a larger project. As a standalone library, the cost of doing it properly is low and the payoff compounds across everything that depends on it.

## Smaller Pieces, Better Focus

chromaroute was, in some ways, the start of a pattern. Pulling this code out of ContextRAG and giving it its own repository, its own tests, its own release cycle was the first time I experienced how much easier it is to make something functional and reliable when it's separated from the project that spawned it. Inside ContextRAG, this was supporting infrastructure. Good enough, not a priority. As its own library, it became the thing I was focused on, and the quality reflected that.

The same pattern repeated later: Nullscope (zero-overhead telemetry) came out of [Pollux](/projects/pollux/) the same way. I expect it to keep happening. The lesson isn't "extract everything into libraries." It's that when you notice yourself writing the same code in two places, the duplication is telling you something about where the natural boundaries are.

The library is open source: [GitHub](https://github.com/seanbrar/chromaroute) &#124; [PyPI](https://pypi.org/project/chromaroute/)
