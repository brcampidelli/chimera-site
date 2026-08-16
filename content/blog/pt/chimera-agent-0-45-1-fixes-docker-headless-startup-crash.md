---
title: "Chimera Agent 0.45.1 corrige falha de inicialização headless no Docker"
date: 2026-08-16
category: update
summary: "A versão 0.45.1 resolve um problema crítico em implantações Docker, onde instâncias headless falhavam ao iniciar devido a uma cadeia de importações antecipadas do FastAPI."
version: "0.45.1"
---

## Implantações Docker não travam mais na inicialização

A versão 0.45.0 do Chimera Agent introduziu um problema em que containers Docker headless rodando o serviço de gateway travavam imediatamente ao iniciar. O problema ocorria porque o caminho do cron começava a importar `chimera.api.usage`, o que acionava uma importação antecipada das dependências do FastAPI - mesmo que a imagem Docker intencionalmente não incluísse o extra `desktop`.

Isso não foi detectado durante os testes porque os ambientes de desenvolvimento normalmente têm o FastAPI instalado. Os 2.945 testes existentes passaram, já que rodavam em ambientes onde a dependência estava presente. A falha só se manifestou em implantações de produção usando a instalação enxuta `.[full]`.

## Imports preguiçosos evitam dependências ocultas

A correção aborda a causa raiz, em vez de apenas adicionar dependências ausentes. Anteriormente, cinco módulos folha acessíveis via CLI em `chimera/api` estavam silenciosamente puxando toda a pilha web através de reexportações antecipadas em `__init__.py`. A versão 0.45.1 torna essas importações preguiçosas, de modo que só carregam quando realmente necessárias para componentes voltados à web.

Isso mantém a separação documentada, onde o CLI/gateway principal não deve exigir dependências web, ao mesmo tempo em que garante que `chimera app` falhe claramente quando o FastAPI estiver ausente para casos de uso legítimos na web.

## Novo teste previne regressão

Um teste dedicado agora verifica esse comportamento rodando em um subprocesso onde `fastapi` é deliberadamente tornado não importável. O teste primeiro confirma que essa configuração de ambiente funciona antes de prosseguir com outras asserções - capturando casos em que os testes passariam silenciosamente devido à contaminação ambiental.

A correção foi verificada de ponta a ponta com instalações limpas de `.[full]`. Implantações headless no Docker agora podem rodar `serve --cron` como esperado.

Para implantações existentes afetadas por esse problema, atualize para a versão 0.45.1. As [notas de lançamento][Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) contêm detalhes completos sobre as mudanças desde a versão 0.45.0.
