---
title: "Chimera 0.72.0: Seu Chrome, do Seu Jeito"
date: 2026-10-22
category: update
summary: "O Chimera 0.72.0 adiciona confiança no navegador por site, busca opcional no Google e um fluxo de pareamento que mantém a chave do Chrome fora do shell do agente."
version: "0.72.0"
---

## O Que Muda Para Seus Agentes

Até agora, dar ao Chimera acesso ao seu Chrome significava aceitar uma escolha binária: ou o agente podia agir no navegador, ou não podia. Não havia como dizer "sim neste site, pergunte em todo o resto", nem como deixá-lo buscar no Google sem também abrir a porta para tudo mais que um navegador pode fazer. A própria extensão também havia perdido seu popup em uma versão anterior, o que significava que você não conseguia parar uma execução ou conceder uma permissão por site a partir do próprio navegador.

A versão 0.72.0 substitui essa lógica binária por um modelo de confiança por site. Você lista os sites onde o Chimera pode clicar e digitar sem perguntar, e em todo o resto, cada ação mostra um card antes. A distinção importa porque corresponde a como as pessoas realmente trabalham: você pode confiar em um agente para preencher um formulário no seu dashboard interno, mas não para mexer no seu provedor de pagamento. O release mantém essa fronteira explícita. Comprar, pagar, enviar, deletar, publicar e submeter formulários ainda perguntam, mesmo em um site confiável. Senhas, números de cartão, códigos de verificação, frames de pagamento, downloads e uploads são recusados de imediato. Em um CAPTCHA, o agente para e passa a aba para você.

A extensão também verifica novamente, logo antes de agir, se o elemento que ela decidiu usar ainda é aquele em que está prestes a clicar, e se nada o está cobrindo. Essa segunda checagem fecha uma brecha onde uma página poderia mudar entre a decisão do agente e a ação em si.

## A Busca no Google Vira uma Escolha

A busca no Google no seu próprio Chrome agora fica desligada, a menos que você a ative. Com `CHIMERA_BROWSER_GOOGLE=ask`, os turnos do desktop podem buscar no Google em uma aba visível do seu Chrome pareado, e cada busca mostra um card antes — mesmo que as aprovações estejam configuradas para permitir. O ritmo é deliberadamente humano: uma busca a cada 20 segundos, cinco por turno, 30 por dia. Os resultados voltam como títulos, links e snippets, marcados como conteúdo obtido.

O que o release exclui é tão importante quanto o que ele inclui. Bots, jobs agendados e a ponte MCP nunca recebem a busca no Google. No primeiro CAPTCHA ou página de tráfego incomum, ele para e passa a aba para você, e não tenta novamente por 30 minutos. Não há disfarce envolvido. A funcionalidade é projetada para uma pessoa observando seu próprio navegador, não para automação desacompanhada.

## O Pareamento Não Vaza Mais a Chave

Parear o Chrome agora é um código de seis dígitos vindo da sua tela. Configurações → Navegador mostra um código de uso único, válido por dois minutos com cinco tentativas, que você digita no popup da extensão. A chave então vai para o cofre do sistema operacional, nunca para o ambiente dos comandos que o Chimera executa. Essa é a correção que mais importa para quem roda agentes localmente: o token do servidor sozinho, que qualquer processo local pode ler, não te dá mais acesso ao Chrome. Alterar a lista de sites confiáveis, parar e desemparelhar exigem a própria tela do aplicativo.

As notas de release declaram a limitação restante claramente: um programa malicioso já rodando como seu usuário do Windows ainda pode pegar a chave. A documentação diz isso. Mas a chave não fica mais no ambiente do shell, onde um comando perdido ou um agente mal escrito poderia lê-la.

Para começar, abra Configurações → Navegador no aplicativo. Ele mostra se a extensão está pareada e conectada, te dá o único comando para registrá-la e permite listar os sites onde o Chimera pode agir sem perguntar. As notas de release completas estão em [Chimera Agent v0.72.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.72.0).
