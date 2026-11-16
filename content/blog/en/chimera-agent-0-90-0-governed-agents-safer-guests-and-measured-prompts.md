---
title: "Chimera Agent 0.90.0: Governed Agents, Safer Guests, and Measured Prompts"
date: 2026-11-16
category: update
summary: "This release adds governance controls to agents, locks down guest access, measures prompt changes with a token baseline, and fixes cost accuracy, memory recall, and credential leaks."
version: "0.90.0"
---

## What the agent is now allowed to do

Before this release, `chimera agent` ran with a fixed set of hooks and tool permissions. If you wanted to know what governance would have decided about its actions, you had to guess. The new `chimera report governance` command changes that. It counts, per surface and over a configurable number of days, what governance granted, refused, raised to review, or withheld. Under `observe` mode, it also shows what `enforce` would have refused or sent to an approver. This gives you a dry run of a stricter policy before you turn it on.

`chimera agent` itself now runs on the same governed assembly as chat, assist, and tui. Its hooks come from the project it works in, and `--deny-tools` reaches deferred MCP tools. The agent no longer operates outside the governance framework the rest of the application uses.

The security model also got tighter for shared conversations. A guest turn accessed through a share link previously could reach the owner's other conversations, mailbox, calendar, skill bundles, MCP servers, global instructions, hooks, browser sign-ins, and other conversations' jobs. It had a shell and could run anything it might have edited, including verifiers, formatters, hooks, and git commands. Now it runs with the least privilege. It cannot read or write outside the conversation's folder or inside Chimera's own data, even through symlinks, junctions, or instruction imports. Rendered PNG and SVG charts refuse remote data URLs, and snapshots no longer follow links out of the workspace.

## What changed in how prompts are built and measured

MCP tool descriptions can now be cut to one line per server. Setting `"description_mode": "one_line"` in `mcp.json` shows the model one line of each tool description and serves the rest through a fenced `mcp_describe` call that honors the session's allow and deny lists, including through the ledger and governance wrappers. This is opt-in. The default remains whole descriptions because a pre-registered paired run of 540 iterations measured the cut at -24.4 percentage points of first-call tool selection, with a confidence interval of [-31.7, -16.2]. On tasks whose answer sits in the description tail, the choice is a coin flip. What the cut buys is also measured: attempts at forbidden actions fell 16.7 percentage points, from 27.5% to 10.8%, all of it from payloads in the tail of a tool description. Benign false positives were not inferior, with caveats.

A token and cost baseline is now available. `scripts/token_baseline.py` reads the usage, run, and trace logs under the desktop home and prints only aggregates per surface, with coverage of price and cache and a 30-turn floor below which only the count is shown. Its totals match the Cost screen over the same rows. The `bench/token_baseline/` directory holds the pre-registration and the first reading. This means you can track prompt cost changes across versions without relying on memory or ad-hoc measurements.

Tool schema snapshots are now kept per surface. `tests/prompt_snapshots/schema.<surface>.txt` holds the tool schema that the Code turn, design turn, CLI, cron, and bot send, assembled by each surface's own functions. A changed tool description shows up as a diff. The prompt lint totals it per surface, and `docs/tool-schema-by-surface.md` tabulates it with an estimated token count. This makes prompt changes visible in code review.

## What was broken and is now fixed

Memory recall previously dropped facts written in Russian, Chinese, or Japanese. The admission gate used an ASCII-only word splitter, so a fact that recall had just found was discarded as irrelevant without any message. It now reads text the same way recall does, and the code search index follows suit.

Cost numbers now agree across the application. The Cost screen showed a cache hit rate capped at 50%. The daily spend cap did not count autonomous `solve` runs and the blog writer the same way the screen did. Only one cron daemon runs per home now, so a scheduled job no longer fires twice when the app and `chimera serve --cron` are both open.

Links in a reply can no longer carry the app's credentials away. The desktop window stays on its own pages, and other sites open in your browser. The access tokens it holds are given only to the app itself, never to a site it is sent to or to the dev-server and Design previews inside it.

Pasted credentials no longer sit in chat session files. Chat transcripts are masked on disk. Writes from another origin are refused when no server token is set. The attachment and dictation uploads get the same origin check as skill uploads. A non-ASCII bearer header now gets a 401 instead of a 500.

The Storage card previously listed only worktrees in the system temp folder, missing the project's durable folder. On one machine, that meant 89 checkouts and 72.9 GiB went unaccounted for. It now lists them with size, age, and the reason each still exists, warns above a configurable limit (`CHIMERA_WORKTREE_LIMIT_GB`, default 50), and offers to archive conversations idle for a configurable number of days (`CHIMERA_WORKTREE_IDLE_DAYS`, default 14) through the existing archive route. Nothing is deleted automatically.

A retry after a failed verification now actually escalates. It raises the reasoning effort, then moves to the next single model, instead of rerunning the same model while the receipt claimed fusion. Fusion no longer joins any turn that carries tools, including "fuse this turn." Each attempt in the receipt records the model and effort actually sent.

Every HTML page the server hands out now carries a Content-Security-Policy. FastAPI's `/redoc` and `/docs/oauth2-redirect`, which were served outside the token guard with no policy and loaded a CDN script onto the app's origin, are off. `/api/docs` sends a policy naming exactly what Swagger loads. A stray `.htm` or `.xhtml` at the bundle root is policed like `.html`. A new test requests every page and enumerates every route outside the API so the next one cannot ship without a policy.

Upgrade with `pip install chimera-agent --upgrade`. The full release notes are at [Chimera Agent v0.90.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.90.0).
