---
title: "Chimera Agent 0.84.0: Code Turns que Registram Aprendizados e Fecham o Ciclo"
date: 2026-11-05
category: update
summary: "Code-screen turns agora podem registrar lições a partir da própria saída e, quando habilitado, commitar, abrir um PR e acompanhar a CI até o merge — ambas as funcionalidades desativadas por padrão."
version: "0.84.0"
---

A tela de Code sempre foi um ciclo fechado: você envia o prompt, o agente trabalha, você valida. Mas o que acontecia depois da validação era um beco sem saída. O turn terminava e nada que o agente aprendeu durante aquele turn era preservado para o próximo. Duas mudanças na 0.84.0 quebram esse padrão, e ambas chegam com a chave desligada.

## Lições registradas a partir de turns concluídos

Antes desta release, um turn de Code concluído não deixava nenhum vestígio do que o modelo acertou ou errou. A única memória era a própria conversa. Isso significava que cada novo turn partia do mesmo estado em branco, mesmo quando o agente tinha acabado de demonstrar que sabia lidar corretamente com um tipo específico de tarefa.

A tela de Code agora registra uma lição curta após cada turn finalizado. A lição vai para seu próprio armazenamento, `code_lessons.json`, e apenas a tela de Code a lê — e somente quando skill cards estão ativados. A configuração permanece desativada por padrão porque sete execuções pré-registradas não encontraram ganho mensurável com as lições registradas. Execuções autônomas nunca as veem.

O que é registrado importa tanto quanto onde é armazenado. Uma resposta que você nunca conferiu é armazenada como não verificada, não como um sucesso. Trabalho em segundo plano e saída contaminada são mantidos completamente fora do prompt. O texto registrado tem limite de tamanho, para que o armazenamento de lições não cresça sem controle. O design parte do princípio de que uma lição que você não verificou explicitamente não é uma lição que você quer que o agente repita.

A cunhagem também fica mais rigorosa nesta release. Todo caminho de cunhagem agora nomeia seu rastro, o que corrige um bug em que cartões eram recusados porque o sistema não conseguia encontrar evidência de sua origem. A detecção de recorrência agora exige duas palavras de conteúdo compartilhadas em vez de uma, e a verificação funciona também em português. A mudança reduz falsos positivos sem bloquear os legítimos.

## Fechando o ciclo: commit, PR e CI

A segunda mudança tem um escopo maior. Com "Close the loop" ativado em Configurações, um turn da tela de Code que passa na verificação e na própria checagem de diff não para por aí. Ele commita no branch da worktree, faz push, abre um pull request e monitora a execução da CI em segundo plano. Se a CI voltar vermelha, o agente lê a falha e executa até dois turns de correção. Se a CI voltar verde, o agente faz o merge do pull request.

Isso não era possível antes. Um turn que produzia código funcional ainda exigia que você trocasse de contexto, adicionasse as mudanças ao stage, escrevesse uma mensagem de commit, fizesse push, abrisse o PR você mesmo e acompanhasse as verificações. Agora o agente cuida dessa sequência, mas apenas quando você permite explicitamente.

As salvaguardas são específicas e inegociáveis. Um pull request que mexe em billing, uma migração destrutiva, row-level security ou grants nunca sofre merge automático — o agente vai abri-lo, mas você precisa fazer o merge manualmente. Um turn que fosse commitar um segredo não commita nada. Apenas a tela do owner pode ativar a funcionalidade ou iniciá-la. A bridge, canais, convidados e trabalho em segundo plano nunca a disparam. O branch main, um HEAD detached e force pushes são todos recusados. O design traça uma linha clara: a automação para onde o dano irreversível se torna possível.

A funcionalidade é desativada por padrão. Você a habilita em Configurações na tela do owner, e ela se aplica apenas a turns da tela de Code que passam na verificação e na checagem de diff. Se você nunca ativar, nada muda na forma como seus turns terminam.

Ambas as funcionalidades compartilham a mesma filosofia: registre o que você verifica, automatize aquilo em que você confia, e por padrão não faça nenhum dos dois até que você decida o contrário.

Para começar: atualize para a 0.84.0, abra Configurações na tela do owner e decida quais ciclos você quer que o agente feche. Notas completas em [Chimera Agent v0.84.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.84.0).
