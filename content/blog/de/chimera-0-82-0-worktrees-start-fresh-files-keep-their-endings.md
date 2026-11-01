---
title: "Chimera 0.82.0: Worktrees starten frisch, Dateien behalten ihre Zeilenenden"
date: 2026-11-01
category: update
summary: "Worktrees klonen jetzt vom Remote statt von einem veralteten lokalen Checkout, Dateischreibvorgänge bewahren Zeilenenden, und der Agent fragt nach, bevor er dort arbeitet, wo Befehle deaktiviert sind."
version: "0.82.0"
---

## Worktrees starten vom Remote, nicht von einem veralteten lokalen Checkout

Ein neuer Worktree zweigte bisher von dem ab, was zufällig lokal ausgecheckt war. War der lokale Klon Tage im Rückstand, startete der Agent von altem Code und wusste es nicht. Der erste Turn konnte Zeit mit bereits behobenen Problemen verschwenden oder Konflikte einführen, die erst später auftauchten.

Jetzt holt eine Worktree-Anfrage den Default-Branch des Remotes und erstellt den Worktree von diesem Commit. Die Ausgabe zeigt, von welchem Commit gestartet wurde. Kann der Fetch das Remote nicht erreichen, fällt der Agent auf den lokalen HEAD zurück und warnt dich. Der Fetch fragt niemals nach Zugangsdaten, sodass die Operation nicht hängt und auf Eingaben wartet, die nicht kommen können.

Das ist wichtig, weil ein Agent, der von veraltetem Code startet, Arbeit produziert, die isoliert korrekt aussieht, aber gegen den aktuellen Stand des Repositories scheitert. Die Änderung beseitigt eine stille Quelle der Abweichung zwischen dem, was der Agent sieht, und dem, was der Rest des Teams sieht.

## Dateien, die Chimera schreibt, behalten ihre Zeilenenden

Die Dateischreibvorgänge des Agenten liefen durch einen Textmodus, der auf Windows jedes Newline in CRLF umwandelte. Eine auf Windows erstellte Datei widersprach der LF-Konvention des Repositories, und ein Übersetzungs-Hash, der lokal bestand, scheiterte in der CI. Die Diskrepanz war schwer nachzuvollziehen, weil die Datei in einem Diff-Tool, das Zeilenenden normalisiert, identisch aussah.

Schreibvorgänge sind jetzt byte-genau. Eine neue Datei erhält LF. Eine bestehende CRLF-Datei behält CRLF. Übersetzungs-Hashes ignorieren Zeilenenden, sodass ein auf einer Plattform berechneter Hash mit dem auf einer anderen Plattform berechneten übereinstimmt. Die Korrektur beseitigt einen plattformspezifischen Fehler, der CI-Pipelines zerstörte und Entwickler zwang, Agentenausgaben zu debuggen, die sie nicht sehen konnten.

## Der Agent fragt nach, bevor er dort arbeitet, wo Befehle deaktiviert sind

Eine Coding-Anfrage in einem Ordner mit deaktivierten Befehlen führte früher eine Stunde lang Tools aus und meldete erst dann, dass nichts geprüft werden konnte. Der Agent editierte, testete nichts und lieferte eine ungeprüfte Antwort. Der Besitzer entdeckte das Problem erst im Nachhinein.

Jetzt stoppt der Agent, bevor ein Tool läuft, und fragt den Besitzer, ob er Befehle erlauben, ohne sie fortfahren oder abbrechen möchte. Nur der Bildschirm des Besitzers kann die Erlaubnis erteilen. Ein Turn ohne jemanden am Bildschirm wartet nie – er fährt ohne Befehle fort. Die Wahl wird pro Konversation gespeichert, und eine ungeprüfte Antwort vermerkt dies oben. Die Änderung verhindert verschwendete Arbeit und macht die Einschränkung sichtbar, bevor der Agent handelt.

## Weitere Korrekturen, die die tägliche Nutzung verändern

Ein fehlendes Verify-Tool markiert einen Turn nicht länger als fehlgeschlagen. Wenn die Prüfung nach einem Turn nicht ausgeführt werden kann, weil ihr Programm nicht installiert ist – `vitest` in einem frischen Worktree ohne `node_modules` –, wird der Turn als nicht verifiziert angezeigt, mit Grund und Lösung. Ein `setup`-Befehl in `.chimera/verify.toml` installiert, was fehlt. Eine Prüfung, deren Tests liefen und fehlschlugen, wird weiterhin als fehlgeschlagen angezeigt. Die Unterscheidung zeigt dir, ob die Ausgabe des Agenten Tests gebrochen hat oder der Test-Runner schlichtweg fehlte.

Eine fehlgeschlagene Memory-Extraktion bleibt nicht länger still. Wenn die Extraktion hinter einem Code-Turn nicht starten kann, protokolliert die App eine Warnung mit dem Fehlertyp – niemals die Konversation oder einen Schlüssel – und der Turn antwortet trotzdem. Zuvor hinterließ der Fehler keine Spur und du konntest nicht sagen, warum der Agent Kontext zu vergessen schien.

Die installierte App behält ihre Schlüssel, egal aus welchem Ordner sie geöffnet wird. Das Backend las früher die `.env` des Startordners und zeichnete diesen Ordner für den Hintergrunddienst auf. Eine von einem anderen Terminal aus geöffnete App startete ohne Provider-Schlüssel und jeder Turn schlug fehl. Die Startmenü-Verknüpfung verbarg das Problem. Ein paketierter Build führt sein Backend jetzt immer im Installationsordner aus.

Ein Zahlen-Tweak wird angewendet, wenn du mit der Eingabe fertig bist, nicht bei jedem Tastenanschlag. Die Eingabe von `34` in einen Tweak, der von 28 bis 56 läuft, sendete zuerst `3`, wurde abgelehnt und sprang zurück. Das Feld wendet den Wert jetzt einmal an, beim Verlassen des Feldes oder Drücken von Enter, begrenzt auf den Bereich, und Esc verwirft den Entwurf.

Die README nennt Chimera nicht länger selbst-evolvierend. Sieben vorregistrierte Lern-Durchläufe fanden keinen messbaren Gewinn, daher sagen die Überschrift, Paketbeschreibung, CLI-Hilfe, App und übersetzten READMEs jetzt, was die Evidenz stützt: ein gesteuerter Agent, der seine eigenen Nullergebnisse veröffentlicht. Die übersetzten READMEs versprechen auch keinen A/B-Test mehr, den die Lernschleife nicht ausführt.

Die Bridge paginiert und filtert die Konversationsliste. Das Auflisten von Konversationen über die Claude-Bridge gab alle 1.465 auf einmal zurück. Sie akzeptiert jetzt `limit`, `cursor`, `state`, `project` und `q`, standardmäßig 50 pro Seite auf der Bridge, und die unparametrisierte Liste des Bildschirms bleibt unverändert.

Upgrade mit `pip install --upgrade chimera-agent` und lies die vollständigen Notizen unter [Chimera Agent v0.82.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.82.0).
