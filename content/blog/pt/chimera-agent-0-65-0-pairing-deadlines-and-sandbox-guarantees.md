---
title: "Chimera Agent 0.65.0: Pareamento, Prazos e Garantias de Sandbox"
date: 2026-10-12
category: update
summary: "Bots agora pareiam com segurança na primeira inicialização, o fallback do sandbox foi removido, turnos têm prazos e modelos Ollama leem o prompt completo."
version: "0.65.0"
---

## A primeira inicialização pareia o bot, não a sala

Antes desta versão, o app desktop perguntava "esta é uma nova instalação?" no cartão Messaging quando a pasta de dados já estava preenchida. Isso significava que todo bot iniciado pelo app rodava aberto—respondendo a qualquer um que o alcançasse, usando as ferramentas e os gastos do proprietário. Um código de pareamento, se fosse gerado, ia para um console que ninguém lê.

O app agora registra quais bots já estavam configurados na inicialização. Esses bots continuam respondendo como antes. Um bot configurado depois desse ponto começa pareando, e seu código aparece no cartão Messaging, onde alguém realmente olha. A API reflete isso: `GET /api/messaging` reporta os estados `pairing_code`, `pairing` e `open`. A ponte desktop vê `pairing`, mas nunca o código em si, então a automação não pode pular a etapa humana.

## Um sandbox que não consegue rodar se recusa a rodar

Definir `CHIMERA_SANDBOX=docker` sem um daemon Docker costumava cair para o host com uma única linha de log. Um comando que deveria estar isolado rodava diretamente na máquina. Esse fallback foi removido. Agora `run_shell`, `execute_code` e etapas de workflow se recusam antes mesmo de fazer a pergunta de execução no host. A mensagem de recusa declara o que aconteceu, que nada rodou, e as duas saídas: iniciar o Docker ou definir `CHIMERA_SANDBOX=local`. O verificador se abstém em vez de reverter o trabalho porque um daemon estava fora.

Um chamador que passa `fallback=` explicitamente mantém o comportamento antigo. Todos os outros recebem uma parada brusca. O mesmo limite se aplica a mídia de entrada: downloads do Telegram e WhatsApp agora param no limite de 20 MB antes do primeiro byte quando o tamanho é declarado, em vez de ler o arquivo inteiro na memória e medir depois.

## Prazos chegam à faixa de governança

Uma decisão agora pode carregar um prazo, e perdê-lo empurra a faixa REVIEW em direção ao escrutínio. `DecisionSpec.deadline_s` declara um por decisão; `Decider.decide(..., deadline_s=)` o sobrescreve por chamada. Uma resposta que não chega a tempo para com `deadline_missed` no recibo e no log de decisão, então as perdas se tornam contáveis.

Com `CHIMERA_GOVERNANCE_BAND_DEADLINE_S` definido, uma perda produz um cartão REVIEW com `band: deadline`—nunca ALLOW. Uma resposta atrasada nunca é cacheada ou aplicada depois do fato. Isso está desligado por padrão, e o novo painel Settings › General › Governance and audit o expõe junto com outros cinco controles opt-in que antes eram acessíveis apenas via `.env` ou podiam ser salvos mas não lidos de volta. `GET /api/config` os reporta em um bloco `governance_audit`. Limpar o prazo não deixa mais um app que não consegue iniciar: um valor vazio agora é lido como sem prazo.

## Modelos Ollama leem o prompt inteiro

Chamadas para modelos `ollama_chat/` ou `ollama/` nunca nomeavam uma janela de contexto, então o Ollama servia seu padrão de máquina—4.096 tokens no caso que revelou isso. Todo prompt mais longo era cortado para cerca de metade desse tamanho, silenciosamente. A primeira requisição de uma execução `chimera solve`, aproximadamente 20.500 caracteres, era lida como 2.050 tokens, e o modelo nunca via a tarefa.

Todo caminho de gateway agora envia `num_ctx` apenas para rotas Ollama, extraído de `CHIMERA_OLLAMA_NUM_CTX` (padrão 32.768; defina como `0` para manter o padrão do servidor). O orçamento de compactação de um modelo Ollama é dimensionado a partir dessa janela em vez do fallback de 128.000 tokens. Uma resposta cuja contagem de prompt mostra um corte registra um aviso `PROMPT TRUNCATED` em vez de passar em silêncio. Provedores hospedados permanecem inalterados.

## O que fazer agora

Atualize com `pip install chimera-agent==0.65.0`. Se você roda o app desktop, reinicie-o e verifique o cartão Messaging para qualquer bot que precise de pareamento. Se você usa `CHIMERA_SANDBOX=docker`, verifique se o daemon está rodando ou mude para `local`. Se você chama modelos Ollama, defina `CHIMERA_OLLAMA_NUM_CTX` para corresponder à janela do seu modelo. As notas de versão completas estão em [Chimera Agent v0.65.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.65.0).
