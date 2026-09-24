---
title: "Chimera Agent 0.48.0: Segurança Aprimorada e Padrões Atualizados"
date: 2026-09-02
category: update
summary: "Chimera Agent 0.48.0 traz melhorias significativas em segurança e mudanças nos padrões, focando em isolamento de sandbox e seleção de modelos mais econômicos."
version: "0.48.0"
---

## Isolamento Aprimorado de Sandbox

A configuração padrão da sandbox foi atualizada para priorizar a segurança. Anteriormente, a sandbox `local` não era isolada, dependendo de kernels de governança e prompts de confirmação para proteger sua máquina. Essa abordagem tinha vulnerabilidades, especialmente quando os usuários ignoravam os prompts ou quando instruções eram injetadas. Agora, o padrão é `auto`, que utiliza **Seatbelt** no macOS com um perfil `(deny default)` e **bubblewrap** no Linux com parâmetros de isolamento rigorosos. Isso garante isolamento de rede e restringe gravações ao diretório de trabalho e ao diretório temporário, reduzindo significativamente os riscos potenciais.

## Considerações sobre Windows e Kernel Linux

Para Windows, a atualização deixa claro que nenhum mecanismo de sandbox é fornecido. O token restrito e os filtros de rede existentes não são aproximados, pois a ausência de um limite é menos perigosa do que um limite falsamente acreditado. Da mesma forma, kernels Linux que recusam namespaces de usuário não privilegiados reportarão a sandbox como *indisponível*, garantindo transparência sobre as limitações de segurança.

## Modelo Padrão Mais Econômico

O modelo padrão foi alterado de GPT-5.5 para DeepSeek V3.1. Essa mudança aborda o alto custo associado ao modelo anterior, que era o mais caro do catálogo. DeepSeek V3.1 oferece uma opção mais econômica, custando $0.25/$0.95 por 1 milhão de tokens, em comparação com $5.00/$30.00 do GPT-5.5. A variável de ambiente `CHIMERA_DEFAULT_MODEL` ainda tem precedência, e o seletor de modelos permite alterações por conversa.

## Melhorias Baseadas em Auditoria

Uma auditoria extensa identificou diversas recomendações, com 56% do trabalho focado em infraestrutura em vez de funcionalidades do produto. Esta versão aborda muitos desses problemas, garantindo que o código funcione corretamente e registre com precisão. Correções notáveis incluem o tratamento adequado de ferramentas recusadas, remoção de tarefas cron falhas e proteção de strings que carregam credenciais. Cada correção foi rigorosamente testada revertendo as mudanças e garantindo que os testes capturassem os defeitos.

## Novas Funcionalidades e Aprimoramentos

Novas funcionalidades incluem credenciais armazenadas no keychain do sistema operacional (`chimera secrets`), um mecanismo de aprovação de decisões (`chimera approve`) e turnos de codificação que sobrevivem a quedas de conexão. Além disso, comandos comprovadamente somente leitura não exigem mais confirmação, e servidores MCP podem ser abertos em vez de serem transferidos. Três novos gates no CI aumentam ainda mais a robustez do sistema.

Para um relato detalhado de todas as mudanças, consulte o [CHANGELOG.md][Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0).

[Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0): CHANGELOG.md
