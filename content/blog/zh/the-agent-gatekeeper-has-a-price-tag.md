---
title: "代理守门人，是有标价的"
date: 2026-11-26
category: analysis
summary: "当平台封杀智能体时，这场争斗无关安全或用户体验——它关乎谁有权在意图与交付之间的交易层抽税。"
sources:
  - headline: "Where scientists draw the line on AI agents"
    url: https://huggingface.co/blog/allenai/where-scientists-draw-the-line-on-ai-agents
    outlet: "Hugging Face"
    published: 2026-11-25
  - headline: "Amazon and Meta are in talks to end the block on Meta's AI shopping agent Muse in Amazon's online store."
    url: https://the-decoder.com/amazon-and-meta-are-in-talks-to-end-the-block-on-metas-ai-shopping-agent-muse-in-amazons-online-store/
    outlet: "The Decoder"
    published: 2026-11-25
  - headline: "Amazon and Meta reportedly in talks to lift blockade on AI agent Muse"
    url: https://techcrunch.com/2026/11/25/amazon-and-meta-reportedly-in-talks-to-lift-blockade-on-ai-agent-muse/
    outlet: "TechCrunch"
    published: 2026-11-25
dropped: "87 matérias examinadas de 591 reunidas, 3 lidas para este texto. Descartadas: publicado há 240h (1), publicado há 1056h (1), publicado há 1347h (1), publicado há 1519h (1), publicado há 1859h (1), publicado há 2042h (1)"
---

智能体与其所作用的网络之间的边界，并非技术性的，而是商业性的。每当一个平台封杀某个智能体，给出的理由总是安全、隐私或用户体验。但真正的理由更简单：平台还没想好怎么从这个新中介身上收租。

亚马逊和 Meta 正在就 Muse（Meta 的购物智能体）重返亚马逊商城的条件进行谈判 [[2]](https://the-decoder.com/amazon-and-meta-are-in-talks-to-end-the-block-on-metas-ai-shopping-agent-muse-in-amazons-online-store/)[[3]](https://techcrunch.com/2026/11/25/amazon-and-meta-reportedly-in-talks-to-lift-blockade-on-ai-agent-muse/)。亚马逊在九月驱逐了 Muse。这场封锁从来不是为了保护消费者免受失控 AI 的侵害，而是为了一个价值 686 亿美元的广告业务，该业务依赖于控制用户想买东西时哪些商品能出现在眼前 [[2]](https://the-decoder.com/amazon-and-meta-are-in-talks-to-end-the-block-on-metas-ai-shopping-agent-muse-in-amazons-online-store/)。Muse 已经拿下了所有智能体购物订单中 51% 的份额，这意味着它已经变成了一个不属于亚马逊的搜索结果页 [[2]](https://the-decoder.com/amazon-and-meta-are-in-talks-to-end-the-block-on-metas-ai-shopping-agent-muse-in-amazons-online-store/)。这一个统计数据，就道尽了冲突的全部。

谈判卡在了两点上：广告收入分成和对搜索结果的控制权 [[2]](https://the-decoder.com/amazon-and-meta-are-in-talks-to-end-the-block-on-metas-ai-shopping-agent-muse-in-amazons-online-store/)。剥去那层企业外交辞令，其诉求昭然若揭。亚马逊想要从 Meta 通过 Muse 引导购买行为所赚的钱里分一杯羹，并且希望对 Muse 推荐什么拥有否决权。这根本不是合作洽谈，这是在市场入口处设下的一个收费站。

对于任何正在构建与商业平台交互的智能体的人来说，Muse 的僵局就是未来的预演。平台不会保持中立。它们要么封杀你，要么抽你的税，要么要求你智能体的输出必须符合它们的营收优先级。打造一个能替用户购物、预订或谈判的智能体，技术能力已经具备。但部署它的法律和商业许可，正在那些不以用户利益为中心的公司的私下交易中被瓜分殆尽。

## 科学家的底线与开发者的现实

当平台在谈判收入分成时，研究者们正在划定另一种边界。Ai2 最近发布了一篇关于科学家在 AI 智能体上如何划定底线的文章，梳理了研究者们为自身工作设置的防护栏 [[1]](https://huggingface.co/blog/allenai/where-scientists-draw-the-line-on-ai-agents)。这些底线是为了安全、可复现性和伦理责任而划定的，源于谨慎，而非商业。

这种对比很有启发性。研究社区构建智能体时施加了谨慎的约束，是因为失败的代价很高，且系统尚未被完全理解。商业平台施加约束，则是因为去中介化的代价很高，且其营收模式已被完全吃透。两者都对智能体的行为产生了限制，但动机是截然不同的。一个是为了防止伤害，另一个是为了防止收入流失。

一个开发者如果认为这两种约束是等同的，就会把每一次商业封锁都误判为安全问题。事实并非如此。当一个平台说你的智能体不能访问其库存、API 或搜索结果时，你要问的问题不是“我违反了哪条安全规则？”，而是“我威胁到了谁的利润？”

## 这对智能体架构意味着什么

Muse 的谈判揭示出，智能体生态系统正在分裂成两个层级。第一层是由平台巨头或其授权合作伙伴构建的智能体。这些智能体将拥有访问权限，但其行为将受到用户永远看不到的商业协议的影响。第二层是其他所有人。独立智能体将面临一系列封锁、速率限制和法律威胁，而这些都与技术能力无关。

这有着直接的架构影响。一个核心功能依赖单一平台的智能体，就是一个能被商业拓展决策随时关停的智能体。希望自己的智能体能够存活下去的开发者，必须将平台访问视为一种脆弱的依赖，而非稳定的 API。这意味着要设计多源回退机制，将智能体的决策逻辑与任何平台的排名或推荐系统分离开，并在推荐行为受到智能体自身所屈从的商业关系影响时，对用户保持透明。

这带来的实际启示，不是要避免构建与平台交互的智能体，而是要带着“平台最终会要求对智能体的行为拥有发言权”这一假设去构建。如果你的架构无法在不损害用户信任的情况下承受这种要求，那么这个智能体的保质期，就掌握在别人家的营收团队手里。
