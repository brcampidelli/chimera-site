---
title: "Chimera Agent 0.48.0: Sicurezza Migliorata e Default Aggiornati"
date: 2026-09-02
category: update
summary: "Chimera Agent 0.48.0 introduce importanti miglioramenti alla sicurezza e modifiche ai default, con un focus sull'isolamento della sandbox e sulla selezione di modelli più economici."
version: "0.48.0"
---

## Isolamento Migliorato della Sandbox

L'impostazione predefinita della sandbox è stata aggiornata per dare priorità alla sicurezza. In precedenza, la sandbox `local` non era isolata, affidandosi a kernel di governance e prompt di conferma per proteggere la macchina. Questo approccio presentava vulnerabilità, specialmente quando gli utenti bypassavano i prompt o quando venivano iniettate istruzioni. Ora, il default è `auto`, che utilizza **Seatbelt** su macOS con un profilo `(deny default)` e **bubblewrap** su Linux con parametri di isolamento rigorosi. Questo garantisce l'isolamento della rete e limita le scritture alla directory di lavoro e alla directory temporanea, riducendo significativamente i rischi potenziali.

## Considerazioni su Windows e Kernel Linux

Per Windows, l'aggiornamento dichiara esplicitamente che non viene fornito alcun meccanismo di sandbox. I filtri di rete e i token limitati esistenti non vengono approssimati, poiché un confine mancante è meno pericoloso di uno creduto erroneamente sicuro. Allo stesso modo, i kernel Linux che rifiutano i namespace utente non privilegiati segnaleranno la sandbox come *non disponibile*, garantendo trasparenza sulle limitazioni di sicurezza.

## Modello Predefinito Più Economico

Il modello predefinito è stato cambiato da GPT-5.5 a DeepSeek V3.1. Questo cambiamento affronta l'alto costo associato al modello precedente, che era il più costoso nel catalogo. DeepSeek V3.1 offre un'opzione più economica a $0.25/$0.95 per 1M di token rispetto a $5.00/$30.00 di GPT-5.5. La variabile d'ambiente `CHIMERA_DEFAULT_MODEL` ha ancora la precedenza, e il selettore di modelli permette modifiche per ogni conversazione.

## Miglioramenti Guidati da Audit

Un audit estensivo ha identificato numerose raccomandazioni, con il 56% del lavoro focalizzato sul cablaggio piuttosto che sulle funzionalità del prodotto. Questa release affronta molti di questi problemi, garantendo che il codice funzioni correttamente e che i log siano precisi. Le correzioni degne di nota includono la gestione corretta degli strumenti rifiutati, la rimozione dei cron job falliti e la protezione delle stringhe che trasportano credenziali. Ogni correzione è stata rigorosamente testata revertendo le modifiche e assicurandosi che i test individuassero i difetti.

## Nuove Funzionalità e Miglioramenti

Le nuove funzionalità includono le credenziali memorizzate nel keychain del sistema operativo (`chimera secrets`), un meccanismo di approvazione delle decisioni (`chimera approve`) e turni di codifica che sopravvivono alle connessioni interrotte. Inoltre, i comandi dimostrati essere in sola lettura non richiedono più conferma, e i server MCP possono essere aperti anziché trasferiti. Tre nuovi gate nel CI migliorano ulteriormente la robustezza del sistema.

Per un resoconto dettagliato di tutte le modifiche, consulta il [CHANGELOG.md][Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0).

[Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0): CHANGELOG.md
