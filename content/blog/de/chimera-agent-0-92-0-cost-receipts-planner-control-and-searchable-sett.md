---
title: "Chimera Agent 0.92.0: Kostenbelege, Planner-Steuerung und durchsuchbare Einstellungen"
date: 2026-11-24
category: update
summary: "Kostenbelege nutzen jetzt Live-Preise, der Planner lässt sich pro Lauf umschalten, und die Desktop-Einstellungssuche findet die Routing-Tabelle."
version: "0.92.0"
---

## Was sich für Agent-Builder tatsächlich geändert hat

Drei Dinge in diesem Release verändern, wie ihr Agents im Alltag ausführt. Der Rest sind Experimente, die standardmäßig aus bleiben – sie gehören ins Labor, nicht in eure Pipeline.

**Kostenbelege raten nicht mehr.** Vor 0.92.0 hatte ein Lauf außerhalb von `serve` keine verlässliche Preisquelle. Der Beleg zeigte, was der lokale Katalog gerade gecacht hatte – das konnte veraltet sein oder bei neueren Modellen fehlen. Wer einen exakten Model-Slug nutzte, der nicht im Katalog stand, bekam eine falsche oder gar keine Kostenzeile. Das machte die Budgetplanung für alle kaputt, die einen bestimmten Provider-Endpoint pinnen.

Läufe außerhalb von `serve` ziehen die Preise jetzt aus OpenRouters öffentlichem Preisindex. Exakte Model-Slugs bekommen ihre eigenen Raten, statt einen unscharfen Match zu erben. Strikte Admission-Calls behalten das Quote bei, das bei der Zulassung des Calls verwendet wurde – der Beleg entspricht also dem, was tatsächlich reserviert wurde. Der `gpt-oss-20b`-Katalogeintrag wurde im selben Durchgang aktualisiert. Wer Kosten pro Lauf trackt, bekommt jetzt reproduzierbare Zahlen.

**Der Planner wurde zum Schalter.** Der Planner war immer an. Man konnte ihn nicht für eine einzelne Kanban-Lane, einen einzelnen API-Call oder einen einzelnen Solve-Step in einem Workflow ausschalten. Das bedeutete: Jede leichte Aufgabe zahlte die Latenz- und Token-Kosten der Planung, selbst wenn die Anweisung trivial war oder das Modell nicht von einer Zerlegung profitierte.

Mit `use_planner` setzt ihr das dort, wo es zählt: auf einer Lane-Definition, in einem API-Run-Payload oder auf einem Workflow-Solve-Step. Der Default bleibt an, bestehendes Verhalten verschiebt sich also nicht. Aber wenn ihr eine Lane habt, die nichts anderes tut als Output zu formatieren, könnt ihr den Planner überspringen und euch einen Roundtrip sparen. Derselbe Flag funktioniert auf allen drei Ebenen – das mentale Modell ist also ein Boolean, nicht drei getrennte Configs.

**Desktop-Einstellungen wurden auffindbar.** Die Modell-nach-Rolle-Routing-Tabelle war vergraben. Man musste wissen, unter welchem Einstellungs-Tab sie lag, und dorthin scrollen. Die Einstellungssuche indexiert sie jetzt – wer „routing“ oder einen Rollennamen eintippt, bekommt sie angezeigt. Das ist relevant, wenn ihr zwischen Projekten wechselt, die für dieselbe Rolle unterschiedliche Modelle nutzen.

Zwei Lokalisierungs-Fixes kamen gleich mit: Routing- und Belegtexte lesen sich jetzt korrekt auf brasilianischem Portugiesisch, und neue Konversationen sowie Answer-only-Turns zeigen einen klareren Status. Die Statusänderung ist klein, beseitigt aber die Mehrdeutigkeit, ob ein Turn auf einen Tool-Call oder auf eine Modellantwort wartet.

## Was die Experimente bedeuten (und was nicht)

Vier Experimente sind gelandet, alle opt-in und alle standardmäßig aus. Keines davon ändert das Produktionsverhalten, außer ihr aktiviert es explizit.

Memory Extraction hat einen Benchmark-Lauf bekommen, der nicht aussagekräftig war. Das 6.000-Zeichen-Limit und das globale Modell bleiben die Defaults. Ihr könnt ein explizites Extraktionsmodell und einen deterministischen Pre-Filter aktivieren, aber es gibt noch keinen Beleg, dass eines davon den Recall messbar verbessert. Aktiviert sie, wenn ihr eigene Daten sammeln wollt.

Cron-Modell-Stufen wurden mit synthetischen Jobs getestet. Die günstigere Stufe war bei sieben von acht vollständig korrekt. Das sagt nichts über eure Produktions-Cron-Jobs aus, denn synthetische Jobs sind nicht eure Jobs. Die Defaults bleiben unverändert. Wer Cron in hohem Volumen fährt, kann mit der günstigeren Stufe experimentieren und gegen die eigenen Erfolgskriterien validieren.

Design Refinement und Prompt Proportionality bleiben standardmäßig aus. Es sind interne Experimente ohne sichtbare Oberfläche. Die Notes referenzieren sie aus Transparenzgründen, nicht weil ihr sie anfassen solltet.

## Was ihr jetzt tun solltet

Wenn ihr Kosten trackt, zieht das neueste Image und führt einen Job außerhalb von `serve` aus. Gleicht den Beleg mit OpenRouters veröffentlichten Raten ab. Wenn ihr exakte Model-Slugs pint, prüft, ob die Ratenzeile zu eurem Provider passt.

Wenn ihr leichtgewichtige Kanban-Lanes habt, setzt `use_planner: false` auf eine Lane und vergleicht die Latenz. Der Flag ist im Run-Configuration-Schema dokumentiert.

Wenn ihr Desktop nutzt, öffnet die Einstellungen und sucht nach einem Rollennamen. Prüft, ob die Routing-Tabelle erscheint.

Release Notes mit der vollständigen Liste: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
