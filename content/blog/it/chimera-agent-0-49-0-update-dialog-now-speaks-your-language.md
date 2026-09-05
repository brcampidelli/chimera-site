---
title: "Chimera Agent 0.49.0: Il Dialogo di Aggiornamento Ora Parla la Tua Lingua"
date: 2026-09-05
category: update
summary: "Chimera Agent 0.49.0 introduce dialoghi di aggiornamento localizzati e un controllo manuale degli aggiornamenti, migliorando l'esperienza utente in dieci lingue."
version: "0.49.0"
---

## Dialogo di Aggiornamento nella Tua Lingua

Chimera Agent ora supporta dialoghi di aggiornamento localizzati in dieci lingue. In precedenza, il dialogo di aggiornamento veniva visualizzato solo in inglese, indipendentemente dalla lingua selezionata all'interno dell'app. Questa incoerenza è stata risolta, garantendo che il dialogo di aggiornamento segua le impostazioni di lingua del sistema operativo. Questo cambiamento è particolarmente utile per gli utenti che si affidano alla lingua predefinita del sistema, poiché il rilevamento della lingua dell'app si basa sullo stesso locale.

Inoltre, il menu nella tray ora include un'opzione **Controlla aggiornamenti**, fornendo agli utenti un modo manuale per verificare la disponibilità di aggiornamenti. Il controllo automatico degli aggiornamenti, che viene eseguito una volta all'avvio, rimane silenzioso quando non ci sono aggiornamenti disponibili per evitare interruzioni non necessarie. Tuttavia, il controllo manuale informa esplicitamente gli utenti se sono aggiornati o se il controllo è fallito, risolvendo il problema precedente in cui il silenzio dopo un clic poteva essere interpretato come un malfunzionamento.

## Dialoghi di Errore e Diagnostica

Anche i dialoghi di errore del backend e l'opzione Esci nella tray sono stati tradotti. Tuttavia, le informazioni diagnostiche rimangono nella lingua originale. Questa distinzione è cruciale: **ciò che ti dice cosa fare è tradotto, ma ciò che va in un report di bug non lo è.** Ad esempio, mentre il messaggio di errore che spiega il problema viene visualizzato nella tua lingua, il percorso, l'errore del sistema operativo e lo stderr del backend rimangono invariati. Questo garantisce che gli utenti possano cercare soluzioni e segnalare bug in modo efficace senza incontrare barriere linguistiche.

## Cosa Rimane Invariato

Questo aggiornamento non modifica il meccanismo di aggiornamento stesso. Il controllo automatico viene ancora eseguito ad ogni avvio, e il processo di installazione rimane avviato dall'utente, richiedendo un consenso esplicito prima di procedere. Non c'è un controllo periodico mentre l'app è in esecuzione. Inoltre, è importante notare che la versione che visualizza il dialogo di aggiornamento è quella attualmente installata, non quella offerta. Ciò significa che il prompt che ti offre la versione 0.49.0 viene generato dalla versione che stai utilizzando.

Per maggiori dettagli, consulta [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
