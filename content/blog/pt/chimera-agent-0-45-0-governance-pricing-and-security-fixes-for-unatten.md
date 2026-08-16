---
title: "Chimera Agent 0.45.0: Governança, Controle de Custos e Correções de Segurança para Execuções Autônomas"
date: 2026-08-16
category: update
summary: "Esta versão fortalece a execução autônoma com autenticação obrigatória, limites de gastos e governança unificada em todas as interfaces."
version: "0.45.0"
---

## Segurança em Primeiro Lugar: Vinculação e Autenticação

Versões anteriores do Chimera Agent expunham um gateway não autenticado em todas as interfaces de rede por padrão. O `docker-compose.yml` publicava a porta 8765 globalmente, e o `.env.example` era distribuído sem token definido. Isso significava que uma implantação com um único comando podia criar inadvertidamente um gateway aberto acessível a qualquer um que descobrisse a porta.

A v0.45.0 muda isso em três aspectos:
- O comando `serve` agora recusa vincular a endereços não locais sem um token de autenticação
- O Docker Compose passa a publicar apenas em `127.0.0.1` por padrão
- Uma flag explícita `--allow-insecure-bind` existe para casos legítimos (como proxies autenticados)

Esta é uma mudança quebra-compatibilidade para implantações que acessam o gateway de outra máquina. Defina `CHIMERA_SERVER_TOKEN` ou use a saída de emergência se necessário.

## Controle de Gastos que Realmente Funciona

Antes desta versão, os únicos limites eram contadores de etapas - um job em loop de repetição podia drenar todo o saldo do seu provedor. A v0.45.0 introduz três tetos de gastos separados:
1. Limite por execução
2. Limite por job (para tarefas agendadas)
3. Limite diário agregado que impede jobs cron de disparar

Chamadas sem preço agora interrompem a execução em vez de continuar silenciosamente. Modelos locais são tratados como custo zero em vez de desconhecido, evitando que os limites bloqueiem a única configuração que não pode gastar demais. Execute `chimera doctor` para verificar se seu modelo padrão pode ser precificado antes de definir limites.

## Governança Unificada em Todas as Interfaces

Anteriormente, cada interface de execução (`serve`, cron, MCP, A2A e adaptadores de mensagens) construía seu próprio registro de ferramentas. Agora, um único `governed_profile()` monta a stack para todas as cinco, com verificações de AST em tempo de compilação prevenindo regressões.

A ideia chave: o modo `CHIMERA_GOVERNANCE=observe` existe para medir o custo da aplicação antes de ativá-lo. Ele executa a stack completa enquanto apenas registra o que seria bloqueado, fornecendo dados concretos em vez de forçar um risco em produção. O padrão permanece `off` - governança deve ser uma opção explícita.

Esta versão também ativa o sistema de aprovação há muito inativo para chamadas de classe perigosa, eliminando bloqueios excessivos (falsos positivos) sem reduzir a eficácia contra ataques.

## Próximos Passos

Atualize com `pip install --upgrade chimera-agent` e revise as configurações de autenticação e limites de gastos da sua implantação. Para integração com editores, aponte as configurações do agente do seu editor para `chimera acp --workspace <repo>`. Detalhes completos nas [notas de versão][Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
