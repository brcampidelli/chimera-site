---
title: "Chimera Agent 0.92.0: Recibos de custo, controle do planner e busca nas configurações"
date: 2026-11-19
category: update
summary: "Execuções fora do serve agora mostram custos por modelo com precisão, o planner pode ser desabilitado por raia ou chamada de API, e a busca das configurações do Desktop encontra a tabela de roteamento."
version: "0.92.0"
---

## O que você paga é o que você vê

O rastreamento de custos para execuções fora do `serve` era um chute. O sistema usava um fallback genérico que ignorava o modelo real que você chamava. Se você fizesse uma verificação de admissão restrita contra um slug de modelo específico, o recibo ainda mostrava o preço de catálogo genérico. Os números estavam na direção certa, mas erravam no detalhe, e isso tornava as auditorias de custo pouco confiáveis.

A versão 0.92.0 corrige isso puxando as taxas do índice público de preços do OpenRouter. Slugs exatos de modelo agora são resolvidos para suas próprias taxas, em vez de herdar uma média da família. Chamadas restritas preservam a cotação obtida no momento da admissão, então o recibo bate com a decisão que o sistema já tomou. A entrada de catálogo `gpt-oss-20b` também foi atualizada para refletir o preço atual. Se você rastreia custos por execução ou cobra consumidores downstream, os números que você vê agora são os números que foram de fato usados.

## Controle do planner onde você precisa

Antes desta versão, o planner rodava em toda interação. Não havia como desligá-lo para uma raia específica do Kanban, uma execução de API ou um passo de solve de workflow. Isso impunha sobrecarga de planejamento a tarefas que não se beneficiavam dele — transformações simples, pipelines determinísticos ou passos em que você já sabia a próxima ação.

Agora você pode definir `use_planner` em raias individuais, execuções de API e passos de solve. O planner permanece ligado por padrão, então fluxos existentes não mudam de comportamento. A diferença é que agora você pode desativá-lo onde o planejamento adiciona latência sem agregar valor. Uma raia que executa uma única chamada de ferramenta não precisa de uma fase de planejamento. Uma execução de API que segue uma sequência fixa não precisa que o modelo decida o que vem a seguir. O controle é granular: você desabilita o planejamento por contexto, não globalmente.

## Configurações que você de fato encontra

As configurações do Desktop tinham uma caixa de busca que não pesquisava a tabela de roteamento de modelos por papel. Essa tabela é onde você atribui modelos a papéis como `assistant`, `tool` ou `vision`. Se você esquecia onde ela ficava, rolava painéis até encontrá-la. Agora o índice de busca a cobre. Digite o nome de um papel ou um slug de modelo, e a tabela de roteamento aparece nos resultados.

A mesma atualização do Desktop corrige duas lacunas de localização. Labels de roteamento e o texto dos recibos agora são exibidos corretamente em português do Brasil. Indicadores de nova conversa e o status de turno somente-resposta também estão mais claros, removendo a ambiguidade sobre se o sistema está ocioso ou processando.

## O que permaneceu experimental

Três experimentos receberam atualizações sem alterar os padrões. O benchmark de extração de memória foi inconclusivo, então o limite de 6.000 caracteres e o modelo global permanecem. Você pode optar por um modelo de extração explícito e um pré-filtro determinístico se quiser testar um comportamento de memória mais restrito. O experimento de tiers de modelo para cron mostrou acerto total em sete de oito jobs sintéticos, mas jobs sintéticos não são cargas de produção. Os padrões não mudaram. Os experimentos de refinamento enxuto de Design e proporcionalidade de prompt também permanecem desligados por padrão.

## Obtenha agora

Atualize com `pip install chimera-agent==0.92.0`. Os instaladores do Desktop não são assinados e podem pedir confirmação na primeira execução; o app verifica assinaturas nos pacotes do atualizador. Notas completas em [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
