---
title: "Chimera Agent 0.49.3: Errori più chiari, modelli aggiornati"
date: 2026-10-03
category: update
summary: "Sei correzioni per messaggi fuorvianti e impostazioni predefinite obsolete, tutte scoperte costruendo progetti reali con il framework."
version: "0.49.3"
---

## Quando MCP legge scritture bloccate

Leggere dati tramite MCP in precedenza contaminava le esecuzioni senza spiegare perché le scritture fallivano. Il messaggio di errore raggruppava tre scenari distinti: negazione dell'utente, configurazione del proprietario e casi in cui nessun essere umano potrebbe mai approvare una richiesta HTTP. Gli utenti vedevano messaggi di rifiuto identici per tutti e tre, perdendo tempo e budget in tentativi che non potevano funzionare. Ora ogni caso riceve una spiegazione specifica, particolarmente importante nei contesti HTTP dove il messaggio chiarisce che l'approvazione è impossibile e suggerisce di abilitare la pausa per approvazione o di evitare contenuti non attendibili.

## Test che testano davvero

Il pulsante di test MCP in precedenza verificava la connettività del server nascondendo silenziosamente se gli agenti potevano effettivamente utilizzare quegli strumenti. Un server poteva superare il test mentre i suoi strumenti rimanevano inaccessibili agli agenti (quando il caricamento dei server MCP all'avvio era disabilitato). Ora il test riporta sia la connettività che l'effettiva disponibilità, con messaggi distinti che spiegano come risolvere ogni potenziale problema.

## Verifica vs. Consegna

La verifica dell'esecuzione mostrava `verified: True` senza indicare se i file correnti corrispondevano a quelli verificati. Un'esecuzione verificata poteva successivamente contenere contenuti completamente diversi (20/20 test falliti in un caso osservato) senza alcuna indicazione visiva. Ora le esecuzioni tengono traccia di `delivered_matches_verified` e mostrano badge chiari quando i contenuti del disco divergono dallo stato verificato.

## Modelli predefiniti aggiornati

La selezione predefinita dei modelli era rimasta indietro rispetto alle offerte attuali:
- Il modello base è cambiato da `deepseek-chat-v3.1` (0.25/0.95) a `deepseek-v4-flash-0731` (0.065/0.18)
- Il modello di fascia alta ha sostituito `deepseek-r1` con `z-ai/glm-5.3`
- I giudici di fusione e i seggi del panel sono stati aggiornati ai modelli della generazione corrente

Queste modifiche riflettono miglioramenti misurati in termini di prezzo, dimensione della finestra di contesto e benchmark di terze parti, non affermazioni di qualità non verificate. L'aggiornamento rimuove inoltre i modelli in anteprima dalle posizioni predefinite dove gli utenti non li avevano scelti esplicitamente.

## Altre correzioni
- Gli errori di installazione delle skill ora identificano correttamente quale host ha rifiutato la richiesta
- Le autorizzazioni di scrittura per i percorsi assoluti mostrano confronti chiari rispetto ai pattern glob relativi al workspace
- `.env.example` non suggerisce più modelli deprecati o prezzi errati

Aggiorna con `pip install --upgrade chimera-agent` o consulta [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3) per i dettagli completi.
