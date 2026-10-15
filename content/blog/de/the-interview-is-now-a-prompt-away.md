---
title: "Das Vorstellungsgespräch ist jetzt nur noch einen Prompt entfernt"
date: 2026-10-15
category: analysis
summary: "McKinseys KI-Kundeninterview und die Autonomie-Experimente der Finanzbranche offenbaren denselben Wandel: Agenten sind keine Werkzeuge mehr, die man benutzt, sondern Rollen, die man entwirft und anhand derer man bewertet."
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

In dem Moment, in dem ein Unternehmen von einem Kandidaten verlangt, seinen Wert unter Beweis zu stellen, indem er mit einer Maschine spricht, hört die Maschine auf, ein Werkzeug zu sein, und wird zum Maßstab. Genau diese Grenze haben wir diese Woche überschritten, und das verändert, was es bedeutet, einen Agenten zu bauen.

McKinsey & Company wird nun von einigen Bewerbern für Einstiegspositionen verlangen, im Rahmen des Bewerbungsprozesses ein zehnminütiges Gespräch mit einer KI-Simulation eines Kunden zu führen [[2]](https://www.theverge.com/news/1011654/mckinsey-ai-client-interview). Das ist kein Chatbot, der nach Schlüsselwörtern sucht. Es ist ein Rollenspiel-Gegner, der testen soll, wie ein Mensch unter Druck denkt. Die KI ist nicht der Assistent im Raum. Sie ist der Türsteher.

Für alle, die Agenten bauen, ist die Konsequenz unmittelbar. Evaluierung ist kein separates Anliegen mehr, das man nach dem Training anhängt. Wenn eine Firma wie McKinsey einen simulierten Kunden einsetzt, um menschliche Leistung zu beurteilen, gilt dieselbe Logik für die Agenten, die man ausliefert. Ihr Agent ist nicht fertig, wenn er einen Benchmark besteht. Er ist fertig, wenn er sich gegen ein simuliertes Gegenüber behaupten kann, das gebaut wurde, um seine Schwächen aufzudecken. Wenn Sie keine kontradiktorischen Evaluierungsumgebungen für Ihre Agenten konstruieren, wird es jemand anderes für Sie tun – und diese Person wird entscheiden, ob Ihr System produktionsreif ist.

## Autonomie an der Leine

Dieselbe Spannung zwischen Fähigkeit und Kontrolle zeigte sich in einem ganz anderen Umfeld. Auf der AI Engineer New York diskutierten Frontier Labs und Finanzunternehmen, wie man Agenten sinnvolle Autonomie über folgenreiche Entscheidungen geben kann, während ein Mensch in der Schleife bleibt [[3]](https://www.latent.space/p/crossing-the-threshold). Die Finanzbranche hat nicht den Luxus, schnell zu handeln und sich später zu entschuldigen. Ein falscher Trade, der von einem Agenten mit echtem Geld ausgeführt wird, ist keine Halluzination, die man neu generieren kann. Es ist ein Verlust.

Was aus diesen Gesprächen hervorging, ist ein Muster, das weit über die Finanzwelt hinaus gilt: Die interessantesten Agentenarchitekturen sind nicht die, die Autonomie maximieren, sondern die, die die Grenze zwischen Autonomie und Aufsicht explizit und prüfbar machen. Der Agent fragt nicht bei jedem Schritt um Erlaubnis. Er operiert innerhalb einer deklarierten Schwelle und legt seine Argumentation offen, wenn er sich dem Rand dieser Schwelle nähert. Das ist kein technisches Detail. Es ist eine Governance-Grundeinheit.

## Die wahre Bewertung ist Vertrauen

Apple hat während des regulären Handels kurzzeitig eine Marktbewertung von 5 Billionen Dollar erreicht, eine Zahl, die so groß ist, dass sie abstrakt wird [[1]](https://www.infomoney.com.br/mercados/apple-atinge-valor-de-mercado-inedito-de-us-5-tri-e-segue-como-segunda-mais-valiosa/). Aber die Zahl selbst ist nicht der Punkt. Der Punkt ist, was eine solche Bewertung über die Zeit aufrechterhält: eine Kette von Entscheidungen darüber, was auf dem Gerät läuft, was das Gerät verlässt und wer den Unterschied prüfen darf. Diese Kette besteht aus denselben Governance-Fragen, die Finanzunternehmen über ihre Agenten stellen und die McKinsey in seinen Einstellungsprozess einbettet.

Wenn ein Unternehmen entscheidet, dass eine KI einen Kunden gut genug simulieren kann, um einen Menschen zu beurteilen, trifft es eine Aussage darüber, wo es Vertrauen setzt. Dieselbe Aussage wird jedes Mal getroffen, wenn Sie entscheiden, ob Ihr Agent eine externe API aufruft, in eine Datenbank schreibt oder eine E-Mail ohne menschliche Beteiligung sendet. Die Entwickler, die das verstehen, werden aufhören, Evaluierung als Phase zu behandeln, und anfangen, sie als Infrastruktur zu behandeln. Sie werden simulierte Gegenüber bauen, die ihre Agenten herausfordern, bevor die Welt es tut. Und sie werden die Schwellen der Autonomie nicht in einem Designdokument definieren, sondern in Code, der inspiziert, getestet und zur Rechenschaft gezogen werden kann.

Das ist die praktische Erkenntnis. Bauen Sie den Evaluator, bevor Sie den Agenten bauen. Machen Sie die Grenze zwischen Autonomie und Aufsicht zu einer konfigurierbaren Grundeinheit, nicht zu einer Handschlag-Vereinbarung. Und gehen Sie davon aus, dass jeder Agent, den Sie ausliefern, irgendwann einem simulierten Gegner gegenübersteht, der darauf ausgelegt ist, ihn zu brechen. Wenn Sie diesen Gegner nicht zuerst bauen, wird es jemand anderes tun.
