---
title: "Chimera Agent 0.47.0: Correções para o Modo Guard e Integridade do Kernel"
date: 2026-08-19
category: update
summary: "Correções críticas para confiabilidade do modo guard, precisão na aplicação de regras e visibilidade do kernel em implantações governadas."
version: "0.47.0"
---

## Modo Guard Agora Reporta Recusas Corretamente

Um gate recusando uma chamada de ferramenta anteriormente retornava uma string de observação que não começava com `error:`, fazendo o sistema registrá-la como bem-sucedida. Isso afetava três superfícies: o frame desktop, logs de etapas e detecção de desvios. Uma execução onde toda ação perigosa era bloqueada apareceria como bem-sucedida em todos os dados estruturados, com o modelo até reportando ações completas como force pushes que nunca ocorreram. O kernel agora marca recusas corretamente, e o texto de recusa identifica qual guard tomou a decisão.

## Casamento de Regras Corrigido para Scripts Multilinha

O motor de regras anteriormente interpolava texto de script usando `repr`, que escapava quebras de linha em dois caracteres. Isso quebrava limites de palavras em padrões de regras, causando dois problemas:

1. Scripts simples de uma linha podiam burlar proteções porque o `\n` se fundia com a próxima palavra
2. Documentos Markdown citando comandos perigosos eram bloqueados incorretamente

Duas regras nunca disparavam devido a esse problema. O texto agora é passado para as regras sem escaping, correspondendo ao comportamento real do script.

## Sistema de Auditoria Não Armazena Mais Segredos

Uma operação governada `write_file` armazenava o conteúdo completo do arquivo em `audit.jsonl`, incluindo dados sensíveis como arquivos `.env` ou chaves privadas. Isso ocorria mesmo quando outro guard já havia bloqueado a operação. A auditoria agora redige conteúdo sensível (usando um redator existente anteriormente conectado apenas a traces de etapas) e registra argumentos em formato de documento como metadados apenas de tamanho.

## Visibilidade do Kernel Adicionada a Endpoints HTTP

As decisões do kernel de confiança não estavam sendo incluídas em respostas HTTP para endpoints de run, batch e turn. Isso significava que decisões críticas como aprovações de force push não eram visíveis para clientes. O kernel agora é instalado corretamente em superfícies HTTP quando `CHIMERA_GOVERNANCE` está como `observe` ou `enforce`. Note que implantações HTTP nunca solicitam no terminal do servidor - a pessoa nesse console não fez a requisição.

## Outras Correções

- Cadeias de auditoria não reportam mais falsamente adulteração por escritas concorrentes
- Modo `observe` agora conta corretamente recusas que deveria apenas medir
- Workers travados não mantêm mais batches inteiros indefinidamente
- Limites de recursos de container agora podem ser configurados
- Controles de orçamento de contexto adicionados ao uso de terminal

## Limitações Conhecidas

A equipe documentou explicitamente três lacunas atuais em vez de deixá-las para serem descobertas:

1. Relatórios de `observe` ainda não aparecem em interfaces HTTP
2. A API não tem um caminho de aprovação no modo `enforce`
3. Quatro endpoints HTTP ainda não incluem decisões do kernel

Atualize com `pip install --upgrade chimera-agent` ou veja [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) para notas de release detalhadas.
