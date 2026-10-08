---
title: "Chimera Agent 0.49.3: Fixes for Real-World Use"
date: 2026-10-05
category: update
summary: "Version 0.49.3 addresses critical issues discovered during real-world usage, improving clarity, reliability, and cost-efficiency."
version: "0.49.3"
---

## MCP File Writing Issue: Clarity and Cost

One of the most impactful fixes in this release addresses a costly issue with MCP file writing. Previously, when reading data over MCP, the run would halt without writing files, and the error message was ambiguous. This led to repeated attempts, each incurring costs without any progress. For example, four runs of the same task cost **US$ 5.11** without producing any files, while the same task using built-in tools succeeded on the first attempt for **US$ 0.37**.

The error message now distinguishes between three scenarios: human refusal, configuration denial, and the absence of an approver. It also suggests actionable solutions, such as using the pause-for-approval switch or avoiding untrusted content in the run. This change prevents unnecessary retries and reduces costs.

## MCP Test Button: Improved Feedback

Another significant improvement is the MCP Test button. Previously, it only confirmed server connectivity, misleading users into thinking the agent could use the server. In reality, the agent couldn't access the server because loading MCP servers at start was off by default. This led to wasted time and resources, as seen in a case where **twenty-two tool calls over nineteen minutes** were made without using the server.

The Test button now provides feedback on whether the agent can use the server, with different messages for different causes. This ensures users understand the necessary steps to enable server usage.

## Verified Status: Accurate Representation

The `verified` status previously indicated an instant verification but didn't account for changes after the verification moment. This led to confusion when the same command executed against the resulting tree produced **20 failures out of 20 runs**. The status now includes `delivered_matches_verified`, and the Runs list shows a badge when the files on disk no longer match the verified state. This provides a clearer picture of the run's outcome.

## Skill Installation: Correct Error Messaging

Skill installation failures previously blamed the wrong limit, suggesting retries or setting `GITHUB_TOKEN` when the issue was unrelated. The token now reaches both hosts, and error messages accurately identify the refusing host. This prevents unnecessary retries and ensures users take the correct action.

## File Writing: Clear Refusal Messages

File writing refusals were previously unclear, especially when an absolute path was declared as the write-region. The refusal message now names the path being compared, explains the region as a list of workspace-relative globs, and points out the pattern that can never match. This prevents repeated retries and environment fault reports.

## Model Defaults: Updated and Reliable

The model defaults were updated to reflect current generations, ensuring better performance and cost-efficiency. The default model changed from `deepseek-chat-v3.1` to `deepseek-v4-flash-0731`, reducing costs significantly. The top-tier model was updated to `z-ai/glm-5.3`, and the fusion judge and panel models were also updated. A test now ensures that no default model is a `-preview` slug, which vendors may withdraw without notice.

For full details, see the [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
