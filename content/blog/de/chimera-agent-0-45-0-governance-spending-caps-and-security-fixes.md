---
title: "Chimera Agent 0.45.0: Governance, Ausgabenlimits und Sicherheitskorrekturen"
date: 2026-08-16
category: update
summary: "Dieses Release implementiert fehlende Sicherheitsvoreinstellungen, fügt Ausgabenkontrollen hinzu und erweitert die Governance auf alle unbeaufsichtigten Schnittstellen."
version: "0.45.0"
---

## Sicherheitsvoreinstellungen, die auch wirklich voreingestellt sind

Die vorherige Version wurde mit einer unsicheren Konfiguration ausgeliefert: offene Ports, keine Authentifizierung und keine Warnungen. Das war kein Versehen – es war eine bewusste Entscheidung, die einfache Einrichtung über Sicherheit zu stellen, aber die Balance war falsch. Jetzt weigert sich `serve`, an Nicht-Loopback-Adressen ohne Token zu binden, und das Docker-Setup veröffentlicht nur an `127.0.0.1`. Wenn Sie das Gateway freigeben müssen, müssen Sie explizit mit `--allow-insecure-bind` zustimmen oder `CHIMERA_SERVER_TOKEN` setzen.

Dies bricht bestehende Bereitstellungen, die sich auf das alte Verhalten verlassen haben. Die Lösung ist einfach, aber es war eine notwendige Änderung: Ein Agenten-Gateway, das für jeden im Netzwerk zugänglich ist, ist ein Risiko, kein Feature.

## Ausgabenlimits, die funktionieren

Vor diesem Release gab es nur einen Schritt-Zähler als Ausgabenkontrolle. Ein Job in einer Retry-Schleife konnte Ihre API-Guthaben ohne Warnung aufbrauchen. Jetzt gibt es drei separate Limits: pro Lauf, pro Job und eine tägliche Gesamtsumme. Wenn ein Aufruf nicht preisbar ist, stoppt der Lauf, anstatt unkontrolliert fortzufahren. Lokale Modelle werden als kostenlos behandelt, nicht als unbekannt, sodass Limits die eine Konfiguration nicht blockieren, die nicht überziehen kann.

`chimera doctor` prüft, ob Ihr Standardmodell überhaupt preisbar ist. So vermeiden Sie Überraschungen beim Setzen von Ausgabenlimits.

## Governance für alle Schnittstellen

Fünf verschiedene Komponenten (`serve`, cron, MCP, A2A und Messaging-Adapter) hatten jeweils ihr eigenes minimales Tool-Registry. Jetzt teilen sie sich einen einzigen `governed_profile()`-Stack, erzwungen durch eine Build-Time-AST-Prüfung. Die entscheidende Erkenntnis: `CHIMERA_GOVERNANCE=observe` ist nützlicher als `enforce` – es protokolliert, was blockiert worden wäre, ohne tatsächlich etwas zu blockieren, sodass Sie die Auswirkungen messen können, bevor Sie es aktivieren.

Dieses Release verbindet auch das bestehende, aber bisher ungenutzte Genehmigersystem. Gefährliche Aufrufe, die externe Daten lesen, haben jetzt jemanden auf der anderen Seite des Tores, was Überblockierung reduziert, ohne die Sicherheit zu kompromittieren.

## Was kommt als Nächstes

Führen Sie `chimera doctor` aus, um Ihr Setup zu prüfen, und überprüfen Sie Ihre Bereitstellung, wenn Sie an `0.0.0.0` gebunden haben. Die vollständigen Änderungen finden Sie in [Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
