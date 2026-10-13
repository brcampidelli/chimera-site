---
title: "上下文正成为智能体构建者的新约束"
date: 2026-10-13
category: analysis
summary: "智能体的表现，更多取决于上下文如何被管理、重置和与外界隔离，而非模型本身的算力。"
sources:
  - headline: "How Anthropic’s Dynamic Workflows Coordinate Claude Agents"
    url: https://www.latent.space/p/claude-dynamic-workflows
    outlet: "Latent Space"
    published: 2026-10-12
  - headline: "Clearing chat history helps AI agents find better solutions"
    url: https://the-decoder.com/clearing-chat-history-helps-ai-agents-find-better-solutions/
    outlet: "The Decoder"
    published: 2026-10-12
  - headline: "Anthropic is cutting off its internal evaluations from the internet"
    url: https://www.theverge.com/ai-artificial-intelligence/1009286/anthropic-is-cutting-off-its-internal-evaluations-from-the-internet
    outlet: "The Verge"
    published: 2026-10-10
dropped: "84 matérias examinadas de 510 reunidas, 3 lidas para este texto. Descartadas: publicado há 74h (1), publicado há 76h (1), publicado há 79h (1), publicado há 104h (1), publicado há 107h (1), publicado há 143h (1)"
---

本周智能体研究中最有价值的信号，并非关于更大的模型或更长的上下文窗口，而是将上下文视为一种可以主动管理的约束。三个独立的发展方向指向了同一个结论：当智能体的工作记忆被刻意塑造，而非仅仅被扩展时，它们的表现会更好。

Anthropic 在 AI Engineer New York 的演讲中，借用了 Unix 和 Linux 的概念来构建智能体协调框架 [[1]](https://www.latent.space/p/claude-dynamic-workflows)。其启示不在于让智能体字面意义上地模仿操作系统，而在于开发者需要一套原语来控制智能体看到什么、何时看到，以及它向前传递什么。一个进程不会在内存中保留其全部执行历史。它读取所需，写入重点，然后释放其余。智能体构建者们正开始应用同样的原则。

微软的研究人员发现了这一原则能够解决的一种具体失败模式。自主智能体会陷入“想法盆地”——即它们无法逃脱的局部解决方案区域，因为不断增长的聊天历史将它们锚定在了早期的推理上 [[2]](https://the-decoder.com/clearing-chat-history-helps-ai-agents-find-better-solutions/)。他们测试的修复方案名为“分叉并清空”（Fork-and-Flush），在保留工作区的同时清除聊天历史。结果是：在相同的计算预算下，结果质量提升了高达 66%。这个数字之所以重要，是因为它隔离出了上下文管理这个变量。模型没变，任务没变，改变的只有智能体与其自身历史的关系。

## 上下文是一个设计界面

对于构建者来说，这重塑了一个普遍假设。许多团队将上下文视为一个存储问题：我们能塞进多少东西，如何压缩它，如何检索到正确的片段。这些都是真实存在的问题，但它们忽略了更根本的一点：智能体到底应该被允许记住什么？

“分叉并清空”之所以有效，是因为它将遗忘视为一种特性。智能体保留其产出物——工作区、代码、部分解决方案——但丢弃了导向这些结果的推理轨迹。那条推理轨迹并非中性的。它携带着假设、死胡同以及早期的框架，这些都限制了后续的探索。清除它并非失忆，而是从一个已知状态进行受控重启。

Anthropic 受 Unix 启发的的工作流在更高层面上暗示了同样的原则。在 Unix 中，小程序通过显式接口通信。它们不共享内存。每个程序都从干净的输入开始，并产生输出。当 Anthropic 将此应用于智能体协同时，其含义是，长时间运行的智能体任务应被分解为具有清晰边界的更小单元，而不是作为一个连续的对话来运行 [[1]](https://www.latent.space/p/claude-dynamic-workflows)。

## 隔离改变了评估方式

第三个进展关乎智能体与外部世界的边界。Anthropic 在能够防止“非预期的模型行为”之前，一直将其内部评估保持离线状态 [[3]](https://www.theverge.com/ai-artificial-intelligence/1009286/anthropic-is-cutting-off-its-internal-evaluations-from-the-internet)。这并非一个抽象的安全声明。这等于承认，在测试期间连接到互联网的智能体，其行为方式可能难以预测、追踪或撤销。

对于构建者来说，这有着直接的实践意义。如果你在一个智能体可以接触外部系统的环境中评估它，你衡量的就不再是智能体本身。你衡量的是智能体加上它碰巧发现、触发或修改的任何东西。离线评估是上下文控制的一种形式：它移除了一个你无法完全观测的变量。同样的逻辑也适用于生产环境。一个能对现实世界采取行动的智能体，需要一个由你控制的边界，而不仅仅是一个要求它守规矩的提示词。

将这三个故事联系在一起的，是关于智能体质量来源的认知转变。它更少地来自模型的原始能力，而更多地来自其周围的结构：智能体记住了什么，忘记了什么，它能触及什么，又不能触及什么。那些将上下文视为设计界面——一个可以被塑造、重置和隔离的东西——的构建者，将从相同的模型中获得更可靠的结果。而那些将其视为被动日志的人，将继续与相同的失败作斗争。
