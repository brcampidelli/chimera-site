---
title: "Chimera Agent 0.81.0: Atomare Sessions, benannte Endpunkte und Artboard-Fixes"
date: 2026-10-31
category: update
summary: "Session-Schreibvorgänge sind jetzt atomar, HTML-Artboards bringen eigene Schriften und Bilder mit, und Modelle lassen sich über benannte OpenAI-kompatible Endpunkte routen."
version: "0.81.0"
---

## Sessions sind bei parallelen Turns nicht mehr korrupt

Das erneute Öffnen einer Code-Konversation hat deren Session-Datei bisher in-place überschrieben. Der Schreibvorgang basierte auf einem Lesevorgang vor einer Wartezeit von bis zu zehn Sekunden. In diesem Zeitfenster sah ein anderer Leser oder ein Absturz eine halbe Datei. In der Lücke gespeicherte Turns gingen verloren. Bei vielen parallelen Turns hat das mehrere Sessions und deren Backups beschädigt.

Der Fix macht Session-Schreibvorgänge atomar, schreibt sie sicher auf die Platte und verriegelt sie prozessübergreifend. Der Wiedereröffnungsschritt merged jetzt nur noch die Felder, die er tatsächlich gelernt hat. Du verlierst keine Turns mehr durch eine Race-Condition zwischen einem Lese- und einem verzögerten Schreibvorgang. Wenn du mehrere Agenten auf dieselbe Session ansetzt oder neu startest, während ein Turn läuft, bleibt die Datei intakt.

## HTML-Artboards bekommen eigene Assets und Inspektor

Vor diesem Release hat ein HTML-Artboard Schriften aus einer Liste auf Token-Ebene bezogen, die als ein einziger Name in Anführungszeichen geschrieben wurde. Bildschirme fielen auf der Zeichenfläche und in Exporten auf eine Serifenschrift zurück. Der Inspektor zeigte immer das erste Artboard, sodass ein zweiter HTML-Bildschirm seine Anpassungen nicht erreichen oder seine Elemente auswählen konnte.

Jedes Design führt jetzt seinen eigenen Speicher für Bilder und Schriften. Du fügst PNG-, JPEG-, WebP- oder GIF-Bilder sowie WOFF2-, WOFF- oder TTF-Schriften über den Assistenten hinzu. Der Assistent weiß, welche Assets existieren. Bildschirme und Exporte verwenden sie. SVG und getarnte Dateien werden abgelehnt. Auf der Zeichenfläche kommen Assets als Inline-Daten an, sodass der Sandbox-Bildschirm weiterhin kein Netzwerk erreicht.

Ein Klick auf ein Artboard oder sein Label macht es zum aktiven. Der Inspektor folgt. Ein zweiter HTML-Bildschirm bekommt seine eigene Elementauswahl und Stilanpassungen. Die Schriften des Design-Systems rendern auf der Zeichenfläche und in Exporten.

## Benannte Endpunkte ersetzen die globale Basis-URL

Das Routen von Modellen zu einem OpenAI-kompatiblen Anbieter bedeutete bisher, `CHIMERA_API_BASE` global zu setzen. Jedes Modell lief über diese eine Basis. Man konnte Anbieter nicht in einer Konfiguration mischen, ohne sie selbst zu proxen.

`CHIMERA_ENDPOINTS` listet Endpunkte nach Namen auf. Jeder Eintrag deklariert eine Basis-URL und die Variable, die ihren Schlüssel enthält. Ein Modell, geschrieben als `endpoint/<name>/<model>`, geht mit eigener Basis und eigenem Schlüssel an diesen Endpunkt, parallel zu OpenRouter. Die Datenschutzkarte, Belege und das Usage-Panel nennen den Endpunkt und seinen Host. `/api/endpoints` listet und testet sie.

Das ist Teil der Multi-Provider-Routing-Arbeit. Du behältst separate Schlüssel für separate Anbieter, und der Agent routet jedes Modell ohne vorgeschalteten Proxy an die korrekte Basis.

## Konnektoren, die du in einer Nachricht nennst, verbinden sich für diesen Turn

Bei ausgeschaltetem MCP-Autoload verbindet ein Code-Turn, dessen Nachricht einen konfigurierten, aktivierten Konnektor nennt, genau diesen einen. Der Turn sagt das und behält den Konnektor für spätere Turns, die ihn nennen. Text aus Werkzeugen, Seiten oder Dateien schaltet niemals einen Konnektor ein. Bots führen ihre eigene Liste.

Das verhindert, dass eine Erwähnung in einem abgerufenen Dokument stillschweigend einen Konnektor aktiviert, den du nicht verwenden wolltest. Du steuerst die Verbindung durch das, was du in der Nachricht tippst.

## Kleinere Fixes, die Reibung entfernen

Eine Nachricht, die Chimera Design nennt, während sie nach einem Codepfad, einem pytest-Befehl oder Wörtern wie fix, implement oder test fragt, öffnet nicht mehr die Zeichenfläche. Das System liest Engineering-Arbeit nicht mehr als Design-Anfrage.

Die Detailkarte eines URL-Konnektors behauptet nicht mehr, dass Testen einen Befehl startet oder dass npx ein Paket herunterladen könnte. Ein Server auf Loopback trägt nicht mehr den Chip "erreicht das Netzwerk". Was die Karte beschreibt, entspricht jetzt dem, was der Konnektor tatsächlich tut.

## Installation

Installation oder Upgrade mit pip:

```
pip install chimera-agent --upgrade
```

Das vollständige Changelog findest du unter [Chimera Agent v0.81.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.81.0).
