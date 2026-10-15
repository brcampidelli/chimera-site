---
title: "The Interview Is Now a Prompt Away"
date: 2026-10-15
category: analysis
summary: "McKinsey’s AI-client interview and the financial industry’s autonomy experiments reveal the same shift: agents are no longer tools you use, but roles you design and evaluate against."
sources:
  - headline: "Apple atinge valor de mercado inédito de US$ 5 tri e segue como segunda mais valiosa"
    url: https://www.infomoney.com.br/mercados/apple-atinge-valor-de-mercado-inedito-de-us-5-tri-e-segue-como-segunda-mais-valiosa/
    outlet: "InfoMoney"
    published: 2026-10-14
  - headline: "McKinsey is making job applicants spar with a fake AI client"
    url: https://www.theverge.com/news/1011654/mckinsey-ai-client-interview
    outlet: "The Verge"
    published: 2026-10-14
  - headline: "Crossing the Threshold: How OpenAI and Anthropic Approach Autonomy and Safety in Financial Agents"
    url: https://www.latent.space/p/crossing-the-threshold
    outlet: "Latent Space"
    published: 2026-10-14
dropped: "9 matérias examinadas de 589 reunidas, 3 lidas para este texto."
---

The moment a company asks a candidate to prove their worth by talking to a machine, the machine stops being a tool and becomes the standard. That is the line we crossed this week, and it changes what it means to build an agent.

McKinsey & Company will now require some entry-level applicants to hold a 10-minute conversation with an AI simulation of a client as part of the interview process [[2]](https://www.theverge.com/news/1011654/mckinsey-ai-client-interview). This is not a chatbot screening for keywords. It is a role-playing adversary designed to test how a human thinks under pressure. The AI is not the assistant in the room. It is the gatekeeper.

For anyone building agents, the implication is immediate. Evaluation is no longer a separate concern you bolt on after training. When a firm like McKinsey deploys a simulated client to judge human performance, the same logic applies to the agents you ship. Your agent is not done when it passes a benchmark. It is done when it can hold its own against a simulated counterpart that was built to expose its weaknesses. If you are not constructing adversarial evaluation environments for your agents, someone else will construct them for you—and they will be the ones deciding whether your system is fit for production.

## Autonomy with a Leash

The same tension between capability and control surfaced in a very different setting. At AI Engineer New York, frontier labs and financial firms discussed how to give agents useful autonomy over consequential decisions while keeping a human in the loop [[3]](https://www.latent.space/p/crossing-the-threshold). The financial industry does not have the luxury of moving fast and apologizing later. A wrong trade executed by an agent with real money is not a hallucination you can regenerate. It is a loss.

What emerged from those conversations is a pattern that applies far beyond finance: the most interesting agent architectures are not the ones that maximize autonomy, but the ones that make the boundary between autonomy and oversight explicit and auditable. The agent does not ask for permission on every step. It operates within a declared threshold, and it surfaces its reasoning when it approaches the edge of that threshold. This is not a technical detail. It is a governance primitive.

## The Real Valuation Is Trust

Apple briefly touched a $5 trillion market valuation during regular trading hours, a number so large it becomes abstract [[1]](https://www.infomoney.com.br/mercados/apple-atinge-valor-de-mercado-inedito-de-us-5-tri-e-segue-como-segunda-mais-valiosa/). But the number itself is not the point. The point is what sustains a valuation like that over time: a chain of decisions about what runs on-device, what leaves the device, and who gets to audit the difference. That chain is made of the same governance questions that financial firms are asking about their agents and that McKinsey is embedding in its hiring process.

When a company decides that an AI can simulate a client well enough to judge a human, it is making a statement about where it places trust. The same statement gets made every time you decide whether your agent calls an external API, writes to a database, or sends an email without a human in the loop. The builders who understand this will stop treating evaluation as a phase and start treating it as infrastructure. They will build simulated counterparts that challenge their agents before the world does. And they will define the thresholds of autonomy not in a design doc, but in code that can be inspected, tested, and held accountable.

That is the practical takeaway. Build the evaluator before you build the agent. Make the boundary between autonomy and oversight a configurable primitive, not a handshake agreement. And assume that every agent you ship will eventually face a simulated adversary that was designed to break it. If you do not build that adversary first, someone else will.
