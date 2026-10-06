---
title: "Chimera Agent 0.49.3: Correggere Ciò che si Rompe in Uso, non Solo in Lettura"
date: 2026-10-06
category: update
summary: "Sei difetti risolti dopo test in ambienti reali, inclusi fallimenti silenziosi in scrittura, risultati di test fuorvianti e impostazioni predefinite obsolete per i modelli."
version: "0.49.3"
---

## Quando gli Strumenti Mentono sul Loro Stato

La lezione più costosa è arrivata dalla lettura di dati MCP. Un task da 5,11$ non ha prodotto alcun file perché il messaggio di rifiuto non distingueva tra diniego umano e approvazione impossibile. Tre tentativi identici hanno bruciato il budget prima che gli utenti capissero che i riprovi erano inutili. Ora ogni caso di rifiuto si spiega: il diniego umano mostra chi ha rifiutato, quello del sistema indica il blocco di configurazione, e i casi HTTP dichiarano esplicitamente l'assenza di un approvatore suggerendo due soluzioni - abilitare la pausa-per-approvazione o evitare contenuti non attendibili.

## Verifiche che non Verificavano

Un badge `verified: True` con log di test passati diventava inutile quando scritture successive alteravano i file. Gli utenti vedevano segni di spunta verdi mentre lavoravano con contenuti non verificati. Il sistema ora traccia se i file consegnati corrispondono allo stato verificato e mostra badge di avviso in caso di divergenza. La verifica originale rimane visibile - era accurata al momento del rilascio - ma la discordanza attuale appare accanto.

## Impostazioni Predefinite che non lo Erano Più

Le assegnazioni dei modelli erano peggiorate pericolosamente:
- Il modello principale costava 4 volte le opzioni attuali
- Un modello preview occupava uno slot predefinito critico
- Le finestre di contesto non raggiungevano i requisiti minimi

Le nuove impostazioni corrispondono al rapporto prezzo/prestazioni attuale (deepseek-v4-flash-0731 a 1/4 del costo) mantenendo le capacità. Il file .env.example non suggerisce più modelli ritirati o prezzi di un'altra epoca. Nota: la selezione non si basava su test di qualità dell'output - otto candidati scrivevano tutti i file correttamente - ma su fattori misurabili: prezzo, finestra di contesto e benchmark di terze parti.

## Cosa Fare Ora

Aggiornate subito se usate:
- Server MCP (comportamento dei test modificato)
- Verifica file (nuovo rilevamento discordanze)
- Impostazioni predefinite modelli (cambiamenti significativi costo/prestazioni)

I dettagli tecnici completi spiegano la logica di ogni correzione: [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
