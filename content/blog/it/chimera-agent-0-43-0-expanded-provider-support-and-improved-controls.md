---
title: "Chimera Agent 0.43.0: Supporto Esteso ai Provider e Controlli Migliorati"
date: 2026-08-16
category: update
summary: "Chimera Agent 0.43.0 introduce un supporto più ampio ai provider tramite LiteLLM, nuovi controlli nell'interfaccia utente per impostazioni precedentemente nascoste e correzioni per l'allegazione di documenti e la persistenza del tema."
version: "0.43.0"
---

## Supporto Esteso ai Provider con LiteLLM

Chimera Agent ora si integra completamente con LiteLLM, consentendo agli utenti di connettersi a qualsiasi provider supportato da LiteLLM. In precedenza, solo cinque provider erano riconosciuti, lasciando gli utenti con chiavi per vendor come Groq o Mistral impossibilitati a procedere. L'aggiornamento garantisce che qualsiasi `<PROVIDER>_API_KEY` venga accettata, con una lista nera per escludere provider che non sono modelli, come ElevenLabs e Stability. Inoltre, `doctor` ora segnala i nomi dei provider non riconosciuti, aiutando gli utenti a evitare errori di battitura che potrebbero simulare provider validi.

## Controlli Migliorati nell'Interfaccia Utente

Tre impostazioni precedentemente accessibili solo tramite file `.env` sono ora disponibili nell'interfaccia utente: il modello di embedding, l'URL base di Ollama e i pool di chiavi. L'impostazione del modello di embedding è ora direttamente collegata all'interruttore della memoria semantica, garantendo che gli utenti possano configurarla senza fallimenti silenziosi. I pool di chiavi sono gestiti tramite operazioni (aggiungi/rimuovi) piuttosto che tramite modifica diretta, mantenendo la sicurezza evitando la visualizzazione di informazioni sensibili.

## Correzioni e Miglioramenti

Allegare documenti e dettare messaggi ora funziona correttamente, risolvendo un errore 422 causato da intestazioni Content-Type errate. L'app mantiene inoltre il tema, l'area di lavoro, l'elenco dei progetti e la lingua tra i lanci, risolvendo un problema in cui queste impostazioni venivano perse a causa di cambiamenti di porta.

Per esplorare questi aggiornamenti, consulta le [note di rilascio][Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0).
