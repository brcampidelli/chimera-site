---
title: "Chimera Agent 0.49.2: Correções para o Atualizador e Instalador"
date: 2026-10-01
category: update
summary: "Chimera Agent 0.49.2 resolve problemas críticos no atualizador e instalador, garantindo atualizações mais suaves e relatório correto de versões."
version: "0.49.2"
---

## Atualizador Agora Verifica a Cada Seis Horas

Anteriormente, a verificação de atualizações no Chimera Agent ocorria apenas uma vez ao iniciar, o que significava que, se o app permanecesse aberto, nunca detectaria novas versões. Esse problema era especialmente crítico para uma ferramenta como o Chimera, projetada para ficar em execução por longos períodos. Como resultado, os usuários precisavam buscar atualizações manualmente no site, anulando o propósito de um atualizador automático.

Na versão 0.49.2, o atualizador agora verifica novas versões a cada seis horas enquanto o app está em execução. Essa mudança garante que os usuários sejam notificados prontamente sobre atualizações sem necessidade de intervenção manual. Além disso, o atualizador lembra versões recusadas durante a sessão, evitando solicitações repetidas para a mesma atualização, a menos que uma versão mais nova esteja disponível.

## Correção do Instalador Entra em Ação

A versão 0.49.1 introduziu uma correção para um problema no instalador que deixava arquivos da versão anterior, fazendo com que o app relatasse incorretamente sua versão e oferecesse atualizações para si mesmo. Porém, essa correção só se aplicava ao instalador enviado com aquela versão, não ao usado para instalá-la.

Na 0.49.2, o instalador corrigido agora é usado para atualizações in-place, garantindo que a versão correta seja relatada após uma atualização. Se você atualizou para a 0.49.1 e enfrentou o problema de relatório de versão, esta versão resolve isso.

## Melhorias Adicionais

Outras melhorias nesta versão incluem segurar versões de serem marcadas como "latest" até que seu manifesto seja anexado, evitando que o endpoint do atualizador retorne erro 404 durante o processo de build. As mensagens de falha e a bandeja do sistema agora falam a língua do usuário, enquanto diagnósticos técnicos permanecem sem tradução para facilitar buscas por mensagens de erro. Os modos de custo do assistente de primeira execução também foram localizados, evitando o problema anterior de exibir termos em inglês em telas traduzidas.

Para a lista completa de mudanças, consulte o [Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).
