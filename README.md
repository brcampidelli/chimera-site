# chimeraagent.space

The site for [Chimera](https://github.com/brcampidelli/chimera-agent): the terminal agent, the
desktop app, the documentation, the blog and the skill hub.

Next.js with `output: 'export'` — a static tree. Nothing here is resolved at request time, so
there is no server to keep alive.

## Running it

```bash
npm install
npm run sync:tokens   # pull the design system out of the product repo
npm run dev
```

`sync:tokens` needs the product tree. It looks for it in this order: `$CHIMERA_REPO`,
`.content/chimera` (what CI syncs at a pinned tag), then `../Agent AI`.

## The rule this repo is organised around

**Nothing that can be derived is written by hand.** A site is where software lies by omission: a
benchmark ages, a command disappears, a colour drifts, and the page keeps asserting the old thing
with total confidence. So the things that can go stale are generated, and CI fails when the
generated copy no longer matches its source.

| What | Comes from | Gate |
|---|---|---|
| Colour, shadow, motion tokens | `apps/desktop/src/index.css` | `npm run verify:tokens` |
| The language list | `apps/desktop/src/lib/i18n.tsx` | `src/i18n/locales.test.ts` |
| Translation debt | the dictionaries themselves | `npm run verify:i18n` |
| Theme storage keys | `apps/desktop/index.html` | `src/lib/theme.test.ts` |

Benchmarks, the command reference, releases and the skill catalogue join that table as their
phases land. Numbers in particular: this project publishes the benchmarks it lost and retracts its
own claims when the data stops supporting them, and a marketing site is the easiest place in the
world to quietly undo that.

## Verify

```bash
npm run verify
```

Drift gates, then types, then tests. `npm run build` is the last word: any route that would need a
server fails there.

## Licence

Apache-2.0, matching the product. Copyright 2026 The Chimera Agent Authors.
