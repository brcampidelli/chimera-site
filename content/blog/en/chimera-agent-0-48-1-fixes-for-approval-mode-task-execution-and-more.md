---
title: "Chimera Agent 0.48.1: Fixes for Approval Mode, Task Execution, and More"
date: 2026-09-03
category: update
summary: "Chimera Agent 0.48.1 addresses critical issues with approval mode, task execution, and cost reporting, ensuring smoother operation and better security."
version: "0.48.1"
---

## Approval Mode Now Works as Intended

The `CHIMERA_APPROVAL_MODE=allow` setting now functions correctly across all surfaces, including the desktop app and `chimera serve`. Previously, this setting only worked on `solve` and `crew`, leaving most users with unexpected refusals. This fix ensures that dangerous tools are no longer blocked when reading untrusted content, aligning with the setting's original intent. Benchmarks show that with an approver, the system blocks 85.7% of attacks while allowing all honest work, a significant improvement over the previous 50% refusal rate for legitimate tasks.

## Unified Task Execution Screen

The Work screen has been streamlined to reduce redundancy and improve usability. Previously, users had to choose between four different forms for running tasks, each requiring the same input. This led to inefficiency and frustration, as trying a different method meant retyping the task. Now, a single screen with four buttons handles all task execution modes, simplifying the process and reducing the number of tabs from five to four. This change also ensures that tasks and checks are consistent across modes, while attempts, roles, and worker slots remain specific to each mode.

## Key Fixes and Additions

- **Empty Variables No Longer Crash the App:** An empty `CHIMERA_GUARD_CHAT` variable in the `.env` file previously prevented the app from starting. This has been fixed, with empty values now treated as unset rather than causing a crash.
- **Cost Meter for Expensive Models:** The cost meter now correctly reports costs for all models, including expensive ones like `claude-opus-5` and `gpt-5.5`. Previously, these models showed unknown costs due to a missing function call.
- **Focus Ring for Buttons:** The Button component now correctly adopts the shared focus ring, fixing a visual inconsistency.

## New Feature: Deferred Tool Loading

The `CHIMERA_DEFER_TOOLS` setting has been added to reduce token usage by deferring the loading of tool schemas until they are needed. Benchmarks show a 26% reduction in cost per completed task, though the impact on task completion rates remains inconclusive. This setting is off by default due to the mixed results.

## What to Do Next

Upgrade to Chimera Agent 0.48.1 to take advantage of these fixes and improvements. For detailed release notes, visit [Chimera Agent v0.48.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.1).
