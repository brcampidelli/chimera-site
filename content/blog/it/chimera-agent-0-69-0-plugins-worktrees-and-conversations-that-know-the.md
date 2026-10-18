---
title: "Chimera Agent 0.69.0: plugin, worktree e conversazioni che conoscono la propria repo"
date: 2026-10-18
category: update
summary: "I plugin di Claude Code arrivano come dati ispezionabili, ogni conversazione registra la propria repository e il branch, e la sidebar finalmente raggruppa i worktree sotto un unico progetto."
version: "0.69.0"
---

## Plugin come dati, non come codice in esecuzione

Prima di questa release, un plugin era una directory opaca che passavi a Chimera sperando che funzionasse. Il framework non aveva un vocabolario per descrivere cosa contenesse un plugin finché non veniva eseguito, e nessun modo di ispezionarlo senza mandarlo in esecuzione. Questa lacuna rendeva i plugin rischiosi in ambienti condivisi e impossibili da valutare prima dell'installazione.

`chimera.plugins` cambia completamente il modello. Legge una directory plugin — il suo manifest, skill, comandi, agenti, hook, server MCP e LSP — e classifica ogni componente in base a cosa farebbe se fosse eseguito: istruzioni solo testuali, avvio di un processo locale, accesso di rete o esecuzione di comandi. Durante questa ispezione non viene installato, importato, eseguito o scaricato nulla. Solo le sorgenti bloccate (pinned) sono considerate installabili: un percorso locale, una repository GitHub fissata a un SHA di commit o un archivio HTTPS con hash sha256. Ogni problema rilevato produce un codice di errore stabile e compatibile con `claude plugin validate`, così puoi integrare il controllo in un pre-commit hook o in una pipeline CI prima che un plugin arrivi anche solo a sfiorare un agente.

La stessa logica di lettura alimenta l'integrazione con il marketplace. `chimera.plugins` legge un `marketplace.json` e classifica ogni plugin elencato in base alla sua superficie di capacità. Le voci senza un pin restano visibili con il motivo per cui non sono installabili, così puoi esplorare il catalogo senza il rischio di scaricare accidentalmente qualcosa di mutabile.

I plugin si installano disabilitati. `chimera plugin install` li colloca in `<home>/plugins` come in attesa, e nulla raggiunge l'agente finché non esegui `chimera plugin enable`. L'abilitazione mostra il diff: skill, comandi e agenti appaiono con namespace `plugin:nome` come testo non fidato. Gli agenti seguono le regole degli agenti di progetto; i nomi dei tool di Claude Code vengono tradotti e possono solo restringere i permessi esistenti; i campi `allowed-tools` e `model` nel manifest vengono ignorati. L'espansione di un comando plugin marca l'esecuzione come contaminata, mentre hook, directory `bin/` e monitor restano inerti. I server MCP vengono aggiunti solo quando li nomini esplicitamente, tramite un blocco legato al manifest pinnato. Un aggiornamento che modifica manifest, hook, server o tool blocca il plugin mostrando il diff. Bot, cron job, `serve` e sessioni guest non ricevono alcun plugin a meno che `CHIMERA_UNATTENDED_PLUGINS` non lo elenchi esplicitamente.

La schermata Impostazioni › Plugin mostra ogni plugin installato con il suo stato, sorgente, pin, linea di capacità ed elenco dei componenti. La sezione Scopri mostra i marketplace che hai aggiunto, con ricerca e filtri per categoria e per cosa un plugin esegue. L'aggiunta accetta un marketplace pinnato, una cartella locale o un `.zip`. Attivare un plugin mostra esattamente cosa raggiungerà l'agente e chiede conferma per ogni server MCP separatamente. Solo tu puoi farlo: il bridge MCP può elencare, validare e installare i plugin in attesa, ma non può mai abilitare, rimuovere o aggiungere marketplace.

## Ogni conversazione conosce la propria repository

Prima, una conversazione Code era un file piatto in una cartella. La relazione tra una conversazione e la repository git circostante era implicita: sapevi su quale progetto stavi lavorando perché avevi aperto la cartella, ma il framework no. Questo rendeva impossibile automatizzare raggruppamento, pulizia e ragionamento tra worktree diversi.

All'inizio di ogni turno, la conversazione ora registra il suo progetto — il checkout principale della repository — insieme al suo branch e al fatto che la cartella sia il checkout principale, un worktree git o una semplice cartella. Questa informazione viene letta direttamente dai file git, senza eseguire git, quindi è veloce e funziona anche quando la repository è in uno stato corrotto. Il dato sopravvive alla rimozione del worktree, il che significa che l'elenco delle sessioni può raggruppare i worktree di una repository sotto la repository stessa.

La sidebar di Code usa questo raggruppamento. I worktree di una repository compaiono sotto l'intestazione della repository — una sezione comprimibile con un `+` per una nuova conversazione al suo interno, un conteggio dei worktree e un menu per aprire, comprimere, rinominare, nascondere, eliminare e pulire. Le righe mostrano titolo, branch e ora; cinque per progetto con un link "mostra di più"; la ricerca copre titolo, branch e progetto; i filtri di stato appaiono solo quando hanno elementi corrispondenti. Un interruttore disattiva il raggruppamento se preferisci la vecchia lista piatta.

La pulizia dei worktree ora ha un suo dialogo dedicato. Elenca ogni worktree della repository con il motivo per cui viene conservato — checkout principale, in uso, sporco, non mergiato, creato fuori da Chimera — mostra un'anteprima della rimozione e rimuove solo ciò che l'anteprima ha elencato, usando `git worktree remove` senza `--force` e `git branch -d`. Solo i worktree creati da Chimera possono essere rimossi da lì; le loro conversazioni vengono archiviate, mai eliminate. Il bridge MCP può elencare ma mai potare.

Il bridge MCP acquisisce anche la capacità di aprire una conversazione all'interno di un progetto specifico. `desktop_send` accetta un parametro `project` — un progetto registrato o una repository conosciuta — e un'opzione `worktree: "new"` con un branch opzionale. Chimera crea e possiede il worktree accanto alla repository in `.chimera-worktrees/<repo>/`, mai nella cartella temporanea, e la conversazione si raggruppa sotto il progetto. Progetti sconosciuti, percorsi fuori dal progetto e nomi di branch di esecuzione vengono rifiutati. Un nuovo worktree non eredita la concessione di shell del progetto.

I titoli delle conversazioni ora sono leggibili e rinominabili. Il titolo segue prima il nome che gli hai dato tu, poi un titolo passato dal chiamante, poi la prima intestazione `#` di un file Markdown che il primo messaggio cita all'interno del workspace, e solo allora il primo messaggio stesso. Rinomina con la matita sulla riga o con F2; un nome vuoto ripristina quello automatico. Nessun titolo viene generato da un modello.

## Cosa fare ora

Aggiorna alla 0.69.0, apri la schermata Impostazioni › Plugin e aggiungi un marketplace di cui ti fidi. Ispeziona un plugin con `chimera.plugins` prima di installarlo. Crea un worktree tramite il bridge MCP con `worktree: "new"` e guardalo raggrupparsi sotto la sua repository nella sidebar.

Le note di rilascio complete sono su [Chimera Agent v0.69.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.69.0).
