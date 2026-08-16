---
title: "Chimera Agent 0.43.0: Erweiterte Provider-Unterstützung und verbesserte Steuerung"
date: 2026-08-16
category: update
summary: "Chimera Agent 0.43.0 bietet eine breitere Provider-Unterstützung über LiteLLM, neue UI-Steuerungen für zuvor versteckte Einstellungen sowie Korrekturen für Dokumentenanhang und Theme-Persistenz."
version: "0.43.0"
---

## Breitere Provider-Unterstützung mit LiteLLM

Chimera Agent ist nun vollständig mit LiteLLM integriert, wodurch Nutzer sich mit jedem von LiteLLM unterstützten Provider verbinden können. Bisher wurden nur fünf Provider erkannt, was Nutzer mit Schlüsseln für Anbieter wie Groq oder Mistral blockierte. Das Update stellt sicher, dass jeder `<PROVIDER>_API_KEY` akzeptiert wird, wobei eine Denylist Nicht-Model-Provider wie ElevenLabs und Stability ausschließt. Zusätzlich warnt `doctor` nun vor nicht erkannten Provider-Namen, um Tippfehler zu vermeiden, die gültige Provider imitieren könnten.

## Verbesserte UI-Steuerungen

Drei Einstellungen, die zuvor nur über `.env`-Dateien zugänglich waren, sind nun in der UI verfügbar: das Embed-Modell, die Ollama-Basis-URL und Key-Pools. Die Embed-Modell-Einstellung ist nun direkt mit dem Semantic-Memory-Schalter verknüpft, um sicherzustellen, dass Nutzer sie ohne stille Fehler konfigurieren können. Key-Pools werden über Operationen (hinzufügen/entfernen) verwaltet statt durch direkte Bearbeitung, was die Sicherheit erhöht, indem sensible Informationen nicht angezeigt werden.

## Korrekturen und Verbesserungen

Das Anhängen von Dokumenten und das Diktieren von Nachrichten funktionieren nun korrekt, wodurch ein 422-Fehler behoben wurde, der durch falsche Content-Type-Header verursacht wurde. Die App behält außerdem Ihr Theme, Arbeitsbereich, Projektliste und Sprache über Starts hinweg bei, was ein Problem behebt, bei dem diese Einstellungen durch Port-Änderungen verloren gingen.

Um diese Updates zu erkunden, werfen Sie einen Blick auf die [Release Notes][Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0).
