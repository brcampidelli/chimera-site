---
title: "Chimera Agent 0.68.0: Policy, Skills und ein kaputter Desktop-Build"
date: 2026-10-17
category: update
summary: "0.68.0 fügt Owner-Level-Deny-Policy, lokale Skill-Erkennung, Projekt-Prompt-Befehle und vieles mehr hinzu – aber installieren Sie die Desktop-App nicht; verwenden Sie v0.67.4 bis 0.68.1."
version: "0.68.0"
---

Die Schlagzeile für 0.68.0 ist kein Feature. Es ist eine Warnung: **Installieren Sie diese Version nicht.** Das Backend der Desktop-App startet nicht, weil der PyInstaller-Freeze `chimera.cli.commands.apilogs` ausgelassen hat, das die CLI namentlich importiert. Das PyPI-Paket ist nicht betroffen. Wenn Sie die Desktop-App ausführen, bleiben Sie bei v0.67.4, bis v0.68.1 veröffentlicht ist. Der Rest dieses Beitrags behandelt, was sich tatsächlich für diejenigen geändert hat, die Agents bauen.

## Owner-Policy wechselt von Per-Tool-Blöcken zu Deny-Only-Regeln

Vor dieser Version bedeutete die Einschränkung dessen, was ein Agent anfassen konnte, die Kombination von Umgebungsvariablen wie `CHIMERA_TOOL_DENYLIST` mit projektspezifischen Regeln. Das funktionierte für einzelne Tools, gab aber dem Besitzer einer Installation keinen zentralen Ort, um zu sagen: „Dieser Provider läuft hier nie“ oder „Dieser MCP-Server verbindet sich nie.“

0.68.0 fügt `<CHIMERA_HOME>/policy.json` hinzu – oder die Datei, die `CHIMERA_POLICY_FILE` benennt. Die Regeln sind deny-only und geordnet. Sie können einen Provider, eine Integration (`mcp:<name>`, `skill:<name>`) oder ein Tool verweigern. Ein verweigerter Provider verschwindet aus den Modelllisten und der Tier-Leiter, und seine Aufrufe werden abgelehnt. Ein verweigerter MCP-Server verbindet sich nie. Ein verweigerter Skill wird nie geladen. Ein verweigertes Tool wird in der Registry abgelehnt.

Die goldene Regel ist wichtig: Ein späteres `allow` macht nur ein früheres `deny` in derselben Datei rückgängig. Es öffnet niemals `CHIMERA_TOOL_DENYLIST`, die Reichweitengrenze oder einen Kernel-Block wieder. Eine ungültige Policy-Datei stoppt `serve`, `chat`, `assist`, `tui` und `acp` und lässt `doctor` fehlschlagen. Die Desktop-App startet, verweigert aber jedes Tool, bis die Datei behoben ist. Die Schreibwerkzeuge des Agents können die Policy-Datei nicht schreiben.

Dies ist ein anderes Modell als projektspezifische Regeln. Es ist Owner-Level, installationsweit und kann nicht durch einen cleveren Prompt oder eine Projektdatei umgangen werden. Für jeden, der eine gemeinsam genutzte Maschine oder eine Flotte von Agents betreibt, ist das die Änderung, die zählt.

## Skills, Prompt-Befehle und begrenzte Fragen

Lokale Agent Skills werden jetzt als überprüfbare Bündel erkannt. Skills, die in den Verzeichnisbäumen `.claude/skills` und `.agents/skills` im Arbeitsbereich und im Benutzerverzeichnis gefunden werden, werden über den begrenzten Upload-Pfad importiert. Sie bleiben ausstehend und als „tainted“ markiert, bis sie genehmigt werden, und kehren in den ausstehenden Zustand zurück, wenn sich ihr Manifest ändert. Die API meldet die gewinnende Quelle und Kollisionen. Das bedeutet, dass ein Skill nicht stillschweigend vertraut wird, nur weil er in einem Ordner liegt.

Projekt- und globale Markdown-Prompt-Befehle funktionieren auf die gleiche Weise. Terminal-Chat und die TUI entdecken namensraumbezogene Vorlagen in `.chimera/commands/` und `<CHIMERA_HOME>/commands/`. Vorlagen expandieren `$ARGUMENTS` und `$1` in gewöhnlichen Nachrichtentext. Vorlageninhalt wird niemals ausgeführt. Dies gibt Projekten eine Möglichkeit, wiederholbare Prompts bereitzustellen, ohne der Vorlage irgendeine Ausführungsmacht zu gewähren.

Der Code-Agent kann den Benutzer jetzt eine begrenzte Frage stellen. `ask_user` pausiert eine betreute Code-Runde für eine Options- oder Freitextantwort, gibt bei Timeout ein explizites No-Response-Ergebnis zurück und bleibt eine eigenständige, rein datenbasierte Art, die keine regierte Aktion genehmigen kann. Terminal-, Bot- und unbeaufsichtigte Runden registrieren es nicht. Das schließt eine Lücke: Vorher hatte eine Code-Runde, die eine Entscheidung des Benutzers benötigte, keine strukturierte Möglichkeit, anzuhalten und zu fragen.

## Was jetzt zu tun ist

Wenn Sie die Desktop-App verwenden, aktualisieren Sie nicht. Bleiben Sie bei v0.67.4. Wenn Sie das PyPI-Paket verwenden, können Sie 0.68.0 installieren und mit der Policy-Datei beginnen: Erstellen Sie `<CHIMERA_HOME>/policy.json`, schreiben Sie Ihre Deny-Regeln und führen Sie `chimera policy show` aus, um die geltenden Regeln anzuzeigen. Vollständige Versionshinweise finden Sie unter [Chimera Agent v0.68.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.68.0).
