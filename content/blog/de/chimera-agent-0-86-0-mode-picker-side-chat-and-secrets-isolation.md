---
title: "Chimera Agent 0.86.0: Mode Picker, Side Chat und Secrets-Isolation"
date: 2026-11-11
category: update
summary: "Ein neuer Mode Picker ersetzt das Haltungs-Chaos, Side Chat beantwortet Fragen, ohne den Verlauf zu verschmutzen, die Shell des Agenten sieht eure API-Keys nicht mehr und Konversationen werden beim PR-Merge automatisch archiviert."
version: "0.86.0"
---

Dieses Release behebt ein strukturelles Problem, das die Haltung des Agenten unzuverlässig machte. Vor 0.86.0 legte man in den Einstellungen eine Haltung fest – Manual, Auto oder irgendwas dazwischen – und dann hatten Bridge, API und UI jeweils ihre eigene Art, das zu überschreiben. Man konnte mit einer Konversation enden, die in Auto lief, während man dachte, sie sei Manual, weil die Bridge sie stillschweigend umgestellt hatte. Der Mode Picker ersetzt das durch eine einzige Kontrollinstanz.

## Ein Mode Picker statt drei Mechanismen

Der Picker sitzt unter dem Prompt und öffnet sich mit Ctrl/Cmd+Shift+M. Er listet sechs Modi: Manual, Accept edits, Plan, Auto, Don't ask und Ignore permissions, wenn das Projekt es erlaubt. Jeder Modus bildet sich direkt auf das bestehende Haltungssystem ab. Der Modus der Konversation wird gespeichert und startet mit dem, was die Einstellungen vorgeben – wird niemals zu Don't ask, suspicious wird zu Auto, always zu Manual. Accept edits zeigt vor jedem Befehl eine Karte, es sei denn, der Befehl liest nur oder die Sandbox isoliert ihn. Plan läuft niemals weiter als Auto. Die Bridge darf eine Konversation nur in einen Modus verschieben, der nichts erweitert, sodass eine auf Manual gesperrte Konversation dort bleibt. Ctrl/Cmd+Shift+O öffnet den Model Picker und Ctrl/Cmd+Shift+E den Effort Picker; Maximize liegt jetzt auf Ctrl/Cmd+Shift+Enter.

Das ist wichtig, weil die Haltung die primäre Sicherheitsgrenze zwischen euch und dem Agenten war und sie zwei Hintertüren hatte. Jetzt gibt es eine Kontrolle, die alles respektiert.

## Die Shell des Agenten erbt eure Secrets nicht mehr

Kindprozesse des Agenten erbten früher Provider-Key-Pools wie `CHIMERA_OPENROUTER_KEYS`, `DATABASE_URL` mit Passwort und Cloud-Credentials. Jeder Befehl, den der Agent ausführte, konnte sie ausgeben. Die Desktop-App hatte dasselbe Problem in die andere Richtung: Sie übergab dem Backend ihren Server-Token, Screen-Credential und Launcher-Key per Umgebungsvariablen, die unter Linux in `/proc/<pid>/environ` für jeden Prozess desselben Nutzers lesbar bleiben – die Shell des Agenten eingeschlossen.

Beide Pfade sind geschlossen. Die Shell des Agenten und das neue Terminal erhalten jetzt eine Umgebung, aus der Secrets nach Name und Wert entfernt wurden. Proxy-Einstellungen werden weiterhin durchgereicht. Die GitHub CLI behält den Token, den sie braucht. Die Desktop-App sendet ihre Secrets jetzt als eine einzelne Zeile auf stdin an das Backend, die sofort gelesen und geschlossen wird; der Server-Token wird im Speicher gehalten statt in der Prozessumgebung. Eine fehlende oder fehlerhafte Zeile stoppt das Backend, anstatt es ohne Token zu starten, und die App weigert sich, ein Backend zu nutzen, das ohne Token antwortet.

## Side Chat und Suggested-Task-Karten

Side Chat (Ctrl/Cmd+;) beantwortet eine kurze Frage zur Konversation, ohne sie zu erweitern. Er liest die Konversation als Daten, antwortet ohne Werkzeuge und schreibt nichts in den Konversationsverlauf. Vorher bedeutete eine Frage, den Kontext mit einem Turn zu verschmutzen, auf den der Agent später versuchen würde zu reagieren. „Bring into the conversation“ füllt nur den Composer, und wenn die Konversation externe Inhalte gelesen hat, zitiert Side Chat die Antwort als Daten und fragt vorher nach. Seine Kosten werden erfasst, lokale Modelle bleiben unter einem täglichen Limit kostenlos, und die Shortcut-Hilfe liegt jetzt auf Ctrl/Cmd+/.

Suggested-Task-Karten verhindern, dass der Agent abdrifet. Wenn er etwas außerhalb der Aufgabe bemerkt – toten Code, ein veraltetes Doc, einen fehlenden Test, ein beiläufig gesehenes Sicherheitsproblem –, kann er nur eine Karte vorschlagen. Ihr seht den vollständigen Prompt, bevor irgendetwas läuft, und wählt Start (eine neue Konversation im selben Projekt), Do it here, Options oder Dismiss. Start all fragt nach Bestätigung und ist auf fünf begrenzt. Nur der Bildschirm des Owners startet eine Karte, und eine Karte, die von einem Turn mit extern gelesenen Inhalten vorgeschlagen wurde, startet ihre Konversation als tainted und ohne „Ignore permissions“, mit einer Warnung auf der Karte.

## Was jetzt zu tun ist

Update mit `pip install chimera-agent --upgrade` oder zieht das neueste Container-Image. Der Mode Picker, Side Chat und das Terminal sind sofort verfügbar. Wenn ihr euch auf die alten Haltungs-Overrides verlassen habt, prüft nach dem Upgrade den Modus jeder Konversation – der Picker liest eure Einstellungs-Defaults, aber bestehende Konversationen könnten vor 0.86.0 von der Bridge verschoben worden sein. Die Secrets-Isolation erfolgt automatisch; keine Konfigurationsänderung nötig. Vollständige Release Notes: [Chimera Agent v0.86.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.86.0)
