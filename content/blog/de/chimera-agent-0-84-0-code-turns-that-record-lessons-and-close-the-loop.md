---
title: "Chimera Agent 0.84.0: Code-Turns, die Lektionen aufzeichnen und den Kreislauf schließen"
date: 2026-11-05
category: update
summary: "Code-Screen-Turns können jetzt Lektionen aus ihrer eigenen Ausgabe aufzeichnen und, wenn aktiviert, committen, eine PR öffnen und CI bis zum Merge verfolgen – beide Features standardmäßig deaktiviert."
version: "0.84.0"
---

Der Code-Screen war schon immer eine enge Schleife: Du promptest, der Agent arbeitet, du verifizierst. Aber was nach der Verifikation passierte, war eine Sackgasse. Der Turn endete, und nichts, was der Agent währenddessen gelernt hatte, blieb für den nächsten erhalten. Zwei Änderungen in 0.84.0 durchbrechen dieses Muster, und beide kommen mit dem Schalter auf „Aus“.

## Lektionen aus abgeschlossenen Turns aufgezeichnet

Vor diesem Release hinterließ ein abgeschlossener Code-Turn keine Spur davon, was das Modell richtig oder falsch gemacht hatte. Das einzige Gedächtnis war die Konversation selbst. Das bedeutete, jeder neue Turn startete vom gleichen leeren Zustand, selbst wenn der Agent gerade gezeigt hatte, dass er eine bestimmte Art von Aufgabe korrekt bewältigen kann.

Der Code-Screen zeichnet jetzt nach jedem abgeschlossenen Turn eine kurze Lektion auf. Die Lektion landet in einem eigenen Speicher, `code_lessons.json`, und nur der Code-Screen liest sie – und auch nur, wenn Skill Cards aktiviert sind. Die Einstellung bleibt standardmäßig deaktiviert, weil sieben vorregistrierte Durchläufe keinen messbaren Gewinn durch die aufgezeichneten Lektionen fanden. Autonome Runs sehen sie überhaupt nicht.

Was aufgezeichnet wird, ist genauso wichtig wie der Ort. Eine Antwort, die du nie geprüft hast, wird als unverifiziert gespeichert, nicht als Erfolg. Hintergrundarbeit und verfälschte Ausgaben werden komplett aus dem Prompt herausgehalten. Der aufgezeichnete Text ist gedeckelt, damit der Lektionsspeicher nicht unbegrenzt wächst. Das Design geht davon aus: Eine Lektion, die du nicht explizit verifiziert hast, ist keine Lektion, die der Agent wiederholen soll.

Auch das Minting wird in diesem Release strikter. Jeder Minting-Pfad benennt jetzt seinen Trace, was einen Bug behebt, bei dem Karten abgelehnt wurden, weil das System keine Belege für ihre Herkunft finden konnte. Die Wiederholungserkennung verlangt jetzt zwei gemeinsame Inhaltswörter statt einem, und die Prüfung funktioniert auch auf Portugiesisch. Die Änderung reduziert False-Matches, ohne legitime Treffer zu blockieren.

## Den Kreislauf schließen: Commit, PR und CI

Die zweite Änderung hat eine größere Tragweite. Mit aktiviertem „Close the loop“ in den Einstellungen endet ein Code-Screen-Turn, der die Verifikation und seinen eigenen Diff-Check besteht, nicht dort. Er committet auf seinem Worktree-Branch, pusht, öffnet einen Pull Request und beobachtet den CI-Lauf im Hintergrund. Wenn CI rot zurückkommt, liest der Agent den Fehler und führt bis zu zwei Fix-Turns aus. Wenn CI grün zurückkommt, merged der Agent den Pull Request.

Das war vorher nicht möglich. Ein Turn, der funktionierenden Code produzierte, erforderte immer noch, dass du den Kontext wechselst, die Änderungen stagest, eine Commit-Message schreibst, pusht, die PR selbst öffnest und die Checks überwachst. Jetzt übernimmt der Agent diese Sequenz, aber nur, wenn du es explizit erlaubst.

Die Schutzmaßnahmen sind spezifisch und nicht verhandelbar. Ein Pull Request, der Billing, eine destruktive Migration, Row-Level-Security oder Grants berührt, wird niemals automatisch gemerged – der Agent öffnet ihn, aber du musst ihn selbst mergen. Ein Turn, der ein Secret committen würde, committet nichts. Nur der Owner-Screen kann das Feature einschalten oder starten. Die Bridge, Channels, Gäste und Hintergrundarbeit lösen es niemals aus. Der Main-Branch, ein detached HEAD und Force-Pushes werden alle abgelehnt. Das Design zieht eine harte Linie: Automatisierung endet dort, wo irreversibler Schaden möglich wird.

Das Feature ist standardmäßig deaktiviert. Du aktivierst es in den Einstellungen auf dem Owner-Screen, und es gilt nur für Code-Screen-Turns, die die Verifikation und den Diff-Check bestehen. Wenn du es nie einschaltest, ändert sich nichts daran, wie deine Turns enden.

Beide Features teilen dieselbe Philosophie: Zeichne auf, was du verifizierst, automatisiere, was du vertraust, und tu standardmäßig keines von beidem, bis du dich anders entscheidest.

Zum Starten: Update auf 0.84.0, öffne die Einstellungen auf dem Owner-Screen und entscheide, welche Kreisläufe der Agent schließen soll. Vollständige Notizen unter [Chimera Agent v0.84.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.84.0).
