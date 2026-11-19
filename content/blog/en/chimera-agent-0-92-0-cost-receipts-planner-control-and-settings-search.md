---
title: "Chimera Agent 0.92.0: Cost receipts, planner control, and settings search"
date: 2026-11-19
category: update
summary: "Runs outside serve now show accurate per-model costs, the planner can be disabled per lane or API call, and Desktop settings search finds the routing table."
version: "0.92.0"
---

## What you pay is what you see

Cost tracking for runs outside `serve` was guessing. The system used a generic fallback that ignored the actual model you called. If you ran a strict admission check against a specific model slug, the receipt still showed the broad catalogue price. The numbers were directionally correct but wrong in detail, and that made cost audits unreliable.

Version 0.92.0 fixes this by pulling rates from OpenRouter's public price index. Exact model slugs now resolve to their own rates instead of inheriting a family average. Strict calls preserve the quote obtained at admission time, so the receipt matches the decision the system already made. The `gpt-oss-20b` catalogue entry has also been refreshed to reflect current pricing. If you track per-run costs or bill downstream consumers, the numbers you see are now the numbers that were actually used.

## Planner control where you need it

Before this release, the planner ran on every interaction. There was no way to turn it off for a specific Kanban lane, an API run, or a workflow solve step. That forced planning overhead onto tasks that didn't benefit from it—simple transformations, deterministic pipelines, or steps where you already knew the next action.

You can now set `use_planner` on individual lanes, API runs, and solve steps. The planner remains on by default, so existing workflows don't change behavior. The difference is that you can now opt out where planning adds latency without adding value. A lane that executes a single tool call doesn't need a planning phase. An API run that follows a fixed sequence doesn't need the model to decide what comes next. The control is granular: you disable planning per context, not globally.

## Settings you can actually find

Desktop settings had a search box that didn't search the model-by-role routing table. That table is where you assign models to roles like `assistant`, `tool`, or `vision`. If you forgot where it lived, you scrolled through panels until you found it. Now the search index covers it. Type a role name or a model slug, and the routing table surfaces in the results.

The same Desktop update fixes two localization gaps. Routing labels and receipt copy now read correctly in Brazilian Portuguese. New conversation indicators and answer-only turn status are also clearer, removing ambiguity about whether the system is idle or processing.

## What stayed experimental

Three experiments received updates without changing defaults. The memory extraction benchmark was inconclusive, so the 6,000-character cap and global model remain. You can opt into an explicit extraction model and a deterministic pre-filter if you want to test narrower memory behavior. The cron model tiers experiment showed full correctness on seven of eight synthetic jobs, but synthetic jobs are not production workloads. Defaults are unchanged. The lean Design refinement and prompt proportionality experiments also remain off by default.

## Get it now

Upgrade with `pip install chimera-agent==0.92.0`. Desktop installers are unsigned and may prompt on first launch; the app verifies signatures on updater bundles. Full notes at [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
