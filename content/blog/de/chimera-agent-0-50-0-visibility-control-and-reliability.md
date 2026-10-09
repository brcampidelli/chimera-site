---
title: "Chimera Agent 0.50.0: Sichtbarkeit, Kontrolle und Zuverlässigkeit"
date: 2026-10-09
category: update
summary: "Chimera Agent 0.50.0 führt Sichtbarkeit in Agenten-Aufgaben ein, fügt Genehmigungs-Webhooks hinzu, erweitert Governance-Kontrollen, ermöglicht hybrides Retrieval und behebt Probleme mit Kontextfenstern von Modellen."
version: "0.50.0"
---

## Einblick in Agenten-Aufgaben

Eine der wichtigsten Neuerungen in Chimera Agent 0.50.0 ist die Einführung von Aufgabensichtbarkeit. Zwar existierte das Feld `RunState.tasks` bereits, doch es wurde nie befüllt – Nutzer hatten keine Ahnung, was der Agent gerade tat. Jetzt pflegt der Agent eine Aufgabenliste, die während eines Laufs auf dem Bildschirm angezeigt wird. Jede Aufgabe wird als „in Bearbeitung“ oder „abgeschlossen“ markiert, und die Liste bleibt auch bei Kontextkomprimierung erhalten. Das bedeutet: Selbst bei langen Läufen vergisst der Agent seinen Plan nicht, und Nutzer behalten stets den Überblick über den Fortschritt.

## Genehmigungs-Webhooks für unbeaufsichtigte Läufe

Eine weitere große Verbesserung ist die Fähigkeit des Agents, auch ohne aktive Konsole Genehmigungen einzuholen. Durch Setzen der Umgebungsvariable `CHIMERA_APPROVAL_WEBHOOK` auf einen Kanal-Webhook kann der Agent nun Genehmigungsfragen an einen bestimmten Kanal senden. Dies behebt ein bisheriges Problem, bei dem unbeaufsichtigte Prozesse (einschließlich Cron-Jobs) stillschweigend Entscheidungen trafen. Falls eine Zustellungsmöglichkeit fehlt, gibt der Agent nun explizit `unreachable` an – für volle Transparenz.

## Governance-Kontrollen

Der bisher unsichtbare und inaktive Governance-Kernel lässt sich jetzt aktivieren. Der Parameter `CHIMERA_GOVERNANCE` ist standardmäßig `off`, kann aber eingeschaltet werden. Der Sicherheitsbildschirm zeigt zudem den aktuellen Governance-Status an – für Kontrolle und Transparenz über diese kritische Funktion.

## Hybrides Retrieval in `chimera find`

Der Befehl `chimera find` wurde um hybrides Retrieval erweitert, das Keyword- und Vektorsuche kombiniert. Diese vor Laufbeginn festgelegte Hybridmethode schneidet im eigenen Projektkorpus 6,25 Punkte besser ab als reine Keyword-Suche. Da reine Vektorsuche schlechter performt, ist das Hybridverfahren nun Standard – für präzisere und zuverlässigere Suchergebnisse.

## Behebungen für Modell-Kontextfenster

Bisher wurde für nicht im Katalog gelistete Modelle ein 128.000-Token-Fenster angenommen, was bei Modellen mit kleineren Fenstern zu Überläufen und Laufabbrüchen führte. Dieses Release behebt das Problem, indem es das Kontextfenster live aus dem Index bezieht, falls der Katalog das Modell nicht kennt. Zudem wurden fünf Katalogeinträge korrigiert, um die tatsächlichen Kontextfenster der Anbieter widerzuspiegeln, und ein Preis an verifizierte Daten angepasst.

## Weitere Verbesserungen

Traces erfassen nun nicht mehr nur das antwortende Modell, sondern auch das genutzte Backend. Besonders relevant für Modelle auf OpenRouter, wo ein einzelner Model-Slug mehrere Endpunkte mit unterschiedlichen Kontextfenstern und Preisen repräsentieren kann. Diese Änderung gibt Nutzern mehr Klarheit über die verwendeten Ressourcen.

## Echte Einschränkungen

- **Die Installer sind unsigniert.** Beim ersten Start erscheint unter Windows eine SmartScreen-Warnung, unter macOS eine Gatekeeper-Warnung. Das ist erwartet; der *Updater* ist signiert – und der entscheidet, was nach der Installation auf Ihrem System landet.
- **Governance ist standardmäßig `off`.** Die Kontrolle existiert, damit Sie sie einschalten können, nicht weil sie aktiv wäre.
- **Der Komprimierungs-Zusammenfasser ist deaktiviert**, hinter `AgentConfig.summarise_compaction`. Komprimierung trat in der Praxis nie auf (0-mal in 137 Läufen), daher ist der Zusammenfasser eher „ungetestet“ als „notwendig“.
- **Abbruch ist kooperativ.** Ein Lauf stoppt vor dem nächsten Modellaufruf; bereits laufende Aufrufe werden abgerechnet.

Details, einschließlich der Messdaten hinter diesen Änderungen, finden Sie im [Changelog][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0).
