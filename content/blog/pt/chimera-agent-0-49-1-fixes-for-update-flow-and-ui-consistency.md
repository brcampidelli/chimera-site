---
title: "Chimera Agent 0.49.1: Correções no fluxo de atualização e consistência da interface"
date: 2026-09-12
category: update
summary: "A versão 0.49.1 resolve problemas críticos de atualização, melhora a consistência da interface e corrige lacunas de tradução no assistente de primeira execução."
version: "0.49.1"
---

## Correções no Fluxo de Atualização

Um dos problemas mais significativos resolvidos no Chimera Agent 0.49.1 envolve o mecanismo de atualização. Anteriormente, após uma atualização in-place, o processo em segundo plano reportava incorretamente a versão antiga devido a um arquivo `dist-info` residual da instalação anterior. Isso ocorria porque o bundle do PyInstaller mantinha tanto os arquivos da versão antiga quanto da nova, fazendo com que `importlib.metadata` retornasse a primeira versão encontrada. Como resultado, o aplicativo continuava oferecendo uma atualização para a versão que já estava em execução, causando confusão e prompts de atualização desnecessários.

Para resolver isso, o instalador agora remove o bundle antigo antes de escrever o novo, garantindo que apenas a versão correta seja reconhecida. No entanto, observe que essa correção se aplica ao instalador enviado com a 0.49.1, não ao usado para instalá-la. Usuários atualizando da versão 0.49.0 ainda podem enfrentar esse problema até a próxima atualização. Uma correção manual envolve excluir o arquivo `dist-info` obsoleto e reiniciar o aplicativo.

Outro problema relacionado à atualização envolvia o recurso de auto-atualização. Por aproximadamente vinte e cinco minutos após cada lançamento, o atualizador falhava porque o endpoint `releases/latest/download/latest.json` retornava um erro 404 enquanto os builds ainda estavam em andamento. Esse problema passou despercebido porque o atualizador silenciosamente ignorava os erros. Agora, os lançamentos são retidos com `--latest=false` até que todos os builds estejam concluídos, garantindo que o endpoint sempre aponte para um lançamento válido.

## Consistência da Interface e Correções de Tradução

O painel 'nova versão disponível' anteriormente fazia uma pergunta que não podia responder. O cabeçalho do painel dizia 'Uma nova versão está disponível. Atualizar?' mas só oferecia botões para visualizar o lançamento ou dispensar o painel. Como o painel reside na webview sem IPC para o atualizador em Rust, ele não podia iniciar uma atualização. Agora, o painel simplesmente informa a disponibilidade de uma nova versão e direciona os usuários para a opção 'Verificar atualizações' na bandeja do sistema.

Além disso, o assistente de primeira execução tinha uma lacuna de tradução no dropdown do modo de custo, que exibia valores brutos (`auto / cheap / balanced / premium`) em vez de rótulos traduzidos. Essa inconsistência foi corrigida, alinhando o assistente com a tela de Configurações, que já usava os rótulos traduzidos. Observe que os valores permanecem em inglês para corresponder à entrada esperada pelo servidor.

Para detalhes completos, consulte as [notas de lançamento][Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1).

[Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1): CHANGELOG.md
