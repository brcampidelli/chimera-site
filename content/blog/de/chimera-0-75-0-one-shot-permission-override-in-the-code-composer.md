---
title: "Chimera 0.75.0: Einmalige Berechtigungsfreigabe im Code Composer"
date: 2026-10-24
category: update
summary: "Ein Schalter pro Konversation im Code Composer genehmigt sichere Tool-Aufrufe automatisch, protokolliert jede Entscheidung und entfernt das Fünf-Minuten-Zeitlimit für menschliche Eingaben."
version: "0.75.0"
---

## Was sich für dich ändert

Bislang erzeugte jeder Tool-Aufruf, der etwas außerhalb der Sandbox berührte, eine Genehmigungskarte. Du musstest jede einzelne wegklicken. Das war der Kontrakt: Der Agent stoppt, du entscheidest, er macht weiter. Der Kontrakt galt auch, wenn du an einem Skript gefeilt hast und der Agent denselben ungefährlichen Befehl zwölf Mal hintereinander ausführen musste. Die Reibung war kein Bug – sie war beabsichtigt. Aber sie machte schnelle Iterationen langsamer als nötig.

Version 0.75.0 fügt dem Code Composer einen Schalter mit der Bezeichnung „Ignore permissions“ hinzu. Wenn du ihn aktivierst, genehmigt der Agent Tool-Aufrufe automatisch, die normalerweise eine Genehmigungskarte erzeugen würden. Er protokolliert jede Entscheidung, die er in deinem Namen trifft. Der Schalter gilt nur für eine Konversation. Er bleibt über App-Neustarts hinweg nicht bestehen. Und er berührt nichts, was lokale Daten nach außen sendet: Pushes, Publishing, Zahlungen, in deinem Namen versendete Nachrichten, Zugriff auf Secrets und jede Operation, die Daten vom Rechner überträgt, halten weiterhin an und fragen nach. Die Grenze ist explizit. Der Agent kann sich innerhalb der Grenze schneller bewegen; er kann sie ohne dich nicht überschreiten.

Das ist keine globale Einstellung. Es ist kein Schalter in einer Konfigurationsdatei. Es ist ein Button auf dem Bildschirm, und nur du kannst ihn drücken. Das Design hält die Freigabe nah an der Arbeit. Du siehst die Konversation, du weißt, was der Agent tut, und du entscheidest, dass für diese Sitzung die wiederholten Genehmigungen Rauschen sind. Wenn die App neu startet, kommt das Rauschen zurück. Du entscheidest dich erneut, ganz bewusst.

## Warum sich das Timeout-Verhalten geändert hat

Der Code-Bildschirm hatte eine Fünf-Minuten-Frist für deine Antwort. Wenn du innerhalb dieses Zeitfensters nicht auf eine Genehmigungskarte reagiert hast, verweigerte der Agent den Aufruf und die Konversation blieb stecken. Die Annahme war, dass eine unbeantwortete Karte eine unbeaufsichtigte Sitzung bedeutet. Aber diese Annahme brach in einem gängigen Workflow zusammen: Du bittest den Agenten, etwas zu tun, wechselst in ein anderes Fenster, um Dokumentation zu prüfen oder eine Hypothese zu testen, und kommst sechs Minuten später zu einer toten Konversation zurück. Das Timeout bestrafte fokussiertes Arbeiten.

Der Code-Bildschirm wartet jetzt unbegrenzt auf deine Antwort. Der Agent bleibt pausiert, bis du zurückkehrst. Das Fünf-Minuten-Limit gilt weiterhin dort, wo es sinnvoll ist – bei Automatisierungen, die niemand beobachtet. Diese behalten die Leitplanke. Aber wenn du anwesend bist, selbst wenn du kurz weggehst, läuft dir die Konversation nicht mehr ab.

## Was der Schalter nicht tut

Der „Ignore permissions“-Schalter ist kein Sudo-Flag. Er erweitert keine Privilegien. Er gewährt keinen Zugriff auf irgendetwas, das der Agent nicht ohnehin schon anfordern könnte. Er entfernt nur die Anforderung, dass du jede Anfrage manuell genehmigen musst. Der Agent protokolliert weiterhin jeden automatisch genehmigten Aufruf. Du kannst im Nachhinein prüfen, was passiert ist. Die Aufzeichnung ist da, falls du eine Sitzung auditieren musst.

Die Kategorien, die weiterhin eine explizite Genehmigung erfordern, sind diejenigen, die Daten vom Rechner transferieren oder Ressourcen verbrauchen: Pushes auf Remotes, Publishing-Operationen, Zahlungsaktionen, Nachrichten, die deine Identität tragen, und alles, was Secrets oder lokale Daten liest oder nach außen überträgt. Der Schalter respektiert diese Kategorien bedingungslos. Es gibt keinen zweiten Schalter, um die Freigabe außer Kraft zu setzen.

## Was jetzt zu tun ist

Aktualisiere auf 0.75.0. Öffne eine Code-Composer-Sitzung, in der du wiederholte Tool-Aufrufe erwartest. Suche nach dem „Ignore permissions“-Schalter auf dem Bildschirm. Aktiviere ihn, wenn die Genehmigungskarten zu Rauschen werden. Deaktiviere ihn, wenn du die Leitplanken zurückhaben willst. Starte die App neu, um ihn zurückzusetzen. Lies die vollständige Liste der Änderungen in den [Release Notes][Chimera Agent v0.75.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.75.0).
