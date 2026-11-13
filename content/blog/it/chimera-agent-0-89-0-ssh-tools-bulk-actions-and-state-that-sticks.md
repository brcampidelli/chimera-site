---
title: "Chimera Agent 0.89.0: strumenti SSH, azioni bulk e stato che persiste"
date: 2026-11-13
category: update
summary: "I tool per i file ora girano sull'host SSH, i comandi sopravvivono alle disconnessioni, arrivano le azioni bulk su cartelle e conversazioni e la scelta \"Plan first\" persiste tra un reload e l'altro."
version: "0.89.0"
---

## Ciò che imposti rimane impostato

Prima di questo rilascio, l'opzione "Plan first" nel compositore Code era una preferenza valida solo per la sessione. Potevi impostarla su Always o Never, ma ricaricare la finestra la resettava su Auto. Questo significava che ogni volta che riprendevi una conversazione dovevi riconfigurare la modalità che avevi già deciso. Ora l'impostazione viene ricordata per conversazione. Una nuova conversazione eredita l'ultima scelta fatta, e un piano in attesa di approvazione — insieme alla sua card — sopravvive a un reload. Il test che verifica questo comportamento conferma che la card viene ripristinata, quindi non perdi più un piano in sospeso perché la tab si è aggiornata.

La ricerca nelle impostazioni aveva un punto cieco di tipo diverso. La card Environments si trovava nella tab General, ma cercare "WSL", "SSH" o "environment" non restituiva nulla. La card era presente ma irraggiungibile tramite il campo di ricerca. Questo è stato risolto. Digitare uno qualsiasi di questi termini ora elenca la card Environments e gli host SSH consentiti, e aprendo un risultato si scorre direttamente fino ad esso. Se gestisci più ambienti remoti, ora puoi trovarli nello stesso modo in cui trovi tutto il resto.

## I tool per i file superano il confine SSH

In precedenza, le conversazioni SSH rifiutavano le operazioni sui file. Leggere, scrivere, modificare, applicare patch, elencare, grep e glob si fermavano tutte al confine locale. Questa restrizione è stata rimossa. In una conversazione SSH, questi tool ora agiscono sulla cartella remota. L'implementazione aggiunge diversi guardrail, perché un tool che scrive su un host remoto è un tool che può causare danni.

I percorsi non possono uscire dalla cartella della conversazione. Il controllo è lessicale e confermato da `realpath` dell'host stesso, quindi un symlink non può evaderlo. I file di credenziali — `.ssh`, `.env`, chiavi e configurazioni cloud — vengono rifiutati categoricamente. Una scrittura viene sostituita solo dopo che dimensione e hash sono stati verificati sull'host, il che impedisce di sovrascrivere un file che è cambiato dall'ultima volta che l'hai letto. La card Manual mostra il diff del file remoto e indica il nome dell'host, così sai esattamente cosa è cambiato e dove. Quando un turn legge contenuti esterni e poi scrive su un git hook, un file di avvio della shell, cron o un'unità systemd, Chimera chiede prima conferma. Ciò che l'host restituisce conta come contenuto esterno, quindi il prompt appare quando il rischio è reale.

I comandi sull'host SSH ora sopravvivono a una connessione persa. Ogni comando viene eseguito in modo distaccato con il proprio ID di esecuzione. Se il collegamento si interrompe, Chimera si riconnette e riprende a leggere l'output senza riavviare il comando. Uno script che arriva incompleto non viene mai eseguito. Un timeout o uno Stop terminano l'intero gruppo di processi. Se Chimera si chiude a metà comando, il comando continua a funzionare e alla conversazione che lo ha avviato viene detto dove si trova il suo output. Puoi riconnetterti e recuperare il log senza dover indovinare se il comando è terminato o è stato eseguito due volte.

## Agisci su molti elementi in una volta sola

Gestire cartelle e conversazioni una alla volta era l'unica opzione. La card Folders nelle Impostazioni e la sidebar Code ora hanno checkbox, un "Seleziona tutto" a tre stati e una barra delle azioni. Per le cartelle, puoi fissarle, sfissarle, consentire o revocare comandi, rimuoverle dagli elenchi o mostrarle di nuovo. Per le conversazioni, puoi archiviarle, disarchiviarle, eliminarle o rimuovere le loro cartelle dagli elenchi.

La modalità di selezione disegna ogni riga in modo che nulla fuori dallo schermo venga modificato per sbaglio. L'eliminazione chiede prima conferma e mostra il conteggio. Consentire comandi in blocco chiede anch'esso prima conferma. Un fallimento viene conteggiato senza fermare il resto, così un singolo elemento problematico non blocca l'operazione su tutto il resto che hai selezionato.

Aggiorna con `pip install --upgrade chimera-agent`. Le note complete sono su [Chimera Agent v0.89.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.89.0).
