---
title: "Chimera Agent 0.89.0: ferramentas SSH, ações em lote e estado que persiste"
date: 2026-11-13
category: update
summary: "Ferramentas de arquivo agora rodam no host SSH, comandos sobrevivem a quedas de conexão, ações em lote para pastas e conversas chegam, e a escolha \"Planejar primeiro\" persiste entre recarregamentos."
version: "0.89.0"
---

## O que você define, fica definido

Antes desta versão, a opção "Plan first" no compositor de Código era uma preferência apenas da sessão. Você podia mudar para Sempre ou Nunca, mas recarregar a janela a redefinia para Automático. Isso significava que cada retorno a uma conversa exigia reconfigurar o modo que você já havia decidido. A configuração agora é lembrada por conversa. Uma nova conversa herda a última escolha que você fez, e um plano aguardando aprovação — junto com seu card — sobrevive a um recarregamento. O teste que garante esse comportamento confirma que o card retorna, então você não perde mais um plano pendente porque a aba foi atualizada.

A busca de configurações tinha um ponto cego de outro tipo. O card de Ambientes ficava na aba Geral, mas buscar por "WSL", "SSH" ou "ambiente" não retornava nada. O card estava presente, mas inacessível pelo campo de busca. Isso foi corrigido. Digitar qualquer um desses termos agora lista o card de Ambientes e os hosts SSH permitidos, e abrir um resultado rola diretamente até ele. Se você gerencia múltiplos ambientes remotos, agora pode encontrá-los da mesma forma que encontra todo o resto.

## Ferramentas de arquivo cruzam a fronteira SSH

Conversas SSH anteriormente recusavam operações de arquivo. Ler, escrever, editar, aplicar patches, listar, grep e glob paravam na fronteira local. Essa restrição acabou. Em uma conversa SSH, essas ferramentas agora atuam na pasta remota. A implementação adiciona várias proteções, porque uma ferramenta que escreve em um host remoto é uma ferramenta que pode causar danos.

Caminhos não podem sair da pasta da conversa. A verificação é léxica e confirmada pelo `realpath` do próprio host, então um link simbólico não consegue escapar. Arquivos de credenciais — `.ssh`, `.env`, chaves e configurações de nuvem — são recusados de imediato. Uma escrita só é substituída após seu tamanho e hash serem verificados no host, o que impede sobrescrever um arquivo que mudou desde sua última leitura. O card Manual mostra o diff do arquivo remoto e nomeia o host, para que você saiba exatamente o que mudou e onde. Quando um turno lê conteúdo externo e então escreve em um hook do git, arquivo de inicialização de shell, cron ou unidade systemd, o Chimera pergunta primeiro. O que o host retorna conta como conteúdo externo, então o prompt aparece quando o risco é real.

Comandos no host SSH agora sobrevivem a uma queda de conexão. Cada comando é executado desacoplado sob seu próprio ID de execução. Se o link cair, o Chimera reconecta e retoma a leitura da saída sem reiniciar o comando. Um script que chega incompleto nunca é executado. Um timeout ou Stop encerra todo o grupo de processos. Se o Chimera fechar no meio de um comando, o comando continua rodando e a conversa que o iniciou é informada sobre onde sua saída está. Você pode reconectar e retomar o log sem ter que adivinhar se o comando terminou ou rodou duas vezes.

## Aja em vários itens de uma vez

Gerenciar pastas e conversas uma a uma era a única opção. O card Pastas nas Configurações e a barra lateral de Código agora têm caixas de seleção, um "Selecionar todos" tri-estado e uma barra de ações. Para pastas, você pode fixar, desafixar, permitir ou revogar comandos, remover das listas ou mostrar novamente. Para conversas, você pode arquivar, desarquivar, deletar ou remover suas pastas das listas.

O modo de seleção desenha cada linha para que nada fora da tela seja afetado por acidente. Deletar pede confirmação primeiro e mostra a contagem. Permitir comandos em lote também pede confirmação primeiro. Uma falha é contabilizada sem interromper o resto, então um único item problemático não bloqueia a operação em todo o resto que você selecionou.

Atualize com `pip install --upgrade chimera-agent`. As notas completas estão em [Chimera Agent v0.89.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.89.0).
