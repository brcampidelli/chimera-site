---
title: "Chimera Agent 0.45.0: Governance, Preiskontrolle und Sicherheitsfixes für unbeaufsichtigte Ausführungen"
date: 2026-08-16
category: update
summary: "Diese Version verstärkt die unbeaufsichtigte Ausführung mit obligatorischer Authentifizierung, Ausgabenlimits und einheitlicher Governance über alle Schnittstellen hinweg."
version: "0.45.0"
---

## Sicherheit zuerst: Binding und Authentifizierung

Frühere Versionen von Chimera Agent boten standardmäßig ein unauthentifiziertes Gateway auf allen Netzwerkschnittstellen an. Die `docker-compose.yml` veröffentlichte Port 8765 global, und `.env.example` wurde ohne gesetztes Token ausgeliefert. Eine Ein-Kommando-Deployment konnte so unbeabsichtigt ein offenes Agenten-Gateway erstellen, das für jeden zugänglich war, der den Port entdeckte.

v0.45.0 ändert dies in drei Punkten:
- Der `serve`-Befehl verweigert jetzt die Bindung an Nicht-Loopback-Adressen ohne Authentifizierungstoken
- Docker Compose veröffentlicht standardmäßig nur auf `127.0.0.1`
- Ein explizites `--allow-insecure-bind`-Flag existiert für legitime Fälle (wie authentifizierte Proxies)

Dies ist eine Breaking Change für Deployments, die das Gateway von einem anderen Rechner aus ansprechen. Setzen Sie `CHIMERA_SERVER_TOKEN` oder nutzen Sie den Escape-Hatch bei Bedarf.

## Ausgabenkontrolle, die wirklich funktioniert

Vor diesem Release gab es nur Schritt-Zähler als Limits – ein Job in einer Retry-Schleife konnte Ihr gesamtes Provider-Guthaben aufbrauchen. v0.45.0 führt drei separate Ausgabenobergrenzen ein:
1. Pro-Run-Limit
2. Pro-Job-Limit (für geplante Tasks)
3. Tägliches Gesamtlimit, das Cron-Jobs blockiert

Unpreisbare Aufrufe stoppen jetzt die Ausführung statt stillschweigend fortzufahren. Lokale Modelle werden als kostenlos behandelt statt unbekannt, wodurch Limits die eine Konfiguration nicht blockieren, die nicht überziehen kann. Führen Sie `chimera doctor` aus, um zu prüfen, ob Ihr Standardmodell gepreist werden kann, bevor Sie Limits setzen.

## Einheitliche Governance über alle Schnittstellen

Bislang baute jede Ausführungsschnittstelle (`serve`, cron, MCP, A2A und Messaging-Adapter) ihre eigene Tool-Registry. Jetzt erstellt ein einziges `governed_profile()` den Stack für alle fünf, mit Build-Time-AST-Checks gegen Regressionen.

Der Schlüsselgedanke: Der Modus `CHIMERA_GOVERNANCE=observe` existiert, um die Kosten der Durchsetzung zu messen, bevor sie aktiviert wird. Er läuft den vollständigen Stack, zeichnet aber nur auf, was blockiert würde – liefert konkrete Daten statt Produktionsrisiko zu erzwingen. Default bleibt `off` – Governance sollte explizit aktiviert werden.

Dieses Release aktiviert auch das lange brachliegende Approver-System für Dangerous-Class-Aufrufe, eliminiert Over-Blocking (False Positives) ohne Reduktion der Angriffsblockade.

## Was kommt als Nächstes

Upgrade mit `pip install --upgrade chimera-agent` und prüfen Sie Authentifizierung und Ausgabenlimits Ihres Deployments. Für Editor-Integration zeigen Sie die Agent-Einstellungen Ihres Editors auf `chimera acp --workspace <repo>`. Details in den [Release Notes][Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
