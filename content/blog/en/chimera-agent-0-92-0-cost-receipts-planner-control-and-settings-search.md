---
title: "Chimera Agent 0.92.0: Cost receipts, planner control, and settings search"
date: 2026-11-26
category: update
summary: "Cost receipts now use OpenRouter's public price index for runs outside serve. The planner is configurable per lane, and Desktop settings search finds the routing table."
version: "0.92.0"
---

## What changes for cost tracking

Before 0.92.0, cost receipts for runs executed outside `serve` relied on a static internal catalogue. If a model slug did not match exactly, the receipt showed a zero or a fallback rate that did not reflect the actual cost of the call. The `gpt-oss-20b` entry was stale, and strict admission calls lost the quote they were admitted with, making it impossible to audit why a particular run cost what it did.

This release switches those runs to OpenRouter's public price index. Exact model slugs now pull their own rates directly from that index. When a strict call is admitted, the receipt preserves the quote used at admission rather than recalculating it later. The `gpt-oss-20b` catalogue entry has been refreshed to match current pricing. Together, these changes mean the number you see in the receipt is the number that was actually charged, not an approximation from a stale lookup table.

## Planner control moves to where you configure the work

The planner was always on, and there was no switch to turn it off for a specific lane, an API run, or a workflow solve step. If you wanted a lane to execute without a planning phase, you had to work around the framework. That workaround broke when the default changed or when a workflow reused the lane definition.

Now `use_planner` is a setting on Kanban lanes, API runs, and workflow solve steps. The planner stays on by default, so existing configurations do not change behavior. Setting `use_planner: false` on a lane skips the planning phase for that lane only. The same setting on an API run or a solve step overrides the lane default for that execution. This puts the decision next to the work definition, where it belongs, instead of in a global flag or an environment variable.

## Desktop settings that are actually findable

The model-by-role routing table existed before this release, but settings search did not index it. You had to know where it lived and navigate to it manually. In Brazilian Portuguese, routing labels and receipt copy rendered incorrectly, and new conversations showed a status that did not make clear what was happening.

Settings search now finds the routing table. You can type a role name and reach the assignment directly. The routing and receipt copy reads correctly in Brazilian Portuguese. New conversations and answer-only turns show a clearer status, so you know whether the model is loading, thinking, or waiting on input.

## Experiments that did not change defaults

Three experiments landed in this release, and none of them change default behavior. The memory extraction benchmark was inconclusive; the 6,000-character cap and global model remain the defaults, with an explicit extraction model and a deterministic pre-filter available as opt-in. The cron model tier experiment showed full correctness on seven of eight synthetic jobs, but synthetic jobs are not production jobs, and the defaults are unchanged. The lean Design refinement and prompt proportionality experiments remain off by default.

These experiments are documented in the release notes for teams that want to test them on their own workloads. Do not enable them in production without measuring against your own data.

## What to do now

Upgrade with `pip install chimera-agent==0.92.0`. If you run cost-tracked workloads outside `serve`, check your receipts after the upgrade—the numbers will reflect OpenRouter's public index. If you have lanes that should skip planning, add `use_planner: false` to the lane definition. Desktop users on macOS and Windows should note that installers are unsigned and may prompt on first launch; the app verifies signatures on updater bundles after that. Full release notes are at [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
