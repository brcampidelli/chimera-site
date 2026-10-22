---
title: "Chimera 0.72.0: Il tuo Chrome, alle tue condizioni"
date: 2026-10-22
category: update
summary: "Chimera 0.72.0 introduce un modello di fiducia per sito, la ricerca Google opzionale e un flusso di pairing che tiene la chiave di Chrome fuori dalla shell dell'agente."
version: "0.72.0"
---

## Cosa cambia per i tuoi agenti

Finora, dare a Chimera accesso al tuo Chrome significava accettare una scelta binaria: l'agente poteva agire nel browser oppure no. Non c'era modo di dire "sì su questo sito, chiedi su tutti gli altri", né di fargli cercare su Google senza spalancare la porta a tutto ciò che un browser può fare. L'estensione stessa, in una versione precedente, aveva perso il suo popup, il che significava che non potevi fermare un'esecuzione o concedere un permesso per sito direttamente dal browser.

La versione 0.72.0 sostituisce quella logica binaria con un modello di fiducia per sito. Indichi i siti dove Chimera può cliccare e digitare senza chiedere, e ovunque altrove ogni azione ti mostra prima una card. La distinzione è importante perché rispecchia il modo in cui le persone lavorano davvero: puoi fidarti di un agente per compilare un form sulla tua dashboard interna, ma non per toccare il tuo fornitore di pagamenti. Questa release mantiene esplicito quel confine. Comprare, pagare, inviare, cancellare, pubblicare e inviare form chiedono conferma anche su un sito fidato. Password, numeri di carta, codici di verifica, frame di pagamento, download e upload vengono rifiutati categoricamente. Davanti a un CAPTCHA, l'agente si ferma e ti passa la scheda.

L'estensione inoltre verifica di nuovo, un attimo prima di agire, che l'elemento su cui aveva deciso di intervenire sia ancora quello che sta per cliccare e che nulla lo copra. Questo secondo controllo chiude un varco in cui una pagina poteva cambiare tra la decisione dell'agente e l'azione stessa.

## La ricerca Google diventa una scelta

La ricerca Google nel tuo Chrome ora è disattivata, a meno che tu non la attivi. Con `CHIMERA_BROWSER_GOOGLE=ask`, i turni desktop possono cercare su Google in una scheda visibile del tuo Chrome associato, e ogni ricerca ti mostra prima una card — anche se le approvazioni sono impostate su "consenti". Il ritmo è deliberatamente umano: una ricerca ogni 20 secondi, cinque per turno, 30 al giorno. I risultati tornano come titoli, link e snippet, marcati come contenuto recuperato.

Ciò che la release esclude è importante quanto ciò che include. Bot, job schedulati e il bridge MCP non ottengono mai la ricerca Google. Al primo CAPTCHA o pagina di traffico anomalo, si ferma e ti passa la scheda, e non riprova per 30 minuti. Non c'è alcun travestimento in gioco. La funzionalità è pensata per una persona che guarda il proprio browser, non per automazione incustodita.

## Il pairing non fa più trapelare la chiave

Associare Chrome ora è un codice a sei cifre dal tuo schermo. Impostazioni → Browser mostra un codice monouso, valido due minuti con cinque tentativi, che inserisci nel popup dell'estensione. La chiave poi finisce nel vault del sistema operativo, mai nell'ambiente dei comandi che Chimera esegue. Questa è la correzione che conta di più per chi esegue agenti in locale: il solo token server, che qualsiasi processo locale può leggere, non ti dà più accesso a Chrome. Modificare la lista dei siti fidati, fermare e disassociare richiedono tutti la schermata dell'app stessa.

Le note di rilascio dichiarano chiaramente il limite residuo: un programma malevolo già in esecuzione come tuo utente Windows può ancora prelevare la chiave. La documentazione lo dice. Ma la chiave non sta più nell'ambiente di shell dove un comando sbagliato o un agente scritto male potrebbero leggerla.

Per iniziare, apri Impostazioni → Browser nell'app. Mostra se l'estensione è associata e connessa, ti dà l'unico comando per registrarla e ti permette di elencare i siti dove Chimera può agire senza chiedere. Le note di rilascio complete sono su [Chimera Agent v0.72.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.72.0).
