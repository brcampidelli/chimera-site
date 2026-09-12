---
title: "Chimera Agent 0.49.1: Korrekturen für Update-Ablauf und UI-Konsistenz"
date: 2026-09-12
category: update
summary: "Version 0.49.1 behebt kritische Update-Probleme, verbessert die UI-Konsistenz und schließt Übersetzungslücken im Erststart-Assistenten."
version: "0.49.1"
---

## Korrekturen am Update-Ablauf

Eines der größten Probleme, die in Chimera Agent 0.49.1 behoben wurden, betrifft den Update-Mechanismus. Zuvor meldete der Backend-Prozess nach einem In-Place-Update fälschlicherweise die alte Version, da eine verbliebene `dist-info`-Datei der vorherigen Installation vorhanden war. Dies geschah, weil das PyInstaller-Bundle sowohl die alte als auch die neue Version enthielt, wodurch `importlib.metadata` die erste gefundene Version zurückgab. Folglich bot die App hartnäckig ein Update auf die bereits laufende Version an, was zu Verwirrung und unnötigen Update-Aufforderungen führte.

Zur Lösung entfernt das Installationsprogramm nun das alte Bundle, bevor das neue geschrieben wird, sodass nur die korrekte Version erkannt wird. Beachten Sie jedoch, dass diese Korrektur nur für das mit 0.49.1 ausgelieferte Installationsprogramm gilt, nicht für dasjenige, das zur Installation von 0.49.1 verwendet wird. Benutzer, die von 0.49.0 aktualisieren, könnten dieses Problem bis zum nächsten Update noch erleben. Eine manuelle Lösung besteht darin, die veraltete `dist-info`-Datei zu löschen und die App neu zu starten.

Ein weiteres Update-bezogenes Problem betraf die Auto-Update-Funktion. Für etwa 25 Minuten nach jedem Release schlug der Updater fehl, weil der Endpunkt `releases/latest/download/latest.json` einen 404-Fehler zurückgab, während die Builds noch liefen. Dieses Problem blieb unbemerkt, da der Updater Fehler stillschweigend verschluckte. Nun werden Releases mit `--latest=false` zurückgehalten, bis alle Builds abgeschlossen sind, sodass der Endpunkt immer auf ein gültiges Release verweist.

## UI-Konsistenz und Übersetzungskorrekturen

Das Panel 'Neue Version verfügbar' stellte zuvor eine Frage, die es nicht beantworten konnte. Die Überschrift lautete 'Eine neue Version ist verfügbar. Aktualisieren?', bot aber nur Buttons zum Anzeigen des Releases oder zum Schließen des Panels. Da das Panel im Webview ohne IPC zum Rust-Updater liegt, konnte es kein Update starten. Das Panel teilt nun einfach die Verfügbarkeit einer neuen Version mit und verweist Benutzer auf die Option 'Nach Updates suchen' im Tray.

Zudem gab es im Erststart-Assistenten eine Übersetzungslücke im Kostenmodus-Dropdown, das Rohwerte (`auto / cheap / balanced / premium`) anzeigte statt übersetzter Labels. Diese Inkonsistenz wurde behoben, sodass der Assistent nun mit dem Einstellungsbildschirm übereinstimmt, der bereits übersetzte Labels verwendete. Beachten Sie, dass die Werte weiterhin auf Englisch bleiben, um mit den vom Server erwarteten Eingaben übereinzustimmen.

Weitere Details finden Sie in den [Release Notes][Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1).

[Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1): CHANGELOG.md
