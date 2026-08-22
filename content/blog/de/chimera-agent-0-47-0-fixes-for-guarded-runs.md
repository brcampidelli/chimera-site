---
title: "Chimera Agent 0.47.0: Korrekturen für Guarded Runs"
date: 2026-08-22
category: update
summary: "Sieben Korrekturen beheben fehlerhafte Berichte über abgelehnte Tool-Aufrufe, Regelauswertungsfehler und Probleme mit der Audit-Integrität."
version: "0.47.0"
---

## Guarded Runs melden jetzt korrekt

Ein kritischer Fehler in guarded runs (`--guard`-Flag) wurde behoben. Bisher wurde ein durch Governance-Regeln abgelehnter Tool-Aufruf fälschlicherweise als erfolgreich gemeldet. Dies geschah, weil die Ablehnungsmeldung nicht mit `error:` begann, wodurch die Statusprüfung `True` zurückgab. Drei wichtige Bereiche waren betroffen:

1. Die Desktop-Frame-Visualisierung
2. Das Schrittprotokoll für Receipts
3. Der Drift-Detector

Dadurch erschienen Runs, in denen jede gefährliche Aktion blockiert wurde, in allen strukturierten Ausgaben als erfolgreich. Das Modell antwortete sogar mit Bestätigungsmeldungen für Aktionen, die nie ausgeführt wurden.

## Regelauswertung für Skripte und Dokumente korrigiert

Die Rules-Engine hatte zwei wesentliche Probleme:

1. **Mehrzeilige Skripte umgingen Schutz**: Durch die Art und Weise, wie Zeilenumbrüche bei der Textinterpolation escaped wurden, wurden Wortgrenzen in Regeln gebrochen. Dadurch konnten gefährliche Befehle durchrutschen, wenn sie in einem Skript nach harmlosen Befehlen auftraten.

2. **Dokumente lösten falsche Positivmeldungen aus**: Gleichzeitig wurden Markdown-Dateien, die gefährliche Befehle zitieren, hart blockiert. Der Schutz war effektiv invertiert – echte Bedrohungen wurden durchgelassen, während Dokumentation blockiert wurde.

Zwei Regeln feuerten bei keiner Eingabe. Diese Probleme wurden behoben, mit korrekter Handhabung sowohl von Skriptausführung als auch Dokumentinhalt.

## Audit- und Sicherheitsverbesserungen

Mehrere sicherheitsrelevante Korrekturen wurden implementiert:

- **Credential-Speicherung**: Das Audit-System speicherte sensible Daten, die es eigentlich nur erkennen sollte. Wenn eine geregelte `write_file`-Operation blockiert wurde, erschien der Dateiinhalt trotzdem in `audit.jsonl`. Jetzt gibt es zwei Ebenen: Das Audit redigiert sensible Daten (mit bestehenden Redaktionsfähigkeiten), und dokumentförmige Argumente werden nur nach Größe erfasst.

- **Audit-Chain-Integrität**: Der Security-Bildschirm meldete manchmal fälschlich Manipulation, obwohl keine Änderung stattfand. Dies passierte, wenn mehrere Writer Hash-Chains von verschiedenen Snapshots fortsetzten, wodurch doppelte Sequenznummern entstanden. Die Verifizierung funktioniert jetzt korrekt.

- **Observation-Mode-Korrekturen**: Der `observe`-Modus setzte Regeln durch, die er eigentlich nur messen sollte. Harte BLOCKs kehren jetzt korrekt vor Approver-Konsultation zurück, und Ablehnungen werden richtig in Metriken gezählt.

## Kernel-Sichtbarkeit und Zuverlässigkeit

Der Trust-Kernel wurde nicht über HTTP bereitgestellt, wodurch seine Entscheidungen API-Consumer nicht erreichten. Er wird jetzt korrekt für alle Endpoints installiert, wenn `CHIMERA_GOVERNANCE` auf `observe` oder `enforce` gesetzt ist. Weitere Zuverlässigkeitskorrekturen umfassen:

- Korrekte Handhabung von Worker-Timeouts
- Unterscheidbare Task-Fehler vs. Abläufe
- Container-Limit-Konfiguration
- Automatische Backend-Wiederherstellung

## Bekannte Einschränkungen

Das Update behebt mehrere Probleme, lässt aber einige bekannte Lücken:

1. `observe`-Berichte erscheinen noch nicht in HTTP-Schnittstellen
2. Die API bietet unter `enforce`-Modus noch keinen Genehmigungspfad
3. Vier HTTP-Endpoints haben noch keine Kernel-Integration

Diese sind im README dokumentiert, anstatt als versteckte Probleme belassen zu werden.

Jetzt aktualisieren mit `pip install --upgrade chimera-agent` oder über Ihren bevorzugten Paketmanager. Für vollständige Details siehe die [Release Notes][Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0).
