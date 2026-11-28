---
title: "Chimera Agent 0.92.0: ricevute dei costi, controllo del planner e impostazioni ricercabili"
date: 2026-11-28
category: update
summary: "Le ricevute dei costi ora usano l'indice prezzi pubblico di OpenRouter per le esecuzioni fuori da serve, il planner è configurabile per lane e la ricerca delle impostazioni di Desktop trova la tabella di routing dei modelli."
version: "0.92.0"
---

## Cosa è cambiato per le ricevute dei costi

Le esecuzioni fuori da `serve` prima si basavano su un catalogo prezzi statico o incompleto. Quando lo slug di un modello non corrispondeva esattamente, la ricevuta mostrava una tariffa sbagliata o ometteva del tutto la riga del costo. Questo rendeva difficile verificare la spesa su varianti fine-tuned o modelli appena rilasciati.

La versione 0.92.0 passa quelle esecuzioni all'indice prezzi pubblico di OpenRouter. Gli slug esatti dei modelli ora recuperano le proprie tariffe direttamente dall'indice. Le chiamate strict conservano anche il preventivo accettato in fase di ammissione, quindi la ricevuta riflette il prezzo che l'agente ha effettivamente approvato, non una stima successiva. La voce di catalogo `gpt-oss-20b` è stata aggiornata per rispecchiare i prezzi correnti.

Per chiunque tenga traccia dei costi per singola esecuzione al di fuori del percorso `serve`, le ricevute ora sono accurate senza bisogno di correzioni manuali. Se un modello è presente nell'indice pubblico, l'agente lo prezza correttamente. Se lo slug è sconosciuto, la ricevuta lo segnala chiaramente invece di andare silenziosamente a zero.

## Il planner non è più sempre attivo

Prima di questa release, il planner girava su ogni lane, ogni chiamata API e ogni passo di workflow solve. Non c'era modo di disabilitarlo per task in cui la pianificazione aggiungeva latenza senza migliorare il risultato. I team che volevano esecuzioni più veloci su lane semplici dovevano aggirare il framework.

`use_planner` ora è un flag di configurazione esposto su lane Kanban, esecuzioni API e passi di workflow solve. Il planner rimane attivo di default, quindi il comportamento esistente non cambia a meno che non si faccia opt-out. Impostare il flag a `false` su una lane salta interamente la fase di pianificazione e procede direttamente all'esecuzione.

Questo è particolarmente rilevante per lane che gestiscono operazioni deterministiche a passo singolo. Una lane che chiama un endpoint noto o trasforma un payload con uno schema fisso non trae beneficio da un passaggio di pianificazione. Rimuoverlo riduce la latenza e il consumo di token senza influire sulla correttezza. Il flag è per-lane, quindi puoi tenere il planner attivo per task ambigui e disattivarlo per quelli meccanici all'interno dello stesso progetto.

## Le impostazioni Desktop sono ricercabili

La ricerca delle impostazioni nell'app Desktop precedentemente non indicizzava la tabella di routing per ruolo dei modelli. Trovare quale modello fosse assegnato a un ruolo specifico richiedeva di scorrere l'intera lista. Questo attrito cresceva man mano che i team aggiungevano più ruoli e modelli di fallback.

La ricerca ora copre la tabella di routing. Digitare il nome di un ruolo o lo slug di un modello nella barra di ricerca delle impostazioni restituisce direttamente le voci di routing corrispondenti. Lo stesso aggiornamento corregge il routing e la copia delle ricevute in portoghese brasiliano, dove etichette troncate rendevano la tabella di routing più difficile da leggere. Le nuove conversazioni e i turni di sola risposta mostrano anche indicatori di stato più chiari, così sai se l'agente è in attesa di una risposta dal modello o sta elaborando una chiamata a strumento.

## Esperimenti rimasti opt-in

Diversi esperimenti sono stati integrati senza cambiare i default. L'estrazione della memoria con un modello esplicito e pre-filtro deterministico è disponibile ma disattivata. Il benchmark non è stato conclusivo, quindi il limite di 6.000 caratteri e il modello globale rimangono. Un tier di modelli cron più economico è stato testato su job sintetici e ha totalizzato sette risposte corrette su otto, ma i carichi di lavoro in produzione non sono stati misurati. Anche gli esperimenti di raffinamento del design e proporzionalità dei prompt rimangono disattivati di default.

Sono disponibili dietro feature flag per i team che vogliono testarli nei propri ambienti. Nulla è cambiato automaticamente.

## Cosa fare ora

Aggiorna con `pip install chimera-agent==0.92.0`. Se esegui agenti fuori da `serve`, controlla la tua prossima ricevuta per confermare che i prezzi corrispondano all'indice pubblico di OpenRouter. Per le lane che non hanno bisogno di pianificazione, aggiungi `use_planner: false` alla configurazione della lane. Gli utenti Desktop possono aprire le impostazioni e cercare il nome di un ruolo per verificare che la tabella di routing sia indicizzata.

Note di rilascio complete: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
