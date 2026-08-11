---
title: Un generatore che ha silenziosamente perso metà della CLI
date: 2026-08-09
category: terminal
summary: Il riferimento dei comandi su questo sito è generato. La prima versione del generatore produceva un file JSON pulito, ordinato, del tutto convincente, a cui mancavano 53 sottocomandi — e non generava alcun errore.
---

La CLI di Chimera ha 109 invocazioni: 56 comandi radice più 53 sottocomandi distribuiti in 11 gruppi.
La documentazione copre il percorso felice per una diciassettina di essi, scritta da un umano, che è
il modo giusto di scrivere una guida introduttiva e il modo sbagliato di mantenere un riferimento
esaustivo. Un elenco di flag copiato a mano è corretto esattamente una volta — il giorno in cui è
stato scritto.

Perciò il riferimento su questo sito viene generato direttamente dalla CLI, allo stesso modo in cui i
tipi TypeScript dell'app desktop vengono generati dallo schema dell'API, con lo stesso gate anti-drift
in CI: rigenera, e fallisci se la copia committata differisce.

## Il bug

La prima versione attraversava l'albero dei comandi così:

```python
root = typer.main.get_command(cli_app)
if not isinstance(root, click.Group):
    raise TypeError("the Chimera CLI is expected to be a command group")
```

Quel controllo falliva. Non l'attraversamento — il controllo. `typer.main.get_command()` restituiva
un oggetto che non era un'istanza del `click.Group` installato, perché Typer 0.27 include una propria
copia vendorizzata di Click sotto `typer._click`. `TyperGroup` eredita da
`typer._click.core.Command`, e il `click` importato dal tuo stesso codice è un oggetto classe
completamente diverso.

Sollevare un'eccezione è stata fortuna. La versione precedente faceva invece la cosa ovvia — trattare
tutto ciò che non è un `click.Group` come un comando foglia — e quella non sollevava nulla. Produceva
un file JSON ben formato, ordinato, deterministico, che descriveva 56 comandi, con ogni gruppo
appiattito in una singola voce e tutti i 53 sottocomandi scomparsi.

## Perché questo è il peggior fallimento possibile

Un generatore che va in crash ti dice che ha fallito. Un generatore che produce un output plausibile
non ti dice niente, e tutto ciò che viene dopo eredita quel silenzio. La pagina di riferimento si
sarebbe renderizzata splendidamente. `chimera kanban` sarebbe stato elencato con il suo testo di help
e nessun sottocomando, il che si legge esattamente come un comando che non ha sottocomandi. La ricerca
lo avrebbe indicizzato. Nessuno guardando la pagina avrebbe potuto rilevare l'assenza, perché
l'assenza è anche l'aspetto di una pagina completa.

Il fallimento è stato scoperto contando, non guardando: il riferimento dovrebbe mostrare 109
invocazioni e ne mostrava 56.

## La correzione, e il test che le sopravvive

Il dumper ora è duck-typed — chiede se un oggetto ha una mappa `commands`, non a quale classe
appartiene. Questo sopravvive a un Click vendorizzato, a un aggiornamento di Typer e a una major
version di Click, perché "ha sottocomandi" è una proprietà della cosa, mentre "è un `click.Group`" è
una proprietà del grafo degli import.

Più utile della correzione è la forma del test. L'asserzione ovvia è che il dump sia riuscito:

```python
def test_dump_works():
    assert build()  # passes with 53 subcommands missing
```

L'asserzione che intercetta questo fallimento riguarda cosa è stato trovato:

```python
def test_finds_the_groups_and_not_just_the_leaves():
    groups = [c for c in build()["commands"] if "commands" in c]
    assert len(groups) >= 10
```

Qualsiasi test che si limita ad asserire che un generatore sia stato eseguito è un test che passa
anche quando il generatore è sbagliato. Quello che vale la pena scrivere asserisce cosa doveva
trovare.

## Dove guardare

- Il dumper e i suoi test:
  [`chimera/cli/schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/chimera/cli/schema_dump.py)
  e
  [`tests/test_cli_schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/tests/test_cli_schema_dump.py)
- Il Click vendorizzato di Typer, se vuoi verificare tu stesso il meccanismo:
  [`typer/_click`](https://github.com/fastapi/typer)
