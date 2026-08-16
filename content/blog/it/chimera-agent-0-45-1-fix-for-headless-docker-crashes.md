---
title: "Chimera Agent 0.45.1: Correzione per i crash di Docker in modalità headless"
date: 2026-08-16
category: update
summary: "La versione 0.45.1 risolve un problema critico all'avvio di Docker dove i container headless crashavano a causa di una dipendenza non necessaria da FastAPI."
version: "0.45.1"
---

## Perché i container Docker crashavano all'avvio

Chimera Agent 0.45.0 introduceva un fallimento silenzioso per i deployment Docker headless. L'immagine del container installava `.[full]` senza l'extra `desktop`, che esclude intenzionalmente FastAPI. Tuttavia, il percorso cron ha iniziato a importare `chimera.api.usage`, attivando l'inizializzazione eager del modulo API. Questo ha incluso FastAPI come dipendenza indiretta attraverso un lettore JSONL, causando crash-loop nei container con `ModuleNotFoundError`.

Il bug è sfuggito al rilevamento perché:
1. Gli ambienti di sviluppo tipicamente hanno FastAPI installato
2. Nessuno dei 2.945 test esistenti simulava un'installazione pulita di `.[full]`
3. Il fallimento si manifestava solo nei deployment di produzione

## Caricamento lazy per le dipendenze core

La correzione affronta la causa radice invece di mascherare i sintomi. Aggiungere `desktop` all'immagine avrebbe funzionato, ma avrebbe violato lo scopo documentato dell'extra ("la CLI/gateway core non ne ha mai bisogno") e aumentato inutilmente la dimensione dell'immagine.

La v0.45.1 modifica `chimera/api/__init__.py` per:
- Risolvere le riesportazioni in modo lazy invece che eager
- Mantenere le dipendenze FastAPI isolate ai componenti web-specifici
- Conservare modalità di fallimento chiare quando `desktop` è effettivamente richiesto

Cinque moduli leaf (`usage`, `roles`, `sessions`, `posture` e `config_api`) non includono più implicitamente lo stack web quando importati da operazioni CLI. Il gateway rimane funzionante con la sola installazione di `.[full]`.

## Nuova rete di sicurezza

Un test subprocess ora verifica che le importazioni funzionino senza FastAPI disponibile. Questo avrebbe individuato il problema prima del rilascio:
1. Eseguendo in un ambiente dove `fastapi` è reso deliberatamente non importabile
2. Verificando la funzionalità core prima di procedere con altri controlli
3. Rispecchiando le condizioni effettive di deployment

La verifica end-to-end conferma la correzione: una installazione pulita di `.[full]` può ora eseguire `serve --cron` senza crash.

Aggiornare con `pip install -U chimera-agent==0.45.1`. Per verificare il deployment, testare il container con `serve --cron` e controllare i messaggi di inizializzazione del gateway. [Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) contiene i dettagli tecnici completi sulle modifiche.
