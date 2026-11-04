---
title: "基础设施在对你撒谎"
date: 2026-11-04
category: analysis
summary: "当债券市场发出警告，模型身份成为密码学问题，数据中心转入地下时，我们赖以构建的抽象层正在开裂。"
sources:
  - headline: "Please stop asking me when the AI bubble will pop"
    url: https://www.theverge.com/ai-artificial-intelligence/1025826/ai-bubble-pimco-apollo-bonds
    outlet: "The Verge"
    published: 2026-11-03
  - headline: "Anthropic is working on a system to prove AI models' identity"
    url: https://techcrunch.com/2026/11/03/anthropic-is-working-on-a-system-to-prove-ai-models-identity/
    outlet: "TechCrunch"
    published: 2026-11-03
  - headline: "Ukraine’s drone strikes spur hasty Russian plans for underground data centers"
    url: https://arstechnica.com/ai/2026/11/russia-looks-to-hide-data-centers-underground-as-ukrainian-drones-strike-back/
    outlet: "Ars Technica"
    published: 2026-11-03
dropped: "9 matérias examinadas de 585 reunidas, 3 lidas para este texto."
---

基础设施是别人该操心的事，这种舒适的抽象正在崩塌。多年来，构建者可以将模型视为产品，将 API 视为给定的前提，将数据中心视为云厂商资产负债表上的固定成本。本周的三个信号表明，这个时代正在终结，其后果将重塑智能体的构建、部署和信任方式。

先从钱说起，因为钱正在传递一个技术路线图若忽视便要自担风险的信息。AI 基础设施的债券发行仍在继续，但债券市场中有影响力的声音，包括太平洋投资管理公司（PIMCO）的 CEO，都在警告 AI 衰退 [[1]](https://www.theverge.com/ai-artificial-intelligence/1025826/ai-bubble-pimco-apollo-bonds)。这不是风险投资情绪的波动。债券市场为实物资产、电力合同和长期租赁定价。当它们动荡时，意味着计算层本身可能相对于需求建设过度了。对于任何依赖廉价推理来构建智能体的开发者来说，这是一个需要为可移植性而设计的警告。将代码硬编码到单一供应商的定价上，或假设成本会线性下降，都是在赌债券市场错了。

## 无需握手的身份

如果说计算层在财务上不稳定，那么身份层在密码学上就是缺失的。Anthropic 正在研究一个名为 FlashProve 的系统，它可以让任何人验证一个 AI 响应是否真的来自其声称的模型 [[2]](https://techcrunch.com/2026/11/03/anthropic-is-working-on-a-system-to-prove-ai-models-identity/)。这不是一项功能。这是一个缺失的原语。如今的智能体在模型之间路由输出、链式调用和总结结果，却没有可验证的监管链。一个归因于前沿模型的响应，可能来自一个更便宜的替代品、一个缓存的结果或一个受攻击的端点。FlashProve 指向一个模型身份可被证明的世界。构建者应该开始将模型来源视为一项要求，而非锦上添花，特别是对于那些处理金融数据、签署交易或生成附带审计追踪决策的智能体。

## 地面的转移

然后是地面本身。乌克兰对暴露的数字基础设施的无人机袭击，正推动俄罗斯制定建设地下数据中心的计划 [[3]](https://arstechnica.com/ai/2026/11/russia-looks-to-hide-data-centers-underground-as-ukrainian-drones-strike-back/)。这是物理约束在迫使架构决策。地上的数据中心存在软件无法修补的脆弱性。这对智能体构建者的启示无关地缘政治，而是关于延迟、故障转移，以及物理拓扑决定数字可靠性的现实。基于单区域假设设计的智能体，一旦基础设施发生迁移，无论是转入地下、移到另一个大陆还是完全下线，就会崩溃。数据中心是一个稳定坐标的抽象是错误的。

## 裂隙中何物能存

这三条线都指向同一个方向：智能体之下的各层正变得更不可靠，而非更可靠。务实的回应是，逆着这种不稳定性的纹理来构建。设计那些无需修改代码即可切换推理供应商的智能体。将模型身份视为一种可验证的声明，而非一个字符串标签。为地理不确定性而架构，做到当一个区域不可用时，智能体可以从另一个区域继续运行。债券市场、密码学证明和地下数据中心并非孤立的故事。它们是同一个故事，用金融、数学和物理的语言讲述。基础设施正在对其永久性向你撒谎。据此构建吧。
