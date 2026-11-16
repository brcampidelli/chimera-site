---
title: "Chimera Agent 0.90.0: Agenti governati, ospiti più sicuri e prompt misurati"
date: 2026-11-16
category: update
summary: "Questa release introduce controlli di governance sugli agenti, blocca l'accesso ospite, misura le modifiche ai prompt con una baseline di token e corregge l'accuratezza dei costi, il richiamo della memoria e la fuoriuscita di credenziali."
version: "0.90.0"
---

## Cosa ora l'agente può fare

Prima di questa release, `chimera agent` veniva eseguito con un set fisso di hook e permessi sugli strumenti. Se volevi sapere cosa la governance avrebbe deciso sulle sue azioni, dovevi tirare a indovinare. Il nuovo comando `chimera report governance` cambia le cose. Conta, per superficie e su un numero configurabile di giorni, cosa la governance ha concesso, rifiutato, inoltrato per revisione o trattenuto. In modalità `observe`, mostra anche cosa la modalità `enforce` avrebbe rifiutato o inviato a un approvatore. Questo ti offre una simulazione di una policy più restrittiva prima di attivarla.

`chimera agent` stesso ora gira sullo stesso assembly governato di chat, assist e tui. I suoi hook provengono dal progetto in cui lavora, e `--deny-tools` raggiunge gli strumenti MCP differiti. L'agente non opera più al di fuori del framework di governance che il resto dell'applicazione utilizza.

Il modello di sicurezza è stato anche rafforzato per le conversazioni condivise. Un turno ospite a cui si accedeva tramite link di condivisione poteva in precedenza raggiungere le altre conversazioni del proprietario, la casella di posta, il calendario, i pacchetti di skill, i server MCP, le istruzioni globali, gli hook, gli accessi del browser e i job di altre conversazioni. Aveva una shell e poteva eseguire qualsiasi cosa avesse potuto modificare, inclusi verificatori, formattatori, hook e comandi git. Ora gira con il minimo privilegio. Non può leggere o scrivere al di fuori della cartella della conversazione o all'interno dei dati di Chimera, nemmeno tramite symlink, giunzioni o import di istruzioni. I grafici renderizzati PNG e SVG rifiutano URL di dati remoti, e gli snapshot non seguono più link fuori dal workspace.

## Cosa è cambiato nel modo in cui i prompt sono costruiti e misurati

Le descrizioni degli strumenti MCP possono ora essere tagliate a una riga per server. Impostare `"description_mode": "one_line"` in `mcp.json` mostra al modello una riga di ogni descrizione dello strumento e serve il resto tramite una chiamata delimitata `mcp_describe` che rispetta le liste allow e deny della sessione, anche attraverso i wrapper di ledger e governance. Questa è una scelta opzionale. L'impostazione predefinita rimane con le descrizioni complete perché un'esecuzione pre-registrata di 540 iterazioni ha misurato il taglio a -24,4 punti percentuali nella selezione dello strumento alla prima chiamata, con un intervallo di confidenza di [-31,7, -16,2]. Su compiti la cui risposta si trova nella parte finale della descrizione, la scelta è un lancio di moneta. Anche ciò che il taglio fa guadagnare è stato misurato: i tentativi di azioni proibite sono scesi di 16,7 punti percentuali, dal 27,5% al 10,8%, tutti provenienti da payload nella parte finale di una descrizione dello strumento. I falsi positivi benigni non sono stati inferiori, con delle riserve.

Una baseline di token e costi è ora disponibile. `scripts/token_baseline.py` legge i log di utilizzo, esecuzione e traccia nella home del desktop e stampa solo aggregati per superficie, con copertura di prezzo e cache e una soglia minima di 30 turni al di sotto della quale viene mostrato solo il conteggio. I suoi totali corrispondono alla schermata Costi sulle stesse righe. La directory `bench/token_baseline/` contiene la pre-registrazione e la prima lettura. Questo significa che puoi tracciare le variazioni di costo dei prompt tra le versioni senza fare affidamento sulla memoria o su misurazioni ad-hoc.

Gli snapshot dello schema degli strumenti sono ora mantenuti per superficie. `tests/prompt_snapshots/schema.<surface>.txt` contiene lo schema degli strumenti che il turno Code, il turno design, la CLI, il cron e il bot inviano, assemblato dalle funzioni proprie di ogni superficie. Una descrizione dello strumento modificata appare come un diff. Il lint dei prompt lo totalizza per superficie, e `docs/tool-schema-by-surface.md` lo tabula con un conteggio stimato dei token. Questo rende le modifiche ai prompt visibili nella code review.

## Cosa era rotto ed è ora stato corretto

Il richiamo della memoria in precedenza perdeva fatti scritti in russo, cinese o giapponese. Il gate di ammissione usava uno splitter di parole solo ASCII, quindi un fatto che il richiamo aveva appena trovato veniva scartato come irrilevante senza alcun messaggio. Ora legge il testo nello stesso modo in cui lo fa il richiamo, e l'indice di ricerca del codice si adegua.

I numeri dei costi ora concordano in tutta l'applicazione. La schermata Costi mostrava un tasso di hit della cache limitato al 50%. Il limite di spesa giornaliero non contava le esecuzioni autonome `solve` e il blog writer nello stesso modo della schermata. Solo un demone cron gira ora per home, quindi un job pianificato non si attiva più due volte quando l'app e `chimera serve --cron` sono entrambi aperti.

I link in una risposta non possono più portare via le credenziali dell'app. La finestra desktop rimane sulle proprie pagine, e altri siti si aprono nel tuo browser. I token di accesso che detiene sono dati solo all'app stessa, mai a un sito a cui viene inviata o al dev-server e alle anteprime di Design al suo interno.

Le credenziali incollate non restano più nei file di sessione della chat. Le trascrizioni della chat sono mascherate su disco. Le scritture da un'altra origine sono rifiutate quando non è impostato alcun token server. Gli upload di allegati e dettatura ricevono lo stesso controllo di origine degli upload di skill. Un header bearer non-ASCII ora riceve un 401 invece di un 500.

La scheda Storage in precedenza elencava solo i worktree nella cartella temporanea di sistema, tralasciando la cartella durevole del progetto. Su una macchina, questo significava che 89 checkout e 72,9 GiB non venivano contabilizzati. Ora li elenca con dimensione, età e il motivo per cui ciascuno esiste ancora, avverte sopra un limite configurabile (`CHIMERA_WORKTREE_LIMIT_GB`, default 50) e offre di archiviare le conversazioni inattive per un numero configurabile di giorni (`CHIMERA_WORKTREE_IDLE_DAYS`, default 14) tramite la rotta di archiviazione esistente. Nulla viene eliminato automaticamente.

Un retry dopo una verifica fallita ora scala effettivamente. Aumenta lo sforzo di ragionamento, poi passa al modello singolo successivo, invece di rieseguire lo stesso modello mentre la ricevuta dichiarava fusione. La fusione non unisce più alcun turno che contenga strumenti, incluso "fuse this turn". Ogni tentativo nella ricevuta registra il modello e lo sforzo effettivamente inviati.

Ogni pagina HTML che il server distribuisce ora porta un Content-Security-Policy. Gli endpoint `/redoc` e `/docs/oauth2-redirect` di FastAPI, che erano serviti al di fuori della protezione del token senza policy e caricavano uno script CDN sull'origine dell'app, sono disattivati. `/api/docs` invia una policy che nomina esattamente ciò che Swagger carica. Un file `.htm` o `.xhtml` isolato nella root del bundle riceve la stessa policy di `.html`. Un nuovo test richiede ogni pagina ed enumera ogni rotta al di fuori dell'API in modo che la prossima non possa essere rilasciata senza una policy.

Aggiorna con `pip install chimera-agent --upgrade`. Le note di rilascio complete sono su [Chimera Agent v0.90.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.90.0).
