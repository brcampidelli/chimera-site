---
title: "Chimera 0.91.0: Esforço por role, alertas de cache e segurança para convidados"
date: 2026-11-17
category: update
summary: "O esforço de raciocínio agora é por role, o cache de prompt avisa quando degrada, convidados não veem mais ferramentas internas e governance passa a usar observe em novas instalações."
version: "0.91.0"
---

## Esforço de raciocínio vai para o nível de role

Antes desta versão, definir um esforço de raciocínio no arquivo de agente aplicava um valor genérico que era fácil de interpretar errado. O campo `effort` do arquivo de agente agora controla apenas as chamadas do próprio subagente. Os roles de código e o fusion cast recebem seu esforço de uma nova variável de ambiente, `CHIMERA_ROLE_EFFORTS`, que define o esforço por role, e não por agente. O arquivo de agente de um repositório não pode aumentar o esforço escolhido pelo dono, então um agente baixado não consegue queimar tokens de raciocínio silenciosamente além do pretendido.

Isso importa porque esforço é uma alavanca de custo. Esforço alto num role de sumarização desperdiça dinheiro; esforço baixo num role de planejamento gera planos frágeis. O modelo anterior, plano, forçava uma troca que não correspondia a como os roles de fato consomem raciocínio. Agora você define esforço onde ele se aplica, e o sistema recusa sobrescritas que o aumentariam.

## O cache de prompt avisa quando para de funcionar

Cache de prompt só economiza dinheiro quando realmente acerta. Antes, uma conversa podia derivar para território de baixa taxa de cache hit sem sinal algum. Você notaria o custo depois, numa planilha. Agora, quando a proporção de tokens de prompt lidos do cache cai abaixo de 80% nos turnos cuja rota reporta cache, o recibo do turno e a barra de status avisam uma vez, com a causa principal. O alerta se rearma quando o cache se recupera e degrada de novo. Rotas que nunca reportam cache não geram aviso, então você não é incomodado por algo que nunca se esperou que fizesse cache.

O Worth também ganha um número de custo por execução resolvida. Ele mostra o custo total de todas as execuções dividido pelas que passaram, o mesmo por execução confirmada por verificador, e a parcela de execuções com preço conhecido. Quando alguma execução não tem preço, o Worth mostra um traço em vez de um número enganoso. A tabela segue ordenada por nome, não ranqueada, porque o Worth é um diagnóstico, não um leaderboard.

## Convidados veem respostas, não funcionamento interno

Uma conversa compartilhada antes vazava os argumentos de ferramenta do dono, diffs de edição, prévias de aprovação, screenshots de navegador, saída de verificador, fontes de instrução, recibos de custo e caminhos de host. Um convidado assistindo ao vivo, reproduzindo ou inspecionando o contexto do modelo podia reconstruir muito mais do que as respostas. Esse buraco está fechado. Convidados agora recebem apenas as respostas e os nomes e status das ferramentas, através de uma allowlist que descarta qualquer tipo de frame que não reconheça. O funcionamento interno do dono permanece na tela do dono.

## Governance usa observe como padrão em novas pastas de dados

Uma instalação nova agora começa com governance em modo `observe`, registrado em `governance_default.json`. Sob `observe`, os bloqueios rígidos fixos do kernel recusam comandos como `rm -rf /`, `mkfs` ou curl pipeado para um shell. O que `enforce` enviaria para revisão é registrado, não perguntado. Uma pasta de dados existente mantém `off` e recebe um aviso no log e uma nota dispensável em Configurações. Um `CHIMERA_GOVERNANCE` explícito ainda prevalece, e um vazio conta como não definido. Isso significa que uma instalação nova já vem travada desde a primeira execução, sem exigir que a pessoa configurando leia uma página de segurança separada.

## Jobs agendados ganham modelo, esforço e orçamento de passos próprios

Um job cron agora pode definir seu próprio modelo, esforço e orçamento de passos via `cron add/edit --model --effort --max-steps` ou pela tela de Agendamento. Valores vazios herdam do `serve`, como antes. Valores inválidos são recusados ao salvar; um `jobs.json` editado à mão com valores ruins os carrega com um aviso em vez de descartar o job silenciosamente. A última resposta entregue pelo job, até 2 KB, fecha seu contexto para que ele pare de se repetir entre invocações. Uma entrega que o destino recusou conta para o freio de falha e nunca é tratada como entregue. Jobs webhook que nomeiem esses campos são recusados, porque um webhook carrega sua própria configuração.

## O que fazer agora

Atualize com `pip install chimera-agent --upgrade` e reinicie seu servidor. Se você define esforço de raciocínio em arquivos de agente, mova esses valores para `CHIMERA_ROLE_EFFORTS` e defina o `effort` do arquivo de agente apenas para chamadas de subagente. Verifique suas conversas compartilhadas: convidados não verão mais frames internos, e você não precisa mudar nada para obter essa proteção. Novas instalações recebem governance `observe` por padrão; pastas existentes permanecem como estão a menos que você defina `CHIMERA_GOVERNANCE` explicitamente. Notas completas em [Chimera Agent v0.91.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.91.0).
