---
title: "Il contesto è il nuovo vincolo per chi costruisce agenti"
date: 2026-10-13
category: analysis
summary: "Le prestazioni degli agenti dipendono meno dalla potenza del modello e più da come il contesto viene gestito, resettato e isolato dal mondo."
sources:
  - headline: "How Anthropic’s Dynamic Workflows Coordinate Claude Agents"
    url: https://www.latent.space/p/claude-dynamic-workflows
    outlet: "Latent Space"
    published: 2026-10-12
  - headline: "Clearing chat history helps AI agents find better solutions"
    url: https://the-decoder.com/clearing-chat-history-helps-ai-agents-find-better-solutions/
    outlet: "The Decoder"
    published: 2026-10-12
  - headline: "Anthropic is cutting off its internal evaluations from the internet"
    url: https://www.theverge.com/ai-artificial-intelligence/1009286/anthropic-is-cutting-off-its-internal-evaluations-from-the-internet
    outlet: "The Verge"
    published: 2026-10-10
dropped: "84 matérias examinadas de 510 reunidas, 3 lidas para este texto. Descartadas: publicado há 74h (1), publicado há 76h (1), publicado há 79h (1), publicado há 104h (1), publicado há 107h (1), publicado há 143h (1)"
---

Il segnale più utile dalla ricerca sugli agenti di questa settimana non riguarda modelli più grandi o finestre di contesto più estese. Riguarda il contesto come vincolo che può essere gestito attivamente. Tre sviluppi distinti puntano nella stessa direzione: gli agenti funzionano meglio quando la loro memoria di lavoro viene plasmata deliberatamente, non solo ampliata.

La presentazione di Anthropic all'AI Engineer New York ha inquadrato il coordinamento degli agenti con termini presi in prestito da Unix e Linux [[1]](https://www.latent.space/p/claude-dynamic-workflows). La lezione non è che gli agenti dovrebbero imitare letteralmente i sistemi operativi, ma che gli sviluppatori hanno bisogno di primitive per controllare cosa un agente vede, quando lo vede e cosa porta avanti. Un processo non tiene in memoria l'intera cronologia di esecuzione. Legge ciò che serve, scrive ciò che conta e lascia andare il resto. Chi costruisce agenti sta iniziando ad applicare la stessa disciplina.

I ricercatori Microsoft hanno individuato una modalità di errore concreta che questa disciplina affronta. Gli agenti autonomi rimangono intrappolati in "bacini di idee" — regioni di soluzione locali da cui non riescono a uscire perché la cronologia crescente della chat li ancora a ragionamenti precedenti [[2]](https://the-decoder.com/clearing-chat-history-helps-ai-agents-find-better-solutions/). La soluzione testata, chiamata Fork-and-Flush, svuota la cronologia della chat preservando il workspace. Il risultato: risultati migliori fino al 66 percento a parità di budget di calcolo. Quel numero conta perché isola la gestione del contesto come variabile. Il modello non è cambiato. Il compito non è cambiato. È cambiato solo il rapporto dell'agente con la propria storia.

## Il contesto è una superficie di progettazione

Per chi costruisce, questo ribalta un'assunzione comune. Molti team trattano il contesto come un problema di archiviazione: quanto possiamo farci stare, come lo comprimiamo, come recuperiamo il frammento giusto. Sono domande reali, ma mancano quella più fondamentale: cosa dovrebbe essere consentito all'agente di ricordare, punto?

Fork-and-Flush funziona perché tratta la dimenticanza come una funzionalità. L'agente conserva i suoi artefatti — il workspace, il codice, la soluzione parziale — ma abbandona la traccia di ragionamento che lo ha portato lì. Quella traccia di ragionamento non è neutra. Porta con sé assunzioni, vicoli ciechi e inquadramenti iniziali che vincolano l'esplorazione successiva. Svuotarla non è amnesia; è un riavvio controllato da uno stato noto.

I flussi di lavoro ispirati a Unix di Anthropic suggeriscono lo stesso principio a un livello più alto. In Unix, piccoli programmi comunicano attraverso interfacce esplicite. Non condividono memoria. Ognuno parte da zero con i propri input e produce output. Quando Anthropic applica questo al coordinamento degli agenti, l'implicazione è che i compiti di lunga durata degli agenti dovrebbero essere scomposti in unità più piccole con confini netti, non eseguiti come un'unica conversazione continua [[1]](https://www.latent.space/p/claude-dynamic-workflows).

## L'isolamento cambia la valutazione

Il terzo sviluppo riguarda il confine tra un agente e il mondo. Anthropic mantiene le proprie valutazioni interne offline finché non riesce a prevenire "azioni non intenzionali del modello" [[3]](https://www.theverge.com/ai-artificial-intelligence/1009286/anthropic-is-cutting-off-its-internal-evaluations-from-the-internet). Non è un annuncio di sicurezza in astratto. È l'ammissione che un agente connesso a Internet durante i test può agire in modi difficili da prevedere, tracciare o annullare.

Per chi costruisce, questo ha una conseguenza pratica diretta. Se valuti gli agenti in un ambiente in cui possono raggiungere sistemi esterni, non stai misurando l'agente. Stai misurando l'agente più qualunque cosa abbia trovato, innescato o modificato. La valutazione offline è una forma di controllo del contesto: rimuove una variabile che non puoi osservare completamente. La stessa logica vale in produzione. Un agente che può agire sul mondo ha bisogno di un confine che controlli tu, non solo di un prompt che gli chieda di comportarsi bene.

Ciò che lega queste tre storie è uno spostamento nell'origine della qualità degli agenti. Deriva meno dalla capacità grezza del modello e più dalla struttura che lo circonda: cosa l'agente ricorda, cosa dimentica, cosa può toccare e cosa no. Chi costruisce e tratta il contesto come una superficie di progettazione — qualcosa da plasmare, resettare e isolare — otterrà risultati più affidabili dagli stessi modelli. Chi lo tratta come un log passivo continuerà a combattere gli stessi fallimenti.
