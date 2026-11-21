---
title: "Chimera Agent 0.92.0: Predictable costs, configurable planning"
date: 2026-11-21
category: update
summary: "Cost receipts now use real-time pricing, the planner is explicitly configurable, and Desktop settings search covers the routing table."
version: "0.92.0"
---

## Cost receipts that match what you actually pay

Before 0.92.0, cost tracking outside `serve` relied on a static catalogue that drifted from live provider rates. A run could report a cost that looked plausible but was wrong—sometimes by enough to throw off a budget calculation. The mismatch was especially visible when you used an exact model slug that the catalogue didn't recognise: the system fell back to a generic rate or simply showed nothing useful.

This release switches to OpenRouter's public price index for runs that don't go through `serve`. Exact model slugs now resolve to their own rates instead of being lumped into a family average. When a call is strict—meaning the provider and model are locked at admission—the receipt preserves the quote that was accepted, so the number you see is the number that was actually authorised. The `gpt-oss-20b` catalogue entry has also been refreshed to match current pricing.

The practical effect is that you can take a receipt from a batch run, multiply it by your expected volume, and get a number that holds up. No more manual spot-checks against the provider dashboard.

## The planner is now a switch you control

Until now, the planner was always on. You couldn't turn it off for a specific Kanban lane, an API call, or a workflow solve step. That meant every task paid the latency and token cost of a planning pass, even when the task was trivial or the instructions were already explicit enough that planning added nothing.

Version 0.92.0 exposes `use_planner` as a configuration flag. Set it to `false` on a lane, a run, or a solve step, and the agent skips the planning phase entirely. The default remains `true`, so existing workflows don't change behaviour unless you opt in. The flag is available in all three surfaces—Kanban configuration, the API, and workflow definitions—so you can be selective. A lane that handles simple classification can skip planning while a neighbouring lane that does multi-step research keeps it.

Why not just make planning smarter? Because the cost of guessing wrong is higher than the cost of giving you the switch. A heuristic that tries to decide whether planning is needed will sometimes decide wrong, and debugging that is harder than flipping a boolean you control.

## Desktop settings you can actually find

Settings search in the Desktop app previously missed the model-by-role routing table. You could type "routing" or "role" and get no results, even though the table was right there in the settings panel. That's fixed: the routing table is now indexed and surfaces in search.

Two localisation fixes ship in this release as well. The routing table and receipt copy now read correctly in Brazilian Portuguese—before, some labels were falling back to English. New conversations and answer-only turns also show clearer status messages, so you're not left staring at a spinner wondering whether the model is thinking or the connection dropped.

## What stays experimental

Several experiments received updates without changing defaults. The memory extraction benchmark was inconclusive, so the 6,000-character cap and global model remain. You can opt into an explicit extraction model and a deterministic pre-filter if you want to test the newer path. The cron model tiers experiment showed full correctness on seven of eight synthetic jobs, but synthetic jobs aren't production jobs, and the defaults are unchanged. The lean Design refinement and prompt proportionality experiments also remain off by default.

Desktop installers are still unsigned and may prompt on first launch. The app verifies signatures on updater bundles.

Upgrade with `pip install chimera-agent --upgrade` and set `use_planner` where you need it. The full changelog is at [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
