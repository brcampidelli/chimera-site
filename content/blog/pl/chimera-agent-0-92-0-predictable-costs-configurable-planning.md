---
title: "Chimera Agent 0.92.0: Custos previsíveis, planejamento configurável"
date: 2026-11-21
category: update
summary: "Os recibos de custo agora usam precificação em tempo real, o planejador é explicitamente configurável e a busca nas configurações do Desktop cobre a tabela de roteamento."
version: "0.92.0"
---

## Recibos de custo que batem com o que você realmente paga

Antes da 0.92.0, o rastreamento de custos fora do `serve` dependia de um catálogo estático que se distanciava das taxas reais dos provedores. Uma execução podia reportar um custo que parecia plausível, mas estava errado — às vezes o suficiente para desviar um cálculo de orçamento. A discrepância era especialmente visível quando você usava um slug de modelo exato que o catálogo não reconhecia: o sistema recorria a uma taxa genérica ou simplesmente não mostrava nada útil.

Esta versão passa a usar o índice público de preços do OpenRouter para execuções que não passam pelo `serve`. Slugs de modelo exatos agora são resolvidos para suas próprias taxas, em vez de serem agrupados em uma média da família. Quando uma chamada é estrita — ou seja, o provedor e o modelo são travados na admissão — o recibo preserva a cotação que foi aceita, então o número que você vê é o número que foi realmente autorizado. A entrada do catálogo `gpt-oss-20b` também foi atualizada para refletir a precificação atual.

O efeito prático é que você pode pegar um recibo de uma execução em lote, multiplicar pelo seu volume esperado e obter um número que se sustenta. Chega de verificações manuais no painel do provedor.

## O planejador agora é uma chave que você controla

Até agora, o planejador estava sempre ligado. Você não podia desligá-lo para uma coluna específica do Kanban, uma chamada de API ou uma etapa de resolução de workflow. Isso significava que cada tarefa pagava o custo de latência e tokens de uma passada de planejamento, mesmo quando a tarefa era trivial ou as instruções já eram explícitas o suficiente para que o planejamento não acrescentasse nada.

A versão 0.92.0 expõe `use_planner` como uma flag de configuração. Defina-a como `false` em uma coluna, uma execução ou uma etapa de resolução, e o agente pula completamente a fase de planejamento. O padrão permanece `true`, então os workflows existentes não mudam de comportamento a menos que você opte por isso. A flag está disponível nas três superfícies — configuração do Kanban, API e definições de workflow — para que você posa ser seletivo. Uma coluna que lida com classificação simples pode pular o planejamento, enquanto uma coluna vizinha que faz pesquisa em múltiplas etapas o mantém.

Por que não simplesmente tornar o planejamento mais inteligennte? Porque o custo de adivinhar errado é maior do que o custo de lhe dar a chave. Uma heurística que tenta decidir se o planejamento é necessário às vezes decidirá errado, e depurar is o é mais difísil do que inverter um booleano que você controla.

## Configurações do Desktop que você realmente encontra

A busca de configurações no aplicativo Desktop anteriormente não alcançava a tabela de roteamento por modelo e função. Você podia digitar "roteamento" ou "função" e não obter resultados, mesmo que a tabela estivesse bem ali no painel de configurações. Is o foi corrigido: a tabela de roteamento agora é indexada e aparece na busca.

Duas correções de localização também são incluídas nesta versão. A tabela de roteamento e o texto do recibo agora são exibidos corretamente em português brasilieiro — antes, alguns rótulos estavam recorrendo ao inglês. Novas conversas e turnos apenas de resposta também mostram mensagens de status mais claras, para que você não fique olhando para um spinner se perguntando se o modelo está pensando ou a conexão caiu.

## O que permanece experimental

Vários experimentos receberam atualizações sem alterar os padrões. O benchmark de extração de memória foi inconclusivo, então o limite de 6.000 caracteres e o modelo global permanecem. Você pode optar por um modelo de extração explícito e um pré-filtro determinístico se quiser testar o novo camiho. O experimento de níveis de modelo para cron mostrou correção total em sete de oito tarefas sintéticas, mas tarefas sintéticas não são tarefas de produção, e os padrões não mudaram. Os experimentos de refinamento enxuto de Design e de proporcionalidade de prompt também permanecem desligados por padrão.

Os instaladores do Desktop ainda não são asinados e podem solicitar confirmação no primeiro lançamento. O aplicativo verifica asinaturas nos pacotes do atualizador.

Atualize com `pip install chimera-agent --upgrade` e defina `use_planner` onde precisar. O changelog completo está em [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
