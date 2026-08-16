---
title: "Chimera Agent 0.44.0: O Aplicativo de Desktop Agora é um Editor de Código"
date: 2026-08-16
category: update
summary: "O aplicativo desktop do Chimera se transforma de um console para agentes em um editor de código completo, com diagnósticos, autocompletar inline, busca e integração com agentes externos."
version: "0.44.0"
---

## De Console para Editor de Código

O aplicativo desktop do Chimera Agent mudou radicalmente na versão 0.44.0. O que antes era principalmente um console para interagir com agentes agora é um ambiente completo para edição de código. Essa mudança reflete como os usuários realmente trabalham com agentes de IA - não apenas conversando, mas colaborando no desenvolvimento de código.

Sete recursos importantes chegam juntos nesta versão. O editor em `#/edit` usa CodeMirror com abas, histórico de undo por arquivo e avisos quando um agente tenta modificar um arquivo não salvo em que você está trabalhando. Os diagnósticos agora vêm do `ruff server`, garantindo que os avisos sejam os mesmos que falhariam no CI. O editor oferece autocompletar inline com um modelo local, mostrando prévias em cinza que você pode aceitar com Tab ou rejeitar com Escape.

## Melhorias Práticas

A busca agora funciona em todo o workspace, usando ripgrep onde disponível. Você pode ver o uso de recursos do sistema (CPU, memória, VRAM da GPU) e fazer retrieval no seu repositório com benchmarks pré-cadastrados. O executor de comandos mantém histórico por projeto entre recarregamentos, com encerramento adequado da árvore de processos quando você para ou fecha.

Talvez o mais significativo: agora você pode delegar tarefas de codificação para agentes externos como Claude Code ou Gemini CLI. Eles se integram via ACP e passam pelo mesmo processo de verificação e snapshot/revert que as interações nativas. O aplicativo deixa claro quando agentes externos operam sob diferentes limites de segurança - eles podem ignorar os controles de escrita do Chimera, embora o checkpoint/revert permaneça como rede de segurança.

## Começando

A configuração continua simples. Apenas uma chave de provedor é necessária para começar, com capacidades opcionais claramente indicadas. Para diagnósticos no editor, instale o `ruff`. O autocompletar inline precisa do Ollama com o modelo específico `qwen2.5-coder:1.5b-base` (note a tag base - modelos instruct não funcionam bem para isso). Agentes externos exigem suas respectivas CLI tools.

A versão inclui ressalvas honestas: instaladores não assinados acionam avisos de segurança, agentes externos têm limites de segurança diferentes, e o retrieval ainda não está integrado ao fluxo principal do agente. O executor de comandos não é um terminal completo - cada comando roda em um processo novo, então estados como `cd` ou `export` não persistem.

Para detalhes completos, incluindo dois bugs encontrados em cenários não testados, veja o [CHANGELOG][Chimera Agent v0.44.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.44.0). Para testar, atualize sua instalação do Chimera Agent e explore o novo editor em `#/edit`.
