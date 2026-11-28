---
title: "Chimera Agent 0.92.0: Recibos de custo, controle do planner e busca nas configurações"
date: 2026-11-28
category: update
summary: "Os recibos de custo agora usam o índice público de preços do OpenRouter para execuções fora do serve, o planner é configurável por lane e a busca nas configurações do Desktop encontra a tabela de roteamento de modelos."
version: "0.92.0"
---

## O que mudou nos recibos de custo

Execuções feitas fora do `serve` antes dependiam de um catálogo de preços estático ou incompleto. Quando o slug do modelo não batia exatamente, o recibo mostrava uma taxa errada ou simplesmente omitia a linha de custo. Isso dificultava a auditoria de gastos com variantes fine-tuned ou modelos recém-lançados.

A versão 0.92.0 passa a usar o índice público de preços do OpenRouter para essas execuções. Slugs exatos de modelo agora puxam suas próprias taxas diretamente do índice. Chamadas strict também preservam a cotação aceita no momento da admissão, então o recibo reflete o preço com o qual o agente de fato se comprometeu, não uma estimativa posterior. A entrada do catálogo `gpt-oss-20b` foi atualizada para corresponder ao preço atual.

Para quem acompanha custos por execução fora do caminho do `serve`, os recibos agora são precisos sem correção manual. Se um modelo está listado no índice público, o agente o precifica corretamente. Se o slug é desconhecido, o recibo deixa isso claro em vez de silenciosamente assumir zero.

## O planner não está mais sempre ligado

Antes desta versão, o planner rodava em toda lane, toda chamada de API e todo passo de resolução de workflow. Não havia como desativá-lo para tarefas em que o planejamento adicionava latência sem melhorar o resultado. Times que queriam execução mais rápida em lanes simples precisavam contornar o framework.

`use_planner` agora é uma flag de configuração exposta em lanes Kanban, execuções de API e passos de resolução de workflow. O planner permanece ligado por padrão, então o comportamento existente não muda a menos que você opte por desativar. Definir a flag como `false` em uma lane pula totalmente a fase de planejamento e vai direto para a execução.

Isso é mais relevante para lanes que lidam com operações determinísticas de passo único. Uma lane que busca um endpoint conhecido ou transforma um payload com um schema fixo não se beneficia de uma etapa de planejamento. Removê-la reduz a latência e o consumo de tokens sem afetar a correção. A flag é por lane, então você pode manter o planner ligado para tarefas ambíguas e desligá-lo para as mecânicas dentro do mesmo projeto.

## As configurações do Desktop agora são buscáveis

A busca de configurações no app Desktop antes não indexava a tabela de roteamento de modelos por função. Encontrar qual modelo estava atribuído a uma função específica exigia rolar a lista inteira. Esse atrito crescia conforme os times adicionavam mais funções e modelos de fallback.

A busca agora cobre a tabela de roteamento. Digitar o nome de uma função ou slug de modelo na barra de busca das configurações retorna diretamente as entradas de roteamento correspondentes. A mesma atualização corrige o roteamento e a cópia dos recibos em português brasileiro, onde labels truncadas dificultavam a leitura da tabela. Novas conversas e turnos somente de resposta também mostram indicadores de status mais claros, para que você saiba se o agente está esperando a resposta de um modelo ou processando uma chamada de ferramenta.

## Experimentos que permaneceram opt-in

Vários experimentos chegaram sem alterar os padrões. A extração de memória com um modelo explícito e pré-filtro determinístico está disponível, mas desligada. O benchmark foi inconclusivo, então o limite de 6.000 caracteres e o modelo global permanecem. Uma camada mais barata de modelo cron foi testada em jobs sintéticos e acertou sete de oito, mas cargas de trabalho de produção não foram medidas. Os experimentos de refinamento de design e proporcionalidade de prompt também permanecem desligados por padrão.

Eles estão disponíveis atrás de feature flags para times que quiserem testá-los em seus próprios ambientes. Nada mudou automaticamente.

## O que fazer agora

Atualize com `pip install chimera-agent==0.92.0`. Se você executa agentes fora do `serve`, confira seu próximo recibo para confirmar que o preço corresponde ao índice público do OpenRouter. Para lanes que não precisam de planejamento, adicione `use_planner: false` na configuração da lane. Usuários do Desktop podem abrir as configurações e buscar pelo nome de uma função para verificar se a tabela de roteamento está indexada.

Notas completas da versão: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
