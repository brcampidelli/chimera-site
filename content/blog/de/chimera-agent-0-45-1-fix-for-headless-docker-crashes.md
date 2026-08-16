---
title: "Chimera Agent 0.45.1: Behebung von Docker-Abstürzen im Headless-Modus"
date: 2026-08-16
category: update
summary: "v0.45.1 behebt ein kritisches Docker-Startproblem, bei dem Headless-Container aufgrund einer unnötigen FastAPI-Abhängigkeit abstürzten."
version: "0.45.1"
---

## Warum Docker-Container beim Start abstürzten

Chimera Agent 0.45.0 führte einen stillen Fehler für Headless-Docker-Deployments ein. Das Container-Image installiert `.[full]` ohne das `desktop`-Extra, was absichtlich FastAPI ausschließt. Allerdings begann der Cron-Pfad mit dem Import von `chimera.api.usage`, was die vorzeitige Initialisierung des API-Moduls auslöste. Dies zog FastAPI als indirekte Abhängigkeit durch einen JSONL-Reader nach sich, was dazu führte, dass Container mit `ModuleNotFoundError` in einer Crash-Loop endeten.

Der Bug entging der Entdeckung, weil:
1. Entwicklungsumgebungen typischerweise FastAPI installiert haben
2. Keiner der 2.945 existierenden Tests eine saubere `.[full]`-Installation simulierte
3. Der Fehler trat nur in Produktions-Deployments auf

## Lazy Loading für Kernabhängigkeiten

Die Lösung behebt die Ursache, statt Symptome zu maskieren. Das Hinzufügen von `desktop` zum Image hätte funktioniert, aber widersprach der dokumentierten Zweckbestimmung des Extras ("der Core-CLI/Gateway benötigt es nie") und erhöhte die Image-Größe unnötig.

v0.45.1 modifiziert `chimera/api/__init__.py` um:
- Re-Exports verzögert statt sofort aufzulösen
- FastAPI-Abhängigkeiten auf web-spezifische Komponenten zu isolieren
- Klare Fehlermodi beizubehalten, wenn `desktop` tatsächlich benötigt wird

Fünf Leaf-Module (`usage`, `roles`, `sessions`, `posture` und `config_api`) ziehen den Web-Stack nicht mehr implizit, wenn sie von CLI-Operationen importiert werden. Der Gateway bleibt mit nur `.[full]` installiert funktionsfähig.

## Neues Sicherheitsnetz

Ein Subprozess-Test überprüft nun, ob Imports ohne verfügbares FastAPI funktionieren. Dies hätte das Problem vor dem Release erkannt durch:
1. Ausführung in einer Umgebung, in der `fastapi` absichtlich nicht importierbar ist
2. Überprüfung der Kernfunktionalität vor weiteren Checks
3. Spiegelung tatsächlicher Deployment-Bedingungen

End-to-End-Verifikation bestätigt die Lösung: Eine saubere `.[full]`-Installation kann nun `serve --cron` ohne Abstürze ausführen.

Aktualisieren Sie mit `pip install -U chimera-agent==0.45.1`. Zur Deployment-Überprüfung testen Sie Ihren Container mit `serve --cron` und prüfen Sie auf Gateway-Initialisierungsmeldungen. [Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) enthält vollständige technische Details zu den Änderungen.
