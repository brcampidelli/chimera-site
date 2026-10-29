---
title: "Chimera 0.79.1: le approvazioni funzionano, i connettori partono, e i design prendono forma"
date: 2026-10-29
category: update
summary: "La 0.79.1 corregge le race condition sulle approvazioni dei design, i connettori Windows che si rompevano, l'inondazione del contesto con base64 e le prime proposte vuote — oltre alla persistenza dei permessi per progetto."
version: "0.79.1"
---

## Cosa rompeva le approvazioni — e cosa impedisce le race adesso

Prima di questo rilascio, approvare un design poteva fallire con un messaggio fuorviante: "another Chimera process asked this question." Il fallimento non c'entrava niente con un altro processo. L'approvazione del design riceve risposta come una domanda nella sua conversazione, e la risposta compare nella finestra delle approvazioni, nella barra di stato e nell'elenco Governance. Solo lo schermo del proprietario può rispondere. Il problema era che due risposte in arrivo nello stesso istante potevano collidere, e il sistema non aveva modo di registrarne esattamente una e proseguire. L'errore era rumore, ma bloccava l'approvazione e lasciava l'utente senza un percorso di ripristino chiaro.

La versione 0.79.1 gestisce la cosa correttamente. Quando due risposte raggiungono l'approvazione contemporaneamente, esattamente una viene registrata — la race viene risolta, non rigettata. L'approvazione si completa, il design avanza e l'utente vede uno stato coerente su tutte e tre le superfici UI. Chiunque costruisca agenti che producono output di design instradandolo attraverso un passo di approvazione umana ora può fare affidamento sul flusso Governance senza un crash intermittente che, fin dall'inizio, non aveva nulla a che fare con la concorrenza.

## Una proposta di design che non è testo vuoto

Chimera Design aveva un problema più profondo: la sua prima proposta era praticamente inutilizzabile. Il modello restituiva un'operazione malformata, il sistema mostrava un errore grezzo che il modello non poteva riparare e la conversazione si bloccava. Anche quando l'operazione era strutturalmente valida, la proposta stessa era solo testo semplice — niente tipografia, niente sfondi, niente forme. Significava che la prima interazione con Design era un prompt che chiedeva output visuale e non riceveva nulla di visuale in cambio.

La correzione ha quattro parti. Un'operazione malformata ora torna come un argument error che il modello può correggere, così la conversazione si auto-ripara invece di fermarsi. Ogni operazione mostra la sua forma attesa, dando al modello un bersaglio preciso da colpire. Quando una proposta viene troncata perché cerca di impacchettare troppe operazioni in un turno, il sistema rileva il troncamento e richiede con meno operazioni. Infine, la prima proposta richiede tipografia, sfondi e forme di default — l'output parte visuale fin dal primo turno. Il risultato è una prima proposta utilizzabile senza un ciclo di tentativi manuali.

## Connettori che partono, e file che non inondano il contesto

Due correzioni infrastrutturali contano per chiunque connetta tool esterni. Primo, gli utenti Windows che eseguivano connettori tramite launcher `.cmd` — Supabase via `npx` è il caso più comune — incontravano un blocco silenzioso quando il comando del connettore conteneva una `&` nel suo URL. Il launcher interpretava il carattere, il comando si spezzava e il connettore non partiva mai. Ora Chimera rifiuta un argomento che non può passare in sicurezza e ti dice perché, così il fallimento è esplicito e risolvibile. L'app inoltre non aspetta più che i server MCP si connettano prima di aprirsi. In precedenza, l'UI poteva restare bloccata su "Failed to fetch" per un massimo di due minuti mentre i connettori andavano in timeout. Il servizio si apre immediatamente, e le connessioni si risolvono in background.

Secondo, i connettori che restituiscono audio o immagini inline — la narrazione di VoiceStudio, per esempio — in precedenza scaricavano base64 direttamente nel contesto del modello. Il modello doveva leggere il blob codificato come testo, il che riempiva la finestra di contesto e fermava il turno. Quei file ora vengono salvati nella cartella `mcp-output/` del progetto, tenuti fuori dai commit, e la conversazione vi fa riferimento come artefatti riproducibili o visualizzabili. Il modello non vede mai i byte grezzi, e il turno si completa senza esaurire il contesto.

## Stato dei permessi che sopravvive a un riavvio

L'interruttore "Ignore permissions" ora vive a livello di progetto e persiste attraverso i riavvii. Un interruttore a livello di progetto copre tutte le sue conversazioni, incluse quelle nuove, mentre ogni conversazione mantiene comunque il proprio toggle indipendente. Attivare l'interruttore di progetto rilascia immediatamente le card che sono già in attesa di permesso. Dopo un riavvio, un banner elenca ogni progetto e conversazione salvati che avevano l'interruttore attivo; confermi con un clic per riattivarli, e il resto viene scartato. Solo lo schermo desktop può attivare l'interruttore, e disattivarlo si applica sempre ovunque — il confine di sicurezza è unidirezionale.

## Cosa fare ora

Aggiorna con `pip install chimera-agent==0.79.1`. Se usi Design, avvia una nuova proposta e verifica che la prima risposta includa struttura visuale. Se sei su Windows con Supabase o qualsiasi connettore basato su `npx`, verifica che il connettore parta senza bisogno di escape manuale degli argomenti. Le note complete sono su [Chimera Agent v0.79.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.79.1).
