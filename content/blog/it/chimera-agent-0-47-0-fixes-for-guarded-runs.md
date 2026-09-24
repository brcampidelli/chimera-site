---
title: "Chimera Agent 0.47.0: Correzioni per le Esecuzioni Controllate"
date: 2026-08-22
category: update
summary: "Sette correzioni risolvono segnalazioni errate di chiamate a strumenti rifiutate, difetti nella valutazione delle regole e problemi di integrità degli audit."
version: "0.47.0"
---

## Le Esecuzioni Controllate Ora Segnalano Correttamente

È stato risolto un problema critico nelle esecuzioni controllate (flag `--guard`). In precedenza, quando una chiamata a uno strumento veniva rifiutata dalle regole di governance, il sistema la segnalava erroneamente come riuscita. Ciò accadeva perché il messaggio di rifiuto non iniziava con `error:`, facendo sì che il controllo di stato restituisse `True`. Tre aree principali erano interessate:

1. La visualizzazione del frame desktop
2. Il log dei passaggi utilizzato per le ricevute
3. Il rilevatore di deviazioni

Ciò significava che le esecuzioni in cui ogni azione pericolosa era bloccata apparivano riuscite in tutti gli output strutturati. Il modello poteva persino rispondere con messaggi di conferma per azioni che non erano mai state eseguite.

## Valutazione delle Regole Corretta per Script e Documenti

Il motore delle regole presentava due problemi significativi:

1. **Gli script multi-linea bypassavano la protezione**: A causa di come i caratteri di nuova linea venivano gestiti durante l'interpolazione del testo, i confini delle parole nelle regole venivano interrotti. Ciò permetteva a comandi pericolosi di passare se apparivano dopo altri benigni in uno script.

2. **I documenti generavano falsi positivi**: Nel frattempo, file Markdown che citavano comandi pericolosi venivano bloccati in modo rigido. La protezione era effettivamente invertita: le minacce reali erano consentite mentre la documentazione veniva bloccata.

Due regole non venivano attivate su alcun input. Questi problemi sono stati corretti, con una gestione adeguata sia dell'esecuzione degli script che del contenuto dei documenti.

## Miglioramenti all'Audit e alla Sicurezza

Sono state implementate diverse correzioni relative alla sicurezza:

- **Archiviazione delle credenziali**: Il sistema di audit memorizzava dati sensibili che avrebbe dovuto rilevare. Quando un'operazione governata `write_file` veniva bloccata, il contenuto del file appariva comunque in `audit.jsonl`. Ora ci sono due livelli: l'audit oscura i dati sensibili (utilizzando le capacità esistenti di redazione) e gli argomenti a forma di documento vengono registrati solo per dimensione.

- **Integrità della catena di audit**: La schermata di Sicurezza a volte segnalava falsamente manomissioni quando non ce n'erano. Ciò accadeva quando più scrittori riprendevano catene di hash da snapshot diversi, creando numeri di sequenza duplicati. La verifica ora funziona correttamente.

- **Correzioni alla modalità osservazione**: La modalità `observe` applicava effettivamente regole che prometteva solo di misurare. I BLOCK rigidi ora restituiscono correttamente prima della consultazione con l'approvatore, e i rifiuti sono conteggiati correttamente nelle metriche.

## Visibilità e Affidabilità del Kernel

Il kernel di trust non veniva servito via HTTP, quindi i suoi verdetti non raggiungevano i consumatori dell'API. Ora è installato correttamente per tutti gli endpoint quando `CHIMERA_GOVERNANCE` è impostato su `observe` o `enforce`. Altre correzioni di affidabilità includono:

- Gestione adeguata dei timeout dei worker
- Distinzione tra fallimenti dei task e scadenze
- Configurazione dei limiti dei container
- Ripristino automatico del backend

## Limitazioni Conosciute

L'aggiornamento risolve diversi problemi ma lascia alcune lacune note:

1. I report di `observe` non sono ancora disponibili sulle interfacce HTTP
2. L'API non ha un percorso di approvazione in modalità `enforce`
3. Quattro endpoint HTTP mancano ancora di integrazione con il kernel

Questi sono documentati nel README anziché essere lasciati come problemi nascosti.

Aggiorna ora con `pip install --upgrade chimera-agent` o tramite il tuo gestore di pacchetti preferito. Per i dettagli completi, consulta le [note di rilascio][Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0).
