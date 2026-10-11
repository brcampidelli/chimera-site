---
title: "Chimera Agent 0.50.0: Visibilità, Controllo e Ricerca Ibrida"
date: 2026-10-11
category: update
summary: "Questa versione corregge comportamenti silenziosi, aggiunge controlli mancanti e migliora il retrieval con la ricerca ibrida."
version: "0.50.0"
---

## Le Attività Sono Ora Visibili

Gli agenti mantenevano precedentemente una lista interna di attività (`RunState.tasks`) che non era mai esposta o persistita. Esecuzioni lunghe potevano perdere traccia del proprio progresso durante la compattazione del contesto. Ora, l'attività attiva viene visualizzata durante l'esecuzione e le attività completate vengono barrate. La lista sopravvive alla compattazione, quindi gli agenti non dimenticano più il loro piano a metà esecuzione.

## Le Richieste di Approvazione Ti Seguono

Tre superfici di esecuzione non monitorate (inclusi i cron job) potevano richiedere approvazioni, ma il meccanismo era opaco. Se configurato con `CHIMERA_APPROVAL_WEBHOOK`, gli agenti ora instradano le richieste di approvazione al canale specificato invece di fallire silenziosamente quando nessuna console è disponibile. Il sistema segnala anche esplicitamente gli stati `unreachable` quando la consegna non è possibile.

## Miglioramenti alla Governance e al Retrieval

Il kernel di trust (`CHIMERA_GOVERNANCE`) precedentemente non aveva alcun controllo di attivazione nonostante registrasse eventi di sicurezza. Ora viene fornito disabilitato di default con un toggle visibile. Per il retrieval, `chimera find` utilizza ora la ricerca ibrida (keyword + vettoriale) di default dopo che i test hanno dimostrato che supera la ricerca solo per keyword di 6.25 punti (p = 1.7e-04) sul corpus del progetto. La ricerca solo vettoriale è meno performante, giustificando l'approccio ibrido.

## Correzioni alla Gestione dei Modelli

Gli agenti assumevano che i modelli non catalogati avessero finestre di 128k token, causando crash per i 31 modelli (su 431 indicizzati) che supportano effettivamente ≤64k. Il sistema ora controlla l'indice live per i modelli sconosciuti. Cinque voci del catalogo sono state corrette per dimensioni di finestra gonfiate e un errore di prezzo (2.2x superiore) è stato risolto.

## Tracciabilità e Avvertenze

Le tracce registrano ora quale backend ha servito ogni passo, non solo quale modello ha risposto. Questo è importante per servizi come OpenRouter dove gli slug dei modelli rappresentano pool con variazioni di prezzo di 8.8x. Il changelog ritira alcune affermazioni sulle performance che confrontavano erroneamente misurazioni pool.

Rimangono limitazioni chiave: gli installer non sono firmati (anche se gli updater lo sono), la governance viene fornita disabilitata e il compattatore di riepilogo è disattivato di default poiché non è utilizzato nella pratica (0 attivazioni su 137 esecuzioni misurate). L'annullamento è cooperativo - le chiamate attive si completano prima di fermarsi.

Vedi [Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) per le misurazioni e il changelog completo. Per aggiornare: `pip install --upgrade chimera-agent`.
