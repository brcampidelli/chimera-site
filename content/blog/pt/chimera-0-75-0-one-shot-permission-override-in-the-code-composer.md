---
title: "Chimera 0.75.0: Sobrescrita de permissão em um clique no Code composer"
date: 2026-10-24
category: update
summary: "Um interruptor por conversa no Code composer aprova automaticamente chamadas de ferramenta seguras, registra cada decisão e elimina o timeout de cinco minutos para entrada humana."
version: "0.75.0"
---

## O que muda para você

Até agora, toda chamada de ferramenta que tocava algo fora do sandbox gerava um card de aprovação. Você precisava clicar em cada um. Esse era o contrato: o agente para, você decide, ele continua. O contrato se mantinha mesmo quando você estava iterando em um script e o agente precisava rodar o mesmo comando seguro doze vezes seguidas. O atrito não era um bug — era o design. Mas tornava a iteração rápida mais lenta do que o necessário.

A versão 0.75.0 adiciona um interruptor ao Code composer chamado "Ignorar permissões." Quando você o ativa, o agente aprova automaticamente chamadas de ferramenta que normalmente gerariam um card de aprovação. Ele registra cada decisão que toma em seu nome. O interruptor se aplica a apenas uma conversa. Ele não persiste ao reiniciar o aplicativo. E não toca em nada que envie dados locais para fora: pushes, publicaçõees, pagamentoss, mensagens enviadas em seu nome, acesso a secrets e qualquer operaçção que transmita dados para fora da máquina ainda param e perguntam. O limite é explícito. O agente pode se mover mais rápido dentro do limite; não pode cruzá-lo sem você.

Isso não é uma configuração global. Não é um toggle em arquivo de config. É um botão na tela, e só você pode pressioná-lo. O design mantém a sobrescrita próxima ao trabalho. Você vê a conversa, sabe o que o agente está fazendo e decide que, para esta sessão, as aprovações repetitivas são ruído. Quando o aplicativo reinicia, o ruído volta. Você opta por entrar de novo, deliberadamente.

## Por que o comportamento do timeout mudou

A tela de Code tinha um prazo de cinco minutos para sua resposta. Se você não respondesse a um card de aprovação dentro dessa janela, o agente recusava a chamada e a conversa travava. A suposição era que um card sem resposta significava uma sessão desacompanhada. Mas a suposição falhava em um fluxo de trabalho comum: você pede algo ao agente, muda para outra janela para checar documentação ou testar uma hipótese, e volta seis minutos depois para uma conversa morta. O timeout punia o foco.

A tela de Code agora espera indefinidamente por sua resposta. O agente permanece pausado até você retornar. O limite de cinco minutos ainda se aplica onde faz sentido — automações que ninguém monitora. Essas mantêm a proteção. Mas quando você está presente, mesmo que se afaste, a conversa não expira mais em você.

## O que o interruptor não faz
nO interruptor "Ignorar permissões" não é uma flag de sudo. Ele não eleva privilégios. Não concede acesso a nada que o agente já não pudesse solicitar. Ele apenas remove a exigência de que você aprove manualmente cada solicitação. O agente ainda registra cada chamada auto-aprovada. Você pode revisar o que aconteceu depois. O registro está lá se você precisar auditar uma sessão.

As categorias que ainda exigem aprovação explícita são as que movem dados para fora da máquina ou gastam recursos: pushes para remotos, operações de publicação, ações de pagamento, mensagens que carregam sua identidade e qualquer coisa que leia ou transmita secrets ou dados locais para fora. O interruptor respeita essas categorias incondicionalmente. Não há um segundo interruptor para sobrescrever a sobrescrita.

## O que fazer agora

Atualize para a 0.75.0. Abra uma sessão do Code composer onde você espera chamadas de ferramenta repetitivas. Procure o interruptor "Ignorar permissões" na tela. Ative-o quando os cards de aprovação virarem ruído. Desative-o quando precisar das proteções de volta. Reinicie o aplicativo para resetá-lo. Leia a lista completa de mudanças nas [notas de versão][Chimera Agent v0.75.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.75.0).
