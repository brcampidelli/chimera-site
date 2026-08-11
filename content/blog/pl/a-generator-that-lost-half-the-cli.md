---
title: Generator, który po cichu zgubił połowę CLI
date: 2026-08-09
category: terminal
summary: Dokumentacja poleceń na tej stronie jest generowana automatycznie. Pierwsza wersja generatora wyprodukowała czysty, posortowany, całkowicie przekonujący plik JSON, w którym brakowało 53 podpoleceń — i nie zgłosiła żadnego błędu.
---

CLI Chimery ma 109 wywołań: 56 poleceń głównych plus 53 podpolecenia w 11 grupach. Dokumentacja
obejmuje szczęśliwą ścieżkę dla mniej więcej siedemnastu z nich, napisaną przez człowieka, co jest
właściwym sposobem pisania przewodnika wprowadzającego, a złym sposobem utrzymywania wyczerpującej
dokumentacji referencyjnej. Ręcznie przepisana lista flag jest poprawna dokładnie raz — w dniu, w
którym ją wpisano.

Dlatego dokumentacja referencyjna na tej stronie jest generowana bezpośrednio z CLI, tak samo jak
typy TypeScript aplikacji desktopowej są generowane ze schematu API, z tą samą bramką dryfu w CI:
wygeneruj ponownie i zgłoś błąd, jeśli zatwierdzona kopia się różni.

## Błąd

Pierwsza wersja przechodziła drzewo poleceń w ten sposób:

```python
root = typer.main.get_command(cli_app)
if not isinstance(root, click.Group):
    raise TypeError("the Chimera CLI is expected to be a command group")
```

Ten warunek zawodził. Nie przechodzenie drzewa — sam warunek. `typer.main.get_command()` zwracał
obiekt, który nie był instancją zainstalowanego `click.Group`, ponieważ Typer 0.27 dołącza własną
kopię Click pod `typer._click`. `TyperGroup` dziedziczy z `typer._click.core.Command`, a `click`,
który importuje twój własny kod, jest zupełnie innym obiektem klasy.

To, że zgłaszało wyjątek, było kwestią szczęścia. Poprzednia wersja robiła zamiast tego oczywistą
rzecz — traktowała wszystko, co nie było `click.Group`, jako polecenie liściowe — i ta wersja nie
zgłaszała żadnego błędu. Wyprodukowała dobrze sformowany, posortowany, deterministyczny plik JSON
opisujący 56 poleceń, w którym każda grupa została spłaszczona do pojedynczego wpisu, a wszystkie
53 podpolecenia zniknęły.

## Dlaczego to najgorszy możliwy rodzaj awarii

Generator, który się wywala, mówi ci, że zawiódł. Generator, który produkuje wiarygodny wynik, nie
mówi ci nic, a wszystko, co dzieje się dalej, dziedziczy tę ciszę. Strona referencyjna
wyrenderowałaby się bez zarzutu. `chimera kanban` byłoby wymienione ze swoim tekstem pomocy i bez
podpoleceń, co czyta się dokładnie tak samo jak polecenie, które po prostu nie ma podpoleceń.
Wyszukiwarka by to zindeksowała. Nikt patrzący na stronę nie mógłby wykryć braku, ponieważ brak
wygląda dokładnie tak samo jak kompletna strona.

Awarię wykryto poprzez liczenie, nie poprzez patrzenie: dokumentacja referencyjna powinna pokazywać
109 wywołań, a pokazywała 56.

## Poprawka i test, który ją przetrwa

Dumper jest teraz oparty na duck typingu — pyta, czy obiekt ma mapowanie `commands`, zamiast pytać,
jakiej jest klasy. To przetrwa dołączony Click, aktualizację Typer i zmianę głównej wersji Click,
ponieważ „ma podpolecenia" jest właściwością samej rzeczy, a „jest `click.Group`" jest właściwością
grafu importów.

Bardziej użyteczny niż sama poprawka jest kształt testu. Oczywistym twierdzeniem jest to, że zrzut
się powiódł:

```python
def test_dump_works():
    assert build()  # passes with 53 subcommands missing
```

Twierdzenie, które wykrywa tę awarię, dotyczy tego, co zostało znalezione:

```python
def test_finds_the_groups_and_not_just_the_leaves():
    groups = [c for c in build()["commands"] if "commands" in c]
    assert len(groups) >= 10
```

Każdy test, który tylko potwierdza, że generator się uruchomił, jest testem, który przechodzi, mimo
że generator jest błędny. Ten wart napisania potwierdza to, co miał znaleźć.

## Gdzie szukać

- Dumper i jego testy:
  [`chimera/cli/schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/chimera/cli/schema_dump.py)
  i
  [`tests/test_cli_schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/tests/test_cli_schema_dump.py)
- Dołączony przez Typer Click, jeśli chcesz sam potwierdzić ten mechanizm:
  [`typer/_click`](https://github.com/fastapi/typer)
