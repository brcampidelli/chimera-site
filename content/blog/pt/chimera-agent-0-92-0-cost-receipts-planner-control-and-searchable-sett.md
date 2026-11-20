---
title: "Chimera Agent 0.92.0: Recibos com custo real, controle do planner e busca nas configurações"
date: 2026-11-20
category: update
summary: "Execuções fora do serve agora usam taxas reais do OpenRouter, o planner é configurável por raia e a busca de configurações do Desktop encontra a tabela de roteamento."
version: "0.92.0"
---

## O que você paga é o que você vê

O rastreamento de custos para execuções lançadas fora do `serve` estava desconectado da realidade. O framework usava um catálogo interno desatualizado que não refletia o que os provedores de fato cobravam. Se você executasse um agente a partir de um script ou de um harness de teste, o recibo mostrava um número sem relação alguma com a fatura. Isso quebrava o orçamento de quem itera localmente antes de fazer deploy.

A versão 0.92.0 conecta essas execuções ao índice público de preços do OpenRouter. Quando você passa um slug exato de modelo, o framework consulta aquela taxa específica em vez de recorrer a uma correspondência fuzzy. Chamadas strict agora retêm a cotação capturada no momento da admissão, então o recibo corresponde ao custo que o provedor prometeu quando a requisição foi aceita. A entrada do catálogo `gpt-oss-20b` também foi atualizada para refletir o preço atual. O resultado é uma fonte única de verdade: o número no recibo é o número que você verá na fatura do provedor.

Isso importa porque quem constrói agentes frequentemente testa com modelos baratos e troca para modelos maiores em produção. Sem taxas precisas por modelo, comparações de custo entre execuções não fazem sentido. Agora você pode comparar duas execuções do planner lado a lado e confiar que a diferença no recibo reflete uma diferença real de gasto.

## O planner não está mais sempre ligado

Antes desta versão, o planner executava em todo turno, em todo contexto. Não havia como desabilitá-lo para uma raia específica do Kanban, uma chamada de API ou um passo de resolução de workflow. Isso impunha uma sobrecarga de planejamento a tarefas que não se beneficiavam dele — recuperação simples, transformações determinísticas ou passos onde a próxima ação já é conhecida. A única alternativa era bifurcar a definição do workflow e torcer para nada quebrar.

Agora `use_planner` é uma flag de configuração. Defina-a em uma raia, passe-a em uma execução de API ou anexe-a a um passo de resolução. O planner permanece ligado por padrão, então workflows existentes não mudam de comportamento. Mas quando você sabe que um passo não precisa de um plano, você o desliga e economiza o round trip. Isso reduz latência e custo em pipelines que misturam estágios intensivos em planejamento com estágios livres de planejamento.

## Configurações do Desktop que você consegue encontrar

A busca de configurações no app Desktop anteriormente ignorava a tabela de roteamento de modelo por papel. Você podia buscar por "router" ou "routing" e não obter resultados, mesmo sendo a tabela a superfície de configuração mais complexa do app. A única forma de acessá-la era rolar o painel de configurações até reconhecê-la. Isso dificultava a integração de novos usuários e atrasava usuários experientes que queriam ajustar atribuições de papel rapidamente.

O índice de busca agora inclui a tabela de roteamento. Digite o nome de um papel ou de um modelo e a busca retorna a entrada correspondente. A mesma atualização corrige dois bugs de localização: rótulos de roteamento e o texto dos recibos agora são exibidos corretamente em português do Brasil, onde strings truncadas e traduções faltantes tornavam a interface confusa. Novas conversas e turnos somente de resposta também mostram mensagens de status mais claras, para que você saiba se o agente está esperando entrada ou processando.

## O que permanece experimental

Vários experimentos receberam atualizações sem alterar os padrões. O benchmark de extração de memória foi inconclusivo, então o limite de 6.000 caracteres e o modelo global permanecem. Você pode optar por um modelo de extração explícito e um pré-filtro determinístico se quiser testar o novo caminho. O experimento de camadas de modelo para cron mostrou total correção em sete de oito jobs sintéticos, mas jobs sintéticos não são cargas de trabalho de produção, e os padrões não mudaram. O refinamento enxuto de Design e o experimento de proporcionalidade de prompts também permanecem desligados por padrão.

Esses experimentos estão documentados nas notas vinculadas. Se você está executando agentes com uso intensivo de memória ou workflows cron agendados, vale a pena testar as flags de opt-in em um ambiente de staging.

## Obtenha a versão

Atualize com `pip install chimera-agent --upgrade` e verifique a versão com `chimera --version`. Os instaladores Desktop não são assinados e podem pedir confirmação na primeira execução; o app verifica assinaturas nos pacotes do atualizador. Notas completas em [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
