---
title: "Chimera Agent 0.42.0: Configurações que Realmente Aplicam"
date: 2026-08-11
category: update
summary: "Corrigidas sete configurações que salvavam mas não alteravam o comportamento, unificados os controles de segurança e tornados os agentes configuráveis em vez de aceitarem padrões."
version: "0.42.0"
---

## Configurações que Agora Aplicam

Sete configurações anteriormente eram salvas sem ter efeito—modelo padrão, cache de respostas, endpoint personalizado, timeout, cadeia de fallback e cache de prompts. O `LLMGateway` capturava as configurações na construção, mas `chimera app` o construía uma vez por processo. Seis agora atualizam em tempo real. Três (cascata, persistência de chat, memória de chat) aplicam-se à **próxima conversa** e isso está indicado. Duas que exigem reinício (daemon do agendador e autoload do MCP) declaram isso. Os rótulos agora vêm do servidor, evitando desalinhamentos silenciosos.

## Controles de Segurança Unificados

`CHIMERA_TOOL_ALLOWLIST` e `CHIMERA_TOOL_DENYLIST` antes afetavam apenas `chimera run` e `chimera solve`. Outras superfícies (app, API, jobs em lote, bots de mensagens) ignoravam-nos completamente. Agora aplicam-se em todos os lugares. As negações **se combinam**—restrições de implantação, de requisição e de postura precisam todas permitir uma ferramenta. As permissões **se intersectam**, impedindo que requisições elevem além do escopo do remetente. Corrigido `explore_repository` contornando filtros devido ao registro tardio.

## Identidade e Instruções do Agente

Nome do agente, idioma e instruções permanentes antes não funcionavam. `profile.json` não era lido pela API, fatos da persona aplicavam-se apenas quando relevantes para uma interação, e o espaço incondicional de preâmbulo era reservado para compatibilidade com REPL/OpenAI. Agora aplicam-se a edição de código, execução autônoma e mensagens. Instruções **são anexadas**—prompts padrão mantêm guardas de segurança, e blocos personalizados alertam quando não concedem capacidades.

## Postura de Implantação como Base

Escopo de execução, requisitos de aprovação e permissões de comandos de host estavam espalhados por componentes deletados, pares hardcoded e uma variável de ambiente rejeitada por `PATCH /api/config`. Agora consolidados em um único card. A postura de implantação é um **piso**, não um padrão—clientes não podem sobrescrever silenciosamente restrições em máquinas que não controlam. Execução em host requer confirmação explícita.

## O que Fazer Agora

Execute `chimera app update` e revise [Chimera Agent v0.42.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.42.0) para detalhes sobre agentes em nível de projeto, correções de auditoria de segurança e ativação de cards de habilidades.
