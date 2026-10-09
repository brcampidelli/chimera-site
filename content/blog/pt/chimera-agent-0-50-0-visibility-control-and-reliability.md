---
title: "Chimera Agent 0.50.0: Visibilidade, Controle e Confiabilidade"
date: 2026-10-09
category: update
summary: "Chimera Agent 0.50.0 traz visibilidade sobre as tarefas dos agentes, webhooks de aprovação, controles de governança, recuperação híbrida e correções para janelas de contexto dos modelos."
version: "0.50.0"
---

## Visibilidade sobre as Tarefas dos Agentes

Uma das mudanças mais significativas no Chimera Agent 0.50.0 é a introdução da visibilidade sobre as tarefas. Anteriormente, o campo `RunState.tasks` existia, mas nunca era preenchido, deixando os usuários no escuro sobre o que o agente estava fazendo. Agora, o agente mantém uma lista de tarefas que é exibida na tela durante a execução. Cada tarefa é marcada como em andamento ou concluída, e a lista sobrevive à compactação de contexto. Isso significa que, mesmo durante execuções longas, o agente não esquece seu plano, proporcionando aos usuários uma visão clara do progresso.

## Webhooks de Aprovação para Execuções Não Monitoradas

Outra grande melhoria é a capacidade do agente de solicitar aprovações mesmo quando ninguém está no console. Ao definir a variável de ambiente `CHIMERA_APPROVAL_WEBHOOK` com um webhook de canal, o agente agora pode enviar perguntas de aprovação para um canal designado. Essa mudança resolve um problema anterior em que superfícies não monitoradas, incluindo jobs cron, tomavam decisões silenciosamente sem entrada do usuário. Agora, se não houver como entregar a pergunta, o agente afirma explicitamente que está `inacessível`, garantindo transparência.

## Controles de Governança

O kernel de governança, que antes era invisível e inativo, agora pode ser ativado. O parâmetro `CHIMERA_GOVERNANCE` vem desativado por padrão, mas os usuários agora têm a capacidade de habilitá-lo. A tela de Segurança também indica o estado atual da governança, proporcionando aos usuários o controle e a visibilidade necessários sobre essa funcionalidade crítica.

## Recuperação Híbrida no `chimera find`

O comando `chimera find` foi aprimorado com recuperação híbrida, combinando métodos de busca por palavras-chave e vetorial. Essa abordagem híbrida, que é fixada antes do início da execução, mostrou-se 6,25 pontos superior à busca por palavras-chave no próprio corpus do projeto. É importante destacar que a busca vetorial por si só tem desempenho inferior à busca por palavras-chave, razão pela qual o método híbrido agora é o padrão. Essa mudança garante resultados de recuperação mais precisos e confiáveis.

## Correções para Janelas de Contexto dos Modelos

Anteriormente, modelos não listados no catálogo verificado manualmente eram assumidos como tendo uma janela de 128.000 tokens, o que levava a estouros de contexto e falhas na execução para modelos com janelas menores. Esta versão corrige esse problema ao buscar a janela de contexto no índice ao vivo quando o catálogo não conhece o modelo. Além disso, cinco entradas do catálogo foram corrigidas para refletir as janelas de contexto reais fornecidas por seus provedores, e um preço foi ajustado para corresponder a dados verificados.

## Melhorias Adicionais

Os rastreamentos agora registram qual backend serviu cada etapa, não apenas qual modelo respondeu. Isso é particularmente importante para modelos no OpenRouter, onde um único slug de modelo pode representar um conjunto de endpoints com janelas de contexto e preços variados. Essa mudança garante que os usuários tenham uma compreensão mais clara dos recursos sendo utilizados.

## Advertências Honestas

- **Os instaladores não são assinados.** A primeira execução exibe um aviso do SmartScreen no Windows e um aviso do Gatekeeper no macOS. Isso é esperado; o *atualizador* é assinado, que é a parte que importa para o que chega à sua máquina após a instalação.

- **A governança vem desativada.** O controle existe para que você possa ativá-lo, não porque ele já está ativo.

- **O compactador de resumo vem desativado**, atrás de `AgentConfig.summarise_compaction`. A compactação em si nunca foi acionada em uso comum — medida 0 vezes em 137 execuções — então o compactador de resumo foi construído e não testado, em vez de construído e necessário.

- **O cancelamento é cooperativo.** Parar uma execução a interrompe antes da próxima chamada do modelo; chamadas já em andamento são finalizadas e cobradas.

Para detalhes completos, incluindo as medições que embasaram essas mudanças, consulte o [changelog][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0).
