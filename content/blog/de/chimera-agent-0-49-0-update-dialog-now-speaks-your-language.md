---
title: "Chimera Agent 0.49.0: Update-Dialog spricht jetzt Ihre Sprache"
date: 2026-09-05
category: update
summary: "Chimera Agent 0.49.0 führt lokalisierte Update-Dialoge und eine manuelle Update-Prüfung ein, was die Benutzererfahrung in zehn Sprachen verbessert."
version: "0.49.0"
---

## Update-Dialog in Ihrer Sprache

Chimera Agent unterstützt jetzt lokalisierte Update-Dialoge in zehn Sprachen. Bisher wurde der Update-Dialog nur auf Englisch angezeigt, unabhängig von der im App ausgewählten Sprache. Diese Inkonsistenz wurde behoben, sodass der Update-Dialog den Spracheinstellungen des Betriebssystems folgt. Diese Änderung ist besonders nützlich für Benutzer, die sich auf die Standardsprache ihres Systems verlassen, da die Spracherkennung der App auf denselben Locale zurückgreift.

Zusätzlich enthält das Tray-Menü jetzt eine Option **Auf Updates prüfen**, die Benutzern eine manuelle Möglichkeit bietet, zu überprüfen, ob Updates verfügbar sind. Die automatische Update-Prüfung, die einmal beim Start ausgeführt wird, bleibt still, wenn keine Updates gefunden werden, um unnötige Unterbrechungen zu vermeiden. Die manuelle Prüfung informiert Benutzer jedoch explizit, ob sie auf dem neuesten Stand sind oder ob die Prüfung fehlgeschlagen ist. Dies behebt das vorherige Problem, bei dem Stille nach einem Klick als defekte Funktion interpretiert werden konnte.

## Fehlerdialoge und Diagnostik

Auch die Backend-Fehlerdialoge und die Beenden-Option im Tray wurden übersetzt. Die Diagnoseinformationen bleiben jedoch in ihrer ursprünglichen Sprache. Diese Unterscheidung ist entscheidend: **Was Ihnen sagt, was zu tun ist, wird übersetzt, aber was in einen Fehlerbericht einfließt, nicht.** Zum Beispiel wird die Fehlermeldung, die das Problem erklärt, in Ihrer Sprache angezeigt, während der Pfad, der Betriebssystemfehler und die stderr des Backends wortgetreu bleiben. Dies stellt sicher, dass Benutzer effektiv nach Lösungen suchen und Fehler melden können, ohne auf Sprachbarrieren zu stoßen.

## Was unverändert bleibt

Dieses Update ändert den Update-Mechanismus selbst nicht. Die automatische Prüfung wird weiterhin bei jedem Start ausgeführt, und der Installationsprozess bleibt benutzergesteuert, sodass eine explizite Zustimmung erforderlich ist, bevor fortgefahren wird. Es gibt keine periodische Prüfung, während die App läuft. Zudem ist es wichtig zu beachten, dass die Version, die den Update-Dialog anzeigt, die aktuell installierte Version ist, nicht die angebotene Version. Das bedeutet, dass die Aufforderung, Version 0.49.0 zu installieren, von der Version stammt, die Sie gerade verwenden.

Weitere Details finden Sie unter [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
