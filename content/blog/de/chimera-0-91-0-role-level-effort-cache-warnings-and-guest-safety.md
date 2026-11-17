---
title: "Chimera 0.91.0: Reasoning-Effort pro Rolle, Cache-Warnungen und Sicherheit für Gäste"
date: 2026-11-17
category: update
summary: "Der Reasoning-Effort wird jetzt pro Rolle gesteuert, der Prompt-Cache warnt bei Leistungsabfall, Gäste sehen keine internen Tools mehr und Governance steht bei Neuinstallationen standardmäßig auf Observe."
version: "0.91.0"
---

## Reasoning-Effort zieht auf Rollen-Ebene um

Vor diesem Release hat man den Reasoning-Effort in einer Agent-Datei als pauschalen Wert gesetzt, der leicht falsch zu verstehen war. Das `effort`-Feld der Agent-Datei steuert jetzt nur noch die eigenen Calls dieses Subagenten. Die Code-Rollen und das Fusion-Cast beziehen ihren Effort aus einer neuen Umgebungsvariable, `CHIMERA_ROLE_EFFORTS`, die den Effort pro Rolle festlegt – nicht pro Agent. Die Agent-Datei eines Repositories kann den vom Owner gewählten Effort nicht erhöhen; ein gepullter Agent kann also nicht unbemerkt mehr Reasoning-Tokens verbraten als vorgesehen.

Das ist relevant, weil Effort ein Kostenhebel ist. Hoher Effort bei einer Summarisation-Rolle verbrennt Geld, niedriger Effort bei einer Planning-Rolle produziert brüchige Pläne. Die bisherige pauschale Einstellung hat einen Trade-off erzwungen, der nicht dazu passt, wie Rollen tatsächlich Reasoning verbrauchen. Jetzt setzt man den Effort dort, wo er wirkt, und das System blockiert Overrides, die ihn erhöhen würden.

## Der Prompt-Cache warnt, wenn er nicht mehr greift

Prompt-Caching spart nur dann Geld, wenn es tatsächlich trifft. Bisher konnte eine Konversation ohne jedes Signal in einen Bereich mit niedriger Cache-Trefferquote abrutschen. Die Kosten hat man später in einer Tabelle bemerkt. Wenn jetzt der Anteil der aus dem Cache gelesenen Prompt-Tokens über die Turns, deren Route Cache meldet, unter 80 % fällt, warnen der Turn-Beleg und die Statusleiste einmalig, inklusive Hauptursache. Die Warnung wird wieder scharf, sobald sich der Cache erholt hat und erneut abfällt. Routen, die nie Cache melden, erzeugen keine Warnung – man wird also nicht mit etwas genervt, bei dem nie Caching erwartet wurde.

Worth bekommt außerdem einen Kosten-pro-erfolgreichem-Run-Wert. Er zeigt die Gesamtkosten aller Runs geteilt durch die erfolgreichen, denselben Wert pro verifier-bestätigtem Run und den Anteil der Runs mit bekanntem Preis. Wenn einem Run ein Preis fehlt, zeigt Worth einen Gedankenstrich statt einer irreführenden Zahl. Die Tabelle bleibt nach Name sortiert, nicht nach Rang, denn Worth ist ein Diagnosewerkzeug, kein Leaderboard.

## Gäste sehen Antworten, nicht die internen Abläufe

Eine geteilte Konversation hat bisher die Tool-Argumente des Owners, Edit-Diffs, Approval-Previews, Browser-Screenshots, Verifier-Output, Instruction-Quellen, Kostenbelege und Host-Pfade durchsickern lassen. Ein Gast, der live zusieht, die Wiedergabe anschaut oder den Modell-Kontext inspiziert, konnte weit mehr rekonstruieren als die Antworten. Dieses Loch ist geschlossen. Gäste erhalten jetzt nur noch die Antworten sowie Tool-Namen und -Status – über eine Allowlist, die jeden nicht erkannten Frame-Typ verwirft. Die internen Abläufe des Owners bleiben auf dem Bildschirm des Owners.

## Governance steht bei neuen Daten-Ordnern standardmäßig auf Observe

Eine frische Installation startet jetzt mit Governance im `observe`-Modus, festgehalten in `governance_default.json`. Unter `observe` blockieren die festen Hard Blocks des Kernels Kommandos wie `rm -rf /`, `mkfs` oder in eine Shell gepiptes curl. Was `enforce` zur Überprüfung schicken würde, wird aufgezeichnet, nicht angefragt. Ein bestehender Daten-Ordner behält `off` und bekommt einen Hinweis im Log sowie eine ausblendbare Notiz in den Settings. Ein explizit gesetztes `CHIMERA_GOVERNANCE` gewinnt weiterhin, ein leeres zählt als nicht gesetzt. Das bedeutet, eine neue Installation ist vom ersten Lauf an abgesichert, ohne dass die Person, die sie aufsetzt, eine separate Sicherheitsseite lesen muss.

## Geplante Jobs bekommen eigenes Modell, Effort und Schritt-Budget

Ein Cron-Job kann jetzt über `cron add/edit --model --effort --max-steps` oder den Schedule-Screen sein eigenes Modell, Effort und Schritt-Budget benennen. Leere Werte erben wie bisher von `serve`. Ungültige Werte werden beim Speichern abgewiesen; eine manuell editierte `jobs.json` mit schlechten Werten lädt diese mit einer Warnung, statt den Job stillschweigend fallenzulassen. Die letzte zugestellte Antwort des Jobs, bis zu 2 KB, schließt seinen Kontext ab, sodass er sich nicht über Aufrufe hinweg wiederholt. Eine vom Ziel abgelehnte Zustellung zählt auf die Fehler-Bremse und wird niemals als zugestellt behandelt. Webhook-Jobs, die diese Felder benennen, werden abgewiesen, weil ein Webhook seine eigene Konfiguration mitbringt.

## Was jetzt zu tun ist

Upgraden mit `pip install chimera-agent --upgrade` und den Server neu starten. Wer Reasoning-Effort in Agent-Dateien gesetzt hat, verschiebt diese Werte nach `CHIMERA_ROLE_EFFORTS` und setzt das `effort`-Feld der Agent-Datei nur noch für Subagent-Calls. Geteilte Konversationen prüfen: Gäste sehen keine internen Frames mehr, und man muss nichts ändern, um diesen Schutz zu bekommen. Neue Installationen bekommen standardmäßig `observe`-Governance; bestehende Ordner bleiben, wie sie sind, es sei denn, man setzt `CHIMERA_GOVERNANCE` explizit. Vollständige Notes unter [Chimera Agent v0.91.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.91.0).
