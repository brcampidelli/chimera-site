---
title: "Chimera Agent 0.92.0: Cost receipts, planner control, and settings search"
date: 2026-11-22
category: update
summary: "Cost receipts now use OpenRouter's public price index for runs outside serve. The planner is configurable per lane, and Desktop settings search finds the routing table."
version: "0.92.0"
---

## What actually changed for agent builders

Three friction points got addressed in this release: opaque cost tracking outside the `serve` environment, a planner that couldn't be turned off where it got in the way, and a Desktop settings panel that hid the routing table from search.

None of these were catastrophic. They were the kind of papercuts that make you open a second terminal to grep a log file, or click through four tabs to find the one dropdown you need. The fixes are small, but they remove steps from workflows that run dozens of times a day.

## Cost receipts that match what you're actually billed

Before 0.92.0, runs executed outside `serve` had to guess at model pricing. The framework didn't have access to the same rate data that the hosted environment used, so receipts could drift from what OpenRouter actually charged. If you were tracking per-agent costs for a client or a budget, you had to reconcile manually.

Now those runs pull from OpenRouter's public price index. Exact model slugs get their own rates instead of falling back to a family-wide estimate. Strict calls preserve the quote that was used at admission time, so the receipt reflects the price the call was accepted at, not a rate fetched after the fact. The `gpt-oss-20b` catalogue entry also got refreshed, which matters if that model was part of your cost baseline.

The change doesn't affect runs inside `serve`—those already had accurate receipts. It closes the gap for everything else: CLI invocations, cron jobs, pipeline steps that run on a workstation instead of the server.

## The planner is no longer mandatory

`use_planner` is now a configuration flag on Kanban lanes, API runs, and workflow solve steps. The planner stays on by default, so existing behavior doesn't change unless you opt out.

Why this matters: the planner adds a reasoning pass before execution. That's useful when the agent needs to decompose a vague request into concrete steps. It's overhead when the steps are already explicit—when a lane triggers a known sequence, or a solve step calls a single tool with structured input. In those cases, the planner could introduce latency and token cost without improving the result. Now you can disable it where it doesn't pull its weight.

## Desktop settings you can actually find

The Desktop app's settings search now indexes the model-by-role routing table. Previously, searching for "routing" or a role name returned nothing, even though the setting existed. You had to know where it lived and navigate there manually. That's fixed.

Two localization fixes shipped alongside: routing and receipt copy now read correctly in Brazilian Portuguese, and new conversations and answer-only turns show clearer status indicators. These aren't features, but they remove ambiguity from the UI state.

## What's still experimental

Several experiments ran alongside this release. Memory extraction got a benchmark that was inconclusive—the 6,000-character cap and global model remain the defaults, with an explicit extraction model and deterministic pre-filter available as opt-in. Cron model tiers tested a cheaper model on synthetic jobs; it was fully correct on seven of eight, but the benchmark didn't cover production workloads, so defaults stay unchanged. Design refinement and prompt proportionality experiments remain off by default. None of these change what your agents do unless you turn them on.

## What to do now

If you track costs for runs outside `serve`, check a receipt against your OpenRouter billing. The numbers should align without manual adjustment. If you have lanes or solve steps where the planner adds latency without value, set `use_planner: false` on those configurations. If you couldn't find the routing table through Desktop search before, try it now.

Desktop installers remain unsigned and may prompt on first launch. The app verifies signatures on updater bundles. Full notes: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
