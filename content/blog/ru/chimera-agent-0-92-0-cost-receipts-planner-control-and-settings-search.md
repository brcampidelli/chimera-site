---
title: "Chimera Agent 0.92.0: recibos de custo, controle do planner e busca nas configurações"
date: 2026-11-22
category: update
summary: "Recibos de custo agora usam o índice público de preços do OpenRouter para execuções fora do serve. O planner é configurável por raia, e a busca das configurações do Desktop encontra a tabela de roteamento."
version: "0.92.0"
---

## O que realmente mudou para quem constrói agentes

Três pontos de atrito foram resolvidos nesta versão: rastreamento de custos opaco fora do ambiente `serve`, um planner que não podia ser desligado onde atrapalhava e um painel de configurações do Desktop que escondia a tabela de roteamento da busca.

Nada disso era catastrófico. Eram aqueles pequenos incômodos que fazem você abrir um segundo terminal para dar grep num arquivo de log, ou clicar em quatro abas para encontrar o único dropdown que precisa. As correções são pequenas, mas removem etapas de fluxos de trabalho que rodam dezenas de vezes por dia.

## Recibos de custo que batem com o que você realmente pagou

Antes da 0.92.0, execuções fora do `serve` precisavam adivinhar o preço do modelo. O framework não tinha acesso aos mesmos dados de tarifa que o ambiente hospedado usava, então os recibos podiam divergir do que o OpenRouter de fato cobrava. Se você estivesse rastreando custos por agente para um cliente ou orçamento, precisava reconciliar manualmente.

Agora essas execuções consultam o índice público de preços do OpenRouter. Slugs exatos de modelo recebem suas próprias tarifas em vez de cair para uma estimativa genérica da família. Chamadas strict preservam a cotação usada no momento da admissão, então o recibo reflete o preço pelo qual a chamada foi aceita, não uma tarifa buscada depois do fato. A entrada de catálogo `gpt-oss-20b` também foi atualizada, o que importa se esse modelo fazia parte da sua linha de base de custos.

A mudança não afeta execuções dentro do `serve` — essas já tinham recibos precisos. Ela fecha a lacuna para todo o resto: invocações CLI, cron jobs, etapas de pipeline que rodam numa estação de trabalho em vez do servidor.

## O planner não é mais obrigatório

`use_planner` agora é uma flag de configuração em raias Kanban, execuções de API e etapas de resolução de workflow. O planner permanece ligado por padrão, então o comportamento existente não muda a menos que você opte por desligar.

Por que isso importa: o planner adiciona uma etapa de raciocínio antes da execução. Isso é útil quando o agente precisa decompor um pedido vago em passos concretos. É sobrecarga quando os passos já estão explícitos — quando uma raia dispara uma sequência conhecida, ou uma etapa de resolução chama uma única ferramenta com entrada estruturada. Nesses casos, o planner podia introduzir latência e custo de tokens sem melhorar o resultado. Agora você pode desabilitá-lo onde ele não se paga.

## Configurações do Desktop que você de fato encontra

A busca de configurações do aplicativo Desktop agora indexa a tabela de roteamento modelo-por-papel. Antes, buscar por "routing" ou o nome de um papel não retornava nada, mesmo que a configuração existisse. Você precisava saber onde ela ficava e navegar até lá manualmente. Isso está corrigido.

Duas correções de localização vieram juntas: textos de roteamento e recibos agora aparecem corretamente em português brasileiro, e novas conversas e turnos só de resposta mostram indicadores de estado mais claros. Não são funcionalidades, mas removem ambiguidade do estado da UI.

## O que ainda é experimental

Vários experimentos rodaram junto com esta versão. A extração de memória ganhou um benchmark que foi inconclusivo — o limite de 6.000 caracteres e o modelo global permanecem como padrão, com um modelo de extração explícito e pré-filtro determinístico disponíveis como opt-in. Os tiers de modelo do Cron testaram um modelo mais barato em tarefas sintéticas; foi totalmente correto em sete de oito, mas o benchmark não cobriu cargas de trabalho de produção, então os padrões seguem inalterados. Os experimentos de refinamento de design e proporcionalidade de prompt permanecem desligados por padrão. Nada disso muda o que seus agentes fazem a menos que você os ligue.

## O que fazer agora

Se você rastreia custos de execuções fora do `serve`, confira um recibo com seu faturamento do OpenRouter. Os números devem bater sem ajuste manual. Se você tem raias ou etapas de resolução onde o planner adiciona latência sem valor, defina `use_planner: false` nessas configurações. Se você não conseguia encontrar a tabela de roteamento pela busca do Desktop antes, teste agora.

Os instaladores do Desktop permanecem sem assinatura e podem pedir confirmação na primeira execução. O aplicativo verifica assinaturas nos pacotes do atualizador. Notas completas: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
