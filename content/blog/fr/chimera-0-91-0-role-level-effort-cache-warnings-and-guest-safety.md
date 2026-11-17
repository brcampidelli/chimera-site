---
title: "Chimera 0.91.0: Esforço por função, alertas de cache e segurança para convidados"
date: 2026-11-17
category: update
summary: "O esforço de raciocínio agora é por função, o cache de prompt avisa quando degrada, convidados não veem mais ferramentas internas e a governança padrão em novas instalações é 'observe'."
version: "0.91.0"
---

## Esforço de raciocínio passa para o nível da função

Antes desta versão, definir um esforço de raciocínio no arquivo de agente aplicava um valor geral fácil de interpretar mal. O campo `effort` do arquivo de agente agora controla apenas as chamadas do próprio subagente. As funções de código e o elenco de fusão obtêm seu esforço de uma nova variável de ambiente, `CHIMERA_ROLE_EFFORTS`, que define o esforço por função, e não por agente. O arquivo de agente de um repositório não pode aumentar o esforço escolhido pelo proprietário, então um agente baixado não consegue queimar silenciosamente mais tokens de raciocínio do que o pretendido.

Isso importa porque esforço é uma alavanca de custo. Um esforço alto em uma função de sumarização desperdiça dinheiro; um esforço baixo em uma função de planejamento gera planos frágeis. A configuração plana anterior forçava uma troca que não correspondia a como as funções de fato consomem raciocínio. Agora você define o esforço onde ele se aplica, e o sistema recusa sobrescritas que o aumentariam.

## O cache de prompt avisa quando para de funcionar

O cache de prompt só economiza dinheiro quando realmente acerta. Antes, uma conversa podia derivar para um território de baixa taxa de acerto de cache sem nenhum sinal. Você notaria o custo depois, numa planilha. Agora, quando a proporção de tokens de prompt lidos do cache cai abaixo de 80% nas interações cuja rota reporta cache, o recibo da interação e a barra de status avisam uma vez, com a causa principal. O alerta se rearma quando o cache se recupera e degrada novamente. Rotas que nunca reportam cache não geram aviso, então você não é incomodado por algo que nunca se esperou que fosse cacheado.

O Worth também ganha um número de custo por execução resolvida. Ele mostra o custo total de todas as execuções dividido pelas que passaram, o mesmo por execução confirmada pelo verificador, e a parcela de execuções com preço conhecido. Quando alguma execução não tem preço, o Worth mostra um travessão em vez de um número enganoso. A tabela permanece ordenada por nome, não ranqueada, porque o Worth é um diagnóstico, não uma tabela de classificação.

## Convidados veem respostas, não o funcionamento interno

Uma conversa compartilhada antes vazava os argumentos de ferramenta do proprietário, diffs de edição, prévias de aprovação, capturas de tela do navegador, saída do verificador, fontes de instrução, recibos de custo e caminhos do host. Um convidado assistindo ao vivo, repetindo ou inspecionando o contexto do modelo podia reconstruir muito mais do que as respostas. Essa brecha está fechada. Convidados agora recebem apenas as respostas e os nomes e status das ferramentas, por meio de uma lista de permissões que descarta qualquer tipo de quadro que não reconheça. O funcionamento interno do proprietário permanece na tela do proprietário.

## Governança padrão 'observe' em novas pastas de dados

Uma instalação nova agora começa com governança em modo `observe`, registrada em `governance_default.json`. Sob `observe`, os bloqueios rígidos fixos do kernel recusam comandos como `rm -rf /`, `mkfs`, ou curl pipeado para um shell. O que o modo `enforce` enviaria para revisão é registrado, não perguntado. Uma pasta de dados existente mantém `off` e recebe um aviso no log e uma nota dispensável em Configurações. Um `CHIMERA_GOVERNANCE` explícito ainda prevalece, e um vazio conta como não definido. Isso significa que uma nova instalação já vem travada desde a primeira execução, sem exigir que a pessoa configurando leia uma página de segurança separada.

## Tarefas agendadas ganham modelo, esforço e orçamento de passos próprios

Uma tarefa cron agora pode nomear seu próprio modelo, esforço e orçamento de passos através de `cron add/edit --model --effort --max-steps` ou da tela de Agendamento. Valores vazios herdam do `serve`, como antes. Valores inválidos são recusados ao salvar; um `jobs.json` editado à mão com valores ruins os carrega com um aviso em vez de descartar a tarefa silenciosamente. A última resposta entregue da tarefa, até 2 KB, fecha seu contexto para que ela pare de se repetir entre invocações. Uma entrega que o destino recusou conta para o freio de falha e nunca é tratada como entregue. Tarefas de webhook que nomeiam esses campos são recusadas, porque um webhook carrega sua própria configuração.

## O que fazer agora

Atualize com `pip install chimera-agent --upgrade` e reinicie seu servidor. Se você define esforço de raciocínio em arquivos de agente, mova esses valores para `CHIMERA_ROLE_EFFORTS` e defina o `effort` do arquivo de agente apenas para chamadas de subagente. Verifique suas conversas compartilhadas: convidados não verão mais quadros internos, e você não precisa mudar nada para obter essa proteção. Novas instalações recebem governança `observe` por padrão; pastas existentes permanecem como estão a menos que você defina `CHIMERA_GOVERNANCE` explicitamente. Notas completas em [Chimera Agent v0.91.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.91.0).
