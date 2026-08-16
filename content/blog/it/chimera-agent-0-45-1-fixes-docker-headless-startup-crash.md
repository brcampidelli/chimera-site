---
title: "Chimera Agent 0.45.1 risolve il crash all'avvio di Docker headless"
date: 2026-08-16
category: update
summary: "La versione 0.45.1 risolve un problema critico nelle distribuzioni Docker, dove le istanze headless non riuscivano a partire a causa di una catena di import eager di FastAPI."
version: "0.45.1"
---

## Le distribuzioni Docker non si bloccano più all'avvio

Chimera Agent 0.45.0 ha introdotto un problema di regressione in cui i container Docker headless che eseguivano il servizio gateway si bloccavano immediatamente all'avvio. Il problema si verificava perché il percorso cron iniziava a importare `chimera.api.usage`, il quale attivava un import eager delle dipendenze di FastAPI - nonostante l'immagine Docker non includesse intenzionalmente l'extra `desktop`.

Questo non è stato rilevato durante i test perché gli ambienti di sviluppo hanno tipicamente FastAPI installato. I 2.945 test esistenti sono tutti passati poiché venivano eseguiti in ambienti dove la dipendenza era già presente. Il fallimento si è manifestato solo nelle distribuzioni di produzione che utilizzavano l'installazione lean `.[full]`.

## Gli import lazy prevengono dipendenze nascoste

La correzione affronta la causa principale invece di aggiungere semplicemente le dipendenze mancanti. In precedenza, cinque moduli foglia raggiungibili dalla CLI in `chimera/api` stavano silenziosamente includendo l'intero stack web attraverso re-export eager in `__init__.py`. La versione 0.45.1 rende questi import lazy, quindi vengono caricati solo quando effettivamente necessari per i componenti web.

Questo mantiene la separazione documentata per cui il core CLI/gateway non dovrebbe richiedere dipendenze web, garantendo comunque che `chimera app` fallisca chiaramente quando FastAPI è mancante per casi d'uso web legittimi.

## Un nuovo test previene la regressione

Un test dedicato ora verifica questo comportamento eseguendosi in un subprocesso dove `fastapi` è deliberatamente reso non importabile. Il test conferma prima che questa configurazione dell'ambiente funzioni prima di procedere con altre asserzioni - catturando i casi in cui i test passerebbero silenziosamente a causa di contaminazione ambientale.

La correzione è stata verificata end-to-end con installazioni pulite di `.[full]`. Le distribuzioni Docker headless possono ora eseguire `serve --cron` come previsto.

Per le distribuzioni esistenti colpite da questo problema, aggiornate alla versione 0.45.1. Le [note di rilascio][Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) contengono tutti i dettagli sui cambiamenti rispetto alla versione 0.45.0.
