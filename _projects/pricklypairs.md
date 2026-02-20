---
layout: page
title: Prickly Pairs
description: Personal study tool using GPT-4 to enrich flashcard answers
img: assets/img/projects/prickly-pairs-thumbnail.png
importance: 7
category: [personal tools]
---

## Three Exams in 30 Days

I needed to pass the CompTIA A+ (both cores) and Network+ exams, and I'd given myself a month. The study materials had thousands of question-answer pairs, but the answers were minimal: "What are the three basic LAN topologies?" → "Bus, ring, and star." Fine for recall, useless for understanding *why* or *when* each one matters, which is what the exams actually test.

Manually enriching thousands of flashcards would take longer than just studying the material. So I automated it.

## The Tool

Prickly Pairs takes existing question-answer pairs and sends each one to GPT-4 with a prompt asking for a brief explanation, comparisons to related concepts, and practical context relevant to the exam. The enriched answers are formatted and exported to Anki for spaced repetition.

**Example:**

| Before | After |
|--------|-------|
| Q: What are the three basic LAN topologies? | Q: What are the three basic LAN topologies? |
| A: Bus, ring, and star | A: Bus, ring, and star. **Bus**: all devices on one cable, simple but doesn't scale. **Ring**: circular, efficient but single point of failure breaks the network. **Star**: central switch/hub, most common today because failed nodes don't affect others. Star is the default choice for modern LANs. |

I processed about 2,400 questions from various study guides and practice tests. The enhanced flashcards helped me pass all three exams on the first attempt within the month.

## Limitations

This was a personal productivity tool, not a polished product. The prompt is tuned specifically for CompTIA content, there's no verification of GPT-4's explanations, and the source materials can't be shared due to copyright. The code isn't public.

It solved my problem well. Whether it generalizes beyond that use case would require more work to determine.
