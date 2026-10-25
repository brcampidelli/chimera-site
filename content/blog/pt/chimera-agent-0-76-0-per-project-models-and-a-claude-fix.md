---
title: "Chimera Agent 0.76.0: Modelos por projeto e correção para o Claude"
date: 2026-10-25
category: update
summary: "O Chimera Agent 0.76.0 permite que cada projeto fixe seu próprio modelo e corrige os modelos Claude na tela de Código."
version: "0.76.0"
---

## Modelos por projeto

Antes desta versão, trocar o modelo de um projeto alterava o modelo para todas as conversas em todos os projetos. O modelo era uma única configuração global e, se você quisesse modelos diferentes para projetos diferentes, precisava lembrar de alternar manualmente entre eles. Isso era propenso a erros e dificultava manter um projeto em um modelo específico por questões de consistência ou custo.

Agora cada projeto pode ter seu próprio modelo. Uma conversa no Código usa seu próprio modelo fixo, se tiver um, depois o modelo do projeto e, por fim, o padrão global. O recibo da interação mostra qual modelo foi usado, para você verificar de relance. Trocar o modelo de um projeto não afeta mais as conversas de outro. Isso significa que você pode configurar um projeto para usar um modelo mais barato para experimentação e outro para usar um modelo mais capaz em produção, sem se preocupar com contaminação cruzada.

Quando o agente propõe um modelo diferente, ele só pode deixar um card indicando a qual conversa ou projeto a mudança se aplicaria. Nada muda até você aprovar. Isso mantém você no controle e impede que o agente troque de modelo silenciosamente no meio de uma conversa.

## Modelos Claude voltam a funcionar na tela de Código

Com um modelo da Anthropic como padrão, toda interação de código falhava no primeiro passo com um erro sobre o schema de entrada de uma ferramenta. O schema da ferramenta de perguntas usava uma construção que a API da Anthropic recusa. Isso significava que, se você estivesse usando o Claude como modelo padrão, não conseguia usar a tela de Código — cada interação gerava erro antes de fazer qualquer coisa útil.

O schema agora é um objeto simples, que a API da Anthropic aceita. Um teste verifica o schema de cada ferramenta para que o problema não volte. Essa correção é importante porque garante que todos os modelos suportados funcionem em todas as telas, não apenas naquelas que por acaso são tolerantes com peculiaridades de schema.

## O que fazer agora

Atualize para a versão 0.76.0 e defina um modelo específico para o projeto, se precisar. Se você estava evitando o Claude na tela de Código, teste novamente. Veja as [notas de versão][Chimera Agent v0.76.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.76.0) para todos os detalhes.
