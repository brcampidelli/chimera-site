---
title: "Chimera Agent 0.46.0: Regole che si applicano accanto"
date: 2026-08-17
category: update
summary: "Risolti perdite di dati silenziose, schede di abilità non tradotte e controlli che non controllavano — più una libreria di 23 schede di abilità derivate da incidenti."
version: "0.46.0"
---

## Quando le regole non arrivano

Cinque archivi JSON, incluso lo store delle abilità, permettevano a processi concorrenti di sovrascriversi a vicenda senza segnalarlo. Un'esecuzione che aveva appreso qualcosa poteva vedersi cancellare la memoria dalla successiva. Tutti e cinque ora bloccano e scrivono in modo atomico — nessuna configurazione richiesta. Lo stesso pattern ha risolto funzionalità di governance che crashavano all'import e un bot Discord che eseguiva senza controlli.

## Schede di abilità come report di incidenti

Ventitré schede sono ora disponibili in `skills/`, tredici scritte a partire da difetti di questo progetto. Ogni scheda documenta una modalità di fallimento nel formato Trigger/Fare/Evitare/Controllare/Rischio — dati, non codice. Sono raggruppate per fase del workflow (`define · build · verify · review · ship`) e taggate per argomento. Importane una con:

```
chimera skills-import skills/verify-before-claiming
```

Le schede supportano nove lingue tramite file sidecar che preservano l'hash SHA-256 originale. Il sistema rileva traduzioni obsolete (che pretendono di tradurre testo modificato) e incomplete (mancanti di sezioni), ma permette traduzioni mancanti con etichettatura chiara.

## Controlli che effettivamente controllano

Tre difetti degli agenti compromettevano componenti critici senza far fallire i test. La causa principale: i controlli elencavano comportamenti richiesti invece di eccezioni permesse. Quando apparivano nuovi comportamenti, i controlli rimanevano aperti. Ora elencano eccezioni — se qualcosa non è esplicitamente permesso bypassare i controlli, viene controllato.

Sedici affermazioni nella documentazione sono state corrette in dieci lingue. Cinque erano completamente false: le modalità di governance non includono `ask`, la rail desktop non ha destinazione di chat, e `CHIMERA_TAVILY_API_KEY` non esiste nel codice. Due affermazioni ottimistiche ora riportano evidenze contrarie accanto.

```
pip install -U chimera-agent
```

Esplora le schede su chimeraagent.space/skills [Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0) o controlla `bench/skillcard/RESULTS.md` per il tradeoff prestazionale opzionale.
