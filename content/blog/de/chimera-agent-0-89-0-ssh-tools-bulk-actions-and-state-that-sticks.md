---
title: "Chimera Agent 0.89.0: SSH-Tools, Bulk-Aktionen und Zustand, der bleibt"
date: 2026-11-13
category: update
summary: "File-Tools laufen jetzt auf dem SSH-Host, Befehle überleben abgerissene Verbindungen, Bulk-Aktionen für Ordner und Konversationen kommen dazu, und die „Plan first“-Einstellung bleibt über Neuladen hinweg erhalten."
version: "0.89.0"
---

## Was du einstellst, bleibt eingestellt

Vor diesem Release war die „Plan first“-Option im Code Composer eine Einstellung nur für die aktuelle Sitzung. Du konntest sie auf Always oder Never setzen, aber ein Neuladen des Fensters setzte sie auf Auto zurück. Das bedeutete, dass du bei jeder Rückkehr zu einer Konversation den Modus, für den du dich längst entschieden hattest, neu konfigurieren musstest. Die Einstellung wird jetzt pro Konversation gespeichert. Eine neue Konversation übernimmt die zuletzt getroffene Wahl, und ein auf Freigabe wartender Plan – samt seiner Karte – überlebt einen Reload. Der Test, der dieses Verhalten absichert, bestätigt, dass die Karte zurückkommt, sodass du keinen ausstehenden Plan mehr verlierst, nur weil der Tab neu geladen wurde.

Die Einstellungssuche hatte eine anders gelagerte blinde Stelle. Die Karte „Environments“ lag im Tab „General“, aber eine Suche nach „WSL“, „SSH“ oder „environment“ lieferte nichts. Die Karte war vorhanden, aber über das Suchfeld nicht erreichbar. Das ist behoben. Die Eingabe dieser Begriffe listet nun die Environments-Karte und die erlaubten SSH-Hosts auf, und das Öffnen eines Ergebnisses scrollt direkt dorthin. Wenn du mehrere Remote-Umgebungen verwaltest, findest du sie jetzt genauso wie alles andere.

## File-Tools überschreiten die SSH-Grenze

SSH-Konversationen verweigerten bisher Dateioperationen. Lesen, Schreiben, Editieren, Patchen, Auflisten, grep und glob endeten alle an der lokalen Grenze. Diese Einschränkung ist aufgehoben. In einer SSH-Konversation agieren diese Tools jetzt auf dem entfernten Ordner. Die Implementierung fügt mehrere Schutzmechanismen hinzu, denn ein Tool, das auf einen Remote-Host schreibt, ist ein Tool, das Schaden anrichten kann.

Pfade dürfen den Ordner der Konversation nicht verlassen. Die Prüfung ist lexikalisch und wird durch das `realpath` des Hosts bestätigt, sodass ein Symlink nicht ausbrechen kann. Credential-Dateien – `.ssh`, `.env`, Keys und Cloud-Konfigurationen – werden grundsätzlich verweigert. Ein Schreibvorgang wird nur ersetzt, nachdem Größe und Hash auf dem Host geprüft wurden, was ein Überschreiben einer Datei verhindert, die sich seit dem letzten Lesen geändert hat. Die Manual-Karte zeigt den Diff der Remote-Datei und nennt den Host, sodass du genau weißt, was sich wo geändert hat. Wenn ein Turn externen Inhalt liest und dann in einen Git-Hook, eine Shell-Startdatei, einen Cron-Job oder eine systemd-Unit schreibt, fragt Chimera zuerst. Was der Host zurückgibt, zählt als externer Inhalt, sodass der Prompt dann erscheint, wenn das Risiko real ist.

Befehle auf dem SSH-Host überleben jetzt eine abgerissene Verbindung. Jeder Befehl läuft abgekoppelt unter seiner eigenen Run-ID. Reißt die Verbindung ab, verbindet Chimera sich neu und liest die Ausgabe weiter, ohne den Befehl neu zu starten. Ein Skript, das unvollständig ankommt, wird niemals ausgeführt. Ein Timeout oder Stop beendet die gesamte Prozessgruppe. Wenn Chimera mitten in einem Befehl schließt, läuft der Befehl weiter und die Konversation, die ihn gestartet hat, erfährt, wo seine Ausgabe liegt. Du kannst dich neu verbinden und das Log aufnehmen, ohne raten zu müssen, ob der Befehl fertig wurde oder doppelt lief.

## Aktionen auf vielen Elementen gleichzeitig

Ordner und Konversationen einzeln zu verwalten, war die einzige Option. Die Ordner-Karte in den Einstellungen und die Code-Seitenleiste haben jetzt Checkboxen, ein dreistufiges „Alle auswählen“ und eine Aktionsleiste. Für Ordner kannst du anpinnen, loslösen, Befehle erlauben oder entziehen, aus den Listen entfernen oder wieder anzeigen. Für Konversationen kannst du archivieren, dearchivieren, löschen oder ihre Ordner aus den Listen entfernen.

Der Auswahlmodus zeichnet jede Zeile, sodass nichts außerhalb des Bildschirms versehentlich bearbeitet wird. Löschen fragt zuerst und zeigt die Anzahl an. Befehle in Masse zu erlauben, fragt ebenfalls zuerst. Ein einzelner Fehler wird gezählt, ohne den Rest zu stoppen, sodass ein problematisches Element nicht die Operation auf allen anderen ausgewählten blockiert.

Update mit `pip install --upgrade chimera-agent`. Die vollständigen Notes sind unter [Chimera Agent v0.89.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.89.0).
