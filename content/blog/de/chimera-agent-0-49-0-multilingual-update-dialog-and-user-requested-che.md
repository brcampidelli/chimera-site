---
title: "Chimera Agent 0.49.0: Mehrsprachiges Update-Dialog und Nutzer-geforderte Prüfungen"
date: 2026-09-06
category: update
summary: "Chimera Agent 0.49.0 führt mehrsprachige Unterstützung für das Update-Dialog ein und fügt eine manuelle Update-Prüfung im Tray hinzu."
version: "0.49.0"
---

## Mehrsprachiges Update-Dialog und manuelle Update-Prüfung

Chimera Agent spricht jetzt überall Ihre Sprache, auch im Update-Dialog. Bisher war dieser nur auf Englisch, unabhängig von den Spracheinstellungen der App. Das wurde behoben: Das Dialog folgt nun der Systemsprache. Nutzer, die die App-Sprache nicht geändert haben, sehen das Dialog in ihrer Systemsprache; wer sie angepasst hat, sieht es weiterhin auf Englisch.

Zusätzlich gibt es im Tray jetzt die Option **Nach Updates suchen**. Dies ist die erste Möglichkeit, manuell eine Update-Prüfung anzufordern. Die automatische Prüfung läuft einmal beim Start und bleibt stumm, falls kein Update verfügbar ist, um Nutzer nicht zu belästigen. Diese Stille könnte jedoch als Fehlschlag missverstanden werden, was zu unnötigen Neustarts führt. Mit der manuellen Prüfung können Nutzer nun bestätigen, dass ihre App aktuell ist, oder Feedback bei Fehlschlägen erhalten.

## Übersetzte Fehler-Dialoge und unveränderte Diagnosen

Nicht nur das Update-Dialog wurde übersetzt. Auch die beiden Backend-Fehler-Dialoge und die Tray-Option „Beenden“ sind jetzt mehrsprachig verfügbar. Allerdings gibt es eine klare Trennung zwischen Übersetztem und Unverändertem:

> **Was Ihnen sagt, was zu tun ist, wird übersetzt. Was in einen Bug-Report gehört, nicht.**

Stürzt das Backend ab, erscheint die Fehlermeldung in Ihrer Sprache, aber Pfad, Systemfehler und stderr des Backends bleiben im Original. So können Nutzer Systemfehler weiterhin problemlos suchen und verstehen.

## Was unverändert bleibt

Dieses Update ändert nichts am Update-Mechanismus selbst, der seit Version 0.48.0 funktioniert. Die automatische Prüfung läuft weiter bei jedem Start, und die Installation bleibt nutzerinitiiert. Es gibt keine periodische Prüfung während der Laufzeit.

Ein kontraintuitiver Aspekt bleibt: **Die Version, die Ihnen das Dialog anzeigt, ist die bereits installierte**, nicht die angebotene. Das heißt, die Aufforderung für Version 0.49.0 wird von Ihrer aktuellen Version generiert. Ab Version 0.49.0 erscheint diese Aufforderung in Ihrer Sprache.

Details finden Sie unter [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
