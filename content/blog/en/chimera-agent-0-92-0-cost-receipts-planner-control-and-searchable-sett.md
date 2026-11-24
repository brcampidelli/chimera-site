---
title: "Chimera Agent 0.92.0: Cost receipts, planner control, and searchable settings"
date: 2026-11-24
category: update
summary: "Cost receipts now use live pricing, the planner can be toggled per-run, and Desktop settings search finds the routing table."
version: "0.92.0"
---

## What actually changed for agent builders

Three things in this release change how you run agents day to day. The rest are experiments that stay off by default, and they belong in the lab, not in your pipeline.

**Cost receipts stopped guessing.** Before 0.92.0, a run outside `serve` had no reliable price source. The receipt showed whatever the local catalogue had cached, which could be stale or missing for newer models. If you used an exact model slug that wasn't in the catalogue, the cost line was wrong or absent. That broke budgeting for anyone who pins a specific provider endpoint.

Now runs outside `serve` pull from OpenRouter's public price index. Exact model slugs get their own rates instead of inheriting a fuzzy match. Strict admission calls preserve the quote that was used when the call was admitted, so the receipt matches what was actually reserved. The `gpt-oss-20b` catalogue entry was refreshed as part of the same pass. If you track cost per run, the numbers are now reproducible.

**The planner became a switch.** The planner was always on. You couldn't turn it off for a single Kanban lane, a single API call, or a single solve step in a workflow. That meant every lightweight task paid the latency and token overhead of planning, even when the instruction was trivial or the model didn't benefit from decomposition.

With `use_planner`, you set it where it matters: on a lane definition, in an API run payload, or on a workflow solve step. The default is still on, so existing behavior doesn't shift. But if you have a lane that does nothing but format output, you can skip the planner and save a round trip. The same flag works across all three surfaces, so the mental model is one boolean, not three separate configs.

**Desktop settings became findable.** The model-by-role routing table was buried. You had to know which settings tab it lived under and scroll to it. Settings search now indexes it, so typing "routing" or a role name brings it up. That matters when you're switching between projects that use different models for the same role.

Two localization fixes shipped alongside: routing and receipt copy now read correctly in Brazilian Portuguese, and new conversations and answer-only turns show clearer status. The status change is small but removes ambiguity when a turn is waiting on a tool call versus waiting on a model response.

## What the experiments mean (and don't mean)

Four experiments landed, all opt-in and all off by default. None of them change production behavior unless you explicitly enable them.

Memory extraction got a benchmark run that was inconclusive. The 6,000-character cap and global model remain the defaults. You can opt into an explicit extraction model and a deterministic pre-filter, but there is no evidence yet that either improves recall in a measurable way. Enable them if you want to gather your own data.

Cron model tiers were tested on synthetic jobs. The cheaper tier was fully correct on seven of eight. That tells you nothing about your production cron jobs, because synthetic jobs are not your jobs. Defaults are unchanged. If you run high-volume cron, you can experiment with the cheaper tier and validate against your own success criteria.

Design refinement and prompt proportionality remain off by default. They are internal experiments with no user-facing surface yet. The notes reference them for transparency, not because you should touch them.

## What to do now

If you track costs, pull the latest image and run a job outside `serve`. Check the receipt against OpenRouter's published rates. If you pin exact model slugs, verify the rate line matches your provider.

If you have lightweight Kanban lanes, add `use_planner: false` to one lane and compare latency. The flag is documented in the run configuration schema.

If you use Desktop, open settings and search for a role name. Confirm the routing table appears.

Release notes with the full list: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
