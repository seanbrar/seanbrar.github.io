---
layout: page
title: Prickly Pairs
description: Personal study tool using GPT-4 to enrich flashcard answers
img: assets/img/projects/prickly-pairs-thumbnail.png
importance: 7
category: [personal tools]
---

## Overview

Prickly Pairs is a personal tool I built to help me study for CompTIA certifications. It uses GPT-4 to transform bare question-answer pairs into flashcards with richer context—explanations, comparisons, and related concepts that help with understanding rather than just memorization.

I used it to pass the CompTIA A+ (both cores) and Network+ exams in 30 days.

## The Problem

Study materials for IT certifications often provide minimal answers: "What are the three basic LAN topologies?" → "Bus, ring, and star." This is fine for recall, but doesn't help you understand *why* or *when* each topology matters—which is what the exams actually test.

Manually enriching thousands of flashcards would take longer than just studying the material directly. I wanted to automate that enrichment.

## How It Works

The tool takes existing question-answer pairs and sends each one to GPT-4 with a prompt that asks for:
- A brief explanation of the concept
- Comparisons to related concepts
- Practical context relevant to the exam

The enhanced answers are then formatted and exported to Anki for spaced repetition study.

**Example transformation:**

| Before | After |
|--------|-------|
| Q: What are the three basic LAN topologies? | Q: What are the three basic LAN topologies? |
| A: Bus, ring, and star | A: Bus, ring, and star. **Bus**: all devices on one cable, simple but doesn't scale. **Ring**: circular, efficient but single point of failure breaks the network. **Star**: central switch/hub, most common today because failed nodes don't affect others. Star is the default choice for modern LANs. |

## Results

I processed about 2,400 questions from various study guides and practice tests. The enhanced flashcards helped me pass all three exams on the first attempt within a month of starting to study.

## Limitations

This was a personal productivity tool, not a polished product. The prompt is tuned specifically for CompTIA content, there's no verification of GPT-4's explanations, and the source materials can't be shared due to copyright.

It solved my problem well. Whether it generalizes beyond that use case would require more work to determine.
