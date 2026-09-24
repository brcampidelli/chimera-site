---
title: "I modelli open guadagnano terreno nello sviluppo di agenti con Claude e Granite"
date: 2026-08-26
category: analysis
summary: "L'integrazione di Claude con Ollama e i modelli open-weight Granite di IBM segnalano un cambiamento verso framework per agenti più accessibili e personalizzabili."
sources:
  - headline: "Claude Desktop support with Ollama · Ollama Blog"
    url: https://ollama.com/blog/claude-desktop
    outlet: "Ollama"
    published: 2026-08-25
  - headline: "IBM's new Granite 4.2 models ride the wave of interest in local LLMs"
    url: https://arstechnica.com/ai/2026/08/ibms-new-granite-4-2-models-ride-the-wave-of-interest-in-local-llms/
    outlet: "Ars Technica"
    published: 2026-08-26
  - headline: "IBM drops open-weight Granite 4.2 family with built-in agentic capabilities under Apache 2.0"
    url: https://the-decoder.com/ibm-drops-open-weight-granite-4-2-family-with-built-in-agentic-capabilities-under-apache-2-0/
    outlet: "The Decoder"
    published: 2026-08-26
dropped: "370 matérias examinadas de 556 reunidas, 3 lidas para este texto. Descartadas: HTTP 429 (16), publicado há 16964h (4), publicado há 2160h (3), publicado há 2184h (2), publicado há 6692h (2), publicado há 6739h (2)"
---

Lo scenario dello sviluppo di agenti AI si sta orientando verso apertura e flessibilità. Due recenti sviluppi—l'integrazione di Claude con Ollama e il rilascio da parte di IBM della famiglia di modelli Granite 4.2—evidenziano una tendenza crescente: gli strumenti per costruire agenti stanno diventando più accessibili e adattabili a esigenze specifiche. Questo cambiamento è rilevante per gli sviluppatori che vogliono controllo sul proprio stack senza sacrificare capacità.

## Modelli open entrano nell'ecosistema Claude

La nuova compatibilità di Claude con Ollama [[1]](https://ollama.com/blog/claude-desktop) significa che gli sviluppatori possono ora instradare richieste di Claude Desktop attraverso Ollama come gateway di terze parti. Questo crea un ponte tra l'interfaccia di Claude e i modelli open, ampliando le opzioni per chi preferisce o richiede alternative open-source. La mossa riconosce che molti costruttori di agenti vogliono combinare componenti piuttosto che essere vincolati a ecosistemi proprietari.

## Granite porta capacità agentiche a pesi open

I modelli Granite 4.2 di IBM [[2]](https://arstechnica.com/ai/2026/08/ibms-new-granite-4-2-models-ride-the-wave-of-interest-in-local-llms/)[[3]](https://the-decoder.com/ibm-drops-open-weight-granite-4-2-family-with-built-in-agentic-capabilities-under-apache-2-0/) spingono ulteriormente questa apertura integrando capacità agentiche direttamente in modelli con licenza Apache 2.0. L'addestramento "agentic RL" della versione 30B permette al modello di apprendere autonomamente l'uso di strumenti e l'esecuzione di codice—funzionalità tipicamente associate a sistemi proprietari. Con finestre di contesto fino a 512.000 token e tre varianti di dimensioni (3B, 8B, 30B), Granite offre opzioni scalabili per diversi scenari di deployment, specialmente in ambienti enterprise dove la prevedibilità conta.

## Implicazioni pratiche per i costruttori di agenti

Per gli sviluppatori, questi sviluppi significano più scelte nell'architettura di sistemi agentici. L'integrazione Claude-Ollama permette di testare interfacce proprietarie con modelli open, mentre i pesi open di Granite con capacità agentiche integrate riducono la dipendenza da API chiuse per comportamenti avanzati. Il punto chiave è che la barriera per sperimentare e distribuire agenti capaci continua ad abbassarsi—purché si sia disposti a lavorare direttamente con gli strumenti anziché con soluzioni preconfezionate.
