---
title: "Chimera Agent 0.47.0: Korrekturen für Guard Mode und Kernel-Integrität"
date: 2026-08-19
category: update
summary: "Kritische Fehlerbehebungen für die Zuverlässigkeit des Guard Modes, die Genauigkeit der Regelanwendung und die Kernel-Sichtbarkeit in verwalteten Bereitstellungen."
version: "0.47.0"
---

## Guard Mode meldet Ablehnungen jetzt korrekt

Ein Gate, das einen Tool-Aufruf ablehnte, lieferte bisher eine Beobachtungszeichenkette, die nicht mit `error:` begann, wodurch das System dies als erfolgreich protokollierte. Dies betraf drei Bereiche: den Desktop-Frame, Schrittprotokolle und die Drift-Erkennung. Ein Durchlauf, bei dem jede gefährliche Aktion blockiert wurde, erschien in allen strukturierten Daten als erfolgreich, wobei das Modell sogar abgeschlossene Aktionen wie Force-Pushes meldete, die nie stattfanden. Der Kernel markiert Ablehnungen nun korrekt, und der Ablehnungstext identifiziert, welcher Guard die Entscheidung traf.

## Regelabgleich für mehrzeilige Skripte korrigiert

Die Rules-Engine interpolierte Skripttexte bisher mit `repr`, was Zeilenumbrüche in zwei Zeichen escapte. Dies zerstörte Wortgrenzen in Regelmustern und verursachte zwei Probleme:

1. Einzeilige Skripte konnten Schutzmaßnahmen umgehen, da `\n` mit dem nächsten Wort verschmolz
2. Markdown-Dokumente mit gefährlichen Befehlen wurden fälschlich blockiert

Zwei Regeln wurden aufgrund dieses Problems nie ausgelöst. Der Text wird nun unverändert an Regeln übergeben, was dem tatsächlichen Skriptverhalten entspricht.

## Audit-System speichert keine Secrets mehr

Eine verwaltete `write_file`-Operation speicherte bisher den vollständigen Dateiinhalt in `audit.jsonl`, einschließlich sensibler Daten wie `.env`-Dateien oder privater Schlüssel. Dies geschah sogar, wenn ein anderer Guard den Vorgang bereits blockiert hatte. Das Audit redigiert nun sensible Inhalte (mit einem bestehenden Redaktor, der bisher nur für Schritt-Traces genutzt wurde) und protokolliert dokumentenförmige Argumente nur als Größen-Metadaten.

## Kernel-Sichtbarkeit für HTTP-Endpoints hinzugefügt

Die Entscheidungen des Trust-Kernels wurden bisher nicht in HTTP-Antworten für Run-, Batch- und Turn-Endpoints eingeschlossen. Kritische Entscheidungen wie Force-Push-Genehmigungen waren für Clients somit unsichtbar. Der Kernel ist nun korrekt in HTTP-Schnittstellen installiert, wenn `CHIMERA_GOVERNANCE` auf `observe` oder `enforce` gesetzt ist. Beachten Sie, dass HTTP-Bereitstellungen niemals auf dem Server-Terminal nachfragen – die Person an dieser Konsole hat die Anfrage nicht gestellt.

## Weitere Korrekturen

- Audit-Chains melden keine falschen Manipulationen durch gleichzeitige Schreibvorgänge mehr
- `observe`-Mode zählt Ablehnungen jetzt korrekt, die es nur messen sollte
- Hängende Worker blockieren keine gesamten Batches mehr unbegrenzt
- Container-Ressourcenlimits sind jetzt konfigurierbar
- Kontextbudget-Steuerung für Terminal-Nutzung hinzugefügt

## Bekannte Einschränkungen

Das Team hat drei aktuelle Lücken explizit dokumentiert, anstatt sie zufällig entdecken zu lassen:

1. `observe`-Berichte erscheinen noch nicht in HTTP-Schnittstellen
2. Die API bietet unter `enforce`-Mode noch keinen Genehmigungspfad
3. Vier HTTP-Endpoints enthalten weiterhin keine Kernel-Entscheidungen

Update mit `pip install --upgrade chimera-agent` oder siehe [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) für detaillierte Release Notes.
