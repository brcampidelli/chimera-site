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

软件的界面正在发生转移。多年来，界面就是应用本身：一个屏幕、一个按钮、一个表单。如今，界面越来越多地变成了 agent——谁控制 agent，谁就控制了用户能做什么。Google 本周的两项发布让这一转变从推测变成了现实。

Google 正在通过一个新的开发者平台向第三方服务开放 Gemini 和 Search，让企业将自己的服务直接带入 Google 的 AI 体验中 [[2]](https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/)。与此同时，Android Studio 推出了 "Bring Your Own Agent" 功能，支持 40 多个编程 agent，包括 Anthropic 的 Claude Agent 和 OpenAI 的 Codex [[3]](https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/)。两种情况的模式相同：Google 不是在替你构建 agent，而是在构建你的 agent 运行的地方，以及你的 agent 出现的地方。

## Agent 是新的入口

对于任何构建 agent 的人来说，这改变了分发问题。你不再需要说服用户安装你的应用或访问你的网站。你需要说服一个 agent——或者托管该 agent 的平台——你的服务是适合这项工作的工具。这是一种不同的工程问题。它关乎可发现性、工具描述和可靠执行，而不是引导流程或推送通知。

Android Studio 的举措更具体，但同样说明问题。Google 并没有强推某一个第一方编程 agent，而是将 IDE 开放给开发者想用的任何 agent。Google 提到的终端工具旨在帮助 agent 用更少的 token 更快地完成 UI 任务 [[3]](https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/)。这等于承认 agent 的性能现在是一个平台层面的问题。平台的工作是让 agent 更高效，而不是取代它们。

## 工具设计成为真正的工作

IA Expert Academy 的教程虽然更基础，但指向了同一个方向。它演示了如何构建一个使用工具、查询价格、计算折扣并组合函数来完成任务的 agent [[1]](https://iaexpert.academy/2026/10/28/como-criar-um-agente-de-ia-com-python-langchain-e-ferramentas/)。有趣的部分不是 LangChain 代码，而是结构：agent 的好坏取决于它能调用的工具以及调用顺序。真正的工程现在就在这里。

当 Google 向外部服务开放 Search 时，同样的逻辑在 Web 规模上适用。一个希望被 agent 发现的企业，需要以 agent 能够解析、评估并执行的方式来描述自己的服务。这是一种新的 API 设计。仅仅暴露一个端点是不够的。你必须以 agent 能够推理的方式暴露意图、约束和失败模式。

## 这对构建者意味着什么

实际的启示很简单：不要再把 agent 当作产品内部的一个功能。开始把你的产品当作别人 agent 里的一个工具。这意味着要投入精力做好清晰的工具描述、可预测的输出，以及小而可组合的操作。这意味着要针对多个 agent 测试你的服务，而不只是你自己的。这意味着要把 agent 生态当作一个分发渠道来对待，并承担随之而来的所有可发现性和可靠性工作。

平台不会等待。它们现在就在铺设轨道。那些明白自己真正的用户往往是另一段软件的构建者，才是工具会被调用的那批人。
