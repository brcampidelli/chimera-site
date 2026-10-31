---
title: "Chimera Agent 0.81.0: Sessioni atomiche, endpoint con nome e correzioni alle tavole da disegno"
date: 2026-10-31
category: update
summary: "Le scritture delle sessioni ora sono atomiche, le tavole HTML portano con sé font e immagini, e puoi instradare i modelli verso endpoint compatibili con OpenAI identificati da un nome."
version: "0.81.0"
---

## Le sessioni non si corrompono più sotto turni paralleli

Riaprire una conversazione Code riscriveva il file di sessione sul posto. La scrittura partiva da una lettura fatta prima di un'attesa fino a dieci secondi. In quella finestra, un altro lettore o un crash trovavano mezzo file. I turni salvati in quel lasso andavano persi. Sotto molti turni paralleli, questo ha danneggiato diverse sessioni e i loro backup.

La correzione rende le scritture di sessione atomiche, flushate su disco e bloccate tra processi. Il passo di riapertura ora fa il merge solo dei campi che ha effettivamente appreso. Smetti di perdere turni in una race tra una lettura e una scrittura ritardata. Se esegui più agenti sulla stessa sessione, o riavvii mentre un turno è in volo, il file resta integro.

## Le tavole HTML ottengono i propri asset e l'inspector

Prima di questo rilascio, una tavola HTML prelevava i font da una lista a livello di token scritta come un singolo nome tra virgolette. Le schermate ricadevano su un carattere tipografico con grazie sulla tela e negli export. L'inspector mostrava sempre la prima tavola, quindi una seconda schermata HTML non poteva raggiungere le sue regolazioni né selezionare i suoi elementi.

Ogni design ora mantiene il proprio archivio di immagini e font. Aggiungi immagini PNG, JPEG, WebP o GIF, e font WOFF2, WOFF o TTF, dall'assistente. L'assistente sa quali asset esistono. Le schermate e gli export li usano. I file SVG e quelli camuffati vengono rifiutati. Sulla tela, gli asset arrivano come dati inline, così la schermata in sandbox non raggiunge comunque la rete.

Cliccare una tavola o la sua etichetta la rende attiva. L'inspector segue. Una seconda schermata HTML ottiene la propria selezione degli elementi e le regolazioni di stile. I font del sistema di design renderizzano sulla tela e negli export.

## Gli endpoint con nome sostituiscono l'URL base globale

Instradare modelli verso un provider compatibile con OpenAI significava impostare `CHIMERA_API_BASE` globalmente. Ogni modello passava attraverso quella singola base. Non potevi mischiare provider in una configurazione senza farti da proxy.

`CHIMERA_ENDPOINTS` elenca endpoint per nome. Ogni voce dichiara un URL base e la variabile che contiene la sua chiave. Un modello scritto come `endpoint/<nome>/<modello>` va a quell'endpoint con la propria base e chiave, accanto a OpenRouter. La scheda privacy, le ricevute e il pannello Usage nominano l'endpoint e il suo host. `/api/endpoints` li elenca e li testa.

Questo arriva come parte del lavoro di routing multi-provider. Tieni chiavi separate per provider separati, e l'agente instrada ogni modello verso la base corretta senza un proxy davanti.

## I connettori che nomini in un messaggio si connettono per quel turno

Con l'autocaricamento MCP disattivato, un turno Code il cui messaggio nomina un connettore configurato e abilitato connette solo quello. Il turno lo dichiara, e mantiene il connettore per i turni successivi che lo nominano. Il testo proveniente da strumenti, pagine o file non attiva mai un connettore. I bot mantengono la propria lista.

Questo impedisce che una menzione in un documento recuperato abiliti silenziosamente un connettore che non intendevi usare. Controlli la connessione da ciò che scrivi nel messaggio.

## Piccole correzioni che rimuovono attriti

Un messaggio che nomina Chimera Design mentre chiede un percorso di codice, un comando pytest, o parole come fix, implement o test non apre più la tela. Il sistema non interpreta più il lavoro di ingegneria come una richiesta di design.

La scheda di dettaglio di un connettore URL non afferma più che il test avvia un comando o che npx potrebbe scaricare un pacchetto. Un server su loopback non porta più il chip "raggiunge la rete". Ciò che la scheda descrive ora corrisponde a ciò che il connettore fa realmente.

## Ottienilo

Installa o aggiorna con pip:

```
pip install chimera-agent --upgrade
```

Leggi il changelog completo su [Chimera Agent v0.81.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.81.0).
