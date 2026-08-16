---
title: "Chimera Agent 0.43.0: LiteLLM Gate Aperta, Registry Emerge e Correzioni Importanti"
date: 2026-08-16
category: update
summary: "Chimera 0.43.0 rimuove restrizioni arbitrarie sui provider, espone impostazioni nascoste e risolve problemi di caricamento documenti e persistenza delle sessioni."
version: "0.43.0"
---

## LiteLLM Gate Ora Accetta Qualsiasi Chiave di Provider

In precedenza, Chimera riconosceva solo cinque provider LiteLLM, rifiutando chiavi valide da servizi come Groq o Mistral con un errore fuorviante "Nessuna chiave di provider configurata". Ora il gate accetta qualsiasi `<PROVIDER>_API_KEY`, con due protezioni:

1. Una denylist impedisce che provider non di modelli (come ElevenLabs o Stability AI) vengano erroneamente identificati come fonti di modelli
2. `doctor` ora valida i nomi dei provider rispetto all'enum di LiteLLM, catturando errori di digitazione che altrimenti fallirebbero silenziosamente

La modifica affronta un problema più profondo: le chiavi inserite in `.env` venivano ignorate silenziosamente a causa dell'impostazione `extra="ignore"` di Pydantic. Poiché `chimera init` crea file `.env` e la documentazione indirizza gli utenti lì, questo causava persistenti fallimenti di configurazione.

## Funzionalità Precedentemente Nascoste Ora Accessibili

Tre capacità significative esistevano nel codice ma mancavano di interfacce utente:

1. **Agent Registry**: La casella della lane del board era un campo di testo libero che indovinava ID di registry mai visualizzati. Ora accessibile tramite la terza scheda di Automation, mostra gli agenti esistenti pur consentendo di assegnare lavoro a ID inesistenti (che rimangono in backlog).
2. **Selezione del Modello Embed**: Precedentemente nascosta, ora appare direttamente sotto l'interruttore della memoria semantica che influenza. I fallimenti degradano silenziosamente alla ricerca lessicale, rendendo cruciale una configurazione visibile.
3. **Key Pools**: Questi ruotavano round-robin con cooldown ma non avevano un'interfaccia. Ora l'interfaccia li gestisce per operazione (aggiungi/rimuovi) senza esporre i valori segreti.

## Correzioni Critiche per Funzionalità Core

Due funzionalità erano state rilasciate difettose nell'app:

- **Caricamento File e Dettatura Messaggi**: Entrambi fallivano con errori 422 perché `authHeaders()` forzava il Content-Type `application/json`, impedendo i corretti confini multipart/form. I test non avevano rilevato questo perché simulavano l'intero strato API.
- **Persistenza della Sessione**: L'app perdeva tema, workspace e impostazioni di lingua all'avvio a causa dell'assegnazione casuale delle porte che cambiava l'origine di `localStorage`. Ora ricorda e riutilizza le porte.

Il wizard di primo avvio gestisce meglio anche la selezione del modello, mostrando (ma non applicando automaticamente) modelli compatibili con il tuo provider per prevenire immediati errori 401.

Aggiorna con `pip install --upgrade chimera-agent` o consulta [Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0) per i dettagli completi.
