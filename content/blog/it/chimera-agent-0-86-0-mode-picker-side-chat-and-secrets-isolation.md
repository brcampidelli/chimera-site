---
title: "Chimera Agent 0.86.0: Selettore di modalità, chat laterale e isolamento dei segreti"
date: 2026-11-11
category: update
summary: "Un nuovo selettore di modalità elimina la confusione sulle posture, la chat laterale risponde senza inquinare la cronologia, la shell dell'agente non vede più le tue chiavi API e le conversazioni vengono auto-archiviate al merge delle PR."
version: "0.86.0"
---

Questa release risolve un problema strutturale che rendeva difficile fidarsi della postura dell'agente. Prima della 0.86.0, impostavi una postura nelle Impostazioni—Manuale, Auto o una via di mezzo—e poi il bridge, l'API e l'UI avevano ciascuno il proprio modo di sovrascriverla. Potevi ritrovarti con una conversazione in Auto quando pensavi fosse in Manuale perché il bridge l'aveva cambiata senza dirtelo. Il selettore di modalità sostituisce tutto questo con un unico controllo.

## Un selettore di modalità invece di tre meccanismi

Il selettore si trova sotto il prompt e si apre con Ctrl/Cmd+Shift+M. Elenca sei modalità: Manuale, Accetta modifiche, Pianifica, Auto, Non chiedere e Ignora permessi quando il progetto lo consente. Ogni modalità mappa direttamente sul sistema di posture esistente. La modalità della conversazione viene salvata e parte da quanto indicato nelle Impostazioni—Non chiedere non viene mai impostata, sospetto diventa Auto, sempre diventa Manuale. Accetta modifiche mostra una scheda prima di ogni comando, a meno che il comando sia di sola lettura o la sandbox lo isoli. Pianifica non esegue mai operazioni più ampie di Auto. Il bridge può solo spostare una conversazione verso una modalità che non allarga nulla, quindi una conversazione che hai bloccato su Manuale rimane lì. Ctrl/Cmd+Shift+O apre il selettore del modello e Ctrl/Cmd+Shift+E il selettore dell'impegno; massimizza è stato spostato su Ctrl/Cmd+Shift+Invio.

Questo è importante perché la postura era il principale confine di sicurezza tra te e l'agente, e aveva due porte posteriori. Ora ha un unico controllo che tutto rispetta.

## La shell dell'agente non eredita più i tuoi segreti

I processi figli dell'agente prima ereditavano pool di chiavi del provider come `CHIMERA_OPENROUTER_KEYS`, `DATABASE_URL` con una password e credenziali cloud. Qualsiasi comando eseguito dall'agente poteva stamparli. L'app desktop aveva lo stesso problema nella direzione opposta: passava al backend il suo token server, le credenziali dello schermo e la chiave del launcher tramite variabili d'ambiente, che su Linux restano leggibili in `/proc/<pid>/environ` a qualsiasi processo dello stesso utente—inclusa la shell dell'agente.

Entrambi i percorsi sono chiusi. La shell dell'agente e il nuovo terminale ora ricevono un ambiente con i segreti rimossi per nome e per valore. Le impostazioni del proxy vengono ancora passate. La CLI di GitHub mantiene il token di cui ha bisogno. L'app desktop ora invia i suoi segreti al backend su stdin come una singola riga che viene letta e chiusa immediatamente; il token server è mantenuto in memoria anziché nell'ambiente di processo. Una riga mancante o malformata ferma il backend invece di avviarlo senza token, e l'app rifiuta di usare un backend che risponde senza averne uno.

## Chat laterale e schede di attività suggerite

La chat laterale (Ctrl/Cmd+;) risponde a una domanda veloce sulla conversazione senza aggiungervi nulla. Legge la conversazione come dato, risponde senza strumenti e non scrive nulla nella cronologia della conversazione. Prima, fare una domanda significava inquinare il contesto con un turno su cui l'agente avrebbe poi cercato di agire. "Porta nella conversazione" riempie solo il compositore, e quando la conversazione ha letto contenuti esterni, la chat laterale cita la risposta come dato e chiede prima conferma. Il suo costo è registrato, i modelli locali restano gratuiti entro un limite giornaliero, e la guida alle scorciatoie è stata spostata su Ctrl/Cmd+/.

Le schede di attività suggerite impediscono all'agente di divagare. Quando nota qualcosa al di fuori dell'attività—codice morto, un documento obsoleto, un test mancante, un problema di sicurezza visto di sfuggita—può solo proporre una scheda. Vedi il prompt completo prima che venga eseguito qualsiasi cosa e scegli Avvia (una nuova conversazione nello stesso progetto), Fallo qui, Opzioni o Ignora. Avvia tutto chiede conferma ed è limitato a cinque. Solo lo schermo del proprietario avvia una scheda, e una scheda proposta da un turno che ha letto contenuti esterni avvia la sua conversazione contrassegnata come contaminata e senza "Ignora permessi", con un avviso sulla scheda.

## Cosa fare ora

Aggiorna con `pip install chimera-agent --upgrade` o scarica l'ultima immagine del container. Il selettore di modalità, la chat laterale e il terminale sono disponibili immediatamente. Se facevi affidamento sulle vecchie sovrascritture di postura, controlla la modalità di ogni conversazione dopo l'aggiornamento—il selettore legge il tuo default delle Impostazioni, ma le conversazioni esistenti potrebbero essere state spostate dal bridge prima della 0.86.0. L'isolamento dei segreti è automatico; non è necessaria alcuna modifica alla configurazione. Note di rilascio complete: [Chimera Agent v0.86.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.86.0)
