---
title: "Il colloquio adesso è a un prompt di distanza"
date: 2026-10-15
category: analysis
summary: "L’intervista AI di McKinsey e gli esperimenti sull’autonomia nel settore finanziario rivelano lo stesso cambiamento: gli agenti non sono più strumenti che usi, ma ruoli che progetti e rispetto ai quali vieni valutato."
sources:
  - headline: "Apple atinge valor de mercado inédito de US$ 5 tri e segue como segunda mais valiosa"
    url: https://www.infomoney.com.br/mercados/apple-atinge-valor-de-mercado-inedito-de-us-5-tri-e-segue-como-segunda-mais-valiosa/
    outlet: "InfoMoney"
    published: 2026-10-14
  - headline: "McKinsey is making job applicants spar with a fake AI client"
    url: https://www.theverge.com/news/1011654/mckinsey-ai-client-interview
    outlet: "The Verge"
    published: 2026-10-14
  - headline: "Crossing the Threshold: How OpenAI and Anthropic Approach Autonomy and Safety in Financial Agents"
    url: https://www.latent.space/p/crossing-the-threshold
    outlet: "Latent Space"
    published: 2026-10-14
dropped: "9 matérias examinadas de 589 reunidas, 3 lidas para este texto."
---

Nel momento in cui un’azienda chiede a un candidato di dimostrare il proprio valore parlando con una macchina, la macchina smette di essere uno strumento e diventa lo standard. È la linea che abbiamo superato questa settimana, e cambia il significato stesso di costruire un agente.

McKinsey & Company ora chiederà ad alcuni candidati entry-level di sostenere una conversazione di 10 minuti con una simulazione AI di un cliente, come parte del processo di selezione [[2]](https://www.theverge.com/news/1011654/mckinsey-ai-client-interview). Non è un chatbot che cerca parole chiave. È un avversario che interpreta un ruolo, progettato per testare come un essere umano ragiona sotto pressione. L’AI non è l’assistente nella stanza. È il guardiano.

Per chiunque costruisca agenti, l’implicazione è immediata. La valutazione non è più una preoccupazione separata da aggiungere in un secondo momento dopo l’addestramento. Se un’azienda come McKinsey usa un cliente simulato per giudicare le prestazioni umane, la stessa logica si applica agli agenti che rilasci. Il tuo agente non è pronto quando supera un benchmark. È pronto quando riesce a tenere testa a una controparte simulata costruita apposta per esporne le debolezze. Se non stai costruendo ambienti di valutazione avversariali per i tuoi agenti, qualcun altro li costruirà per te — e sarà lui a decidere se il tuo sistema è adatto alla produzione.

## Autonomia al guinzaglio

La stessa tensione tra capacità e controllo è emersa in un contesto molto diverso. All’AI Engineer New York, laboratori di frontiera e aziende finanziarie hanno discusso come concedere agli agenti un’autonomia utile su decisioni rilevanti, mantenendo un essere umano nel ciclo [[3]](https://www.latent.space/p/crossing-the-threshold). Il settore finanziario non ha il lusso di muoversi velocemente e chiedere scusa dopo. Un trade sbagliato eseguito da un agente con denaro reale non è un’allucinazione che puoi rigenerare. È una perdita.

Ciò che è emerso da quelle conversazioni è uno schema che si applica ben oltre la finanza: le architetture agentiche più interessanti non sono quelle che massimizzano l’autonomia, ma quelle che rendono esplicito e verificabile il confine tra autonomia e supervisione. L’agente non chiede il permesso a ogni passo. Opera entro una soglia dichiarata e rende visibile il proprio ragionamento quando si avvicina al limite di quella soglia. Questo non è un dettaglio tecnico. È una primitiva di governance.

## La vera valutazione è la fiducia

Apple ha brevemente toccato una valutazione di mercato di 5 trilioni di dollari durante le contrattazioni regolari, un numero così grande da diventare astratto [[1]](https://www.infomoney.com.br/mercados/apple-atinge-valor-de-mercado-inedito-de-us-5-tri-e-segue-como-segunda-mais-valiosa/). Ma il numero in sé non è il punto. Il punto è cosa sostiene una valutazione del genere nel tempo: una catena di decisioni su cosa viene eseguito sul dispositivo, cosa lo lascia e chi ha il diritto di verificare la differenza. Quella catena è fatta delle stesse domande di governance che le aziende finanziarie si pongono sui loro agenti e che McKinsey sta incorporando nel suo processo di assunzione.

Quando un’azienda decide che un’AI può simulare un cliente abbastanza bene da giudicare un essere umano, sta dichiarando dove ripone la propria fiducia. La stessa dichiarazione viene fatta ogni volta che decidi se il tuo agente può chiamare un’API esterna, scrivere su un database o inviare un’email senza un essere umano nel ciclo. Chi sviluppa e lo capisce smetterà di trattare la valutazione come una fase e inizierà a trattarla come infrastruttura. Costruirà controparti simulate che sfidano i propri agenti prima che lo faccia il mondo. E definirà le soglie di autonomia non in un documento di design, ma in codice che può essere ispezionato, testato e ritenuto responsabile.

Questo è il punto pratico. Costruisci il valutatore prima di costruire l’agente. Rendi il confine tra autonomia e supervisione una primitiva configurabile, non un accordo verbale. E dai per scontato che ogni agente che rilasci prima o poi affronterà un avversario simulato progettato per romperlo. Se non lo costruisci tu per primo quell’avversario, lo farà qualcun altro.
