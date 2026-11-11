---
title: "Chimera Agent 0.86.0: Seletor de Modo, Chat Lateral e Isolamento de Segredos"
date: 2026-11-11
category: update
summary: "Um novo seletor de modo substitui a confusão de posturas, o chat lateral responde sem poluir o histórico, o shell do agente não vê mais suas chaves de API e as conversas são arquivadas automaticamente no merge do PR."
version: "0.86.0"
---

Esta versão corrige um problema estrutural que tornava a postura do agente difícil de confiar. Antes da 0.86.0, você definia uma postura nas Configurações — Manual, Auto ou algo intermediário — e então a ponte, a API e a UI tinham, cada uma, sua própria forma de sobrescrevê-la. Você podia acabar com uma conversa rodando em Auto achando que estava em Manual porque a ponte mudou sem avisar. O seletor de modo substitui isso por um controle único.

## Um seletor de modo em vez de três mecanismos

O seletor fica abaixo do prompt e abre com Ctrl/Cmd+Shift+M. Ele lista seis modos: Manual, Aceitar edições, Planejar, Auto, Não perguntar e Ignorar permissões quando o projeto permitir. Cada modo mapeia diretamente para o sistema de postura existente. O modo da conversa é salvo e inicia conforme as Configurações dizem — nunca se torna Não perguntar, suspeito se torna Auto, sempre se torna Manual. Aceitar edições mostra um card antes de cada comando, a menos que o comando seja somente leitura ou o sandbox o isole. Planejar nunca executa de forma mais ampla que o Auto. A ponte só pode mover uma conversa para um modo que não amplie nada, então uma conversa que você travou em Manual permanece lá. Ctrl/Cmd+Shift+O abre o seletor de modelo e Ctrl/Cmd+Shift+E o seletor de esforço; maximizar foi movido para Ctrl/Cmd+Shift+Enter.

Isso importa porque a postura era a principal barreira de segurança entre você e o agente, e ela tinha duas portas dos fundos. Agora tem um controle que tudo respeita.

## O shell do agente não herda mais seus segredos

Processos filhos do agente costumavam herdar pools de chaves de provedor como `CHIMERA_OPENROUTER_KEYS`, `DATABASE_URL` com senha e credenciais de nuvem. Qualquer comando que o agente executasse podia imprimi-los. O app desktop tinha o mesmo problema na direção oposta: ele passava para o backend seu token de servidor, credencial de tela e chave do launcher por meio de variáveis de ambiente, que no Linux permanecem legíveis em `/proc/<pid>/environ` para qualquer processo do mesmo usuário — incluindo o shell do agente.

Ambos os caminhos estão fechados. O shell do agente e o novo terminal agora recebem um ambiente com segredos removidos por nome e por valor. Configurações de proxy ainda são repassadas. A GitHub CLI mantém o token que precisa. O app desktop agora envia seus segredos para o backend via stdin como uma linha única que é lida e fechada imediatamente; o token do servidor é mantido em memória em vez de no ambiente do processo. Uma linha ausente ou malformada para o backend em vez de iniciá-lo sem token, e o app se recusa a usar um backend que responda sem um.

## Chat lateral e cards de tarefa sugerida

O chat lateral (Ctrl/Cmd+;) responde uma pergunta rápida sobre a conversa sem adicionar nada a ela. Ele lê a conversa como dado, responde sem ferramentas e não escreve nada no histórico da conversa. Antes disso, fazer uma pergunta significava poluir o contexto com um turno no qual o agente depois tentaria agir. "Trazer para a conversa" apenas preenche o compositor, e quando a conversa leu conteúdo externo, o chat lateral cita a resposta como dado e pede permissão primeiro. Seu custo é registrado, modelos locais permanecem gratuitos sob um limite diário, e a ajuda de atalhos mudou para Ctrl/Cmd+/.

Cards de tarefa sugerida impedem o agente de divagar. Quando ele percebe algo fora da tarefa — código morto, um documento desatualizado, um teste faltando, um problema de segurança visto de passagem — ele só pode propor um card. Você vê o prompt completo antes que algo execute e escolhe Iniciar (uma nova conversa no mesmo projeto), Fazer aqui, Opções ou Dispensar. Iniciar todos pede confirmação e é limitado a cinco. Apenas a tela do proprietário inicia um card, e um card proposto por um turno que leu conteúdo externo inicia sua conversa marcada como contaminada e sem "Ignorar permissões", com um aviso no card.

## O que fazer agora

Atualize com `pip install chimera-agent --upgrade` ou baixe a imagem de container mais recente. O seletor de modo, chat lateral e terminal estão disponíveis imediatamente. Se você dependia das antigas sobrescritas de postura, verifique o modo de cada conversa após a atualização — o seletor lê seu padrão das Configurações, mas conversas existentes podem ter sido movidas pela ponte antes da 0.86.0. O isolamento de segredos é automático; nenhuma mudança de configuração é necessária. Notas de versão completas: [Chimera Agent v0.86.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.86.0)
