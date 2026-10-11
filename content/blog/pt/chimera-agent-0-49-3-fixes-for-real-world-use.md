---
title: "Chimera Agent 0.49.3: Correções para Uso no Mundo Real"
date: 2026-10-05
category: update
summary: "A versão 0.49.3 resolve problemas críticos identificados durante o uso real, melhorando clareza, confiabilidade e eficiência de custos."
version: "0.49.3"
---

## Problema de Escrita de Arquivos MCP: Clareza e Custo

Uma das correções mais impactantes desta versão trata de um problema caro relacionado à escrita de arquivos MCP. Anteriormente, ao ler dados via MCP, a execução parava sem escrever os arquivos, e a mensagem de erro era ambígua. Isso levava a tentativas repetidas, cada uma gerando custos sem progresso. Por exemplo, quatro execuções da mesma tarefa custaram **US$ 5,11** sem produzir arquivos, enquanto a mesma tarefa usando ferramentas internas teve sucesso na primeira tentativa por **US$ 0,37**.

Agora, a mensagem de erro distingue três cenários: recusa humana, negação de configuração e ausência de um aprovador. Também sugere soluções práticas, como usar o switch de pausa para aprovação ou evitar conteúdo não confiável na execução. Essa mudança evita retentativas desnecessárias e reduz custos.

## Botão de Teste MCP: Feedback Melhorado

Outra melhoria significativa é o botão de teste MCP. Antes, ele apenas confirmava a conectividade do servidor, levando os usuários a pensar que o agente poderia usá-lo. Na realidade, o agente não conseguia acessar o servidor porque o carregamento dos servidores MCP no início estava desativado por padrão. Isso resultou em tempo e recursos desperdiçados, como em um caso onde **vinte e duas chamadas de ferramentas em dezenove minutos** foram feitas sem usar o servidor.

O botão de teste agora fornece feedback sobre se o agente pode usar o servidor, com mensagens diferentes para causas distintas. Isso garante que os usuários entendam os passos necessários para habilitar o uso do servidor.

## Status Verificado: Representação Precisa

O status `verified` anteriormente indicava uma verificação instantânea, mas não considerava mudanças após o momento da verificação. Isso causava confusão quando o mesmo comando executado contra a árvore resultante produzia **20 falhas em 20 execuções**. Agora, o status inclui `delivered_matches_verified`, e a lista de Execuções exibe um selo quando os arquivos no disco não correspondem mais ao estado verificado. Isso fornece uma visão mais clara do resultado da execução.

## Instalação de Skills: Mensagens de Erro Corretas

Falhas na instalação de skills anteriormente culpavam o limite errado, sugerindo retentativas ou configuração de `GITHUB_TOKEN` quando o problema não estava relacionado. Agora, o token alcança ambos os hosts, e as mensagens de erro identificam com precisão o host que recusou. Isso evita retentativas desnecessárias e garante que os usuários tomem a ação correta.

## Escrita de Arquivos: Mensagens de Recusa Claras

As recusas de escrita de arquivos eram anteriormente pouco claras, especialmente quando um caminho absoluto era declarado como a região de escrita. A mensagem de recusa agora nomeia o caminho sendo comparado, explica a região como uma lista de globs relativos ao workspace e aponta o padrão que nunca pode corresponder. Isso evita retentativas repetidas e relatórios de falhas no ambiente.

## Padrões de Modelos: Atualizados e Confiáveis

Os padrões de modelos foram atualizados para refletir as gerações atuais, garantindo melhor desempenho e eficiência de custos. O modelo padrão mudou de `deepseek-chat-v3.1` para `deepseek-v4-flash-0731`, reduzindo custos significativamente. O modelo top-tier foi atualizado para `z-ai/glm-5.3`, e os modelos de juiz e painel de fusão também foram atualizados. Um teste agora garante que nenhum modelo padrão seja um slug `-preview`, que fornecedores podem retirar sem aviso.

Para detalhes completos, consulte [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
