---
title: "Chimera Agent 0.49.3: Corrigindo o Que Quebra Quando Usado, Não Só Quando Lido"
date: 2026-10-06
category: update
summary: "Seis defeitos corrigidos após testes no mundo real, incluindo falhas silenciosas de escrita, resultados de testes enganosos e padrões de modelos desatualizados."
version: "0.49.3"
---

## Quando Ferramentas Mentem Sobre Seu Próprio Estado

A lição mais cara veio da leitura de dados do MCP. Uma tarefa que custou US$ 5,11 não gerou nenhum arquivo porque a mensagem de recusa não distinguia entre negação humana e aprovação impossível. Três tentativas idênticas queimaram o orçamento antes que os usuários percebessem que novas tentativas não funcionariam. Agora, cada caso de recusa se explica: a negação humana mostra quem recusou, a negação do sistema nomeia o bloco de configuração, e os casos HTTP explicitamente afirmam que não existe um aprovador enquanto sugerem duas soluções - habilitar pausa para aprovação ou evitar conteúdo não confiável.

## Verificação Que Não Era

Um selo `verified: True` com logs de teste passando se tornou sem sentido quando escritas subsequentes alteraram os arquivos. Os usuários viam checkmarks verdes enquanto trabalhavam com conteúdo não verificado. O sistema agora rastreia se os arquivos entregues correspondem ao estado verificado e mostra selos de aviso quando eles divergem. A verificação original permanece visível - estava correta quando dada - mas a incompatibilidade atual aparece ao lado dela.

## Padrões Que Falharam

As atribuições de modelos haviam se desviado perigosamente:
- O modelo principal era 4x mais caro que as opções atuais
- Um modelo de prévia estava em um slot padrão crítico
- As janelas de contexto ficavam aquém dos requisitos da camada

Os novos padrões correspondem à relação custo/desempenho atual (deepseek-v4-flash-0731 a 1/4 do custo) enquanto mantêm a capacidade. O arquivo .env.example não sugere mais modelos retirados ou preços de outra era. Notavelmente, a seleção de modelos não foi baseada em testes de qualidade de saída - oito candidatos escreveram arquivos com sucesso - mas em fatores mensuráveis: preço, janela de contexto e benchmarks de terceiros.

## O Que Fazer Agora

Atualize imediatamente se você usa:
- Servidores MCP (comportamento de teste alterado)
- Verificação de arquivos (nova detecção de incompatibilidade)
- Padrões de modelos (mudanças significativas em custo/desempenho)

Os detalhes técnicos completos explicam a lógica de cada correção: [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
