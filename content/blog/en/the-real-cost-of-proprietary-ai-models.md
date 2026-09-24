---
title: "The real cost of proprietary AI models"
date: 2026-08-24
category: analysis
summary: "Recent developments show how proprietary AI models create legal risks, market distortions, and hidden dependencies that open-source agent builders should avoid."
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

The rush to build proprietary AI models creates three fundamental problems that undermine their long-term viability: legal uncertainty, artificial scarcity, and hidden dependencies. These issues matter profoundly for anyone building agents, because they determine what infrastructure you can trust to build upon. 

## Legal minefields in training data

[[2]](https://techcrunch.com/2026/08/23/is-it-legal-to-train-ai-models-on-copyrighted-books-its-complicated/) highlights the unresolved copyright questions surrounding AI training data. Most published works have been used without explicit consent, creating potential liability for models trained on this data. For agent builders, this means proprietary models carry undisclosed legal risks that could suddenly change the rules of the game. Open-source alternatives allow you to audit and control your training data pipeline directly.

## Artificial scarcity creates gray markets

When [[3]](https://the-decoder.com/how-chinas-gray-market-sells-claude-tokens-at-a-fraction-of-the-price/) describes Chinese developers buying Claude tokens at 10% of list price through gray markets, it reveals how access controls create perverse incentives. Proprietary models attempt to enforce artificial scarcity through geoblocking and verification systems, but these inevitably spawn shadow economies. The result is unpredictable access and compromised safety systems - exactly what agent builders need to avoid.

## The dependency trap

[[1]](https://exame.com/inteligencia-artificial/thomson-reuters-investe-us-40-milhoes-e-lanca-modelo-proprio-de-ia/) shows Thomson Reuters investing $40 million to build a proprietary model on top of open-source foundations. This pattern - companies taking open work, adding proprietary layers, then locking users in - should concern anyone building agents. Each proprietary model becomes a single point of failure in your architecture.

For practical next steps: audit your agent's dependencies, prefer open-weight models where possible, and build abstraction layers that let you switch components when legal or access issues arise. The most resilient agents will be those that can adapt when proprietary foundations inevitably crack.
