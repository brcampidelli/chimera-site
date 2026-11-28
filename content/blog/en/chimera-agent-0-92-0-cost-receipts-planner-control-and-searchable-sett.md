---
title: "Chimera Agent 0.92.0: Cost receipts, planner control, and searchable settings"
date: 2026-11-28
category: update
summary: "Cost receipts now use OpenRouter's public price index for runs outside serve, the planner is configurable per lane, and Desktop settings search finds the model routing table."
version: "0.92.0"
---

## What changed for cost receipts

Runs executed outside `serve` previously relied on a static or incomplete price catalog. When a model slug did not match exactly, the receipt either showed a wrong rate or omitted the cost line entirely. That made it difficult to audit spending on fine-tuned variants or newly released models.

Version 0.92.0 switches those runs to OpenRouter's public price index. Exact model slugs now pull their own rates directly from the index. Strict calls also preserve the quote that was accepted at admission, so the receipt reflects the price the agent actually committed to, not a later estimate. The `gpt-oss-20b` catalogue entry has been refreshed to match current pricing.

For anyone who tracks per-run costs outside the `serve` path, receipts are now accurate without manual correction. If a model is listed in the public index, the agent prices it correctly. If the slug is unknown, the receipt makes that clear instead of silently defaulting to zero.

## The planner is no longer always on

Before this release, the planner ran on every lane, every API call, and every workflow solve step. There was no way to disable it for tasks where planning added latency without improving the result. Teams that wanted faster execution on simple lanes had to work around the framework.

`use_planner` is now a configuration flag exposed on Kanban lanes, API runs, and workflow solve steps. The planner stays on by default, so existing behavior does not change unless you opt out. Setting the flag to `false` on a lane skips the planning phase entirely and proceeds directly to execution.

This matters most for lanes that handle deterministic, single-step operations. A lane that fetches a known endpoint or transforms a payload with a fixed schema does not benefit from a planning pass. Removing it cuts latency and reduces token consumption without affecting correctness. The flag is per-lane, so you can keep the planner on for ambiguous tasks and turn it off for mechanical ones within the same project.

## Desktop settings are searchable

Settings search in the Desktop app previously did not index the model-by-role routing table. Finding which model was assigned to a specific role required scrolling through the full list. That friction grew as teams added more roles and fallback models.

Search now covers the routing table. Typing a role name or model slug in the settings search bar returns the matching routing entries directly. The same update fixes routing and receipt copy in Brazilian Portuguese, where truncated labels made the routing table harder to read. New conversations and answer-only turns also show clearer status indicators, so you know whether the agent is waiting for a model response or processing a tool call.

## Experiments that stayed opt-in

Several experiments landed without changing defaults. Memory extraction with an explicit model and deterministic pre-filter is available but off. The benchmark was inconclusive, so the 6,000-character cap and global model remain. A cheaper cron model tier was tested on synthetic jobs and scored seven out of eight correctly, but production workloads were not measured. Design refinement and prompt proportionality experiments also remain off by default.

These are available behind feature flags for teams that want to test them in their own environments. Nothing changed automatically.

## What to do now

Upgrade with `pip install chimera-agent==0.92.0`. If you run agents outside `serve`, check your next receipt to confirm the pricing matches OpenRouter's public index. For lanes that do not need planning, add `use_planner: false` to the lane configuration. Desktop users can open settings and search for a role name to verify the routing table is indexed.

Full release notes: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
