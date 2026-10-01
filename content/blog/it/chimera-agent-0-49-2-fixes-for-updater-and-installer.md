---
title: "Chimera Agent 0.49.2: Correzioni per l'Updater e l'Installer"
date: 2026-10-01
category: update
summary: "Chimera Agent 0.49.2 risolve problemi critici relativi all'updater e all'installer, garantendo aggiornamenti più fluidi e una corretta segnalazione delle versioni."
version: "0.49.2"
---

## L'Updater Ora Controlla Ogni Sei Ore

In precedenza, il controllo degli aggiornamenti in Chimera Agent avveniva solo una volta all'avvio, il che significava che se l'app rimaneva aperta, non avrebbe mai rilevato nuove versioni. Questo problema era particolarmente critico per uno strumento come Chimera, progettato per rimanere in esecuzione per periodi prolungati. Di conseguenza, gli utenti dovevano recuperare manualmente gli aggiornamenti dal sito web, annullando lo scopo di un updater automatico.

Con la versione 0.49.2, l'updater ora controlla la disponibilità di nuove versioni ogni sei ore mentre l'app è in esecuzione. Questo cambiamento garantisce che gli utenti siano informati tempestivamente degli aggiornamenti senza bisogno di interventi manuali. Inoltre, l'updater ricorda le versioni rifiutate per tutta la durata del processo, evitando prompt ripetuti per lo stesso aggiornamento a meno che non sia disponibile una versione più recente.

## La Correzione dell'Installer Entra in Vigore

La versione 0.49.1 aveva introdotto una correzione per un problema dell'installer che lasciava file della versione precedente, causando una segnalazione errata della versione dell'app e offrendo aggiornamenti a se stessa. Tuttavia, questa correzione si applicava solo all'installer fornito con quella release, non a quello utilizzato per installarla.

Nella 0.49.2, l'installer riparato viene ora utilizzato per gli aggiornamenti in-place, garantendo che la versione corretta venga segnalata dopo un aggiornamento. Se hai aggiornato alla 0.49.1 e hai riscontrato il problema di segnalazione della versione, questa release lo risolve.

## Ulteriori Miglioramenti

Altri miglioramenti in questa release includono il ritardo nel marcare le release come "latest" fino all'aggiunta del loro manifest, assicurando che l'endpoint dell'updater non restituisca un errore 404 durante il processo di build. Le finestre di errore e la tray ora parlano la lingua dell'utente, mentre le diagnosi tecniche rimangono non tradotte per facilitare la ricerca dei messaggi di errore. Anche le modalità di costo della procedura guidata del primo avvio sono state localizzate, evitando il problema precedente di visualizzare parole in inglese su uno schermo tradotto.

Per un elenco completo delle modifiche, consulta [Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).
