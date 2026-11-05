---
title: "Chimera Agent 0.84.0: Code Turns que registram aprendizados e fecham o ciclo"
date: 2026-11-05
category: update
summary: "Os turns da tela de código agora podem registrar lições a partir da própria saída e, quando habilitados, commitar, abrir um PR e acompanhar a CI até o merge — ambas as funcionalidades vêm desligadas por padrão."
version: "0.84.0"
---

A tela de Código sempre foi um ciclo fechado: você faz o prompt, o agente trabalha, você verifica. Mas o que acontecia depois da verificação era um beco sem saída. O turn terminava e nada do que o agente aprendeu durante aquele turno era preservado para o próximo. Duas mudanças na 0.84.0 quebram esse padrão, e ambas chegam com a chave desligada.

## Lições registradas a partir de turns finalizados

Antes desta versão, um turn de Código concluído não deixava rastro do que o modelo acertou ou errou. A única memória era a própria conversa. Isso significava que cada novo turn começava do mesmo estado em branco, mesmo quando o agente tinha acabado de demonstrar que conseguia lidar corretamente com um tipo específico de tarefa.

A tela de Código agora grava uma pequena lição após cada turn finalizado. A lição vai para seu próprio armazenamento, `code_lessons.json`, e apenas a tela de Código a lê — e somente quando os cartões de habilidade estão ativados. A configuração permanece desligada por padrão porque sete execuções pré-registradas não encontraram ganho mensurável com as lições gravadas. Execuções autônomas nunca as veem.

O que é registrado importa tanto quanto onde é armazenado. Uma resposta que você nunca verificou é armazenada como não verificada, não como um sucesso. Trabalho em segundo plano e saída contaminada são mantidos completamente fora do prompt. O texto registrado tem limite de tamanho, para que o armazenamento de lições não cresça sem controle. O design presume que uma lição que você não verificou explicitamente não é uma lição que você quer que o agente repita.

A cunhagem também fica mais rigorosa nesta versão. Todo caminho de cunhagem agora nomeia seu rastro, o que corrige um bug em que cartões eram recusados porque o sistema não conseguia encontrar evidências de sua origem. A detecção de recorrência agora exige duas palavras de conteúdo compartilhadas em vez de uma, e a verificação funciona também em português. A mudança reduz falsos positivos sem bloquear os legítimos.

## Fechando o ciclo: commit, PR e CI

A segunda mudança tem um escopo maior. Com "Fechar o ciclo" ativado nas Configurações, um turn da tela de Código que passa na verificação e na sua própria checagem de diff não para por aí. Ele commita no seu branch de worktree, faz o push, abre um pull request e observa a execução da CI em segundo plano. Se a CI voltar vermelha, o agente lê a falha e executa até dois turns de correção. Se a CI voltar verde, o agente faz o merge do pull request.

Isso não era possível antes. Um turn que produzia código funcional ainda exigia que você trocasse de contexto, colocasse as mudanças em stage, escrevesse uma mensagem de commit, fizesse push, abrisse o PR você mesmo e monitorasse as verificações. Agora o agente lida com essa sequência, mas apenas quando você permite explicitamente.

As salvaguardas são específicas e inegociáveis. Um pull request que afete faturamento, uma migração destrutiva, segurança em nível de linha ou grants nunca sofre merge automático — o agente vai abri-lo, mas você deve fazer o merge manualmente. Um turn que fosse commitar um segredo não commita nada. Apenas a tela do proprietário pode ativar ou iniciar a funcionalidade. A ponte, canais, convidados e trabalho em segundo plano nunca a disparam. O branch principal, um HEAD desanexado e force pushes são todos recusados. O design traça uma linha rígida: a automação para onde o dano irreversível se torna possível.

A funcionalidade vem desligada por padrão. Você a habilita nas Configurações na tela do proprietário, e ela só se aplica a turns da tela de Código que passam na verificação e na checagem de diff. Se você nunca a ativar, nada muda na forma como seus turns terminam.

Ambas as funcionalidades compartilham a mesma filosofia: registre o que você verifica, automatize o que você confia, e por padrão não faça nenhum dos dois até que você decida o contrário.

Para começar: atualize para a 0.84.0, abra as Configurações na tela do proprietário e decida quais ciclos você quer que o agente feche. Notas completas em [Chimera Agent v0.84.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.84.0).
