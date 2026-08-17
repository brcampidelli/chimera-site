---
title: "Chimera Agent 0.46.0: Stille Fehler behoben und Skill Cards eingeführt"
date: 2026-08-17
category: update
summary: "Chimera Agent 0.46.0 behebt stille Fehler, führt eine kuratierte Skill-Bibliothek ein und gewährleistet zuverlässige Übersetzungen in neun Sprachen."
version: "0.46.0"
---

## Stille Fehler behoben

Chimera Agent 0.46.0 behebt eine Reihe stiller Fehler, die bisher unentdeckt blieben. Diese Probleme verursachten keine Abstürze oder Fehlermeldungen, beeinträchtigten jedoch kritische Funktionen. Beispielsweise verloren fünf JSON-Stores Daten, weil Locking-Mechanismen während Lese-Modifizier-Schreibe-Operationen fehlten. Ein Prozess konnte so Änderungen eines anderen überschreiben, ohne Warnung. Einer dieser Stores war der Skill-Store, wo gelernte Daten durch nachfolgende Läufe gelöscht werden konnten. Jetzt sperren und schreiben alle fünf Stores atomar, was Datenintegrität sichert.

Ein weiterer stiller Fehler betraf den Discord-Bot der App, der ohne korrekte Absicherung lief. Die Build-Gate konnte ihn nicht erkennen, was ein Sicherheitsrisiko darstellte. Ebenso blieb eine Governance-Absicherung unentdeckt, die die CLI beim Import beendete – weil niemand sie jemals mit aktivierter Governance ausführte. Diese Probleme wurden behoben, sodass Funktionen nun wie erwartet arbeiten.

## Kuratierte Skill-Bibliothek

Diese Version führt eine kuratierte Skill-Bibliothek mit 23 Skill Cards ein, gruppiert nach Anwendung im Workflow: define, build, verify, review und ship. Diese Cards sind Daten, kein Code, was Beiträge und Reviews erleichtert. Jede Card enthält Abschnitte wie Trigger, Do, Avoid, Check und Risk und ist in neun Sprachen verfügbar. Übersetzungen werden in einer Sidecar-Datei verwaltet, sodass die Original-Card byteidentisch bleibt.

Das Einlesen dieser Cards in den Prompt des Agents ist jedoch optional und standardmäßig deaktiviert, da der Token-Verbrauch stark ansteigt, ohne signifikante Leistungsverbesserung. Diese Entscheidung basiert auf einem A/B-Test, der eine Verbesserung von +16,7 Prozentpunkten zeigte, aber keine Signifikanz erreichte.

## Zuverlässige Übersetzungen

Ein neuer Test stellt sicher, dass Skill-Card-Übersetzungen vollständig und korrekt sind. Er unterscheidet drei Zustände, die in einer Datei identisch aussehen: veraltet, unvollständig und fehlend. Veraltete Übersetzungen beziehen sich auf geänderte Texte, unvollständige fehlen Abschnitte. Fehlende Übersetzungen sind klar markierte Lücken. Diese Gate verhindert, dass unübersetzte Cards in der UI erscheinen – ein Problem, das bisher nur durch Dateilesen, nicht durch Build-Fehler, erkennbar war.

## Dokumentationskorrekturen

Sechzehn falsche Behauptungen in der Dokumentation, die der Code nicht unterstützte, wurden in allen zehn Sprachen korrigiert. Fünf davon waren schlicht falsch, wie die Governance-Optionen und Desktop-Rail-Destinations. Zwei Behauptungen enthalten nun notwendige Hinweise, sodass Nutzer präzise Informationen haben.

## Nächste Schritte

Führen Sie folgende Befehle aus, um auf Chimera Agent 0.46.0 zu aktualisieren:

```
pip install -U chimera-agent
pip install -U 'chimera-agent[desktop]'
```

Details finden Sie in den [Release Notes][Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0).

[Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0): chimeraagent.space/release-notes
