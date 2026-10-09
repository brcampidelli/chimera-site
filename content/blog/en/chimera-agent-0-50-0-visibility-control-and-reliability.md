---
title: "Chimera Agent 0.50.0: Visibility, Control, and Reliability"
date: 2026-10-09
category: update
summary: "Chimera Agent 0.50.0 introduces visibility into agent tasks, approval webhooks, governance controls, hybrid retrieval, and fixes for model context windows."
version: "0.50.0"
---

## Visibility into Agent Tasks

One of the most significant changes in Chimera Agent 0.50.0 is the introduction of task visibility. Previously, the `RunState.tasks` field existed but was never populated, leaving users in the dark about what the agent was doing. Now, the agent maintains a task list that is displayed on the screen during a run. Each task is marked as in progress or finished, and the list survives context compaction. This means that even during long runs, the agent doesn't forget its plan, providing users with a clear view of its progress.

## Approval Webhooks for Unattended Runs

Another major improvement is the ability for the agent to reach out for approvals even when no one is at the console. By setting the `CHIMERA_APPROVAL_WEBHOOK` environment variable to a channel webhook, the agent can now send approval questions to a designated channel. This change addresses a previous issue where unattended surfaces, including cron jobs, would silently make decisions without user input. Now, if there's no way to deliver the question, the agent explicitly states that it is `unreachable`, ensuring transparency.

## Governance Controls

The governance kernel, which was previously invisible and inactive, can now be turned on. The `CHIMERA_GOVERNANCE` parameter ships `off` by default, but users now have the ability to enable it. The Security screen also indicates the current state of governance, providing users with the necessary control and visibility over this critical feature.

## Hybrid Retrieval in `chimera find`

The `chimera find` command has been enhanced with hybrid retrieval, combining keyword and vector search methods. This hybrid approach, which is fixed before the run starts, has been shown to outperform keyword search by 6.25 points on the project's own corpus. Importantly, vector search alone underperforms compared to keyword search, which is why the hybrid method is now the default. This change ensures more accurate and reliable retrieval results.

## Fixes for Model Context Windows

Previously, models not listed in the hand-checked catalogue were assumed to have a 128,000-token window, leading to context overflows and run failures for models with smaller windows. This release fixes this issue by pulling the context window from the live index when the catalogue doesn't know the model. Additionally, five catalogue entries were corrected to reflect the actual context windows served by their providers, and one price was adjusted to match verified data.

## Additional Improvements

Traces now record which backend served each step, not just which model answered. This is particularly important for models on OpenRouter, where a single model slug can represent a pool of endpoints with varying context windows and prices. This change ensures that users have a clearer understanding of the resources being used.

## Honest Caveats

- **The installers are unsigned.** First run shows a SmartScreen warning on Windows and a Gatekeeper warning on macOS. That is expected; the *updater* is signed, which is the part that matters for what lands on your machine after install.
- **Governance ships `off`.** The control exists so you can turn it on, not because it is on.
- **The compaction summariser ships off**, behind `AgentConfig.summarise_compaction`. Compaction itself has never fired in ordinary use — measured at 0 times across 137 runs — so the summariser is built and unproven rather than built and needed.
- **Cancellation is cooperative.** Stopping a run stops it before its next model call; calls already in flight finish and are billed.

For full details, including the measurements that informed these changes, refer to the [changelog][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0).
