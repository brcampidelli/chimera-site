---
title: "Chimera Agent 0.48.1: Correzioni per la Modalità Approvazione, Esecuzione dei Task e Altro"
date: 2026-09-03
category: update
summary: "Chimera Agent 0.48.1 risolve problemi critici relativi alla modalità approvazione, esecuzione dei task e report dei costi, garantendo un funzionamento più fluido e una migliore sicurezza."
version: "0.48.1"
---

## La Modalità Approvazione Ora Funziona Come Previsto

L'impostazione `CHIMERA_APPROVAL_MODE=allow` ora funziona correttamente su tutte le superfici, inclusa l'app desktop e `chimera serve`. In precedenza, questa impostazione funzionava solo su `solve` e `crew`, lasciando molti utenti con rifiuti inaspettati. Questa correzione garantisce che gli strumenti pericolosi non vengano più bloccati durante la lettura di contenuti non attendibili, allineandosi all'intento originale dell'impostazione. I benchmark mostrano che, con un approvatore, il sistema blocca l'85,7% degli attacchi consentendo tutto il lavoro legittimo, un miglioramento significativo rispetto al precedente tasso di rifiuto del 50% per i task legittimi.

## Schermata Unificata per l'Esecuzione dei Task

La schermata Work è stata semplificata per ridurre la ridondanza e migliorare l'usabilità. In precedenza, gli utenti dovevano scegliere tra quattro diversi moduli per eseguire i task, ciascuno dei quali richiedeva gli stessi input. Ciò portava a inefficienze e frustrazione, poiché provare un metodo diverso significava riscrivere il task. Ora, una singola schermata con quattro pulsanti gestisce tutte le modalità di esecuzione dei task, semplificando il processo e riducendo il numero di schede da cinque a quattro. Questo cambiamento garantisce anche che task e controlli siano coerenti tra le modalità, mentre tentativi, ruoli e slot dei worker rimangono specifici per ciascuna modalità.

## Principali Correzioni e Aggiunte

- **Le Variabili Vuote Non Bloccano Più l'App:** Una variabile `CHIMERA_GUARD_CHAT` vuota nel file `.env` in precedenza impediva l'avvio dell'app. Questo è stato risolto, con i valori vuoti ora trattati come non impostati anziché causare un blocco.
- **Misuratore di Costi per Modelli Costosi:** Il misuratore di costi ora riporta correttamente i costi per tutti i modelli, inclusi quelli costosi come `claude-opus-5` e `gpt-5.5`. In precedenza, questi modelli mostravano costi sconosciuti a causa di una chiamata di funzione mancante.
- **Anello di Focus per i Pulsanti:** Il componente Button ora adotta correttamente l'anello di focus condiviso, risolvendo un'incongruenza visiva.

## Nuova Funzionalità: Caricamento Differito degli Strumenti

È stata aggiunta l'impostazione `CHIMERA_DEFER_TOOLS` per ridurre l'uso di token posticipando il caricamento degli schemi degli strumenti fino a quando non sono necessari. I benchmark mostrano una riduzione del 26% del costo per task completato, sebbene l'impatto sui tassi di completamento dei task rimanga inconcludente. Questa impostazione è disattivata per impostazione predefinita a causa dei risultati contrastanti.

## Cosa Fare Ora

Aggiorna a Chimera Agent 0.48.1 per sfruttare queste correzioni e miglioramenti. Per i dettagli sulle note di rilascio, visita [Chimera Agent v0.48.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.1).
