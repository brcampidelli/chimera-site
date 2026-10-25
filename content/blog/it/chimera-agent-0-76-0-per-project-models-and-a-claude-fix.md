---
title: "Chimera Agent 0.76.0: modelli per progetto e una correzione per Claude"
date: 2026-10-25
category: update
summary: "Chimera Agent 0.76.0 permette a ogni progetto di fissare il proprio modello e risolve i problemi con i modelli Claude nella schermata Code."
version: "0.76.0"
---

## Modelli per progetto

Prima di questa release, cambiare modello per un progetto lo cambiava per ogni conversazione in tutti i progetti. Il modello era un'impostazione globale unica e, se volevi modelli diversi per progetti diversi, dovevi ricordarti di passare manualmente dall'uno all'altro. Era facile sbagliare e rendeva difficile mantenere un progetto su un modello specifico per coerenza o per contenere i costi.

Ora ogni progetto può avere il proprio modello. Una conversazione Code usa il proprio modello fissato, se ne ha uno, poi quello del progetto, infine il default globale. La ricevuta del turno mostra quale modello è stato usato, così puoi verificarlo a colpo d'occhio. Cambiare il modello per un progetto non influisce più sulle conversazioni di un altro. Questo significa che puoi impostare un progetto per usare un modello più economico per la sperimentazione e un altro per usarne uno più potente in produzione, senza preoccuparti di contaminazioni incrociate.

Quando l'agente propone un modello diverso, può solo lasciarti una card che indica la conversazione o il progetto a cui si applicherebbe. Nulla cambia finché non lo approvi. Questo ti mantiene al controllo e impedisce all'agente di cambiare modello a tua insaputa durante una conversazione.

## I modelli Claude funzionano di nuovo nella schermata Code

Con un modello Anthropic come default, ogni turno di coding falliva al primo passo con un errore sullo schema di input di un tool. Lo schema del tool `question` usava un costrutto che l'API di Anthropic rifiuta. Ciò significava che, se stavi usando Claude come modello predefinito, non potevi affatto usare la schermata Code: ogni turno dava errore prima di fare qualsiasi cosa utile.

Ora lo schema è un oggetto semplice, che l'API di Anthropic accetta. Un test verifica lo schema di ogni tool, così il problema non può ripresentarsi. Questa correzione è importante perché garantisce che tutti i modelli supportati funzionino su tutte le schermate, non solo su quelle che tollerano stranezze negli schemi.

## Cosa fare ora

Aggiorna alla versione 0.76.0 e imposta un modello specifico per progetto, se ti serve. Se stavi evitando Claude nella schermata Code, provalo di nuovo. Vedi le [note di rilascio][Chimera Agent v0.76.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.76.0) per tutti i dettagli.
