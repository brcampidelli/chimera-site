---
title: "Chimera Agent 0.44.0: L'applicazione desktop diventa un editor di codice"
date: 2026-08-16
category: update
summary: "L'applicazione desktop di Chimera si trasforma da console per agenti a un editor di codice completo con diagnostica, completamenti inline, ricerca e integrazione di agenti esterni."
version: "0.44.0"
---

## Da console a editor di codice

L'applicazione desktop di Chimera Agent è cambiata radicalmente nella versione 0.44.0. Quello che era principalmente una console per interagire con gli agenti è ora un ambiente completo per la modifica del codice. Questo cambiamento riflette il modo in cui gli utenti lavorano realmente con gli agenti IA - non solo chattando, ma collaborando sul codice.

Sette funzionalità chiave arrivano insieme in questa release. L'editor su `#/edit` utilizza CodeMirror con schede, cronologia undo per file e avvisi quando un agente tenta di modificare un file non salvato su cui stai lavorando. La diagnostica ora proviene da `ruff server`, garantendo che gli avvisi corrispondano a ciò che fallirebbe in CI. L'editor offre completamenti inline da un modello locale, mostrando anteprime in grigio che puoi accettare con Tab o rifiutare con Escape.

## Miglioramenti pratici

La ricerca ora funziona sull'intero workspace, utilizzando ripgrep dove disponibile. Puoi vedere l'utilizzo delle risorse di sistema (CPU, memoria, GPU VRAM) ed eseguire retrieval sul repository con benchmark pre-registrati. Il command runner mantiene la cronologia per progetto tra i riavvii, con terminazione corretta dell'albero dei processi quando lo fermi o chiudi.

Forse la novità più significativa è la possibilità di delegare task di codifica ad agenti esterni come Claude Code o Gemini CLI. Questi si integrano tramite ACP e seguono lo stesso processo di verifica e snapshot/revert dei turni nativi. L'app chiarisce quando gli agenti esterni operano con diversi confini di sicurezza - possono rifiutare i controlli di scrittura file di Chimera, ma resta il safety net di checkpoint/revert.

## Come iniziare

La configurazione rimane semplice. Serve solo una provider key per iniziare, con capacità opzionali chiaramente indicate. Per la diagnostica nell'editor, assicurati che `ruff` sia installato. I completamenti inline richiedono Ollama con il modello specifico `qwen2.5-coder:1.5b-base` (nota il tag base - i modelli instruct non funzionano correttamente). Gli agenti esterni richiedono i rispettivi strumenti CLI.

La release include avvertenze oneste: gli installer non firmati genereranno avvisi di sicurezza, gli agenti esterni hanno diversi confini di sicurezza e il retrieval non è ancora integrato nel flusso principale degli agenti. Il command runner non è un terminale completo - ogni comando esegue in un nuovo processo, quindi stati come `cd` o `export` non persistono.

Per i dettagli completi, inclusi due bug trovati in scenari non testati, consulta il [CHANGELOG][Chimera Agent v0.44.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.44.0). Per provarlo, aggiorna la tua installazione di Chimera Agent ed esplora il nuovo editor su `#/edit`.
