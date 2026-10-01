---
title: "Chimera Agent 0.49.2: Korrekturen für Updater und Installer"
date: 2026-10-01
category: update
summary: "Chimera Agent 0.49.2 behebt kritische Probleme mit dem Updater und Installer, was für reibungslosere Updates und korrekte Versionsmeldungen sorgt."
version: "0.49.2"
---

## Updater prüft jetzt alle sechs Stunden

Bisher führte der Update-Check in Chimera Agent nur einmal beim Start durch, was bedeutete, dass die App bei geöffnetem Zustand niemals neue Releases erkannte. Dieses Problem war besonders kritisch für ein Tool wie Chimera, das für längere Laufzeiten ausgelegt ist. Nutzer mussten Updates manuell von der Website herunterladen, was den Zweck eines automatischen Updaters zunichtemachte.

Mit Version 0.49.2 prüft der Updater nun alle sechs Stunden während des Betriebs auf neue Releases. Diese Änderung stellt sicher, dass Nutzer zeitnah über Updates informiert werden, ohne manuell eingreifen zu müssen. Zudem merkt sich der Updater abgelehnte Versionen für die Dauer des Prozesses, wodurch wiederholte Aufforderungen für dasselbe Update vermieden werden – es sei denn, eine neuere Version ist verfügbar.

## Installer-Korrektur wird wirksam

Version 0.49.1 behebt ein Installer-Problem, bei dem Dateien der vorherigen Version zurückblieben, was dazu führte, dass die App ihre Version falsch meldete und sich selbst Updates anbot. Allerdings galt diese Korrektur nur für den mit diesem Release ausgelieferten Installer, nicht für denjenigen, der zur Installation verwendet wurde.

In 0.49.2 wird der reparierte Installer nun für In-Place-Updates genutzt, sodass nach einem Update die korrekte Version gemeldet wird. Falls Sie auf 0.49.1 aktualisiert haben und auf das Versionsmeldungsproblem gestoßen sind, löst dieses Release es.

## Weitere Verbesserungen

Weitere Verbesserungen in diesem Release umfassen das Zurückhalten von Releases, die als „latest“ markiert werden, bis ihr Manifest angehängt ist. Dadurch wird sichergestellt, dass der Updater-Endpoint während des Build-Prozesses keinen 404-Fehler zurückgibt. Die Fehlerdialoge und das Tray sprechen jetzt die Sprache des Nutzers, während technische Diagnosen unübersetzt bleiben, um die Suche nach Fehlermeldungen zu erleichtern. Die Kostenmodi des First-Run-Wizards wurden ebenfalls lokalisiert, wodurch das vorherige Problem englischer Begriffe auf übersetzten Bildschirmen vermieden wird.

Eine vollständige Liste der Änderungen finden Sie unter [Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).
