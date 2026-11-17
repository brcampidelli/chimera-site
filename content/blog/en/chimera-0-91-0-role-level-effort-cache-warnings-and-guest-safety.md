---
title: "Chimera 0.91.0: Role-level effort, cache warnings, and guest safety"
date: 2026-11-17
category: update
summary: "Reasoning effort is now per role, the prompt cache warns when it degrades, guests no longer see internal tooling, and governance defaults to observe on new installs."
version: "0.91.0"
---

## Reasoning effort moves to the role level

Before this release, setting a reasoning effort on an agent file applied a blanket value that was easy to misunderstand. The agent file’s `effort` field now controls only that subagent’s own calls. The code roles and the fusion cast get their effort from a new environment variable, `CHIMERA_ROLE_EFFORTS`, which sets the effort per role rather than per agent. A repository’s agent file cannot raise the effort the owner chose, so a pulled agent cannot silently burn through more reasoning tokens than intended.

This matters because effort is a cost lever. A high effort on a summarisation role wastes money; a low effort on a planning role produces brittle plans. The previous flat setting forced a trade-off that did not match how roles actually consume reasoning. Now you set effort where it applies, and the system refuses overrides that would increase it.

## The prompt cache warns when it stops working

Prompt caching saves money only when it actually hits. Before, a conversation could drift into low cache-hit territory without any signal. You would notice the cost later, in a spreadsheet. Now, when the share of prompt tokens read from cache falls below 80% across the turns whose route reports cache, the turn receipt and the status bar warn once, with the main cause. The warning rearms when the cache recovers and degrades again. Routes that never report cache produce no warning, so you are not nagged about something that was never expected to cache.

Worth also gets a cost-per-resolved-run figure. It shows the total cost of all runs divided by the ones that passed, the same per verifier-confirmed run, and the share of runs with a known price. When any run lacks a price, Worth shows a dash instead of a misleading number. The table stays sorted by name, not ranked, because Worth is a diagnostic, not a leaderboard.

## Guests see answers, not internal workings

A shared conversation previously leaked the owner’s tool arguments, edit diffs, approval previews, browser screenshots, verifier output, instruction sources, cost receipts, and host paths. A guest watching live, replaying, or inspecting the model’s context could reconstruct far more than the answers. That hole is closed. Guests now receive only the answers and the tool names and status, through an allowlist that drops any frame type it does not recognise. The owner’s internal workings stay on the owner’s screen.

## Governance defaults to observe on new data folders

A fresh install now starts with governance in `observe` mode, recorded in `governance_default.json`. Under `observe`, the kernel’s fixed hard blocks refuse commands like `rm -rf /`, `mkfs`, or curl piped into a shell. What `enforce` would send to review is recorded, not asked. An existing data folder keeps `off` and gets a notice in the log and a dismissible note in Settings. An explicit `CHIMERA_GOVERNANCE` still wins, and an empty one counts as unset. This means a new install is locked down from the first run, without requiring the person setting it up to read a separate security page.

## Scheduled jobs get their own model, effort, and step budget

A cron job can now name its own model, effort, and step budget through `cron add/edit --model --effort --max-steps` or the Schedule screen. Empty values inherit from `serve`, as before. Invalid values are refused at save; a hand-edited `jobs.json` with bad values loads them with a warning instead of dropping the job silently. The job’s last delivered answer, up to 2 KB, closes its context so it stops repeating itself across invocations. A delivery the destination refused counts toward the failure brake and is never treated as delivered. Webhook jobs naming these fields are refused, because a webhook carries its own configuration.

## What to do now

Upgrade with `pip install chimera-agent --upgrade` and restart your server. If you set reasoning effort in agent files, move those values to `CHIMERA_ROLE_EFFORTS` and set the agent file’s `effort` only for subagent calls. Check your shared conversations: guests will no longer see internal frames, and you do not need to change anything to get that protection. New installs get `observe` governance by default; existing folders stay as they are unless you set `CHIMERA_GOVERNANCE` explicitly. Full notes at [Chimera Agent v0.91.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.91.0).
