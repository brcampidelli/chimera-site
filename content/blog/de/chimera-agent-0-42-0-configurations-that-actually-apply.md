---
title: "Chimera Agent 0.42.0: Konfigurationen, die tatsächlich greifen"
date: 2026-08-11
category: update
summary: "Behoben: Sieben Einstellungen wurden gespeichert, aber änderten nichts, Sicherheitskontrollen vereinheitlicht, und Agents sind nun konfigurierbar statt Standardwerte zu akzeptieren."
version: "0.42.0"
---

## Einstellungen, die jetzt wirken

Sieben Konfigurationen wurden zuvor gespeichert, ohne Effekt zu haben — Standardmodell, Antwort-Caching, benutzerdefinierter Endpunkt, Timeout, Fallback-Chain und Prompt-Caching. Der `LLMGateway` erfasste Einstellungen beim Bau, aber `chimera app` erstellte ihn nur einmal pro Prozess. Sechs aktualisieren jetzt live. Drei (Cascade, Chat-Persistenz, Chat-Speicher) gelten für die **nächste Unterhaltung** und kennzeichnen dies. Zwei benötigen Neustart (Scheduler-Daemon und MCP-Autoload) und deklarieren das. Labels kommen nun vom Server, um stille Fehlausrichtungen zu verhindern.

## Vereinheitlichte Sicherheitskontrollen

`CHIMERA_TOOL_ALLOWLIST` und `CHIMERA_TOOL_DENYLIST` betrafen zuvor nur `chimera run` und `chimera solve`. Andere Oberflächen (App, API, Batch-Jobs, Messaging-Bots) ignorierten sie komplett. Jetzt gelten sie überall. Ablehnungen **kombinieren** — Bereitstellung, Anfrage und Posture-Beschränkungen müssen alle ein Tool erlauben. Berechtigungen **schneiden sich**, sodass Anfragen nicht über den Umfang des Absenders hinausgehen. Behoben: `explore_repository` umging Filter wegen später Registrierung.

## Agent-Identität und Anweisungen

Agent-Name, Sprache und permanente Anweisungen waren zuvor funktionslos. `profile.json` wurde von der API nicht gelesen, Persona-Fakten galten nur bei Relevanz für einen Turn, und der bedingungslose Präambel-Bereich war für REPL/OpenAI-Kompatibilität reserviert. Jetzt gelten sie für Code-Bearbeitung, autonome Ausführung und Messaging. Anweisungen **fügen hinzu** — Standard-Prompts behalten Sicherheitswachen, und benutzerdefinierte Blöcke warnen, wenn sie keine Fähigkeiten gewähren.

## Bereitstellungsposture als Basis

Ausführungsbereich, Genehmigungsanforderungen und Host-Befehl-Berechtigungen waren verstreut über gelöschte Komponenten, hartkodierte Paare und eine Env-Var, die von `PATCH /api/config` abgelehnt wurde. Jetzt in einer Karte konsolidiert. Bereitstellungsposture ist eine **Basis**, kein Standard — Clients können Beschränkungen auf Maschinen, die sie nicht kontrollieren, nicht still übergehen. Host-Ausführung benötigt explizite Bestätigung.

## Nächste Schritte

Führen Sie `chimera app update` aus und prüfen Sie [Chimera Agent v0.42.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.42.0) für Details zu Projekt-Level-Agents, Sicherheitsaudit-Korrekturen und Skill-Card-Aktivierung.
