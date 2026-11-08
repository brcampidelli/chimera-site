---
title: "Chimera Agent 0.85.0: Chega de travamentos silenciosos e um navegador que emparelha"
date: 2026-11-08
category: update
summary: "Corrige um travamento de execução causado por pipes herdados, adiciona emparelhamento do navegador com código de uso único, voz local para chatbots e endpoints nomeados compatíveis com OpenAI."
version: "0.85.0"
---

## A execução que nunca terminava

Uma execução cujo processo filho mantinha seu pipe de saída aberto costumava travar o agente indefinidamente. O leitor esperava sem limite pelo fechamento do pipe. Um processo neto que herdava o pipe — um worker de um test runner, um servidor em background — mantinha a execução, seu botão de cancelar e a suite de testes esperando para sempre. O botão de cancelar não fazia nada porque a árvore de processos continuava viva, e a suite de testes congelava em silêncio em vez de reportar o deadlock.

Isso muda na 0.85.0. O leitor de saída agora roda em sua própria thread com um período de carência de cinco segundos após a saída do filho. Quando você cancela uma execução, o Chimera mata o grupo de processos inteiro no POSIX e a árvore de processos no Windows. A suite de testes também para de se esconder atrás de uma parede congelada: se um único teste rodar por mais de quinze minutos, a suite despeja o stack trace de cada thread em vez de travar sem uma palavra. Você recebe um diagnóstico em vez de um terminal em branco.

A correção é mais importante quando você encadeia ferramentas que geram seus próprios subprocessos — frameworks de teste, scripts de build ou qualquer comando que bifurque um servidor em background. Antes, essas execuções eram irrecuperáveis. Agora, cancelar significa cancelar.

## Emparelhe uma aba do navegador sem abrir uma porta

Até agora, dar a uma aba do navegador acesso à tela do proprietário significava expor a bridge ou um canal de chat. Ambos os caminhos carregavam mais superfície de ataque do que o necessário. A versão 0.85.0 adiciona um fluxo de emparelhamento que os elimina completamente.

O app desktop mostra um código de oito caracteres, válido por cinco minutos e cinco tentativas. Você o digita na aba do navegador. Essa aba recebe um cookie HttpOnly, same-site válido por até doze horas, revogável a qualquer momento pelo desktop. Apenas o desktop emite códigos — a bridge e os canais de chat não podem. Uma aba emparelhada não pode ativar a bridge, não pode habilitar controle total e não pode alternar "Ignorar permissões". Toda requisição de mudança de estado feita por ela deve se originar da mesma origem.

Isso te dá uma janela com tempo limitado, revogável e de baixo privilégio para a tela do proprietário. Você emparelha uma aba quando precisa, revoga quando não precisa, e a bridge permanece desligada o tempo todo.

## Mensagens de voz chegam localmente, e endpoints ganham nomes

Bots do Discord e Telegram agora podem ouvir mensagens de voz e responder em voz alta, e ambos acontecem na sua máquina. Notas de voz são transcritas localmente com o faster-whisper usando uma revisão de modelo fixa. A duração é verificada antes da decodificação, e um limite de taxa por usuário previne abusos. Respostas faladas vêm desligadas por padrão. Para ativá-las, você aponta `CHIMERA_CHAT_VOICE_MODEL` para um arquivo `.onnx` de voz Piper que você mesmo escolheu. O Chimera não inclui nenhum modelo de voz, e o `piper-tts` (GPL-3.0) vive em um extra `voice` separado, fora do `[full]`. Você opta por voz e fornece a voz.

Endpoints compatíveis com OpenAI também recebem tratamento de primeira classe. Configurações › Conexões agora lista seus endpoints — um vLLM local, LM Studio, servidor llama.cpp ou um hospedado — e permite adicioná-los, testá-los e removê-los. O teste faz uma única chamada `GET /models` limitada àquele endpoint. Apenas a tela do proprietário pode alterar ou testar endpoints, a chave nunca é exibida, e a chave de um endpoint deve ser sua própria variável `*_API_KEY`, nunca a credencial de outro provedor ou uma configuração `CHIMERA_`. Isso fecha a solicitação de longa data em #1133.

## O que fazer agora

Atualize com `pip install chimera-agent --upgrade`. Leia as notas completas em [Chimera Agent v0.85.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.85.0). Se você usa chatbots e quer voz, instale o extra `voice` e defina `CHIMERA_CHAT_VOICE_MODEL` para seu modelo Piper. Para emparelhar uma aba do navegador, abra o app desktop e procure o código de emparelhamento nos controles da tela do proprietário.
