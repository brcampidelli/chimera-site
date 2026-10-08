---
title: "Chimera Agent 0.50.0: Visibility, Control, and Hybrid Search"
date: 2026-10-08
category: update
summary: "This release fixes silent behaviors, adds governance controls, and improves retrieval with hybrid search."
version: "0.50.0"
---

## Tasks Are Now Visible

Agents previously kept an internal task list that was inaccessible during execution. `RunState.tasks` existed but was never populated. Now, tasks are displayed in real-time with progress markers, and the list persists through context compaction. This means long-running agents no longer lose track of their own plans mid-execution.

## Approval Requests Follow You

Approval workflows previously assumed a console was always attended. Three unattended surfaces—including cron jobs—could ask for human input but had no way to deliver the question if no one was watching. Setting `CHIMERA_APPROVAL_WEBHOOK` now routes approval requests to a specified channel. Systems without delivery capability correctly report `unreachable` instead of failing silently.

## Governance Can Be Enabled

The security audit log was previously a passive feature with no activation mechanism. `CHIMERA_GOVERNANCE` now provides a control to enable it, and the Security screen explicitly shows its current state. This was implemented because having an audit log that couldn't be turned on served no practical purpose.

## Hybrid Search Outperforms Keywords

`chimera find` previously used either keyword or vector search, with the decision made after the run started. Hybrid retrieval—combining both methods—now outperforms keyword-only searches by 6.25 points (p = 1.7e-04) on the project's own corpus. Vector search alone underperforms keywords, which is why the hybrid approach is now the default. The system also calculates costs upfront.

## Model Compatibility Fixes

Agents assumed uncatalogued models had a 128,000-token window, which caused crashes for the 31 models in the index that actually support 64,000 or fewer tokens. The system now checks the live index for unknown models. Five catalog entries were also corrected for inaccurate window sizes, and one pricing error (2.2x off) was fixed.

## Backend Visibility in Traces

Traces now record which backend served each step, not just which model answered. This matters because model slugs on OpenRouter can represent pools with wildly varying capabilities—one pool spans endpoints with 5x difference in context windows and 8.8x price variance. Previous performance claims about specific models were actually measuring pools; the changelog retracts affected benchmarks.

### What to Do Next

Update to 0.50.0 and review the [full changelog][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) for implementation details. Enable governance if needed, and test hybrid search with `chimera find`.
