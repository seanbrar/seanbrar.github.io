---
layout: post
title: Great Expectations
date: 2024-09-28 18:00:00
description: Thoughts on the release of OpenAI's new o1 models
tags: [technology, artificial-intelligence, OpenAI]
categories: [uncategorized]
thumbnail: assets/img/blog/great-expectations-thumbnail.png
giscus_comments: true
related_posts: true
---

This post was initially meant to be finished on September 19th, one week after the announcement and release of the o1 family of models. Though it is a bit late, I've been able to take the extra time to refine my perspective. Rather than a review (it's impressive), I think it's more interesting to look back on the online reactions to o1.

--

I tried both new models in ChatGPT as soon as they were live, but I wanted to take a few days to see how different communities would react to this launch. There are still adjustments being made to the release; for instance, the rate limits for both models have been (slightly) relaxed in both the chat interface and the API since last Thursday, but at this point, I think most conclusions on o1-preview and o1-mini have been mostly set, for better or for worse, at least until the full o1 model releases.

To say this release was anticipated would be an understatement. A combination of a perceived slowdown of AI advancement, the delayed release of announced systems and features, and online rumors of imminent, Earthshattering releases all contributed to an atmosphere of hype and hyperbole on one side and pessimistic cynicism on the other. To better understand the impatience leading up to this release, it's worth examining OpenAI's release schedule over the last 18 months.

### Releasing Fast and Slow

For enthusiasts in the community, OpenAI had set an ambitious precedent for release cadence in 2023. Despite expectations of accelerated advancement year over year, 2024 had not seen the same public success before September. To illustrate the point, here is a brief timeline of some of their major launches:

- March 2023: GPT-4 release (32k context window)
- November 2023: GPT-4 Turbo (128k context window)
- February 2024: Sora video generation model reveal (not publicly released)
- May 2024: GPT-4o release (multi-modality and Advanced Voice Mode not publically released)
- September 12, 2024: o1-preview and o1-mini release

GPT-4o did have advantages; it was very fast and cheap even compared to GPT-4 Turbo, but in many ways, it was only an incremental step forward. At least in my use, there were very few tasks 4o was capable of that GPT-4 Turbo was not.

What's striking is the contrast between the rapid advancements we saw in 2023 with GPT-4 and Turbo and the more incremental progress that has characterized most of 2024 up until now. This slower pace led to some criticism of OpenAI, with people questioning the delays and lack of transparency around what was going on behind the scenes.

In this context, the o1 release marks the first major public-facing step forward for OpenAI in 2024, generating a lot of anticipation and discussion. With that in mind, it's worth taking a closer look at what's being offered.

### II. o1-preview and o1-mini: An Overview

So, what exactly are the o1-preview and o1-mini models? In short, they're more specialized and capable versions of GPT-4 that excel particularly in domains with verifiably correct answers like programming, math, and the sciences. 

Some key points about availability and performance:

- It's currently available only to ChatGPT Plus subscribers and heavy API users
- o1-preview is the more general purpose of the two, while o1-mini is further specialized for coding tasks that rely less on broad knowledge 
- o1-mini has a higher rate limit of 50 messages per day, making it much better for experimentation and everyday use

I've had the chance to play around with o1-mini a bit, and I'm pretty impressed, especially in the realm of code processing, explanation, and analysis. It's a noticeable step up from models like Claude 3.5 Sonnet in some ways, though it tends to be less 'user friendly.' I've found there are some coding tasks Claude 3.5 Sonnet struggles with that o1-mini one-shots, but the output tends to be far more extensive and opinionated; it'll provide what you asked for along with a half-dozen related pieces. That shouldn't detract from what the new model is capable of, though. With very difficult or extensive tasks, it pulls away from everything else I've used.

I find the ability to observe its "thought process" in action particularly fascinating. The speed and depth of its responses are remarkable - it can generate quality code and insightful analysis at a pace that sometimes feels almost superhuman.

### III. The Online Response: A Mixed Bag

Of course, with any significant AI release, there is bound to be a range of opinions and reactions from the online community. The initial response to the o1-preview and mini was somewhat mixed.

Some of the main criticisms and points of contention I saw pop up:

1. "It's just using Chain of Thought!"
   - Some felt this framing minimized the significance of o1's performance and the work OpenAI put into it. I don't really agree that it does, but I understand why some do.
   - There were attempts to replicate o1's results through prompting techniques alone. I would say that was only moderately successful.
   
2. "It's good compared to previous models, but still bad in an objective sense."
   - I think this is overly pessimistic, even though the systems are, of course, far from perfect. Overall, I think this position lacks perspective, though it shouldn't be discarded entirely.
   
3. "It's literally impossible for me to be impressed anymore"
   - There was a lot of speculation about the underlying research behind the approach. Some of the apparent techniques could, cynically, be seen as merely public implementations of years-old research.

There was, of course, lots of discussion that pointed to new capabilities beyond what elaborate prompting or simple fine-tuning can achieve. Over time, as more people dug into o1-mini and preview, I noticed the sentiment shifting more towards "Okay, this is actually quite good and a big deal." 

On the positive end, reactions highlighted the significance of o1's advancements in specialized areas like coding and scientific/mathematical reasoning. It started to sink in that the models represented a meaningful step forward, even if built on known techniques.

### IV. Near May Be Better Than Far, But It Still Isn't There

To acknowledge the validity in some of the critical perspectives - o1-preview and mini may not be as revelatory as the initial GPT-3 launch or AlphaFold 2. There are still major challenges and limitations. We aren't at artificial general intelligence yet.

But at the same time, we should appreciate the significance of reaching this particular step in the road of AI development. OpenAI has compared o1-mini to being like the "GPT-2 of reasoning models". 

Remember when GPT-2 first came out, and surprised everyone with its level of coherence and quality? But then it was quickly overshadowed and even seemed primitive in retrospect. At first, many underestimated its importance as an incremental step towards more powerful language models.

Even if we want to define the release of the o1 models as incremental or integrating existing research - it's still a necessary and worthy step in developing advanced AI systems. We can acknowledge current limitations while still appreciating the progress and effort involved.

If I seem impressed by the recent announcements, that's because I am. I consider this a generational improvement, at least in certain domains, and I think there's a lot of promise in the future of this paradigm. It does raise the question of how far this new approach of scaling test-time will expand capabilities once future models are released (o2, etc.). The general public, myself included, really has no way to know except in hindsight. Perhaps it is the case that LLMs are a dead-end on the road to superintelligence. However, I think it's becoming clear that current architectures will *likely* be able to reach above-human performance in information tasks.

Once the honeymoon period ends on these new models, there will be cases where they fall flat, as well as instances of strange or frustrating behavior. It's not wrong to identify these flaws; in fact, it's necessary for future improvements. Looking past the hype, I wouldn't be surprised if, in the future, we think o1 is limited and very flawed, like how we see GPT-3 today. Personally, I'm glad for improvements when they come, and I continue to be optimistic about future developments. 

### V. Looking Forward

When we compare o1-mini and preview to GPT-4o and especially prior models like Claude 3.5 Sonnet, the jump in specific capabilities is striking, especially in coding, math, science, and analysis. It raises the question of whether we are already reaching some definitions of AGI. It's been debated online, so it's worth considering, at least.

Now, there's a whole separate debate around what truly constitutes AGI. It could be:
- OpenAI's focus on the raw economic/productive value of a system 
- Stricter philosophical definitions around human-like reasoning and adaptability
- My personal take, which is based more on matching mean human-level cognitive capabilities 

Based on some of these definitions, you could argue that o1-mini and preview are already knocking on the door of AGI, at least in certain domains. I believe we are seeing the emergence of a new paradigm in AI development. But these models still fall well short of the sci-fi, singularitarian visions of a superintelligent AI system that surpasses humans in every conceivable way. So what do I think? Is it AGI? Not really. The term has been diluted over the last few years, and if you ask five people their definitions, you'd probably get five different answers. I wouldn't go as far as some saying the term has lost its usefulness, but we're not there yet. Still, everything has a name. If it's not artificial general intelligence, why not create a new category? My vote is for "Advanced Generative Intelligence," AGI for short.

Now that we've established that we've reached AGI (advanced generative intelligence), where does that leave us? What's novel here is the ability to achieve significant performance gains not just by scaling training data/computing but also through test-time computation - having the model reason over problems step-by-step. Right now, it might only think for a few seconds, or even over a minute, for apparently harder queries, but what if that time was increased to several minutes? Several hours? It could be that o1 could match a (average) professional's performance over that period, at least in some domains. It'll take time to determine this conclusively, but this could be the start of self-correcting trains of thought, higher levels of coherence, and reduced hallucinations; in other words, a fix to some of the major problems causing LLM unreliability.

So, where do we go from here? I see a few key areas to watch in the continued development of o1 and similar models:

1. Increased test-time compute - 10X, 100X, or even 1000X more time to "think" over the most challenging problems we can throw at them; alternatively, or perhaps combined with more efficient inference
2. Advancements in memory and continuous learning to break free of the "goldfish effect" of current models
3. Further improvements in reasoning, analysis, and domain-specific capabilities - Improving the base model further
4. Integration of o1-style models with other AI systems like computer vision and robotics

As this technology progresses, it will have significant implications for the AI field, society, and the economy at large. Things are going to change. Maybe not as fast as some claim, but faster than many think. There will be unexpected challenges and advancements, and even though I view the recent announcement and initial releases more positively than some, I'm glad there's a healthy ecosystem working, building, and commenting on it all.

As this technology progresses, it will have significant implications for the AI field, society, and the economy at large. The ability to scale test-time computation, combined with continual improvements in base model capabilities, suggests we're entering a new phase where models can tackle increasingly complex problems through deliberate reasoning. Things are going to change. Maybe not as fast as some claim, but faster than many think. I expect this time next year, we'll have unlocked new use cases for these models across multiple fields that further over the horizon. There will be unexpected challenges and advancements, and even though I view the recent announcement and initial releases more positively than some, I'm glad there's a healthy ecosystem working, building, and commenting on it all. In the end, I have high expectations.