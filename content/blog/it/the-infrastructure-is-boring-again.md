---
title: "L'infrastruttura è tornata noiosa"
date: 2026-11-19
category: analysis
summary: "Quando i picconi e le pale passano di mano e chi costruisce modelli incassa, inizia il vero lavoro dell'agent engineering."
sources:
  - headline: "Microsoft CEO Satya Nadella remains confident in Nvidia after Huang’s exit"
    url: https://techcrunch.com/2026/11/18/microsoft-ceo-satya-nadella-remains-confident-in-nvidia-after-huangs-exit/
    outlet: "TechCrunch"
    published: 2026-11-18
  - headline: "Anthropic faz maior IPO da história e transforma seus sete fundadores em multibilionários"
    url: https://neofeed.com.br/negocios/anthropic-faz-maior-ipo-da-historia-e-transforma-seus-sete-fundadores-em-multibilionarios/
    outlet: "NeoFeed"
    published: 2026-11-18
  - headline: "Nvidia’s rise, visualized"
    url: https://www.theverge.com/tech/1035924/nvidia-visualized-revenue-profit-earnings-after-huang
    outlet: "The Verge"
    published: 2026-11-18
dropped: "18 matérias examinadas de 607 reunidas, 3 lidas para este texto."
---

Il mercato sta finalmente tracciando una linea tra l'infrastruttura che rende possibile l'AI e le applicazioni che la rendono utile. Negli ultimi tre anni, questi livelli si sono sovrapposti. Le aziende di modelli fondazionali assorbivano il dramma della carenza di chip e il mistero delle leggi di scalabilità. Ora, con un passaggio di leadership nel fornitore hardware più critico del settore e un'IPO da record per un laboratorio di modelli leader, la separazione sta diventando permanente. Per chiunque costruisca agenti, questa non è una storia finanziaria. È una storia di architettura.

Il fondatore di Nvidia si è fatto da parte, passando il controllo ad interim a Colette Kress. L'AD di Microsoft ha immediatamente segnalato fiducia nella transizione [[1]](https://techcrunch.com/2026/11/18/microsoft-ceo-satya-nadella-remains-confident-in-nvidia-after-huangs-exit/). Questo è importante perché le GPU Nvidia restano il substrato per quasi tutta l'inferenza di modelli seria. Un passaggio di consegne stabile significa che la pipeline hardware su cui girano gli agenti non cambia forma all'improvviso. La lezione per chi costruisce non riguarda il prezzo delle azioni. Riguarda il fatto che il livello fisico sta maturando in una utility prevedibile. Le utility prevedibili ti permettono di pianificare la capacità, stimare la latenza e smettere di preoccuparti se il tuo runtime esisterà il prossimo trimestre.

## Il livello dei modelli incassa

Lo stesso giorno, Anthropic è sbarcata in borsa con la più grande IPO della storia, raccogliendo 68 miliardi di dollari con un ulteriore collocamento privato da 26 miliardi [[2]](https://neofeed.com.br/negocios/anthropic-faz-maior-ipo-da-historia-e-transforma-seus-sete-fundadores-em-multibilionarios/). Sette fondatori sono diventati multi-miliardari. L'azienda dietro Claude ha ora una valutazione pubblica che riflette quanto il mercato pensa valgano i modelli di frontiera. Per chi costruisce agenti, questo è un segnale che il livello dei modelli si sta consolidando in pochi fornitori ben capitalizzati. L'era in cui ci si chiedeva quale laboratorio sarebbe sopravvissuto sta finendo. Comprerai intelligenza da una manciata di vendor stabili, più o meno come oggi compri compute cloud.

Questo cambia il modo in cui progetti le architetture degli agenti. Quando i fornitori di modelli erano startup fragili, aveva senso coprirsi astrando l'interfaccia del modello nello strato più sottile possibile, per mantenere facile la migrazione. Ora che i fornitori sono aziende pubbliche con bilanci solidi, il trade-off cambia. Puoi permetterti un'integrazione più profonda con le capacità specifiche di un modello, i suoi pattern di uso dei tool, il suo modo particolare di gestire contesti lunghi. Il costo di switching resta reale, ma il rischio che il tuo fornitore svanisca è molto più basso.

## Il vero lavoro si sposta più in alto nello stack

I grafici dei ricavi e dei profitti di Nvidia, visualizzati mentre il suo fondatore si dimette, mostrano un'azienda che estrae valore straordinario dal fondo dello stack [[3]](https://www.theverge.com/tech/1035924/nvidia-visualized-revenue-profit-earnings-after-huang). L'IPO di Anthropic mostra valore straordinario estratto dal centro. La cima dello stack, dove gli agenti fanno effettivamente cose, è ancora tutta da giocare. Nessuno si è quotato in borsa sulla forza di un framework per agenti. Nessuno è diventato multi-miliardario risolvendo evaluation, governance o model routing onesto.

È lì che risiede il lavoro pratico. Quando i chip sono una commodity stabile e i modelli sono un'API stabile, la differenziazione si sposta su tutto ciò che sta intorno al modello: come decidi quale modello chiamare, come verifichi l'output, come mantieni onesto un agente per un migliaio di passi. L'infrastruttura è tornata noiosa, e questa è la migliore notizia possibile. Significa che puoi costruirci sopra senza che il terreno ti tremi sotto i piedi.

Per chi oggi scrive codice per agenti, ne conseguono tre cose. Primo, tratta il tuo fornitore di modelli come una dipendenza durevole, non temporanea. Impara i suoi affordance specifici. Secondo, investi nell'harness di evaluation e nel livello di governance, perché quelle sono le parti che non saranno commoditizzate dalla prossima offerta pubblica. Terzo, progetta il tuo sistema in modo che cambiare modello resti possibile ma non a costo zero. L'astrazione giusta non è la più sottile. È quella che ti permette di catturare il valore di un modello specifico tenendo aperta una porta. Picconi e pale sono passati di mano. Chi li usa può decidere cosa costruire.
