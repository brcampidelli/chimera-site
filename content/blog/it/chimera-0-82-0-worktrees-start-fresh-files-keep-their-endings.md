---
title: "Chimera 0.82.0: Worktrees partono puliti, i file mantengono i finali di riga"
date: 2026-11-01
category: update
summary: "I worktree ora clonano dal remoto invece che da un checkout locale obsoleto, la scrittura dei file preserva i fine riga e l'agente chiede conferma prima di lavorare dove i comandi sono disattivati."
version: "0.82.0"
---

## I worktree partono dal remoto, non da un checkout locale obsoleto

Prima, un nuovo worktree veniva creato a partire da qualunque cosa fosse in checkout in locale. Se il clone locale era indietro di giorni, l'agente partiva da codice vecchio senza saperlo. Il primo turno poteva sprecare tempo su problemi già risolti, o introdurre conflitti che emergevano solo dopo.

Ora una richiesta di worktree fa il fetch del branch di default dal remoto e crea il worktree da quel commit. L'output indica da quale commit è partito. Se il fetch non riesce a raggiungere il remoto, l'agente ripiega sull'HEAD locale e avvisa. Il fetch non chiede mai credenziali, quindi l'operazione non resta in attesa di input che non può arrivare.

Questo è importante perché un agente che parte da codice obsoleto produce lavoro che sembra corretto isolatamente ma fallisce contro lo stato corrente del repository. La modifica elimina una fonte silenziosa di disallineamento tra ciò che l'agente vede e ciò che vede il resto del team.

## I file scritti da Chimera mantengono i loro fine riga

La scrittura dei file da parte dell'agente passava attraverso una modalità testo che convertiva ogni newline in CRLF su Windows. Un file creato su Windows era in disaccordo con la convenzione LF del repository, e un hash di traduzione che passava in locale falliva in CI. La discrepanza era difficile da tracciare perché il file sembrava identico in un diff tool che normalizza i fine riga.

Le scritture ora sono byte-esatte. Un nuovo file prende LF. Un file esistente CRLF mantiene CRLF. Gli hash di traduzione ignorano i fine riga, quindi un hash calcolato su una piattaforma corrisponde all'hash calcolato su un'altra. La correzione rimuove un fallimento specifico della piattaforma che rompeva le pipeline CI e costringeva gli sviluppatori a debuggare output dell'agente che non potevano vedere.

## L'agente chiede prima di lavorare dove i comandi sono disattivati

Una richiesta di codice in una cartella con i comandi disabilitati prima eseguiva strumenti per un'ora e solo dopo riferiva di non aver potuto verificare nulla. L'agente modificava, non testava nulla e consegnava una risposta non verificata. Il proprietario scopriva il problema a posteriori.

Ora l'agente si ferma prima di eseguire qualsiasi strumento e chiede al proprietario di consentire i comandi, continuare senza, o annullare. Solo lo schermo del proprietario può concedere il permesso. Un turno con nessuno allo schermo non attende mai—procede senza comandi. La scelta viene ricordata per conversazione, e una risposta non verificata lo dichiara in cima. La modifica previene lavoro sprecato e rende visibile il vincolo prima che l'agente agisca.

## Altre correzioni che cambiano l'uso quotidiano

Uno strumento di verifica mancante non segna più un turno come fallito. Quando il controllo dopo un turno non può essere eseguito perché il suo programma non è installato—`vitest` in un worktree fresco senza `node_modules`—il turno risulta come non verificato, con la ragione e la soluzione. Un comando `setup` in `.chimera/verify.toml` installa ciò che manca. Un controllo i cui test sono stati eseguiti e sono falliti risulta ancora come fallito. La distinzione permette di vedere se l'output dell'agente ha rotto i test o se il test runner era semplicemente assente.

Un'estrazione della memoria fallita non è più silenziosa. Quando l'estrazione dietro un turno Code non può partire, l'app registra un avviso con il tipo di errore—mai la conversazione o una chiave—e il turno risponde comunque. Prima, il fallimento non lasciava traccia e non si poteva capire perché l'agente sembrava dimenticare il contesto.

L'app installata mantiene le sue chiavi qualunque sia la cartella da cui viene aperta. Il backend prima leggeva il `.env` della cartella di lancio e registrava quella cartella per il servizio in background. Un'app aperta da un terminale altrove partiva senza chiave del provider e ogni turno falliva. Il collegamento nel menu Start nascondeva il problema. Una build pacchettizzata ora esegue sempre il suo backend nella cartella di installazione.

Un tweak numerico si applica quando finisci di digitare, non a ogni tasto premuto. Digitare `34` in un tweak che va da 28 a 56 inviava prima `3`, veniva rifiutato e tornava indietro. Il campo ora si applica una volta sola, uscendo dal campo o premendo Invio, si limita all'intervallo, ed Esc scarta la bozza.

Il README non definisce più Chimera auto-evolvente. Sette esecuzioni di apprendimento pre-registrate non hanno trovato alcun guadagno misurabile, quindi il titolo, la descrizione del pacchetto, l'aiuto della CLI, l'app e i README tradotti ora dicono ciò che l'evidenza supporta: un agente governato che pubblica i propri risultati nulli. I README tradotti inoltre non promettono più un A/B test che il ciclo di apprendimento non esegue.

Il bridge pagina e filtra la lista delle conversazioni. Elencare le conversazioni tramite il bridge Claude restituiva tutte le 1,465 in una volta. Ora accetta `limit`, `cursor`, `state`, `project` e `q`, predefinito a 50 per pagina sul bridge, e la lista non parametrizzata dello schermo è invariata.

Aggiorna con `pip install --upgrade chimera-agent` e leggi le note complete su [Chimera Agent v0.82.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.82.0).
