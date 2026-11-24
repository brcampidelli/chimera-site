---
title: "Chimera Agent 0.92.0: Recibos de custo, controle do planner e configurações pesquisáveis"
date: 2026-11-24
category: update
summary: "Os recibos de custo agora usam preços em tempo real, o planner pode ser ativado ou desativado por execução, e a busca das configurações no Desktop encontra a tabela de roteamento."
version: "0.92.0"
---

## O que realmente mudou para quem constrói agentes

Três coisas nesta versão mudam a forma como você executa agentes no dia a dia. O resto são experimentos que permanecem desligados por padrão e pertencem ao laboratório, não ao seu pipeline.

**Os recibos de custo pararam de chutar.** Antes da 0.92.0, uma execução fora do `serve` não tinha uma fonte de preço confiável. O recibo mostrava o que o catálogo local tivesse em cache, o que podia estar desatualizado ou ausente para modelos mais novos. Se você usasse um slug exato de modelo que não estava no catálogo, a linha de custo ficava errada ou nem aparecia. Isso quebrava o orçamento de quem fixa um endpoint específico de provedor.

Agora, execuções fora do `serve` consultam o índice público de preços do OpenRouter. Slugs exatos de modelo recebem suas próprias taxas em vez de herdar uma correspondência aproximada. As chamadas de admissão estrita preservam a cotação usada no momento da admissão, então o recibo bate com o que foi realmente reservado. A entrada do catálogo `gpt-oss-20b` foi atualizada na mesma leva. Se você monitora custo por execução, os números agora são reproduzíveis.

**O planner virou um interruptor.** O planner estava sempre ligado. Você não conseguia desligá-lo para uma única raia do Kanban, uma única chamada de API ou um único passo de resolução em um workflow. Isso significava que toda tarefa leve pagava a latência e o overhead de tokens do planejamento, mesmo quando a instrução era trivial ou o modelo não se beneficiava da decomposição.

Com `use_planner`, você define onde importa: na definição de uma raia, no payload de uma execução de API ou em um passo de resolução de workflow. O padrão ainda é ligado, então o comportamento existente não muda. Mas se você tem uma raia que só formata saída, pode pular o planner e economizar um round trip. A mesma flag funciona nas três superfícies, então o modelo mental é um booleano, não três configurações separadas.

**As configurações do Desktop ficaram encontráveis.** A tabela de roteamento de modelos por papel estava enterrada. Você precisava saber em qual aba de configurações ela ficava e rolar até lá. A busca de configurações agora a indexa, então digitar "routing" ou o nome de um papel a traz à tona. Isso importa quando você está alternando entre projetos que usam modelos diferentes para o mesmo papel.

Duas correções de localização vieram juntas: o texto de roteamento e recibos agora são exibidos corretamente em português brasileiro, e novas conversas e turnos só de resposta mostram um status mais claro. A mudança de status é pequena, mas remove a ambiguidade quando um turno está esperando uma chamada de ferramenta versus esperando a resposta do modelo.

## O que os experimentos significam (e o que não significam)

Quatro experimentos chegaram, todos opcionais e desligados por padrão. Nenhum deles altera o comportamento em produção a menos que você os habilite explicitamente.

A extração de memória passou por uma execução de benchmark que foi inconclusiva. O limite de 6.000 caracteres e o modelo global permanecem como padrão. Você pode optar por um modelo de extração explícito e um pré-filtro determinístico, mas ainda não há evidência de que algum deles melhore a recuperação de forma mensurável. Habilite-os se quiser coletar seus próprios dados.

Os tiers de modelo do Cron foram testados em jobs sintéticos. O tier mais barato foi totalmente correto em sete de oito casos. Isso não te diz nada sobre seus jobs de cron em produção, porque jobs sintéticos não são os seus jobs. Os padrões não mudaram. Se você executa cron de alto volume, pode experimentar o tier mais barato e validar contra seus próprios critérios de sucesso.

O refinamento de design e a proporcionalidade de prompt permanecem desligados por padrão. São experimentos internos sem superfície voltada ao usuário ainda. As notas os referenciam por transparência, não porque você deva mexer neles.

## O que fazer agora

Se você monitora custos, baixe a imagem mais recente e execute um job fora do `serve`. Confira o recibo com as taxas publicadas do OpenRouter. Se você fixa slugs exatos de modelo, verifique se a linha da taxa corresponde ao seu provedor.

Se você tem raias de Kanban leves, adicione `use_planner: false` a uma raia e compare a latência. A flag está documentada no schema de configuração de execução.

Se você usa o Desktop, abra as configurações e busque pelo nome de um papel. Confirme se a tabela de roteamento aparece.

Notas de versão com a lista completa: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
