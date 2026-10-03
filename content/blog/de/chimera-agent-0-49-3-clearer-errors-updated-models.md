---
title: "Chimera Agent 0.49.3: Klarere Fehlermeldungen, aktualisierte Modelle"
date: 2026-10-03
category: update
summary: "Sechs Korrekturen für irreführende Meldungen und veraltete Voreinstellungen, alle durch den Einsatz des Frameworks in realen Projekten identifiziert."
version: "0.49.3"
---

## Wenn MCP blockierte Schreibvorgänge liest

Das Lesen von Daten über MCP führte bisher zu fehlerhaften Durchläufen, ohne zu erklären, warum Schreibvorgänge scheiterten. Die Fehlermeldung fasste drei unterschiedliche Szenarien zusammen: Nutzerverweigerung, Besitzerkonfiguration und Fälle, in denen keine menschliche Genehmigung einer HTTP-Anfrage möglich war. Nutzer erhielten identische Ablehnungsmeldungen für alle drei Fälle, was zu sinnlosen Wiederholungsversuchen führte. Jetzt gibt es für jedes Szenario eine spezifische Erklärung – besonders wichtig im HTTP-Kontext, wo die Meldung klarstellt, dass eine Genehmigung unmöglich ist und entweder Pause-zur-Genehmigung empfiehlt oder rät, nicht vertrauenswürdige Inhalte zu vermeiden.

## Tests, die wirklich testen

Der MCP-Test-Button überprüfte bisher nur die Serververbindung, ohne anzuzeigen, ob Agenten die Tools tatsächlich nutzen konnten. Ein Server konnte den Test bestehen, während seine Tools für Agenten unzugänglich blieben (wenn das Laden von MCP-Servern beim Start deaktiviert war). Jetzt prüft der Test sowohl die Verbindung als auch die tatsächliche Verfügbarkeit, mit separaten Meldungen für jede mögliche Problemursache.

## Verifizierung vs. Auslieferung

Die Laufverifizierung zeigte bisher nur `verified: True`, ohne anzuzeigen, ob die aktuellen Dateien mit den verifizierten übereinstimmten. Ein verifizierter Lauf konnte später komplett andere Inhalte enthalten (20/20 Testfehler in einem beobachteten Fall) ohne visuellen Hinweis. Jetzt verfolgen Läufe `delivered_matches_verified` und zeigen klare Badges an, wenn sich die Dateiinhalte vom verifizierten Zustand unterscheiden.

## Aktualisierte Modellvoreinstellungen

Die Standardmodellauswahl entsprach nicht mehr dem aktuellen Angebot:
- Basismodell von `deepseek-chat-v3.1` (0.25/0.95) auf `deepseek-v4-flash-0731` (0.065/0.18) geändert
- Top-Modell ersetzt `deepseek-r1` durch `z-ai/glm-5.3`
- Fusions-Judge und Panel-Seats auf aktuelle Modellgenerationen aktualisiert

Diese Änderungen basieren auf messbaren Verbesserungen bei Preis, Kontextfenstergröße und Drittanbieter-Benchmarks – nicht auf unbelegten Qualitätsbehauptungen. Vorschaumodelle wurden außerdem aus Standardpositionen entfernt, wo Nutzer sie nicht explizit auswählten.

## Weitere Korrekturen
- Skill-Installationsfehler identifizieren jetzt korrekt den ablehnenden Host
- Schreibrechte für absolute Pfade zeigen klare Vergleiche mit workspace-relativen Glob-Patterns
- `.env.example` empfiehlt keine veralteten Modelle oder falsche Preise mehr

Update mit `pip install --upgrade chimera-agent` oder siehe [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3) für Details.
