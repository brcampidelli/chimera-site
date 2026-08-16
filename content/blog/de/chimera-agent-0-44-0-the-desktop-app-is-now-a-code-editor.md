---
title: "Chimera Agent 0.44.0: Die Desktop-App ist jetzt ein Code-Editor"
date: 2026-08-16
category: update
summary: "Die Chimera-Desktop-App verwandelt sich von einer Agenten-Konsole in einen vollwertigen Code-Editor mit Diagnostik, Inline-Vervollständigungen, Suche und Integration externer Agenten."
version: "0.44.0"
---

## Von der Konsole zum Code-Editor

Die Chimera Agent Desktop-App hat sich in Version 0.44.0 grundlegend verändert. Was früher primär eine Konsole zur Interaktion mit Agenten war, ist jetzt eine leistungsfähige Code-Entwicklungsumgebung. Dieser Wandel spiegelt wider, wie Nutzer tatsächlich mit KI-Agenten arbeiten – nicht nur durch Chat, sondern durch Zusammenarbeit an Code.

Sieben wichtige Funktionen kommen gemeinsam in diesem Release. Der Editor unter `#/edit` nutzt CodeMirror mit richtigen Tabs, Undo-Historie pro Datei und Warnungen, wenn ein Agent versucht, eine ungespeicherte Datei zu modifizieren, an der Sie arbeiten. Diagnostik kommt jetzt von `ruff server`, was sicherstellt, dass die Warnungen denen entsprechen, die im CI fehlschlagen würden. Der Editor bietet Inline-Vervollständigungen durch ein lokales Modell, mit grauer Vorschau, die Sie per Tab bestätigen oder mit Escape ablehnen können.

## Praktische Verbesserungen

Die Suche funktioniert jetzt im gesamten Workspace und nutzt ripgrep, wo verfügbar. Sie können Systemressourcen-Nutzung (CPU, Speicher, GPU VRAM) einsehen und Retrieval über Ihr Repository mit vorregistrierten Benchmarks durchführen. Der Command Runner behält den Verlauf pro Projekt über Neuladungen hinweg bei, mit korrekter Prozessbaum-Beendigung beim Stoppen oder Schließen.

Am bedeutendsten ist vielleicht, dass Sie jetzt Coding-Aufgaben an externe Agenten wie Claude Code oder Gemini CLI delegieren können. Diese integrieren sich über ACP und durchlaufen denselben Verifizierungs- und Snapshot/Revert-Prozess wie native Turns. Die App macht klar, wenn externe Agenten unter anderen Sicherheitsgrenzen operieren – sie können Chimera's Datei-Schreibschutz ablehnen, obwohl Checkpoint/Revert als Sicherheitsnetz bleibt.

## Erste Schritte

Die Einrichtung bleibt einfach. Nur ein Provider-Key ist zum Start nötig, mit optionalen Fähigkeiten klar gekennzeichnet. Für Editor-Diagnostik stellen Sie sicher, dass `ruff` installiert ist. Inline-Vervollständigungen benötigen Ollama mit dem spezifischen `qwen2.5-coder:1.5b-base`-Modell (beachten Sie das Base-Tag – Instruct-Modelle funktionieren hier nicht richtig). Externe Agenten benötigen ihre jeweiligen CLI-Tools.

Das Release enthält ehrliche Einschränkungen: Unsignierte Installer lösen Sicherheitswarnungen aus, externe Agenten haben andere Sicherheitsgrenzen, und Retrieval ist noch nicht in den Haupt-Agenten-Flow eingebunden. Der Command Runner ist kein vollwertiges Terminal – jeder Befehl läuft in einem frischen Prozess, sodass Zustände wie `cd` oder `export` nicht erhalten bleiben.

Für alle Details, einschließlich zwei durch ungetestete Szenarien entdeckter Bugs, siehe das [CHANGELOG][Chimera Agent v0.44.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.44.0). Um es selbst auszuprobieren, aktualisieren Sie Ihre Chimera Agent-Installation und erkunden Sie den neuen Editor unter `#/edit`.
