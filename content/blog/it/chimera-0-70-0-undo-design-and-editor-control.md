---
title: "Chimera 0.70.0: Undo, Design e Controle do Editor"
date: 2026-10-19
category: update
summary: "O chat no terminal ganha undo e planejamento de nível desktop, o Editor ganha diffs cientes de git e pré-visualização de arquivos, e o Chimera Design ganha exportação, canvas e ferramenta para agentes."
version: "0.70.0"
---

## O terminal deixa de ser um cliente de segunda classe

Antes desta versão, `chimera chat` e `chimera assist` operavam com um conjunto de salvaguardas mais restrito que o desktop. O contexto crescia até atingir um limite, os planos não eram exibidos antes da execução e desfazer um turno significava confiar em um caminho de restauração mais simples. Essa lacuna agora está fechada.

As sessões de terminal compactam o contexto por padrão usando a mesma política do desktop. Se você quiser o comportamento antigo, `--no-compact` desativa. `/plan <task>` agora mostra o plano primeiro e executa a tarefa somente após aprovação. Aprovar um plano não pré-aprova ações arriscadas. `/undo N` lista os arquivos tocados nos últimos N turnos, pede confirmação e restaura através do mesmo armazenamento durável que a tela de Código usa. Arquivos que você editou após o turno alvo são deixados intactos. `/undo` simples ainda reverte o último turno.

O desktop também ganha uma linha do tempo de retrocesso no cabeçalho da conversa. Cada ponto salvo mostra a hora e quantos arquivos tocou. Selecionar um mostra exatamente quais arquivos seriam restaurados e quais seriam ignorados porque você os editou depois. A restauração em si pode ser refeita a partir da mesma linha do tempo. Turnos sem cópia salva aparecem desabilitados com o motivo. Nem a pré-visualização nem a rota de restauração são expostas na ponte do desktop, então nenhum dispositivo pareado ou cliente externo pode disparar uma restauração.

## O Editor agora reflete o que o git vê

A árvore de arquivos anteriormente dava uma lista de nomes. Agora marca arquivos modificados, adicionados e não rastreados com uma letra, e pastas com um ponto, usando o mesmo status do git que o cartão de Mudanças. O status é atualizado após salvar e quando um turno do agente termina. Ctrl+P abre um arquivo pelo nome. Arquivos HTML ganham um botão de Pré-visualização no mesmo sandbox que a tela de Código usa, incluindo edições não salvas. Fechar uma aba com alterações não salvas pergunta se deseja continuar editando, fechar sem salvar ou salvar e fechar.

Ações baseadas em seleção mudam como você pede ajuda com código. Selecione linhas e pressione Ctrl/⌘+L para enviá-las à conversa de Código como um item de contexto, o mesmo caminho que uma menção `@`. Ctrl/⌘+I adiciona `propose_change`, que o servidor executa somente leitura com um arquivo e intervalo de linhas. A proposta retorna como um diff inline com Aceitar e Rejeitar. Aceitar salva através do Editor. Se as linhas mudarem antes de você responder, a proposta desaparece. Um arquivo que muda no disco enquanto aberto é mantido com seu diff e permanece somente leitura até você escolher Manter ou Desfazer.

O compositor de Código agora suporta menções `@` para arquivos, pastas, designs e conversas recentes. Um arquivo de até 8.000 caracteres é anexado inline, sanitizado, cercado como dados e registrado no ledger como uma leitura. Arquivos maiores e pastas vão por caminho para o agente ler. Caminhos absolutos e `..` são recusados antes do turno executar. Symlinks para fora do projeto e o `.env` do próprio Chimera são recusados quando resolvidos. Convidados em links de compartilhamento não podem mencionar designs ou conversas.

## Chimera Design ganha exportação, canvas e uma ferramenta

Chimera Design agora exporta para PDF, PNG e PPTX. PDF é a página estática impressa pelo Chromium do Playwright, uma página por prancheta, com JavaScript desligado e requisições não-`data:` abortadas. PNG produz uma imagem por prancheta ou um zip. PPTX coloca cada elemento em seu quadro em um slide por prancheta. Quando Chromium ou python-pptx está faltando, a exportação recusa e diz o que instalar. Nada é baixado automaticamente.

O canvas abre no slot central da tela de Código, com a conversa à esquerda e o canvas à direita. Ele salva automaticamente através da rota de operações com um estado visível. Edições manuais e do agente compartilham um histórico de desfazer. Um turno que pede um design mostra uma ação "Abrir no Chimera Design". Ao lado do canvas você pode propor a partir de um briefing, refinar uma seleção, auditar, editar tokens, verificar o design contra eles, comentar por elemento, restaurar versões e exportar para HTML. Restaurar e exportar pedem confirmação primeiro.

A ferramenta `design` é oferecida somente quando um turno pede um design visual. Um detector determinístico cobre português, inglês e espanhol, com acentos dobrados e palavras inteiras correspondidas. Sentidos de código como "design pattern" ou "system design" nunca disparam. A ferramenta obedece à postura, nunca envia HTML para um bot, marca sua saída como não confiável e fica fora de turnos de convidados. `CHIMERA_TOOL_DENYLIST=design` a remove.

## O que fazer agora

Atualize para 0.70.0 e abra uma sessão de terminal: execute `/plan` antes de uma tarefa arriscada, depois `/undo N` após uma. No Editor, selecione um bloco e pressione Ctrl/⌘+I para ver uma mudança proposta como diff. Para trabalho de design, abra o canvas a partir de um turno que peça um design visual e exporte a partir daí. Notas de versão completas: [Chimera Agent v0.70.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.70.0).
