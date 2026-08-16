---
title: "Chimera Agent 0.45.0: Governance, Pricing, e Fix di Sicurezza per Esecuzioni Non Supervisionate"
date: 2026-08-16
category: update
summary: "Questa release rafforza l'esecuzione non supervisionata con autenticazione obbligatoria, limiti di spesa e governance unificata su tutte le superfici."
version: "0.45.0"
---

## Sicurezza Prima di Tutto: Binding e Autenticazione

Le versioni precedenti di Chimera Agent esponevano un gateway non autenticato su tutte le interfacce di rete per impostazione predefinita. Il `docker-compose.yml` pubblicava la porta 8765 globalmente, e `.env.example` veniva fornito senza token impostato. Ciò significava che un deployment con un solo comando poteva creare involontariamente un gateway aperto accessibile a chiunque scoprisse la porta.

v0.45.0 cambia questo in tre modi:
- Il comando `serve` ora rifiuta di eseguire il binding su indirizzi non loopback senza un token di autenticazione
- Docker Compose ora pubblica solo su `127.0.0.1` per default
- È stata aggiunta un'opzione esplicita `--allow-insecure-bind` per casi legittimi (come proxy autenticati)

Questo è un cambiamento breaking per i deployment che accedono al gateway da un'altra macchina. Impostare `CHIMERA_SERVER_TOKEN` o usare l'escape hatch se necessario.

## Controllo della Spesa che Funziona Davvero

Prima di questa release, gli unici limiti erano i contatori di step - un job in un loop di ritentativi poteva consumare l'intero saldo del provider. v0.45.0 introduce tre limiti di spesa separati:
1. Limite per singola esecuzione
2. Limite per job (per task schedulati)
3. Limite giornaliero aggregato che blocca l'esecuzione di cron job

Le chiamate senza prezzo ora interrompono l'esecuzione invece di continuare silenziosamente. I modelli locali sono considerati a costo zero invece che sconosciuti, evitando che i limiti blocchino l'unica configurazione che non può sovraspendere. Eseguire `chimera doctor` per verificare se il modello predefinito può essere prezzato prima di impostare i limiti.

## Governance Unificata su Tutte le Superfici

In precedenza, ogni superficie di esecuzione (`serve`, cron, MCP, A2A e adattatori di messaggistica) costruiva il proprio registro di strumenti. Ora un singolo `governed_profile()` costruisce lo stack per tutti e cinque, con controlli AST a tempo di build che prevengono regressioni.

L'idea chiave: la modalità `CHIMERA_GOVERNANCE=observe` esiste per misurare il costo dell'applicazione prima di abilitarla. Esegue l'intero stack registrando solo ciò che verrebbe bloccato, fornendo dati concreti invece di forzare un rischio in produzione. Il default rimane `off` - la governance deve essere un opt-in esplicito.

Questa release implementa anche il sistema di approvazione per chiamate di classe pericolosa, eliminando falsi positivi senza ridurre l'efficacia del blocco degli attacchi.

## Prossimi Passi

Aggiornare con `pip install --upgrade chimera-agent` e verificare le impostazioni di autenticazione e limiti di spesa del proprio deployment. Per l'integrazione con l'editor, puntare le impostazioni dell'agente a `chimera acp --workspace <repo>`. Dettagli completi nelle [note di release][Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
