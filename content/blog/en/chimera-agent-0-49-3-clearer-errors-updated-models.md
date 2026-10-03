---
title: "Chimera Agent 0.49.3: Clearer Errors, Updated Models"
date: 2026-10-03
category: update
summary: "Six fixes for misleading messages and outdated defaults, all found by building real projects with the framework."
version: "0.49.3"
---

## When MCP Reads Blocked Writes

Reading data over MCP previously tainted runs without explaining why writes failed. The error message lumped three distinct scenarios together: user denial, owner configuration, and cases where no human could possibly approve an HTTP request. Users saw identical refusal messages for all three, wasting time and budget on retries that couldn't possibly work. Now each case gets a specific explanation - particularly important for HTTP contexts where the message clearly states that approval is impossible and suggests either enabling pause-for-approval or avoiding untrusted content.

## Testing That Actually Tests

The MCP Test button previously verified server connectivity while silently hiding whether agents could actually use those tools. A server could pass the test while its tools remained unavailable to agents (when loading MCP servers at start was disabled). Now the test reports both connectivity and actual availability, with distinct messages explaining how to resolve each potential issue.

## Verification vs. Delivery

Run verification previously showed `verified: True` without indicating whether the current files matched those that were verified. A verified run could later contain completely different content (20/20 test failures in one observed case) with no visual indication. Runs now track `delivered_matches_verified` and display clear badges when disk contents diverge from the verified state.

## Model Defaults Updated

The default model lineup drifted behind current offerings:
- Base model changed from `deepseek-chat-v3.1` (0.25/0.95) to `deepseek-v4-flash-0731` (0.065/0.18)
- Top tier model replaced `deepseek-r1` with `z-ai/glm-5.3`
- Fusion judge and panel seats updated to current generation models

These changes reflect measured improvements in price, context window size, and third-party benchmarks - not unverified quality claims. The update also removes preview models from default positions where users didn't explicitly choose them.

## Other Fixes
- Skill installation errors now correctly identify which host refused the request
- Absolute path write permissions show clear comparisons to workspace-relative glob patterns
- `.env.example` no longer suggests deprecated models or incorrect pricing

Update with `pip install --upgrade chimera-agent` or see [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3) for full details.
