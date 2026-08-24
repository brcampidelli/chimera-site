---
title: "专有AI模型的真实成本"
date: 2026-08-24
category: analysis
summary: "近期的发展表明，专有AI模型会带来法律风险、市场扭曲和隐藏的依赖关系，开源Agent开发者应避免这些问题。"
sources:
  - headline: "Thomson Reuters investe US$ 40 milhões e lança modelo próprio de IA"
    url: https://exame.com/inteligencia-artificial/thomson-reuters-investe-us-40-milhoes-e-lanca-modelo-proprio-de-ia/
    outlet: "Exame"
    published: 2026-08-24
  - headline: "Is it legal to train AI models on copyrighted books? It’s complicated"
    url: https://techcrunch.com/2026/08/23/is-it-legal-to-train-ai-models-on-copyrighted-books-its-complicated/
    outlet: "TechCrunch"
    published: 2026-08-23
  - headline: "How China's gray market sells Claude tokens at a fraction of the price"
    url: https://the-decoder.com/how-chinas-gray-market-sells-claude-tokens-at-a-fraction-of-the-price/
    outlet: "The Decoder"
    published: 2026-08-23
dropped: "372 matérias examinadas de 549 reunidas, 3 lidas para este texto. Descartadas: HTTP 429 (16), publicado há 16916h (4), publicado há 2112h (3), publicado há 2136h (2), publicado há 6644h (2), publicado há 6691h (2)"
---

急于构建专有AI模型的行为带来了三个根本性问题，这些问题会削弱其长期可行性：法律不确定性、人为稀缺性和隐藏的依赖关系。这些问题对于构建Agent的开发者至关重要，因为它们决定了你可以信任哪些基础设施来构建你的系统。

## 训练数据中的法律雷区

[[2]](https://techcrunch.com/2026/08/23/is-it-legal-to-train-ai-models-on-copyrighted-books-its-complicated/) 强调了围绕AI训练数据的未解决版权问题。大多数已发表的作品在未经明确同意的情况下被使用，这为基于这些数据训练的模型带来了潜在的法律责任。对于Agent开发者来说，这意味着专有模型携带着未公开的法律风险，这些风险可能会突然改变游戏规则。开源替代方案允许你直接审计和控制你的训练数据管道。

## 人为稀缺性催生灰色市场

当 [[3]](https://the-decoder.com/how-chinas-gray-market-sells-claude-tokens-at-a-fraction-of-the-price/) 描述中国开发者通过灰色市场以10%的标价购买Claude代币时，它揭示了访问控制如何创造扭曲的激励。专有模型试图通过地理封锁和验证系统来强制实施人为稀缺性，但这些措施不可避免地催生了影子经济。结果是不可预测的访问和受损的安全系统——这正是Agent开发者需要避免的。

## 依赖陷阱

[[1]](https://exame.com/inteligencia-artificial/thomson-reuters-investe-us-40-milhoes-e-lanca-modelo-proprio-de-ia/) 显示Thomson Reuters投资了4000万美元在开源基础上构建专有模型。这种模式——公司利用开源工作，添加专有层，然后将用户锁定——应该引起所有Agent开发者的关注。每个专有模型都成为你架构中的单点故障。

对于实际的下一步：审计你的Agent的依赖关系，尽可能选择开源权重模型，并构建抽象层，以便在法律或访问问题出现时能够切换组件。最具韧性的Agent将是那些能够在专有基础不可避免地崩溃时适应的Agent。
