---
title: "AI自主性在智能体开发中的局限"
date: 2026-09-28
category: analysis
summary: "近期研究表明，尽管AI智能体在模型开发任务中的参与度不断提升，但仍需大量人工监督。"
sources:
  - headline: "OpenAI pauses training of its ‘most capable models’"
    url: https://www.theverge.com/ai-artificial-intelligence/1001049/openai-training-pause
    outlet: "The Verge"
    published: 2026-09-28
  - headline: "AI agents do more of the work in model development, but humans still make the decisions"
    url: https://the-decoder.com/ai-agents-do-more-of-the-work-in-model-development-but-humans-still-make-the-decisions/
    outlet: "The Decoder"
    published: 2026-09-27
  - headline: "Researchers plug GPT-6 Astra directly into a robot and let it clean up an unfamiliar kitchen"
    url: https://the-decoder.com/researchers-plug-gpt-6-astra-directly-into-a-robot-and-let-it-clean-up-an-unfamiliar-kitchen/
    outlet: "The Decoder"
    published: 2026-09-27
dropped: "381 matérias examinadas de 568 reunidas, 3 lidas para este texto. Descartadas: HTTP 429 (18), publicado há 17756h (4), publicado há 2952h (3), publicado há 5852h (2), publicado há 7484h (2), publicado há 7531h (2)"
---

AI智能体自主性的承诺始终面临一个根本性限制：我们仍然无法完全信任它们在没有人工监督的情况下工作。本周的三项独立进展表明，即使是最先进的系统，在关键时刻仍依赖于人类的判断。

## 人工监督仍是不可妥协的

OpenAI决定暂停其最强大模型的训练[[1]](https://www.theverge.com/ai-artificial-intelligence/1001049/openai-training-pause)，揭示了不可预测行为仍然困扰着顶级AI系统。该公司在开发过程中不断遇到“意外或令人担忧”的智能体行为，迫使其维持严格的人工监督协议。这不仅关乎安全性，更关乎对我们尚未完全理解的系统保持控制。

## 智能体辅助但不决策

一项新研究分析了769份AI模型开发任务日志，揭示了智能体自主性的实际边界[[2]](https://the-decoder.com/ai-agents-do-more-of-the-work-in-model-development-but-humans-still-make-the-decisions/)。虽然AI系统生成了55%的方法提案，但人类做出了超过85%的最终决策。最具说服力的是：三分之一的开发任务如果没有人类的主动参与，根本不会启动。这项研究证实，智能体活动的增加并不意味着真正的自主性。

## 直接控制伴随风险

斯坦福/加州理工学院的厨房实验展示了减少人工监督的潜力与风险[[3]](https://the-decoder.com/researchers-plug-gpt-6-astra-directly-into-a-robot-and-let-it-clean-up-an-unfamiliar-kitchen/)。他们的HomeBody系统绕过了传统的控制层，允许GPT-6 Astra直接指挥机器人行动。虽然令人印象深刻，但这种方法在非受控环境中的可靠性引发了质疑——这正是OpenAI对其最先进模型保持谨慎的原因。

对于开发智能体的工程师来说，这些进展凸显了建立强大治理框架的必要性。实际经验表明：设计系统时，应确保人类保留最终审批权，尤其是在关键决策上。智能体的辅助可以显著提高生产力，但人类的判断仍然是目前无法自动化的重要安全机制。
