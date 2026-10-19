---
title: "Chimera 0.70.0: Undo, Design und Editor-Kontrolle"
date: 2026-10-19
category: update
summary: "Der Terminal-Chat bekommt Undo und Planung auf Desktop-Niveau, der Editor git-bewusste Diffs und Dateivorschauen, und Chimera Design erhält Export, Canvas und Agent-Tooling."
version: "0.70.0"
---

## Das Terminal ist kein Client zweiter Klasse mehr

Vor diesem Release arbeiteten `chimera chat` und `chimera assist` mit einem engeren Satz an Sicherheitsmechanismen als der Desktop. Der Kontext wuchs, bis er ein Limit erreichte, Pläne wurden vor der Ausführung nicht angezeigt, und einen Turn rückgängig zu machen bedeutete, einem einfacheren Wiederherstellungspfad zu vertrauen. Diese Lücke ist jetzt geschlossen.

Terminal-Sitzungen komprimieren den Kontext standardmäßig mit derselben Policy wie der Desktop. Wer das alte Verhalten will, schaltet es mit `--no-compact` ab. `/plan <task>` zeigt jetzt zuerst den Plan und führt die Aufgabe erst nach Freigabe aus. Einen Plan zu genehmigen, heißt nicht, riskante Aktionen vorab zu genehmigen. `/undo N` listet die Dateien auf, die in den letzten N Turns angefasst wurden, fragt nach Bestätigung und stellt über denselben dauerhaften Speicher wieder her, den auch der Code-Screen nutzt. Dateien, die du nach dem Ziel-Turn bearbeitet hast, bleiben unangetastet. Ein einfaches `/undo` macht weiterhin den letzten Turn rückgängig.

Der Desktop erhält außerdem eine Rewind-Timeline im Kopfbereich der Konversation. Jeder gespeicherte Punkt zeigt die Uhrzeit und wie viele Dateien er angefasst hat. Wählt man einen aus, sieht man genau, welche Dateien wiederhergestellt würden und welche übersprungen würden, weil du sie später bearbeitet hast. Die Wiederherstellung selbst lässt sich aus derselben Timeline erneut ausführen. Turns ohne gespeicherte Kopie erscheinen deaktiviert, mit Angabe des Grundes. Weder die Vorschau noch der Wiederherstellungsweg ist über die Desktop-Bridge zugänglich, sodass kein gekoppeltes Gerät oder externer Client eine Wiederherstellung auslösen kann.

## Der Editor zeigt jetzt, was git sieht

Der Dateibaum lieferte bisher nur eine Liste von Namen. Jetzt markiert er geänderte, hinzugefügte und nicht verfolgte Dateien mit einem Buchstaben und Ordner mit einem Punkt – derselbe Git-Status wie in der Changes-Karte. Der Status aktualisiert sich nach dem Speichern und wenn ein Agent-Turn endet. Strg+P öffnet eine Datei über den Namen. HTML-Dateien erhalten einen Preview-Umschalter in derselben Sandbox, die auch der Code-Screen nutzt, inklusive ungespeicherter Änderungen. Beim Schließen eines Tabs mit ungespeicherten Änderungen wird gefragt, ob weiter bearbeitet, ohne Speichern geschlossen oder gespeichert und geschlossen werden soll.

Auswahlbasierte Aktionen verändern, wie du Code-Hilfe anforderst. Markiere Zeilen und drücke Strg/⌘+L, um sie als Kontextelement an die Code-Konversation zu senden – derselbe Weg wie bei einer `@`-Erwähnung. Strg/⌘+I fügt `propose_change` hinzu, das der Server read-only mit einer Datei und einem Zeilenbereich ausführt. Der Vorschlag kommt als Inline-Diff mit Annehmen und Ablehnen zurück. Annehmen speichert über den Editor. Wenn sich die Zeilen ändern, bevor du antwortest, verschwindet der Vorschlag. Eine Datei, die sich auf der Platte ändert, während sie geöffnet ist, wird mit ihrem Diff festgehalten und bleibt read-only, bis du Behalten oder Rückgängig wählst.

Der Code-Composer unterstützt jetzt `@`-Erwähnungen für Dateien, Ordner, Designs und kürzliche Konversationen. Eine Datei mit bis zu 8.000 Zeichen wird inline angehängt, bereinigt, als Daten eingezäunt und im Ledger als Lesezugriff protokolliert. Größere Dateien und Ordner werden über den Pfad angegeben, damit der Agent sie lesen kann. Absolute Pfade und `..` werden abgelehnt, bevor der Turn läuft. Symlinks aus dem Projekt heraus und Chimeras eigene `.env` werden bei der Auflösung abgelehnt. Gäste auf Share-Links können keine Designs oder Konversationen erwähnen.

## Chimera Design erhält Export, Canvas und ein Tool

Chimera Design exportiert jetzt nach PDF, PNG und PPTX. PDF ist die statische Seite, gedruckt von Playwrights Chromium, eine Seite pro Artboard, mit deaktiviertem JavaScript und abgebrochenen Nicht-`data:`-Requests. PNG erzeugt ein Bild pro Artboard oder ein Zip. PPTX platziert jedes Element an seinem Rahmen auf einer Folie pro Artboard. Wenn Chromium oder python-pptx fehlt, verweigert der Export den Dienst und sagt dir, was zu installieren ist. Es wird nichts automatisch heruntergeladen.

Der Canvas öffnet sich im mittleren Slot des Code-Screens, mit der Konversation links und dem Canvas rechts. Er speichert automatisch über die Operations-Route mit sichtbarem Zustand. Manuelle und Agent-Bearbeitungen teilen sich eine Undo-Historie. Ein Turn, der ein Design anfordert, zeigt eine Aktion „In Chimera Design öffnen“. Neben dem Canvas kannst du aus einem Briefing vorschlagen, eine Auswahl verfeinern, auditieren, Tokens bearbeiten, das Design dagegen prüfen, pro Element kommentieren, Versionen wiederherstellen und nach HTML exportieren. Wiederherstellen und Export fragen zuerst nach.

Das `design`-Tool wird nur angeboten, wenn ein Turn ein visuelles Design verlangt. Ein deterministischer Detektor deckt Portugiesisch, Englisch und Spanisch ab, mit Akzent-Faltung und Ganzwort-Abgleich. Code-Kontexte wie „Design Pattern“ oder „System Design“ lösen es nie aus. Das Tool befolgt die Posture, sendet niemals HTML an einen Bot, markiert seine Ausgabe als nicht vertrauenswürdig und bleibt Gast-Turns fern. `CHIMERA_TOOL_DENYLIST=design` entfernt es.

## Was jetzt zu tun ist

Aktualisiere auf 0.70.0 und öffne eine Terminal-Sitzung: Führe `/plan` vor einer riskanten Aufgabe aus, danach `/undo N`. Im Editor markiere einen Block und drücke Strg/⌘+I, um einen Änderungsvorschlag als Diff zu sehen. Für Design-Arbeit öffne den Canvas aus einem Turn, der ein visuelles Design anfordert, und exportiere von dort. Vollständige Release Notes: [Chimera Agent v0.70.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.70.0).
