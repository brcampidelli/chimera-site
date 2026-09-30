---
title: "Chimera Agent 0.49.2: Correções para o Atualizador e Instalador"
date: 2026-09-30
category: update
summary: "Chimera Agent 0.49.2 resolve problemas críticos no atualizador e instalador, garantindo atualizações mais suaves e relatórios de versão precisos."
version: "0.49.2"
---

## Atualizador Agora Funciona Continuamente

Em versões anteriores, o atualizador verificava novas versões apenas uma vez — ao iniciar o aplicativo. Isso era uma falha significativa para um aplicativo como o Chimera Agent, projetado para permanecer aberto por longos períodos. Como resultado, os usuários frequentemente perdiam atualizações, a menos que verificassem manualmente ou reiniciassem o aplicativo. Esse problema ficou evidente quando a versão 0.49.1 foi lançada: o app não notificou os usuários sobre a atualização, forçando-os a baixar o instalador manualmente do site.

**Com a 0.49.2, o atualizador agora verifica novas versões a cada seis horas** enquanto o app está em execução. Essa mudança garante que os usuários sejam informados prontamente sobre atualizações sem a necessidade de reinícios frequentes. Além disso, o atualizador evita avisos desnecessários ao lembrar das atualizações recusadas durante o processo. Se uma versão mais nova estiver disponível, ele solicitará novamente o usuário, garantindo que pedidos de atualização manual sejam sempre atendidos.

## Correção do Instalador Entra em Vigor

A versão 0.49.1 introduziu uma correção para um problema no instalador que deixava arquivos de versões anteriores. Especificamente, o diretório `_internal` podia acabar com múltiplos diretórios `chimera_agent-*.dist-info`, fazendo com que o app relatasse a versão errada e oferecesse atualizações repetidamente. No entanto, essa correção só se aplicava ao instalador enviado com o lançamento, não ao usado para atualizações in-place.

**A 0.49.2 é a primeira versão em que o instalador corrigido é usado para atualizações in-place.** Se você atualizou para a 0.49.1 e enfrentou relatórios de versão incorretos, esta versão resolve o problema. O instalador agora remove corretamente os arquivos antigos, garantindo relatórios de versão precisos e evitando solicitações de atualização redundantes.

## Melhorias Adicionais

Várias outras melhorias introduzidas na 0.49.1 valem a pena ser mencionadas se você pulou essa versão:

- **As versões são retidas de "latest" até que seu manifesto seja anexado.** Anteriormente, o endpoint do atualizador retornava um erro 404 durante o processo de build, falhando silenciosamente porque as mensagens de erro eram suprimidas para evitar incomodar os usuários.
- **Diálogos de falha e notificações na bandeja agora estão localizados**, enquanto diagnósticos técnicos permanecem em inglês para garantir que possam ser facilmente pesquisados.
- **Os modos de custo do assistente de primeira execução não são mais exibidos como palavras em inglês não traduzidas** em telas localizadas.

Para todos os detalhes, consulte as [notas de lançamento][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).

Para aproveitar essas correções, atualize para o Chimera Agent 0.49.2 agora.
