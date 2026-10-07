---
title: "Chimera Agent 0.50.0: Visibility, Control, and Reliability"
date: 2026-10-07
category: update
summary: "Chimera Agent 0.50.0 introduces transparency, better control, and fixes for silent failures."
version: "0.50.0"
---

## Visibility into Agent Operations

Previously, the agent's task list was invisible to users, even though the `RunState.tasks` field existed. Now, the agent displays its task list in real-time, marking items as in progress or completed. This list persists through context compaction, ensuring that long runs don't lose track of their plans. This change addresses a common frustration where users couldn't see what the agent was doing, especially during extended operations.

## Reachability Beyond the Console

Agents running unattended, such as cron jobs, couldn't effectively communicate with users when approval was needed. By setting `CHIMERA_APPROVAL_WEBHOOK`, users can now receive approval requests in their preferred channels. This change ensures that agents can reach users even when no one is actively monitoring the console. Previously, these requests would silently fail if no delivery method was available, leading to unexpected decisions.

## Governance Control

The governance feature, which includes an audit log, was previously inaccessible. Although the Security screen displayed the audit log, there was no way to enable it. Now, users can turn governance on using the `CHIMERA_GOVERNANCE` parameter. This change provides users with the ability to monitor and control their agent's security settings, addressing a gap in transparency and control.

## Improved Model Handling

Agents previously assumed a default token window size for models not explicitly catalogued, leading to context overflows and run failures. With this release, the agent now retrieves the correct token window size from the live index for uncatalogued models. Additionally, five catalogue entries were corrected to reflect accurate token windows and pricing. This change prevents runs from failing due to incorrect assumptions about model capabilities.

## Enhanced Traceability

Traces now record which backend served each step, not just which model answered. This is particularly important for models like those on OpenRouter, where a single model slug can represent a pool of endpoints with varying capabilities and costs. Previously, users couldn't distinguish between different endpoints, leading to confusion and inaccurate measurements. This change improves transparency and accuracy in performance tracking.

## What to Do Next

To take advantage of these improvements, update to Chimera Agent 0.50.0 and review the [release notes][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) for detailed instructions on configuring new features like `CHIMERA_APPROVAL_WEBHOOK` and `CHIMERA_GOVERNANCE`.
