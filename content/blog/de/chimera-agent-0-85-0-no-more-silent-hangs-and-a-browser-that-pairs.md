---
title: "Chimera Agent 0.85.0: Schluss mit stummen Hängern und ein Browser, der sich koppeln lässt"
date: 2026-11-08
category: update
summary: "Behebt einen Run-Hänger durch vererbte Pipes, führt Browser-Kopplung mit Einmal-Code ein, lokale Sprachausgabe für Chat-Bots und benannte OpenAI-kompatible Endpunkte."
version: "0.85.0"
---

## Der endlose Lauf

Ein Run, dessen Kindprozess seine Ausgabe-Pipe offen hielt, hat den Agenten bisher unbegrenzt blockiert. Der Reader wartete ohne Limit darauf, dass die Pipe geschlossen wird. Ein Enkelprozess, der die Pipe geerbt hat – ein Test-Runner-Worker, ein Hintergrundserver – hielt den Run, seinen Cancel-Button und die Testsuite endlos in der Warteschleife. Der Cancel-Button tat nichts, weil der Prozessbaum weiterlebte, und die Testsuite fror stumm ein, anstatt den Deadlock zu melden.

Das ändert sich in 0.85.0. Der Output-Reader läuft jetzt in einem eigenen Thread mit einer fünsekündigen Schonfrist, nachdem der Kindprozess beendet ist. Wenn du einen Run abbrichst, killt Chimera die gesamte Prozessgruppe auf POSIX und den Prozessbaum auf Windows. Die Testsuite versteckt sich auch nicht mehr hinter einer eingefrorenen Wand: Wenn ein einzelner Test länger als fünfzehn Minuten läuft, gibt die Suite die Stack-Traces aller Threads aus, anstatt sich wortlos aufzuhängen. Du bekommst eine Diagnose statt eines leeren Terminals.

Der Fix ist dann am wichtigsten, wenn du Tools verkettest, die eigene Subprozesse spawnen – Test-Frameworks, Build-Skripte oder jeden Befehl, der einen Server im Hintergrund forkt. Vorher waren solche Runs nicht wiederherstellbar. Jetzt heißt Abbrechen wirklich Abbrechen.

## Browser-Tab koppeln, ohne einen Port zu öffnen

Bisher bedeutete der Zugriff eines Browser-Tabs auf den Bildschirm des Besitzers, die Bridge oder einen Chat-Kanal zu exponieren. Beide Wege brachten mehr Angriffsfläche mit als nötig. Version 0.85.0 führt einen Kopplungs-Flow ein, der sie komplett umgeht.

Die Desktop-App zeigt einen achtstelligen Code an, gültig für fünf Minuten und fünf Versuche. Du tippst ihn im Browser-Tab ein. Dieser Tab erhält ein HttpOnly-, Same-Site-Cookie, das bis zu zwölf Stunden gültig und jederzeit vom Desktop aus widerrufbar ist. Nur der Desktop stellt Codes aus – die Bridge und die Chat-Kanäle können das nicht. Ein gekoppelter Tab kann die Bridge nicht einschalten, keine vollständige Kontrolle aktivieren und nicht "Ignore permissions" umschalten. Jede zustandsändernde Anfrage von ihm muss vom selben Origin stammen.

Das gibt dir ein zeitlich begrenztes, widerrufbares, niedrig privilegiertes Fenster auf den Bildschirm des Besitzers. Du koppelst einen Tab, wenn du ihn brauchst, widerrufst ihn, wenn nicht, und die Bridge bleibt die ganze Zeit aus.

## Sprachnachrichten landen lokal, und Endpunkte bekommen Namen

Discord- und Telegram-Bots können jetzt Sprachnachrichten hören und hörbar antworten, und beides passiert auf deiner Maschine. Sprachnotizen werden lokal mit faster-whisper unter Verwendung einer gepinnten Modell-Revision transkribiert. Die Dauer wird vor der Dekodierung geprüft, und ein Rate-Limit pro Benutzer verhindert Missbrauch. Gesprochene Antworten sind standardmäßig deaktiviert. Um sie einzuschalten, verweist du `CHIMERA_CHAT_VOICE_MODEL` auf eine Piper-Voice-`.onnx`-Datei, die du selbst ausgewählt hast. Chimera liefert kein Voice-Modell mit, und `piper-tts` (GPL-3.0) lebt in einem separaten `voice`-Extra, außerhalb von `[full]`. Du entscheidest dich für Voice, und du stellst die Voice bereit.

OpenAI-kompatible Endpunkte erhalten ebenfalls eine erstklassige Behandlung. Einstellungen › Verbindungen listet jetzt deine Endpunkte auf – einen lokalen vLLM, LM Studio oder llama.cpp-Server oder einen gehosteten – und lässt dich diese hinzufügen, testen und entfernen. Der Test macht einen einzelnen, begrenzten `GET /models`-Aufruf nur an diesen Endpunkt. Nur der Besitzer-Bildschirm kann Endpunkte ändern oder testen, der Schlüssel wird nie angezeigt, und der Schlüssel eines Endpunkts muss seine eigene `*_API_KEY`-Variable sein, niemals die Zugangsdaten eines anderen Anbieters oder eine `CHIMERA_`-Einstellung. Das schließt die langjährige Anfrage in #1133.

## Was jetzt zu tun ist

Upgrade mit `pip install chimera-agent --upgrade`. Lies die vollständigen Notes unter [Chimera Agent v0.85.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.85.0). Wenn du Chat-Bots nutzt und Voice willst, installiere das `voice`-Extra und setze `CHIMERA_CHAT_VOICE_MODEL` auf dein Piper-Modell. Um einen Browser-Tab zu koppeln, öffne die Desktop-App und suche nach dem Kopplungs-Code in den Besitzer-Bildschirm-Steuerelementen.
