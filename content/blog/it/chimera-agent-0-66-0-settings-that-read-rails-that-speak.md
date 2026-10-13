---
title: "Chimera Agent 0.66.0: Impostazioni che si leggono, binari che parlano"
date: 2026-10-13
category: update
summary: "Le Impostazioni diventano un documento navigabile, la barra laterale e il compositore smettono di nascondere i loro controlli, e Lavoro, Memoria e Profilo la smettono di parlare per identificativi."
version: "0.66.0"
---

## Cosa è cambiato per chi costruisce agenti

La release stringe le parti dell'app che erano tecnicamente presenti ma praticamente invisibili. Impostazioni è l'esempio più lampante. Era un'unica lista a scorrimento dove Aspetto stava dentro Generali, e dove righe per pool di chiavi, MCP, sandbox e diagnostica condividevano lo spazio con preferenze di uso quotidiano. Questo rendeva la schermata difficile da scandire e ancora più difficile da linkare. Nella 0.66.0, Impostazioni si legge come un documento con un indice. Le sezioni affiancano il contenuto in una finestra larga, Aspetto è una sezione a sé, e le righe che la maggior parte delle persone non cambia mai sono raccolte sotto Avanzate. Non è stato rimosso nulla; è stato tolto di mezzo.

La stessa logica si applica alla barra laterale del desktop. Cinque icone con i nomi solo al passaggio del mouse costringevano a ricordare cosa fosse ogni destinazione. Ora la barra scrive il nome sotto ogni icona. Il compositore della schermata Codice segue lo stesso principio. I selettori per chi esegue il turno, profilo di costo, modello e stile prima occupavano quattro righe sopra la casella del messaggio. Ora partono come una singola linea di chip, e l'intera linea li apre. Armed Fuse e Plan appaiono prima come contorni premuti, il che lascia Invia come unico pulsante pieno nella riga. Il cambiamento è piccolo, ma elimina la competizione visiva tra configurazione e azione.

## Dove l'app ha smesso di parlare il suo linguaggio

Diverse schermate stampavano identificativi interni invece del significato. I tipi di Memoria apparivano come episodic e semantic in monospace su ogni riga. Le pianificazioni erano descritte in inglese a prescindere dalla lingua dell'app. Profilo mostrava id sorgente come chat ed extracted, più il flag tainted dello store, in inglese per ogni lingua. Le righe delle competenze apprese facevano lo stesso con tainted e retire?, e la seconda usava il rosso di un errore. Lavoro › Git chiedeva conferma tramite la finestra di dialogo del browser, che non poteva nominare i file e non aveva l'aspetto dell'app.

Ognuno di questi era un punto in cui l'interfaccia esponeva il modello dati invece della decisione. La release traduce i tipi di Memoria, descrive le pianificazioni nella lingua dell'app, e fa sì che Profilo dica da dove proviene un fatto in una frase. I conteggi non verificati e la nota no OS sandbox passano dal rosso all'ambra, perché sono condizioni da verificare, non errori. La domanda di scarto di Git ora appare sotto il pulsante, in rosso, con Annulla per primo, e ogni checkbox dei file ha un nome. In portoghese, Connessioni e Utilizzo smettono anche di usare gergo: Ferramentas externas (MCP), Ferramentas, e APIs (OpenAPI) sostituiscono le etichette precedenti.

## Cosa fare ora

Aggiorna alla 0.66.0 e apri Impostazioni. La nuova sezione Aspetto è dove vivono il colore d'accento, la tinta della superficie e l'opzione ad alto contrasto, e ogni combinazione è verificata per il contrasto. Poi apri Lavoro › Esecuzioni e usa il filtro di ricerca e esito su una cronologia lunga; i tentativi precedenti di un'esecuzione si compattano sotto quello che l'ha decisa. Se mantieni link verso l'app, nota che le schede Conoscenza e Automazione ora hanno indirizzi, quindi sopravvivono a un ricaricamento e rispondono al pulsante indietro. L'elenco completo è nelle note di rilascio. [Chimera Agent v0.66.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.66.0)
