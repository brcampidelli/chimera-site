---
title: "Chimera Agent 0.47.0: Correções para Execuções Monitoradas"
date: 2026-08-22
category: update
summary: "Sete correções abordam relatos incorretos de chamadas de ferramentas recusadas, falhas na avaliação de regras e problemas de integridade de auditoria."
version: "0.47.0"
---

## Execuções Monitoradas Agora Relatam Corretamente

Um problema crítico em execuções monitoradas (flag `--guard`) foi corrigido. Anteriormente, quando uma chamada de ferramenta era recusada por regras de governança, o sistema relatava incorretamente como bem-sucedida. Isso acontecia porque a mensagem de recusa não começava com `error:`, fazendo a verificação de status retornar `True`. Três áreas foram afetadas:

1. A visualização do frame na área de trabalho
2. O log de etapas usado para comprovantes
3. O detector de desvio

Isso fazia com que execuções onde todas as ações perigosas eram bloqueadas aparecessem como bem-sucedidas em todas as saídas estruturadas. O modelo podia até responder com mensagens de confirmação para ações que nunca foram executadas.

## Avaliação de Regras Corrigida para Scripts e Documentos

O motor de regras tinha dois problemas significativos:

1. **Scripts multi-linha burlavam proteção**: Devido à forma como quebras de linha eram escapadas durante interpolação de texto, limites de palavra nas regras eram quebrados. Isso permitia que comandos perigosos passassem se aparecessem após comandos benignos em um script.

2. **Documentos geravam falsos positivos**: Enquanto isso, arquivos Markdown citando comandos perigosos estavam sendo bloqueados indiscriminadamente. A proteção estava efetivamente invertida - ameaças reais eram permitidas enquanto documentação era bloqueada.

Duas regras não eram acionadas em nenhum input. Esses problemas foram corrigidos, com tratamento adequado tanto para execução de scripts quanto para conteúdo de documentos.

## Melhorias em Auditoria e Segurança

Várias correções relacionadas à segurança foram implementadas:

- **Armazenamento de credenciais**: O sistema de auditoria estava armazenando dados sensíveis que deveria detectar. Quando uma operação governada `write_file` era bloqueada, o conteúdo do arquivo ainda aparecia em `audit.jsonl`. Agora há duas camadas: a auditoria redige dados sensíveis (usando capacidades existentes), e argumentos em formato de documento são registrados apenas por tamanho.

- **Integridade da cadeia de auditoria**: A tela de Segurança às vezes reportava falsamente adulteração quando nenhuma modificação ocorria. Isso acontecia quando múltiplos escritores retomavam cadeias de hash de snapshots diferentes, criando números de sequência duplicados. A verificação agora funciona corretamente.

- **Correções no modo observação**: O modo `observe` estava na verdade aplicando regras que prometia apenas medir. BLOCKs agora retornam corretamente antes de consulta de aprovador, e recusas são contabilizadas corretamente nas métricas.

## Visibilidade e Confiabilidade do Kernel

O kernel de confiança não estava sendo servido via HTTP, significando que seus vereditos não alcançavam consumidores da API. Agora está corretamente instalado para todos endpoints quando `CHIMERA_GOVERNANCE` está definido como `observe` ou `enforce`. Outras correções de confiabilidade incluem:

- Tratamento adequado de timeouts de workers
- Distinção entre falhas de tarefa vs. expirações
- Configuração de limites de container
- Recuperação automática de backend

## Limitações Conhecidas

A atualização resolve vários problemas mas deixa algumas lacunas conhecidas:

1. Relatórios de `observe` ainda não aparecem em interfaces HTTP
2. A API não tem um caminho de aprovação no modo `enforce`
3. Quatro endpoints HTTP ainda não têm integração com o kernel

Esses pontos estão documentados no README em vez de serem deixados como problemas ocultos.

Atualize agora com `pip install --upgrade chimera-agent` ou através do seu gerenciador de pacotes preferido. Para detalhes completos, consulte as [notas de release][Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0).
