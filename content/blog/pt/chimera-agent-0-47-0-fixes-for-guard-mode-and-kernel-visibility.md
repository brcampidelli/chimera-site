---
title: "Chimera Agent 0.47.0: Correções para o Modo Guard e Visibilidade do Kernel"
date: 2026-08-20
category: update
summary: "Sete correções críticas abordam erros de relatório no modo guard, lacunas na aplicação de regras, integridade de auditoria e visibilidade do kernel."
version: "0.47.0"
---

## Modo Guard Agora Reporta Recusas Corretamente

Um erro fundamental no modo guard (`--guard`) fazia com que chamadas de ferramentas recusadas fossem reportadas como sucessos. O sistema verificava o prefixo `error:` na mensagem de recusa, mas a maioria das recusas não o incluía. Isso significava que três superfícies críticas - o frame do desktop, os logs de execução e a detecção de desvios - mostravam execução bem-sucedida quando todas as ações perigosas haviam sido bloqueadas. O modelo reportava com confiança ações concluídas, como force pushes, que nunca ocorreram. Agora, as recusas são corretamente sinalizadas em todas as superfícies, com atribuição clara à decisão do guard.

## Correções no Motor de Regras para Scripts e Documentos

O motor de regras tinha dois problemas opostos. Scripts de múltiplas linhas sempre passavam porque a escape de novas linhas quebrava a detecção de limites de palavras nos padrões das regras. Enquanto isso, documentos que citavam comandos bloqueados eram incorretamente bloqueados de forma rígida. A proteção estava exatamente invertida - scripts reais escapavam das regras, enquanto documentação gerava falsos positivos. Duas regras nunca haviam sido acionadas devido a esses problemas de parsing. A interpolação agora preserva os limites corretamente.

## Reformulação do Sistema de Auditoria

Três problemas de auditoria foram resolvidos. Primeiro, o sistema que detectava credenciais era o mesmo que as armazenava sem redação no log de auditoria. Segundo, escritas concorrentes podiam corromper a verificação criptográfica da cadeia de auditoria. Terceiro, a UI de segurança reportava falsamente adulteração devido a reinicializações da cadeia de hashes durante escritas concorrentes. Agora, as credenciais são redigidas antes do armazenamento na auditoria, e os escritores mantêm um único estado consistente da cadeia.

## Modo Observation Agora Observa de Verdade

O modo `observe` estava aplicando regras enquanto afirmava apenas medi-las. Bloqueios rígidos eram acionados antes da consulta ao aprovador, e então excluídos da contagem de recusas usada para decisões de rollout. Em mais de 33 chamadas reais, oito recusas apareciam como zero. Essas recusas permanecem (são sinais inequívocos), mas agora são contabilizadas corretamente e identificam sua origem.

## Visibilidade do Kernel Restaurada

As decisões do kernel de confiança não estavam chegando aos endpoints HTTP para execuções, lotes ou turnos - decisões críticas como aprovações de force push eram feitas invisivelmente. O kernel agora participa de todos os fluxos HTTP quando `CHIMERA_GOVERNANCE` está ativo. Prompts do lado do servidor não aparecerão em conexões HTTP, garantindo que a pessoa que os vê realmente fez a solicitação.

Execute `chimera upgrade` para obter as correções. Se você usa o modo guard, atualize imediatamente - os relatórios da versão anterior eram perigosamente enganosos. O [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) detalha todas as mudanças.

Para implantações em produção, revise seus logs de auditoria em busca de vazamentos de credenciais de chamadas `write_file` governadas. Verifique se scripts de múltiplas linhas em seus arquivos de regras precisam de ajustes para a detecção de limites corrigida.
