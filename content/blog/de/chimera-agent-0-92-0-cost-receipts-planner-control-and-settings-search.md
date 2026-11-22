---
title: "Chimera Agent 0.92.0: Belege mit echten Kosten, Planer-Steuerung und durchsuchbare Einstellungen"
date: 2026-11-22
category: update
summary: "Kostenbelege nutzen jetzt den öffentlichen Preisindex von OpenRouter für Runs außerhalb von serve. Der Planer ist pro Lane konfigurierbar, und die Desktop-Einstellungssuche findet die Routing-Tabelle."
version: "0.92.0"
---

## Was sich für Agent-Entwickler tatsächlich geändert hat

Drei Reibungspunkte wurden in diesem Release behoben: undurchsichtiges Kosten-Tracking außerhalb der `serve`-Umgebung, ein Planer, der sich nicht abschalten ließ, wo er störte, und ein Desktop-Einstellungsdialog, der die Routing-Tabelle vor der Suche versteckte.

Nichts davon war katastrophal. Es waren diese kleinen Stolpersteine, die einen dazu bringen, ein zweites Terminal zu öffnen, um eine Logdatei zu durchsuchen, oder sich durch vier Tabs zu klicken, um das eine Dropdown zu finden, das man braucht. Die Fixes sind klein, aber sie entfernen Schritte aus Workflows, die dutzende Male am Tag ablaufen.

## Kostenbelege, die zu dem passen, was tatsächlich abgerechnet wird

Vor 0.92.0 mussten Runs außerhalb von `serve` die Modellpreise schätzen. Das Framework hatte keinen Zugriff auf dieselben Preisdaten, die die gehostete Umgebung nutzte, sodass Belege von dem abweichen konnten, was OpenRouter tatsächlich berechnete. Wer die Kosten pro Agent für einen Kunden oder ein Budget trackte, musste manuell abgleichen.

Jetzt beziehen diese Runs ihre Daten aus dem öffentlichen Preisindex von OpenRouter. Exakte Modell-Slugs erhalten ihre eigenen Preise, statt auf eine pauschale Schätzung für die Modellfamilie zurückzufallen. Strict-Calls behalten das bei der Zulassung verwendete Angebot bei, sodass der Beleg den Preis widerspiegelt, zu dem der Call angenommen wurde, und nicht einen nachträglich abgerufenen Tarif. Der Katalogeintrag für `gpt-oss-20b` wurde ebenfalls aktualisiert, was relevant ist, falls dieses Modell Teil eurer Kostenbasis war.

Die Änderung betrifft keine Runs innerhalb von `serve` – diese hatten bereits korrekte Belege. Sie schließt die Lücke für alles andere: CLI-Aufrufe, Cron-Jobs, Pipeline-Schritte, die auf einer Workstation statt auf dem Server laufen.

## Der Planer ist nicht mehr verpflichtend

`use_planner` ist jetzt ein Konfigurationsflag für Kanban-Lanes, API-Runs und Workflow-Solve-Schritte. Der Planer bleibt standardmäßig aktiv, sodass sich das bestehende Verhalten nur ändert, wenn man explizit aussteigt.

Warum das wichtig ist: Der Planer fügt vor der Ausführung einen Reasoning-Durchlauf ein. Das ist nützlich, wenn der Agent eine vage Anfrage in konkrete Schritte zerlegen muss. Es ist Overhead, wenn die Schritte bereits explizit sind – wenn eine Lane eine bekannte Sequenz auslöst oder ein Solve-Schritt ein einzelnes Tool mit strukturierter Eingabe aufruft. In diesen Fällen konnte der Planer Latenz und Token-Kosten verursachen, ohne das Ergebnis zu verbessern. Jetzt kann man ihn dort deaktivieren, wo er nichts bringt.

## Desktop-Einstellungen, die man tatsächlich findet

Die Einstellungssuche der Desktop-App indexiert jetzt die Modell-nach-Rolle-Routing-Tabelle. Bisher lieferte die Suche nach „Routing“ oder einem Rollennamen keine Ergebnisse, obwohl die Einstellung existierte. Man musste wissen, wo sie sich befindet, und manuell dorthin navigieren. Das ist behoben.

Zwei Lokalisierungsfixes wurden gleich mitgeliefert: Routing- und Belegtexte werden jetzt korrekt auf brasilianischem Portugiesisch angezeigt, und neue Konversationen sowie reine Antwort-Runden zeigen klarere Statusindikatoren. Das sind keine Features, aber sie beseitigen Mehrdeutigkeiten im UI-Zustand.

## Was weiterhin experimentell ist

Parallel zu diesem Release liefen mehrere Experimente. Die Speicherextraktion erhielt einen Benchmark, der nicht schlüssig war – das 6.000-Zeichen-Limit und das globale Modell bleiben die Standardeinstellungen, ein explizites Extraktionsmodell und ein deterministischer Vorfilter sind optional verfügbar. Cron-Modell-Stufen testeten ein günstigeres Modell für synthetische Jobs; es war bei sieben von acht vollständig korrekt, aber der Benchmark deckte keine Produktionslasten ab, sodass die Standardeinstellungen unverändert bleiben. Experimente zur Design-Verfeinerung und Prompt-Proportionalität bleiben standardmäßig deaktiviert. Nichts davon ändert, was eure Agenten tun, es sei denn, ihr schaltet es ein.

## Was jetzt zu tun ist

Wenn ihr Kosten für Runs außerhalb von `serve` trackt, gleicht einen Beleg mit eurer OpenRouter-Abrechnung ab. Die Zahlen sollten ohne manuelle Anpassung übereinstimmen. Wenn ihr Lanes oder Solve-Schritte habt, bei denen der Planer Latenz ohne Mehrwert verursacht, setzt `use_planner: false` in diesen Konfigurationen. Wenn ihr die Routing-Tabelle bisher nicht über die Desktop-Suche finden konntet, versucht es jetzt.

Desktop-Installer sind weiterhin unsigniert und können beim ersten Start eine Warnung anzeigen. Die App verifiziert Signaturen bei Updater-Paketen. Vollständige Anmerkungen: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
