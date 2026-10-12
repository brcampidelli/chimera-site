---
title: "Chimera Agent 0.65.0: Pairing, Scadenze e Garanzie sulla Sandbox"
date: 2026-10-12
category: update
summary: "I bot ora si accoppiano in modo sicuro al primo avvio, il fallback della sandbox è stato rimosso, i turni hanno una scadenza e i modelli Ollama leggono l'intero prompt."
version: "0.65.0"
---

## Il primo avvio accoppia il bot, non la stanza

Prima di questo rilascio, l'app desktop chiedeva "è una nuova installazione?" sulla scheda Messaging quando la cartella dati era già popolata. Questo significava che ogni bot avviato dall'app girava aperto, rispondendo a chiunque lo raggiungesse, usando gli strumenti e il budget del proprietario. Un codice di pairing, se generato, finiva in una console che nessuno legge.

L'app ora registra quali bot erano già configurati all'avvio. Quei bot continuano a rispondere come prima. Un bot configurato dopo quel momento parte in pairing, e il suo codice appare sulla scheda Messaging, dove qualcuno guarda davvero. L'API riflette questo comportamento: `GET /api/messaging` riporta gli stati `pairing_code`, `pairing` e `open`. Il bridge desktop vede `pairing` ma mai il codice stesso, quindi l'automazione non può bypassare il passaggio umano.

## Una sandbox che non può essere eseguita si rifiuta di farlo

Impostare `CHIMERA_SANDBOX=docker` senza un demone Docker attivo prima causava un fallback sull'host con una singola riga di log. Un comando che avrebbe dovuto essere isolato veniva eseguito direttamente sulla macchina. Quel fallback è stato rimosso. Ora `run_shell`, `execute_code` e i passi del workflow si rifiutano ancor prima di porsi il problema dell'esecuzione sull'host. Il messaggio di rifiuto spiega cosa è successo, che non è stato eseguito nulla, e le due vie d'uscita: avviare Docker o impostare `CHIMERA_SANDBOX=local`. Il verificatore si astiene invece di annullare il lavoro perché un demone era spento.

Un chiamante che passa esplicitamente `fallback=` mantiene il vecchio comportamento. Tutti gli altri ricevono uno stop forzato. Lo stesso confine si applica ai media in ingresso: i download da Telegram e WhatsApp ora si fermano al limite di 20 MB prima del primo byte, quando la dimensione è dichiarata, invece di leggere l'intero file in memoria e misurarlo dopo.

## Le scadenze raggiungono la banda di governance

Una decisione ora può avere una scadenza, e mancarla spinge la banda REVIEW verso un controllo più severo. `DecisionSpec.deadline_s` ne dichiara una per decisione; `Decider.decide(..., deadline_s=)` la sovrascrive per singola chiamata. Una risposta non arrivata in tempo si ferma con `deadline_missed` sulla ricevuta e nel log delle decisioni, così che le mancanze diventino misurabili.

Con `CHIMERA_GOVERNANCE_BAND_DEADLINE_S` impostato, una mancanza produce una scheda REVIEW con `band: deadline`—mai ALLOW. Una risposta in ritardo non viene mai messa in cache né applicata a posteriori. Questa funzione è disattivata per impostazione predefinita, e il nuovo pannello Impostazioni › Generali › Governance e audit la espone insieme ad altri cinque controlli opzionali che prima erano raggiungibili solo tramite `.env` o potevano essere salvati ma non letti. `GET /api/config` li riporta in un blocco `governance_audit`. Cancellare la scadenza non lascia più un'app che non può avviarsi: un valore vuoto ora viene letto come nessuna scadenza.

## I modelli Ollama leggono l'intero prompt

Le chiamate ai modelli `ollama_chat/` o `ollama/` non specificavano mai una finestra di contesto, quindi Ollama usava il suo default di macchina—4.096 token nel caso che ha fatto emergere il problema. Ogni prompt più lungo veniva tagliato a circa la metà di quella dimensione, in silenzio. La prima richiesta di un'esecuzione `chimera solve`, circa 20.500 caratteri, veniva letta come 2.050 token, e il modello non vedeva mai il task.

Ogni percorso del gateway ora invia `num_ctx` solo alle route Ollama, attingendo da `CHIMERA_OLLAMA_NUM_CTX` (default 32.768; impostare a `0` per mantenere il default del server). Il budget di compattazione di un modello Ollama è dimensionato a partire da quella finestra invece del fallback di 128.000 token. Una risposta il cui conteggio dei prompt mostra un taglio registra un avviso `PROMPT TRUNCATED` invece di passare in silenzio. I provider ospitati non subiscono modifiche.

## Cosa fare ora

Aggiorna con `pip install chimera-agent==0.65.0`. Se usi l'app desktop, riavviala e controlla la scheda Messaging per ogni bot che necessita di pairing. Se usi `CHIMERA_SANDBOX=docker`, verifica che il demone sia in esecuzione o passa a `local`. Se chiami modelli Ollama, imposta `CHIMERA_OLLAMA_NUM_CTX` per adattarlo alla finestra del tuo modello. Le note di rilascio complete sono su [Chimera Agent v0.65.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.65.0).
