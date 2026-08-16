---
title: "Chimera Agent 0.43.0: LiteLLM-Tor öffnet sich, Registry wird sichtbar und wichtige Fixes"
date: 2026-08-16
category: update
summary: "Chimera 0.43.0 hebt willkürliche Provider-Beschränkungen auf, macht versteckte Einstellungen zugänglich und behebt Probleme bei Dokumenten-Uploads und Session-Persistenz."
version: "0.43.0"
---

## LiteLLM-Tor akzeptiert jetzt jeden Provider-Schlüssel

Bisher erkannte Chimera nur fünf LiteLLM-Provider und wies gültige Schlüssel von Diensten wie Groq oder Mistral mit der irreführenden Fehlermeldung "Kein Provider-Schlüssel konfiguriert" ab. Das Tor akzeptiert jetzt jeden `<PROVIDER>_API_KEY`, mit zwei Sicherheitsvorkehrungen:

1. Eine Denylist verhindert, dass Nicht-Model-Provider (wie ElevenLabs oder Stability AI) fälschlicherweise als Modellquellen identifiziert werden
2. `doctor` validiert jetzt Provider-Namen gegen LiteLLM's Enum, sodass Tippfehler erkannt werden, die sonst stillschweigend fehlschlagen würden

Die Änderung behebt ein tieferliegendes Problem: Schlüssel, die in `.env` platziert wurden, wurden aufgrund von Pydantics `extra="ignore"`-Einstellung stillschweigend ignoriert. Da `chimera init` `.env`-Dateien erstellt und die Dokumentation Benutzer dorthin verweist, führte dies zu anhaltenden Konfigurationsfehlern.

## Zuvor versteckte Funktionen jetzt zugänglich

Drei wichtige Funktionen existierten im Code, hatten aber keine Benutzeroberfläche:

1. **Agent Registry**: Das Lane-Box des Boards war ein Freitextfeld, das Registry-IDs erriet, die nie angezeigt wurden. Jetzt über den dritten Tab von Automation zugänglich, zeigt es bestehende Agenten an, während weiterhin Arbeiten gegen nicht existierende IDs eingereicht werden können (die im Backlog warten).
2. **Embed Model Selection**: Zuvor versteckt, erscheint dies jetzt direkt unter dem Schalter für semantisches Gedächtnis, den es beeinflusst. Fehler degradieren stillschweigend zur lexikalischen Suche, was eine sichtbare Konfiguration entscheidend macht.
3. **Key Pools**: Diese rotierten Round-Robin mit Cooldowns, hatten aber keine UI. Die Oberfläche verwaltet sie jetzt nach Operation (hinzufügen/entfernen) statt geheime Werte preiszugeben.

## Kritische Fixes für Kernfunktionalität

Zwei Funktionen waren in der App defekt:

- **Datei-Uploads und Nachrichten-Diktierung**: Beide schlugen mit 422-Fehlern fehl, weil `authHeaders()` den `application/json` Content-Type erzwang, was die korrekten Multipart-Form-Grenzen verhinderte. Tests hatten dies übersehen, da sie die gesamte API-Schicht simulierten.

- **Session-Persistenz**: Die App verlor Theme-, Workspace- und Spracheinstellungen beim Start aufgrund zufälliger Port-Zuweisung, die den `localStorage`-Ursprung änderte. Jetzt werden Ports gemerkt und wiederverwendet.

Der Erststart-Assistent behandelt die Modellauswahl besser, zeigt (aber wendet nicht automatisch an) kompatible Modelle für Ihren Provider an, um sofortige 401-Fehler zu vermeiden.

Aktualisieren Sie mit `pip install --upgrade chimera-agent` oder sehen Sie [Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0) für vollständige Details.
