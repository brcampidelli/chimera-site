---
title: "面试，现在只需一句提示词"
date: 2026-10-15
category: analysis
summary: "麦肯锡的 AI 客户面试与金融行业的自主性实验揭示了同一个转变：智能体不再是你使用的工具，而是你设计并用来评估的角色。"
sources:
  - headline: "Apple atinge valor de mercado inédito de US$ 5 tri e segue como segunda mais valiosa"
    url: https://www.infomoney.com.br/mercados/apple-atinge-valor-de-mercado-inedito-de-us-5-tri-e-segue-como-segunda-mais-valiosa/
    outlet: "InfoMoney"
    published: 2026-10-14
  - headline: "McKinsey is making job applicants spar with a fake AI client"
    url: https://www.theverge.com/news/1011654/mckinsey-ai-client-interview
    outlet: "The Verge"
    published: 2026-10-14
  - headline: "Crossing the Threshold: How OpenAI and Anthropic Approach Autonomy and Safety in Financial Agents"
    url: https://www.latent.space/p/crossing-the-threshold
    outlet: "Latent Space"
    published: 2026-10-14
dropped: "9 matérias examinadas de 589 reunidas, 3 lidas para este texto."
---

当一家公司要求求职者通过与机器对话来证明自身价值的那一刻，机器就不再是工具，而成了标准。这就是我们本周跨过的那条线，它改变了构建智能体的含义。

麦肯锡公司现在将要求部分初级岗位的申请者与一个模拟客户的 AI 进行 10 分钟的对话，作为面试流程的一部分 [[2]](https://www.theverge.com/news/1011654/mckinsey-ai-client-interview)。这不是一个筛选关键词的聊天机器人。这是一个角色扮演的对手，旨在测试人类在压力下的思考方式。AI 不是房间里的助手，而是守门人。

对于任何构建智能体的人来说，其影响是立竿见影的。评估不再是你训练完之后才附加上的独立环节。当麦肯锡这样的公司部署一个模拟客户来评判人类表现时，同样的逻辑也适用于你交付的智能体。你的智能体不是通过基准测试就做完了，而是当它能与一个专为暴露其弱点而构建的模拟对手抗衡时，才算完成。如果你不为你的智能体构建对抗性评估环境，别人会为你构建——而他们将决定你的系统是否适合生产环境。

## 带枷锁的自主性

能力与控制之间的同样张力，在一个截然不同的场景中浮现了出来。在 AI Engineer New York 大会上，前沿实验室和金融公司讨论了如何在让人类参与决策的前提下，赋予智能体对重大决策有用的自主性 [[3]](https://www.latent.space/p/crossing-the-threshold)。金融行业没有快速行动、事后道歉的奢侈。一个智能体用真金白银执行了一笔错误交易，这不是你能重新生成幻觉，而是一笔实打实的损失。

从这些对话中浮现出的模式，其适用范围远超金融领域：最有趣的智能体架构，不是那些最大化自主性的，而是那些让自主与监督之间的边界变得明确且可审计的。智能体不会在每一步都请求许可。它在声明的阈值内运作，并在接近阈值边缘时展示其推理过程。这不是一个技术细节，而是一个治理原语。

## 真正的估值是信任

苹果在常规交易时段一度触及 5 万亿美元的市值，这个数字大到近乎抽象 [[1]](https://www.infomoney.com.br/mercados/apple-atinge-valor-de-mercado-inedito-de-us-5-tri-e-segue-como-segunda-mais-valiosa/)。但这个数字本身不是重点。重点是什么能长期支撑这样的估值：一连串关于什么在设备上运行、什么离开设备，以及谁有权审计其中差异的决策。这一连串决策，正是由金融公司对其智能体提出的、以及麦肯锡正嵌入其招聘流程中的那些治理问题构成的。

当一家公司认定 AI 能够足够好地模拟客户来评判人类时，它就是在对信任的归属做出声明。每当你决定你的智能体是否在没有人类参与的情况下调用外部 API、写入数据库或发送邮件时，你也在做出同样的声明。理解这一点的构建者将不再把评估视为一个阶段，而开始将其视为基础设施。他们将构建模拟对手，在现实世界之前挑战自己的智能体。他们将不会在设计文档中定义自主性的阈值，而是用可检查、可测试、可追责的代码来定义。

这就是实际要做的。在构建智能体之前，先构建评估器。让自主与监督之间的边界成为一个可配置的原语，而不是一个握手协议。并假设你交付的每个智能体最终都将面对一个旨在攻破它的模拟对手。如果你不先构建这个对手，别人会。
