---
title: "基于Agent的视频理解正在改变AI开发者的成本结构"
date: 2026-09-02
category: analysis
summary: "Google的自适应视频分析与Ollama的透明定价展示了基于Agent的方法如何改变多模态AI的经济学。"
sources:
  - headline: "Introducing agentic video understanding with Gemini"
    url: https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/
    outlet: "Google DeepMind"
    published: 2026-09-01
  - headline: "Ollama's transparent pricing · Ollama Blog"
    url: https://ollama.com/blog/transparent-pricing
    outlet: "Ollama"
    published: 2026-08-31
  - headline: "Google Gemini's new agent-based video analysis cuts token usage by up to 88 percent"
    url: https://the-decoder.com/google-geminis-new-agent-based-video-analysis-cuts-token-usage-by-up-to-88-percent/
    outlet: "The Decoder"
    published: 2026-09-02
dropped: "373 matérias examinadas de 557 reunidas, 3 lidas para este texto. Descartadas: HTTP 429 (17), publicado há 17132h (4), publicado há 2328h (3), publicado há 2352h (2), publicado há 2469h (2), publicado há 6860h (2)"
---

对于从事视频处理的AI开发者来说，构建AI Agent的经济学正在发生变化。本周的两项公告——Google的Agentic视频理解[[1]](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/)[[3]](https://the-decoder.com/google-geminis-new-agent-based-video-analysis-cuts-token-usage-by-up-to-88-percent/)和Ollama的定价更新[[2]](https://ollama.com/blog/transparent-pricing)——指向了同一个趋势：基础设施提供商正在从蛮力计算转向更智能、自适应的方法，让模型决定如何分配资源。

## 模型作为预算敏感的Agent

Google的视频分析突破不在于更好的识别能力，而在于让模型像成本意识强的分析师一样行动。与以固定间隔处理每一帧（这种方法在无关紧要的画面上浪费了大量token）不同，Gemini的Agentic方法决定检查哪些片段以及以何种分辨率处理[[3]](https://the-decoder.com/google-geminis-new-agent-based-video-analysis-cuts-token-usage-by-up-to-88-percent/)。对于长视频，声称减少了88%的token使用量[[3]](https://the-decoder.com/google-geminis-new-agent-based-video-analysis-cuts-token-usage-by-up-to-88-percent/)，这表明当前大多数视频处理方式都过于死板且浪费。

这一点很重要，因为视频一直是规模化处理中最昂贵的模态。构建监控、内容审核或研究工具的团队通常不得不在高昂的API成本和自定义帧采样逻辑之间做出选择。现在，模型本身处理这种优化，这改变了任何处理时序数据的Agent的计算方式。

## 透明定价的连锁反应

Ollama的按token定价[[2]](https://ollama.com/blog/transparent-pricing)乍看与此无关，但它同样是基础设施成熟的一部分。当提供商不再将计算捆绑到不透明的层级中，而是开始按实际使用量收费时，它迫使开发者像Gemini视频Agent一样思考——不断评估哪些处理是必要的。透明定价奖励高效的架构。

对于Agent开发者来说，这意味着两个具体的变化：
1. 以前因成本过高而不可行的视频密集型工作流现在可能变得可行，尤其是长时间分析（如法律取证审查或野生动物监测）
2. 随着提供商暴露真实成本，旧的“扔更多token解决问题”的方法显然变得浪费

关键点不在于Gemini或Ollama本身，而在于基础设施正在演变，以支持像人类谨慎预算一样花费计算资源的Agent。围绕这一原则设计系统的开发者将随着这些定价和效率趋势的加速而占据优势。
