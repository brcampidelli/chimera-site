---
title: "Chimera 0.70.0: Undo, Design e Controle do Editor"
date: 2026-10-19
category: update
summary: "O chat no terminal ganha undo e planejamento com qualidade de desktop, o Editor recebe diffs que enxergam o git e pré-visualização de arquivos, e o Chimera Design adiciona exportação, canvas e ferramenta para agentes."
version: "0.70.0"
---

## O terminal deixa de ser um cliente de segunda classe

Antes desta versão, `chimera chat` e `chimera assist` operavam com um conjunto de proteções mais limitado que o desktop. O contexto crescia até bater no limite, planos não eram exibidos antes da execução e desfazer um turno significava confiar em um caminho de restauração mais simples. Essa lacuna agora está fechada.

Sessões no terminal compactam o contexto por padrão usando a mesma política do desktop. Se quiser o comportamento antigo, `--no-compact` desabilita. `/plan <tarefa>` agora mostra o plano primeiro e executa a tarefa somente após aprovação. Aprovar um plano não pré-aprova ações arriscadas. `/undo N` lista os arquivos alterados nos últimos N turnos, pede confirmação e restaura através do mesmo armazenamento durável que a tela de Code usa. Arquivos que você editou após o turno alvo não são tocados. Um simples `/undo` ainda reverte o último turno.

O desktop também ganha uma linha do tempo de reversão no cabeçalho da conversa. Cada ponto salvo mostra o horário e quantos arquivos foram alterados. Selecionar um mostra exatamente quais arquivos seriam restaurados e quais seriam ignorados porque você os editou depois. A restauração em si pode ser refeita a partir da mesma linha do tempo. Turnos sem cópia salva aparecem desabilitados com o motivo. Nem a pré-visualização nem a rota de restauração são expostas na bridge do desktop, então nenhum dispositivo pareado ou cliente externo pode disparar uma restauração.

## O Editor agora reflete o que o git vê

A árvore de arquivos antes fornecia uma lista de nomes. Agora ela marca arquivos modificados, adicionados e não rastreados com uma letra, e pastas com um ponto, usando o mesmo status do git do card Changes. O status é atualizado após salvar e quando um turno do agente termina. Ctrl+P abre um arquivo pelo nome. Arquivos HTML ganham um toggle de Preview no mesmo sandbox que a tela de Code usa, incluindo edições não salvas. Fechar uma aba com alterações não salvas pergunta se você quer continuar editando, fechar sem salvar ou salvar e fechar.

Ações baseadas em seleção mudam como você pede ajuda com código. Selecione linhas e pressione Ctrl/⌘+L para enviá-las para a conversa de Code como um item de contexto, o mesmo caminho de uma menção com `@`. Ctrl/⌘+I adiciona `propose_change`, que o servidor executa em modo somente leitura com um arquivo e intervalo de linhas. A proposta retorna como um diff inline com Accept e Reject. Accept salva através do Editor. Se as linhas mudarem antes de você responder, a proposta desaparece. Um arquivo que muda em disco enquanto está aberto é mantido com seu diff e permanece somente leitura até você escolher Keep ou Undo.

O compositor de Code agora suporta menções `@` para arquivos, pastas, designs e conversas recentes. Um arquivo de até 8.000 caracteres é anexado inline, sanitizado, delimitado como dado e registrado no ledger como leitura. Arquivos maiores e pastas são passados pelo caminho para o agente ler. Caminhos absolutos e `..` são recusados antes do turno executar. Symlinks para fora do projeto e o `.env` do próprio Chimera são recusados quando resolvidos. Convidados em links de compartilhamento não podem mencionar designs ou conversas.

## Chimera Design ganha exportação, canvas e uma ferramenta

Chimera Design agora exporta para PDF, PNG e PPTX. PDF é a página estática renderizada pelo Chromium do Playwright, uma página por prancheta, com JavaScript desligado e requisições não-`data:` abortadas. PNG produz uma imagem por prancheta ou um zip. PPTX posiciona cada elemento em seu frame em um slide por prancheta. Quando Chromium ou python-pptx estão ausentes, a exportação recusa e informa o que instalar. Nada é baixado automaticamente.

O canvas abre no slot central da tela de Code, com a conversa à esquerda e o canvas à direita. Ele salva automaticamente pela rota de operações com um estado visível. Edições manuais e do agente compartilham um histórico de undo. Um turno que pede um design mostra uma ação "Open in Chimera Design". Ao lado do canvas você pode propor a partir de um briefing, refinar uma seleção, auditar, editar tokens, checar o design contra eles, comentar por elemento, restaurar versões e exportar para HTML. Restore e export pedem confirmação primeiro.

A ferramenta `design` é oferecida apenas quando um turno pede um design visual. Um detector determinístico cobre português, inglês e espanhol, com acentos normalizados e palavras inteiras casadas. Sentidos de código como "design pattern" ou "system design" nunca disparam. A ferramenta obedece a postura, nunca envia HTML para um bot, marca sua saída como não confiável e fica fora de turnos de convidados. `CHIMERA_TOOL_DENYLIST=design` a remove.

## O que fazer agora

Atualize para 0.70.0 e abra uma sessão no terminal: execute `/plan` antes de uma tarefa arriscada, depois `/undo N` após uma. No Editor, selecione um bloco e pressione Ctrl/⌘+I para ver uma mudança proposta como diff. Para trabalho de design, abra o canvas a partir de um turno que peça um design visual e exporte de lá. Notas completas da versão: [Chimera Agent v0.70.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.70.0).
