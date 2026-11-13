---
title: "Chimera Agent 0.89.0: ferramentas SSH, ações em lote e estado que persiste"
date: 2026-11-13
category: update
summary: "Ferramentas de arquivo agora rodam no host SSH, comandos sobrevivem a quedas de conexão, ações em lote para pastas e conversas chegam, e a escolha \"Planejar primeiro\" persiste entre recarregamentos."
version: "0.89.0"
---

## O que você define, fica definido

Antes desta release, a opção "Plan first" no compositor de Código era uma preferência apenas da sessão. Você podia mudar para Always ou Never, mas recarregar a janela a redefinia para Auto. Isso significava que cada retorno a uma conversa exigia reconfigurar o modo que você já tinha decidido. A configuração agora é lembrada por conversa. Uma nova conversa herda a última escolha que você fez, e um plano aguardando aprovação — junto com seu card — sobrevive a um recarregamento. O teste que garante esse comportamento confirma que o card retorna, então você não perde mais um plano pendente porque a aba foi atualizada.

A busca de configurações tinha um ponto cego de outro tipo. O card Environments ficava na aba General, mas buscar por "WSL", "SSH" ou "environment" não retornava nada. O card estava presente, mas inalcançável pelo campo de busca. Isso foi corrigido. Digitar qualquer um desses termos agora lista o card Environments e os hosts SSH permitidos, e abrir um resultado rola diretamente até ele. Se você gerencia múltiplos ambientes remotos, agora pode encontrá-los da mesma forma que encontra todo o resto.

## Ferramentas de arquivo cruzam a fronteira SSH

Conversas SSH anteriormente recusavam operações de arquivo. Ler, escrever, editar, aplicar patch, listar, grep e glob paravam na fronteira local. Essa restrição acabou. Em uma conversa SSH, essas ferramentas agora atuam na pasta remota. A implementação adiciona várias proteções, porque uma ferramenta que escreve em um host remoto é uma ferramenta que pode causar danos.

Caminhos não podem sair da pasta da conversa. A verificação é léxica e confirmada pelo `realpath` do próprio host, então um symlink não consegue escapar. Arquivos de credenciais — `.ssh`, `.env`, chaves e configurações de cloud — são recusados de imediato. Uma escrita só é substituída após seu tamanho e hash serem verificados no host, o que evita sobrescrever um arquivo que mudou desde sua última leitura. O card Manual mostra o diff do arquivo remoto e nomeia o host, para que você saiba exatamente o que mudou e onde. Quando um turn lê conteúdo externo e então escreve em um git hook, arquivo de inicialização de shell, cron ou unit do systemd, o Chimera pergunta antes. O que o host retorna conta como conteúdo externo, então o prompt aparece quando o risco é real.

Comandos no host SSH agora sobrevivem a uma queda de conexão. Cada comando roda desacoplado sob seu próprio run ID. Se o link cair, o Chimera reconecta e retoma a leitura da saída sem reiniciar o comando. Um script que chega incompleto nunca é executado. Um timeout ou Stop encerra todo o grupo de processos. Se o Chimera fechar no meio do comando, o comando continua rodando e a conversa que o iniciou é informada sobre onde está sua saída. Você pode reconectar e retomar o log sem ter que adivinhar se o comando terminou ou rodou duas vezes.

## Aja em muitos itens de uma vez

Gerenciar pastas e conversas uma a uma era a única opção. O card Folders em Settings e a barra lateral de Code agora têm checkboxes, um "Selecionar todos" tri-state e uma barra de ações. Para pastas, você pode fixar, desafixar, permitir ou revogar comandos, remover das listas ou mostrar novamente. Para conversas, você pode arquivar, desarquivar, deletar ou remover suas pastas das listas.

O modo de seleção desenha cada linha para que nada fora da tela seja afetado por acidente. Deletar pede confirmação antes e mostra a contagem. Permitir comandos em lote também pede confirmação antes. Uma falha é contabilizada sem interromper as demais, então um único item problemático não bloqueia a operação em todo o resto que você selecionou.

Atualize com `pip install --upgrade chimera-agent`. As notas completas estão em [Chimera Agent v0.89.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.89.0).
