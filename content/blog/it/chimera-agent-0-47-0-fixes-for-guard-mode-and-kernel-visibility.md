---
title: "Chimera Agent 0.47.0: Correzioni per la Guard Mode e la Kernel Visibility"
date: 2026-08-20
category: update
summary: "Sette correzioni critiche risolvono problemi di segnalazione errata in guard mode, lacune nell'applicazione delle regole, integrità degli audit e visibilità del kernel."
version: "0.47.0"
---

## La Guard Mode Ora Segnala i Rifiuti Correttamente

Un difetto fondamentale nella guard mode (`--guard`) faceva sì che le chiamate a strumenti rifiutate venissero segnalate come successi. Il sistema verificava la presenza del prefisso `error:` nel messaggio di rifiuto, ma la maggior parte dei rifiuti non lo includeva. Ciò significava che tre superfici critiche - il frame desktop, i log dei passaggi e il rilevamento delle deviazioni - mostravano un'esecuzione riuscita quando ogni azione pericolosa era stata effettivamente bloccata. Il modello segnalava con sicurezza azioni completate come force push che non erano mai avvenute. Ora i rifiuti sono correttamente contrassegnati su tutte le superfici, con una chiara attribuzione alla decisione della guard.

## Correzioni al Motore delle Regole per Script e Documenti

Il motore delle regole presentava due fallimenti opposti. Gli script multi-linea passavano sempre perché l'escape dei newline interrompeva il rilevamento dei limiti delle parole nei pattern delle regole. Nel frattempo, i documenti che citavano comandi bloccati venivano erroneamente bloccati in modo rigido. La protezione era esattamente al contrario: gli script reali eludevano le regole mentre la documentazione generava falsi positivi. Due regole non erano mai state attivate a causa di questi problemi di parsing. Ora l'interpolazione preserva correttamente i limiti.

## Revisione del Sistema di Audit

Sono stati risolti tre problemi di audit. Innanzitutto, il sistema che rilevava le credenziali era lo stesso che le memorizzava non redatte nel log di audit. In secondo luogo, le scritture concorrenti potevano corrompere la verifica crittografica della catena di audit. Terzo, l'interfaccia utente di sicurezza segnalava erroneamente manomissioni a causa dei reset della catena di hash durante le scritture concorrenti. Ora le credenziali vengono redatte prima della memorizzazione nell'audit e gli scrittori mantengono un unico stato coerente della catena.

## La Observation Mode Osserva Davvero

La modalità `observe` applicava le regole mentre dichiarava di misurarle soltanto. I blocchi rigidi si attivavano prima della consultazione con l'approvatore, per poi essere esclusi dal conteggio dei rifiuti utilizzato per le decisioni di rollout. Su 33 chiamate reali, otto rifiuti venivano mostrati come zero. Questi rifiuti rimangono (sono segnali inequivocabili), ma ora vengono conteggiati correttamente e identificano la loro fonte.

## Ripristinata la Kernel Visibility

Le decisioni del trust kernel non raggiungevano gli endpoint HTTP per run, batch o turni - decisioni critiche come l'approvazione dei force push venivano prese in modo invisibile. Ora il kernel partecipa a tutti i flussi HTTP quando `CHIMERA_GOVERNANCE` è attivo. I prompt lato server non appariranno sulle connessioni HTTP, garantendo che la persona che li vede abbia effettivamente effettuato la richiesta.

Esegui `chimera upgrade` per ottenere le correzioni. Se utilizzi la guard mode, aggiorna immediatamente - i report della versione precedente erano pericolosamente fuorvianti. I [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) dettagliano tutti i cambiamenti.

Per le distribuzioni in produzione, controlla i log di audit per eventuali perdite di credenziali da chiamate governate a `write_file`. Verifica se gli script multi-linea nei tuoi file di regole necessitano di adattamenti per il corretto rilevamento dei limiti.
