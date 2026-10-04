---
title: "Chimera Agent 0.49.3: Fixes for Real-World Use"
date: 2026-10-04
category: update
summary: "Version 0.49.3 addresses critical issues found during real-world usage, improving clarity, reliability, and cost-efficiency."
version: "0.49.3"
---

## Clearer Error Messages for MCP Operations

One of the most costly issues in previous versions involved MCP data reading. When a run was tainted due to untrusted content, the error message was ambiguous, leading users to retry the same operation multiple times without success. This resulted in unnecessary expenses and frustration. Now, the error messages are specific to each scenario, clearly stating whether retrying will help and suggesting actionable alternatives like using the pause-for-approval switch or avoiding untrusted content altogether.

## Improved MCP Server Testing

The MCP Test button previously only verified server connectivity, leaving users unaware if the agent could actually use the server. This led to wasted time and resources when runs failed due to unloaded servers. The Test button now explicitly reports whether the agent can utilize the server, providing different messages for different causes and guiding users on how to resolve the issue.

## Accurate Verification Status

Runs previously reported `verified: True` based on an instant snapshot, which could be misleading if the files changed afterward. Now, runs include a `delivered_matches_verified` flag, and the Runs list shows a badge when the files on disk no longer match the verified state. This ensures users are aware of discrepancies and can take appropriate action.

## Correct Skill Installation Errors

Skill installation failures were previously attributed to GitHub's hourly limit for anonymous downloads, even when the limit was not the issue. The error messages now correctly identify the host that refused the request and ensure the token reaches both hosts. Additionally, 429 errors are retried with the server-specified wait time, reducing unnecessary retries.

## Precise File Write Refusals

Writing files was sometimes refused with misleading messages that compared directories instead of paths. This caused the agent to exhaust its budget retrying the same operation. The refusal messages now accurately describe the path comparison and explain the workspace-relative globs pattern, preventing confusion and wasted attempts.

## Updated Model Defaults

The model defaults were outdated, with some models being a generation behind and others at risk of withdrawal. The defaults have been updated to more recent and stable models, ensuring better performance and reliability. Additionally, `.env.example` no longer sets defaults that are significantly more expensive or include withdrawn models.

These changes are based on real-world usage and aim to improve the user experience by addressing common pain points. For the full details, see the [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
