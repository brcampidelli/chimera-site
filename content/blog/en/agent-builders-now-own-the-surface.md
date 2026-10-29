---
title: "Agent builders now own the surface"
date: 2026-10-29
category: analysis
summary: "Google's new developer platforms show that agent builders, not app owners, are becoming the primary interface to users and tools."
sources:
  - headline: "Como criar um agente de IA com Python, LangChain e ferramentas | IA Expert Academy"
    url: https://iaexpert.academy/2026/10/28/como-criar-um-agente-de-ia-com-python-langchain-e-ferramentas/
    outlet: "IA Expert Academy"
    published: 2026-10-28
  - headline: "As AI agents reshape the web, Google opens Gemini and Search to more apps"
    url: https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/
    outlet: "TechCrunch"
    published: 2026-10-28
  - headline: "Google opens Android development to third-party AI agents and unveils new Gemini APIs"
    url: https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/
    outlet: "The Decoder"
    published: 2026-10-28
dropped: "87 matérias examinadas de 585 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (2), publicado há 149h (1), publicado há 198h (1), publicado há 200h (1), publicado há 384h (1), publicado há 675h (1)"
---

The surface area of software is shifting. For years, the interface was the app: a screen, a button, a form. Now the interface is increasingly the agent—and whoever controls the agent controls what the user can do. Two announcements from Google this week make that shift concrete, not speculative.

Google is opening Gemini and Search to third-party services through a new developer platform, letting businesses bring their offerings directly into Google's AI experiences [[2]](https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/). At the same time, Android Studio is getting a "Bring Your Own Agent" feature that supports more than 40 coding agents, including Anthropic's Claude Agent and OpenAI's Codex [[3]](https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/). The pattern is the same in both cases: Google is not building the agent for you. It is building the place where your agent runs and the surface where your agent appears.

## The agent is the new entry point

For anyone building agents, this changes the distribution question. You no longer need to convince a user to install your app or visit your site. You need to convince an agent—or the platform hosting that agent—that your service is the right tool for the job. That is a different kind of engineering problem. It is about discoverability, tool descriptions, and reliable execution, not onboarding flows or push notifications.

The Android Studio move is more specific but just as telling. Google is not pushing a single first-party coding agent. It is opening the IDE to whatever agent a developer wants to use. The terminal tools Google mentions are designed to help agents finish UI tasks faster and with fewer tokens [[3]](https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/). That is an acknowledgment that agent performance is now a platform concern. The platform's job is to make agents more efficient, not to replace them.

## Tool design becomes the real work

The tutorial from IA Expert Academy, while more basic, points in the same direction. It walks through building an agent that uses tools, consults prices, calculates discounts, and combines functions to complete a task [[1]](https://iaexpert.academy/2026/10/28/como-criar-um-agente-de-ia-com-python-langchain-e-ferramentas/). The interesting part is not the LangChain code. It is the structure: the agent is only as good as the tools it can call and the order in which it calls them. That is where the real engineering lives now.

When Google opens Search to external services, the same logic applies at web scale. A business that wants to be found by an agent needs to describe its service in a way an agent can parse, evaluate, and act on. That is a new kind of API design. It is not enough to expose an endpoint. You have to expose intent, constraints, and failure modes in a way an agent can reason about.

## What this means for builders

The practical takeaway is simple: stop thinking of agents as a feature inside your product. Start thinking of your product as a tool inside someone else's agent. That means investing in clear tool descriptions, predictable outputs, and small, composable actions. It means testing your service against multiple agents, not just your own. And it means treating the agent ecosystem as a distribution channel, with all the discoverability and reliability work that implies.

The platforms are not waiting. They are building the rails now. The builders who understand that their real user is often another piece of software will be the ones whose tools get called.
