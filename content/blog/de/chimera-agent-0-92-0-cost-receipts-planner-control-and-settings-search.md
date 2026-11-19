---
title: "Chimera Agent 0.92.0: Kostenbelege, Planner-Steuerung und Einstellungssuche"
date: 2026-11-19
category: update
summary: "Runs außerhalb von serve zeigen jetzt präzise Kosten pro Modell, der Planner lässt sich pro Lane oder API-Call deaktivieren, und die Desktop-Einstellungssuche findet die Routing-Tabelle."
version: "0.92.0"
---

## Was du zahlst, ist was du siehst

Die Kostenerfassung für Runs außerhalb von `serve` war geraten. Das System nutzte einen generischen Fallback, der das tatsächlich aufgerufene Modell ignorierte. Wenn du einen strikten Admission-Check gegen einen bestimmten Modell-Slug ausgeführt hast, zeigte der Beleg trotzdem den breiten Katalogpreis. Die Zahlen waren grob richtig, aber im Detail falsch – und das machte Kostenaudits unzuverlässig.

Version 0.92.0 behebt das, indem die Preise aus dem öffentlichen Preisindex von OpenRouter gezogen werden. Exakte Modell-Slugs lösen jetzt zu ihren eigenen Preisen auf, statt einen Familiendurchschnitt zu erben. Strikte Calls behalten das bei der Admission eingeholte Angebot bei, sodass der Beleg zu der Entscheidung passt, die das System bereits getroffen hat. Der Katalogeintrag `gpt-oss-20b` wurde ebenfalls aktualisiert, um die aktuelle Preisgestaltung abzubilden. Wenn du Kosten pro Run verfolgst oder nachgelagerte Verbraucher abrechnest, sind die Zahlen, die du siehst, jetzt die Zahlen, die tatsächlich verwendet wurden.

## Planner-Steuerung dort, wo du sie brauchst

Vor diesem Release lief der Planner bei jeder Interaktion. Es gab keine Möglichkeit, ihn für eine bestimmte Kanban-Lane, einen API-Run oder einen Workflow-Solve-Step abzuschalten. Das zwang Planungs-Overhead auf Aufgaben, die nicht davon profitierten – einfache Transformationen, deterministische Pipelines oder Schritte, bei denen du die nächste Aktion bereits kanntest.

Du kannst jetzt `use_planner` auf einzelnen Lanes, API-Runs und Solve-Steps setzen. Der Planner bleibt standardmäßig aktiv, damit bestehende Workflows ihr Verhalten nicht ändern. Der Unterschied ist, dass du dich jetzt dort abmelden kannst, wo Planung Latenz hinzufügt, ohne Mehrwert zu schaffen. Eine Lane, die einen einzelnen Tool-Call ausführt, braucht keine Planungsphase. Ein API-Run, der einer festen Sequenz folgt, braucht das Modell nicht, um zu entscheiden, was als Nächstes kommt. Die Steuerung ist granular: Du deaktivierst Planung pro Kontext, nicht global.

## Einstellungen, die du tatsächlich findest

Die Desktop-Einstellungen hatten ein Suchfeld, das die Modell-nach-Rolle-Routing-Tabelle nicht durchsuchte. In dieser Tabelle weist du Modelle Rollen wie `assistant`, `tool` oder `vision` zu. Wenn du vergessen hast, wo sie liegt, hast du durch Panels gescrollt, bis du sie gefunden hast. Jetzt deckt der Suchindex sie ab. Tippe einen Rollennamen oder einen Modell-Slug ein, und die Routing-Tabelle erscheint in den Ergebnissen.

Dasselbe Desktop-Update behebt zwei Lokalisierungslücken. Routing-Labels und Belegtexte werden jetzt korrekt auf brasilianischem Portugiesisch angezeigt. Indikatoren für neue Konversationen und der Answer-only-Turn-Status sind ebenfalls klarer und beseitigen die Mehrdeutigkeit, ob das System im Leerlauf ist oder verarbeitet.

## Was experimentell blieb

Drei Experimente erhielten Updates, ohne die Standardwerte zu ändern. Der Benchmark zur Speicherextraktion war nicht aussagekräftig, daher bleiben die 6.000-Zeichen-Grenze und das globale Modell bestehen. Du kannst dich für ein explizites Extraktionsmodell und einen deterministischen Vorfilter entscheiden, wenn du engeres Speicherverhalten testen möchtest. Das Experiment zu Cron-Modell-Stufen zeigte volle Korrektheit bei sieben von acht synthetischen Jobs, aber synthetische Jobs sind keine Produktionslasten. Die Standardwerte sind unverändert. Das schlanke Design-Refinement und die Experimente zur Prompt-Proportionalität bleiben ebenfalls standardmäßig deaktiviert.

## Jetzt holen

Upgrade mit `pip install chimera-agent==0.92.0`. Desktop-Installer sind unsigniert und können beim ersten Start nachfragen; die App verifiziert Signaturen bei Updater-Bundles. Vollständige Hinweise unter [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
