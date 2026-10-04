---
title: "Chimera Agent 0.49.3: Correções para Uso no Mundo Real"
date: 2026-10-04
category: update
summary: "A versão 0.49.3 resolve problemas críticos encontrados durante o uso real, melhorando clareza, confiabilidade e eficiência de custos."
version: "0.49.3"
---

## Mensagens de Erro Mais Claras para Operações MCP

Um dos problemas mais custosos em versões anteriores envolvia a leitura de dados MCP. Quando uma execução era contaminada por conteúdo não confiável, a mensagem de erro era ambígua, levando usuários a repetir a mesma operação várias vezes sem sucesso. Isso gerava gastos desnecessários e frustração. Agora, as mensagens são específicas para cada cenário, indicando claramente se uma nova tentativa ajudará e sugerindo alternativas práticas, como usar a opção de pausa para aprovação ou evitar conteúdo não confiável.

## Testes Melhorados de Servidor MCP

O botão Testar MCP antes só verificava a conectividade do servidor, deixando os usuários sem saber se o agente poderia realmente utilizá-lo. Isso causava perda de tempo e recursos quando execuções falhavam devido a servidores não carregados. Agora, o botão Testar informa explicitamente se o agente pode usar o servidor, com mensagens diferentes para causas distintas e orientações sobre como resolver o problema.

## Status de Verificação Preciso

Execuções antes reportavam `verified: True` com base em um instantâneo, o que podia enganar se os arquivos fossem alterados depois. Agora, as execuções incluem uma flag `delivered_matches_verified`, e a lista de Runs exibe um badge quando os arquivos em disco não batem com o estado verificado. Isso garante que os usuários saibam de discrepâncias e possam agir.

## Correção de Erros de Instalação de Skills

Falhas na instalação de skills eram atribuídas incorretamente ao limite horário do GitHub para downloads anônimos, mesmo quando não era o caso. As mensagens de erro agora identificam corretamente o host que recusou a requisição e garantem que o token chegue a ambos os hosts. Além disso, erros 429 são retentados com o tempo de espera especificado pelo servidor, reduzindo tentativas desnecessárias.

## Recusas de Escrita de Arquivo Precisas

A escrita de arquivos às vezes era recusada com mensagens enganosas que comparavam diretórios em vez de caminhos. Isso fazia o agente esgotar seu orçamento repetindo a mesma operação. Agora, as mensagens descrevem corretamente a comparação de caminhos e explicam o padrão de globs relativo ao workspace, evitando confusão e tentativas desperdiçadas.

## Padrões de Modelo Atualizados

Os modelos padrão estavam desatualizados, alguns com uma geração de atraso e outros sob risco de descontinuação. Os padrões foram atualizados para modelos mais recentes e estáveis, garantindo melhor desempenho e confiabilidade. Além disso, `.env.example` não define mais padrões significativamente mais caros ou com modelos descontinuados.

Essas mudanças são baseadas em uso real e visam melhorar a experiência do usuário ao resolver problemas comuns. Para detalhes completos, consulte [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
