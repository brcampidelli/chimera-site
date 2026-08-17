---
title: "Chimera Agent 0.46.0: Regeln, die auch nebenan gelten"
date: 2026-08-17
category: update
summary: "Behoben: Stiller Datenverlust, nicht übersetzte Skill-Karten und Barrieren, die nicht blockierten – plus eine Bibliothek mit 23 aus Incidents abgeleiteten Skill-Karten."
version: "0.46.0"
---

## Wenn Regeln nicht reichen

Fünf JSON-Stores, inklusive des Skill-Stores, erlaubten bisher konkurrierenden Prozessen, sich gegenseitig Daten stillschweigend zu überschreiben. Ein Durchlauf, der etwas gelernt hatte, konnte seinen Speicher durch den nächsten Durchlauf verlieren. Alle fünf arbeiten jetzt atomar mit Lock-Mechanismus – keine Konfiguration nötig. Das gleiche Muster behob Governance-Features, die beim Import abstürzten, und einen Discord-Bot, der ohne Checks lief.

## Skill-Karten als Incident-Reports

Dreiundzwanzig Karten liegen jetzt in `skills/`, dreizehn basierend auf Defekten dieses Projekts. Jede dokumentiert ein Fehlverhalten im Format Trigger/Do/Avoid/Check/Risk – Daten, nicht Code. Sie sind nach Workflow-Phasen gruppiert (`define · build · verify · review · ship`) und nach Themen getaggt. Import mit:

```
chimera skills-import skills/verify-before-claiming
```

Karten unterstützen neun Sprachen durch Sidecar-Dateien, die den originalen SHA-256-Hash bewahren. Das System erkennt veraltete Übersetzungen (die geänderte Texte übersetzen sollen) und unvollständige (fehlende Abschnitte), erlaubt aber klar gekennzeichnete fehlende Übersetzungen.

## Barrieren, die wirklich blockieren

Drei Agenten-Defekte untergruben lasttragende Komponenten, ohne Tests zu failen. Ursache: Checks listeten erforderliche Verhaltensweisen statt erlaubter Ausnahmen. Bei neuen Verhaltensweisen blieben die Barrieren offen. Jetzt listen sie Ausnahmen – wenn etwas nicht explizit Checks umgehen darf, wird es geprüft.

Sechzehn Dokumentationsaussagen wurden in zehn Sprachen korrigiert. Fünf waren schlicht falsch: Governance-Modi enthalten kein `ask`, die Desktop-Rail hat kein Chat-Ziel, und `CHIMERA_TAVILY_API_KEY` existiert nicht im Codebase. Zwei optimistische Aussagen tragen jetzt widersprechende Belege bei.

```
pip install -U chimera-agent
```

Skill-Karten unter chimeraagent.space/skills [Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0) oder `bench/skillcard/RESULTS.md` für Performance-Tradeoffs (Opt-in).
