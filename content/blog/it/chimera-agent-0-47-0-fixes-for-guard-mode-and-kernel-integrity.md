---
title: "Chimera Agent 0.47.0: Correzioni per la Modalità Guard e l'Integrità del Kernel"
date: 2026-08-19
category: update
summary: "Correzioni critiche per l'affidabilità della modalità guard, l'accuratezza nell'applicazione delle regole e la visibilità del kernel in distribuzioni governate."
version: "0.47.0"
---

## La Modalità Guard Ora Segnala i Rifiuti Correttamente

Un gate che rifiuta una chiamata a uno strumento restituiva precedentemente una stringa di osservazione che non iniziava con `error:`, facendo sì che il sistema la registrasse come riuscita. Questo interessava tre superfici: il frame desktop, i log degli step e il rilevamento delle deviazioni. Un'esecuzione in cui ogni azione pericolosa era bloccata appariva riuscita in tutti i dati strutturati, con il modello che riportava persino azioni completate come force push che non erano mai avvenuti. Il kernel ora contrassegna correttamente i rifiuti, e il testo del rifiuto identifica quale guard ha preso la decisione.

## Corretta la Corrispondenza delle Regole per Script Multi-linea

Il motore delle regole interpolava precedentemente il testo dello script usando `repr`, che convertiva i newline in due caratteri. Questo interrompeva i confini delle parole nei pattern delle regole, causando due problemi:

1. Script semplici a una riga potevano bypassare le protezioni perché il `\n` si fondeva con la parola successiva
2. Documenti Markdown che citavano comandi pericolosi venivano bloccati erroneamente

Due regole non si attivavano mai a causa di questo problema. Il testo ora viene passato alle regole senza conversione, corrispondendo al comportamento effettivo degli script.

## Il Sistema di Audit Non Memorizza Più Segreti

Un'operazione governata `write_file` memorizzava l'intero contenuto del file in `audit.jsonl`, inclusi dati sensibili come file `.env` o chiavi private. Questo accadeva anche quando un'altra guard aveva già bloccato l'operazione. L'audit ora redige il contenuto sensibile (usando un redattore esistente precedentemente collegato solo alle tracce degli step) e registra argomenti a forma di documento come metadati di sola dimensione.

## Aggiunta Visibilità del Kernel agli Endpoint HTTP

I verdetti del kernel di trust non erano inclusi nelle risposte HTTP per gli endpoint run, batch e turn. Ciò significava che decisioni critiche come le approvazioni dei force push non erano visibili ai client. Il kernel è ora correttamente installato nelle superfici HTTP quando `CHIMERA_GOVERNANCE` è `observe` o `enforce`. Nota che le distribuzioni HTTP non richiedono mai input sul terminale del server - la persona a quella console non ha fatto la richiesta.

## Altre Correzioni

- Le catene di audit non segnalano più falsamente manomissioni da scritture concorrenti
- La modalità `observe` conta ora correttamente i rifiuti che doveva solo misurare
- I worker bloccati non trattengono più interi batch indefinitamente
- I limiti delle risorse dei container possono ora essere configurati
- Aggiunti controlli del budget del contesto per l'uso del terminale

## Limiti Conosciuti

Il team ha documentato esplicitamente tre lacune attuali invece di lasciarle da scoprire:

1. I report di `observe` non sono ancora visibili nelle interfacce HTTP
2. L'API manca di un percorso di approvazione in modalità `enforce`
3. Quattro endpoint HTTP non includono ancora i verdetti del kernel

Aggiorna con `pip install --upgrade chimera-agent` o consulta [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) per le note di rilascio dettagliate.
