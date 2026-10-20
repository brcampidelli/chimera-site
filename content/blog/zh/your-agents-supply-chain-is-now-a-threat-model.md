---
title: "你 Agent 的供应链，现在就是一个威胁模型"
date: 2026-10-20
category: analysis
summary: "本周的三个信号指向同一个结论：你构建的 Agent 有多可信，完全取决于它触碰的技术栈有多可信，而这个技术栈正在快速分裂。"
sources:
  - headline: "Microsoft says AI agents are like insider threats as 'frontier models can't be trusted'"
    url: https://techcrunch.com/2026/10/19/microsoft-says-ai-agents-are-like-insider-threats-as-frontier-models-cant-be-trusted/
    outlet: "TechCrunch"
    published: 2026-10-19
  - headline: "DeepSeek ajuda Huawei a desenhar chips: o que muda na disputa com a Nvidia"
    url: https://exame.com/inteligencia-artificial/deepseek-ajuda-huawei-a-desenhar-chips-o-que-muda-na-disputa-com-a-nvidia/
    outlet: "Exame"
    published: 2026-10-19
  - headline: "Release: llm-tools-datasette 0.1.1"
    url: https://simonwillison.net/2026/Oct/18/llm-tools-datasette/
    outlet: "Simon Willison"
    published: 2026-10-18
dropped: "389 matérias examinadas de 571 reunidas, 3 lidas para este texto. Descartadas: HTTP 429 (18), publicado há 18272h (4), publicado há 3468h (3), publicado há 168h (2), publicado há 3492h (2), publicado há 6368h (2)"
---

AI Agent 的信任边界不在于模型，而在于供应链。当你把一个模型连接到工具、数据库或芯片时，你就继承了那条链条上每一个环节的安全态势——本周，三个独立的信号表明，这些环节正在硬化成地缘政治和架构上的断层线。

微软的安全研究人员已开始将员工自行部署的 Agent 归类为内部威胁。理由很直白：前沿模型不可信，而它们连接的系统——电子表格、代码仓库、内部 API——并不受模型构建方的实验室控制 [[1]](https://techcrunch.com/2026/10/19/microsoft-says-ai-agents-are-like-insider-threats-as-frontier-models-cant-be-trusted/)。这已经不是关于提示注入的理论担忧，而是一种运维立场。Agent 是一个你未曾开通的用户，拿着你未曾审计的凭证，沿着一条你无法复现的推理路径运行。对今天构建 Agent 的人来说，这意味着工具调用层不再仅仅是个集成问题；它是一个你现有的 IAM 体系从未被设计去解决的权限问题。

当 Agent 底层的硬件发生变化时，这个问题会进一步加剧。DeepSeek 正在与华为合作进行芯片设计，目标是让中国处理器更接近现代 AI 工作负载所需的性能范围 [[2]](https://exame.com/inteligencia-artificial/deepseek-ajuda-huawei-a-desenhar-chips-o-que-muda-na-disputa-com-a-nvidia/)。其目的很明确：减少对美国芯片的依赖。对 Agent 构建者来说，这不是一个遥远的产业故事。这意味着推理基板正在分叉。部署在某个云上的 Agent 可能跑在 Nvidia 上；部署在另一个云上的 Agent 可能跑在华为设计的芯片上，有着不同的内存配置、不同的数值精度特性和不同的安全认证链。模型卡片不会记录这些，基准测试分数也不会反映这些。但 Agent 的行为——尤其是对延迟敏感的工具调用和长链路推理——将会改变。

## 工具层是信任最先崩塌的地方

Simon Willison 发布的 llm-tools-datasette 0.1.1 让这个模式变得具体 [[3]](https://simonwillison.net/2026/Oct/18/llm-tools-datasette/)。该库将一个 Datasette 实例作为工具暴露给 LLM。这正是让 Agent 变得有用的那类集成：查询实时数据库，获取结构化结果，并据此行动。但它也展示了当你给模型一个 SQL 接口时发生的信任压缩。模型不理解 schema 的敏感性，不知道哪些列包含 PII，也不知道哪些表因合规要求只能追加写入。这些约束存在于工具定义中、SQL 用户的授权中，以及 Agent 运行时与数据库之间的网络路径中。如果其中任何一项配置错误，模型就会毫无恶意地泄露数据，仅仅因为它被问了一个需要这些数据才能回答的问题。

## 对构建者来说，什么变了

实际结论是，Agent 架构正在变成供应链架构。由此引出三件事。

第一，工具权限必须默认遵循最小权限原则，并且要按 Agent 实例进行限定，而不是按用户。触发 Agent 的人类用户可能拥有广泛的数据库访问权限，但 Agent 不应该继承这些权限。第二，硬件路径至关重要。如果你的 Agent 在一个你无法审计的芯片上运行推理——无论是因为它是一个封闭的云，还是受地缘政治约束的供应链——你就是在接受一个你无法验证的信任依赖。第三，你附加给 Agent 的每个工具都是一份契约。它暴露的不应仅仅是一个函数签名，还应有一个安全边界：它能访问什么数据，能造成什么副作用，以及它会记录什么日志。

微软的立场表明，企业很快会要求先有这份契约，才允许 Agent 靠近生产系统。DeepSeek 与华为的合作表明，这份契约下的硬件将不再统一。而像 llm-tools-datasette 这样的工具则表明，暴露面正在以比治理更快的速度扩张。你今天构建的 Agent，将运行在一个你无法完全控制的技术栈上。你唯一能控制的，是模型与外部世界之间的接口。让它保持窄小，让它可审计，让它可撤销。
