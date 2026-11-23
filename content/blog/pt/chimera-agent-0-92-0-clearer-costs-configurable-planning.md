---
title: "Chimera Agent 0.92.0: custos mais claros, planejamento configurável"
date: 2026-11-23
category: update
summary: "Os recibos de custo agora usam preços públicos para execuções fora do serve, o planejador pode ser desativado por lane ou por execução, e a busca de configurações do Desktop encontra o roteamento de modelos."
version: "0.92.0"
---

## Recibos de custo que correspondem ao modelo que você realmente chamou

Em versões anteriores, você podia ficar sem saber quanto uma execução realmente custou. Os recibos dependiam de contexto que nem sempre estava disponível, e um modelo que não batia com uma entrada do catálogo podia cair para uma taxa que não refletia a chamada que você fez. Isso dificultava auditar gastos ou comparar execuções.

A versão 0.92.0 muda como os recibos são montados para execuções fora do `serve`. Essas execuções agora usam o índice público de preços do OpenRouter. Slugs exatos de modelo recebem suas próprias taxas em vez de herdar uma entrada mais ampla ou menos precisa. Chamadas strict mantêm a cotação usada na admissão, então o recibo reflete o preço que foi aceito quando a chamada foi admitida, em vez de uma estimativa posterior ou diferente. A entrada de catálogo `gpt-oss-20b` também foi atualizada.

Para quem roda agentes fora do ambiente servido, isso elimina uma fonte de ambiguidade. Você pode olhar um recibo e saber que ele veio de preços públicos, vinculado ao slug específico do modelo, com chamadas strict preservando a cotação que governou a admissão. A mudança não altera como os modelos são selecionados. Ela muda o que o recibo reporta após a execução.

## Planejamento vira uma decisão por execução

O planejador era antes um comportamento global. Se você quisesse que uma lane, uma execução de API ou um passo de solve de workflow pulasse o planejamento, não havia um interruptor direto para esse contexto. Ou você aceitava o padrão ou mudava o comportamento de forma mais ampla do que a tarefa exigia.

`use_planner` agora é configurável em lanes do Kanban, execuções de API e passos de solve de workflow. O planejador permanece ativado por padrão. Esse padrão importa: setups existentes mantêm o comportamento atual a menos que você opte explicitamente por desativar. A nova configuração dá um ponto de controle mais fino para casos em que o planejamento adiciona latência ou passos que uma execução específica não precisa.

Isso é útil quando uma lane lida com uma tarefa restrita, quando quem chama a API sabe que a entrada já está formatada para execução direta, ou quando um passo de solve deve prosseguir sem uma passada adicional de planejamento. Agora você pode expressar isso no nível da lane, da execução ou do passo, em vez de mudar o sistema inteiro.

## Configurações do Desktop que você realmente encontra

A busca de configurações não mostrava a tabela de roteamento de modelos por papel. Se você já não soubesse onde ela ficava, podia perder tempo clicando pela interface para encontrá-la. Isso foi corrigido: a busca agora encontra a tabela de roteamento.

Duas correções menores do Desktop estão incluídas. O texto de roteamento e de recibos agora aparece corretamente em português do Brasil. Novas conversas e turnos somente de resposta também mostram status mais claro, para que a interface diga o que está acontecendo em vez de deixar o estado ambíguo.

## O que fazer agora

Atualize para a 0.92.0 e verifique as três áreas que mudaram. Se você roda agentes fora do `serve`, revise um recibo e confirme que ele reflete o slug do modelo e a cotação de admissão que você espera. Se você tem lanes ou execuções de API que não precisam de planejamento, defina `use_planner` como false nesse nível e deixe o padrão ativado em todo o resto. Se você usa o Desktop, busque em Configurações pela tabela de roteamento de modelos por papel e verifique o texto de status em uma nova conversa.

Notas de versão completas: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
