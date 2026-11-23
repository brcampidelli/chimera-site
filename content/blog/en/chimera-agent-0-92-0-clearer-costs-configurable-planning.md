---
title: "Chimera Agent 0.92.0: clearer costs, configurable planning"
date: 2026-11-23
category: update
summary: "Cost receipts now use public pricing for runs outside serve, the planner can be disabled per lane or run, and Desktop settings search finds model routing."
version: "0.92.0"
---

## Cost receipts that match the model you actually called

Previous releases could leave you guessing what a run really cost. Receipts depended on context that was not always available, and a model that did not match a catalogue entry could fall back to a rate that did not reflect the call you made. That made it hard to audit spend or compare runs.

Version 0.92.0 changes how receipts are built for runs outside `serve`. Those runs now use OpenRouter's public price index. Exact model slugs get their own rates instead of inheriting a broader or less precise entry. Strict calls retain the quote used at admission, so the receipt reflects the price that was accepted when the call was admitted rather than a later or different estimate. The `gpt-oss-20b` catalogue entry has also been refreshed.

For anyone running agents outside the served environment, this removes a source of ambiguity. You can look at a receipt and know it came from public pricing, tied to the specific model slug, with strict calls preserving the quote that governed admission. The change does not alter how models are selected. It changes what the receipt reports after the run.

## Planning becomes a per-run decision

The planner was previously a global behavior. If you wanted a lane, an API run, or a workflow solve step to skip planning, there was no direct switch for that context. You either accepted the default or changed behavior more broadly than the task required.

`use_planner` is now configurable on Kanban lanes, API runs, and workflow solve steps. The planner remains on by default. That default matters: existing setups keep their current behavior unless you explicitly opt out. The new setting gives you a narrower control point for cases where planning adds latency or steps that a particular run does not need.

This is useful when a lane handles a constrained task, when an API caller knows the input is already shaped for direct execution, or when a solve step should proceed without an additional planning pass. You can now express that at the lane, run, or step level instead of changing the whole system.

## Desktop settings you can actually find

Settings search did not surface the model-by-role routing table. If you did not already know where it lived, you could spend time clicking through the interface to find it. That is fixed: search now finds the routing table.

Two smaller Desktop fixes are included. Routing and receipt copy now reads correctly in Brazilian Portuguese. New conversations and answer-only turns also show clearer status, so the interface tells you what is happening instead of leaving the state ambiguous.

## What to do now

Update to 0.92.0 and check the three areas that changed. If you run agents outside `serve`, review a receipt and confirm it reflects the model slug and admission quote you expect. If you have lanes or API runs that do not need planning, set `use_planner` to false at that level and leave the default on everywhere else. If you use Desktop, search Settings for the model-by-role routing table and verify the status text in a new conversation.

Full release notes: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
