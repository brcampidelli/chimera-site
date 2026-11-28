---
title: "Chimera Agent 0.92.0: Recibos de custo, controle do planner e configurações pesquisáveis"
date: 2026-11-28
category: update
summary: "Os recibos de custo agora usam a tabela de preços pública do OpenRouter para execuções fora do serve, o planner é configurável por raia e a busca das configurações do Desktop encontra a tabela de roteamento de modelos."
version: "0.92.0"
---

## O que mudou nos recibos de custo

Execuções feitas fora do `serve` antes dependiam de um catálogo de preços estático ou incompleto. Quando o slug do modelo não batia exatamente, o recibo mostrava uma taxa errada ou simplesmente omitia a linha de custo. Isso dificultava a auditoria de gastos com variantes fine-tunadas ou modelos recém-lançados.

A versão 0.92.0 migra essas execuções para a tabela de preços pública do OpenRouter. Slugs exatos de modelo agora puxam suas próprias taxas diretamente do índice. Chamadas strict também preservam a cotação aceita no momento da admissão, então o recibo reflete o preço com o qual o agente de fato se comprometeu, não uma estimativa posterior. A entrada `gpt-oss-20b` do catálogo foi atualizada para refletir o preço atual.

Para quem acompanha custos por execução fora do caminho do `serve`, os recibos agora são precisos sem correção manual. Se um modelo está listado no índice público, o agente o precifica corretamente. Se o slug é desconhecido, o recibo deixa isso claro em vez de assumir zero silenciosamente.

## O planner não está mais sempre ligado

Antes desta versão, o planner rodava em toda raia, toda chamada de API e todo passo de resolução de workflow. Não havia como desabilitá-lo para tarefas em que o planejamento adicionava latência sem melhorar o resultado. Times que queriam execução mais rápida em raias simples precisavam contornar o framework.

`use_planner` agora é uma flag de configuração exposta em raias Kanban, execuções de API e passos de resolução de workflow. O planner permanece ligado por padrão, então o comportamento existente não muda a menos que você opte por desligar. Definir a flag como `false` em uma raia pula totalmente a fase de planejamento e segue direto para a execução.

Isso é mais relevante para raias que lidam com operações determinísticas de passo único. Uma raia que busca um endpoint conhecido ou transforma um payload com um schema fixo não se beneficia de uma etapa de planejamento. Removê-la reduz latência e o consumo de tokens sem afetar a correção. A flag é por raia, então você pode manter o planner ligado para tarefas ambíguas e desligá-lo para as mecânicas dentro do mesmo projeto.

## As configurações do Desktop estão pesquisáveis

A busca de configurações no app Desktop antes não indexava a tabela de roteamento de modelos por papel. Encontrar qual modelo estava atribuído a um papel específico exigia rolar a lista inteira. Esse atrito crescia conforme os times adicionavam mais papéis e modelos de fallback.

A busca agora cobre a tabela de roteamento. Digitar o nome de um papel ou slug de modelo na barra de busca de configurações retorna diretamente as entradas de roteamento correspondentes. A mesma atualização corrige o texto de roteamento e recibos em português do Brasil, onde labels truncadas dificultavam a leitura da tabela. Novas conversas e turnos somente de resposta também mostram indicadores de status mais claros, para que você saiba se o agente está esperando a resposta de um modelo ou processando uma chamada de ferramenta.

## Experimentos que permaneceram opt-in

Vários experimentos chegaram sem alterar os padrões. A extração de memória com um modelo explícito e pré-filtro determinístico está disponível, mas desligada. O benchmark foi inconclusivo, então o limite de 6.000 caracteres e o modelo global permanecem. Uma camada mais barata de modelo cron foi testada em jobs sintéticos e acertou sete de oito, mas cargas de trabalho em produção não foram medidas. Os experimentos de refinamento de design e proporcionalidade de prompt também permanecem desligados por padrão.

Eles estão disponíveis atrás de feature flags para times que quiserem testá-los em seus próprios ambientes. Nada mudou automaticamente.

## O que fazer agora

Atualize com `pip install chimera-agent==0.92.0`. Se você roda agentes fora do `serve`, confira seu próximo recibo para confirmar que o preço bate com a tabela pública do OpenRouter. Para raias que não precisam de planejamento, adicione `use_planner: false` na configuração da raia. Usuários do Desktop podem abrir as configurações e buscar pelo nome de um papel para verificar se a tabela de roteamento está indexada.

Notas de versão completas: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
