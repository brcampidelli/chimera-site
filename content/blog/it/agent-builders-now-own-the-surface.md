---
title: "Chi sviluppa agenti ora possiede la superficie"
date: 2026-10-29
category: analysis
summary: "Le nuove piattaforme di sviluppo di Google mostrano che chi sviluppa agenti, non chi possiede le app, sta diventando l'interfaccia primaria verso utenti e strumenti."
sources:
  - headline: "Como criar um agente de IA com Python, LangChain e ferramentas | IA Expert Academy"
    url: https://iaexpert.academy/2026/10/28/como-criar-um-agente-de-ia-com-python-langchain-e-ferramentas/
    outlet: "IA Expert Academy"
    published: 2026-10-28
  - headline: "As AI agents reshape the web, Google opens Gemini and Search to more apps"
    url: https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/
    outlet: "TechCrunch"
    published: 2026-10-28
  - headline: "Google opens Android development to third-party AI agents and unveils new Gemini APIs"
    url: https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/
    outlet: "The Decoder"
    published: 2026-10-28
dropped: "87 matérias examinadas de 585 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (2), publicado há 149h (1), publicado há 198h (1), publicado há 200h (1), publicado há 384h (1), publicado há 675h (1)"
---

La superficie del software si sta spostando. Per anni, l'interfaccia è stata l'app: uno schermo, un pulsante, un form. Ora l'interfaccia è sempre più l'agente—e chi controlla l'agente controlla cosa l'utente può fare. Due annunci di Google di questa settimana rendono questo cambiamento concreto, non più speculativo.

Google sta aprendo Gemini e Search a servizi di terze parti tramite una nuova piattaforma di sviluppo, permettendo alle aziende di portare le proprie offerte direttamente dentro le esperienze AI di Google [[2]](https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/). Allo stesso tempo, Android Studio riceverà una funzionalità "Bring Your Own Agent" che supporterà più di 40 coding agent, inclusi Claude Agent di Anthropic e Codex di OpenAI [[3]](https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/). Lo schema è lo stesso in entrambi i casi: Google non sta costruendo l'agente per te. Sta costruendo il posto dove il tuo agente gira e la superficie dove il tuo agente appare.

## L'agente è il nuovo punto di ingresso

Per chiunque sviluppi agenti, questo cambia la questione della distribuzione. Non devi più convincere un utente a installare la tua app o visitare il tuo sito. Devi convincere un agente—o la piattaforma che lo ospita—che il tuo servizio è lo strumento giusto per il lavoro. È un tipo diverso di problema ingegneristico. Riguarda la discoverability, le descrizioni degli strumenti e l'esecuzione affidabile, non i flussi di onboarding o le notifiche push.

La mossa su Android Studio è più specifica ma altrettanto indicativa. Google non sta spingendo un singolo coding agent proprietario. Sta aprendo l'IDE a qualsiasi agente lo sviluppatore voglia usare. Gli strumenti da terminale menzionati da Google sono progettati per aiutare gli agenti a completare task UI più velocemente e con meno token [[3]](https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/). È un riconoscimento del fatto che le performance degli agenti sono ora una preoccupazione della piattaforma. Il compito della piattaforma è rendere gli agenti più efficienti, non rimpiazzarli.

## Progettare strumenti diventa il vero lavoro

Il tutorial di IA Expert Academy, per quanto più basilare, punta nella stessa direzione. Spiega passo passo come costruire un agente che usa strumenti, consulta prezzi, calcola sconti e combina funzioni per completare un task [[1]](https://iaexpert.academy/2026/10/28/como-criar-um-agente-de-ia-com-python-langchain-e-ferramentas/). La parte interessante non è il codice LangChain. È la struttura: l'agente è valido tanto quanto gli strumenti che può chiamare e l'ordine in cui li chiama. È lì che risiede oggi la vera ingegneria.

Quando Google apre Search a servizi esterni, la stessa logica si applica su scala web. Un'azienda che vuole essere trovata da un agente deve descrivere il proprio servizio in un modo che un agente possa analizzare, valutare e su cui possa agire. È un nuovo tipo di design delle API. Non basta esporre un endpoint. Devi esporre intento, vincoli e modalità di fallimento in un modo su cui un agente possa ragionare.

## Cosa significa per chi sviluppa

Il concetto pratico è semplice: smetti di pensare agli agenti come a una funzionalità dentro il tuo prodotto. Inizia a pensare al tuo prodotto come a uno strumento dentro l'agente di qualcun altro. Questo significa investire in descrizioni chiare degli strumenti, output prevedibili e azioni piccole e componibili. Significa testare il tuo servizio contro più agenti, non solo il tuo. E significa trattare l'ecosistema degli agenti come un canale di distribuzione, con tutto il lavoro di discoverability e affidabilità che questo comporta.

Le piattaforme non stanno aspettando. Stanno costruendo i binari proprio ora. Chi sviluppa e capisce che il suo vero utente è spesso un altro pezzo di software sarà quello i cui strumenti verranno chiamati.
