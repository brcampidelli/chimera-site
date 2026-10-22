---
title: "Chimera 0.72.0: Seu Chrome, do seu jeito"
date: 2026-10-22
category: update
summary: "Chimera 0.72.0 adiciona confiança por site no navegador, busca opcional no Google e um fluxo de pareamento que mantém a chave do Chrome fora do shell do agente."
version: "0.72.0"
---

## O que muda para seus agentes

Até agora, dar ao Chimera acesso ao seu Chrome significava aceitar uma escolha binária: ou o agente podia agir no navegador, ou não podia. Não havia como dizer "sim neste site, pergunte em todos os outros", nem como deixá-lo buscar no Google sem também abrir a porta para tudo o mais que um navegador pode fazer. A própria extensão também tinha perdido seu popup em uma versão anterior, o que significava que você não podia parar uma execução ou conceder uma permissão por site a partir do próprio navegador.

A versão 0.72.0 substitui essa escolha binária por um modelo de confiança por site. Você lista os sites onde o Chimera pode clicar e digitar sem perguntar, e em todos os outros cada ação mostra um cartão primeiro. A distinção importa porque corresponde a como as pessoas realmente trabalham: você pode confiar em um agente para preencher um formulário no seu painel interno, mas não para mexer no seu provedor de pagamento. A versão mantém esse limite explícito. Comprar, pagar, enviar, excluir, publicar e enviar formulários ainda pedem confirmação mesmo em um site confiável. Senhas, números de cartão, códigos de verificação, frames de pagamento, downloads e uploads são recusados imediatamente. Em um CAPTCHA, o agente para e entrega a aba para você.

A extensão também verifica novamente, logo antes de agir, se o elemento que ela decidiu ainda é aquele em que está prestes a clicar, e se nada o cobre. Essa segunda verificação fecha uma lacuna em que a página poderia mudar entre a decisão do agente e a ação em si.

## A busca no Google vira uma escolha

A busca no Google no seu próprio Chrome agora fica desligada, a menos que você a ative. Com `CHIMERA_BROWSER_GOOGLE=ask`, os turnos no desktop podem buscar no Google em uma aba visível do seu Chrome pareado, e cada busca mostra um cartão primeiro — mesmo que as aprovações estejam definidas para permitir. O ritmo é deliberadamente humano: uma busca a cada 20 segundos, cinco por turno, 30 por dia. Os resultados voltam como títulos, links e trechos, marcados como conteúdo obtido.

O que a versão exclui é tão importante quanto o que inclui. Bots, tarefas agendadas e a ponte MCP nunca recebem a busca no Google. No primeiro CAPTCHA ou página de tráfego incomum, ela para e entrega a aba para você, e não tenta novamente por 30 minutos. Não há disfarce envolvido. O recurso foi projetado para uma pessoa observando seu próprio navegador, não para automação sem supervisão.

## O pareamento não vaza mais a chave

Parear o Chrome agora é um código de seis dígitos da sua tela. Configurações → Navegador mostra um código de uso único, válido por dois minutos com cinco tentativas, que você digita no popup da extensão. A chave então vai para o cofre do sistema operacional, nunca para o ambiente dos comandos que o Chimera executa. Essa é a correção que mais importa para quem executa agentes localmente: apenas o token do servidor, que qualquer processo local pode ler, não dá mais acesso ao Chrome. Alterar a lista de sites confiáveis, parar e desemparelhar exigem a própria tela do aplicativo.

As notas da versão declaram o limite restante claramente: um programa malicioso já em execução como seu usuário do Windows ainda pode pegar a chave. A documentação diz isso. Mas a chave não fica mais no ambiente do shell, onde um comando perdido ou um agente mal escrito poderia lê-la.

Para começar, abra Configurações → Navegador no aplicativo. Ele mostra se a extensão está pareada e conectada, fornece o único comando para registrá-la e permite listar os sites onde o Chimera pode agir sem perguntar. As notas completas da versão estão em [Chimera Agent v0.72.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.72.0).
