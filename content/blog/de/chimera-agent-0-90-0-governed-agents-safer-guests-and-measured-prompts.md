---
title: "Chimera Agent 0.90.0: Agentes Governados, Convidados Mais Seguros e Prompts Medidos"
date: 2026-11-16
category: update
summary: "Esta versão adiciona controles de governança aos agentes, restringe o acesso de convidados, mede alterações de prompt com uma linha de base de tokens e corrige a precisão de custos, a recuperação de memória e vazamentos de credenciais."
version: "0.90.0"
---

## O que o agente agora tem permissão para fazer

Antes desta versão, o `chimera agent` executava com um conjunto fixo de hooks e permissões de ferramentas. Se você quisesse saber o que a governança teria decidido sobre suas ações, precisava adivinhar. O novo comando `chimera report governance` muda isso. Ele contabiliza, por superfície e ao longo de um número configurável de dias, o que a governança concedeu, recusou, escalou para revisão ou reteve. No modo `observe`, ele também mostra o que o `enforce` teria recusado ou enviado para um aprovador. Isso oferece um ensaio de uma política mais rigorosa antes de você ativá-la.

O próprio `chimera agent` agora executa sobre o mesmo conjunto governado que chat, assist e tui. Seus hooks vêm do projeto em que trabalha, e `--deny-tools` alcança ferramentas MCP diferidas. O agente não opera mais fora do framework de governança que o resto da aplicação utiliza.

O modelo de segurança também ficou mais rígido para conversas compartilhadas. Um turno de convidado acessado por um link de compartilhamento podia anteriormente alcançar outras conversas do proprietário, caixa de entrada, calendário, pacotes de habilidades, servidores MCP, instruções globais, hooks, logins de navegador e jobs de outras conversas. Ele tinha um shell e podia executar qualquer coisa que pudesse ter editado, incluindo verificadores, formatadores, hooks e comandos git. Agora ele executa com o privilégio mínimo. Não pode ler ou escrever fora da pasta da conversa ou dentro dos dados do próprio Chimera, mesmo através de symlinks, junções ou importações de instruções. Gráficos renderizados em PNG e SVG recusam URLs de dados remotos, e snapshots não seguem mais links para fora do workspace.

## O que mudou na forma como prompts são construídos e medidos

Descrições de ferramentas MCP agora podem ser cortadas para uma linha por servidor. Definir `"description_mode": "one_line"` em `mcp.json` mostra ao modelo uma linha de cada descrição de ferramenta e serve o restante através de uma chamada cercada `mcp_describe` que honra as listas de permissão e negação da sessão, inclusive através dos wrappers de ledger e governança. Isso é opcional. O padrão permanece com descrições completas porque uma execução pareada pré-registrada de 540 iterações mediu o corte em -24,4 pontos percentuais na seleção de ferramenta na primeira chamada, com um intervalo de confiança de [-31,7, -16,2]. Em tarefas cuja resposta está na parte final da descrição, a escolha é um cara ou coroa. O que o corte proporciona também foi medido: tentativas de ações proibidas caíram 16,7 pontos percentuais, de 27,5% para 10,8%, todas oriundas de cargas na parte final da descrição de uma ferramenta. Falsos positivos benignos não foram inferiores, com ressalvas.

Uma linha de base de tokens e custo agora está disponível. `scripts/token_baseline.py` lê os logs de uso, execução e rastreamento sob o diretório home do desktop e imprime apenas agregados por superfície, com cobertura de preço e cache e um piso de 30 turnos abaixo do qual apenas a contagem é exibida. Seus totais correspondem à tela de Custo sobre as mesmas linhas. O diretório `bench/token_baseline/` contém o pré-registro e a primeira leitura. Isso significa que você pode rastrear mudanças de custo de prompt entre versões sem depender de memória ou medições ad-hoc.

Snapshots de schema de ferramentas agora são mantidos por superfície. `tests/prompt_snapshots/schema.<superfície>.txt` contém o schema de ferramentas que o turno de Código, turno de Design, CLI, cron e bot enviam, montado pelas funções próprias de cada superfície. Uma descrição de ferramenta alterada aparece como um diff. O lint de prompt totaliza isso por superfície, e `docs/tool-schema-by-surface.md` tabula com uma contagem estimada de tokens. Isso torna as mudanças de prompt visíveis na revisão de código.

## O que estava quebrado e agora está corrigido

A recuperação de memória anteriormente descartava fatos escritos em russo, chinês ou japonês. O gate de admissão usava um divisor de palavras apenas ASCII, então um fato que a recuperação havia acabado de encontrar era descartado como irrelevante sem qualquer mensagem. Agora ele lê texto da mesma forma que a recuperação faz, e o índice de busca de código segue o mesmo padrão.

Os números de custo agora são consistentes em toda a aplicação. A tela de Custo mostrava uma taxa de acerto de cache limitada a 50%. O limite de gasto diário não contabilizava execuções autônomas de `solve` e o blog writer da mesma forma que a tela fazia. Apenas um daemon cron executa por home agora, então um job agendado não dispara mais duas vezes quando o app e `chimera serve --cron` estão ambos abertos.

Links em uma resposta não podem mais carregar as credenciais do app para fora. A janela do desktop permanece em suas próprias páginas, e outros sites abrem no seu navegador. Os tokens de acesso que ela possui são fornecidos apenas ao próprio app, nunca a um site para o qual são enviados ou ao dev-server e pré-visualizações de Design dentro dele.

Credenciais coladas não ficam mais em arquivos de sessão de chat. Transcrições de chat são mascaradas em disco. Escritas de outra origem são recusadas quando nenhum token de servidor está definido. Os uploads de anexo e ditado recebem a mesma verificação de origem que uploads de habilidades. Um cabeçalho bearer não-ASCII agora recebe um 401 em vez de um 500.

O cartão de Armazenamento listava anteriormente apenas worktrees na pasta temporária do sistema, omitindo a pasta durável do projeto. Em uma máquina, isso significou que 89 checkouts e 72,9 GiB não foram contabilizados. Agora ele os lista com tamanho, idade e a razão pela qual cada um ainda existe, alerta acima de um limite configurável (`CHIMERA_WORKTREE_LIMIT_GB`, padrão 50) e oferece arquivar conversas inativas por um número configurável de dias (`CHIMERA_WORKTREE_IDLE_DAYS`, padrão 14) através da rota de arquivamento existente. Nada é deletado automaticamente.

Uma nova tentativa após uma verificação falha agora realmente escala. Ela aumenta o esforço de raciocínio e então passa para o próximo modelo único, em vez de reexecutar o mesmo modelo enquanto o recibo alegava fusão. A fusão não une mais nenhum turno que carregue ferramentas, incluindo "fundir este turno". Cada tentativa no recibo registra o modelo e o esforço realmente enviados.

Cada página HTML que o servidor entrega agora carrega uma Content-Security-Policy. As rotas `/redoc` e `/docs/oauth2-redirect` do FastAPI, que eram servidas fora da proteção de token sem política e carregavam um script CDN na origem do app, estão desligadas. `/api/docs` envia uma política nomeando exatamente o que o Swagger carrega. Um `.htm` ou `.xhtml` perdido na raiz do bundle é policiado como `.html`. Um novo teste requisita cada página e enumera cada rota fora da API para que a próxima não possa ser lançada sem uma política.

Atualize com `pip install chimera-agent --upgrade`. As notas de versão completas estão em [Chimera Agent v0.90.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.90.0).
