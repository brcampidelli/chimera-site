---
title: "Chimera Agent 0.49.2: Korrekturen für Updater und Installer"
date: 2026-09-30
category: update
summary: "Chimera Agent 0.49.2 behebt kritische Probleme mit dem Updater und Installer, um reibungslosere Updates und korrekte Versionsangaben zu gewährleisten."
version: "0.49.2"
---

## Updater arbeitet jetzt kontinuierlich

In früheren Versionen überprüfte der Updater nur einmal nach neuen Releases – beim Start. Dies war ein erhebliches Versäumnis für eine Anwendung wie Chimera Agent, die dafür ausgelegt ist, über längere Zeiträume geöffnet zu bleiben. Dadurch verpassten Benutzer häufig Updates, es sei denn, sie überprüften manuell nach Updates oder starteten die Anwendung neu. Dieses Problem trat besonders deutlich hervor, als Version 0.49.1 veröffentlicht wurde: Die App benachrichtigte die Benutzer nicht über das Update, sodass sie den Installer manuell von der Website herunterladen mussten.

**Mit 0.49.2 überprüft der Updater jetzt alle sechs Stunden** während die App läuft, ob neue Releases verfügbar sind. Diese Änderung stellt sicher, dass Benutzer zeitnah über Updates informiert werden, ohne häufige Neustarts zu benötigen. Zudem vermeidet der Updater unnötige Erinnerungen, indem er abgelehnte Updates für die Dauer des Prozesses speichert. Wenn eine neuere Version verfügbar wird, wird der Benutzer erneut benachrichtigt, um sicherzustellen, dass manuelle Update-Anfragen immer berücksichtigt werden.

## Installer-Korrektur wird wirksam

Version 0.49.1 brachte eine Korrektur für ein Installer-Problem, bei dem Dateien früherer Versionen zurückblieben. Insbesondere konnte das Verzeichnis `_internal` mehrere `chimera_agent-*.dist-info`-Verzeichnisse enthalten, was dazu führte, dass die App die falsche Version meldete und sich selbst wiederholt Updates anbot. Diese Korrektur galt jedoch nur für den Installer, der mit einem Release ausgeliefert wurde, nicht für den Installer, der für In-Place-Updates verwendet wird.

**0.49.2 ist das erste Release, bei dem der reparierte Installer für In-Place-Updates verwendet wird.** Wenn Sie auf 0.49.1 aktualisiert haben und falsche Versionsangaben erlebt haben, behebt dieses Release das Problem. Der Installer entfernt jetzt korrekt alte Dateien, stellt genaue Versionsangaben sicher und verhindert überflüssige Update-Aufforderungen.

## Weitere Verbesserungen

Mehrere andere Verbesserungen, die in 0.49.1 eingeführt wurden, sind erwähnenswert, falls Sie dieses Release übersprungen haben:

- **Releases werden von "latest" zurückgehalten, bis ihr Manifest angehängt ist.** Zuvor gab der Updater-Endpoint während des Build-Prozesses einen 404-Fehler zurück, der stillschweigend fehlschlug, da Fehlermeldungen unterdrückt wurden, um Benutzer nicht zu belästigen.
- **Fehlerdialoge und Tray-Benachrichtigungen sind jetzt lokalisiert**, während technische Diagnosen auf Englisch bleiben, um eine einfache Suche zu ermöglichen.
- **Die Kostenmodi des Erststart-Assistenten werden nicht mehr als nicht übersetzte englische Wörter** auf lokalisierten Bildschirmen angezeigt.

Für weitere Details siehe die [Release Notes][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).

Um von diesen Korrekturen zu profitieren, aktualisieren Sie jetzt auf Chimera Agent 0.49.2.
