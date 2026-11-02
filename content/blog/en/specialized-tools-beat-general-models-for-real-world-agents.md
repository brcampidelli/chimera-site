---
title: "Specialized Tools Beat General Models for Real-World Agents"
date: 2026-11-02
category: analysis
summary: "Agents that pick the right tool for each task outperform general-purpose models, but real-world adoption still lags due to cost and trust."
sources:
  - headline: "Adobe is testing how well AI agents can use editing tools like a Photoshop professional would"
    url: https://the-decoder.com/adobe-is-testing-how-well-ai-agents-can-use-editing-tools-like-a-photoshop-professional-would/
    outlet: "The Decoder"
    published: 2026-11-01
  - headline: "Basically no one is using AI agents for their DoorDash orders"
    url: https://arstechnica.com/ai/2026/10/doordash-says-outside-ai-agents-have-only-led-to-hundreds-of-orders-so-far/
    outlet: "Ars Technica"
    published: 2026-10-30
  - headline: "Zest's new AI agent finds restaurants and books reservations over text"
    url: https://techcrunch.com/2026/10/30/zests-new-ai-agent-finds-restaurants-and-books-reservations-over-text/
    outlet: "TechCrunch"
    published: 2026-10-30
dropped: "80 matérias examinadas de 530 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (2), publicado há 122h (1), publicado há 245h (1), publicado há 294h (1), publicado há 296h (1), publicado há 480h (1)"
---

The gap between what AI agents can do in a lab and what people actually use them for is widening. Adobe's EditAgent shows that specialized tools, not bigger general models, are the key to competent performance—but it needs ten times the compute. Meanwhile, consumer-facing agents like DoorDash ordering and Zest's restaurant concierge are struggling to find users. The lesson for builders: focus on tool selection and efficiency, not just model scale.

## The Right Tool for the Job

Adobe Research and UC San Diego built EditAgent, an AI system that edits images more like a Photoshop professional. Instead of retrying the same general-purpose editor over and over, the agent picks the right specialized tool for each task and lets a standard language model choose the best result based on measured image data [[1]](https://the-decoder.com/adobe-is-testing-how-well-ai-agents-can-use-editing-tools-like-a-photoshop-professional-would/). This approach works, but it needs about ten times the compute. The trade-off is clear: competence comes from orchestration, not just raw model power.

For agent builders, this is a crucial insight. General-purpose models are versatile but inefficient. By giving an agent a toolbox of specialized functions and a way to evaluate outcomes, you can achieve better results—if you can afford the overhead. The challenge is making that orchestration cheap enough for production.

## The Adoption Gap

Despite technical advances, real-world usage remains low. Ars Technica reports that basically no one is using AI agents for their DoorDash orders, though it's still early days for the relatively new e-commerce use case [[2]](https://arstechnica.com/ai/2026/10/doordash-says-outside-ai-agents-have-only-led-to-hundreds-of-orders-so-far/). Similarly, Zest's new AI agent finds restaurants and books reservations over text, but it's just launching and faces the same uphill battle for user trust [[3]](https://techcrunch.com/2026/10/30/zests-new-ai-agent-finds-restaurants-and-books-reservations-over-text/).

Why the hesitation? For consumers, agents are still unreliable and opaque. A wrong DoorDash order or a botched reservation is a real inconvenience. For businesses, the cost of running agents like EditAgent is prohibitive. Until agents become both trustworthy and affordable, adoption will lag behind capability.

## What Builders Should Do

First, invest in tool selection. Instead of relying on a single model to do everything, design agents that can choose from a set of specialized tools and evaluate results objectively. Second, optimize for efficiency. The tenfold compute cost of EditAgent is a warning: if your agent isn't lean, it won't scale. Finally, build trust incrementally. Start with low-stakes tasks where errors are tolerable, and let users see the agent's reasoning. The path to adoption is paved with small, reliable wins—not flashy demos.
