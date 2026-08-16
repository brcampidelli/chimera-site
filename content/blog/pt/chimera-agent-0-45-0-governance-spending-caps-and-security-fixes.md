---
title: "Chimera Agent 0.45.0: Governança, Limites de Gastos e Correções de Segurança"
date: 2026-08-16
category: update
summary: "Esta versão implementa padrões de segurança que faltavam, adiciona controles de gastos e estende a governança para todas as superfícies não monitoradas."
version: "0.45.0"
---

## Padrões de Segurança Que Realmente São Padrão

A versão anterior vinha com uma configuração insegura: portas abertas, sem autenticação e sem avisos. Isso não foi um descuido — foi uma escolha consciente para priorizar facilidade de configuração em vez de segurança, mas o equilíbrio estava errado. Agora o `serve` se recusa a vincular a endereços que não sejam loopback sem um token, e a configuração do Docker publica apenas para `127.0.0.1`. Se você precisar expor o gateway, deve optar explicitamente por `--allow-insecure-bind` ou definir `CHIMERA_SERVER_TOKEN`.

Isso quebra implantações existentes que dependiam do comportamento antigo. A correção é simples, mas era uma mudança necessária: um gateway de agente acessível a qualquer pessoa na rede é um risco, não um recurso.

## Limites de Gastos Que Funcionam

Antes desta versão, o único controle de gastos era um contador de etapas. Um job em loop de repetição podia drenar seus créditos de API sem aviso. Agora há três limites separados: por execução, por job e um agregado diário. Se uma chamada não puder ser precificada, a execução para em vez de continuar sem controle. Modelos locais são tratados como gratuitos em vez de desconhecidos, então os limites não bloqueiam a única configuração que não pode gastar demais.

O `chimera doctor` verifica se seu modelo padrão pode ser precificado. Isso evita surpresas ao tentar definir um limite de gastos.

## Governança Que Cobre Todas as Superfícies

Cinco componentes diferentes (`serve`, cron, MCP, A2A e adaptadores de mensagens) tinham cada um seu próprio registro mínimo de ferramentas. Agora eles compartilham uma única pilha `governed_profile()`, aplicada por uma verificação de AST em tempo de compilação. O insight principal é que `CHIMERA_GOVERNANCE=observe` é mais útil que `enforce` — ele registra o que teria sido bloqueado sem realmente bloquear nada, permitindo medir o impacto antes de ativá-lo.

Esta versão também conecta o sistema de aprovação que existia, mas não estava integrado. Chamadas de classe perigosa que leem dados externos agora têm alguém do outro lado do portão, reduzindo bloqueios excessivos sem comprometer a segurança.

## Próximos Passos

Execute `chimera doctor` para verificar sua configuração e revise sua implantação se você estava vinculando a `0.0.0.0`. As mudanças completas estão em [Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
