---
title: "Chimera Agent 0.49.1: Korrekturen für Update-Ablauf und UI-Konsistenz"
date: 2026-09-15
category: update
summary: "Chimera Agent 0.49.1 behebt kritische Probleme im Update-Prozess, der UI-Konsistenz und Übersetzungslücken, was einen reibungsloseren Betrieb und klarere Benutzerinteraktionen gewährleistet."
version: "0.49.1"
---

## Verbesserungen am Update-Prozess

Der Update-Mechanismus in Chimera Agent 0.49.0 hatte einen schwerwiegenden Fehler: Der Backend-Prozess meldete aufgrund von übrig gebliebenen Dateien aus vorherigen Installationen die falsche Version. Konkret behielt das PyInstaller-Bundle `dist-info`-Verzeichnisse sowohl der alten als auch der neuen Version bei, wodurch `importlib.metadata` die falsche Version zurückgab. Dies führte dazu, dass die App beharrlich ein Update auf die bereits installierte Version anbot. Der Installer entfernt nun das alte Bundle, bevor das neue geschrieben wird, und stellt so sicher, dass nur die korrekte Version gemeldet wird. Beachten Sie, dass diese Korrektur für den mit 0.49.1 ausgelieferten Installer gilt, nicht für den, der 0.49.1 installiert. Wenn Sie von 0.49.0 aktualisieren, sehen Sie möglicherweise noch ein veraltetes `dist-info`, bis das nächste Update erfolgt.

## Zuverlässigkeit der Auto-Updates

Ein weiteres Problem wurde im Auto-Update-Mechanismus entdeckt. Für etwa fünfundzwanzig Minuten nach jedem Release schlug der Updater fehl, weil der `latest.json`-Endpunkt einen 404-Fehler zurückgab. Dies geschah, weil das Release als „latest“ markiert wurde, bevor alle Plattform-Builds abgeschlossen waren. Nun werden Releases zunächst mit `--latest=false` zurückgehalten und erst freigegeben, sobald das Manifest angehängt ist. Dadurch wird sichergestellt, dass der Endpunkt immer auf ein gültiges Release verweist, was die Zuverlässigkeit erhöht und verhindert, dass fehlerhafte Releases angeboten werden.

## UI-Konsistenz und Klarheit

Das Panel „Neue Version verfügbar“ stellte zuvor eine Frage, die es nicht beantworten konnte: *„Eine neue Version ist verfügbar. Aktualisieren?“* Allerdings bot das Panel nur Optionen an, um das Release anzuzeigen oder die Benachrichtigung zu verwerfen – ohne tatsächliche Update-Funktionalität. Das Panel teilt nun einfach mit, dass eine neue Version verfügbar ist, und verweist Benutzer auf die Option **Nach Updates suchen** im Tray. Diese Änderung beseitigt Verwirrung und passt die UI an ihre tatsächlichen Fähigkeiten an.

## Übersetzungskorrekturen

Der Erststart-Assistent hatte ein kleines, aber auffälliges Übersetzungsproblem: Die Dropdown-Liste für den Kostenmodus zeigte Rohwerte (`auto / cheap / balanced / premium`) anstelle ihrer übersetzten Entsprechungen. Obwohl die Beschriftungen vorhanden und übersetzt waren, wurden sie in diesem Kontext nicht verwendet. Diese Inkonsistenz wurde behoben, sodass die Dropdown-Liste nun die korrekten übersetzten Beschriftungen anzeigt, konsistent mit dem Einstellungsbildschirm.

Weitere Details finden Sie in den [Release Notes][Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1). Zum Aktualisieren führen Sie `chimera-desktop --update` aus oder laden Sie die neueste Version von der offiziellen Website herunter.
