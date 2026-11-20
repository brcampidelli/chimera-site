---
title: "Chimera Agent 0.92.0: Belege mit echten Kosten, Planer-Steuerung und durchsuchbare Einstellungen"
date: 2026-11-20
category: update
summary: "Extern ausgeführte Runs nutzen jetzt echte OpenRouter-Preise, der Planer lässt sich pro Lane konfigurieren und die Einstellungssuche in der Desktop-App findet die Routing-Tabelle."
version: "0.92.0"
---

## Was du bezahlst, siehst du auch

Die Kostenerfassung für Runs außerhalb von `serve` hatte mit der Realität nichts zu tun. Das Framework nutzte einen veralteten internen Katalog, der nicht widerspiegelte, was Provider tatsächlich berechnen. Hast du einen Agenten aus einem Skript oder einem Test-Harness gestartet, zeigte der Beleg eine Zahl, die in keinem Verhältnis zur Rechnung stand. Damit war jede Budgetplanung für alle kaputt, die lokal iterieren, bevor sie deployen.

Version 0.92.0 verdrahtet diese Runs mit dem öffentlichen Preisindex von OpenRouter. Übergibst du einen exakten Model-Slug, schlägt das Framework den spezifischen Tarif nach, statt auf einen unscharfen Match zurückzufallen. Strikte Calls behalten jetzt den bei der Annahme erfassten Kostenvoranschlag, sodass der Beleg genau dem Preis entspricht, den der Provider bei Annahme der Anfrage zugesichert hat. Der Katalogeintrag für `gpt-oss-20b` wurde ebenfalls auf die aktuellen Preise aktualisiert. Das Ergebnis ist eine einzige Quelle der Wahrheit: Die Zahl auf dem Beleg ist die Zahl, die du auf deiner Provider-Rechnung siehst.

Das ist wichtig, weil Agenten-Entwickler oft mit günstigen Modellen testen und in Produktion auf größere wechseln. Ohne akkurate Preise pro Modell sind Kostenvergleiche zwischen Runs wertlos. Jetzt kannst du zwei Planer-Durchläufe direkt nebeneinander vergleichen und darauf vertrauen, dass der Unterschied im Beleg einen echten Unterschied in den Ausgaben widerspiegelt.

## Der Planer ist nicht mehr immer an

Vor diesem Release lief der Planer in jedem Turn, in jedem Kontext. Es gab keine Möglichkeit, ihn für eine bestimmte Kanban-Lane, einen API-Call oder einen Workflow-Solve-Step zu deaktivieren. Das hat Planungs-Overhead für Aufgaben erzwungen, die nicht davon profitierten – einfache Retrievals, deterministische Transformationen oder Schritte, bei denen die nächste Aktion bereits feststeht. Der einzige Workaround war, die Workflow-Definition zu forken und zu hoffen, dass nichts kaputtgeht.

Jetzt ist `use_planner` ein Konfigurations-Flag. Setze es auf einer Lane, übergib es in einem API-Run oder hänge es an einen Solve-Step. Der Planer bleibt standardmäßig an, sodass bestehende Workflows ihr Verhalten nicht ändern. Aber wenn du weißt, dass ein Schritt keinen Plan braucht, schaltest du ihn aus und sparst dir den Roundtrip. Das reduziert Latenz und Kosten in Pipelines, die planungsintensive und planungsfreie Phasen mischen.

## Desktop-Einstellungen, die du findest

Die Einstellungssuche in der Desktop-App hat bisher die Modell-nach-Rolle-Routing-Tabelle ignoriert. Du konntest nach "Router" oder "Routing" suchen und bekamst keine Treffer, obwohl die Tabelle die komplexeste Konfigurationsoberfläche der App war. Der einzige Weg dorthin war, durch das Einstellungs-Panel zu scrollen, bis du sie erkannt hast. Das machte den Einstieg für neue Nutzer schwerer und bremste erfahrene Nutzer aus, die Rollenzuweisungen schnell anpassen wollten.

Der Suchindex umfasst jetzt die Routing-Tabelle. Gib einen Rollennamen oder ein Modell ein und die Suche liefert den passenden Eintrag. Dasselbe Update behebt zwei Lokalisierungsfehler: Routing-Labels und Belegtexte werden jetzt korrekt in brasilianischem Portugiesisch angezeigt, wo abgeschnittene Strings und fehlende Übersetzungen die Oberfläche verwirrend machten. Neue Konversationen und reine Antwort-Turns zeigen zudem klarere Statusmeldungen, sodass du weißt, ob der Agent auf Eingaben wartet oder verarbeitet.

## Was experimentell bleibt

Mehrere Experimente haben Updates erhalten, ohne die Defaults zu ändern. Der Benchmark zur Speicherextraktion war nicht schlüssig, daher bleiben das 6.000-Zeichen-Limit und das globale Modell bestehen. Du kannst auf ein explizites Extraktionsmodell und einen deterministischen Pre-Filter opt-in, wenn du den neuen Pfad testen willst. Das Experiment zu Cron-Modell-Stufen zeigte volle Korrektheit bei sieben von acht synthetischen Jobs, aber synthetische Jobs sind keine Produktions-Workloads, und die Defaults bleiben unverändert. Die Experimente zum schlanken Design-Refinement und zur Prompt-Proportionalität bleiben ebenfalls standardmäßig deaktiviert.

Diese Experimente sind in den verlinkten Notizen dokumentiert. Wenn du speicherintensive Agenten oder geplante Cron-Workflows betreibst, lohnt sich ein Test der Opt-in-Flags in einer Staging-Umgebung.

## Release beziehen

Upgrade mit `pip install chimera-agent --upgrade` und prüfe die Version mit `chimera --version`. Die Desktop-Installer sind unsigniert und können beim ersten Start nachfragen; die App verifiziert Signaturen bei Updater-Bundles. Vollständige Notizen unter [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
