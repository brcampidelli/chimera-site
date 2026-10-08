---
title: "Chimera Agent 0.50.0: Visibilidade, Controle e Busca Híbrida"
date: 2026-10-08
category: update
summary: "Esta versão corrige comportamentos silenciosos, adiciona controles de governança e melhora a recuperação com busca híbrida."
version: "0.50.0"
---

## Tarefas Agora São Visíveis

Antes, os agentes mantinham uma lista interna de tarefas inacessível durante a execução. `RunState.tasks` existia, mas nunca era preenchida. Agora, as tarefas são exibidas em tempo real com marcadores de progresso, e a lista persiste através da compactação de contexto. Isso significa que agentes de longa duração não perdem mais o controle de seus próprios planos durante a execução.

## Solicitações de Aprovação Seguem Você

Os fluxos de aprovação anteriores assumiam que um console estava sempre sendo monitorado. Três superfícies não monitoradas—incluindo cron jobs—podiam solicitar entrada humana, mas não tinham como entregar a pergunta se ninguém estivesse olhando. Definir `CHIMERA_APPROVAL_WEBHOOK` agora encaminha solicitações de aprovação para um canal especificado. Sistemas sem capacidade de entrega relatam corretamente `unreachable` em vez de falhar silenciosamente.

## Governança Pode Ser Ativada

O log de auditoria de segurança era anteriormente um recurso passivo sem mecanismo de ativação. `CHIMERA_GOVERNANCE` agora fornece um controle para ativá-lo, e a tela de Segurança mostra explicitamente seu estado atual. Isso foi implementado porque ter um log de auditoria que não podia ser ativado não tinha propósito prático.

## Busca Híbrida Supera Palavras-Chave

`chimera find` anteriormente usava busca por palavra-chave ou vetorial, com a decisão tomada após o início da execução. A recuperação híbrida—combinando ambos os métodos—agora supera buscas apenas por palavra-chave em 6,25 pontos (p = 1,7e-04) no próprio corpus do projeto. A busca vetorial por si só tem desempenho inferior às palavras-chave, razão pela qual a abordagem híbrida agora é o padrão. O sistema também calcula os custos antecipadamente.

## Correções de Compatibilidade de Modelos

Os agentes assumiam que modelos não catalogados tinham uma janela de 128.000 tokens, o que causava falhas para os 31 modelos no índice que suportam 64.000 tokens ou menos. O sistema agora verifica o índice ao vivo para modelos desconhecidos. Cinco entradas do catálogo também foram corrigidas para tamanhos de janela imprecisos, e um erro de preço (2,2x acima) foi corrigido.

## Visibilidade de Backend em Traces

Os traces agora registram qual backend serviu cada etapa, não apenas qual modelo respondeu. Isso é importante porque os slugs de modelo no OpenRouter podem representar pools com capacidades extremamente variáveis—um pool abrange endpoints com diferença de 5x em janelas de contexto e variação de preço de 8,8x. Afirmações anteriores de desempenho sobre modelos específicos estavam na verdade medindo pools; o changelog retira benchmarks afetados.

### O Que Fazer Agora

Atualize para 0.50.0 e revise o [changelog completo][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) para detalhes de implementação. Ative a governança, se necessário, e teste a busca híbrida com `chimera find`.
