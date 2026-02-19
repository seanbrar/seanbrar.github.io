---
layout: page
title: ContextRAG
description: Evaluation framework for RAG chunking strategies with formal statistical validation
img: assets/img/projects/contextrag-thumbnail.png
importance: 2
category: [ml research]
---

## The More Expensive Model Was Frequently Dumber

In 2022, I was building a RAG tool for internal documentation, the kind where someone asks "how do I configure X?" and the system finds the relevant docs and answers the question. GPT-3.5 came in two flavors: a 4K context window at one price, and a 16K context window at roughly double. The obvious move was to use the bigger window when documents were long and save money on the shorter ones.

But cost wasn't the real issue. The 16K model had a different performance profile. It was frequently, but not always, worse than its 4K counterpart. For a RAG application, where the answer depends more on having the right context than on raw model intelligence, this mattered. Routing short, specific questions to the cheaper, often-smarter model wasn't just an optimization. It was often the better answer.

The tool was ambitious in other ways too. It had an "edit the docs" mode: if the system told you something wrong, you could correct it inline, and it would propagate the fix back to the source documentation. This worked in theory. In practice, it required a level of subtle, contextual understanding that early models couldn't deliver, and I didn't yet know enough about building TUIs to make the interaction feel right. I knew much less then.

## Context Windows Grew

Context windows grew, but not all at once. GPT-4 brought 32K tokens, which sounds like a big jump from 16K, but very few single-turn RAG interactions were constrained by 16K and not 32K. The routing logic still made sense. Costs were higher with GPT-4 for debatable additional performance on retrieval tasks, so the cheaper model routing remained practical.

Then Gemini launched with a million-token context window.

I came back to this project after finishing my GSoC work on [Pollux](/projects/pollux/), and the mismatch was obvious. I'd been carefully routing between 4K and 16K context limits while the industry had moved to windows large enough to hold a novel. The original premise, that context window size was a constraint worth optimizing around, had evaporated.

## A Better Question

But one piece survived. If you're building a RAG system, you're chunking documents regardless of context window size. And the intuition behind my original routing logic still seemed sound in a different form: short documents lose context when chunked unnecessarily, long documents benefit from finer granularity. A length-aware chunking strategy should outperform a uniform one.

Should. The word "should" was doing a lot of work there. I decided to actually find out.

## Building the Evaluation

Testing whether two approaches perform *differently* is straightforward: run a significance test, reject the null hypothesis. But I wasn't trying to show that adaptive chunking was better. I was trying to determine whether it was better *or* equivalent, and those are very different statistical claims. A non-significant difference doesn't prove equivalence. It might just mean you lack statistical power.

This is why ContextRAG uses TOST (two one-sided tests) equivalence testing. The idea comes from clinical trials: when you need to prove a generic drug works the same as the branded version, you can't just fail to find a difference. You have to preregister an equivalence margin and demonstrate that the observed difference falls within it with statistical confidence. The burden of proof is on equivalence, not just the absence of difference.

I preregistered a margin of 0.02 nDCG: roughly, if the two approaches differ by less than 2% in ranking quality, they're equivalent for practical purposes. The evaluation harness computes 7 retrieval metrics per query across 4 retrieval modes (dense, BM25, hybrid, and dense with reranking), with bootstrap confidence intervals, paired randomization tests, and Holm-Bonferroni correction for multiple comparisons. When you're computing 7 metrics across multiple datasets, controlling for false positives isn't optional. It's the difference between a defensible finding and accidentally p-hacking yourself.

Every experiment run emits a reproducibility manifest: git SHA, dependency versions, dataset fingerprints, config hash. There's no way to generate results without generating the manifest alongside them. Sixty-plus runs across three datasets are archived this way.

## The Answer

No. Adaptive chunking is statistically equivalent to uniform chunking within the preregistered margin. On the expanded evaluation set at k=5, uniform chunking actually achieved slightly higher recall (0.835 vs 0.785). Across all three datasets, the equivalence hypothesis held.

## What I Actually Think

I believe that result is accurate for the datasets I used. I'm less convinced the conclusion generalizes.

My suspicion (and I'll be upfront that this is expectation, not evidence) is that on a larger, more realistic dataset, adaptive chunking would show a meaningful advantage. The datasets I tested against may not have enough variation in document length and complexity to surface the difference. Modern embedding models are remarkably robust to chunk boundary placement, which is what the data shows. But "robust across these three datasets" is a narrower claim than "robust in general."

This is something I want to revisit. I'm not very experienced with building datasets and benchmarks, and I think the quality of the evaluation is only as good as the data it runs on. The statistical methodology is sound. The open question is whether I was measuring the right thing on the right corpus.

I chose to report the finding as-is rather than keep tweaking until I got the result I expected. That felt important. But I also don't want to overstate the conclusion. The data says equivalent, my instinct says otherwise, and resolving that tension requires better data than I currently have.

## What Fell Out

The embedding infrastructure I built for ContextRAG turned out to be useful on its own: provider fallback, environment configuration, ChromaDB integration. I extracted it into [chromaroute](/projects/chromaroute/), a standalone library on [PyPI](https://pypi.org/project/chromaroute/). ContextRAG now depends on chromaroute for embeddings and keeps only the evaluation logic.

The evaluation methodology (preregistered margins, equivalence testing, reproducibility manifests) informed how I approached verification in later projects. Building the harness to answer one question taught me how to build harnesses in general.

The project is open source: [GitHub](https://github.com/seanbrar/ContextRAG)
