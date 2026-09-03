---
title: "Chimera Agent 0.48.1: Correções para o Modo de Aprovação, Execução de Tarefas e Mais"
date: 2026-09-03
category: update
summary: "Chimera Agent 0.48.1 resolve problemas críticos no modo de aprovação, execução de tarefas e relatório de custos, garantindo operação mais suave e melhor segurança."
version: "0.48.1"
---

## Modo de Aprovação Agora Funciona Como Planejado

A configuração `CHIMERA_APPROVAL_MODE=allow` agora funciona corretamente em todas as superfícies, incluindo o aplicativo desktop e `chimera serve`. Anteriormente, essa configuração só funcionava em `solve` e `crew`, deixando a maioria dos usuários com recusas inesperadas. Essa correção garante que ferramentas perigosas não sejam mais bloqueadas ao ler conteúdo não confiável, alinhando-se à intenção original da configuração. Benchmarks mostram que, com um aprovador, o sistema bloqueia 85,7% dos ataques enquanto permite todo o trabalho legítimo, uma melhoria significativa em relação à taxa de recusa anterior de 50% para tarefas legítimas.

## Tela Unificada de Execução de Tarefas

A tela de Trabalho foi simplificada para reduzir redundâncias e melhorar a usabilidade. Antes, os usuários precisavam escolher entre quatro formulários diferentes para executar tarefas, cada um exigindo a mesma entrada. Isso causava ineficiência e frustração, pois tentar um método diferente significava redigitar a tarefa. Agora, uma única tela com quatro botões gerencia todos os modos de execução de tarefas, simplificando o processo e reduzindo o número de abas de cinco para quatro. Essa mudança também garante que tarefas e verificações sejam consistentes entre os modos, enquanto tentativas, funções e slots de trabalhadores permanecem específicos para cada modo.

## Principais Correções e Adições

- **Variáveis Vazias Não Travam Mais o App:** Uma variável `CHIMERA_GUARD_CHAT` vazia no arquivo `.env` impedia o aplicativo de iniciar. Isso foi corrigido, com valores vazios agora tratados como não definidos em vez de causar uma falha.
- **Medidor de Custo para Modelos Caros:** O medidor de custo agora relata corretamente os custos para todos os modelos, incluindo os mais caros como `claude-opus-5` e `gpt-5.5`. Antes, esses modelos mostravam custos desconhecidos devido a uma chamada de função ausente.
- **Anel de Foco para Botões:** O componente Button agora adota corretamente o anel de foco compartilhado, corrigindo uma inconsistência visual.

## Nova Funcionalidade: Carregamento Adiado de Ferramentas

A configuração `CHIMERA_DEFER_TOOLS` foi adicionada para reduzir o uso de tokens, adiando o carregamento dos esquemas de ferramentas até que sejam necessários. Benchmarks mostram uma redução de 26% no custo por tarefa concluída, embora o impacto nas taxas de conclusão de tarefas ainda seja inconclusivo. Essa configuração está desativada por padrão devido aos resultados mistos.

## O Que Fazer Agora

Atualize para o Chimera Agent 0.48.1 para aproveitar essas correções e melhorias. Para notas detalhadas da versão, visite [Chimera Agent v0.48.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.1).
