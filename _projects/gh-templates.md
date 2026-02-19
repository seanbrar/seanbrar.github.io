---
layout: page
title: gh-templates
description: Schema-constrained LLM extraction and validation across 3,746 GitHub repositories
img: assets/img/projects/gh-templates-thumbnail.png
importance: 3
category: [ml research]
---

## What It Does

gh-templates analyzes pull request template design patterns across 3,746 high-quality open source repositories. A seven-stage data pipeline discovers repos via BigQuery, collects templates through GitHub's GraphQL API, extracts structured features using Gemini, normalizes free-text into a 36-category taxonomy, and produces prevalence statistics with fork-tier stratification and correlation analysis. The final output is evidence-based recommendations for PR template design.

But the interesting part isn't the analysis — it's the **LLM output validation pipeline** underneath it.

## Pydantic as Extraction Contract

The core design decision: a single Pydantic schema (`PRTemplateFeatures`) serves as both the extraction specification *and* the validation contract. The field descriptions tell Gemini what to extract; the type annotations tell Pydantic what to accept. There is no gap between "what I asked the model to produce" and "what I check the model actually produced."

```python
class PRTemplateFeatures(BaseModel):
    has_checklist: bool = Field(description="Whether the template includes a checklist")
    checklist_topics: list[str] = Field(description="Topics covered in checklists")
    has_description_section: bool = Field(description="Whether there is a section for PR description")
    # ... 13 more fields
```

This schema is passed directly to Gemini's `response_schema` parameter, which enforces structured JSON output. Every response is then validated through Pydantic's model constructor. If the model produces JSON that doesn't conform — wrong types, missing fields, values outside constraints — the validation catches it before the data enters the pipeline.

Across 3,746 extractions, this pipeline achieved a **99.97% success rate** — one failure, caused by a Gemini hallucination that produced valid JSON with semantically wrong content that passed schema validation but failed a downstream consistency check.

## Error Taxonomy

The pipeline processes thousands of repositories, and things fail. The question is: which failures are worth retrying?

Every error is classified as **transient** (network timeout, rate limit, temporary API error) or **permanent** (repository deleted, template unparseable, GraphQL permission denied). Transient failures stay in the retry queue; permanent failures are logged and skipped. Processing is resumable: each stage writes progress to disk, so a crashed run picks up where it left off.

This taxonomy exists because the alternative — retrying everything, or retrying nothing — either wastes API calls on permanently broken repos or abandons repositories that would succeed on a second attempt. The classification is simple, but it's the kind of distinction that determines whether a 3,746-repo pipeline completes overnight or requires babysitting.

## What the Data Showed

The statistical analysis found that PR templates follow clear patterns stratified by project size. The 822 largest projects (1,000+ forks) converge on specific practices — description sections, testing checklists, change-type categorization — while smaller projects show more variation. Feature correlations were computed as phi coefficients and point-biserial correlations with Benjamini-Hochberg FDR correction across 88 feature pairs.

The practical output: I revised the PR template for [Pollux](/projects/pollux/) based on tier-4 prevalence data, adding sections and checklist items that the evidence showed large projects consistently use.

## Connection to Other Work

gh-templates is fundamentally an LLM output validation pipeline. The core loop — schema-constrained extraction → Pydantic validation → error classification → retry-or-skip — is a lightweight V&V pattern for generative model outputs. The `compare_extractions.py` script diffs two extraction runs field-by-field to measure LLM sensitivity to temperature, functioning as a small evaluation harness.

Where [ContextRAG](/projects/contextrag/) asks "does this retrieval system modification produce different results?" using formal statistical methods, gh-templates asks "does this LLM extraction conform to its specification?" using schema contracts. Different mechanism, same underlying question: can you trust the output?

The project is open source: [GitHub](https://github.com/seanbrar/gh-templates)
