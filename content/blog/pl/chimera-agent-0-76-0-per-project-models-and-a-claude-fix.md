---
title: "Chimera Agent 0.76.0: Modelos por projeto e correção para Claude"
date: 2026-10-25
category: update
summary: "O Chimera Agent 0.76.0 permite que cada projeto fixe seu próprio modelo e corrige os modelos Claude na tela de Código."
version: "0.76.0"
---

## Modelos por projeto

Antes desta versão, trocar o modelo para um projeto alterava o modelo para todas as conversas em todos os projetos. O modelo era uma única configuração global e, se você quisesse modelos diferentes para projetos diferentes, precisava lembrar de alternar manualmente entre eles. Isso era propenso a erros e dificultava manter um projeto em um modelo específico por questões de consistência ou custo.

Agora cada projeto pode ter seu próprio modelo. Uma conversa no Código usa seu próprio modelo fixado, se tiver um, depois o modelo do projeto e, por fim, o padrão global. O recibo da interação mostra qual modelo foi usado, para que você possa verificar rapidamente. Alterar o modelo de um projeto não afeta mais as conversas de outro. Isso significa que você pode configurar um projeto para usar um modelo mais barato para experimentação e outro para usar um modelo mais capaz para produção, sem se preocupar com contaminação cruzada.

Quando o agente propõe um modelo diferente, ele só pode te deixar um card nomeando a conversa ou o projeto ao qual se aplicaria. Nada muda até que você aprove. Isso mantém você no controle e impede que o agente troque de modelo silenciosamente no meio da conversa.

## Modelos Claude funcionam na tela de Código novamente

Com um modelo Anthropic como padrão, cada interação de código falhava no primeiro passo com um erro sobre o schema de entrada de uma ferramenta. O schema da ferramenta de perguntas usava uma construção que a API da Anthropic recusa. Isso significava que, se você estivesse usando Claude como modelo padrão, não poderia usar a tela de Código de forma alguma — cada interação resultava em erro antes de fazer qualquer coisa útil.

O schema agora é um objeto simples, que a API da Anthropic aceita. Um teste verifica o schema de cada ferramenta para que o problema não possa retornar. Essa correção é importante porque garante que todos os modelos suportados funcionem em todas as telas, não apenas aqueles que são tolerantes com peculiaridades de schema.

## O que fazer agora

Atualize para a versão 0.76.0 e defina um modelo específico por projeto, se precisar. Se você estava evitando o Claude na tela de Código, teste novamente. Veja as [notas de lançamento][Chimera Agent v0.76.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.76.0) para detalhes completos.
