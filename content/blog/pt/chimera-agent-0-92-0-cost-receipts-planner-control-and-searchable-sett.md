---
title: "Chimera Agent 0.92.0: recibos de custo, controle do planner e configurações pesquisáveis"
date: 2026-11-24
category: update
summary: "Os recibos de custo agora usam preços em tempo real, o planner pode ser ativado ou desativado por execução, e a busca nas configurações do Desktop encontra a tabela de roteamento."
version: "0.92.0"
---

## O que de fato mudou para quem constrói agentes

Três coisas nesta versão mudam o jeito como você roda agentes no dia a dia. O resto são experimentos que ficam desativados por padrão, e eles pertencem ao laboratório, não ao seu pipeline.

**Os recibos de custo pararam de chutar.** Antes da 0.92.0, uma execução fora do `serve` não tinha uma fonte de preço confiável. O recibo mostrava o que o catálogo local tivesse em cache, o que podia estar desatualizado ou ausente para modelos mais novos. Se você usasse um slug exato de modelo que não estivesse no catálogo, a linha de custo ficava errada ou sumia. Isso quebrava o orçamento de quem fixa um endpoint específico de provedor.

Agora execuções fora do `serve` puxam do índice público de preços do OpenRouter. Slugs exatos de modelo recebem suas próprias taxas em vez de herdar uma correspondência aproximada. Chamadas de admissão estrita preservam a cotação usada quando a chamada foi admitida, então o recibo bate com o que foi de fato reservado. A entrada `gpt-oss-20b` do catálogo foi atualizada na mesma leva. Se você acompanha custo por execução, os números agora são reproduzíveis.

**O planner virou um interruptor.** O planner estava sempre ligado. Você não conseguia desligá-lo para uma única raia do Kanban, uma única chamada de API ou um único passo de solve num workflow. Isso significava que toda tarefa leve pagava a latência e o overhead de tokens do planejamento, mesmo quando a instrução era trivial ou o modelo não se beneficiava da decomposição.

Com `use_planner`, você define onde importa: na definição de uma raia, no payload de uma execução via API ou num passo de solve de workflow. O padrão continua ligado, então o comportamento existente não muda. Mas se você tem uma raia que só formata saída, pode pular o planner e economizar um round trip. O mesmo flag funciona nas três superfícies, então o modelo mental é um booleano só, não três configs separadas.

**As configurações do Desktop ficaram encontráveis.** A tabela de roteamento de modelo por papel estava enterrada. Você precisava saber em qual aba de configurações ela morava e rolar até lá. A busca das configurações agora a indexa, então digitar "routing" ou o nome de um papel a traz à tona. Isso importa quando você alterna entre projetos que usam modelos diferentes para o mesmo papel.

Duas correções de localização vieram juntas: o texto de roteamento e de recibo agora aparece corretamente em português do Brasil, e novas conversas e turnos só de resposta mostram status mais claro. A mudança de status é pequena, mas elimina a ambiguidade quando um turno está esperando uma chamada de ferramenta versus esperando a resposta do modelo.

## O que os experimentos significam (e o que não significam)

Quatro experimentos chegaram, todos opt-in e todos desativados por padrão. Nenhum deles muda o comportamento em produção a menos que você os habilite explicitamente.

A extração de memória passou por uma rodada de benchmark que foi inconclusiva. O limite de 6.000 caracteres e o modelo global continuam sendo os padrões. Você pode optar por um modelo de extração explícito e um pré-filtro determinístico, mas ainda não há evidência de que qualquer um deles melhore a recuperação de forma mensurável. Habilite-os se quiser coletar seus próprios dados.

Os tiers de modelo para cron foram testados em jobs sintéticos. O tier mais barato acertou completamente sete de oito. Isso não diz nada sobre os seus jobs de cron em produção, porque jobs sintéticos não são os seus jobs. Os padrões não mudaram. Se você roda cron em alto volume, pode experimentar o tier mais barato e validar contra seus próprios critérios de sucesso.

Refinamento de design e proporcionalidade de prompt continuam desativados por padrão. São experimentos internos sem superfície voltada ao usuário ainda. As notas os referenciam por transparência, não porque você deva mexer neles.

## O que fazer agora

Se você acompanha custos, puxe a imagem mais recente e rode um job fora do `serve`. Confira o recibo contra as taxas publicadas do OpenRouter. Se você fixa slugs exatos de modelo, verifique se a linha de taxa bate com o seu provedor.

Se você tem raias leves no Kanban, adicione `use_planner: false` em uma raia e compare a latência. O flag está documentado no schema de configuração de execução.

Se você usa o Desktop, abra as configurações e busque pelo nome de um papel. Confirme que a tabela de roteamento aparece.

Notas da versão com a lista completa: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
