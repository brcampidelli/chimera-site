---
title: "Chimera Agent 0.45.0: Governance, Limiti di Spesa e Fix di Sicurezza"
date: 2026-08-16
category: update
summary: "Questa release implementa impostazioni di sicurezza mancanti, aggiunge controlli sulle spese ed estende la governance a tutte le superfici non supervisionate."
version: "0.45.0"
---

## Impostazioni di Sicurezza che Funzionano Davvero

La versione precedente era configurata in modo insicuro: porte aperte, nessuna autenticazione e nessun avviso. Non era un errore, ma una scelta consapevole per privilegiare la facilità di setup rispetto alla sicurezza, ma l'equilibrio era sbagliato. Ora `serve` rifiuta di bindare su indirizzi non loopback senza un token, e il setup Docker pubblica solo su `127.0.0.1`. Se devi esporre il gateway, devi esplicitamente optare per `--allow-insecure-bind` o impostare `CHIMERA_SERVER_TOKEN`.

Questo rompe i deployment esistenti che si basavano sul vecchio comportamento. La soluzione è semplice, ma era un cambiamento necessario: un gateway agent accessibile a chiunque sulla rete è un rischio, non una feature.

## Limiti di Spesa che Funzionano

Prima di questa release, l'unico controllo sulle spese era un contatore di passi. Un job in un loop di ritentativi poteva consumare tutti i tuoi crediti API senza avvisarti. Ora ci sono tre limiti separati: per esecuzione, per job e un aggregato giornaliero. Se una chiamata non può essere prezzata, l'esecuzione si ferma invece di procedere senza controllo. I modelli locali sono considerati gratuiti anziché sconosciuti, quindi i limiti non bloccano l'unica configurazione che non può sforare.

`chimera doctor` verifica se il tuo modello di default può essere prezzato. Questo evita sorprese quando provi a impostare un limite di spesa.

## Governance che Copre Tutte le Superfici

Cinque componenti diversi (`serve`, cron, MCP, A2A e adattatori di messaggistica) avevano ognuno il proprio registro di tool minimale. Ora condividono un unico stack `governed_profile()`, imposto da un controllo AST a tempo di build. L'idea chiave è che `CHIMERA_GOVERNANCE=observe` è più utile di `enforce`—registra ciò che sarebbe stato bloccato senza bloccarlo davvero, così puoi misurare l'impatto prima di attivarlo.

Questa release collega anche il sistema di approvazione che esisteva ma non era connesso. Le chiamate di classe pericolosa che leggono dati esterni ora hanno qualcuno dall'altra parte del gate, riducendo i blocchi eccessivi senza compromettere la sicurezza.

## Prossimi Passi

Esegui `chimera doctor` per verificare il tuo setup, poi controlla il tuo deployment se facevi bind su `0.0.0.0`. Le modifiche complete sono in [Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
