---
title: "Chimera Agent 0.49.2: Correzioni per l'affidabilità dell'updater e dell'installer"
date: 2026-10-02
category: update
summary: "Questa release garantisce che l'updater controlli periodicamente nuove versioni e risolve un problema dell'installer che causava segnalazioni errate della versione."
version: "0.49.2"
---

## L'Updater Ora Funziona Come Previsto

In precedenza, l'updater controllava nuove versioni solo una volta—all'avvio. Questo era un problema per Chimera Agent, che spesso rimane aperto per lunghi periodi. Se una nuova versione veniva rilasciata mentre l'app era in esecuzione, gli utenti non lo sapevano a meno di controllare manualmente o riavviare l'app. Ciò portava a situazioni in cui gli aggiornamenti venivano completamente persi, costringendo gli utenti a scaricare gli installer direttamente dal sito.

Ora, l'updater controlla ogni sei ore mentre l'app è in esecuzione. Questo cambiamento garantisce che gli utenti vengano notificati tempestivamente dei nuovi rilasci, senza richiedere interventi manuali. Per evitare avvisi superflui, rifiutare un aggiornamento memorizza quella versione per la sessione corrente, ma versioni più recenti attiveranno comunque un nuovo controllo. I controlli manuali tramite il menu della tray avvisano sempre, indipendentemente dai rifiuti precedenti.

## La Correzione dell'Installer Entra in Vigore

La versione 0.49.1 introduceva una correzione per un problema dell'installer in cui l'aggiornamento lasciava file della versione precedente. Ciò causava all'app di segnalare erroneamente la sua versione, creando un loop in cui continuava a offrire un aggiornamento a se stessa. Tuttavia, quella correzione si applicava solo ai nuovi installer—non a quelli usati per aggiornamenti in-place. Con la 0.49.2, l'installer corretto viene ora utilizzato per gli aggiornamenti, garantendo che la segnalazione della versione sia accurata dopo un upgrade.

## Altri Miglioramenti dalla 0.49.1

- Le release ora vengono trattenute dall'essere marcate come "latest" finché i loro artefatti di build non sono completamente pronti, prevenendo errori 404 durante la finestra di build.
- Le finestre di errore e i messaggi nella tray sono localizzati, mentre i diagnostici tecnici rimangono in inglese per facilitare la ricerca.
- Le opzioni della modalità costo nella procedura guidata del primo avvio sono ora tradotte correttamente.

Per ottenere le ultime correzioni, esegui l'updater o scarica la nuova versione dalle [note di rilascio][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).

[Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2): CHANGELOG.md
