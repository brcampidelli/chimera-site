---
title: "Chimera Agent 0.47.0: Korrekturen für Guard Mode und Kernel-Sichtbarkeit"
date: 2026-08-20
category: update
summary: "Sieben kritische Korrekturen beheben Fehler bei der Berichterstattung im Guard Mode, Lücken in der Regelausführung, Integrität der Audit-Logs und Sichtbarkeit des Kernels."
version: "0.47.0"
---

## Guard Mode meldet Ablehnungen jetzt korrekt

Ein grundlegender Fehler im Guard Mode (`--guard`) führte dazu, dass abgelehnte Tool-Aufrufe als erfolgreich gemeldet wurden. Das System überprüfte, ob die Ablehnungsnachricht ein `error:`-Präfix enthielt, was jedoch bei den meisten Ablehnungen nicht der Fall war. Dadurch zeigten drei kritische Oberflächen – der Desktop-Frame, die Schrittprotokolle und die Drift-Erkennung – eine erfolgreiche Ausführung an, obwohl jede gefährliche Aktion tatsächlich blockiert wurde. Das Modell meldete selbstbewusst abgeschlossene Aktionen wie Force-Pushes, die nie stattgefunden hatten. Jetzt werden Ablehnungen korrekt auf allen Oberflächen gekennzeichnet, mit klarer Zuordnung zur Entscheidung des Guards.

## Regel-Engine-Korrekturen für Skripte und Dokumente

Die Regel-Engine hatte zwei gegensätzliche Fehler. Mehrzeilige Skripte wurden immer durchgelassen, weil das Escapen von Zeilenumbrüchen die Wortgrenzenerkennung in den Regelmustern störte. Gleichzeitig wurden Dokumente, die blockierte Befehle zitierten, fälschlicherweise hart blockiert. Der Schutz war genau verkehrt herum – echte Skripte umgingen die Regeln, während Dokumentation falsche Positive auslöste. Zwei Regeln hatten aufgrund dieser Parsing-Probleme nie gefeuert. Die Interpolation erhält jetzt die Grenzen korrekt.

## Überarbeitung des Audit-Systems

Drei Audit-Probleme wurden behoben. Erstens war das System, das Anmeldeinformationen erkannte, dasselbe, das sie unzensiert im Audit-Log speicherte. Zweitens konnten gleichzeitige Schreibvorgänge die kryptografische Verifikation der Audit-Kette beschädigen. Drittens meldete die Sicherheits-UI aufgrund von Hash-Ketten-Resets bei gleichzeitigen Schreibvorgängen fälschlicherweise Manipulationen. Jetzt werden Anmeldeinformationen vor der Speicherung im Audit-Log zensiert, und Schreibvorgänge halten einen konsistenten Kettenzustand aufrecht.

## Observation Mode beobachtet jetzt wirklich

Der `observe`-Modus hat Regeln durchgesetzt, während er vorgab, sie nur zu messen. Harte Blocks wurden vor der Genehmigung durch den Approver ausgelöst und dann von der Zählung der Ablehnungen ausgeschlossen, die für Rollout-Entscheidungen verwendet wurden. Bei über 33 echten Aufrufen wurden acht Ablehnungen als null angezeigt. Diese Ablehnungen bleiben bestehen (sie sind eindeutige Signale), werden jetzt aber korrekt gezählt und ihre Quelle identifiziert.

## Kernel-Sichtbarkeit wiederhergestellt

Die Entscheidungen des Trust-Kernels erreichten keine HTTP-Endpunkte für Runs, Batches oder Turns – kritische Entscheidungen wie Force-Push-Genehmigungen wurden unsichtbar getroffen. Der Kernel beteiligt sich jetzt an allen HTTP-Flows, wenn `CHIMERA_GOVERNANCE` aktiv ist. Server-seitige Prompts erscheinen nicht auf HTTP-Verbindungen, sodass sichergestellt ist, dass die Person, die sie sieht, die Anfrage tatsächlich gestellt hat.

Führe `chimera upgrade` aus, um die Korrekturen zu erhalten. Wenn du den Guard Mode verwendest, aktualisiere sofort – die Berichte der vorherigen Version waren gefährlich irreführend. Die [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) listet alle Änderungen auf.

Für Produktionsumgebungen solltest du deine Audit-Logs auf mögliche Leaks von Anmeldeinformationen durch regierte `write_file`-Aufrufe überprüfen. Überprüfe, ob mehrzeilige Skripte in deinen Regeldateien Anpassungen für die korrigierte Grenzenerkennung benötigen.
