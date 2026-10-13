---
title: "Chimera Agent 0.66.0: Einstellungen, die man liest, und Rails, die sprechen"
date: 2026-10-13
category: update
summary: "Die Einstellungen werden zu einem navigierbaren Dokument, die Seitenleiste und der Composer verstecken ihre Steuerelemente nicht mehr, und Work, Memory und Profile hören auf, in Identifikatoren zu sprechen."
version: "0.66.0"
---

## Was sich für den Agenten-Entwickler geändert hat

Das Release strafft die Teile der App, die technisch vorhanden, aber praktisch unsichtbar waren. Die Einstellungen sind das deutlichste Beispiel. Sie bestanden aus einer einzigen scrollbaren Liste, in der das Erscheinungsbild unter Allgemein saß und Zeilen für Key-Pools, MCP, Sandbox und Diagnose sich den Platz mit Alltagspräferenzen teilten. Das machte den Bildschirm schwer überblickbar und noch schwerer verlinkbar. In 0.66.0 lesen sich die Einstellungen wie ein Dokument mit Inhaltsverzeichnis. Die Abschnitte sitzen bei einem breiten Fenster neben dem Inhalt, das Erscheinungsbild ist ein eigener Bereich, und die Zeilen, die die meisten nie ändern, sind unter Erweitert zusammengefasst. Nichts wurde entfernt; es wurde aus dem Weg geräumt.

Dieselbe Logik gilt für die Seitenleiste auf dem Desktop. Fünf Icons mit Namen nur beim Darüberfahren zwangen dazu, sich zu merken, was jedes Ziel war. Jetzt schreibt die Leiste den Namen unter jedes Icon. Der Composer des Code-Bildschirms folgt demselben Prinzip. Die Auswahlfelder für Ausführenden, Kostenprofil, Modell und Stil belegten zuvor vier Zeilen über dem Eingabefeld. Sie beginnen nun als eine Zeile mit Chips, und die ganze Zeile öffnet sie. Armed Fuse und Plan erscheinen zuerst als gedrückte Umrandungen, was Senden als einzigen gefüllten Button in der Zeile übrig lässt. Die Änderung ist klein, aber sie beseitigt die visuelle Konkurrenz zwischen Konfiguration und Aktion.

## Wo die App aufgehört hat, ihre eigene Sprache zu sprechen

Mehrere Bildschirme zeigten interne Bezeichner statt Bedeutung. Speicherarten erschienen auf jeder Zeile in Monospace als episodic und semantic. Zeitpläne wurden unabhängig von der App-Sprache auf Englisch beschrieben. Das Profil zeigte Quell-IDs wie chat und extracted sowie das tainted-Flag des Speichers für jede Sprachumgebung auf Englisch. Die Zeilen mit den erlernten Fähigkeiten taten dasselbe mit tainted und retire?, wobei die zweite das Rot eines Fehlers verwendete. Work › Git fragte zur Bestätigung das Bestätigungsfeld des Browsers ab, das die Dateien nicht nennen konnte und nicht wie die App aussah.

Jeder dieser Fälle war ein Ort, an dem die Oberfläche das Datenmodell statt der Entscheidung preisgab. Das Release übersetzt die Speicherarten, beschreibt Zeitpläne in der App-Sprache und sorgt dafür, dass das Profil in einem Satz sagt, woher eine Tatsache stammt. Unbestätigte Zähler und der Hinweis auf fehlende Betriebssystem-Sandbox wechseln von Rot zu Gelb, weil es sich um zu prüfende Zustände handelt, nicht um Fehler. Die Verwerfen-Rückfrage von Git sitzt nun unter dem Button, rot, mit Abbrechen zuerst, und jede Datei-Checkbox hat einen Namen. Unter Portugiesisch verzichten Verbindungen und Nutzung ebenfalls auf Jargon: Ferramentas externas (MCP), Ferramentas und APIs (OpenAPI) ersetzen die vorherigen Bezeichnungen.

## Was jetzt zu tun ist

Auf 0.66.0 aktualisieren und die Einstellungen öffnen. Der neue Abschnitt Erscheinungsbild ist der Ort, an dem die Akzentfarbe, die Oberflächentönung und die Hochkontrast-Option leben, und jede Kombination wird auf Kontrast geprüft. Dann Work › Runs öffnen und die Suche und den Ergebnis-Filter auf eine lange Historie anwenden; die früheren Versuche eines Runs klappen unter demjenigen zusammen, der entschieden hat. Wer Lesezeichen auf die App pflegt, sollte beachten, dass die Tabs Knowledge und Automation jetzt Adressen haben, sodass sie einen Reload überstehen und auf die Zurück-Taste reagieren. Die vollständige Liste steht in den Release Notes. [Chimera Agent v0.66.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.66.0)
