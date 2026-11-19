---
title: "Chimera Agent 0.92.0: recibos de custo, controle do planner e busca nas configurações"
date: 2026-11-19
category: update
summary: "Execuções fora do serve agora mostram custos precisos por modelo, o planner pode ser desabilitado por raia ou chamada de API, e a busca das configurações do Desktop encontra a tabela de roteamento."
version: "0.92.0"
---

## O que você paga é o que você vê

O rastreamento de custos para execuções fora do `serve` era um chute. O sistema usava um fallback genérico que ignorava o modelo real que você chamava. Se você fizesse uma verificação de admissão estrita contra um slug de modelo específico, o recibo ainda mostrava o preço amplo do catálogo. Os números estavam direcionalmente corretos, mas errados nos detalhes, e isso tornava as auditorias de custo não confiáveis.

A versão 0.92.0 corrige isso puxando as taxas do índice de preços público do OpenRouter. Slugs de modelo exatos agora resolvem para suas próprias taxas em vez de herdar uma média da família. Chamadas estritas preservam a cotação obtida no momento da admissão, então o recibo corresponde à decisão que o sistema já tomou. A entrada de catálogo `gpt-oss-20b` também foi atualizada para refletir o preço atual. Se você rastreia custos por execução ou cobra consumidores downstream, os números que você vê agora são os números que foram realmente usados.

## Controle do planner onde você precisa

Antes desta versão, o planner executava em toda interação. Não havia como desligá-lo para uma raia Kanban específica, uma execução de API ou um passo de solve de workflow. Isso forçava a sobrecarga de planejamento em tarefas que não se beneficiavam dele — transformações simples, pipelines determinísticos ou passos onde você já sabia a próxima ação.

Agora você pode definir `use_planner` em raias individuais, execuções de API e passos de solve. O planner permanece ativo por padrão, então os workflows existentes não mudam de comportamento. A diferença é que agora você pode optar por desativá-lo onde o planejamento adiciona latência sem agregar valor. Uma raia que executa uma única chamada de ferramenta não precisa de uma fase de planejamento. Uma execução de API que segue uma sequência fixa não precisa que o modelo decida o que vem a seguir. O controle é granular: você desabilita o planejamento por contexto, não globalmente.

## Configurações que você realmente encontra

As configurações do Desktop tinham uma caixa de busca que não pesquisava a tabela de roteamento de modelo por função. Essa tabela é onde você atribui modelos a funções como `assistant`, `tool` ou `vision`. Se você esquecesse onde ela ficava, rolava pelos painéis até encontrá-la. Agora o índice de busca a cobre. Digite o nome de uma função ou um slug de modelo, e a tabela de roteamento aparece nos resultados.

A mesma atualização do Desktop corrige duas lacunas de localização. Os rótulos de roteamento e o texto do recibo agora são exibidos corretamente em português brasileiro. Os indicadores de nova conversa e o status de turno somente de resposta também estão mais claros, removendo a ambiguidade sobre se o sistema está ocioso ou processando.

## O que permaneceu experimental

Três experimentos receberam atualizações sem alterar os padrões. O benchmark de extração de memória foi inconclusivo, então o limite de 6.000 caracteres e o modelo global permanecem. Você pode optar por um modelo de extração explícito e um pré-filtro determinístico se quiser testar um comportamento de memória mais restrito. O experimento de camadas de modelo cron mostrou correção total em sete dos oito jobs sintéticos, mas jobs sintéticos não são cargas de trabalho de produção. Os padrões não foram alterados. Os experimentos de refinamento de Design enxuto e proporcionalidade de prompt também permanecem desativados por padrão.

## Obtenha agora

Atualize com `pip install chimera-agent==0.92.0`. Os instaladores do Desktop não são assinados e podem solicitar confirmação na primeira execução; o aplicativo verifica assinaturas nos pacotes do atualizador. Notas completas em [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
