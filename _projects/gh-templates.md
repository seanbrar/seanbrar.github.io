---
layout: page
title: gh-templates
description: Schema-constrained LLM extraction and validation across 3,746 GitHub repositories
img: assets/img/projects/gh-templates-thumbnail.png
importance: 3
category: [ml research]
---

## I Had No Idea What a Good PR Template Looks Like

While working on [Pollux](/projects/pollux/)'s v1.0 release, I wanted to improve my pull request template. The existing one was minimal. The problem was that I had no intuition for what a good template actually contains: what to ask contributors for, what to leave out, how much friction is appropriate.

I could have looked at five or ten well-known projects and copied what seemed reasonable. But that gives you a handful of examples with no context for how representative they are. Is React's PR template popular because it's good, or just because it's React's? I wanted to understand the *patterns*: what well-maintained projects consistently converge on, and what's idiosyncratic.

So I analyzed 3,746 of them.

## The Pipeline

This is overkill for improving one PR template, and I'm aware of that. But the approach eliminates the limitations of the alternative: with thousands of repositories stratified by project maturity (10-fork projects vs. 1,000-fork projects), you can distinguish between what's genuinely common practice and what's one project's preference.

The pipeline has seven stages: BigQuery discovery finds ~36,000 repositories containing PR templates, quality filtering and deduplication narrow that to 3,747, GitHub's GraphQL API collects the templates, Gemini extracts structured features from each one, a normalization step maps free-form outputs to a 36-category taxonomy, and statistical analysis produces prevalence rates with fork-tier stratification and correlation analysis.

The feature extraction step is easy and cheap. Gemini's flash-lite model handles structured extraction at scale for almost nothing. The hard part is elsewhere.

## The Normalization Problem

When you ask an LLM to describe what a checklist item covers, you get free-form text. "Tests pass," "all tests passing," "CI is green," "test suite succeeds," and "ensure tests are not broken" all mean roughly the same thing. If you can't collapse these into a single category, your prevalence statistics are noise: you'll report five rare topics instead of one common one.

I left the checklist extraction deliberately non-deterministic. The Pydantic schema asks the model for 2-5 word topic descriptions rather than forcing it to pick from a predefined list. Low temperature and prompt engineering reduce variance, but they don't eliminate it. The tradeoff is intentional: constrained extraction would miss topics I hadn't anticipated, while free-form extraction captures everything at the cost of requiring normalization downstream.

The normalization itself is regex-based: pattern matching across hundreds of phrasings to map them to 36 canonical categories. Getting this right required many iterations. Coverage landed at 73.7% of ~14,000 raw topic mentions. The remaining 26.3% is dominated by singletons: project-specific language that no generic taxonomy would capture. Coverage in the 50s or 60s would have made any conclusions much more tenuous; the 70s felt like the point where the signal outweighed the noise.

A more robust approach (embeddings-based semantic matching, for instance) would improve coverage, but the regex approach was sufficient for this study and I was satisfied with where I ended up.

## What the Data Shows

PR templates converge more than you'd expect. Description sections, checklists, related issues, and testing evidence all exceed 64% prevalence in every project tier. The core four are remarkably stable regardless of project size.

The interesting variation is at the margins. Placeholder text (guidance within the template) increases with project maturity: 56% in small projects, 66% in 1,000+ fork projects. Larger projects invest more in guiding contributors through the process. Breaking changes sections go the other direction, from 23% to 16%, likely because mature projects handle breaking changes through separate processes like RFCs and changelogs.

The typical template is short: ~75 words, 3 sections, 4 checklist items. Two-thirds are medium friction (2-5 minutes to complete). Only 4% are high friction.

## The Practical Payoff

I used these findings to generate an improved PR template for Pollux. The [synthesis step](https://github.com/seanbrar/gh-templates/tree/main/synthesis) combined the aggregate data, six exemplar templates from tier-4 repos (vscode, react, bootstrap, among others), and my project's specific constraints. The result is a 4-section, 4-item template in the low-friction band, grounded in what the data says large projects converge on, with deliberate exclusions for features my tooling already handles (conventional commits encode change type, semantic-release generates the changelog, `make check` enforces code style).

I also collected CONTRIBUTING.md files and issue templates during the data collection step. The pipeline could be extended to those document types with an adapted extraction schema. The normalization infrastructure would transfer directly. I didn't pursue that here, since it would be a distraction from the project as a research artifact, but the foundation is there.

The project is open source: [GitHub](https://github.com/seanbrar/gh-templates)
