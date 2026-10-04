---
title: "Chimera Agent 0.49.3: Correzioni per l'uso nel mondo reale"
date: 2026-10-04
category: update
summary: "La versione 0.49.3 risolve problemi critici riscontrati durante l'uso reale, migliorando chiarezza, affidabilità ed efficienza dei costi."
version: "0.49.3"
---

## Messaggi di errore più chiari per le operazioni MCP

Uno dei problemi più costosi nelle versioni precedenti riguardava la lettura dei dati MCP. Quando un'esecuzione era compromessa da contenuti non attendibili, il messaggio di errore era ambiguo, portando gli utenti a riprovare più volte senza successo. Ciò causava spese inutili e frustrazione. Ora, i messaggi di errore sono specifici per ogni scenario, indicando chiaramente se un nuovo tentativo può aiutare e suggerendo alternative praticabili come l'uso dell'opzione pause-for-approval o l'evitare del tutto contenuti non attendibili.

## Test migliorati per i server MCP

Il pulsante Test MCP in precedenza verificava solo la connettività del server, lasciando gli utenti all'oscuro sul fatto che l'agente potesse effettivamente utilizzarlo. Ciò portava a perdite di tempo e risorse quando le esecuzioni fallivano per server non caricati. Ora il pulsante Test segnala esplicitamente se l'agente può usare il server, fornendo messaggi diversi per cause diverse e guidando gli utenti nella risoluzione del problema.

## Stato di verifica più accurato

In passato, le esecuzioni riportavano `verified: True` basandosi su un'istantanea momentanea, che poteva essere fuorviante se i file venivano modificati successivamente. Ora, le esecuzioni includono un flag `delivered_matches_verified`, e la lista delle esecuzioni mostra un badge quando i file su disco non corrispondono più allo stato verificato. Ciò garantisce che gli utenti siano consapevoli delle discrepanze e possano agire di conseguenza.

## Errori corretti nell'installazione degli skill

In precedenza, i fallimenti nell'installazione degli skill erano attribuiti al limite orario di GitHub per i download anonimi, anche quando non era il problema reale. Ora i messaggi di errore identificano correttamente l'host che ha rifiutato la richiesta e assicurano che il token raggiunga entrambi gli host. Inoltre, gli errori 429 vengono ritentati rispettando il tempo di attesa specificato dal server, riducendo i tentativi inutili.

## Rifiuti più precisi nella scrittura dei file

La scrittura dei file veniva talvolta rifiutata con messaggi fuorvianti che confrontavano directory invece di percorsi. Ciò causava l'esaurimento del budget dell'agente in tentativi ripetuti. Ora i messaggi di rifiuto descrivono accuratamente il confronto tra percorsi e spiegano il pattern dei glob relativi all'area di lavoro, evitando confusione e tentativi inutili.

## Aggiornamento dei modelli predefiniti

I modelli predefiniti erano obsoleti, con alcuni modelli una generazione indietro e altri a rischio di ritiro. Le impostazioni predefinite sono state aggiornate a modelli più recenti e stabili, garantendo prestazioni e affidabilità migliori. Inoltre, `.env.example` non imposta più valori predefiniti significativamente più costosi o che includono modelli ritirati.

Queste modifiche si basano sull'uso reale e mirano a migliorare l'esperienza utente affrontando i problemi più comuni. Per i dettagli completi, consulta [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
