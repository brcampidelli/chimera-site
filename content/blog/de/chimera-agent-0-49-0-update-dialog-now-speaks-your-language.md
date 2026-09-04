---
title: "Chimera Agent 0.49.0: Update-Dialog spricht jetzt Ihre Sprache"
date: 2026-09-04
category: update
summary: "Der Update-Dialog und Fehlermeldungen folgen nun der Systemsprache, mit manueller Prüfoption im Tray."
version: "0.49.0"
---

## Übersetzte Update-Dialoge und manuelle Prüfungen

Der Update-Dialog in Chimera Agent war bisher nur auf Englisch verfügbar, unabhängig von der eingestellten App-Sprache. Dies wurde in Version 0.49.0 behoben — der Dialog orientiert sich nun an der Betriebssystemsprache. Diese Änderung behebt eine Inkonsistenz für Nutzer, die die App in einer Sprache ausführen, aber kritische Systemmeldungen in einer anderen sehen.

Das Tray-Menü enthält jetzt eine **Nach Updates suchen**-Option, die erstmals manuelle Update-Prüfungen ermöglicht. Bisher lief die automatische Prüfung stumm beim Start, ohne Feedback — außer bei gefundenen Updates. Während dieses Design unnötige Benachrichtigungen vermeidet, gab es keine Möglichkeit, den aktuellen Stand ohne Neustart zu bestätigen. Die manuelle Prüfung liefert nun explizite Bestätigung bei aktueller Version sowie klare Fehlermeldungen bei Problemen.

## Übersetzte Fehlermeldungen mit unveränderten Diagnosedaten

Fehlerdialoge — inklusive Backend-Absturzberichten und der Tray-Option **Beenden** — sind nun ebenfalls übersetzt. Wichtig ist die Unterscheidung zwischen:

- **Nutzerhinweisen** in Systemsprache (z.B. „Schließen Sie Chimera und starten Sie neu“)
- **Technischen Details** (Dateipfade, Fehlercodes, Backend-Logs) bleiben im Original

Diese Trennung gewährleistet klare Anleitungen in der bevorzugten Sprache, während diagnosefähige Fehlerinformationen erhalten bleiben. Ein Test erzwingt dieses Verhalten: Nutzertext muss aus Übersetzungstabellen stammen, Diagnosedaten bleiben unverändert.

## Unveränderte Komponenten

Der Update-Mechanismus selbst bleibt gleich — automatische Prüfungen beim Start und installationspflichtige Bestätigungen. Updates installieren sich nie ohne explizite Erlaubnis. Ein subtiles Detail: Der Update-Dialog zeigt immer die Sprache der installierten Version, nicht der angebotenen. Das Angebot für 0.49.0 erscheint also in der Sprache Ihrer aktuellen Version — ab 0.49.0 entspricht dies der Systemsprache.

Die Änderungen sind in Version 0.49.0 verfügbar oder manuell via Tray-Menü prüfbar. Details finden Sie in den [Release Notes][Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
