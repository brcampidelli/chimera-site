---
title: "Chimera 0.75.0: Override di permessi one-shot nel Code composer"
date: 2026-10-24
category: update
summary: "Un interruttore per conversazione nel Code composer approva automaticamente le chiamate a strumenti sicuri, registra ogni decisione e rimuove il timeout di cinque minuti per l'input umano."
version: "0.75.0"
---

## Cosa cambia per te

Finora, ogni chiamata a uno strumento che toccava qualcosa fuori dalla sandbox generava una scheda di approvazione. Dovevi cliccare su ognuna. Era il contratto: l'agente si ferma, tu decidi, lui prosegue. Il contratto valeva anche quando stavi iterando su uno script e l'agente doveva eseguire lo stesso comando sicuro dodici volte di fila. L'attrito non era un bug, era il design. Ma rendeva l'iterazione rapida più lenta del necessario.

La versione 0.75.0 aggiunge un interruttore nel Code composer etichettato "Ignore permissions". Quando lo attivi, l'agente approva automaticamente le chiamate a strumenti che normalmente produrrebbero una scheda di approvazione. Registra ogni decisione presa per tuo conto. L'interruttore si applica a una sola conversazione. Non persiste al riavvio dell'app. E non tocca nulla che invii dati locali all'esterno: push, pubblicazioni, pagamenti, messaggi inviati a tuo nome, accesso a segreti e qualsiasi operazione che trasmetta dati fuori dalla macchina continuano a fermarsi e a chiedere conferma. Il confine è esplicito. L'agente può muoversi più velocemente dentro il confine; non può attraversarlo senza di te.

Non è un'impostazione globale. Non è un toggle in un file di configurazione. È un pulsante sullo schermo, e solo tu puoi premerlo. Il design mantiene l'override vicino al lavoro. Vedi la conversazione, sai cosa sta facendo l'agente e decidi che, per questa sessione, le approvazioni ripetitive sono rumore. Quando l'app si riavvia, il rumore torna. Devi attivarlo di nuovo, deliberatamente.

## Perché il comportamento del timeout è cambiato

La schermata Code aveva un limite di cinque minuti per la tua risposta. Se non rispondevi a una scheda di approvazione entro quella finestra, l'agente rifiutava la chiamata e la conversazione si bloccava. L'assunzione era che una scheda senza risposta significasse una sessione incustodita. Ma l'assunzione falliva in un flusso di lavoro comune: chiedi all'agente di fare qualcosa, passi a un'altra finestra per controllare la documentazione o testare un'ipotesi, e torni sei minuti dopo trovando una conversazione morta. Il timeout puniva la concentrazione.

La schermata Code ora attende la tua risposta indefinitamente. L'agente resta in pausa finché non torni. Il limite di cinque minuti si applica ancora dove ha senso: automazioni che nessuno guarda. Quelle mantengono il guardrail. Ma quando sei presente, anche se ti allontani, la conversazione non scade più.

## Cosa non fa l'interruttore

L'interruttore "Ignore permissions" non è un flag di sudo. Non eleva i privilegi. Non concede accesso a nulla che l'agente non potesse già richiedere. Rimuove solo il requisito di approvare manualmente ogni richiesta. L'agente registra comunque ogni chiamata auto-approvata. Puoi rivedere cosa è successo a posteriori. La registrazione è lì se hai bisogno di verificare una sessione.

Le categorie che richiedono ancora approvazione esplicita sono quelle che spostano dati fuori dalla macchina o consumano risorse: push verso repository remoti, operazioni di pubblicazione, azioni di pagamento, messaggi che portano la tua identità e qualsiasi cosa legga o trasmetta segreti o dati locali all'esterno. L'interruttore rispetta queste categorie incondizionatamente. Non c'è un secondo interruttore per sovrascrivere l'override.

## Cosa fare ora

Aggiorna alla 0.75.0. Apri una sessione del Code composer in cui ti aspetti chiamate a strumenti ripetitive. Cerca l'interruttore "Ignore permissions" sullo schermo. Attivalo quando le schede di approvazione diventano rumore. Disattivalo quando hai bisogno di nuovo dei guardrail. Riavvia l'app per resettarlo. Leggi la lista completa delle modifiche nelle [note di rilascio][Chimera Agent v0.75.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.75.0).
