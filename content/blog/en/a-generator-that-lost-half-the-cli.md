---
title: A generator that quietly lost half the CLI
date: 2026-08-09
category: terminal
summary: The command reference on this site is generated. The first version of the generator produced a clean, sorted, entirely convincing JSON file with 53 subcommands missing — and did not error.
---

Chimera's CLI has 109 invocations: 56 root commands plus 53 subcommands across 11 groups. The
documentation covers the happy path for about seventeen of them, written by a human, which is the
right way to write a getting-started guide and the wrong way to maintain an exhaustive reference. A
hand-copied flag list is correct exactly once — the day it was typed.

So the reference on this site is generated from the CLI itself, the same way the desktop app's
TypeScript types are generated from the API schema, with the same drift gate in CI: regenerate,
and fail if the committed copy differs.

## The bug

The first version walked the command tree like this:

```python
root = typer.main.get_command(cli_app)
if not isinstance(root, click.Group):
    raise TypeError("the Chimera CLI is expected to be a command group")
```

That check failed. Not the walk — the check. `typer.main.get_command()` returned an object that is
not an instance of the installed `click.Group`, because Typer 0.27 vendors its own copy of Click
under `typer._click`. `TyperGroup` inherits from `typer._click.core.Command`, and the `click` your
own code imports is a different class object entirely.

Raising was luck. The version before it did the obvious thing instead — treat anything that is not
a `click.Group` as a leaf command — and that one did not raise. It produced a well-formed, sorted,
deterministic JSON file describing 56 commands, with every group flattened to a single entry and
all 53 subcommands gone.

## Why that is the worst possible failure

A generator that crashes tells you it failed. A generator that produces plausible output tells you
nothing, and everything downstream inherits the silence. The reference page would have rendered
beautifully. `chimera kanban` would have been listed with its help text and no subcommands, which
reads exactly like a command that has no subcommands. Search would have indexed it. Nobody looking
at the page could have detected the absence, because absence is what a complete page also looks
like.

The failure was caught by counting, not by looking: the reference should show 109 invocations and
it showed 56.

## The fix, and the test that outlives it

The dumper is duck-typed now — it asks whether an object has a `commands` mapping rather than what
class it is. That survives a vendored Click, a Typer upgrade, and a Click major version, because
"has subcommands" is a property of the thing and "is a `click.Group`" is a property of the import
graph.

More useful than the fix is the shape of the test. The obvious assertion is that the dump
succeeded:

```python
def test_dump_works():
    assert build()  # passes with 53 subcommands missing
```

The assertion that catches this failure is about what was found:

```python
def test_finds_the_groups_and_not_just_the_leaves():
    groups = [c for c in build()["commands"] if "commands" in c]
    assert len(groups) >= 10
```

Any test asserting a generator ran is a test that passes while the generator is wrong. The one
worth writing asserts what it was supposed to find.

## Where to look

- The dumper and its tests:
  [`chimera/cli/schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/chimera/cli/schema_dump.py)
  and
  [`tests/test_cli_schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/tests/test_cli_schema_dump.py)
- Typer's vendored Click, if you want to confirm the mechanism yourself:
  [`typer/_click`](https://github.com/fastapi/typer)
