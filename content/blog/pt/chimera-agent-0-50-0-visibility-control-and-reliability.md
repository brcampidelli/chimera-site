---
title: "Chimera Agent 0.50.0: Visibilidade, Controle e Confiabilidade"
date: 2026-10-07
category: update
summary: "Chimera Agent 0.50.0 traz transparência, melhor controle e correções para falhas silenciosas."
version: "0.50.0"
---

## Visibilidade sobre as Operações do Agente

Antes, a lista de tarefas do agente era invisível para os usuários, mesmo com o campo `RunState.tasks` existindo. Agora, o agente exibe sua lista de tarefas em tempo real, marcando itens como em progresso ou concluídos. Essa lista persiste através da compactação de contexto, garantindo que execuções longas não percam o rastro de seus planos. Essa mudança resolve uma frustração comum onde os usuários não conseguiam ver o que o agente estava fazendo, especialmente durante operações prolongadas.

## Alcance Além do Console

Agentes rodando sem supervisão, como jobs cron, não conseguiam comunicar-se efetivamente com os usuários quando uma aprovação era necessária. Ao configurar `CHIMERA_APPROVAL_WEBHOOK`, os usuários agora podem receber solicitações de aprovação em seus canais preferidos. Essa mudança garante que os agentes consigam alcançar os usuários mesmo quando ninguém está monitorando ativamente o console. Antes, essas solicitações falhavam silenciosamente se não houvesse um método de entrega disponível, levando a decisões inesperadas.

## Controle de Governança

O recurso de governança, que inclui um log de auditoria, estava anteriormente inacessível. Embora a tela de Segurança exibisse o log de auditoria, não havia como ativá-lo. Agora, os usuários podem habilitar a governança usando o parâmetro `CHIMERA_GOVERNANCE`. Essa mudança dá aos usuários a capacidade de monitorar e controlar as configurações de segurança do agente, resolvendo uma lacuna em transparência e controle.

## Melhor Tratamento de Modelos

Antes, os agentes assumiam um tamanho padrão de janela de tokens para modelos não catalogados explicitamente, causando transbordamentos de contexto e falhas na execução. Com esta versão, o agente agora recupera o tamanho correto da janela de tokens do índice em tempo real para modelos não catalogados. Além disso, cinco entradas do catálogo foram corrigidas para refletir janelas de tokens e preços precisos. Essa mudança evita falhas de execução devido a suposições incorretas sobre as capacidades dos modelos.

## Rastreabilidade Aprimorada

Os traces agora registram qual backend atendeu cada etapa, não apenas qual modelo respondeu. Isso é especialmente importante para modelos como os do OpenRouter, onde um único slug de modelo pode representar um pool de endpoints com capacidades e custos variados. Antes, os usuários não conseguiam distinguir entre diferentes endpoints, causando confusão e medições imprecisas. Essa mudança melhora a transparência e precisão no acompanhamento de desempenho.

## Próximos Passos

Para aproveitar essas melhorias, atualize para o Chimera Agent 0.50.0 e consulte as [notas de release][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) para instruções detalhadas sobre como configurar novos recursos como `CHIMERA_APPROVAL_WEBHOOK` e `CHIMERA_GOVERNANCE`.
