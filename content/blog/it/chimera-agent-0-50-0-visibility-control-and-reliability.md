---
title: "Chimera Agent 0.50.0: Visibilità, Controllo e Affidabilità"
date: 2026-10-09
category: update
summary: "Chimera Agent 0.50.0 introduce visibilità sulle attività degli agenti, webhook di approvazione, controlli di governance, retrieval ibrido e correzioni per le finestre di contesto dei modelli."
version: "0.50.0"
---

## Visibilità sulle Attività degli Agenti

Uno dei cambiamenti più significativi in Chimera Agent 0.50.0 è l'introduzione della visibilità sulle attività. In precedenza, il campo `RunState.tasks` esisteva ma non veniva popolato, lasciando gli utenti all'oscuro di ciò che l'agente stava facendo. Ora, l'agente mantiene una lista di attività che viene visualizzata sullo schermo durante l'esecuzione. Ogni attività è contrassegnata come in corso o completata, e la lista sopravvive alla compattazione del contesto. Questo significa che, anche durante esecuzioni lunghe, l'agente non dimentica il suo piano, fornendo agli utenti una visione chiara del suo progresso.

## Webhook di Approvazione per Esecuzioni Non Supervisionate

Un altro miglioramento importante è la capacità dell'agente di richiedere approvazioni anche quando nessuno è alla console. Impostando la variabile d'ambiente `CHIMERA_APPROVAL_WEBHOOK` su un webhook di canale, l'agente può ora inviare domande di approvazione a un canale designato. Questo cambiamento risolve un problema precedente in cui le superfici non supervisionate, inclusi i cron job, prendevano decisioni silenziosamente senza input dell'utente. Ora, se non c'è modo di consegnare la domanda, l'agente dichiara esplicitamente di essere `unreachable`, garantendo trasparenza.

## Controlli di Governance

Il kernel di governance, che in precedenza era invisibile e inattivo, può ora essere attivato. Il parametro `CHIMERA_GOVERNANCE` è impostato su `off` di default, ma gli utenti ora hanno la possibilità di abilitarlo. La schermata di Sicurezza indica anche lo stato corrente della governance, fornendo agli utenti il controllo e la visibilità necessari su questa funzionalità critica.

## Retrieval Ibrido in `chimera find`

Il comando `chimera find` è stato potenziato con il retrieval ibrido, combinando metodi di ricerca per parole chiave e vettoriali. Questo approccio ibrido, che viene fissato prima dell'inizio dell'esecuzione, ha dimostrato di superare la ricerca per parole chiave di 6,25 punti sul corpus del progetto. È importante notare che la ricerca vettoriale da sola è meno efficace rispetto alla ricerca per parole chiave, motivo per cui il metodo ibrido è ora quello predefinito. Questo cambiamento garantisce risultati di retrieval più accurati e affidabili.

## Correzioni per le Finestre di Contesto dei Modelli

In precedenza, i modelli non elencati nel catalogo verificato manualmente erano considerati avere una finestra di contesto di 128.000 token, portando a overflow di contesto e fallimenti delle esecuzioni per modelli con finestre più piccole. Questa release risolve il problema recuperando la finestra di contesto dall'indice live quando il catalogo non conosce il modello. Inoltre, cinque voci del catalogo sono state corrette per riflettere le effettive finestre di contesto fornite dai loro provider, e un prezzo è stato aggiustato per corrispondere ai dati verificati.

## Miglioramenti Aggiuntivi

Le tracce ora registrano quale backend ha servito ogni passaggio, non solo quale modello ha risposto. Questo è particolarmente importante per i modelli su OpenRouter, dove un singolo slug di modello può rappresentare un pool di endpoint con finestre di contesto e prezzi variabili. Questo cambiamento garantisce che gli utenti abbiano una comprensione più chiara delle risorse utilizzate.

## Avvertenze Oneste

- **Gli installer non sono firmati.** La prima esecuzione mostra un avviso SmartScreen su Windows e un avviso Gatekeeper su macOS. Questo è previsto; l'*updater* è firmato, che è la parte che conta per ciò che viene installato sulla tua macchina.
- **La governance è impostata su `off`.** Il controllo esiste per permetterti di attivarla, non perché sia già attiva.
- **Il compattatore di riepilogo è disabilitato**, dietro `AgentConfig.summarise_compaction`. La compattazione stessa non si è mai attivata nell'uso ordinario — misurata 0 volte su 137 esecuzioni — quindi il riepilogo è costruito e non testato piuttosto che costruito e necessario.
- **La cancellazione è cooperativa.** Interrompere un'esecuzione la ferma prima della prossima chiamata al modello; le chiamate già in corso terminano e vengono fatturate.

Per i dettagli completi, comprese le misurazioni che hanno informato questi cambiamenti, consulta il [changelog][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0).
