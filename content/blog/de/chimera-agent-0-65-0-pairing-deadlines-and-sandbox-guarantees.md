---
title: "Chimera Agent 0.65.0: Pairing, Deadlines und Sandbox-Garantien"
date: 2026-10-12
category: update
summary: "Bots koppeln sich jetzt beim ersten Start sicher, der Sandbox-Fallback ist Geschichte, Turns haben Deadlines und Ollama-Modelle lesen den gesamten Prompt."
version: "0.65.0"
---

## Der erste Boot koppelt den Bot, nicht den Raum

Vor diesem Release fragte die Desktop-App auf der Messaging-Karte „Ist das eine neue Installation?“, wenn der Datenordner bereits belegt war. Das bedeutete, dass jeder von der App gestartete Bot offen lief – er antwortete jedem, der ihn erreichte, mit den Tools und dem Budget des Besitzers. Ein Pairing-Code, falls einer generiert wurde, landete in einer Konsole, die niemand liest.

Die App zeichnet jetzt beim Start auf, welche Bots bereits konfiguriert waren. Diese Bots antworten weiter wie zuvor. Ein danach konfigurierter Bot startet mit Pairing, und sein Code erscheint auf der Messaging-Karte – dort, wo tatsächlich jemand hinschaut. Die API bildet das ab: `GET /api/messaging` meldet die Zustände `pairing_code`, `pairing` und `open`. Die Desktop-Bridge sieht `pairing`, aber niemals den Code selbst, sodass Automatisierung den menschlichen Schritt nicht umgehen kann.

## Eine Sandbox, die nicht laufen kann, weigert sich zu laufen

`CHIMERA_SANDBOX=docker` ohne laufenden Docker-Daemon zu setzen, führte früher mit einer einzigen Logzeile zum Fallback auf den Host. Ein Befehl, der isoliert hätte sein sollen, lief direkt auf der Maschine. Dieser Fallback ist verschwunden. Jetzt verweigern `run_shell`, `execute_code` und Workflow-Schritte die Ausführung, bevor sie überhaupt die Host-Ausführungsfrage stellen. Die Verweigerungsmeldung erklärt, was passiert ist, dass nichts ausgeführt wurde, und nennt die zwei Auswege: Docker starten oder `CHIMERA_SANDBOX=local` setzen. Der Verifier enthält sich der Stimme, anstatt Arbeit rückgängig zu machen, weil ein Daemon nicht lief.

Ein Aufrufer, der explizit `fallback=` übergibt, behält das alte Verhalten. Alle anderen bekommen einen harten Stopp. Dieselbe Grenze gilt für eingehende Medien: Telegram- und WhatsApp-Downloads stoppen jetzt beim 20-MB-Limit, bevor das erste Byte empfangen wird, wenn die Größe deklariert ist, anstatt die gesamte Datei in den Speicher zu lesen und erst danach zu messen.

## Deadlines erreichen das Governance-Band

Eine Entscheidung kann jetzt eine Deadline tragen, und deren Verstreichen schiebt das REVIEW-Band in Richtung Prüfung. `DecisionSpec.deadline_s` deklariert eine pro Entscheidung; `Decider.decide(..., deadline_s=)` überschreibt sie pro Aufruf. Eine nicht rechtzeitig eingetroffene Antwort stoppt mit `deadline_missed` auf der Quittung und im Entscheidungslog, sodass Verfehlungen zählbar werden.

Mit gesetztem `CHIMERA_GOVERNANCE_BAND_DEADLINE_S` erzeugt eine Verfehlung eine REVIEW-Karte mit `band: deadline` – niemals ALLOW. Eine verspätete Antwort wird niemals nachträglich gecacht oder angewendet. Dies ist standardmäßig deaktiviert, und das neue Panel Einstellungen › Allgemein › Governance und Audit legt es offen, zusammen mit fünf weiteren Opt-in-Steuerelementen, die zuvor nur über `.env` erreichbar waren oder gespeichert, aber nicht zurückgelesen werden konnten. `GET /api/config` meldet sie in einem `governance_audit`-Block. Das Löschen der Deadline hinterlässt keine App mehr, die nicht starten kann: Ein leerer Wert wird jetzt als keine Deadline interpretiert.

## Ollama-Modelle lesen den gesamten Prompt

Aufrufe an `ollama_chat/`- oder `ollama/`-Modelle haben nie ein Kontextfenster benannt, also lieferte Ollama seinen Maschinen-Standard – 4.096 Tokens in dem Fall, der dies ans Licht brachte. Jeder längere Prompt wurde stillschweigend auf etwa die Hälfte dieser Größe gekürzt. Die erste Anfrage eines `chimera solve`-Laufs, rund 20.500 Zeichen, wurde als 2.050 Tokens gelesen, und das Modell bekam die Aufgabe nie zu sehen.

Jeder Gateway-Pfad sendet jetzt `num_ctx` nur an Ollama-Routen, bezogen aus `CHIMERA_OLLAMA_NUM_CTX` (Standard 32.768; auf `0` setzen, um den Server-Standard beizubehalten). Das Kompaktierungsbudget eines Ollama-Modells wird anhand dieses Fensters bemessen, statt des 128.000-Token-Fallbacks. Eine Antwort, deren Prompt-Anzahl eine Kürzung zeigt, loggt eine `PROMPT TRUNCATED`-Warnung, anstatt stillschweigend durchzulaufen. Gehostete Provider bleiben unverändert.

## Was jetzt zu tun ist

Upgraden Sie mit `pip install chimera-agent==0.65.0`. Wenn Sie die Desktop-App nutzen, starten Sie sie neu und prüfen Sie die Messaging-Karte auf Bots, die ein Pairing benötigen. Wenn Sie `CHIMERA_SANDBOX=docker` verwenden, vergewissern Sie sich, dass der Daemon läuft, oder wechseln Sie zu `local`. Wenn Sie Ollama-Modelle aufrufen, setzen Sie `CHIMERA_OLLAMA_NUM_CTX` passend zum Fenster Ihres Modells. Die vollständigen Release Notes finden Sie unter [Chimera Agent v0.65.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.65.0).
