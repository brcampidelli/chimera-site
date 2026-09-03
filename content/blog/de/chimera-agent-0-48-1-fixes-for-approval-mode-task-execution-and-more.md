---
title: "Chimera Agent 0.48.1: Korrekturen für Approval Mode, Task-Ausführung und mehr"
date: 2026-09-03
category: update
summary: "Chimera Agent 0.48.1 behebt kritische Probleme mit dem Approval Mode, der Task-Ausführung und Kostenberichten, was einen reibungsloseren Betrieb und bessere Sicherheit gewährleistet."
version: "0.48.1"
---

## Approval Mode funktioniert jetzt wie vorgesehen

Die Einstellung `CHIMERA_APPROVAL_MODE=allow` arbeitet nun korrekt auf allen Oberflächen, inklusive der Desktop-App und `chimera serve`. Zuvor funktionierte diese Einstellung nur bei `solve` und `crew`, was bei den meisten Nutzern zu unerwarteten Ablehnungen führte. Diese Korrektur stellt sicher, dass gefährliche Tools nicht mehr blockiert werden, wenn nicht vertrauenswürdige Inhalte gelesen werden – entsprechend der ursprünglichen Absicht der Einstellung. Benchmarks zeigen, dass das System mit einem Approver 85,7% der Angriffe blockiert, während alle legitimen Arbeiten durchlaufen, eine deutliche Verbesserung gegenüber der vorherigen Ablehnungsrate von 50% für berechtigte Tasks.

## Vereinheitlichte Task-Ausführungsansicht

Die Work-Ansicht wurde optimiert, um Redundanzen zu reduzieren und die Bedienbarkeit zu verbessern. Bisher mussten Nutzer zwischen vier verschiedenen Formularen für die Task-Ausführung wählen, die jeweils dieselben Eingaben erforderten. Dies führte zu Ineffizienz und Frustration, da ein Methodenwechsel das erneute Eintippen des Tasks bedeutete. Jetzt übernimmt ein einziges Fenster mit vier Buttons alle Ausführungsmodi, vereinfacht den Prozess und reduziert die Anzahl der Tabs von fünf auf vier. Diese Änderung gewährleistet auch, dass Tasks und Checks konsistent über alle Modi hinweg sind, während Versuche, Rollen und Worker-Slots modus-spezifisch bleiben.

## Wichtige Korrekturen und Ergänzungen

- **Leere Variablen stürzen die App nicht mehr ab:** Eine leere `CHIMERA_GUARD_CHAT` Variable in der `.env`-Datei verhinderte zuvor den Start der App. Dies wurde behoben – leere Werte werden jetzt als nicht gesetzt behandelt statt einen Absturz zu verursachen.
- **Kostenanzeige für teure Modelle:** Der Kostenmesser zeigt nun korrekte Kosten für alle Modelle an, inklusive teurer wie `claude-opus-5` und `gpt-5.5`. Zuvor wurden diese Modelle aufgrund eines fehlenden Funktionsaufrufs als „unbekannt“ angezeigt.
- **Fokusring für Buttons:** Die Button-Komponente übernimmt nun korrekt den gemeinsamen Fokusring und behebt damit eine visuelle Inkonsistenz.

## Neue Funktion: Verzögertes Laden von Tools

Die Einstellung `CHIMERA_DEFER_TOOLS` wurde hinzugefügt, um den Token-Verbrauch zu reduzieren, indem Tool-Schemas erst bei Bedarf geladen werden. Benchmarks zeigen eine 26%ige Kostenreduktion pro abgeschlossenem Task, obwohl die Auswirkung auf Task-Abschlussraten noch unklar ist. Diese Einstellung ist aufgrund der gemischten Ergebnisse standardmäßig deaktiviert.

## Nächste Schritte

Aktualisieren Sie auf Chimera Agent 0.48.1, um diese Korrekturen und Verbesserungen zu nutzen. Detaillierte Release Notes finden Sie unter [Chimera Agent v0.48.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.1).
