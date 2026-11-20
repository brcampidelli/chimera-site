---
title: "Chimera Agent 0.92.0: Cost receipts, planner control, and searchable settings"
date: 2026-11-20
category: update
summary: "Runs outside serve now use real OpenRouter rates, the planner is configurable per lane, and Desktop settings search finds the routing table."
version: "0.92.0"
---

## What you pay is what you see

Cost tracking for runs launched outside `serve` was disconnected from reality. The framework used a stale internal catalogue that did not reflect what providers actually charged. If you ran an agent from a script or a test harness, the receipt showed a number that had no relationship to the invoice. That broke budgeting for anyone who iterates locally before deploying.

Version 0.92.0 wires those runs to OpenRouter's public price index. When you pass an exact model slug, the framework looks up that specific rate instead of falling back to a fuzzy match. Strict calls now retain the quote captured at admission time, so the receipt matches the cost the provider promised when the request was accepted. The `gpt-oss-20b` catalogue entry was also refreshed to reflect current pricing. The result is a single source of truth: the number on the receipt is the number you will see on your provider bill.

This matters because agent builders often test with cheap models and switch to larger ones in production. Without accurate per-model rates, cost comparisons between runs are meaningless. Now you can compare two planner runs side by side and trust that the difference in the receipt reflects a real difference in spend.

## The planner is no longer always on

Before this release, the planner ran on every turn, in every context. There was no way to disable it for a specific Kanban lane, an API call, or a workflow solve step. That forced a planning overhead onto tasks that did not benefit from it—simple retrieval, deterministic transformations, or steps where the next action is already known. The only workaround was to fork the workflow definition and hope nothing broke.

Now `use_planner` is a configuration flag. Set it on a lane, pass it in an API run, or attach it to a solve step. The planner stays on by default, so existing workflows do not change behavior. But when you know a step does not need a plan, you turn it off and save the round trip. That reduces latency and cost on pipelines that mix planning-heavy and planning-free stages.

## Desktop settings that you can find

Settings search in the Desktop app previously ignored the model-by-role routing table. You could search for "router" or "routing" and get no results, even though the table was the most complex configuration surface in the app. The only way to reach it was to scroll through the settings panel until you recognized it. That made onboarding harder for new users and slowed down experienced users who wanted to adjust role assignments quickly.

The search index now includes the routing table. Type a role name or a model and the search returns the matching entry. The same update fixes two localization bugs: routing labels and receipt copy now read correctly in Brazilian Portuguese, where truncated strings and missing translations made the interface confusing. New conversations and answer-only turns also show clearer status messages, so you know whether the agent is waiting for input or processing.

## What stays experimental

Several experiments received updates without changing defaults. The memory extraction benchmark was inconclusive, so the 6,000-character cap and global model remain. You can opt into an explicit extraction model and a deterministic pre-filter if you want to test the new path. The cron model tiers experiment showed full correctness on seven of eight synthetic jobs, but synthetic jobs are not production workloads, and the defaults are unchanged. The lean Design refinement and prompt proportionality experiments also remain off by default.

These experiments are documented in the linked notes. If you are running memory-heavy agents or scheduled cron workflows, the opt-in flags are worth testing in a staging environment.

## Get the release

Upgrade with `pip install chimera-agent --upgrade` and check the version with `chimera --version`. Desktop installers are unsigned and may prompt on first launch; the app verifies signatures on updater bundles. Full notes at [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
