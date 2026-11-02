---
title: "Ferramentas especializadas batem modelos genéricos em agentes para o mundo real"
date: 2026-11-02
category: analysis
summary: "Agentes que escolhem a ferramenta certa para cada tarefa superam modelos de propósito geral, mas a adoção no mundo real ainda patina por causa de custo e confiança."
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

A distância entre o que os agentes de IA conseguem fazer em laboratório e o que as pessoas de fato usam está aumentando. O EditAgent, da Adobe, mostra que ferramentas especializadas — e não modelos genéricos maiores — são a chave para um desempenho competente, mas ele exige dez vezes mais computação. Enquanto isso, agentes voltados ao consumidor, como os pedidos do DoorDash e o concierge de restaurantes da Zest, estão penando para encontrar usuários. A lição para quem constrói: foquem em seleção de ferramentas e eficiência, não apenas na escala do modelo.

## A ferramenta certa para cada trabalho

A Adobe Research e a UC San Diego criaram o EditAgent, um sistema de IA que edita imagens de forma mais parecida com a de um profissional de Photoshop. Em vez de ficar repetindo tentativas com o mesmo editor genérico, o agente escolhe a ferramenta especializada correta para cada tarefa e deixa um modelo de linguagem padrão selecionar o melhor resultado com base em dados mensuráveis da imagem [[1]](https://the-decoder.com/adobe-is-testing-how-well-ai-agents-can-use-editing-tools-like-a-photoshop-professional-would/). A abordagem funciona, mas exige cerca de dez vezes mais computação. A troca é clara: a competência vem da orquestração, não apenas da força bruta do modelo.

Para quem constrói agentes, essa é uma percepção crucial. Modelos de propósito geral são versáteis, mas ineficientes. Ao dar a um agente uma caixa de ferramentas com funções especializadas e uma forma de avaliar os resultados, você alcança resultados melhores — se puder arcar com o custo adicional. O desafio é baratear essa orquestração a ponto de viabilizá-la em produção.

## A lacuna de adoção

Apesar dos avanços técnicos, o uso no mundo real continua baixo. A Ars Technica relata que basicamente ninguém está usando agentes de IA para fazer pedidos no DoorDash, embora ainda seja cedo para esse caso de uso relativamente novo no e-commerce [[2]](https://arstechnica.com/ai/2026/10/doordash-says-outside-ai-agents-have-only-led-to-hundreds-of-orders-so-far/). De forma parecida, o novo agente de IA da Zest encontra restaurantes e faz reservas por mensagem de texto, mas está apenas começando e enfrenta a mesma batalha difícil pela confiança do usuário [[3]](https://techcrunch.com/2026/10/30/zests-new-ai-agent-finds-restaurants-and-books-reservations-over-text/).

Por que a hesitação? Para os consumidores, os agentes ainda não são confiáveis e são opacos. Um pedido errado no DoorDash ou uma reserva malfeita é um transtorno real. Para as empresas, o custo de rodar agentes como o EditAgent é proibitivo. Até que os agentes se tornem confiáveis e financeiramente viáveis, a adoção vai continuar atrás da capacidade técnica.

## O que os construtores devem fazer

Primeiro, invistam em seleção de ferramentas. Em vez de depender de um único modelo para fazer tudo, projetem agentes que possam escolher entre um conjunto de ferramentas especializadas e avaliar os resultados de forma objetiva. Segundo, otimizem para eficiência. O custo computacional dez vezes maior do EditAgent é um alerta: se o seu agente não for enxuto, ele não vai escalar. Por fim, construam confiança de forma incremental. Comecem com tarefas de baixo risco, em que erros são toleráveis, e deixem os usuários verem o raciocínio do agente. O caminho para a adoção é pavimentado com vitórias pequenas e confiáveis — não com demonstrações chamativas.
