---
title: "Chimera Agent 0.50.0: Visibilità, Controllo e Affidabilità"
date: 2026-10-07
category: update
summary: "Chimera Agent 0.50.0 introduce trasparenza, maggiore controllo e correzioni per i fallimenti silenziosi."
version: "0.50.0"
---

## Visibilità sulle Operazioni dell'Agente

In precedenza, la lista delle attività dell'agente era invisibile agli utenti, nonostante il campo `RunState.tasks` esistesse. Ora, l'agente mostra la sua lista di attività in tempo reale, segnalando gli elementi in corso o completati. Questa lista persiste attraverso la compattazione del contesto, garantendo che le esecuzioni lunghe non perdano traccia dei loro piani. Questo cambiamento risolve una frustrazione comune in cui gli utenti non potevano vedere cosa stesse facendo l'agente, specialmente durante operazioni prolungate.

## Raggiungibilità Oltre la Console

Gli agenti in esecuzione senza supervisione, come i cron job, non potevano comunicare efficacemente con gli utenti quando era necessaria un'approvazione. Impostando `CHIMERA_APPROVAL_WEBHOOK`, gli utenti possono ora ricevere richieste di approvazione nei loro canali preferiti. Questo cambiamento garantisce che gli agenti possano raggiungere gli utenti anche quando nessuno sta monitorando attivamente la console. In precedenza, queste richieste fallivano silenziosamente se non era disponibile un metodo di consegna, portando a decisioni inaspettate.

## Controllo di Governance

La funzione di governance, che include un registro di audit, era precedentemente inaccessibile. Sebbene la schermata di Sicurezza mostrasse il registro di audit, non c'era modo di abilitarlo. Ora, gli utenti possono attivare la governance utilizzando il parametro `CHIMERA_GOVERNANCE`. Questo cambiamento offre agli utenti la possibilità di monitorare e controllare le impostazioni di sicurezza del loro agente, colmando una lacuna nella trasparenza e nel controllo.

## Gestione Migliorata dei Modelli

In precedenza, gli agenti assumevano una dimensione predefinita della finestra di token per i modelli non esplicitamente catalogati, causando overflow di contesto e fallimenti delle esecuzioni. Con questa release, l'agente ora recupera la corretta dimensione della finestra di token dall'indice live per i modelli non catalogati. Inoltre, cinque voci del catalogo sono state corrette per riflettere accuratamente le finestre di token e i prezzi. Questo cambiamento previene i fallimenti delle esecuzioni dovuti a presupposti errati sulle capacità dei modelli.

## Tracciabilità Migliorata

Le tracce ora registrano quale backend ha servito ogni passo, non solo quale modello ha risposto. Questo è particolarmente importante per modelli come quelli su OpenRouter, dove un singolo slug di modello può rappresentare un pool di endpoint con capacità e costi variabili. In precedenza, gli utenti non potevano distinguere tra diversi endpoint, portando a confusione e misurazioni inaccurate. Questo cambiamento migliora la trasparenza e l'accuratezza nel tracciamento delle prestazioni.

## Cosa Fare Ora

Per sfruttare questi miglioramenti, aggiorna a Chimera Agent 0.50.0 e consulta le [note di rilascio][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) per istruzioni dettagliate sulla configurazione delle nuove funzionalità come `CHIMERA_APPROVAL_WEBHOOK` e `CHIMERA_GOVERNANCE`.
