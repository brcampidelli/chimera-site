---
title: "Chimera 0.72.0: Dein Chrome, nach deinen Regeln"
date: 2026-10-22
category: update
summary: "Chimera 0.72.0 bringt ein seitenbasiertes Vertrauensmodell für den Browser, optionale Google-Suche und einen Pairing-Flow, der den Chrome-Schlüssel aus der Shell des Agenten fernhält."
version: "0.72.0"
---

## Was sich für deine Agenten ändert

Bisher bedeutete der Zugriff auf dein Chrome durch Chimera eine binäre Entscheidung: Entweder der Agent konnte im Browser agieren, oder er konnte es nicht. Es gab keine Möglichkeit zu sagen: „Ja, auf dieser Seite, bei allen anderen frag nach“, und keine, ihn Google durchsuchen zu lassen, ohne ihm gleichzeitig die Tür zu allem anderen zu öffnen, was ein Browser kann. Die Extension selbst hatte in einer vorherigen Version zudem ihr Popup verloren, sodass man einen Lauf weder stoppen noch eine seitenbezogene Berechtigung direkt aus dem Browser heraus erteilen konnte.

Version 0.72.0 ersetzt dieses Binär-Modell durch ein seitenbasiertes Vertrauensmodell. Du legst die Seiten fest, auf denen Chimera ohne Nachfrage klicken und tippen darf; überall sonst zeigt dir jede Aktion zuerst eine Karte an. Diese Unterscheidung ist entscheidend, weil sie der realen Arbeitsweise entspricht: Du vertraust einem Agenten vielleicht, ein Formular auf deinem internen Dashboard auszufüllen, aber nicht, deinen Zahlungsdienstleister anzufassen. Das Release hält diese Grenze explizit aufrecht. Kaufen, Bezahlen, Senden, Löschen, Veröffentlichen und das Abschicken von Formularen erfordern selbst auf vertrauenswürdigen Seiten weiterhin eine Nachfrage. Passwörter, Kartennummern, Verifizierungscodes, Zahlungs-Frames, Downloads und Uploads werden grundsätzlich verweigert. Bei einem CAPTCHA stoppt der Agent und übergibt dir den Tab.

Die Extension prüft zudem unmittelbar vor einer Aktion erneut, ob das von ihr ausgewählte Element noch dasselbe ist, das sie gleich anklicken wird, und dass nichts es verdeckt. Diese zweite Prüfung schließt eine Lücke, bei der sich eine Seite zwischen der Entscheidung des Agenten und der eigentlichen Aktion verändern konnte.

## Google-Suche wird zur Option

Die Google-Suche in deinem eigenen Chrome ist jetzt standardmäßig deaktiviert, bis du sie einschaltest. Mit `CHIMERA_BROWSER_GOOGLE=ask` können Desktop-Turns Google in einem sichtbaren Tab deines gekoppelten Chrome durchsuchen, und jede Suche zeigt dir zuerst eine Karte an – selbst wenn die Genehmigungen auf „Erlauben“ gesetzt sind. Das Tempo ist bewusst menschlich: eine Suche pro 20 Sekunden, fünf pro Turn, 30 pro Tag. Die Ergebnisse kommen als Titel, Links und Snippets zurück, markiert als abgerufener Inhalt.

Was das Release ausschließt, ist genauso wichtig wie das, was es enthält. Bots, geplante Jobs und die MCP-Bridge erhalten niemals Zugriff auf die Google-Suche. Beim ersten CAPTCHA oder einer Seite mit ungewöhnlichem Datenverkehr stoppt es und übergibt dir den Tab, und es versucht es 30 Minuten lang nicht erneut. Es geht nicht um Tarnung. Die Funktion ist für eine Person gedacht, die ihrem eigenen Browser zusieht, nicht für unbeaufsichtigte Automatisierung.

## Pairing gibt den Schlüssel nicht mehr preis

Das Koppeln von Chrome erfolgt jetzt über einen sechsstelligen Code von deinem Bildschirm. Einstellungen → Browser zeigt einen einmaligen Code an, zwei Minuten gültig mit fünf Versuchen, den du im Popup der Extension eingibst. Der Schlüssel wandert dann in den Tresor des Betriebssystems, niemals in die Umgebung der Befehle, die Chimera ausführt. Das ist die wichtigste Korrektur für alle, die Agenten lokal betreiben: Allein das Server-Token, das jeder lokale Prozess lesen kann, bringt dich nicht mehr in dein Chrome. Das Ändern der Liste vertrauenswürdiger Seiten, Stoppen und Entkoppeln erfordern alle den eigenen Bildschirm der App.

Die Release Notes benennen die verbleibende Einschränkung klar: Ein Schadprogramm, das bereits als dein Windows-Benutzer läuft, kann den Schlüssel weiterhin entwenden. Die Doku sagt das. Aber der Schlüssel liegt nicht mehr in der Shell-Umgebung, wo ein verirrter Befehl oder ein schlecht geschriebener Agent ihn auslesen könnte.

Zum Start öffne Einstellungen → Browser in der App. Dort siehst du, ob die Extension gekoppelt und verbunden ist, bekommst den einen Befehl, um sie zu registrieren, und kannst die Seiten auflisten, auf denen Chimera ohne Nachfrage agieren darf. Die vollständigen Release Notes sind unter [Chimera Agent v0.72.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.72.0).
