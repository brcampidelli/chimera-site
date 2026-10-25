---
title: "Chimera Agent 0.76.0: Modelle pro Projekt und ein Fix für Claude"
date: 2026-10-25
category: update
summary: "Chimera Agent 0.76.0 erlaubt es, jedem Projekt ein eigenes Modell zuzuweisen, und behebt Probleme mit Claude-Modellen im Code-Bildschirm."
version: "0.76.0"
---

## Modelle pro Projekt

Vor diesem Release änderte ein Wechsel des Modells für ein Projekt das Modell für jede Konversation in allen Projekten. Das Modell war eine einzige globale Einstellung, und wer verschiedene Modelle für verschiedene Projekte nutzen wollte, musste manuell hin- und herschalten. Das war fehleranfällig und machte es schwer, ein Projekt aus Konsistenz- oder Kostengründen auf einem bestimmten Modell zu halten.

Jetzt kann jedes Projekt sein eigenes Modell haben. Eine Code-Konversation nutzt ihr eigenes festgelegtes Modell, falls vorhanden, dann das des Projekts, dann den globalen Standard. Der Beleg des Turns zeigt, welches Modell verwendet wurde, sodass man es auf einen Blick prüfen kann. Das Modell eines Projekts zu ändern, wirkt sich nicht mehr auf Konversationen in einem anderen aus. Das bedeutet, man kann ein Projekt auf ein günstigeres Modell zum Experimentieren setzen und ein anderes auf ein leistungsfähigeres für die Produktion, ohne sich um Querkontamination sorgen zu müssen.

Wenn der Agent ein anderes Modell vorschlägt, kann er nur eine Karte hinterlassen, die die Konversation oder das Projekt benennt, für die es gelten würde. Nichts ändert sich, bis man zustimmt. Das hält die Kontrolle beim Nutzer und verhindert, dass der Agent mitten in der Konversation stillschweigend das Modell wechselt.

## Claude-Modelle funktionieren wieder im Code-Bildschirm

Mit einem Anthropic-Modell als Standard schlug jeder Coding-Turn im ersten Schritt mit einem Fehler wegen des Eingabeschemas eines Tools fehl. Das Schema des `question`- Tools nutzte ein Konstrukt, das die API von Anthropic verweigert. Das bedeutete: Wer Claude als Standardmodell nutzte, konte den Code-Bildschirm überhaupt nicht verwenden – jeder Turn brach ab, bevor er etwas Nützliches tat.

Das Schema ist jetzt ein einfaches Objekt, das die API von Anthropic akzeptiert. Ein Test prüft jedes Tool-Schema, damit das Problem nicht zurückkomen kann. Dieser Fix ist wichtig, weil er sicherstellt, dass alle unterstützten Modelle auf allen Bildschirmen funktionieren, nicht nur auf denen, die zufällig tolerant gegenüber Schema-Eigenheiten sind.

## Was jetzt zu tun ist

Aktualisieren Sie auf Version 0.76.0 und legen Sie ein projektspezifisches Modell fest, falls Sie eines benötigen. Falls Sie Claude im Code-Bildschirm gemieden haben, probieren Sie es erneut. Siehe die [Release Notes][Chimera Agent v0.76.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.76.0) für vollständige Details.
