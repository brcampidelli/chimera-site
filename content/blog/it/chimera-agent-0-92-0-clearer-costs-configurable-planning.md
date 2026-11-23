---
title: "Chimera Agent 0.92.0: custos mais claros, planejamento configurável"
date: 2026-11-23
category: update
summary: "Os recibos de custo agora usam preços públicos para execuções fora do serve, o planejador pode ser desabilitado por raia ou execução, e a busca das configurações do Desktop encontra o roteamento de modelos."
version: "0.92.0"
---

## Recibos de custo que batem com o modelo que você realmente chamou

Em versões anteriores, você podia ficar sem saber quanto uma execução realmente custou. Os recibos dependiam de um contexto que nem sempre estava disponível, e um modelo que não correspondesse a uma entrada do catálogo podia cair para uma taxa que não refletia a chamada feita. Isso dificultava auditar gastos ou comparar execuções.

A versão 0.92.0 muda como os recibos são construídos para execuções fora do `serve`. Essas execuções agora usam o índice público de preços do OpenRouter. Slugs exatos de modelo recebem suas próprias taxas, em vez de herdar uma entrada mais genérica ou menos precisa. Chamadas strict preservam a cotação usada na admissão, então o recibo reflete o preço que foi aceito quando a chamada foi admitida, e não uma estimativa posterior ou diferente. A entrada de catálogo `gpt-oss-20b` também foi atualizada.

Para quem roda agentes fora do ambiente servido, isso elimina uma fonte de ambiguidade. Você pode olhar um recibo e saber que ele veio de preços públicos, vinculado ao slug específico do modelo, com chamadas strict preservando a cotação que governou a admissão. A mudança não altera como os modelos são selecionados. Ela muda o que o recibo reporta após a execução.

## Planejamento se torna uma decisão por execução

Antes, o planejador era um comportamento global. Se você quisesse que uma raia, uma execução via API ou um passo de resolução de workflow pulasse o planejamento, não havia um interruptor direto para esse contexto. Você aceitava o padrão ou alterava o comportamento de forma mais ampla do que a tarefa exigia.

`use_planner` agora é configurável em raias Kanban, execuções via API e passos de resolução de workflow. O planejador permanece ativo por padrão. Esse padrão importa: configurações existentes mantêm seu comportamento atual, a menos que você opte explicitamente por desativar. A nova configuração oferece um ponto de controle mais restrito para casos em que o planejamento adiciona latência ou etapas que uma execução específica não precisa.

Isso é útil quando uma raia lida com uma tarefa restrita, quando um chamador da API sabe que a entrada já está formatada para execução direta ou quando um passo de resolução deve prosseguir sem uma passada adicional de planejamento. Agora você pode expressar isso no nível da raia, execução ou passo, em vez de alterar o sistema inteiro.

## Configurações do Desktop que você realmente encontra

A busca de configurações não mostrava a tabela de roteamento de modelos por função. Se você já não soubesse onde ela ficava, podia perder tempo clicando pela interface para encontrá-la. Isso foi corrigido: a busca agora encontra a tabela de roteamento.

Duas correções menores no Desktop estão incluídas. A cópia de roteamento e recibos agora é exibida corretamente em português brasileiro. Novas conversas e turnos somente de resposta também mostram status mais claros, para que a interface informe o que está acontecendo em vez de deixar o estado ambíguo.

## O que fazer agora

Atualize para a 0.92.0 e verifique as três áreas que mudaram. Se você roda agentes fora do `serve`, revise um recibo e confirme se ele reflete o slug do modelo e a cotação de admissão que você espera. Se você tem raias ou execuções via API que não precisam de planejamento, defina `use_planner` como false nesse nível e mantenha o padrão ativo em todo o resto. Se você usa o Desktop, busque em Configurações pela tabela de roteamento de modelos por função e verifique o texto de status em uma nova conversa.

Notas completas da versão: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
