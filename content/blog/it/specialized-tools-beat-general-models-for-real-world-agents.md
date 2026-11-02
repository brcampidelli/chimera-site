---
title: "Strumenti specializzati battono i modelli generali per gli agenti nel mondo reale"
date: 2026-11-02
category: analysis
summary: "Gli agenti che scelgono lo strumento giusto per ogni compito superano i modelli generici, ma l'adozione nel mondo reale è ancora frenata da costi e fiducia."
sources:
  - headline: "Adobe is testing how well AI agents can use editing tools like a Photoshop professional would"
    url: https://the-decoder.com/adobe-is-testing-how-well-ai-agents-can-use-editing-tools-like-a-photoshop-professional-would/
    outlet: "The Decoder"
    published: 2026-11-01
  - headline: "Basically no one is using AI agents for their DoorDash orders"
    url: https://arstechnica.com/ai/2026/10/doordash-says-outside-ai-agents-have-only-led-to-hundreds-of-orders-so-far/
    outlet: "Ars Technica"
    published: 2026-10-30
  - headline: "Zest's new AI agent finds restaurants and books reservations over text"
    url: https://techcrunch.com/2026/10/30/zests-new-ai-agent-finds-restaurants-and-books-reservations-over-text/
    outlet: "TechCrunch"
    published: 2026-10-30
dropped: "80 matérias examinadas de 530 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (2), publicado há 122h (1), publicado há 245h (1), publicado há 294h (1), publicado há 296h (1), publicado há 480h (1)"
---

Il divario tra ciò che gli agenti AI sanno fare in laboratorio e ciò per cui le persone li usano davvero si sta allargando. EditAgent di Adobe dimostra che gli strumenti specializzati, non modelli generali più grandi, sono la chiave per prestazioni competenti, ma richiede dieci volte la potenza di calcolo. Nel frattempo, gli agenti rivolti ai consumatori come l'ordinazione su DoorDash e il concierge per ristoranti di Zest faticano a trovare utenti. La lezione per chi sviluppa: concentrarsi sulla selezione degli strumenti e sull'efficienza, non solo sulla scala del modello.

## Lo strumento giusto per il lavoro

Adobe Research e UC San Diego hanno costruito EditAgent, un sistema AI che modifica le immagini più come un professionista di Photoshop. Invece di riprovare sempre lo stesso editor generico, l'agente sceglie lo strumento specializzato giusto per ogni compito e lascia che un modello linguistico standard selezioni il risultato migliore basandosi su dati misurati dell'immagine [[1]](https://the-decoder.com/adobe-is-testing-how-well-ai-agents-can-use-editing-tools-like-a-photoshop-professional-would/). Questo approccio funziona, ma richiede circa dieci volte la potenza di calcolo. Il compromesso è chiaro: la competenza deriva dall'orchestrazione, non solo dalla potenza bruta del modello.

Per chi sviluppa agenti, questa è un'intuizione cruciale. I modelli generici sono versatili ma inefficienti. Dando a un agente una cassetta di strumenti specializzati e un modo per valutare i risultati, si possono ottenere risultati migliori, se ci si può permettere il sovraccarico. La sfida è rendere quell'orchestrazione abbastanza economica per la produzione.

## Il divario di adozione

Nonostante i progressi tecnici, l'uso nel mondo reale rimane basso. Ars Technica riporta che praticamente nessuno usa agenti AI per i propri ordini su DoorDash, anche se è ancora presto per un caso d'uso e-commerce relativamente nuovo [[2]](https://arstechnica.com/ai/2026/10/doordash-says-outside-ai-agents-have-only-led-to-hundreds-of-orders-so-far/). Allo stesso modo, il nuovo agente AI di Zest trova ristoranti e prenota tavoli via messaggio, ma è appena stato lanciato e affronta la stessa battaglia in salita per la fiducia degli utenti [[3]](https://techcrunch.com/2026/10/30/zests-new-ai-agent-finds-restaurants-and-books-reservations-over-text/).

Perché questa esitazione? Per i consumatori, gli agenti sono ancora inaffidabili e opachi. Un ordine DoorDash sbagliato o una prenotazione pasticciata è un vero inconveniente. Per le aziende, il costo di eseguire agenti come EditAgent è proibitivo. Finché gli agenti non diventeranno sia affidabili che accessibili, l'adozione resterà indietro rispetto alle capacità.

## Cosa dovrebbero fare gli sviluppatori

Primo, investire nella selezione degli strumenti. Invece di affidarsi a un singolo modello per fare tutto, progettare agenti che possano scegliere da un insieme di strumenti specializzati e valutare i risultati oggettivamente. Secondo, ottimizzare per l'efficienza. Il costo di calcolo decuplicato di EditAgent è un avvertimento: se il tuo agente non è snello, non scalerà. Infine, costruire la fiducia in modo incrementale. Iniziare con compiti a basso rischio dove gli errori sono tollerabili, e lasciare che gli utenti vedano il ragionamento dell'agente. La strada verso l'adozione è lastricata di piccole vittorie affidabili, non di demo appariscenti.
