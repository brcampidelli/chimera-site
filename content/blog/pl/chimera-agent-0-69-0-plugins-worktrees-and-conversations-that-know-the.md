---
title: "Chimera Agent 0.69.0: plugins, worktrees e conversas que sabem de qual repositório são"
date: 2026-10-18
category: update
summary: "Plugins do Claude Code chegam como dados inspecionáveis, cada conversa registra seu repositório e branch, e a barra lateral finalmente agrupa worktrees sob um único projeto."
version: "0.69.0"
---

## Plugins como dados, não como código em execução

Antes desta versão, um plugin era um diretório opaco que você entregava ao Chimera e torcia para funcionar. O framework não tinha vocabulário para descrever o que um plugin continha até executá-lo, e não havia como inspecioná-lo sem rodá-lo. Essa lacuna tornava os plugins arriscados em ambientes compartilhados e impossíveis de avaliar antes da instalação.

`chimera.plugins` muda o modelo completamente. Ele lê um diretório de plugin — seu manifesto, skills, comandos, agentes, hooks, servidores MCP e LSP — e classifica cada componente pelo que faria se executado: instruções somente texto, início de processo local, acesso à rede ou execução de comando. Nada é instalado, importado, executado ou baixado durante essa inspeção. Apenas fontes fixadas (pinned) são consideradas instaláveis: um caminho local, um repositório GitHub fixado em um SHA de commit ou um arquivo HTTPS com hash sha256. Cada problema carrega um código de erro estável compatível com `claude plugin validate`, para que você possa integrar isso a um hook de pre-commit ou a uma verificação de CI antes que um plugin sequer toque um agente.

A mesma lógica de leitura alimenta a integração com o marketplace. `chimera.plugins` lê um `marketplace.json` e classifica cada plugin listado pela sua superfície de capacidade. Entradas que não possuem um pin permanecem visíveis com o motivo pelo qual não podem ser instaladas, para que você possa navegar sem baixar acidentalmente algo mutável.

Plugins são instalados desabilitados. `chimera plugin install` os coloca em `<home>/plugins` como pendentes, e nada chega ao agente até você executar `chimera plugin enable`. A habilitação mostra o diff: skills, comandos e agentes aparecem com namespace `plugin:nome` como texto não confiável. Agentes seguem as regras de project-agent; nomes de ferramentas do Claude Code são traduzidos e só podem restringir permissões existentes; os campos `allowed-tools` e `model` no manifesto são ignorados. Uma expansão de comando do plugin marca a execução como contaminada (tainted), e hooks, diretórios `bin/` e monitores permanecem inertes. Servidores MCP são adicionados somente quando você os nomeia explicitamente, através de uma trava de manifesto fixado. Uma atualização que altere o manifesto, hooks, servidores ou ferramentas retém o plugin com o diff exibido. Bots, cron jobs, `serve` e sessões de convidado não recebem plugin algum, a menos que `CHIMERA_UNATTENDED_PLUGINS` o liste explicitamente.

A tela Configurações › Plugins mostra cada plugin instalado com seu status, origem, pin, linha de capacidade e lista de componentes. Descobrir mostra os marketplaces que você adicionou com busca e filtros por categoria e pelo que um plugin executa. A adição aceita um marketplace fixado, uma pasta local ou um `.zip`. Ativar um plugin mostra exatamente o que chegará ao agente e pergunta por cada servidor MCP separadamente. Somente você pode fazer isso: a ponte MCP pode listar, validar e instalar pendentes, mas nunca pode habilitar, remover ou adicionar marketplaces.

## Cada conversa conhece seu repositório

Uma conversa do Code costumava ser um arquivo simples em uma pasta. A relação entre uma conversa e o repositório git ao seu redor era implícita: você sabia em qual projeto estava trabalhando porque abriu a pasta, mas o framework não. Isso tornava impossível automatizar agrupamento, limpeza e raciocínio entre worktrees.

No início de cada turno, a conversa agora registra seu projeto — o checkout principal do repositório — junto com seu branch e se a pasta é o checkout principal, um git worktree ou uma pasta comum. Essa informação é lida diretamente dos arquivos do git, sem executar o git, portanto é rápida e funciona mesmo quando o repositório está em um estado quebrado. O registro sobrevive à remoção do worktree, o que significa que a lista de sessões pode agrupar os worktrees de um repositório sob o próprio repositório.

A barra lateral do Code usa esse agrupamento. Os worktrees de um repositório ficam sob o cabeçalho do repositório — uma seção recolhível com um `+` para uma nova conversa ali, uma contagem de worktrees e um menu para abrir, recolher, renomear, ocultar, excluir e limpar. As linhas mostram o título, branch e horário; cinco por projeto com um link "mostrar mais"; a busca cobre título, branch e projeto; filtros de status aparecem apenas quando possuem contagens. Um interruptor desativa o agrupamento se você preferir a antiga lista plana.

A limpeza de worktrees agora tem seu próprio diálogo. Ele lista cada worktree do repositório com o motivo pelo qual cada um é mantido — checkout principal, em uso, sujo, não mesclado, criado fora do Chimera — pré-visualiza a remoção e remove apenas o que a pré-visualização listou, usando `git worktree remove` sem `--force` e `git branch -d`. Apenas worktrees que o Chimera criou podem ser removidos ali; suas conversas são arquivadas, nunca excluídas. A ponte MCP pode listar, mas nunca podar.

A ponte MCP também ganha a capacidade de abrir uma conversa dentro de um projeto específico. `desktop_send` aceita um parâmetro `project` — um projeto registrado ou um repositório conhecido — e uma opção `worktree: "new"` com um branch opcional. O Chimera cria e possui o worktree ao lado do repositório em `.chimera-worktrees/<repo>/`, nunca na pasta temporária, e a conversa é agrupada sob o projeto. Projetos desconhecidos, caminhos fora do projeto e nomes de branch de execução são recusados. Um novo worktree não herda a concessão de shell do projeto.

Os títulos das conversas agora são legíveis e renomeáveis. O título segue seu próprio nome para ela, depois um título passado pelo chamador, depois o primeiro cabeçalho `#` de um arquivo Markdown que a primeira mensagem cita dentro do workspace, e só então a própria primeira mensagem. Renomeie com o lápis na linha ou F2; um nome vazio retorna ao automático. Nenhum título é gerado por um modelo.

## O que fazer agora

Atualize para a 0.69.0, abra a tela Configurações › Plugins e adicione um marketplace de sua confiança. Inspecione um plugin com `chimera.plugins` antes de instalá-lo. Crie um worktree através da ponte MCP com `worktree: "new"` e veja-o agrupar-se sob seu repositório na barra lateral.

As notas de versão completas estão em [Chimera Agent v0.69.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.69.0).
