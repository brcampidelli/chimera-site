---
title: "La supply chain del tuo agente ora è un modello di minaccia"
date: 2026-10-20
category: analysis
summary: "Tre segnali di questa settimana convergono su un unico punto: l'agente che costruisci è affidabile solo quanto lo stack che tocca, e quello stack si sta frammentando rapidamente."
sources:
  - headline: "Microsoft says AI agents are like insider threats as 'frontier models can't be trusted'"
    url: https://techcrunch.com/2026/10/19/microsoft-says-ai-agents-are-like-insider-threats-as-frontier-models-cant-be-trusted/
    outlet: "TechCrunch"
    published: 2026-10-19
  - headline: "DeepSeek ajuda Huawei a desenhar chips: o que muda na disputa com a Nvidia"
    url: https://exame.com/inteligencia-artificial/deepseek-ajuda-huawei-a-desenhar-chips-o-que-muda-na-disputa-com-a-nvidia/
    outlet: "Exame"
    published: 2026-10-19
  - headline: "Release: llm-tools-datasette 0.1.1"
    url: https://simonwillison.net/2026/Oct/18/llm-tools-datasette/
    outlet: "Simon Willison"
    published: 2026-10-18
dropped: "389 matérias examinadas de 571 reunidas, 3 lidas para este texto. Descartadas: HTTP 429 (18), publicado há 18272h (4), publicado há 3468h (3), publicado há 168h (2), publicado há 3492h (2), publicado há 6368h (2)"
---

Il confine della fiducia in un agente AI non è il modello. È la supply chain. Quando connetti un modello a un tool, un database o un chip, erediti la postura di sicurezza di ogni anello di quella catena—e questa settimana, tre segnali distinti mostrano che quegli anelli si stanno irrigidendo in linee di faglia geopolitiche e architetturali.

I ricercatori di sicurezza di Microsoft hanno iniziato a classificare gli agenti distribuiti dai dipendenti come minacce interne. Il ragionamento è brutale: i modelli frontier non sono affidabili, e i sistemi a cui si connettono—fogli di calcolo, repo di codice, API interne—non sono controllati dai lab che hanno costruito i modelli [[1]](https://techcrunch.com/2026/10/19/microsoft-says-ai-agents-are-like-insider-threats-as-frontier-models-cant-be-trusted/). Non è una preoccupazione teorica sulla prompt injection. È una posizione operativa. L'agente è un utente che non hai provisionato, in esecuzione con credenziali che non hai auditato, su un percorso di ragionamento che non puoi riprodurre. Per chiunque costruisca agenti oggi, l'implicazione è che il layer di chiamata ai tool non è più solo un problema di integrazione; è un problema di permessi che il tuo IAM esistente non è mai stato progettato per risolvere.

Questo problema si aggrava quando l'hardware sotto l'agente cambia. DeepSeek sta collaborando con Huawei sul design dei chip, con l'obiettivo di portare i processori cinesi più vicini all'inviluppo prestazionale richiesto dai moderni carichi di lavoro AI [[2]](https://exame.com/inteligencia-artificial/deepseek-ajuda-huawei-a-desenhar-chips-o-que-muda-na-disputa-com-a-nvidia/). L'obiettivo è esplicito: ridurre la dipendenza dal silicio americano. Per chi costruisce agenti, questa non è una storia industriale lontana. Significa che il substrato di inferenza si sta biforcando. Un agente distribuito su un cloud può girare su Nvidia; un agente distribuito su un altro può girare su un chip progettato da Huawei con un profilo di memoria diverso, stranezze di precisione numerica diverse e una catena di attestazione di sicurezza diversa. La model card non catturerà questo. I punteggi dei benchmark non lo rifletteranno. Ma il comportamento dell'agente—specialmente le chiamate ai tool sensibili alla latenza e il ragionamento a lungo orizzonte—cambierà.

## Il layer dei tool è dove la fiducia si rompe per prima

Il rilascio di llm-tools-datasette 0.1.1 da parte di Simon Willison rende il pattern concreto [[3]](https://simonwillison.net/2026/Oct/18/llm-tools-datasette/). La libreria espone un'istanza Datasette a un LLM come tool. Questo è esattamente il tipo di integrazione che rende utili gli agenti: interrogare un database live, ottenere risultati strutturati, agire su di essi. Ma illustra anche la compressione della fiducia che avviene quando dai a un modello un'interfaccia SQL. Il modello non comprende la sensibilità dello schema. Non sa quali colonne contengono PII o quali tabelle sono solo in append per ragioni di compliance. Quei vincoli vivono nella definizione del tool, nei grant dell'utente SQL e nel percorso di rete tra il runtime dell'agente e il database. Se uno qualsiasi di questi è mal configurato, il modello esfiltrerà dati felicemente non perché è malevolo, ma perché gli è stata posta una domanda che lo richiedeva.

## Cosa cambia per chi costruisce

Il takeaway pratico è che l'architettura degli agenti sta diventando architettura della supply chain. Ne conseguono tre cose.

Primo, i permessi dei tool devono essere least-privilege per default e con scope per istanza di agente, non per utente. L'umano che ha attivato l'agente può avere ampio accesso al database; l'agente non dovrebbe ereditarlo. Secondo, il percorso hardware conta. Se il tuo agente esegue inferenza su un chip che non puoi auditare—che sia perché è un cloud chiuso o una supply chain geopoliticamente vincolata—stai accettando una dipendenza di fiducia che non puoi verificare. Terzo, ogni tool che colleghi a un agente è un contratto. Dovrebbe esporre non solo una firma di funzione, ma un confine di sicurezza: quali dati può accedere, quali effetti collaterali può causare e cosa logga.

La posizione di Microsoft segnala che le aziende presto richiederanno questo contratto prima di permettere agli agenti di avvicinarsi ai sistemi di produzione. La collaborazione DeepSeek-Huawei segnala che l'hardware sotto quel contratto non sarà uniforme. E tool come llm-tools-datasette segnalano che la superficie d'attacco si sta espandendo più velocemente della governance. Gli agenti che costruisci oggi gireranno su uno stack che non controlli completamente. L'unica cosa che puoi controllare è l'interfaccia tra il modello e il mondo. Rendila stretta, rendila auditabile e rendila revocabile.
