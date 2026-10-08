---
title: "Chimera Agent 0.50.0: Visibilità, Controllo e Ricerca Ibrida"
date: 2026-10-08
category: update
summary: "Questa versione corregge comportamenti silenziosi, aggiunge controlli di governance e migliora il retrieval con la ricerca ibrida."
version: "0.50.0"
---

## Le Attività Ora Sono Visibili

Gli agenti mantenevano precedentemente una lista interna di task inaccessibile durante l'esecuzione. `RunState.tasks` esisteva ma non veniva mai popolata. Ora, le attività vengono visualizzate in tempo reale con indicatori di progresso, e la lista persiste attraverso la compattazione del contesto. Ciò significa che gli agenti a esecuzione prolungata non perdono più traccia dei loro piani durante l'esecuzione.

## Le Richieste di Approvazione Ti Seguono

I flussi di approvazione assumevano precedentemente che una console fosse sempre monitorata. Tre superfici non monitorate—inclusi i cron job—potevano richiedere input umani ma non avevano modo di recapitare la domanda se nessuno era presente. Impostando `CHIMERA_APPROVAL_WEBHOOK`, ora le richieste di approvazione vengono indirizzate a un canale specificato. I sistemi senza capacità di recapito segnalano correttamente `unreachable` invece di fallire in silenzio.

## La Governance Può Essere Abilitata

Il log di audit della sicurezza era precedentemente una funzionalità passiva senza meccanismo di attivazione. `CHIMERA_GOVERNANCE` ora fornisce un controllo per abilitarlo, e la schermata Security mostra esplicitamente il suo stato corrente. Questo è stato implementato perché un log di audit che non poteva essere attivato non aveva alcuno scopo pratico.

## La Ricerca Ibrida Supera le Keyword

`chimera find` utilizzava precedentemente solo la ricerca per keyword o vettoriale, con la decisione presa dopo l'inizio dell'esecuzione. Il retrieval ibrido—che combina entrambi i metodi—ora supera le ricerche solo per keyword di 6.25 punti (p = 1.7e-04) sul corpus del progetto. La ricerca vettoriale da sola è inferiore alle keyword, motivo per cui l'approccio ibrido è ora il default. Il sistema calcola anche i costi in anticipo.

## Correzioni di Compatibilità dei Modelli

Gli agenti assumevano che i modelli non catalogati avessero una finestra di 128.000 token, causando crash per i 31 modelli nell'indice che supportano effettivamente 64.000 token o meno. Il sistema ora verifica l'indice live per i modelli sconosciuti. Cinque voci del catalogo sono state corrette per dimensioni inaccurate della finestra, e un errore di pricing (2.2x off) è stato risolto.

## Visibilità del Backend nelle Tracce

Le tracce ora registrano quale backend ha servito ogni step, non solo quale modello ha risposto. Questo è importante perché gli slug dei modelli su OpenRouter possono rappresentare pool con capacità molto diverse—un pool include endpoint con una differenza di 5x nelle finestre di contesto e 8.8x nel prezzo. Le precedenti affermazioni sulle prestazioni di modelli specifici misuravano in realtà pool; il changelog ritira i benchmark interessati.

### Cosa Fare Ora

Aggiorna a 0.50.0 e consulta il [changelog completo][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) per i dettagli implementativi. Abilita la governance se necessario e testa la ricerca ibrida con `chimera find`.
