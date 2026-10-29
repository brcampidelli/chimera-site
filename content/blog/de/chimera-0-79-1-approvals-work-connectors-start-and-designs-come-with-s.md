---
title: "Chimera 0.79.1: Approvals funktionieren, Connectors starten, und Designs kommen mit Formen"
date: 2026-10-29
category: update
summary: "0.79.1 behebt Race-Conditions bei Design-Approvals, defekte Windows-Connectors, Base64-Media-Flooding und leere erste Vorschläge – plus projektbezogene Persistenz von Berechtigungen."
version: "0.79.1"
---

## Was Approvals kaputt gemacht hat – und was das Racing jetzt stoppt

Vor diesem Release konnte das Genehmigen eines Designs mit einer verwirrenden Meldung fehlschlagen: „another Chimera process asked this question.“ Der Fehler hatte nichts mit einem anderen Prozess zu tun. Der Design-Approval wird als Frage in seiner eigenen Konversation beantwortet, und die Antwort erscheint im Approvals-Fenster, in der Statusleiste und in der Governance-Liste. Nur der Bildschirm des Owners kann sie beantworten. Das Problem war, dass zwei Antworten, die im selben Moment eintreffen, kollidieren konnten – und das System hatte keine Möglichkeit, genau eine zu erfassen und weiterzumachen. Die Fehlermeldung war Rauschen, aber sie blockierte den Approval und ließ den User ohne klaren Recovery-Pfad zurück.

Version 0.79.1 behandelt das korrekt. Wenn zwei Antworten gleichzeitig beim Approval eintreffen, wird genau eine erfasst – die Race-Condition wird aufgelöst, nicht abgelehnt. Der Approval wird abgeschlossen, das Design geht weiter, und der User sieht einen konsistenten Zustand über alle drei UI-Oberflächen hinweg. Wer Agents baut, die Design-Output erzeugen und durch einen menschlichen Approval-Schritt leiten, kann sich jetzt auf den Governance-Flow verlassen – ohne einen sporadischen Crash, der eigentlich nie etwas mit Nebenläufigkeit zu tun hatte.

## Ein Design-Vorschlag, der kein leerer Text ist

Chimera Design hatte ein tieferliegendes Problem: Der erste Vorschlag war praktisch unbrauchbar. Das Modell lieferte eine fehlerhafte Operation zurück, das System zeigte einen rohen Fehler an, den das Modell nicht reparieren konnte, und die Konversation blieb stecken. Selbst wenn die Operation strukturell gültig war, war der Vorschlag selbst reiner Text – keine Typografie, keine Hintergründe, keine Formen. Das bedeutete: Die erste Interaktion mit Design war ein Prompt, der visuellen Output verlangte und nichts Visuelles zurückbekam.

Der Fix besteht aus vier Teilen. Eine fehlerhafte Operation kommt jetzt als Argumentfehler zurück, den das Modell beheben kann – die Konversation korrigiert sich also selbst, statt anzuhalten. Jede Operation zeigt ihre erwartete Form, was dem Modell ein Ziel gibt, das es treffen kann. Wenn ein Vorschlag abgeschnitten wird, weil er versucht, zu viele Operationen in einen Turn zu packen, erkennt das System die Truncation und fragt mit weniger Operationen erneut. Schließlich fordert der erste Vorschlag standardmäßig Typografie, Hintergründe und Formen an – der Output startet ab dem ersten Turn visuell. Das Ergebnis ist ein brauchbarer erster Vorschlag ohne manuelle Retry-Schleife.

## Connectors, die starten, und Dateien, die den Context nicht fluten

Zwei Infrastruktur-Fixes sind für alle relevant, die externe Tools anbinden. Erstens: Windows-User, die Connectors über `.cmd`-Launcher ausführen – Supabase via `npx` ist der häufige Fall –, liefen in einen stillen Bruch, wenn das Connector-Kommando ein `&` in seiner URL enthielt. Der Launcher interpretierte das Zeichen, das Kommando wurde geteilt, und der Connector startete nie. Chimera lehnt jetzt ein Argument ab, das nicht sicher übergeben werden kann, und sagt dir, warum – der Fehler ist damit explizit und behebbar. Die App wartet außerdem nicht mehr darauf, dass MCP-Server sich verbinden, bevor sie sich öffnet. Vorher konnte die UI bis zu zwei Minuten auf „Failed to fetch“ hängen bleiben, während Connectors in Timeouts liefen. Der Service öffnet sofort, und die Verbindungen werden im Hintergrund aufgelöst.

Zweitens: Connectors, die Audio oder Bilder inline zurückgeben – etwa VoiceStudios Narration –, haben früher Base64 direkt in den Model-Context gekippt. Das Modell musste den codierten Blob als Text lesen, was das Context-Fenster füllte und den Turn stoppte. Diese Dateien werden jetzt im `mcp-output/`-Ordner des Projekts gespeichert, aus Commits herausgehalten, und die Konversation referenziert sie als abspielbare oder anzeigbare Artefakte. Das Modell sieht nie die rohen Bytes, und der Turn wird ohne Context-Erschöpfung abgeschlossen.

## Berechtigungsstatus, der einen Neustart überlebt

Der Schalter „Ignore permissions“ lebt jetzt auf Projektebene und bleibt über Neustarts hinweg erhalten. Ein projektweiter Schalter deckt alle Konversationen des Projekts ab, auch neue, während jede Konversation weiterhin ihren eigenen unabhängigen Toggle behält. Wird der Projekt-Schalter eingeschaltet, werden bereits auf Berechtigung wartende Cards sofort freigegeben. Nach einem Neustart listet ein Banner jedes gespeicherte Projekt und jede Konversation auf, bei denen der Schalter aktiv war; mit einem Klick bestätigst du die Reaktivierung, der Rest wird verworfen. Nur der Desktop-Bildschirm kann den Schalter einschalten, und das Ausschalten gilt immer überall – die Sicherheitsgrenze ist einseitig.

## Was jetzt zu tun ist

Upgrade mit `pip install chimera-agent==0.79.1`. Wenn du Design nutzt, starte einen neuen Vorschlag und prüfe, ob die erste Antwort visuelle Struktur enthält. Wenn du unter Windows mit Supabase oder einem `npx`-basierten Connector arbeitest, verifiziere, dass der Connector ohne manuelles Argument-Escaping startet. Die vollständigen Notes stehen unter [Chimera Agent v0.79.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.79.1).
