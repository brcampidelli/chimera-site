---
title: "Chimera Agent 0.49.0: Dialogo di Aggiornamento Multilingue e Controlli Richiesti dagli Utenti"
date: 2026-09-06
category: update
summary: "Chimera Agent 0.49.0 introduce il supporto multilingue per il dialogo di aggiornamento e aggiunge un'opzione per il controllo manuale degli aggiornamenti nel tray."
version: "0.49.0"
---

## Dialogo di Aggiornamento Multilingue e Controllo Manuale degli Aggiornamenti

Chimera Agent ora parla la tua lingua ovunque, incluso il dialogo di aggiornamento. In precedenza, il dialogo di aggiornamento era solo in inglese, indipendentemente dall'impostazione della lingua dell'applicazione. Questo problema è stato risolto, e ora il dialogo segue la lingua del sistema operativo. Questo cambiamento garantisce che gli utenti che non hanno modificato l'impostazione della lingua dell'app vedranno il dialogo nella lingua del sistema, mentre quelli che l'hanno personalizzata continueranno a vedere il dialogo in inglese.

Inoltre, il tray ora include un'opzione **Controlla aggiornamenti**. Questo è il primo modo per richiedere manualmente un controllo degli aggiornamenti. Il controllo automatico viene eseguito una volta all'avvio e rimane silenzioso se non ci sono aggiornamenti, per evitare di disturbare gli utenti. Tuttavia, questo silenzio potrebbe essere interpretato erroneamente come un fallimento, portando gli utenti a riavviare l'app inutilmente. Con il nuovo controllo manuale, gli utenti possono ora confermare che l'app è aggiornata o ricevere feedback se il controllo fallisce.

## Dialoghi di Errore Tradotti e Diagnostiche Invariate

Il dialogo di aggiornamento non è l'unica parte dell'app che è stata tradotta. Anche i due dialoghi di errore del backend e l'opzione Esci nel tray sono ora disponibili in più lingue. Tuttavia, c'è una chiara distinzione tra ciò che viene tradotto e ciò che non lo è:

> **Ciò che ti dice cosa fare è tradotto. Ciò che va in un report di bug non lo è.**

Ad esempio, se il backend si blocca, il messaggio di errore sarà nella tua lingua, ma il percorso, l'errore del sistema operativo e lo stderr del backend rimarranno nella loro forma originale. Questo garantisce che gli utenti possano ancora cercare e comprendere gli errori di sistema senza confusione.

## Ciò che Rimane Invariato

Questo aggiornamento non cambia il meccanismo di aggiornamento stesso, che è funzionante dalla versione 0.48.0. Il controllo automatico viene ancora eseguito ad ogni avvio, e il processo di installazione rimane avviato dall'utente. Non c'è un controllo periodico mentre l'app è in esecuzione.

Un aspetto controintuitivo rimane: **la versione che ti mostra il dialogo è quella già installata**, non quella offerta. Questo significa che il prompt che ti offre la versione 0.49.0 è generato dalla versione che stai attualmente utilizzando. Dalla versione 0.49.0 in poi, questo prompt sarà nella tua lingua.

Per tutti i dettagli, consulta il [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
