---
title: "Chimera Agent 0.49.2: Correções para Confiabilidade do Atualizador e Instalador"
date: 2026-10-02
category: update
summary: "Esta versão garante que o atualizador verifique novas versões periodicamente e corrige um problema no instalador que causava relato incorreto de versões."
version: "0.49.2"
---

## O Atualizador Agora Funciona como Esperado

Antes, o atualizador só verificava novas versões uma vez — no início. Isso era um problema para o Chimera Agent, que costuma ficar aberto por longos períodos. Se uma nova versão fosse lançada com o app em execução, os usuários não sabiam a menos que verificassem manualmente ou reiniciassem o aplicativo. Isso levava a situações onde atualizações eram perdidas completamente, forçando os usuários a baixar instaladores direto do site.

Agora, o atualizador verifica a cada seis horas enquanto o app está em execução. Essa mudança garante que os usuários sejam notificados sobre novos lançamentos rapidamente, sem necessidade de intervenção manual. Para evitar avisos desnecessários, recusar uma atualização lembra aquela versão na sessão atual, mas versões mais novas ainda acionarão uma nova verificação. Verificações manuais pelo menu da bandeja sempre solicitam, independentemente de recusas anteriores.

## Correção do Instalador Entra em Ação

A versão 0.49.1 introduziu uma correção para um problema no instalador onde a atualização deixava arquivos da versão anterior. Isso fazia o app relatar incorretamente sua versão, criando um loop onde ele continuava oferecendo uma atualização para si mesmo. Porém, essa correção só se aplicava a novos instaladores — não aos usados para atualizações in-place. Com a 0.49.2, o instalador corrigido agora é usado em atualizações, garantindo que o relato de versão seja preciso após um upgrade.

## Outras Melhorias da 0.49.1

- Lançamentos agora são retidos de serem marcados como "latest" até que seus artefatos de build estejam totalmente prontos, evitando erros 404 durante a janela de build.
- Diálogos de erro e mensagens na bandeja estão localizados, enquanto diagnósticos técnicos permanecem em inglês para busca.
- As opções de modo de custo no assistente de primeira execução agora estão corretamente traduzidas.

Para obter as últimas correções, execute o atualizador ou baixe a nova versão nas [notas de lançamento][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).

[Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2): CHANGELOG.md
