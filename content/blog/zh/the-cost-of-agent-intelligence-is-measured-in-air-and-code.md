---
title: "智能体的成本，要用空气和代码来计量"
date: 2026-10-22
category: analysis
summary: "智能体开发者如今面临双重核算难题：推理带来的外部性，以及 AI 发现漏洞所引发的非对称风险。"
sources:
  - headline: "Data centers could erase decades of air quality gains"
    url: https://www.theverge.com/ai-artificial-intelligence/1015958/data-center-pollution-rising-report
    outlet: "The Verge"
    published: 2026-10-21
  - headline: "Tesla supera em lucro e melhora fluxo de caixa apesar de investimentos em IA"
    url: https://www.infomoney.com.br/mercados/tesla-supera-em-lucro-e-melhora-fluxo-de-caixa-apesar-de-investimentos-em-ia/
    outlet: "InfoMoney"
    published: 2026-10-21
  - headline: "OpenAI's GPT-5.6 Sol and Google's Gemini 4 Argon found critical PHP flaw affecting millions of websites"
    url: https://the-decoder.com/openais-gpt-5-6-sol-and-gemini-4-argon-discovered-the-critical-php-vulnerability-affecting-millions-of-websites/
    outlet: "The Decoder"
    published: 2026-10-21
dropped: "18 matérias examinadas de 532 reunidas, 3 lidas para este texto."
---

支撑自主智能体运行的基础设施，已经开始产生一些不会出现在任何云账单上的开销。一笔账单以颗粒物的形式到来，另一笔则以数百万网站共用代码中的严重漏洞出现。两者都不在当初兜售智能体 AI 时的定价范围内，而现在，它们都落在了构建这些系统的人身上。

未来五年内，数据中心的电力需求可能会抹去几十年的空气质量改善成果 [[1]](https://www.theverge.com/ai-artificial-intelligence/1015958/data-center-pollution-rising-report)。这已不是遥远的监管担忧，而是一个将影响模型选择、推理路由，乃至判断某项任务是否值得动用智能体的硬性约束。在成本压力下，“算力越多越好”的假设本就在动摇。空气质量数据更是将其推向了一条近乎设计原则的准则：最便宜的推理，就是你压根没跑的那一次。

## 双向发现难题

如今的智能体系统已经足够强大，能发现人类审查多年来都未察觉的缺陷。OpenAI 的 GPT-5.6 Sol 作为“修补地球”计划的一部分，发现了一个影响数百万网站的严重 PHP 漏洞；安全公司 Wiz 也独立使用 Google 的 Gemini 4 Argon 发现了同一漏洞 [[3]](https://the-decoder.com/openais-gpt-5-6-sol-and-gemini-4-argon-discovered-the-critical-php-vulnerability-affecting-millions-of-websites/)。这确实是一次实打实的能力提升，但也是一个警告。OpenAI 自己的声明指出，能发现漏洞的能力，同样也能帮助攻击者利用漏洞 [[3]](https://the-decoder.com/openais-gpt-5-6-sol-and-gemini-4-argon-discovered-the-critical-php-vulnerability-affecting-millions-of-websites/)。

对开发者来说，这抹平了攻防之间的距离。一个审计你依赖项的智能体，同样也能绘制你的攻击面。工具是对称的，唯一的非对称性在于谁先动手。将 AI 辅助的安全审查视为持续流程的团队，会在漏洞被利用前打好补丁；而将其视为定期审计的团队，则要和他们自己使用的模型赛跑。

## 现金流的现实检验

特斯拉的季度财报为这种悲观论调提供了一个有用的反例。该公司公布了 15.3 亿美元的自由现金流，从上季度的负数转正，同时明确将 AI 和机器人技术投资作为其在这些领域布局的一部分 [[2]](https://www.infomoney.com.br/mercados/tesla-supera-em-lucro-e-melhora-fluxo-de-caixa-apesar-de-investimentos-em-ia/)。这里的启示并非 AI 投资很安全，而是现金流纪律与 AI 支出并非互斥，哪怕对一家在模型和硬件上投入巨资的公司也是如此。

对智能体开发者而言，实际可落地的经验更具体一些。你可以在不把算力当免费品的前提下投资智能体能力；你可以运行以安全为核心的智能体，而不假设它们只会被你的团队使用；你也可以用 token 和延迟之外的维度来衡量一项任务的成本。空气质量数据和 PHP 漏洞，是从两个方向讲述的同一个故事：智能体智能的外部性正在变得可见，并且正在变成你的问题。

眼下依然务实可行的做法是：像审计依赖项一样审计你的推理量；将每一次智能体部署都视为一个安全面，而不仅仅是一个生产力工具；当某个模型在你的技术栈中发现一个漏洞时，默认别人的模型也已经在找它了。
