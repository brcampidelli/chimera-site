---
title: "Chimera Agent 0.46.0: Regras que Valem Aqui do Lado"
date: 2026-08-17
category: update
summary: "Corrigidos perda silenciosa de dados, cards de habilidades não traduzidos e portões que não barravam — mais uma biblioteca de 23 cards de habilidades baseados em incidentes."
version: "0.46.0"
---

## Quando as Regras Não Atingem

Cinco armazenamentos JSON, incluindo o de habilidades, permitiam que processos concorrentes sobrescrevessem silenciosamente os dados uns dos outros. Uma execução que aprendia algo podia ter sua memória apagada pela próxima. Todos os cinco agora travam e escrevem atomicamente — sem necessidade de configuração. O mesmo padrão corrigiu recursos de governança que travavam na importação e um bot do Discord que rodava sem verificações.

## Cards de Habilidades como Relatórios de Incidente

Vinte e três cards agora estão em `skills/`, treze escritos a partir dos próprios defeitos deste projeto. Cada um documenta um modo de falha no formato Gatilho/Fazer/Evitar/Verificar/Risco — dados, não código. Estão agrupados por fase do fluxo de trabalho (`define · build · verify · review · ship`) e taggeados por tópico. Importe um com:

```
chimera skills-import skills/verify-before-claiming
```

Cards suportam nove idiomas através de arquivos auxiliares que preservam o hash SHA-256 original. O sistema detecta traduções desatualizadas (que afirmam traduzir texto alterado) e incompletas (com seções faltando), mas permite traduções ausentes com rotulagem clara.

## Portões que Realmente Barram

Três defeitos em agentes comprometeram componentes críticos sem falhar nos testes. A causa raiz: verificações listavam comportamentos requeridos em vez de exceções permitidas. Quando novos comportamentos surgiam, os portões permaneciam abertos. Agora listam exceções — se algo não está explicitamente permitido a burlar verificações, é verificado.

Dezesseis afirmações na documentação foram corrigidas em dez idiomas. Cinco eram francamente falsas: modos de governança não incluem `ask`, a barra lateral da área de trabalho não tem destino de chat, e `CHIMERA_TAVILY_API_KEY` não existe no código. Duas afirmações otimistas agora trazem suas evidências contrárias adjacentes.

```
pip install -U chimera-agent
```

Navegue pelos cards em chimeraagent.space/skills [Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0) ou consulte `bench/skillcard/RESULTS.md` para a compensação de performance opcional.
