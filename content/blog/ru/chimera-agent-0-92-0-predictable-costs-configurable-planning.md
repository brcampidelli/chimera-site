---
title: "Chimera Agent 0.92.0: Custos previsíveis, planejamento configurável"
date: 2026-11-21
category: update
summary: "Os recibos de custo agora usam preços em tempo real, o planejador é explicitamente configurável e a busca de configurações do Desktop cobre a tabela de roteamento."
version: "0.92.0"
---

## Recibos de custo que batem com o que você realmente paga

Antes da 0.92.0, o rastreamento de custos fora do `serve` dependia de um catálogo estático que se distanciava das taxas reais dos provedores. Uma execução podia reportar um custo que parecia plausível, mas estava errado — às vezes o suficiente para jogar fora um cálculo de orçamento. A discrepância ficava especialmente visível quando você usava um slug de modelo exato que o catálogo não reconhecia: o sistema recorria a uma taxa genérica ou simplesmente não mostrava nada útil.

Esta versão muda para o índice de preços público do OpenRouter para execuções que não passam pelo `serve`. Slugs de modelo exatos agora resolvem para suas próprias taxas em vez de serem agrupados em uma média familiar. Quando uma chamada é estrita — ou seja, o provedor e o modelo são travados na admissão — o recibo preserva a cotação que foi aceita, então o número que você vê é o número que foi realmente autorizado. A entrada do catálogo `gpt-oss-20b` também foi atualizada para refletir os preços atuais.

O efeito prático é que você pode pegar um recibo de uma execução em lote, multiplicar pelo seu volume esperado e obter um número que se sustenta. Chega de verificações manuais pontuais no painel do provedor.

## O planejador agora é uma chave que você controla

Até agora, o planejador estava sempre ligado. Você não podia desligá-lo para uma raia Kanban específica, uma chamada de API ou um passo de resolução de workflow. Isso significava que cada tarefa pagava a latência e o custo de token de uma passada de planejamento, mesmo quando a tarefa era trivial ou as instruções já eram explícitas o suficiente para que o planejamento não agregasse nada.

A versão 0.92.0 expõe `use_planner` como uma flag de configuração. Defina-a como `false` em uma raia, uma execução ou um passo de resolução, e o agente pula a fase de planejamento inteiramente. O padrão permanece `true`, então os workflows existentes não mudam de comportamento a menos que você opte por isso. A flag está disponível nas três superfícies — configuração Kanban, API e definições de workflow — para que você possa ser seletivo. Uma raia que lida com classificação simples pode pular o planejamento enquanto uma raia vizinha que faz pesquisa em múltiplos passos o mantém.

Por que não simplesmente tornar o planejamento mais inteligente? Porque o custo de errar na suposição é maior do que o custo de te dar a chave. Uma heurística que tenta decidir se o planejamento é necessário às vezes vai decidir errado, e depurar isso é mais difícil do que inverter um booleano que você controla.

## Configurações do Desktop que você realmente encontra

A busca de configurações no aplicativo Desktop anteriormente ignorava a tabela de roteamento modelo-por-função. Você podia digitar "routing" ou "role" e não obter resultados, mesmo que a tabela estivesse bem ali no painel de configurações. Isso está corrigido: a tabela de roteamento agora é indexada e aparece na busca.

Duas correções de localização chegam nesta versão também. A tabela de roteamento e a cópia do recibo agora são lidas corretamente em português brasileiro — antes, alguns rótulos estavam recorrendo ao inglês. Novas conversas e turnos somente de resposta também mostram mensagens de status mais claras, para que você não fique encarando um spinner se perguntando se o modelo está pensando ou se a conexão caiu.

## O que permanece experimental

Vários experimentos receberam atualizações sem alterar os padrões. O benchmark de extração de memória foi inconclusivo, então o limite de 6.000 caracteres e o modelo global permanecem. Você pode optar por um modelo de extração explícito e um pré-filtro determinístico se quiser testar o novo caminho. O experimento de tiers de modelo cron mostrou correção total em sete de oito tarefas sintéticas, mas tarefas sintéticas não são tarefas de produção, e os padrões não mudaram. O refinamento enxuto de Design e o experimento de proporcionalidade de prompt também permanecem desligados por padrão.

Os instaladores do Desktop ainda não são assinados e podem solicitar confirmação na primeira execução. O aplicativo verifica assinaturas nos pacotes do atualizador.

Atualize com `pip install chimera-agent --upgrade` e defina `use_planner` onde você precisar. O changelog completo está em [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
