---
title: Ein Generator, der still und leise die halbe CLI verlor
date: 2026-08-09
category: terminal
summary: Die Befehlsreferenz dieser Seite wird generiert. Die erste Version des Generators erzeugte eine saubere, sortierte, völlig überzeugende JSON-Datei, der 53 Unterbefehle fehlten — und das ohne Fehlermeldung.
---

Chimeras CLI hat 109 Aufrufe: 56 Root-Befehle plus 53 Unterbefehle, verteilt auf 11 Gruppen. Die
Dokumentation deckt den Happy Path für etwa siebzehn davon ab, von einem Menschen geschrieben — das
ist die richtige Art, eine Getting-Started-Anleitung zu schreiben, und die falsche Art, eine
erschöpfende Referenz zu pflegen. Eine von Hand abgeschriebene Flag-Liste ist genau einmal korrekt
— am Tag, an dem sie getippt wurde.

Deshalb wird die Referenz auf dieser Seite aus der CLI selbst generiert, genauso wie die
TypeScript-Typen der Desktop-App aus dem API-Schema generiert werden — mit demselben Drift-Gate in
der CI: neu generieren, und fehlschlagen, wenn die committete Kopie davon abweicht.

## Der Bug

Die erste Version durchlief den Befehlsbaum so:

```python
root = typer.main.get_command(cli_app)
if not isinstance(root, click.Group):
    raise TypeError("the Chimera CLI is expected to be a command group")
```

Diese Prüfung schlug fehl. Nicht der Durchlauf — die Prüfung. `typer.main.get_command()` gab ein
Objekt zurück, das keine Instanz des installierten `click.Group` war, weil Typer 0.27 eine eigene
Kopie von Click unter `typer._click` bündelt. `TyperGroup` erbt von `typer._click.core.Command`,
und das `click`, das der eigene Code importiert, ist ein völlig anderes Klassenobjekt.

Dass hier eine Exception geworfen wurde, war Glück. Die Version davor tat stattdessen das
Naheliegende — alles, was kein `click.Group` ist, als Blattbefehl behandeln — und die warf nichts.
Sie erzeugte eine wohlgeformte, sortierte, deterministische JSON-Datei mit 56 beschriebenen
Befehlen, wobei jede Gruppe zu einem einzigen Eintrag zusammengefaltet und alle 53 Unterbefehle
verschwunden waren.

## Warum das der schlimmstmögliche Fehler ist

Ein Generator, der abstürzt, sagt einem, dass er versagt hat. Ein Generator, der eine plausible
Ausgabe erzeugt, sagt gar nichts, und alles Nachgelagerte erbt dieses Schweigen. Die Referenzseite
hätte wunderbar gerendert. `chimera kanban` wäre mit seinem Hilfetext gelistet worden, ohne
Unterbefehle — was sich exakt so liest wie ein Befehl ohne Unterbefehle. Die Suche hätte es
indexiert. Niemand, der auf die Seite schaut, hätte die Abwesenheit erkennen können, weil
Abwesenheit genauso aussieht wie eine vollständige Seite.

Der Fehler wurde durch Zählen entdeckt, nicht durch Hinsehen: Die Referenz sollte 109 Aufrufe
zeigen, und sie zeigte 56.

## Der Fix, und der Test, der ihn überlebt

Der Dumper arbeitet jetzt mit Duck-Typing — er fragt, ob ein Objekt ein `commands`-Mapping besitzt,
statt zu welcher Klasse es gehört. Das übersteht ein gebündeltes Click, ein Typer-Upgrade und einen
Major-Versionswechsel von Click, weil "hat Unterbefehle" eine Eigenschaft der Sache selbst ist,
während "ist ein `click.Group`" eine Eigenschaft des Import-Graphen ist.

Nützlicher als der Fix ist die Form des Tests. Die naheliegende Assertion ist, dass der Dump
erfolgreich war:

```python
def test_dump_works():
    assert build()  # passes with 53 subcommands missing
```

Die Assertion, die diesen Fehler abfängt, handelt davon, was gefunden wurde:

```python
def test_finds_the_groups_and_not_just_the_leaves():
    groups = [c for c in build()["commands"] if "commands" in c]
    assert len(groups) >= 10
```

Jeder Test, der nur behauptet, dass ein Generator gelaufen ist, ist ein Test, der besteht, während
der Generator falsch liegt. Der Test, der sich zu schreiben lohnt, behauptet, was gefunden werden
sollte.

## Wo man nachschauen kann

- Der Dumper und seine Tests:
  [`chimera/cli/schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/chimera/cli/schema_dump.py)
  und
  [`tests/test_cli_schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/tests/test_cli_schema_dump.py)
- Das von Typer gebündelte Click, falls du den Mechanismus selbst nachvollziehen willst:
  [`typer/_click`](https://github.com/fastapi/typer)
