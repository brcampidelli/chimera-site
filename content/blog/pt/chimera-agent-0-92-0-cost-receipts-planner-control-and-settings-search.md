---
title: "Chimera Agent 0.92.0: Recibos de custo, controle do planner e busca nas configurações"
date: 2026-11-26
category: update
summary: "Recibos de custo agora usam o índice público de preços do OpenRouter para execuções fora do serve. O planner é configurável por raia, e a busca das configurações do Desktop encontra a tabela de roteamento."
version: "0.92.0"
---

## O que muda no rastreamento de custos

Antes da 0.92.0, os recibos de custo para execuções fora do `serve` dependiam de um catálogo interno estático. Se o slug do modelo não batesse exatamente, o recibo mostrava zero ou uma taxa de fallback que não refletia o custo real da chamada. A entrada do `gpt-oss-20b` estava desatualizada, e chamadas strict admission perdiam a cotação com a qual foram admitidas, impossibilitando auditar por que uma determinada execução custou o que custou.

Esta versão migra essas execuções para o índice público de preços do OpenRouter. Slugs exatos de modelo agora puxam suas próprias taxas diretamente desse índice. Quando uma chamada strict é admitida, o recibo preserva a cotação usada na admissão em vez de recalculá-la depois. A entrada do catálogo `gpt-oss-20b` foi atualizada para refletir o preço atual. Juntas, essas mudanças significam que o número que você vê no recibo é o número que foi de fato cobrado, não uma aproximação de uma tabela de lookup desatualizada.

## Controle do planner vai para onde você configura o trabalho

O planner estava sempre ligado, e não havia um switch para desligá-lo para uma raia específica, uma execução de API ou um passo de solve de workflow. Se você quisesse que uma raia executasse sem fase de planejamento, precisava contornar o framework. Esse contorno quebrava quando o padrão mudava ou quando um workflow reutilizava a definição da raia.

Agora `use_planner` é uma configuração em raias Kanban, execuções de API e passos de solve de workflow. O planner permanece ligado por padrão, então configurações existentes não mudam de comportamento. Definir `use_planner: false` em uma raia pula a fase de planejamento apenas para aquela raia. A mesma configuração em uma execução de API ou passo de solve sobrescreve o padrão da raia para aquela execução. Isso coloca a decisão junto à definição do trabalho, onde ela pertence, em vez de em uma flag global ou variável de ambiente.

## Configurações do Desktop que são realmente encontráveis

A tabela de roteamento model-by-role existia antes desta versão, mas a busca de configurações não a indexava. Você precisava saber onde ela ficava e navegar até ela manualmente. Em português do Brasil, os rótulos de roteamento e o texto do recibo eram renderizados incorretamente, e novas conversas mostravam um status que não deixava claro o que estava acontecendo.

A busca de configurações agora encontra a tabela de roteamento. Você pode digitar o nome de um role e chegar diretamente à atribuição. O texto de roteamento e recibos está correto em português do Brasil. Novas conversas e turnos somente de resposta mostram um status mais claro, para que você saiba se o modelo está carregando, pensando ou aguardando entrada.

## Experimentos que não mudaram padrões

Três experimentos chegaram nesta versão, e nenhum deles muda o comportamento padrão. O benchmark de extração de memória foi inconclusivo; o limite de 6.000 caracteres e o modelo global permanecem como padrão, com um modelo de extração explícito e um pré-filtro determinístico disponíveis como opt-in. O experimento de tier de modelo para cron mostrou acerto total em sete de oito jobs sintéticos, mas jobs sintéticos não são jobs de produção, e os padrões seguem inalterados. Os experimentos de refinamento enxuto de Design e proporcionalidade de prompts permanecem desligados por padrão.

Esses experimentos estão documentados nas notas de versão para times que quiserem testá-los com suas próprias cargas de trabalho. Não os habilite em produção sem medir contra seus próprios dados.

## O que fazer agora

Atualize com `pip install chimera-agent==0.92.0`. Se você executa cargas de trabalho com rastreamento de custo fora do `serve`, verifique seus recibos após a atualização — os números refletirão o índice público do OpenRouter. Se você tem raias que deveriam pular o planejamento, adicione `use_planner: false` à definição da raia. Usuários de Desktop no macOS e Windows devem notar que os instaladores não são assinados e podem pedir confirmação na primeira execução; o app verifica assinaturas nos pacotes do updater depois disso. As notas de versão completas estão em [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
