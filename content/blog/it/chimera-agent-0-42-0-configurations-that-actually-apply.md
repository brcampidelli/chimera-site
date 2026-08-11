---
title: "Chimera Agent 0.42.0: Configurazioni che Effettivamente si Applicano"
date: 2026-08-11
category: update
summary: "Corretti sette parametri che venivano salvati senza modificare il comportamento, unificati i controlli di sicurezza e resi gli agenti configurabili anziché accettare i default."
version: "0.42.0"
---

## Impostazioni che Ora si Applicano

Sette configurazioni precedentemente salvate senza effetto—modello predefinito, caching delle risposte, endpoint personalizzato, timeout, catena di fallback e caching dei prompt. Il `LLMGateway` acquisiva le impostazioni alla costruzione, ma `chimera app` lo ricostruiva una volta per processo. Sei ora si aggiornano in tempo reale. Tre (cascata, persistenza chat, memoria chat) si applicano alla **prossima conversazione** e lo dichiarano. Due che richiedono riavvio (demone scheduler e caricamento automatico MCP) lo indicano. Le etichette ora provengono dal server, evitando disallineamenti silenziosi.

## Controlli di Sicurezza Unificati

`CHIMERA_TOOL_ALLOWLIST` e `CHIMERA_TOOL_DENYLIST` precedentemente influenzavano solo `chimera run` e `chimera solve`. Altre interfacce (app, API, job batch, bot di messaggistica) le ignoravano completamente. Ora si applicano ovunque. I dinieghi **si combinano**—restrizioni di deployment, richiesta e postura devono tutte consentire uno strumento. I permessi **si intersecano**, impedendo alle richieste di elevarsi oltre lo scope del mittente. Corretto `explore_repository` che bypassava i filtri per registrazione tardiva.

## Identità e Istruzioni dell'Agente

Nome agente, lingua e istruzioni permanenti erano precedentemente non funzionali. `profile.json` non veniva letto dall'API, i fatti della persona si applicavano solo se rilevanti per un turno, e lo spazio preamble incondizionato era riservato per compatibilità REPL/OpenAI. Ora si applicano a modifica codice, esecuzione autonoma e messaggistica. Le istruzioni **si appendono**—i prompt predefiniti mantengono le guardie di sicurezza, e i blocchi personalizzati avvisano quando non concedono capacità.

## Postura di Deployment come Base

Scope di esecuzione, requisiti di approvazione e permessi per comandi host erano sparsi tra componenti eliminati, coppie hardcoded e una var d'ambiente rifiutata da `PATCH /api/config`. Ora consolidati in una singola scheda. La postura di deployment è una **base**, non un default—i client non possono silenziosamente sovrascrivere restrizioni su macchine che non controllano. L'esecuzione host richiede conferma esplicita.

## Cosa Fare Ora

Esegui `chimera app update` e consulta [Chimera Agent v0.42.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.42.0) per dettagli su agenti a livello progetto, correzioni di audit sicurezza e attivazione schede abilità.
