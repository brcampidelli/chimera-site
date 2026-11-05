---
title: "Chimera Agent 0.84.0: Code Turns que registram lições e fecham o ciclo"
date: 2026-11-05
category: update
summary: "Code-screen turns agora podem registrar lições a partir da própria saída e, quando habilitado, commitar, abrir um PR e acompanhar a CI até o merge — ambos os recursos desligados por padrão."
version: "0.84.0"
---

A tela de Code sempre foi um ciclo apertado: você faz o prompt, o agente trabalha, você verifica. Mas o que acontecia depois da verificação era um beco sem saída. O turn terminava e nada do que o agente aprendeu durante aquele turn era preservado para o próximo. Duas mudanças na 0.84.0 quebram esse padrão, e ambas chegam com a chave desligada.

## Lições registradas a partir de turns finalizados

Antes desta release, um turn de Code concluído não deixava rastro do que o modelo acertou ou errou. A única memória era a própria conversa. Isso significava que cada novo turn partia do mesmo estado em branco, mesmo quando o agente tinha acabado de demonstrar que conseguia lidar corretamente com um tipo específico de tarefa.

A tela de Code agora registra uma pequena lição após cada turn finalizado. A lição vai para seu próprio armazenamento, `code_lessons.json`, e apenas a tela de Code a lê — e somente quando os skill cards estão ativados. A configuração permanece desligada por padrão porque sete execuções pré-registradas não encontraram ganho mensurável com as lições registradas. Execuções autônomas nunca as veem.

O que é registrado importa tanto quanto para onde vai. Uma resposta que você nunca verificou é armazenada como não verificada, não como um sucesso. Trabalho em segundo plano e saída contaminada são mantidos completamente fora do prompt. O texto registrado tem limite de tamanho, para que o armazenamento de lições não cresça sem controle. O design parte do princípio de que uma lição que você não verificou explicitamente não é uma lição que você quer que o agente repita.

A cunhagem também fica mais rigorosa nesta release. Todo caminho de cunhagem agora nomeia seu rastro, o que corrige um bug em que cartões eram recusados porque o sistema não conseguia encontrar evidência de onde vieram. A detecção de recorrência agora exige duas palavras de conteúdo compartilhadas em vez de uma, e a verificação funciona também em português. A mudança reduz falsos matches sem bloquear os legítimos.

## Fechando o ciclo: commit, PR e CI

A segunda mudança tem escopo maior. Com "Close the loop" ativado em Settings, um turn da tela de Code que passa na verificação e na própria checagem de diff não para por aí. Ele commita no seu worktree branch, faz push, abre um pull request e observa a CI rodar em segundo plano. Se a CI voltar vermelha, o agente lê a falha e executa até dois turns de correção. Se a CI voltar verde, o agente faz o merge do pull request.

Isso não era possível antes. Um turn que produzia código funcional ainda exigia que você trocasse de contexto, colocasse as mudanças em stage, escrevesse uma mensagem de commit, fizesse push, abrisse o PR você mesmo e monitorasse as verificações. Agora o agente cuida dessa sequência, mas apenas quando você permite explicitamente.

As salvaguardas são específicas e inegociáveis. Um pull request que mexe em billing, uma migração destrutiva, row-level security ou grants nunca recebe merge automático — o agente vai abri-lo, mas você precisa fazer o merge. Um turn que fosse commitar um segredo não commita nada. Apenas a tela do owner pode ativar o recurso ou iniciá-lo. A bridge, canais, guests e trabalho em segundo plano nunca o disparam. A branch main, um HEAD detached e force pushes são todos recusados. O design traça uma linha dura: a automação para onde o dano irreversível se torna possível.

O recurso é desligado por padrão. Você o ativa em Settings na tela do owner, e ele só se aplica a turns da tela de Code que passam na verificação e na checagem de diff. Se você nunca ligá-lo, nada muda em como seus turns terminam.

Ambos os recursos compartilham a mesma filosofia: registre o que você verifica, automatize o que você confia, e por padrão não faça nenhum dos dois até que você decida o contrário.

Para começar: atualize para 0.84.0, abra Settings na tela do owner e decida quais ciclos você quer que o agente feche. Notas completas em [Chimera Agent v0.84.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.84.0).
