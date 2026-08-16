---
title: "Chimera Agent 0.45.1 corrige falha de inicialização headless no Docker"
date: 2026-08-16
category: update
summary: "A v0.45.1 resolve um problema crítico em implantações Docker, onde instâncias headless falhavam ao iniciar devido a uma cadeia de importações eager do FastAPI."
version: "0.45.1"
---

## Implantações Docker não travam mais na inicialização

A versão 0.45.0 do Chimera Agent introduziu uma regressão em que contêineres Docker headless executando o serviço de gateway travavam imediatamente ao iniciar. O problema ocorria porque o caminho do cron começava a importar `chimera.api.usage`, o que acionava uma importação eager das dependências do FastAPI - mesmo que a imagem Docker intencionalmente não incluísse o extra `desktop`.

Isso não foi detectado durante os testes porque ambientes de desenvolvimento geralmente têm o FastAPI instalado. Os 2.945 testes existentes passaram, já que foram executados em ambientes onde a dependência estava presente por acaso. A falha só se manifestou em implantações de produção usando a instalação enxuta `.[full]`.

## Importações lazy evitam dependências ocultas

A correção aborda a causa raiz em vez de apenas adicionar dependências ausentes. Anteriormente, cinco módulos folha acessíveis via CLI em `chimera/api` estavam silenciosamente puxando toda a pilha web por meio de reexportações eager em `__init__.py`. A v0.45.1 torna essas importações lazy, de modo que só são carregadas quando realmente necessárias para componentes voltados à web.

Isso mantém a separação documentada, onde o CLI/gateway principal não deve exigir dependências web, ao mesmo tempo que garante que `chimera app` falhe claramente quando o FastAPI estiver ausente para casos de uso legítimos na web.

## Novo teste previne regressões

Um teste dedicado agora verifica esse comportamento executando em um subprocesso onde `fastapi` é deliberadamente tornado não importável. O teste primeiro confirma que essa configuração de ambiente funciona antes de prosseguir com outras asserções - capturando casos em que os testes passariam silenciosamente devido à contaminação ambiental.

A correção foi verificada de ponta a ponta com instalações limpas de `.[full]`. Implantações headless no Docker agora podem executar `serve --cron` conforme esperado.

Para implantações existentes afetadas por esse problema, atualize para a v0.45.1. As [notas de release][Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) contêm detalhes completos sobre as mudanças em relação à v0.45.0.
