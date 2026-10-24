---
title: "Chimera 0.75.0: Override de permissões em um clique no Code composer"
date: 2026-10-24
category: update
summary: "Um interruptor por conversa no Code composer aprova automaticamente chamadas de ferramenta seguras, registra cada decisão e elimina o timeout de cinco minutos para intervenção humana."
version: "0.75.0"
---

## O que muda para você

Até agora, toda chamada de ferramenta que tocasse algo fora da sandbox gerava um cartão de aprovação. Você precisava clicar em cada um. Esse era o contrato: o agente para, você decide, ele continua. O contrato se mantinha mesmo quando você estava iterando um script e o agente precisava rodar o mesmo comando seguro doze vezes seguidas. O atrito não era um bug — era o design. Mas ele tornava a iteração rápida mais lenta do que o necessário.

A versão 0.75.0 adiciona um interruptor ao Code composer com o rótulo "Ignore permissions." Quando você o ativa, o agente aprova automaticamente as chamadas de ferramenta que normalmente gerariam um cartão de aprovação. Ele registra cada decisão que toma em seu nome. O interruptor vale apenas para uma conversa. Ele não persiste ao reiniciar a aplicação. E não toca em nada que envie dados locais para fora: pushes, publicação, pagamentos, mensagens enviadas em seu nome, acesso a segredos e qualquer operação que transmita dados para fora da máquina ainda param e pedem confirmação. A fronteira é explícita. O agente pode se mover mais rápido dentro da fronteira; não pode cruzá-la sem você.

Não é uma configuração global. Não é uma flag de arquivo de configuração. É um botão na tela, e só você pode pressioná-lo. O design mantém o override próximo ao trabalho. Você vê a conversa, sabe o que o agente está fazendo e decide que, para esta sessão, as aprovações repetitivas são ruído. Quando a aplicação reinicia, o ruído volta. Você opta por entrar de novo, deliberadamente.

## Por que o comportamento do timeout mudou

A tela de Code tinha um prazo de cinco minutos para sua resposta. Se você não respondesse a um cartão de aprovação dentro dessa janela, o agente recusava a chamada e a conversa travava. A premissa era que um cartão sem resposta significava uma sessão abandonada. Mas a premissa quebrava em um fluxo de trabalho comum: você pede algo ao agente, alterna para outra janela para checar documentação ou testar uma hipótese e volta seis minutos depois para uma conversa morta. O timeout punia o foco.

A tela de Code agora espera indefinidamente pela sua resposta. O agente permanece pausado até você voltar. O limite de cinco minutos ainda se aplica onde faz sentido — automações que ninguém está observando. Essas mantêm a proteção. Mas quando você está presente, mesmo que se afaste, a conversa não expira mais.

## O que o interruptor não faz

O interruptor "Ignore permissions" não é uma flag de sudo. Ele não eleva privilégios. Não concede acesso a nada que o agente já não pudesse solicitar. Ele apenas remove a exigência de que você aprove manualmente cada solicitação. O agente ainda registra cada chamada aprovada automaticamente. Você pode revisar o que aconteceu depois do fato. O registro está lá se você precisar auditar uma sessão.

As categorias que ainda exigem aprovação explícita são aquelas que movem dados para fora da máquina ou consomem recursos: pushes para remotos, operações de publicação, ações de pagamento, mensagens que carregam sua identidade e qualquer coisa que leia ou transmita segredos ou dados locais para fora. O interruptor respeita essas categorias incondicionalmente. Não há um segundo interruptor para sobrescrever a sobrescrita.

## O que fazer agora

Atualize para a 0.75.0. Abra uma sessão do Code composer onde você espera chamadas de ferramenta repetitivas. Procure pelo interruptor "Ignore permissions" na tela. Ative-o quando os cartões de aprovação se tornarem ruído. Desative-o quando precisar das proteções de volta. Reinicie a aplicação para resetá-lo. Leia a lista completa de mudanças nas [notas de versão][Chimera Agent v0.75.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.75.0).
