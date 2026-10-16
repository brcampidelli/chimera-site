---
title: "Chimera Agent 0.67.4 corrige bots do Discord no aplicativo desktop empacotado"
date: 2026-10-16
category: update
summary: "O aplicativo desktop instalado não trava mais com erro de módulo ausente ao iniciar um bot do Discord."
version: "0.67.4"
---

O aplicativo desktop empacotado introduzido na versão anterior veio com um contrato quebrado. Se alguém instalasse o aplicativo e o apontasse para um bot do Discord, o painel de status não mostrava um bot em execução. Mostrava um traceback terminando em `ModuleNotFoundError: No module named 'discord'`. A configuração do agente era válida. O token estava correto. A falha estava no próprio empacotamento.

## O que quebrou e por que isso importa

O problema foi uma combinação de duas decisões que não colidiram até a build de release ser executada. Primeiro, os adaptadores de mensageria — incluindo o Discord — foram projetados como imports lazy. O framework não carrega todas as superfícies de chat na inicialização; ele só importa o adaptador quando uma configuração de bot o solicita. Esse design manteve partidas a frio rápidas e o uso de memória baixo, e funcionava em todos os ambientes onde todas as dependências opcionais estavam presentes.

Segundo, a build de release usava um conjunto de dependências enxuto. O extra de mensageria, que carrega as bibliotecas cliente do Discord, foi marcado como opcional e acabou omitido do aplicativo instalado. A análise do PyInstaller percorreu o grafo de imports estaticamente, viu o import lazy escondido atrás de um carregador baseado em string e concluiu que o código do adaptador era morto. O resultado: uma configuração funcional que o runtime não conseguia executar.

Para quem constrói agentes, o impacto era específico. Qualquer bot definido com uma superfície Discord falharia exclusivamente no aplicativo empacotado. O mesmo arquivo de configuração funcionava a partir do código fonte. O mesmo arquivo de configuração funcionava em um container. A inconsistência significava que o aplicativo desktop não era confiável para toda uma classe de agentes, justamente a classe que gera a maior parte do feedback da comunidade.

## A correção e o que ela significa para o empacotamento

A versão 0.67.4 corrige a declaração de dependência para que o extra de mensageria seja empacotado junto com o aplicativo instalado. O PyInstaller agora vê o adaptador do Discord como código alcançável e inclui os módulos necessários. Nenhuma mudança de configuração é necessária. Nenhuma atualização nas definições dos agentes. O painel de status do bot exibe o estado em execução em vez de um erro de importação.

Por trás dessa afirmação simples reside uma lição mais ampla sobre a qual os mantenedores agiram imediatamente. Imports lazy são uma técnica de performance que ferramentas de autoria precisam respeitar, mas sobre a qual ferramentas de empacotamento precisam ser informadas explicitamente. O import oculto sempre foi uma arquitetura intencional. A omissão foi uma lacuna de metadados entre o manifesto do pacote e o processo de freezing. A versão 0.67.4 fecha essa lacuna para o adaptador do Discord e estabelece um padrão para toda superfície de mensageria que siga o mesmo design de lazy-load.

## O que fazer agora

Se você está executando o aplicativo instalado da versão 0.67.3, baixe a atualização 0.67.4 da página de releases. O aplicativo empacotado é assinado da mesma forma e instala sobre a versão existente. Após a atualização, reinicie qualquer configuração de bot do Discord. O status muda para em execução sem passos adicionais.

Se você constrói agentes a partir do código fonte e nunca usou o aplicativo empacotado, nada muda. O pacote instalado via pip já incluía o extra de mensageria quando instalado com a flag padrão `[all]`. Esta versão afeta apenas o aplicativo desktop empacotado.

Para a lista completa de mudanças nesta versão, veja [Chimera Agent v0.67.4](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.67.4).
