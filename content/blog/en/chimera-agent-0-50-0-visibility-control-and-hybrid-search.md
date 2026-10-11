---
title: "Chimera Agent 0.50.0: Visibility, Control, and Hybrid Search"
date: 2026-10-11
category: update
summary: "This release fixes silent behaviors, adds missing controls, and improves retrieval with hybrid search."
version: "0.50.0"
---

## Tasks Are Now Visible

Agents previously kept an internal task list (`RunState.tasks`) that was never exposed or persisted. Long runs could lose track of their own progress during context compaction. Now, the active task is displayed during execution, and completed tasks are struck through. The list survives compaction, so agents no longer forget their plan mid-run.

## Approval Requests Follow You

Three unattended execution surfaces (including cron jobs) could request approvals, but the mechanism was opaque. If configured with `CHIMERA_APPROVAL_WEBHOOK`, agents now route approval questions to the specified channel instead of silently failing when no console is available. The system also explicitly reports `unreachable` states when delivery isn't possible.

## Governance and Retrieval Improvements

The trust kernel (`CHIMERA_GOVERNANCE`) previously had no activation control despite logging security events. It now ships disabled by default with a visible toggle. For retrieval, `chimera find` now uses hybrid search (keyword + vector) by default after tests showed it outperforms keyword-only by 6.25 points (p = 1.7e-04) on the project's corpus. Vector search alone underperforms, justifying the fused approach.

## Model Handling Fixes

Agents assumed uncatalogued models had 128k-token windows, causing crashes for the 31 models (of 431 indexed) that actually serve ≤64k. The system now checks the live index for unknown models. Five catalog entries were corrected for inflated window sizes, and one pricing error (2.2x off) was fixed.

## Traceability and Caveats

Traces now record which backend served each step, not just which model answered. This matters for services like OpenRouter where model slugs represent pools with 8.8x price variations. The changelog retracts some performance claims that mistakenly compared pooled measurements.

Key limitations remain: installers are unsigned (though updaters are signed), governance ships disabled, and the compaction summarizer is off by default as it's unused in practice (0 triggers across 137 measured runs). Cancellation is cooperative - active calls complete before stopping.

See [Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) for measurements and full changelog. To update: `pip install --upgrade chimera-agent`.
