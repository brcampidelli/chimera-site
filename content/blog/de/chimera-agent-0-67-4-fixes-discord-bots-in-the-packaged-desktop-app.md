---
title: "Chimera Agent 0.67.4 corrige Discord-Bots in der gepackten Desktop-App"
date: 2026-10-16
category: update
summary: "Die installierte Desktop-Anwendung stürzt beim Start eines Discord-Bots nicht mehr mit einem Fehler wegen eines fehlenden Moduls ab."
version: "0.67.4"
---

Die in der vorherigen Version eingeführte gepackte Desktop-App wurde mit einem fehlerhaften Vertrag ausgeliefert. Wenn jemand die Anwendung installierte und auf einen Discord-Bot verwies, zeigte das Status-Panel keinen laufenden Bot an. Es zeigte einen Traceback, der in `ModuleNotFoundError: No module named 'discord'` endete. Die Agent-Konfiguration war gültig. Der Token war korrekt. Der Fehler lag im Packaging selbst.

## Was kaputt war und warum das wichtig ist

Das Problem war eine Kombination aus zwei Entscheidungen, die erst im Release-Build kollidierten. Erstens wurden die Messaging-Adapter – Discord eingeschlossen – als Lazy Imports konzipiert. Das Framework lädt nicht jede Chat-Oberfläche beim Start; es importiert den Adapter nur, wenn eine Bot-Konfiguration ihn anfordert. Dieses Design hielt Kaltstarts schnell und den Speicherverbrauch niedrig und funktionierte in jeder Umgebung, in der alle optionalen Abhängigkeiten vorhanden waren.

Zweitens verwendete der Release-Build einen reduzierten Abhängigkeitssatz. Das Messaging-Extra, das die Discord-Client-Bibliotheken enthält, war als optional markiert und wurde in der installierten Anwendung weggelassen. Die Analyse von PyInstaller durchlief den Import-Graphen statisch, sah den Lazy Import hinter einem stringbasierten Loader versteckt und schlussfolgerte, dass der Adapter-Code tot sei. Das Ergebnis: eine funktionierende Konfiguration, die die Laufzeitumgebung nicht ausführen konnte.

Für alle, die Agents bauen, waren die Auswirkungen spezifisch. Jeder Bot, der mit einer Discord-Oberfläche definiert wurde, schlug ausschließlich in der gepackten App fehl. Dieselbe Konfigurationsdatei funktionierte aus dem Source-Code heraus. Dieselbe Konfigurationsdatei funktionierte in einem Container. Die Inkonsistenz bedeutete, dass die Desktop-App für eine ganze Klasse von Agents nicht vertrauenswürdig war – genau die Klasse, die das meiste Community-Feedback antreibt.

## Der Fix und was er für das Packaging bedeutet

Das Release 0.67.4 korrigiert die Abhängigkeitsdeklaration, sodass das Messaging-Extra mit der installierten Anwendung gebündelt wird. PyInstaller sieht den Discord-Adapter nun als erreichbaren Code und bindet die benötigten Module ein. Keine Konfigurationsänderung nötig. Kein Update der Agent-Definitionen. Das Bot-Status-Panel zeigt einen laufenden Zustand anstelle eines Import-Fehlers.

Hinter dieser einfachen Aussage steckt eine grundsätzlichere Lektion, auf die die Maintainer sofort reagiert haben. Lazy Imports sind eine Performance-Technik, die Authoring-Tools respektieren müssen, über die Packaging-Tools aber explizit informiert werden müssen. Der versteckte Import war immer beabsichtigte Architektur. Das Weglassen war eine Metadaten-Lücke zwischen dem Package-Manifest und dem Freezing-Prozess. Version 0.67.4 schließt diese Lücke für den Discord-Adapter und etabliert ein Muster für jede Messaging-Oberfläche, die demselben Lazy-Load-Design folgt.

## Was jetzt zu tun ist

Wenn Sie die installierte Anwendung der Version 0.67.3 betreiben, laden Sie das Update 0.67.4 von der Releases-Seite herunter. Die gepackte App ist auf dieselbe Weise signiert und installiert sich über die bestehende Version. Starten Sie nach dem Update jede Discord-Bot-Konfiguration neu. Der Status wechselt ohne weitere Schritte auf "running".

Wenn Sie Agents aus dem Source-Code bauen und die gepackte App nie verwendet haben, ändert sich nichts. Das per pip installierte Paket enthielt das Messaging-Extra bereits, wenn es mit dem Standard-Flag `[all]` installiert wurde. Dieses Release betrifft nur die gebündelte Desktop-Anwendung.

Die vollständige Liste der Änderungen in diesem Release finden Sie unter [Chimera Agent v0.67.4](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.67.4).
