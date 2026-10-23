---
title: "Chimera 0.74.1: Parada de serviços que realmente para, e dependências mais apertadas"
date: 2026-10-23
category: update
summary: "Corrige uma race condition em que um serviço em parada sumia do tracking antes de encerrar, e atualiza duas dependências indiretas com vulnerabilidades conhecidas."
version: "0.74.1"
---

O comando `chimera service stop` tinha uma race condition que o fazia mentir. Você pedia para um serviço em background parar, ele confirmava o pedido e então desaparecia da lista de serviços enquanto ainda estava rodando. Se você em seguida usasse `chimera service stop --now` para forçar a morte de um desligamento travado, a CLI respondia "not running" — mesmo com o processo vivo e consumindo recursos. A versão 0.74.1 elimina essa brecha.

## Por que um serviço em parada ficava invisível

Um serviço em background do Chimera executa um loop de agente de longa duração. Quando recebe um sinal de parada, ele precisa terminar os turnos em voo, descarregar estado e derrubar conexões. O código antigo removia o registro do serviço do tracker no momento em que aceitava o pedido de parada. Era um atalho contábil: o serviço estava "parando" em sua própria visão, mas para o resto do sistema ele não existia mais.

O problema imediato era o `--now`. Um force-stop consulta o tracker por um ID de serviço correspondente. Se o registro sumiu, o comando reporta que não há nada para parar e termina. O processo real continuava rodando, segurando locks, sockets ou memória de GPU, até eventualmente terminar sua limpeza ou ser morto externamente. Para um operador depurando um agente travado, isso significava que a ferramenta dizia que estava tudo bem enquanto a tabela de processos mostrava o contrário.

## O que a correção muda no ciclo de vida do serviço

Um serviço agora permanece visível no tracker com o status `stopping` desde o momento em que aceita o pedido de parada até sua saída. O tracker mantém o registro, então qualquer chamada subsequente de `stop` ou `status` o enxerga. O serviço executa seu desligamento gracioso — completando o turno atual, persistindo o que for necessário, fechando loops — e então se remove. Somente após a saída do processo o registro desaparece.

A flag `--now` ainda existe, mas seu comportamento está mais rigoroso. Ela envia um force-kill somente após confirmar que o processo rastreado corresponde ao ID de serviço em arquivo. Se o serviço já tiver encerrado de forma limpa entre a última verificação e a chamada do `--now`, o comando reporta isso em vez de disparar um sinal em um PID reciclado. Isso previne kills acidentais de processos não relacionados que por acaso reutilizaram o mesmo identificador.

Para quem roda múltiplos serviços Chimera em uma única máquina, isso elimina uma classe de heisenbugs em que um script de restart lançava uma nova instância enquanto a antiga ainda estava desligando, porque o script não conseguia enxergar a instância antiga para esperar por ela.

## Patches de dependência que acompanham esta release

Duas dependências indiretas são atualizadas para fechar avisos de segurança. Nenhuma delas é chamada diretamente pelo código do agente Chimera, mas ambas estão na cadeia de suprimentos de fluxos de trabalho comuns.

GitPython vai para 3.2.1. Versões até 3.2.0 verificavam o caminho `.git` de um submódulo somente após cloná-lo, o que permitia que um repositório manipulado disparasse path traversal durante a operação de clone. Isso importa se o seu agente clona repositórios como parte de um loop de chamada de ferramentas — por exemplo, um agente de revisão de código que faz checkout de pull requests. O aviso classifica a severidade como alta.

OpenTelemetry vai para 1.45.1. O teto anterior, 1.45.0, parseava o cabeçalho `tracestate` sem um limite no número de entradas. Um serviço downstream que reflete `tracestate` sem limites de volta para o seu agente instrumentado poderia causar uso excessivo de memória. As superfícies de tracing do próprio Chimera não são afetadas, mas qualquer agente que exporta spans para um coletor OpenTelemetry via HTTP está exposto através do SDK. O aviso classifica a severidade como moderada.

Ambos os patches são bumps de versão mínima na árvore de dependências. Nenhuma superfície de API muda. Se você fixa dependências com um lockfile, rodar seu resolvedor novamente após atualizar o Chimera puxará as novas versões.

## Atualizando

Instale a release diretamente:

```
pip install chimera-agent==0.74.1
```

Se você usa a CLI do Chimera para gerenciar serviços em execução, reinicie quaisquer agentes de longa duração para que eles adotem o rastreamento de ciclo de vida corrigido. As notas de release com o changelog completo estão em [Chimera Agent v0.74.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.74.1).
