---
title: "Chimera 0.91.0: Livello di effort per ruolo, avvisi sulla cache e protezione per gli ospiti"
date: 2026-11-17
category: update
summary: "L'effort di reasoning ora è per ruolo, la cache dei prompt avvisa quando degrada, gli ospiti non vedono più i tool interni e la governance di default passa a observe per le nuove installazioni."
version: "0.91.0"
---

## L'effort di reasoning si sposta a livello di ruolo

Prima di questa release, impostare un effort di reasoning su un file agente applicava un valore generico facile da fraintendere. Il campo `effort` del file agente ora controlla solo le chiamate di quel sotto-agente. I ruoli di codice e il fusion cast ricevono il proprio effort da una nuova variabile d'ambiente, `CHIMERA_ROLE_EFFORTS`, che imposta l'effort per ruolo anziché per agente. Il file agente di un repository non può aumentare l'effort scelto dal proprietario, quindi un agente scaricato non può silenziosamente consumare più token di reasoning del previsto.

Questo è importante perché l'effort è una leva di costo. Un effort alto su un ruolo di summarisation spreca denaro; un effort basso su un ruolo di planning produce piani fragili. La precedente impostazione piatta imponeva un compromesso che non corrispondeva a come i ruoli consumano realmente il reasoning. Ora si imposta l'effort dove serve, e il sistema rifiuta le sovrascritture che lo aumenterebbero.

## La cache dei prompt avvisa quando smette di funzionare

La cache dei prompt fa risparmiare solo quando fa effettivamente hit. Prima, una conversazione poteva scivolare in un territorio di basso cache-hit senza alcun segnale. Te ne accorgevi dopo, dal costo, in un foglio di calcolo. Ora, quando la percentuale di token di prompt letti dalla cache scende sotto l'80% nei turni la cui route riporta la cache, la ricevuta del turno e la barra di stato avvisano una volta, indicando la causa principale. L'avviso si riarma quando la cache si riprende e degrada di nuovo. Le route che non riportano mai la cache non generano avvisi, così non vieni disturbato per qualcosa che non ci si aspettava nemmeno venisse cachata.

Anche Worth ora mostra un costo per esecuzione risolta. Mostra il costo totale di tutte le esecuzioni diviso per quelle che sono passate, lo stesso dato per esecuzione verificata dal verificatore, e la quota di esecuzioni con un prezzo noto. Quando un'esecuzione non ha un prezzo, Worth mostra un trattino invece di un numero fuorviante. La tabella rimane ordinata per nome, non per ranking, perché Worth è uno strumento diagnostico, non una classifica.

## Gli ospiti vedono le risposte, non i meccanismi interni

Una conversazione condivisa in precedenza lasciava trapelare gli argomenti dei tool del proprietario, i diff delle modifiche, le anteprime di approvazione, gli screenshot del browser, l'output del verificatore, le fonti delle istruzioni, le ricevute dei costi e i percorsi dell'host. Un ospite che guardava in diretta, rivedeva o ispezionava il contesto del modello poteva ricostruire molto più delle semplici risposte. Questa falla è chiusa. Gli ospiti ora ricevono solo le risposte, i nomi dei tool e lo stato, attraverso una allowlist che scarta qualsiasi tipo di frame non riconosciuto. I meccanismi interni del proprietario restano sullo schermo del proprietario.

## La governance passa a observe per le nuove cartelle dati

Una nuova installazione ora parte con la governance in modalità `observe`, registrata in `governance_default.json`. In modalità `observe`, i blocchi rigidi fissi del kernel rifiutano comandi come `rm -rf /`, `mkfs` o curl passato a una shell. Ciò che la modalità `enforce` manderebbe in revisione viene registrato, non richiesto. Una cartella dati esistente mantiene `off` e riceve un avviso nel log e una nota chiudibile nelle Impostazioni. Un valore esplicito di `CHIMERA_GOVERNANCE` ha ancora la precedenza, e un valore vuoto viene considerato come non impostato. Questo significa che una nuova installazione è bloccata fin dalla prima esecuzione, senza che chi la configura debba leggere una pagina di sicurezza separata.

## I job schedulati hanno modello, effort e budget di step propri

Un cron job ora può specificare il proprio modello, effort e budget di step tramite `cron add/edit --model --effort --max-steps` o la schermata Schedule. I valori vuoti ereditano da `serve`, come prima. I valori non validi vengono rifiutati al salvataggio; un `jobs.json` modificato a mano con valori errati li carica con un avviso invece di scartare il job silenziosamente. L'ultima risposta consegnata dal job, fino a 2 KB, chiude il suo contesto così smette di ripetersi tra un'invocazione e l'altra. Una consegna rifiutata dalla destinazione conta per il freno di fallimento e non viene mai trattata come consegnata. I job webhook che specificano questi campi vengono rifiutati, perché un webhook porta con sé la propria configurazione.

## Cosa fare ora

Aggiorna con `pip install chimera-agent --upgrade` e riavvia il server. Se hai impostato l'effort di reasoning nei file agente, sposta quei valori in `CHIMERA_ROLE_EFFORTS` e imposta il campo `effort` del file agente solo per le chiamate dei sotto-agenti. Controlla le tue conversazioni condivise: gli ospiti non vedranno più i frame interni, e non devi cambiare nulla per ottenere questa protezione. Le nuove installazioni ottengono la governance `observe` di default; le cartelle esistenti rimangono come sono a meno che tu non imposti esplicitamente `CHIMERA_GOVERNANCE`. Note complete su [Chimera Agent v0.91.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.91.0).
