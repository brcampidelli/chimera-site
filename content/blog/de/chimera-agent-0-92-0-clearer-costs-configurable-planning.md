---
title: "Chimera Agent 0.92.0: transparentere Kosten, konfigurierbare Planung"
date: 2026-11-23
category: update
summary: "Kostenbelege nutzen jetzt öffentliche Preise für Runs außerhalb von serve, der Planer kann pro Lane oder Run deaktiviert werden, und die Desktop-Einstellungssuche findet das Modell-Routing."
version: "0.92.0"
---

## Kostenbelege, die zum tatsächlich aufgerufenen Modell passen

Bisherige Versionen ließen einen oft raten, was ein Run wirklich gekostet hat. Belege hingen von Kontext ab, der nicht immer verfügbar war, und ein Modell, das keinem Katalogeintrag entsprach, konnte auf einen Tarif zurückfallen, der den tatsächlichen Aufruf nicht widerspiegelte. Das erschwerte die Kostenprüfung und den Vergleich von Runs.

Version 0.92.0 ändert, wie Belege für Runs außerhalb von `serve` erstellt werden. Diese Runs nutzen jetzt den öffentlichen Preisindex von OpenRouter. Exakte Modell-Slugs erhalten eigene Tarife, statt einen breiteren oder ungenaueren Eintrag zu erben. Strikte Aufrufe behalten das bei der Zulassung verwendete Angebot bei, sodass der Beleg den Preis widerspiegelt, der bei der Zulassung des Aufrufs akzeptiert wurde, und nicht eine spätere oder abweichende Schätzung. Der Katalogeintrag `gpt-oss-20b` wurde ebenfalls aktualisiert.

Für alle, die Agenten außerhalb der Served-Umgebung betreiben, beseitigt dies eine Quelle von Unklarheiten. Sie können einen Beleg ansehen und wissen, dass er aus öffentlichen Preisen stammt, an den spezifischen Modell-Slug gebunden ist und strikte Aufrufe das Angebot bewahren, das die Zulassung bestimmte. Die Änderung beeinflusst nicht, wie Modelle ausgewählt werden. Sie ändert, was der Beleg nach dem Run ausweist.

## Planung wird zur Entscheidung pro Run

Der Planer war bisher ein globales Verhalten. Wenn man für eine Lane, einen API-Run oder einen Workflow-Solve-Schritt die Planung überspringen wollte, gab es keinen direkten Schalter für diesen Kontext. Man akzeptierte entweder die Voreinstellung oder änderte das Verhalten umfassender, als die Aufgabe erforderte.

`use_planner` ist jetzt auf Kanban-Lanes, API-Runs und Workflow-Solve-Schritten konfigurierbar. Der Planer bleibt standardmäßig aktiviert. Dieser Standard ist wichtig: Bestehende Setups behalten ihr aktuelles Verhalten, sofern man nicht explizit abwählt. Die neue Einstellung bietet einen engeren Kontrollpunkt für Fälle, in denen die Planung Latenz oder Schritte hinzufügt, die ein bestimmter Run nicht benötigt.

Das ist nützlich, wenn eine Lane eine eng umrissene Aufgabe bearbeitet, wenn ein API-Aufrufer weiß, dass die Eingabe bereits für die direkte Ausführung geformt ist, oder wenn ein Solve-Schritt ohne zusätzlichen Planungsdurchlauf fortfahren soll. Das lässt sich jetzt auf Lane-, Run- oder Schritt-Ebene ausdrücken, statt das gesamte System zu ändern.

## Desktop-Einstellungen, die man tatsächlich findet

Die Einstellungssuche zeigte die Routing-Tabelle nach Modell und Rolle nicht an. Wenn man nicht bereits wusste, wo sie sich befindet, konnte man Zeit damit verbringen, sich durch die Oberfläche zu klicken. Das ist behoben: Die Suche findet jetzt die Routing-Tabelle.

Zwei kleinere Desktop-Korrekturen sind enthalten. Routing- und Belegkopien werden jetzt korrekt in brasilianischem Portugiesisch angezeigt. Neue Konversationen und reine Antwort-Züge zeigen zudem einen klareren Status, sodass die Oberfläche mitteilt, was passiert, statt den Zustand unklar zu lassen.

## Was jetzt zu tun ist

Aktualisieren Sie auf 0.92.0 und prüfen Sie die drei geänderten Bereiche. Wenn Sie Agenten außerhalb von `serve` betreiben, sehen Sie sich einen Beleg an und bestätigen Sie, dass er den erwarteten Modell-Slug und das Zulassungsangebot widerspiegelt. Wenn Sie Lanes oder API-Runs haben, die keine Planung benötigen, setzen Sie `use_planner` auf dieser Ebene auf false und belassen Sie den Standard überall sonst. Wenn Sie Desktop nutzen, durchsuchen Sie die Einstellungen nach der Routing-Tabelle nach Modell und Rolle und überprüfen Sie den Statustext in einer neuen Konversation.

Vollständige Versionshinweise: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
