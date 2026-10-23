---
title: "Chimera 0.74.1: Dienste stoppen jetzt wirklich, und Abhängigkeiten werden dichter"
date: 2026-10-23
category: update
summary: "Behebt eine Race-Condition, bei der ein sich beendender Dienst aus dem Tracking verschwand, bevor er wirklich beendet war, und aktualisiert zwei indirekte Abhängigkeiten mit bekannten Schwachstellen."
version: "0.74.1"
---

Der Befehl `chimera service stop` hatte eine Race-Condition, die ihn zum Lügner machte. Man wies einen Hintergrunddienst an, sich zu beenden, er bestätigte die Anfrage und verschwand dann aus der Dienstliste, während er noch lief. Wenn man danach `chimera service stop --now` ausführte, um ein hängendes Herunterfahren abzuwürgen, antwortete die CLI mit "not running" – obwohl der Prozess noch lebte und Ressourcen verbrauchte. Version 0.74.1 schließt diese Lücke.

## Warum ein sich beendender Dienst unsichtbar wurde

Ein Chimera-Hintergrunddienst führt eine langlebige Agent-Schleife aus. Wenn er ein Stopp-Signal erhält, muss er laufende Durchläufe beenden, Zustand persistieren und Verbindungen abbauen. Der alte Code entfernte den Diensteintrag aus dem Tracker, sobald die Stopp-Anfrage akzeptiert wurde. Das war eine abkürzende Buchhaltungslogik: Der Dienst war aus seiner eigenen Sicht am "Stoppen", aber für den Rest des Systems existierte er nicht mehr.

Das unmittelbare Problem war `--now`. Ein Force-Stop prüft den Tracker auf eine passende Service-ID. Ist der Eintrag weg, meldet der Befehl, dass es nichts zu stoppen gibt, und beendet sich. Der eigentliche Prozess lief weiter, hielt Locks, Sockets oder GPU-Speicher, bis er seine Aufräumarbeiten schließlich beendete oder extern gekillt wurde. Für einen Operator, der einen festhängenden Agenten debuggt, bedeutete das: Das Tool sagte, alles sei in Ordnung, während die Prozesstabelle das Gegenteil zeigte.

## Was der Fix am Service-Lebenszyklus ändert

Ein Dienst bleibt jetzt ab dem Zeitpunkt, an dem er die Stopp-Anfrage akzeptiert, bis zu seinem Ende mit dem Status `stopping` im Tracker sichtbar. Der Tracker hält den Eintrag, sodass jeder nachfolgende `stop`- oder `status`-Aufruf ihn sieht. Der Dienst führt sein Graceful Shutdown durch – beendet den aktuellen Durchlauf, persistiert was nötig ist, schließt Loops – und entfernt sich dann selbst. Erst nachdem der Prozess beendet ist, verschwindet der Eintrag.

Das `--now`-Flag existiert weiterhin, aber sein Verhalten ist strikter. Es sendet ein Force-Kill nur, nachdem es bestätigt hat, dass der getrackte Prozess mit der hinterlegten Service-ID übereinstimmt. Falls der Dienst zwischen der letzten Prüfung und dem `--now`-Aufruf bereits sauber beendet wurde, meldet der Befehl dies, anstatt ein Signal an eine recycelte PID zu feuern. Das verhindert versehentliche Kills von nicht verwandten Prozessen, die zufällig denselben Bezeichner wiederverwendet haben.

Für jeden, der mehrere Chimera-Dienste auf einer Maschine betreibt, beseitigt das eine Klasse von Heisenbugs, bei denen ein Neustartskript eine neue Instanz startete, während die alte noch herunterfuhr, weil das Skript die alte Instanz nicht sehen konnte, um auf sie zu warten.

## Abhängigkeits-Patches, die mit diesem Release ausgeliefert werden

Zwei indirekte Abhängigkeiten werden aktualisiert, um Sicherheitshinweise zu schließen. Keine wird direkt vom Chimera-Agent-Code aufgerufen, aber beide sitzen in der Lieferkette gängiger Workflows.

GitPython wird auf 3.2.1 angehoben. Versionen bis 3.2.0 prüften den `.git`-Pfad eines Submoduls erst nach dem Klonen, was es einem präparierten Repository ermöglichte, einen Path-Traversal während des Klonvorgangs auszulösen. Das ist relevant, wenn Ihr Agent Repositories als Teil einer Tool-Calling-Schleife klont – zum Beispiel ein Code-Review-Agent, der Pull Requests auscheckt. Der Hinweis bewertet den Schweregrad als hoch.

OpenTelemetry wird auf 1.45.1 angehoben. Die vorherige Obergrenze, 1.45.0, parste den `tracestate`-Header ohne Begrenzung der Anzahl der Einträge. Ein nachgelagerter Dienst, der unbegrenztes `tracestate` an Ihren instrumentierten Agenten zurückspiegelt, könnte übermäßige Speichernutzung verursachen. Chimeras eigene Tracing-Oberflächen sind nicht betroffen, aber jeder Agent, der Spans über HTTP an einen OpenTelemetry-Collector exportiert, ist durch das SDK exponiert. Der Hinweis bewertet den Schweregrad als moderat.

Beide Patches sind Minimalversion-Anhebungen im Abhängigkeitsbaum. Keine API-Oberflächen ändern sich. Wenn Sie Abhängigkeiten mit einer Lockfile pinnen, wird eine erneute Ausführung Ihres Resolvers nach dem Chimera-Update die neuen Versionen ziehen.

## Upgrade

Installieren Sie das Release direkt:

```
pip install chimera-agent==0.74.1
```

Wenn Sie die Chimera-CLI zur Verwaltung laufender Dienste nutzen, starten Sie alle langlebigen Agenten neu, damit sie das korrigierte Lebenszyklus-Tracking übernehmen. Die Release Notes mit dem vollständigen Changelog finden Sie unter [Chimera Agent v0.74.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.74.1).
