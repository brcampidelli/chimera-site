---
title: "Chimera Agent 0.50.0: Sichtbarkeit, Kontrolle und Hybrid Search"
date: 2026-10-08
category: update
summary: "Dieses Release behebt stille Verhaltensweisen, fügt Governance-Kontrollen hinzu und verbessert die Retrieval-Leistung mit Hybrid Search."
version: "0.50.0"
---

## Aufgaben sind jetzt sichtbar

Agenten führten bisher eine interne Aufgabenliste, die während der Ausführung unzugänglich war. `RunState.tasks` existierte, wurde aber nie befüllt. Jetzt werden Aufgaben in Echtzeit mit Fortschrittsmarkierungen angezeigt, und die Liste bleibt auch bei der Kontextkomprimierung erhalten. Das bedeutet, dass lang laufende Agenten ihre eigenen Pläne nicht mehr mitten in der Ausführung verlieren.

## Genehmigungsanfragen folgen Ihnen

Genehmigungsworkflows gingen bisher davon aus, dass eine Konsole immer überwacht wird. Drei unbeaufsichtigte Oberflächen – einschließlich Cron-Jobs – konnten menschliche Eingaben anfordern, hatten aber keine Möglichkeit, die Frage zu übermitteln, wenn niemand zusah. Durch das Setzen von `CHIMERA_APPROVAL_WEBHOOK` werden Genehmigungsanfragen jetzt an einen bestimmten Kanal weitergeleitet. Systeme ohne Zustellfähigkeit melden korrekt `unreachable`, anstatt stillschweigend zu scheitern.

## Governance kann aktiviert werden

Das Sicherheits-Audit-Log war bisher eine passive Funktion ohne Aktivierungsmechanismus. `CHIMERA_GOVERNANCE` bietet jetzt eine Steuerung, um es zu aktivieren, und der Sicherheitsbildschirm zeigt explizit seinen aktuellen Zustand an. Dies wurde implementiert, weil ein Audit-Log, das nicht eingeschaltet werden konnte, keinen praktischen Nutzen hatte.

## Hybrid Search übertrifft Keywords

`chimera find` verwendete bisher entweder Keyword- oder Vector-Search, wobei die Entscheidung nach dem Start des Laufs getroffen wurde. Hybrid Retrieval – eine Kombination beider Methoden – übertrifft jetzt Keyword-only-Suchen um 6,25 Punkte (p = 1,7e-04) im eigenen Korpus des Projekts. Vector-Search allein schneidet schlechter ab als Keywords, weshalb der Hybrid-Ansatz jetzt der Standard ist. Das System berechnet die Kosten auch im Voraus.

## Modellkompatibilitätskorrekturen

Agenten gingen davon aus, dass nicht katalogisierte Modelle ein 128.000-Token-Fenster hatten, was Abstürze für die 31 Modelle im Index verursachte, die tatsächlich nur 64.000 oder weniger Token unterstützen. Das System überprüft jetzt den Live-Index für unbekannte Modelle. Fünf Katalogeinträge wurden auch wegen falscher Fenstergrößen korrigiert, und ein Preisierungsfehler (2,2x zu hoch) wurde behoben.

## Backend-Sichtbarkeit in Traces

Traces zeichnen jetzt auf, welches Backend jeden Schritt bedient hat, nicht nur welches Modell geantwortet hat. Das ist wichtig, weil Modell-Slugs auf OpenRouter Pools mit stark unterschiedlichen Fähigkeiten darstellen können – ein Pool umfasst Endpunkte mit einem 5-fachen Unterschied in den Kontextfenstern und einer 8,8-fachen Preisvarianz. Frühere Leistungsangaben zu bestimmten Modellen haben tatsächlich Pools gemessen; das Changelog zieht betroffene Benchmarks zurück.

### Was als Nächstes zu tun ist

Aktualisieren Sie auf 0.50.0 und überprüfen Sie das [vollständige Changelog][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) für Implementierungsdetails. Aktivieren Sie die Governance, falls erforderlich, und testen Sie Hybrid Search mit `chimera find`.
