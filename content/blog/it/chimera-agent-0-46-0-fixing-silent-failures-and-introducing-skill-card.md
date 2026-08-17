---
title: "Chimera Agent 0.46.0: Risoluzione di Errori Silenti e Introduzione delle Skill Card"
date: 2026-08-17
category: update
summary: "Chimera Agent 0.46.0 risolve errori silenti, introduce una libreria di skill curata e garantisce traduzioni affidabili in nove lingue."
version: "0.46.0"
---

## Risoluzione di Errori Silenti

Chimera Agent 0.46.0 affronta una serie di errori silenti che in passato passavano inosservati. Questi problemi non causavano crash o errori evidenti, ma compromettevano funzionalità critiche. Ad esempio, cinque archivi JSON perdevano dati silenziosamente a causa della mancanza di meccanismi di blocco durante le operazioni di lettura-modifica-scrittura. Ciò significava che un processo poteva sovrascrivere le modifiche di un altro senza alcun avviso. Uno di questi archivi era lo skill store, dove i dati appresi potevano essere cancellati da esecuzioni successive. Ora, tutti e cinque gli archivi bloccano e scrivono in modo atomico, garantendo l'integrità dei dati.

Un altro errore silente riguardava il bot Discord dell'app, che veniva eseguito senza un adeguato sistema di protezione. Ciò impediva al build gate di rilevarlo, lasciando un potenziale gap di sicurezza. Allo stesso modo, un governance fence che terminava la CLI all'importazione quando attivato passava inosservato perché nessuno lo aveva mai eseguito con la governance attiva. Questi problemi sono stati risolti, assicurando che le funzionalità si comportino come previsto.

## Libreria di Skill Curata

Questa release introduce una libreria di skill curata, con 23 skill card raggruppate in base alla loro applicazione nel workflow: definire, costruire, verificare, revisionare e distribuire. Queste card sono dati, non codice, rendendole facili da contribuire e revisionare. Ogni card include sezioni come Trigger, Do, Avoid, Check e Risk, e sono disponibili in nove lingue. Le traduzioni sono gestite in un file sidecar, garantendo che la skill card originale rimanga byte-identica.

Tuttavia, l'inserimento di queste card nel prompt dell'agente è opzionale e disattivato di default a causa di un significativo aumento nell'uso di token senza un corrispondente miglioramento delle prestazioni. Questa decisione si basa su un test A/B registrato che mostrava un miglioramento del +16,7pp ma non raggiungeva le soglie di significatività.

## Traduzioni Affidabili

Un nuovo test garantisce che le traduzioni delle skill card siano affidabili e complete. Separa tre stati che appaiono identici all'interno di un file: obsolete, incomplete e mancanti. Le traduzioni obsolete pretendono di tradurre un testo che è cambiato, mentre quelle incomplete mancano di sezioni. Le traduzioni mancanti sono debiti onesti, chiaramente marcati come tali. Questo gate evita il problema di card non tradotte che appaiono nell'interfaccia, un problema precedentemente rilevabile solo leggendo i file, non facendo fallire i build.

## Correzioni alla Documentazione

Sono state corrette 16 affermazioni nella documentazione che il codice non supportava, in tutte e dieci le lingue. Cinque di queste erano completamente false, come le opzioni di governance e le destinazioni della desktop rail. Inoltre, due affermazioni ora includono avvertenze necessarie, assicurando che gli utenti abbiano informazioni accurate.

## Prossimi Passi

Per aggiornare a Chimera Agent 0.46.0, esegui:

```
pip install -U chimera-agent
pip install -U 'chimera-agent[desktop]'
```

Per maggiori dettagli, consulta le [note di rilascio][Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0).

[Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0): chimeraagent.space/release-notes
