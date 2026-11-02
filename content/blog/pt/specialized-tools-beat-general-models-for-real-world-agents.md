---
title: "Ferramentas Especializadas Superam Modelos Gerais para Agentes do Mundo Real"
date: 2026-11-02
category: analysis
summary: "Agentes que escolhem a ferramenta certa para cada tarefa superam modelos de propósito geral, mas a adoção no mundo real ainda fica para trás devido a custo e confiança."
sources:
  - headline: "Adobe is testing how well AI agents can use editing tools like a Photoshop professional would"
    url: https://the-decoder.com/adobe-is-testing-how-well-ai-agents-can-use-editing-tools-like-a-photoshop-professional-would/
    outlet: "The Decoder"
    published: 2026-11-01
  - headline: "Basically no one is using AI agents for their DoorDash orders"
    url: https://arstechnica.com/ai/2026/10/doordash-says-outside-ai-agents-have-only-led-to-hundreds-of-orders-so-far/
    outlet: "Ars Technica"
    published: 2026-10-30
  - headline: "Zest's new AI agent finds restaurants and books reservations over text"
    url: https://techcrunch.com/2026/10/30/zests-new-ai-agent-finds-restaurants-and-books-reservations-over-text/
    outlet: "TechCrunch"
    published: 2026-10-30
dropped: "80 matérias examinadas de 530 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (2), publicado há 122h (1), publicado há 245h (1), publicado há 294h (1), publicado há 296h (1), publicado há 480h (1)"
---

A lacuna entre o que os agentes de IA podem fazer em laboratório e o que as pessoas realmente usam está aumentando. O EditAgent da Adobe mostra que ferramentas especializadas, não modelos gerais maiores, são a chave para um desempenho competente—mas precisa de dez vezes mais computação. Enquanto isso, agentes voltados ao consumidor, como pedidos no DoorDash e o concierge de restaurantes da Zest, estão lutando para encontrar usuários. A lição para os construtores: foque na seleção de ferramentas e eficiência, não apenas na escala do modelo.

## A Ferramenta Certa para o Trabalho

A Adobe Research e a UC San Diego construíram o EditAgent, um sistema de IA que edita imagens mais como um profissional do Photoshop. Em vez de tentar repetidamente o mesmo editor de propósito geral, o agente escolhe a ferramenta especializada certa para cada tarefa e deixa um modelo de linguagem padrão escolher o melhor resultado com base em dados de imagem medidos [[1]](https://the-decoder.com/adobe-is-testing-how-well-ai-agents-can-use-editing-tools-like-a-photoshop-professional-would/). Essa abordagem funciona, mas precisa de cerca de dez vezes mais computação. A troca é clara: competência vem da orquestração, não apenas do poder bruto do modelo.

Para construtores de agentes, essa é uma percepção crucial. Modelos de propósito geral são versáteis, mas ineficientes. Ao dar a um agente uma caixa de ferramentas de funções especializadas e uma maneira de avaliar resultados, você pode obter melhores resultados—se puder arcar com a sobrecarga. O desafio é tornar essa orquestração barata o suficiente para produção.

## A Lacuna de Adoção

Apesar dos avanços técnicos, o uso no mundo real permanece baixo. A Ars Technica relata que basicamente ninguém está usando agentes de IA para seus pedidos no DoorDash, embora ainda seja cedo para o caso de uso de comércio eletrônico relativamente novo [[2]](https://arstechnica.com/ai/2026/10/doordash-says-outside-ai-agents-have-only-led-to-hundreds-of-orders-so-far/). Da mesma forma, o novo agente de IA da Zest encontra restaurantes e faz reservas por mensagem de texto, mas está apenas sendo lançado e enfrenta a mesma batalha difícil pela confiança do usuário [[3]](https://techcrunch.com/2026/10/30/zests-new-ai-agent-finds-restaurants-and-books-reservations-over-text/).

Por que a hesitação? Para os consumidores, os agentes ainda não são confiáveis e são opacos. Um pedido errado no DoorDash ou uma reserva malfeita é um inconveniente real. Para as empresas, o custo de executar agentes como o EditAgent é proibitivo. Até que os agentes se tornem confiáveis e acessíveis, a adoção ficará atrás da capacidade.

## O que os Construtores Devem Fazer

Primeiro, invista na seleção de ferramentas. Em vez de depender de um único modelo para fazer tudo, projete agentes que possam escolher entre um conjunto de ferramentas especializadas e avaliar resultados objetivamente. Segundo, otimize para eficiência. O custo de computação dez vezes maior do EditAgent é um aviso: se seu agente não for enxuto, ele não vai escalar. Finalmente, construa confiança incrementalmente. Comece com tarefas de baixo risco onde erros são toleráveis e deixe os usuários verem o raciocínio do agente. O caminho para a adoção é pavimentado com pequenas vitórias confiáveis—não demonstrações chamativas.
