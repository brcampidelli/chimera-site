---
title: "Chimera Agent 0.67.4 corrige bots do Discord no app desktop empacotado"
date: 2026-10-16
category: update
summary: "O aplicativo desktop instalado não crasha mais com erro de módulo ausente ao iniciar um bot do Discord."
version: "0.67.4"
---

O app desktop empacotado lançado na versão anterior veio com um contrato quebrado. Se alguém instalasse o aplicativo e o apontasse para um bot do Discord, o painel de status não mostrava um bot rodando. Mostrava um traceback terminando em `ModuleNotFoundError: No module named 'discord'`. A configuração do agente era válida. O token estava correto. A falha estava no empacotamento em si.

## O que quebrou e por que isso importa

O problema foi a combinação de duas decisões que só colidiram quando o build de release rodou. Primeiro, os adaptadores de mensageria — incluindo o Discord — foram projetados como imports lazy. O framework não carrega todas as superfícies de chat na inicialização; ele só importa o adaptador quando uma configuração de bot o solicita. Esse design manteve partidas a frio rápidas e o uso de memória baixo, e funcionava em todo ambiente onde todas as dependências opcionais estavam presentes.

Segundo, o build de release usou um conjunto de dependências enxuto. O extra de mensageria, que carrega as bibliotecas cliente do Discord, foi marcado como opcional e acabou omitido do aplicativo instalado. A análise do PyInstaller percorreu o grafo de imports estaticamente, viu o import lazy escondido atrás de um loader baseado em string e concluiu que o código do adaptador era código morto. O resultado: uma configuração funcional que o runtime não conseguia executar.

Para quem constrói agentes, o impacto foi específico. Qualquer bot definido com uma superfície Discord falhava exclusivamente no app empacotado. O mesmo arquivo de configuração funcionava a partir do fonte. O mesmo arquivo de configuração funcionava em um container. A inconsistência significava que o app desktop não era confiável para toda uma classe de agentes, exatamente a classe que gera mais feedback da comunidade.

## A correção e o que ela significa para o empacotamento

A versão 0.67.4 corrige a declaração de dependência para que o extra de mensageria seja empacotado junto com o aplicativo instalado. O PyInstaller agora enxerga o adaptador do Discord como código alcançável e inclui os módulos necessários. Nenhuma mudança de configuração é necessária. Nenhuma atualização nas definições dos agentes. O painel de status do bot exibe o estado "running" em vez de um erro de importação.

Por trás dessa afirmação simples existe uma lição mais ampla que os mantenedores aplicaram de imediato. Imports lazy são uma técnica de performance que ferramentas de autoria precisam respeitar, mas sobre a qual ferramentas de empacotamento precisam ser informadas explicitamente. O import oculto sempre foi arquitetura intencional. A omissão foi uma lacuna de metadados entre o manifesto do pacote e o processo de freezing. A versão 0.67.4 fecha essa lacuna para o adaptador do Discord e estabelece um padrão para toda superfície de mensageria que siga o mesmo design de lazy-load.

## O que fazer agora

Se você está rodando o aplicativo instalado da versão 0.67.3, baixe a atualização 0.67.4 da página de releases. O app empacotado é assinado da mesma forma e instala por cima da versão existente. Após a atualização, reinicie qualquer configuração de bot do Discord. O status muda para "running" sem passos adicionais.

Se você constrói agentes a partir do fonte e nunca usou o app empacotado, nada muda. O pacote instalado via pip já incluía o extra de mensageria quando instalado com a flag padrão `[all]`. Este release afeta apenas o aplicativo desktop empacotado.

Para a lista completa de mudanças neste release, veja [Chimera Agent v0.67.4](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.67.4).
