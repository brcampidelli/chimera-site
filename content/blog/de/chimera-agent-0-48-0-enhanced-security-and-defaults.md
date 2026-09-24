---
title: "Chimera Agent 0.48.0: Verbesserte Sicherheit und Standardeinstellungen"
date: 2026-09-02
category: update
summary: "Chimera Agent 0.48.0 bringt bedeutende Sicherheitsverbesserungen und Änderungen der Standardeinstellungen mit sich, mit Fokus auf Sandbox-Isolation und kosteneffiziente Modellauswahl."
version: "0.48.0"
---

## Verbesserte Sandbox-Isolation

Die Standardeinstellung für die Sandbox wurde aktualisiert, um die Sicherheit zu priorisieren. Bisher war die `local`-Sandbox nicht isoliert und verließ sich auf Governance-Kernel und Bestätigungsaufforderungen, um den Rechner zu schützen. Dieser Ansatz hatte Schwachstellen, insbesondere wenn Benutzer Aufforderungen umgingen oder Anweisungen injiziert wurden. Jetzt ist der Standard `auto`, der **Seatbelt** auf macOS mit einem `(deny default)`-Profil und **bubblewrap** auf Linux mit strengen Isolationsparametern verwendet. Dies gewährleistet Netzwerkisolation und beschränkt Schreibzugriffe auf das Arbeitsverzeichnis und das Temp-Verzeichnis, wodurch potenzielle Risiken erheblich reduziert werden.

## Windows- und Linux-Kernel-Überlegungen

Für Windows wird in diesem Update explizit darauf hingewiesen, dass kein Sandbox-Mechanismus bereitgestellt wird. Die bestehenden eingeschränkten Token und Netzwerkfilter werden nicht angenähert, da eine fehlende Grenze weniger gefährlich ist als eine fälschlich geglaubte. Ebenso melden Linux-Kernel, die unprivilegierte Benutzernamensräume verweigern, die Sandbox als *nicht verfügbar*, was Transparenz über Sicherheitsbeschränkungen gewährleistet.

## Kosteneffizientes Standardmodell

Das Standardmodell wurde von GPT-5.5 auf DeepSeek V3.1 umgestellt. Diese Änderung adressiert die hohen Kosten des vorherigen Standardmodells, das das teuerste im Katalog war. DeepSeek V3.1 bietet eine kostengünstigere Option bei $0.25/$0.95 pro 1M Tokens im Vergleich zu $5.00/$30.00 für GPT-5.5. Die Umgebungsvariable `CHIMERA_DEFAULT_MODEL` hat weiterhin Vorrang, und der Modellwähler ermöglicht Änderungen pro Konversation.

## Auditgesteuerte Verbesserungen

Ein umfangreiches Audit identifizierte zahlreiche Empfehlungen, wobei 56% der Arbeit sich auf die Verkabelung und nicht auf Produktfunktionen konzentrierten. Dieses Release behebt viele dieser Probleme und stellt sicher, dass der Code korrekt läuft und Protokolle genau sind. Bemerkenswerte Korrekturen umfassen die korrekte Handhabung verweigerter Tools, die Entfernung gescheiterter Cron-Jobs und die Sicherung von Zeichenketten, die Anmeldeinformationen enthalten. Jede Korrektur wurde rigoros getestet, indem Änderungen rückgängig gemacht und sichergestellt wurde, dass Tests die Fehler erkannten.

## Neue Funktionen und Verbesserungen

Neue Funktionen umfassen Anmeldeinformationen, die im OS-Schlüsselbund gespeichert werden (`chimera secrets`), einen Entscheidungsgenehmigungsmechanismus (`chimera approve`) und Codierungsrunden, die unterbrochene Verbindungen überstehen. Darüber hinaus erfordern Befehle, die als lesend bestätigt wurden, keine Bestätigung mehr, und MCP-Server können geöffnet statt übergeben werden. Drei neue Gates im CI-System erhöhen die Robustheit des Systems weiter.

Eine detaillierte Übersicht über alle Änderungen finden Sie im [CHANGELOG.md][Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0).

[Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0): CHANGELOG.md
