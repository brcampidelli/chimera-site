---
title: "Chimera Agent 0.81.0: Sessões atômicas, endpoints nomeados e correções no artboard"
date: 2026-10-31
category: update
summary: "A gravação de sessões agora é atômica, artboards HTML carregam suas próprias fontes e imagens, e você pode rotear modelos para endpoints nomeados compatíveis com OpenAI."
version: "0.81.0"
---

## Sessões não se corrompem mais sob turnos paralelos

Reabrir uma conversa do Code costumava reescrever o arquivo de sessão no mesmo local. A escrita vinha de uma leitura feita antes de uma espera de até dez segundos. Durante essa janela, outro leitor ou uma falha viam metade de um arquivo. Turnos salvos nesse intervalo eram perdidos. Sob muitos turnos paralelos, isso danificou várias sessões e seus backups.

A correção torna as escritas de sessão atômicas, descarregadas em disco e travadas entre processos. A etapa de reabertura agora mescla apenas os campos que de fato aprendeu. Você para de perder turnos para uma condição de corrida entre uma leitura e uma escrita atrasada. Se você executar múltiplos agentes contra a mesma sessão, ou reiniciar enquanto um turno está em voo, o arquivo permanece íntegro.

## Artboards HTML ganham seus próprios assets e inspetor

Antes desta versão, um artboard HTML puxava fontes de uma lista a nível de token escrita como um único nome entre aspas. As telas recorriam a uma face serifada no canvas e nas exportações. O inspetor sempre mostrava o primeiro artboard, então uma segunda tela HTML não conseguia acessar seus ajustes ou selecionar seus elementos.

Cada design agora mantém seu próprio armazenamento de imagens e fontes. Você adiciona imagens PNG, JPEG, WebP ou GIF, e fontes WOFF2, WOFF ou TTF, a partir do assistente. O assistente sabe quais assets existem. Telas e exportações os utilizam. Arquivos SVG e disfarçados são recusados. No canvas, os assets chegam como dados inline, então a tela em sandbox ainda não acessa rede alguma.

Clicar em um artboard ou em seu rótulo o torna o ativo. O inspetor acompanha. Uma segunda tela HTML ganha sua própria seleção de elementos e ajustes de estilo. As fontes do sistema de design renderizam no canvas e nas exportações.

## Endpoints nomeados substituem a URL base global

Roteamento de modelos para um provedor compatível com OpenAI anteriormente significava definir `CHIMERA_API_BASE` globalmente. Todo modelo passava por essa única base. Você não podia misturar provedores em uma configuração sem proxyá-los você mesmo.

`CHIMERA_ENDPOINTS` lista endpoints por nome. Cada entrada declara uma URL base e a variável que contém sua chave. Um modelo escrito como `endpoint/<nome>/<modelo>` vai para esse endpoint com sua própria base e chave, ao lado do OpenRouter. O cartão de privacidade, recibos e painel de Uso nomeiam o endpoint e seu host. `/api/endpoints` os lista e testa.

Isso chega como parte do trabalho de roteamento multi-provedor. Você mantém chaves separadas para provedores separados, e o agente roteia cada modelo para a base correta sem um proxy na frente.

## Conectores que você nomeia em uma mensagem conectam-se para aquele turno

Com o autoload MCP desligado, um turno do Code cuja mensagem nomeia um conector configurado e habilitado conecta apenas esse. O turno informa isso e mantém o conector para turnos posteriores que o nomeiem. Texto de ferramentas, páginas ou arquivos nunca ativa um conector. Bots mantêm sua própria lista.

Isso impede que uma menção em um documento recuperado habilite silenciosamente um conector que você não pretendia usar. Você controla a conexão pelo que digita na mensagem.

## Correções menores que removem atrito

Uma mensagem que nomeia Chimera Design enquanto pede um caminho de código, um comando pytest ou palavras como fix, implement ou test não abre mais o canvas. O sistema não lê mais trabalho de engenharia como uma solicitação de design.

O cartão de detalhes de um conector de URL não afirma mais que testar inicia um comando ou que o npx pode baixar um pacote. Um servidor em loopback não carrega mais o selo "alcança a rede". O que o cartão descreve agora corresponde ao que o conector realmente faz.

## Obtenha

Instale ou atualize com pip:

```
pip install chimera-agent --upgrade
```

Leia o changelog completo em [Chimera Agent v0.81.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.81.0).
