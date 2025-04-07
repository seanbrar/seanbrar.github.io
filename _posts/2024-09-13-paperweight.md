---
layout: post
title: paperweight - Research Tailored to You
date: 2024-09-13 11:00:00
description: Let paperweight push the latest papers to you.
tags: [technology, projects, artifical-intelligence]
categories: [paperweight, uncategorized]
thumbnail: assets/img/blog/introducing-paperweight-thumbnail.png
giscus_comments: true
related_posts: true
featured: true
---

### A Personal Academic Paper Assistant

What does it take to keep current with the latest research?

As someone who has tried to block out time to skim arXiv daily, it's not trivial to make sure nothing is mistakenly overlooked. Additionally, if there is a small range of topics I'd like to focus on, it becomes more difficult to effectively filter what I'm interested in from what I'm not. 

Recently, while I was mulling this over, it occurred to me: instead of finding the papers myself, I should make them find me instead. Wouldn't it be nice if every day I woke up, checked my email, and saw the exact papers published in the last day I would have hand-picked for myself?

**That's [paperweight](https://github.com/seanbrar/paperweight)**

### What is paperweight?

paperweight is a local Python program that provides custom-tailored recommendations of the latest research in the areas you care about. Whether your interests are in artificial intelligence, mathematics, biology, economics, or any other [category](https://arxiv.org/category_taxonomy) on arXiv, running paperweight will automatically collect, filter, and send a personalized selection to your inbox.

At its core, paperweight follows these steps:

1. Interacts with the arXiv API to discover new papers in your categories of interest
2. Scrapes the full text of each paper, handling different file types and data structures
3. Filters the scraped content based on your custom keywords and exclusion criteria, assigning relevance scores
4. Generates concise summaries of the most relevant papers using small LLM models (if enabled)
5. Delivers the top papers and summaries to your inbox based on your notification preferences

paperweight also uses a YAML config file to offer a range of customization options, including:
- Specifying your arXiv categories of interest 
- Defining custom keywords, exclusion criteria, and importance weights to fine-tune relevance scoring
- Adjusting the minimum relevance score threshold for paper recommendations
- Configuring email notification settings and sorting order

Whether you're a researcher, student, professor, or anyone passionate about staying current in rapidly evolving fields, paperweight can help you efficiently track the latest publications in your areas of interest.

While it's still in its initial release, I'm already using paperweight to give me recommendations for the latest research in artificial intelligence, natural language processing, machine learning, and information theory. I'm able to know which publications are most likely to interest me and peruse them during my morning tea.

### How it Works

The heart of paperweight is the configuration file. The project comes with an example that only needs a few tweaks to allow paperweight to run, but I highly encourage customizing its settings to match your preferences and interests.

From there, the system runs as described before. Depending on your settings, it may take a few minutes for the program to finish successfully; this may be especially true the first time it's run. paperweight keeps a log, so you'll be able to monitor its progress and quickly see if there are any issues.

The true power of paperweight lies in its customization and flexibility. Nearly every aspect, from the categories and keywords to the relevance scoring and notification frequency, can be tailored to your specific needs and interests.

Most importantly, I've tried to make it easy to use. With paperweight, you should be able to go from installation to configuration to your first round of personalized paper recommendations in a matter of minutes.

For those eager to dive into the technical details, stay tuned! I'll be publishing a deep-dive post on the development process and inner workings of paperweight right here on this blog soon.

### Getting Started

Ready to streamline your academic literature discovery process? Getting started with paperweight is simple:

1. Clone the [paperweight repo](https://github.com/seanbrar/paperweight) 
2. Install dependencies with `pip install .`
3. Update the configuration YAML file with your preferences
4. Run `paperweight` and let the magic happen

The most important settings are properly entering valid SMTP credentials. The specific steps depend on your email provider, but in most cases paperweight can be installed, set up, and run in 5-10 minutes. After it's set up once, you'll be able to run it daily with a single command: `paperweight`

As you explore paperweight, I highly encourage you to dive into the configuration options and experiment to find the optimal setup for your needs. The repo's [README](https://github.com/seanbrar/paperweight/blob/master/README.md) and [configuration guide](https://github.com/seanbrar/paperweight/blob/master/docs/CONFIGURATION.md) provide a wealth of additional information and tips for getting the most out of your paperweight experience.

If paperweight interests you, try it now at: [https://github.com/seanbrar/paperweight](https://github.com/seanbrar/paperweight)

If you'd like to contribute to this project, please visit the GitHub page or read the [contributing guide](https://github.com/seanbrar/paperweight/blob/master/docs/CONTRIBUTING.md) directly. Thank you for your interest in paperweight!

### The Road Ahead

The current version of paperweight is just the beginning. I have an ambitious roadmap of features and enhancements, including:
- An RL-based recommendation engine for hyper-personalized paper discovery
- Support for additional academic paper sources beyond arXiv
- Automatically scheduling for paper retrieval and processing
- "Natural" notification mediums like desktop apps and browser extensions
- And much more!

While paperweight is available right now for you to use, there is still a long way to go. I've listed a few points here, and have more specific future items in the official [roadmap](https://github.com/seanbrar/paperweight/blob/master/docs/ROADMAP.md), but your input on what would make paperweight more valuable to you is highly appreciated.

If you're an academic, researcher, or simply someone who wants to stay on the cutting edge of your field, I invite you to give paperweight a try. Your feedback, suggestions, and contributions are essential in shaping the future of this tool.

### Developing Ideas

In a way, paperweight presented an opportunity before it was even a working prototype. A project like this requires working through a lot of challenges. Several elements were completely foreign to me. While I've worked with APIs before, most of what I've done have been simple scripts; I'm not an expert programmer by any means. This effort wasn't just about building a great tool; it represents an opportunity to explore more complex Python programming and lay the foundation for future work on reinforcement learning models.

I was able to develop my skills while creating a useful program and sharing it with the world. If there are things that interest you, that you dream of seeing in the world, you **can** do it. You'll go further than you think. 

So take that step. Build something. Share your ideas. And when you do, reach out and let me know. After all, innovation thrives on connection, and the world becomes a little brighter every time we share our creations with each other.

Let's make the future a little more exciting, one project at a time.