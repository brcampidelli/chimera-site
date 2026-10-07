---
title: "Chimera Agent 0.50.0: Transparenz, Kontrolle und Zuverlässigkeit"
date: 2026-10-07
category: update
summary: "Chimera Agent 0.50.0 bringt mehr Transparenz, bessere Kontrolle und Behebungen für stille Fehler."
version: "0.50.0"
---

## Einblick in Agenten-Operationen

Bisher war die Aufgabenliste des Agenten für Benutzer unsichtbar, obwohl das Feld `RunState.tasks` existierte. Nun zeigt der Agent seine Aufgabenliste in Echtzeit an und markiert Elemente als in Bearbeitung oder abgeschlossen. Diese Liste bleibt auch bei der Komprimierung des Kontexts erhalten, sodass lange Ausführungen ihre Pläne nicht verlieren. Diese Änderung behebt eine häufige Frustration, bei der Benutzer nicht sehen konnten, was der Agent tat, insbesondere bei längeren Operationen.

## Erreichbarkeit jenseits der Konsole

Agenten, die unbeaufsichtigt laufen, wie Cron-Jobs, konnten nicht effektiv mit Benutzern kommunizieren, wenn eine Genehmigung erforderlich war. Durch die Einstellung von `CHIMERA_APPROVAL_WEBHOOK` können Benutzer nun Genehmigungsanfragen in ihren bevorzugten Kanälen erhalten. Diese Änderung stellt sicher, dass Agenten Benutzer erreichen können, auch wenn niemand aktiv die Konsole überwacht. Zuvor scheiterten diese Anfragen stillschweigend, wenn keine Liefermethode verfügbar war, was zu unerwarteten Entscheidungen führte.

## Governance-Kontrolle

Die Governance-Funktion, die ein Audit-Log enthält, war bisher unzugänglich. Obwohl der Sicherheitsbildschirm das Audit-Log anzeigte, gab es keine Möglichkeit, es zu aktivieren. Nun können Benutzer die Governance mit dem Parameter `CHIMERA_GOVERNANCE` einschalten. Diese Änderung gibt Benutzern die Möglichkeit, die Sicherheitseinstellungen ihres Agenten zu überwachen und zu kontrollieren, was eine Lücke in Transparenz und Kontrolle schließt.

## Verbesserte Modellbehandlung

Agenten gingen bisher von einer Standard-Token-Fenstergröße für nicht explizit katalogisierte Modelle aus, was zu Kontextüberläufen und Ausführungsfehlern führte. Mit diesem Release ruft der Agent nun die korrekte Token-Fenstergröße aus dem Live-Index für nicht katalogisierte Modelle ab. Zusätzlich wurden fünf Katalogeinträge korrigiert, um genaue Token-Fenster und Preise widerzuspiegeln. Diese Änderung verhindert, dass Ausführungen aufgrund falscher Annahmen über Modellfähigkeiten scheitern.

## Verbesserte Nachverfolgbarkeit

Traces zeichnen nun auf, welches Backend jeden Schritt bedient hat, nicht nur welches Modell geantwortet hat. Dies ist besonders wichtig für Modelle wie die auf OpenRouter, bei denen ein einzelner Modell-Slug einen Pool von Endpunkten mit unterschiedlichen Fähigkeiten und Kosten darstellen kann. Zuvor konnten Benutzer nicht zwischen verschiedenen Endpunkten unterscheiden, was zu Verwirrung und ungenauen Messungen führte. Diese Änderung verbessert die Transparenz und Genauigkeit bei der Leistungsverfolgung.

## Was als Nächstes zu tun ist

Um von diesen Verbesserungen zu profitieren, aktualisieren Sie auf Chimera Agent 0.50.0 und lesen Sie die [Release Notes][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) für detaillierte Anweisungen zur Konfiguration neuer Funktionen wie `CHIMERA_APPROVAL_WEBHOOK` und `CHIMERA_GOVERNANCE`.
