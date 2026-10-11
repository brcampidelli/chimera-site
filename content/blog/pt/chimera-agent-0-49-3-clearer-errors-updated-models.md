---
title: "Chimera Agent 0.49.3: Erros Mais Claros e Modelos Atualizados"
date: 2026-10-03
category: update
summary: "Seis correções para mensagens enganosas e padrões desatualizados, todas identificadas ao construir projetos reais com o framework."
version: "0.49.3"
---

## Quando o MCP Bloqueia Escritas

A leitura de dados via MCP anteriormente contaminava execuções sem explicar por que as escritas falharam. A mensagem de erro agrupava três cenários distintos: negação do usuário, configuração do proprietário e casos onde nenhum humano poderia aprovar uma requisição HTTP. Os usuários viam mensagens idênticas para todos os três, perdendo tempo e orçamento com tentativas que nunca funcionariam. Agora cada caso recebe uma explicação específica - especialmente importante em contextos HTTP onde a mensagem deixa claro que a aprovação é impossível e sugere ativar o pause-for-approval ou evitar conteúdo não confiável.

## Testes Que Realmente Testam

O botão de Teste MCP antes verificava apenas a conectividade do servidor enquanto ocultava silenciosamente se os agentes podiam realmente usar essas ferramentas. Um servidor podia passar no teste enquanto suas ferramentas permaneciam inacessíveis aos agentes (quando o carregamento de servidores MCP na inicialização estava desativado). Agora o teste reporta tanto a conectividade quanto a disponibilidade real, com mensagens distintas explicando como resolver cada problema potencial.

## Verificação vs. Entrega

A verificação de execução antes mostrava `verified: True` sem indicar se os arquivos atuais correspondiam aos verificados. Uma execução verificada podia depois conter conteúdo completamente diferente (20/20 testes falhando em um caso observado) sem nenhuma indicação visual. Agora as execuções rastreiam `delivered_matches_verified` e exibem badges claros quando o conteúdo em disco diverge do estado verificado.

## Padrões de Modelo Atualizados

Os modelos padrão estavam defasados em relação às ofertas atuais:
- Modelo base mudou de `deepseek-chat-v3.1` (0.25/0.95) para `deepseek-v4-flash-0731` (0.065/0.18)
- Modelo top substituiu `deepseek-r1` por `z-ai/glm-5.3`
- Juiz de fusão e assentos do painel atualizados para modelos da geração atual

Essas mudanças refletem melhorias medidas em preço, tamanho de janela de contexto e benchmarks de terceiros - não alegações não verificadas de qualidade. A atualização também remove modelos de prévia de posições padrão onde usuários não os escolheram explicitamente.

## Outras Correções
- Erros de instalação de skills agora identificam corretamente qual host recusou a requisição
- Permissões de escrita com caminho absoluto mostram comparações claras com padrões glob relativos ao workspace
- `.env.example` não sugere mais modelos obsoletos ou preços incorretos

Atualize com `pip install --upgrade chimera-agent` ou veja [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3) para detalhes completos.
