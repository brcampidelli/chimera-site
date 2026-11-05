---
title: "Chimera Agent 0.84.0: Turnos de código que registram lições e fecham o ciclo"
date: 2026-11-05
category: update
summary: "Turnos na tela de código agora podem registrar lições a partir da própria saída e, quando habilitado, commitar, abrir um PR e acompanhar a CI até o merge — ambos os recursos desativados por padrão."
version: "0.84.0"
---

A tela de código sempre foi um ciclo curto: você faz o prompt, o agente trabalha, você verifica. Mas o que acontecia depois da verificação era um beco sem saída. O turno terminava e nada do que o agente aprendeu naquele turno era guardado para o próximo. Duas mudanças na 0.84.0 quebram esse padrão, e ambas chegam com a chave desligada.

## Lições registradas a partir de turnos concluídos

Antes desta versão, um turno de código concluído não deixava nenhum rastro do que o modelo acertou ou errou. A única memória era a própria conversa. Isso significava que cada turno novo começava do mesmo estado em branco, mesmo quando o agente tinha acabado de demonstrar que sabia lidar corretamente com um tipo específico de tarefa.

A tela de código agora registra uma lição curta após cada turno concluído. A lição vai para um armazenamento próprio, `code_lessons.json`, e apenas a tela de código a lê — e somente quando os cartões de habilidade estão ativados. A configuração permanece desativada por padrão porque sete execuções pré-registradas não encontraram ganho mensurável com as lições registradas. Execuções autônomas nunca as veem.

O que é registrado importa tanto quanto onde vai parar. Uma resposta que você nunca verificou é armazenada como não verificada, não como sucesso. Trabalho em segundo plano e saída contaminada ficam completamente fora do prompt. O texto registrado tem limite, para que o armazenamento de lições não cresça sem controle. O design parte do princípio de que uma lição que você não verificou explicitamente não é uma lição que você quer que o agente repita.

A criação de cartões também fica mais rigorosa nesta versão. Todo caminho de criação agora nomeia seu rastro, o que corrige um bug em que cartões eram recusados porque o sistema não conseguia encontrar evidência de onde eles vieram. A detecção de recorrência agora exige duas palavras de conteúdo compartilhadas em vez de uma, e a verificação funciona também em português. A mudança reduz falsos positivos sem bloquear correspondências legítimas.

## Fechando o ciclo: commit, PR e CI

A segunda mudança tem escopo maior. Com "Fechar o ciclo" ativado nas Configurações, um turno na tela de código que passa na verificação e na própria checagem de diff não para por aí. Ele faz commit no branch da worktree, faz push, abre um pull request e acompanha a CI em segundo plano. Se a CI voltar vermelha, o agente lê a falha e executa até dois turnos de correção. Se a CI voltar verde, o agente faz o merge do pull request.

Isso não era possível antes. Um turno que produzia código funcional ainda exigia que você trocasse de contexto, preparasse as mudanças, escrevesse uma mensagem de commit, fizesse push, abrisse o PR você mesmo e monitorasse as verificações. Agora o agente cuida dessa sequência, mas apenas quando você permite explicitamente.

As salvaguardas são específicas e inegociáveis. Um pull request que toca em cobrança, uma migração destrutiva, row-level security ou grants nunca é mesclado automaticamente — o agente vai abri-lo, mas você precisa fazer o merge. Um turno que faria commit de um segredo não commita nada. Apenas a tela do proprietário pode ativar o recurso ou iniciá-lo. A bridge, canais, convidados e trabalho em segundo plano nunca o disparam. A branch principal, um HEAD desanexado e force pushes são todos recusados. O design traça uma linha dura: a automação para onde o dano irreversível se torna possível.

O recurso fica desativado por padrão. Você o habilita nas Configurações, na tela do proprietário, e ele se aplica apenas a turnos da tela de código que passam na verificação e na checagem de diff. Se você nunca ativá-lo, nada muda em como seus turnos terminam.

Ambos os recursos compartilham a mesma filosofia: registre o que você verifica, automatize o que você confia e, por padrão, não faça nenhum dos dois até você decidir o contrário.

Para começar: atualize para a 0.84.0, abra as Configurações na tela do proprietário e decida quais ciclos você quer que o agente feche. Notas completas em [Chimera Agent v0.84.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.84.0).
