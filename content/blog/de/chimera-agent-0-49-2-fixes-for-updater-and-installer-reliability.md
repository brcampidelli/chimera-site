---
title: "Chimera Agent 0.49.2: Verbesserungen für Updater und Installer-Zuverlässigkeit"
date: 2026-10-02
category: update
summary: "Dieses Release stellt sicher, dass der Updater regelmäßig nach neuen Versionen prüft und behebt ein Installer-Problem, das zu falschen Versionsangaben führte."
version: "0.49.2"
---

## Der Updater funktioniert jetzt wie erwartet

Bisher prüfte der Updater nur einmal nach neuen Versionen – beim Start. Das war ein Problem für Chimera Agent, das oft über längere Zeiträume geöffnet bleibt. Wenn eine neue Version veröffentlicht wurde, während die App lief, erfuhren Benutzer nichts davon, es sei denn, sie prüften manuell oder starteten die App neu. Dies führte dazu, dass Updates komplett verpasst wurden und Benutzer die Installer direkt von der Website herunterladen mussten.

Jetzt prüft der Updater alle sechs Stunden, während die App läuft. Diese Änderung stellt sicher, dass Benutzer zeitnah über neue Releases informiert werden, ohne manuelles Eingreifen. Um unnötige Erinnerungen zu vermeiden, wird eine abgelehnte Version für die aktuelle Sitzung gespeichert, aber neuere Versionen lösen trotzdem eine erneute Prüfung aus. Manuelle Prüfungen über das Tray-Menü führen immer zu einer Aufforderung, unabhängig von früheren Ablehnungen.

## Installer-Fix wird wirksam

Version 0.49.1 brachte einen Fix für ein Installer-Problem, bei dem nach einem Upgrade Dateien der vorherigen Version zurückblieben. Dies führte dazu, dass die App ihre Version falsch meldete und sich in einer Schleife befand, in der sie sich selbst ein Update anbot. Dieser Fix galt jedoch nur für neue Installer – nicht für diejenigen, die für In-Place-Updates verwendet wurden. Mit 0.49.2 wird der reparierte Installer nun auch für Updates verwendet, was sicherstellt, dass die Versionsangabe nach einem Upgrade korrekt ist.

## Weitere Verbesserungen ab 0.49.1

- Releases werden erst als „latest“ markiert, wenn ihre Build-Artefakte vollständig bereit sind, was 404-Fehler während des Build-Fensters verhindert.
- Fehlermeldungen und Tray-Nachrichten sind lokalisiert, während technische Diagnosen aus Gründen der Suchbarkeit auf Englisch bleiben.
- Die Kostenmodus-Optionen des Erststart-Assistenten sind jetzt korrekt übersetzt.

Um die neuesten Fixes zu erhalten, führen Sie den Updater aus oder laden Sie die neue Version aus den [Release Notes][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2) herunter.

[Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2): CHANGELOG.md
