---
title: "Chimera Agent 0.50.0: Sichtbarkeit, Kontrolle und Hybrid-Suche"
date: 2026-10-11
category: update
summary: "Dieses Release behebt stille Verhaltensweisen, fügt fehlende Kontrollen hinzu und verbessert die Retrieval-Leistung durch Hybrid-Suche."
version: "0.50.0"
---

## Aufgaben sind jetzt sichtbar

Agenten hatten bisher eine interne Aufgabenliste (`RunState.tasks`), die nie angezeigt oder gespeichert wurde. Lange Läufe konnten ihren Fortschritt während der Kontextkomprimierung verlieren. Jetzt wird die aktive Aufgabe während der Ausführung angezeigt, und abgeschlossene Aufgaben werden durchgestrichen. Die Liste überlebt die Komprimierung, sodass Agenten ihren Plan nicht mehr mitten im Lauf vergessen.

## Genehmigungsanfragen folgen Ihnen

Drei unbeaufsichtigte Ausführungsoberflächen (einschließlich Cron-Jobs) konnten Genehmigungen anfordern, aber der Mechanismus war undurchsichtig. Wenn mit `CHIMERA_APPROVAL_WEBHOOK` konfiguriert, leiten Agenten jetzt Genehmigungsfragen an den angegebenen Kanal weiter, anstatt stillschweigend zu scheitern, wenn keine Konsole verfügbar ist. Das System meldet auch explizit `unreachable`-Zustände, wenn die Zustellung nicht möglich ist.

## Verbesserungen bei Governance und Retrieval

Der Vertrauenskern (`CHIMERA_GOVERNANCE`) hatte bisher keine Aktivierungskontrolle, obwohl er Sicherheitsereignisse protokollierte. Er wird jetzt standardmäßig deaktiviert geliefert, mit einem sichtbaren Schalter. Für das Retrieval verwendet `chimera find` jetzt standardmäßig Hybrid-Suche (Keyword + Vektor), nachdem Tests gezeigt haben, dass sie die Keyword-only-Suche um 6,25 Punkte (p = 1,7e-04) auf dem Projektkorpus übertrifft. Die reine Vektorsuche schneidet schlechter ab, was den kombinierten Ansatz rechtfertigt.

## Behebungen bei der Modellverarbeitung

Agenten gingen davon aus, dass nicht katalogisierte Modelle 128k-Token-Fenster hatten, was zu Abstürzen bei den 31 Modellen (von 431 indizierten) führte, die tatsächlich ≤64k bedienen. Das System überprüft jetzt den Live-Index für unbekannte Modelle. Fünf Katalogeinträge wurden aufgrund überhöhter Fenstergrößen korrigiert, und ein Preisierungsfehler (2,2x abweichend) wurde behoben.

## Nachvollziehbarkeit und Einschränkungen

Traces zeichnen jetzt auf, welcher Backend jeden Schritt bedient hat, nicht nur welches Modell geantwortet hat. Dies ist wichtig für Dienste wie OpenRouter, bei denen Modell-Slugs Pools mit 8,8-fachen Preisunterschieden repräsentieren. Das Changelog zieht einige Leistungsangaben zurück, die fälschlicherweise gepoolte Messungen verglichen.

Wichtige Einschränkungen bleiben bestehen: Installer sind unsigniert (obwohl Updater signiert sind), Governance wird deaktiviert geliefert, und der Komprimierungs-Zusammenfasser ist standardmäßig ausgeschaltet, da er in der Praxis nicht verwendet wird (0 Auslöser über 137 gemessene Läufe). Die Abbruchfunktion ist kooperativ - aktive Aufrufe werden vor dem Stoppen abgeschlossen.

Siehe [Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) für Messungen und vollständiges Changelog. Zum Aktualisieren: `pip install --upgrade chimera-agent`.
