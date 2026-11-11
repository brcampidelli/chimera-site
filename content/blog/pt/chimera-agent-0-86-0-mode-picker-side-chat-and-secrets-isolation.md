---
title: "Chimera Agent 0.86.0: Seletor de Modo, Chat Lateral e Isolamento de Secrets"
date: 2026-11-11
category: update
summary: "Um novo seletor de modo substitui a confusão de posturas, o chat lateral responde sem poluir o histórico, o shell do agente não enxerga mais suas chaves de API e as conversas são arquivadas automaticamente no merge de PRs."
version: "0.86.0"
---

Esta release corrige um problema estrutural que tornava a postura do agente difícil de confiar. Antes da 0.86.0, você definia uma postura em Settings—Manual, Auto ou algo intermediário—e então a bridge, a API e a UI tinham, cada uma, seu próprio jeito de sobrescrevê-la. Você podia acabar com uma conversa rodando em Auto quando achava que estava em Manual porque a bridge mudou sem avisar. O seletor de modo substitui isso por um controle único.

## Um seletor de modo em vez de três mecanismos

O seletor fica abaixo do prompt e abre com Ctrl/Cmd+Shift+M. Ele lista seis modos: Manual, Accept edits, Plan, Auto, Don't ask e Ignore permissions quando o projeto permitir. Cada modo mapeia diretamente para o sistema de postura existente. O modo da conversa é salvo e inicia conforme o que está em Settings—nunca se torna Don't ask, suspicious vira Auto, always vira Manual. Accept edits mostra um card antes de cada comando, a menos que o comando seja somente leitura ou o sandbox o isole. Plan nunca executa com escopo maior que Auto. A bridge só pode mover uma conversa para um modo que não amplia nada, então uma conversa que você travou em Manual permanece lá. Ctrl/Cmd+Shift+O abre o seletor de modelo e Ctrl/Cmd+Shift+E o seletor de esforço; maximise foi movido para Ctrl/Cmd+Shift+Enter.

Isso importa porque a postura era a principal barreira de segurança entre você e o agente, e ela tinha duas backdoors. Agora tem um controle que tudo respeita.

## O shell do agente não herda mais seus secrets

Processos filhos do agente costumavam herdar pools de chaves de provider como `CHIMERA_OPENROUTER_KEYS`, `DATABASE_URL` com senha e credenciais de cloud. Qualquer comando que o agente executasse podia imprimi-los. O app desktop tinha o mesmo problema na direção oposta: ele passava para o backend seu token de servidor, credencial de tela e chave do launcher via variáveis de ambiente, que no Linux permanecem legíveis em `/proc/<pid>/environ` para qualquer processo do mesmo usuário—incluindo o shell do agente.

Ambos os caminhos estão fechados. O shell do agente e o novo terminal agora recebem um ambiente com os secrets removidos por nome e por valor. Configurações de proxy continuam passando. A GitHub CLI mantém o token que precisa. O app desktop agora envia seus secrets para o backend via stdin como uma linha única que é lida e fechada imediatamente; o token do servidor é mantido em memória, e não no ambiente do processo. Uma linha ausente ou malformada para o backend em vez de iniciá-lo sem token, e o app se recusa a usar um backend que responda sem um.

## Chat lateral e cards de tarefa sugerida

O chat lateral (Ctrl/Cmd+;) responde uma pergunta rápida sobre a conversa sem adicionar nada a ela. Ele lê a conversa como dado, responde sem ferramentas e não escreve nada no histórico da conversa. Antes disso, fazer uma pergunta significava poluir o contexto com um turno que o agente depois tentaria executar. "Bring into the conversation" apenas preenche o composer, e quando a conversa leu conteúdo externo, o chat lateral cita a resposta como dado e pede confirmação antes. Seu custo é registrado, modelos locais permanecem gratuitos sob um limite diário, e a ajuda de atalhos foi movida para Ctrl/Cmd+/.

Cards de tarefa sugerida impedem o agente de divagar. Quando ele nota algo fora da tarefa—código morto, um doc desatualizado, um teste faltando, um problema de segurança visto de passagem—ele só pode propor um card. Você vê o prompt completo antes que algo execute e escolhe Start (uma nova conversa no mesmo projeto), Do it here, Options ou Dismiss. Start all pede confirmação e é limitado a cinco. Apenas a tela do owner inicia um card, e um card proposto por um turno que leu conteúdo externo inicia sua conversa marcada como tainted e sem "Ignore permissions", com um aviso no card.

## O que fazer agora

Atualize com `pip install chimera-agent --upgrade` ou baixe a imagem de container mais recente. O seletor de modo, o chat lateral e o terminal estão disponíveis imediatamente. Se você dependia das sobrescrições de postura antigas, verifique o modo de cada conversa após a atualização—o seletor lê seu padrão de Settings, mas conversas existentes podem ter sido movidas pela bridge antes da 0.86.0. O isolamento de secrets é automático; nenhuma mudança de configuração é necessária. Notas completas da release: [Chimera Agent v0.86.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.86.0)
