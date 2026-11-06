---
title: "Agent 基准测试正在衡量失败，而非能力"
date: 2026-11-06
category: analysis
summary: "消费者对 Agent 的承诺与真实世界表现之间的差距，如今已可量化，这改变了开发者应优化的方向。"
sources:
  - headline: "Airbnb says it's launching an AI travel agent in the first half of 2027"
    url: https://techcrunch.com/2026/11/05/airbnb-says-its-launching-an-ai-travel-agent-in-the-first-half-of-2027/
    outlet: "TechCrunch"
    published: 2026-11-05
  - headline: "Perplexity launches its own take on AI agents for work"
    url: https://www.theverge.com/ai-artificial-intelligence/1028302/perplexity-teammates-ai-agents-work
    outlet: "The Verge"
    published: 2026-11-05
  - headline: "No AI agent scores above 12 percent on SemiAnalysis' new real-world work benchmark"
    url: https://the-decoder.com/no-ai-agent-scores-above-12-percent-on-semianalysis-new-real-world-work-benchmark/
    outlet: "The Decoder"
    published: 2026-11-05
dropped: "84 matérias examinadas de 586 reunidas, 3 lidas para este texto. Descartadas: publicado há 218h (1), fora da lista de fontes (latent.space) (1), publicado há 390h (1), publicado há 576h (1), publicado há 867h (1), publicado há 1039h (1)"
---

本周 AI 领域最重要的数字，既不是某个发布日期，也不是功能列表，而是 12%。这是所有 AI Agent 在 SemiAnalysis 新推出的 GDPx 基准测试中的得分上限，该测试模拟了跨芯片设计和量化交易等领域的真实知识工作 [[3]](https://the-decoder.com/no-ai-agent-scores-above-12-percent-on-semianalysis-new-real-world-work-benchmark/)。当最好的系统十次有八次以上失败时，讨论的焦点就从 Agent 能做什么，转向了它们目前还做不到什么。

这种转变之所以重要，是因为同一周还发布了两则面向消费者和工作者的公告。Airbnb 表示将在 2027 年上半年推出 AI 旅行管家，负责行程规划、预订管理及住宿期间的协助 [[1]](https://techcrunch.com/2026/11/05/airbnb-says-its-launching-an-ai-travel-agent-in-the-first-half-of-2027/)。Perplexity 则发布了 Teammates，这是一种能同时完成多项任务的常驻型 Agent [[2]](https://www.theverge.com/ai-artificial-intelligence/1028302/perplexity-teammates-ai-agents-work)。这两款产品都假设了一个该基准测试无法支撑的可靠性水平。

## 差距现已公开

对于开发者来说，这并非否定这些公告的理由，而是要以不同的方式解读它们。Airbnb 和 Perplexity 并没有声称他们的 Agent 能设计芯片或交易衍生品。他们正在缩小问题范围：一个比较选项并管理预订的旅行管家，一个运行并行任务的工作 Agent。这种范围界定本身就是产品。它含蓄地承认了通用自主性尚未就绪，因此前进的道路是约束领域并掌控失败模式。

基准测试结果强化了这一做法。Claude Opus 5.5 以微弱优势领先于 Gemini 4 Carbon，但差距远不如上限本身有趣 [[3]](https://the-decoder.com/no-ai-agent-scores-above-12-percent-on-semianalysis-new-real-world-work-benchmark/)。没有任何模型突破 12%。批评者指出每个领域的任务数量少且测试条件不均，这很合理。但方向是明确的：真实世界的工作，即便是模拟的，也暴露了演示和发布文章所没有体现的可靠性差距。

## 开发者应从中汲取什么

实际启示不是等待更好的模型，而是为这种差距而设计。如果最好的 Agent 在开放式知识工作中得分 12%，那么一款成功的产品要么必须缩小任务范围直到分数可接受，要么在分数不可接受之处增加人工检查点。Airbnb 的旅行管家是第一种策略。Perplexity 的 Teammates，凭借常驻并行执行能力，只有在任务小到足以验证时，才算第二种策略。

开发者还应将 GDPx 这类基准测试视为设计工具，而非排行榜。不均的测试条件和少量的任务不仅是方法论上的缺陷，更是关于什么难以衡量的信号。如果你正在构建一个 Agent，在发布前定义你自己的基准测试。从用户工作流中挑选十个真实任务，反复运行，并公布失败案例。这比任何厂商的演示都更有用。

12% 的上限会变。但衡量失败、界定任务范围以及为人工监督而设计的习惯，将比任何模型发布都更持久。那些在本周内化这一点的公司，当基准测试数字最终攀升时，他们的 Agent 仍将屹立不倒。
