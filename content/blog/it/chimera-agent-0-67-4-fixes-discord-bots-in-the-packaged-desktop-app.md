---
title: "Chimera Agent 0.67.4 risolve il problema dei bot Discord nell'app desktop pacchettizzata"
date: 2026-10-16
category: update
summary: "L'applicazione desktop installata non va più in crash con un errore di modulo mancante all'avvio di un bot Discord."
version: "0.67.4"
---

L'app desktop pacchettizzata introdotta nella release precedente è uscita con un contratto rotto. Se qualcuno installava l'applicazione e la puntava su un bot Discord, il pannello di stato non mostrava un bot in esecuzione. Mostrava un traceback che terminava con `ModuleNotFoundError: No module named 'discord'`. La configurazione dell'agente era valida. Il token era corretto. Il problema stava nel pacchettizzazione stessa.

## Cosa si è rotto e perché è importante

Il problema nasceva dalla combinazione di due scelte che non sono entrate in collisione fino alla build di release. Primo, gli adattatori di messaggistica — incluso Discord — erano stati progettati come import lazy. Il framework non carica ogni superficie di chat all'avvio; importa l'adattatore solo quando una configurazione bot lo richiede. Questa scelta manteneva gli avvii a freddo rapidi e il consumo di memoria basso, e funzionava in ogni ambiente in cui tutte le dipendenze opzionali erano presenti.

Secondo, la build di release usava un insieme di dipendenze ridotto. L'extra di messaggistica, che contiene le librerie client di Discord, era marcato come opzionale ed è stato omesso dall'applicazione installata. L'analisi di PyInstaller ha percorso il grafo degli import staticamente, ha visto l'import lazy nascosto dietro un loader basato su stringhe e ha concluso che il codice dell'adattatore fosse irraggiungibile. Il risultato: una configurazione funzionante che il runtime non poteva eseguire.

Per chi sviluppa agenti, l'impatto era specifico. Qualsiasi bot definito con una superficie Discord falliva esclusivamente nell'app pacchettizzata. Lo stesso file di configurazione funzionava da sorgente. Lo stesso file di configurazione funzionava in un container. L'incoerenza rendeva l'app desktop inaffidabile per un'intera classe di agenti, che è esattamente la classe che genera il maggior feedback dalla community.

## La correzione e cosa comporta per il packaging

La release 0.67.4 corregge la dichiarazione delle dipendenze in modo che l'extra di messaggistica venga incluso nell'applicazione installata. PyInstaller ora vede l'adattatore Discord come codice raggiungibile e include i moduli necessari. Non serve alcun cambiamento di configurazione. Nessun aggiornamento alle definizioni degli agenti. Il pannello di stato del bot mostra lo stato in esecuzione invece di un errore di import.

Dietro questa semplice affermazione c'è una lezione più ampia su cui i maintainer sono intervenuti immediatamente. Gli import lazy sono una tecnica di performance che gli strumenti di authoring devono rispettare, ma che va dichiarata esplicitamente agli strumenti di packaging. L'import nascosto è sempre stata un'architettura intenzionale. L'omissione era un gap di metadati tra il manifest del pacchetto e il processo di freezing. La versione 0.67.4 chiude questo gap per l'adattatore Discord e stabilisce un pattern per ogni superficie di messaggistica che segue lo stesso design a caricamento lazy.

## Cosa fare ora

Se stai eseguendo l'applicazione installata 0.67.3, scarica l'aggiornamento 0.67.4 dalla pagina delle release. L'app pacchettizzata è firmata allo stesso modo e si installa sopra la versione esistente. Dopo l'aggiornamento, riavvia qualsiasi configurazione di bot Discord. Lo stato passa a "in esecuzione" senza passaggi aggiuntivi.

Se sviluppi agenti da sorgente e non hai mai usato l'app pacchettizzata, non cambia nulla. Il pacchetto installato via pip includeva già l'extra di messaggistica quando installato con il flag standard `[all]`. Questa release riguarda solo l'applicazione desktop pacchettizzata.

Per la lista completa delle modifiche in questa release, vedi [Chimera Agent v0.67.4](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.67.4).
