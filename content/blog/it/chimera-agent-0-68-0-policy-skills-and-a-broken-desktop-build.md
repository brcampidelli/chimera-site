---
title: "Chimera Agent 0.68.0: policy, skills e una build desktop rotta"
date: 2026-10-17
category: update
summary: "0.68.0 aggiunge policy deny a livello di owner, scoperta locale di skill, comandi prompt di progetto e molto altro — ma non installate l'app desktop; usate la v0.67.4 fino alla 0.68.1."
version: "0.68.0"
---

La notizia principale per la 0.68.0 non è una funzionalità. È un avvertimento: **non installate questa release.** Il backend dell'app desktop non si avvia perché il freeze di PyInstaller ha escluso `chimera.cli.commands.apilogs`, che la CLI importa per nome. Il pacchetto PyPI non è interessato. Se usate l'app desktop, restate sulla v0.67.4 finché non esce la v0.68.1. Il resto di questo post copre ciò che è effettivamente cambiato per chi costruisce agenti.

## La policy dell'owner passa da blocchi per singolo tool a regole solo-deny

Prima di questa release, limitare ciò che un agente poteva toccare significava combinare variabili d'ambiente come `CHIMERA_TOOL_DENYLIST` con regole per progetto. Funzionava per i singoli tool, ma non dava all'owner di un'installazione un unico punto in cui dire "questo provider non gira mai qui" o "questo server MCP non si connette mai."

La 0.68.0 aggiunge `<CHIMERA_HOME>/policy.json` — o il file indicato da `CHIMERA_POLICY_FILE`. Le regole sono solo-deny e ordinate. Potete negare un provider, un'integrazione (`mcp:<nome>`, `skill:<nome>`) o un tool. Un provider negato sparisce dalle liste dei modelli e dalla scala dei tier, e le sue chiamate vengono rifiutate. Un server MCP negato non si connette mai. Una skill negata non viene mai caricata. Un tool negato viene rifiutato al registro.

La regola d'oro conta: un `allow` successivo annulla solo un `deny` precedente nello stesso file. Non riapre mai `CHIMERA_TOOL_DENYLIST`, il reach floor o un blocco del kernel. Un file di policy non valido ferma `serve`, `chat`, `assist`, `tui` e `acp`, e fa fallire `doctor`. L'app desktop parte ma rifiuta ogni tool finché il file non viene corretto. I tool di scrittura dell'agente non possono scrivere il file di policy.

Questo è un modello diverso dalle regole per progetto. È a livello di owner, per tutta l'installazione, e non può essere aggirato da un prompt furbo o da un file di progetto. Per chiunque gestisca una macchina condivisa o una flotta di agenti, questo è il cambiamento che conta.

## Skill, comandi prompt e domande limitate

Le Local Agent Skill vengono ora scoperte come bundle revisionabili. Le skill trovate negli alberi `.claude/skills` e `.agents/skills` di workspace e utente vengono importate attraverso il percorso di upload limitato. Restano pending e tainted finché non vengono approvate, e tornano pending quando il loro manifest cambia. L'API riporta la sorgente vincente e le collisioni. Questo significa che una skill non è considerata attendibile solo perché sta in una cartella.

I comandi prompt Markdown di progetto e globali funzionano allo stesso modo. La chat da terminale e la TUI scoprono template con namespace in `.chimera/commands/` e `<CHIMERA_HOME>/commands/`. I template espandono `$ARGUMENTS` e `$1` in testo normale del messaggio. Il contenuto del template non viene mai eseguito. Questo dà ai progetti un modo per distribuire prompt ripetibili senza concedere al template alcun potere di esecuzione.

L'agente Code può ora porre all'utente una domanda limitata. `ask_user` mette in pausa un turno Code assistito per una risposta a scelta o a testo libero, restituisce un risultato esplicito di nessuna risposta al timeout, e rimane un tipo distinto solo-dati che non può approvare un'azione governata. I turni da terminale, bot e non presidiati non lo registrano. Questo chiude una lacuna: prima, un turno Code che necessitava di una decisione dell'utente non aveva un modo strutturato per fermarsi e chiedere.

## Cosa fare ora

Se usate l'app desktop, non aggiornate. Restate sulla v0.67.4. Se usate il pacchetto PyPI, potete installare la 0.68.0 e iniziare con il file di policy: create `<CHIMERA_HOME>/policy.json`, scrivete le vostre regole deny, ed eseguite `chimera policy show` per vedere le regole in vigore. Le note di rilascio complete sono su [Chimera Agent v0.68.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.68.0).
