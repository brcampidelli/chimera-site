---
title: "Chimera Agent 0.49.3: Fixing What Broke When Used, Not Just Read"
date: 2026-10-06
category: update
summary: "Six defects fixed after real-world testing, including silent write failures, misleading test results, and outdated model defaults."
version: "0.49.3"
---

## When Tools Lie About Their Own State

The most expensive lesson came from MCP data reading. A task costing US$5.11 produced zero files because the refusal message didn't distinguish between human denial and impossible approval. Three identical attempts burned the budget before users realized retries couldn't work. Now each refusal case explains itself: human denial shows who declined, system denial names the configuration block, and HTTP cases explicitly state no approver exists while suggesting two solutions - enabling pause-for-approval or avoiding untrusted content.

## Verification That Wasn't

A `verified: True` badge with passing test logs became meaningless when subsequent writes altered the files. Users saw green checkmarks while working with unverified content. The system now tracks whether delivered files match the verified state and shows warning badges when they diverge. The original verification remains visible - it was accurate when given - but the current mismatch appears beside it.

## Defaults That Defaulted

Model assignments had drifted dangerously:
- The primary model was 4x more expensive than current options
- A preview model sat in a critical default slot
- Context windows fell short of tier requirements

New defaults match current price/performance (deepseek-v4-flash-0731 at 1/4 the cost) while maintaining capability. The .env.example file no longer suggests withdrawn models or prices from another era. Notably, model selection wasn't based on output quality testing - eight candidates all wrote files successfully - but on measurable factors: price, context window, and third-party benchmarks.

## What To Do Now

Update immediately if you use:
- MCP servers (test behavior changed)
- File verification (new mismatch detection)
- Model defaults (significant cost/performance changes)

The full technical details explain each fix's rationale: [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
