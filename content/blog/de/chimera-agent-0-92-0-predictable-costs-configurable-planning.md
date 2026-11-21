---
title: "Chimera Agent 0.92.0: Kostenkontrolle und konfigurierbare Planung"
date: 2026-11-21
category: update
summary: "Kostenbelege nutzen jetzt Echtzeit-Preise, der Planner ist explizit konfigurierbar und die Einstellungssuche in der Desktop-App findet nun auch die Routing-Tabelle."
version: "0.92.0"
---

## Kostenbelege, die mit dem übereinstimmen, was tatsächlich abgerechnet wird

Vor Version 0.92.0 basierte die Kostenerfassung außerhalb von `serve` auf einem statischen Katalog, der von den Live-Preisen der Anbieter abwich. Ein Run konnte Kosten ausweisen, die plausibel aussahen, aber falsch waren – manchmal so weit daneben, dass eine Budgetkalkulation nicht mehr stimmte. Besonders sichtbar wurde die Diskrepanz, wenn man einen exakten Model-Slug verwendete, den der Katalog nicht kannte: Das System griff auf einen generischen Tarif zurück oder zeigte schlicht nichts Brauchbares an.

Dieses Release wechselt für Runs, die nicht über `serve` laufen, zum öffentlichen Preisindex von OpenRouter. Exakte Model-Slugs werden jetzt mit ihren eigenen Tarifen aufgelöst, statt in einem Durchschnittswert für die Modellfamilie unterzugehen. Wenn ein Call strikt ist – das heißt, Provider und Modell stehen beim Start fest –, bewahrt der Beleg das akzeptierte Angebot auf. Die Zahl, die du siehst, ist also genau die, die autorisiert wurde. Der Katalogeintrag für `gpt-oss-20b` wurde ebenfalls auf die aktuellen Preise aktualisiert.

Der praktische Effekt: Du kannst einen Beleg aus einem Batch-Run nehmen, mit deinem erwarteten Volumen multiplizieren und bekommst eine Zahl, die belastbar ist. Manuelle Stichproben im Provider-Dashboard kannst du dir damit sparen.

## Der Planner ist jetzt ein Schalter, den du kontrollierst

Bisher war der Planner immer an. Man konnte ihn nicht für eine bestimmte Kanban-Lane, einen API-Call oder einen Workflow-Solve-Step abschalten. Das bedeutete, dass jeder Task die Latenz- und Token-Kosten eines Planungsdurchlaufs bezahlte – selbst wenn die Aufgabe trivial oder die Anweisungen bereits so explizit waren, dass eine Planung keinen Mehrwert brachte.

Version 0.92.0 legt `use_planner` als Konfigurations-Flag offen. Setzt du es auf einer Lane, einem Run oder einem Solve-Step auf `false`, überspringt der Agent die Planungsphase komplett. Der Default bleibt `true`, sodass bestehende Workflows ihr Verhalten nur ändern, wenn du dich aktiv dafür entscheidest. Das Flag ist auf allen drei Ebenen verfügbar – Kanban-Konfiguration, API und Workflow-Definitionen –, sodass du gezielt steuern kannst. Eine Lane, die einfache Klassifikationen erledigt, kann die Planung weglassen, während eine benachbarte Lane, die mehrschrittige Recherchen durchführt, sie beibehält.

Warum nicht einfach die Planung intelligenter machen? Weil die Kosten einer falschen Entscheidung höher sind als die Kosten, dir den Schalter zu geben. Eine Heuristik, die versucht zu entscheiden, ob Planung nötig ist, wird manchmal falsch entscheiden – und das zu debuggen ist schwieriger, als einen Boolean umzulegen, den du selbst kontrollierst.

## Desktop-Einstellungen, die man tatsächlich findet

Die Einstellungssuche in der Desktop-App hat bisher die Routing-Tabelle für Modelle nach Rollen übersehen. Man konnte "Routing" oder "Rolle" eintippen und bekam keine Treffer, obwohl die Tabelle direkt im Einstellungs-Panel vorhanden war. Das ist behoben: Die Routing-Tabelle ist jetzt indexiert und erscheint in den Suchergebnissen.

Zwei Lokalisierungs-Fixes sind ebenfalls in diesem Release enthalten. Die Routing-Tabelle und die Belegtexte werden jetzt korrekt auf brasilianischem Portugiesisch angezeigt – zuvor fielen einige Labels auf Englisch zurück. Neue Konversationen und reine Antwort-Runden zeigen zudem klarere Statusmeldungen, sodass du nicht mehr auf einen Spinner starrst und dich fragst, ob das Modell nachdenkt oder die Verbindung abgerissen ist.

## Was experimentell bleibt

Mehrere Experimente erhielten Updates, ohne dass sich die Defaults ändern. Der Benchmark zur Speicherextraktion war nicht schlüssig, daher bleiben das 6.000-Zeichen-Limit und das globale Modell bestehen. Du kannst auf ein explizites Extraktionsmodell und einen deterministischen Vorfilter umsteigen, wenn du den neueren Pfad testen möchtest. Das Experiment zu Cron-Modell-Stufen zeigte volle Korrektheit bei sieben von acht synthetischen Jobs, aber synthetische Jobs sind keine Produktions-Jobs, und die Defaults bleiben unverändert. Die Experimente zur schlanken Design-Verfeinerung und zur Prompt-Proportionalität bleiben ebenfalls standardmäßig deaktiviert.

Die Desktop-Installer sind weiterhin unsigniert und können beim ersten Start eine Warnung anzeigen. Die App verifiziert Signaturen auf Updater-Bundles.

Upgrade mit `pip install chimera-agent --upgrade` und setze `use_planner`, wo du es brauchst. Das vollständige Changelog findest du unter [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
