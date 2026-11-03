---
title: "Supply-Chain-Management für Intelligenz ist jetzt der Job des Agentenbauers"
date: 2026-11-03
category: analysis
summary: "Klagen, Verluste und No-Code-Trainingswerkzeuge deuten alle auf denselben Wandel hin: Der Wert in der KI verschiebt sich von der Modellerstellung zur Modellmontage, und die Agentenbauer erben das Chaos."
sources:
  - headline: "The New York Times sues Brave web browser for AI scraping and bypassing paywalls"
    url: https://www.theverge.com/tech/1024588/brave-lawsuit-ai-scraping-new-york-times
    outlet: "The Verge"
    published: 2026-11-02
  - headline: "Trajectory raises $45M to make AI model training accessible to nontechnical experts"
    url: https://techcrunch.com/2026/11/02/trajectory-raises-45m-to-make-ai-model-training-accessible-to-nontechnical-experts/
    outlet: "TechCrunch"
    published: 2026-11-02
  - headline: "Anthropic grows revenue twelvefold but posts $23 billion loss"
    url: https://the-decoder.com/anthropic-grows-revenue-twelvefold-but-posts-23-billion-loss/
    outlet: "The Decoder"
    published: 2026-11-02
dropped: "77 matérias examinadas de 586 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (3), publicado há 74h (2), publicado há 75h (2), publicado há 146h (2), publicado há 78h (1), publicado há 79h (1)"
---

Die Grenze zwischen dem Konsumieren und dem Produzieren von Informationen ist kollabiert, und das Rechtssystem hinkt gerade erst hinterher. Wenn ein Browser stillschweigend das gesamte Archiv einer Zeitung scrapen kann, um ein Modell zu trainieren, zerbricht der alte Deal des Webs – kostenlose Inhalte gegen Werbeaufrufe. Für alle, die Agenten bauen, ist das kein ferner Urheberrechtsstreit. Es ist ein Signal, dass die Datenlieferkette, von der Ihr Agent abhängt, bald restriktiver, teurer und feindseliger wird.

Die New York Times und andere Verlage verklagen Brave Software mit der Begründung, der Browser-Hersteller habe ihre Inhalte für KI-Training gescraped und Nutzern geholfen, Paywalls zu umgehen [[1]](https://www.theverge.com/tech/1024588/brave-lawsuit-ai-scraping-new-york-times). Die Klage zielt sowohl auf die Aufnahmeseite als auch auf die Auslieferungsseite ab: die Daten nehmen und es dann Endnutzern trivial machen, nicht dafür zu bezahlen. Dieser doppelte Vorwurf ist wichtig, weil er exakt widerspiegelt, wie viele Agent-Pipelines heute funktionieren. Ein Agent ruft eine Seite ab, extrahiert strukturierten Text und füttert ihn in ein Kontextfenster. Wenn das Geschäftsmodell des Verlags darauf beruht, dass ein Mensch eine Paywall oder Werbung sieht, sieht der Agent beides nicht. Die rechtliche Gefährdung ist nicht länger theoretisch.

## Die Ökonomie der Modellerstellung zerbricht

Während die Datenschicht unter rechtlichem Druck steht, zeigt die finanzielle Schicht eigene Risse. Anthropics Umsatz verzwölffachte sich, dennoch wies das Unternehmen vor seinem Börsengang einen operativen Verlust von 23 Milliarden Dollar aus [[3]](https://the-decoder.com/anthropic-grows-revenue-twelvefold-but-posts-23-billion-loss/). Diese Zahl ist nicht wegen ihrer Größe erschütternd, sondern weil sie offenbart, wie weit die Branche noch von einer tragfähigen Unit-Economics entfernt ist. Das Training von Frontier-Modellen verschlingt Kapital in einem Tempo, das selbst explosives Umsatzwachstum nicht ausgleichen kann. Die Implikation für Agentenbauer ist klar: Die Kosten für die Rohintelligenz, die Ihr Agent verbraucht, werden von Investoren subventioniert, nicht von Kunden. Diese Subvention wird nicht von Dauer sein.

Wenn die Subvention endet, werden Modellanbieter die Preise erhöhen, Zugangsstufen einschränken oder beides. Agenten, die heute für jede Teilaufgabe ein großes Modell aufrufen, müssen umgebaut werden, um sparsamer zu sein – einfachere Anfragen an kleinere Modelle weiterleiten, aggressiver cachen und härtere Entscheidungen darüber treffen, wann eine Aufgabe wirklich Frontier-Denkleistung erfordert. Die Ära, in der man ein massives Modell als unendliche, billige Ressource behandelt, geht zu Ende.

## Die Werkzeugebene verschiebt sich nach unten

Im selben Moment, in dem die Spitze des Stacks unter Druck steht, öffnet sich die Basis. Trajectory, ein ein Jahr altes Startup mit einer Bewertung von 300 Millionen Dollar, sammelte 45 Millionen Dollar ein, um Werkzeuge zu bauen, mit denen nichttechnische Experten KI-Modelle trainieren können [[2]](https://techcrunch.com/2026/11/02/trajectory-raises-45m-to-make-ai-model-training-accessible-to-nontechnical-experts/). Der Pitch zielt nicht darauf ab, maschinelles Lernen zu vereinfachen. Es geht darum, den Akt der Modellerstellung näher an die Leute zu bringen, die die Domäne verstehen – die Fachexperten, die wissen, wie gute Ergebnisse aussehen, aber keine Trainingsschleife schreiben können.

Für Agentenbauer verändert das die Make-or-Buy-Rechnung. Wenn ein Fachexperte in Ihrem Team ein kleines Modell für eine spezifische Klassifikations- oder Extraktionsaufgabe ohne Entwicklerunterstützung feinabstimmen kann, verschiebt sich die Agentenarchitektur. Sie leiten nicht mehr alles durch ein einziges Allzweckmodell, sondern beginnen, spezialisierte Komponenten zu komponieren. Dieses Kompositionsproblem – welches Modell man wann, mit welchem Prompt und unter welcher Governance aufruft – ist genau das Problem, zu dessen Lösung Agent-Frameworks existieren.

## Was für Builder hängen bleibt

Die drei Geschichten weisen in dieselbe Richtung. Der Datenzugang wird rechtlich umkämpft. Die Modellökonomie ist bei aktuellen Preisen nicht tragfähig. Werkzeuge machen die Produktion spezialisierter Modelle billiger. Der Job des Agentenbauers ist nicht länger nur Prompt Engineering oder Chain-Design. Es ist Supply-Chain-Management für Intelligenz: zu wissen, woher Ihre Daten kommen, was ihre Verarbeitung kostet und welches Modell das richtige Werkzeug für jedes Glied in der Kette ist. Bauen Sie jetzt Auditierbarkeit in Retrieval-Pfade ein, bevor die Regulierung es erzwingt. Entwerfen Sie Agentenarchitekturen, die anmutig degradieren, wenn eine Datenquelle wegfällt oder eine Modell-API teurer wird. Die Builder, die diese Einschränkungen als Designparameter behandeln, nicht als Hindernisse, sind diejenigen, deren Agenten noch laufen werden, wenn die Subventionen enden.
