---
title: "A Entrevista Agora Está a um Prompt de Distância"
date: 2026-10-15
category: analysis
summary: "A entrevista com cliente via IA da McKinsey e os experimentos de autonomia do setor financeiro revelam a mesma mudança: agentes não são mais ferramentas que você usa, mas papéis que você projeta e avalia."
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

No momento em que uma empresa pede a um candidato que prove seu valor conversando com uma máquina, a máquina deixa de ser uma ferramenta e se torna o padrão. Essa é a linha que cruzamos esta semana, e ela muda o que significa construir um agente.

A McKinsey & Company agora exigirá que alguns candidatos a cargos iniciais tenham uma conversa de 10 minutos com uma simulação de IA de um cliente como parte do processo seletivo [[2]](https://www.theverge.com/news/1011654/mckinsey-ai-client-interview). Isso não é um chatbot filtrando palavras-chave. É um adversário de role-playing projetado para testar como um humano pensa sob pressão. A IA não é a assistente na sala. É a guardiã do portão.

Para quem constrói agentes, a implicação é imediata. Avaliação não é mais uma preocupação separada que você anexa após o treinamento. Quando uma empresa como a McKinsey implanta um cliente simulado para julgar o desempenho humano, a mesma lógica se aplica aos agentes que você entrega. Seu agente não está pronto quando passa em um benchmark. Ele está pronto quando consegue se sustentar contra uma contraparte simulada que foi construída para expor suas fraquezas. Se você não está construindo ambientes de avaliação adversariais para seus agentes, outra pessoa os construirá para você — e será ela quem decidirá se seu sistema está apto para produção.

## Autonomia com Coleira

A mesma tensão entre capacidade e controle veio à tona em um cenário bem diferente. Na AI Engineer New York, laboratórios de ponta e empresas financeiras discutiram como dar aos agentes autonomia útil sobre decisões consequentes, mantendo um humano no circuito [[3]](https://www.latent.space/p/crossing-the-threshold). A indústria financeira não tem o luxo de se mover rápido e pedir desculpas depois. Uma negociação errada executada por um agente com dinheiro real não é uma alucinação que você pode regenerar. É um prejuízo.

O que emergiu dessas conversas é um padrão que se aplica muito além das finanças: as arquiteturas de agente mais interessantes não são as que maximizam a autonomia, mas as que tornam a fronteira entre autonomia e supervisão explícita e auditável. O agente não pede permissão a cada passo. Ele opera dentro de um limite declarado e expõe seu raciocínio quando se aproxima da borda desse limite. Isso não é um detalhe técnico. É uma primitiva de governança.

## A Verdadeira Avaliação é Confiança

A Apple brevemente tocou uma avaliação de mercado de US$ 5 trilhões durante o horário regular de negociação, um número tão grande que se torna abstrato [[1]](https://www.infomoney.com.br/mercados/apple-atinge-valor-de-mercado-inedito-de-us-5-tri-e-segue-como-segunda-mais-valiosa/). Mas o número em si não é o ponto. O ponto é o que sustenta uma avaliação dessas ao longo do tempo: uma cadeia de decisões sobre o que roda no dispositivo, o que sai do dispositivo e quem pode auditar a diferença. Essa cadeia é feita das mesmas questões de governança que as empresas financeiras estão fazendo sobre seus agentes e que a McKinsey está incorporando em seu processo de contratação.

Quando uma empresa decide que uma IA pode simular um cliente bem o suficiente para julgar um humano, ela está fazendo uma declaração sobre onde deposita confiança. A mesma declaração é feita toda vez que você decide se seu agente chama uma API externa, escreve em um banco de dados ou envia um e-mail sem um humano no circuito. Os construtores que entenderem isso deixarão de tratar a avaliação como uma fase e começarão a tratá-la como infraestrutura. Eles construirão contrapartes simuladas que desafiam seus agentes antes que o mundo o faça. E definirão os limites da autonomia não em um documento de design, mas em código que pode ser inspecionado, testado e responsabilizado.

Essa é a conclusão prática. Construa o avaliador antes de construir o agente. Faça da fronteira entre autonomia e supervisão uma primitiva configurável, não um acordo de aperto de mão. E assuma que todo agente que você entrega eventualmente enfrentará um adversário simulado que foi projetado para quebrá-lo. Se você não construir esse adversário primeiro, outra pessoa o fará.
