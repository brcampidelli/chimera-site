---
title: "Chimera Agent 0.50.0: Visibilidade, Controle e Busca Híbrida"
date: 2026-10-11
category: update
summary: "Esta versão corrige comportamentos silenciosos, adiciona controles faltantes e melhora a recuperação com busca híbrida."
version: "0.50.0"
---

## Tarefas Agora São Visíveis

Antes, os agentes mantinham uma lista interna de tarefas (`RunState.tasks`) que nunca era exposta ou persistida. Execuções longas podiam perder o controle do próprio progresso durante a compactação de contexto. Agora, a tarefa ativa é exibida durante a execução, e as tarefas concluídas são riscadas. A lista sobrevive à compactação, então os agentes não esquecem mais o plano no meio da execução.

## Solicitações de Aprovação Te Seguem

Três superfícies de execução não monitoradas (incluindo cron jobs) podiam solicitar aprovações, mas o mecanismo era opaco. Se configurado com `CHIMERA_APPROVAL_WEBHOOK`, os agentes agora encaminham perguntas de aprovação para o canal especificado, em vez de falhar silenciosamente quando nenhum console está disponível. O sistema também relata explicitamente estados `unreachable` quando a entrega não é possível.

## Melhorias de Governança e Recuperação

O núcleo de confiança (`CHIMERA_GOVERNANCE`) anteriormente não tinha controle de ativação, apesar de registrar eventos de segurança. Agora ele vem desativado por padrão com um botão visível. Para recuperação, `chimera find` agora usa busca híbrida (palavra-chave + vetor) por padrão, após testes mostrarem que ela supera a busca apenas por palavra-chave em 6,25 pontos (p = 1,7e-04) no corpus do projeto. A busca vetorial sozinha tem desempenho inferior, justificando a abordagem combinada.

## Correções no Tratamento de Modelos

Os agentes assumiam que modelos não catalogados tinham janelas de 128k tokens, causando falhas para os 31 modelos (de 431 indexados) que realmente servem ≤64k. O sistema agora verifica o índice ao vivo para modelos desconhecidos. Cinco entradas do catálogo foram corrigidas para tamanhos de janela inflados, e um erro de preço (2,2x acima) foi corrigido.

## Rastreabilidade e Ressalvas

Os rastreamentos agora registram qual backend serviu cada etapa, não apenas qual modelo respondeu. Isso é importante para serviços como OpenRouter, onde slugs de modelo representam pools com variações de preço de 8,8x. O changelog retira algumas afirmações de desempenho que comparavam erroneamente medições agrupadas.

Limitações-chave permanecem: instaladores não são assinados (embora atualizadores sejam), a governança vem desativada, e o compactador de resumo está desligado por padrão, pois não é usado na prática (0 acionamentos em 137 execuções medidas). O cancelamento é cooperativo - chamadas ativas são concluídas antes de parar.

Veja [Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) para medições e o changelog completo. Para atualizar: `pip install --upgrade chimera-agent`.
