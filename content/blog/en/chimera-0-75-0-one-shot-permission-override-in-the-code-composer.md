---
title: "Chimera 0.75.0: One-shot permission override in the Code composer"
date: 2026-10-24
category: update
summary: "A per-conversation switch in the Code composer auto-approves safe tool calls, records each decision, and removes the five-minute timeout on human input."
version: "0.75.0"
---

## What changes for you

Until now, every tool call that touched anything outside the sandbox produced an approval card. You had to click through each one. That was the contract: the agent stops, you decide, it continues. The contract held even when you were iterating on a script and the agent needed to run the same safe command twelve times in a row. The friction wasn't a bug—it was the design. But it made rapid iteration slower than it needed to be.

Version 0.75.0 adds a switch to the Code composer labeled "Ignore permissions." When you turn it on, the agent auto-approves tool calls that would normally produce an approval card. It records every decision it makes on your behalf. The switch applies to one conversation only. It does not persist across app restarts. And it does not touch anything that sends local data outward: pushes, publishing, payments, messages sent in your name, secrets access, and any operation that transmits data off the machine still halt and ask. The boundary is explicit. The agent can move faster inside the boundary; it cannot cross it without you.

This is not a global setting. It is not a config file toggle. It is a button on the screen, and only you can press it. The design keeps the override close to the work. You see the conversation, you know what the agent is doing, and you decide that for this session, the repetitive approvals are noise. When the app restarts, the noise comes back. You opt in again, deliberately.

## Why the timeout behavior changed

The Code screen had a five-minute deadline on your answer. If you didn't respond to an approval card within that window, the agent refused the call and the conversation stalled. The assumption was that an unanswered card meant an unattended session. But the assumption broke in a common workflow: you ask the agent to do something, you switch to another window to check documentation or test a hypothesis, and you come back six minutes later to a dead conversation. The timeout punished focus.

The Code screen now waits indefinitely for your answer. The agent stays paused until you return. The five-minute limit still applies where it makes sense—automations that nobody watches. Those keep the guardrail. But when you are present, even if you step away, the conversation no longer expires on you.

## What the switch does not do

The "Ignore permissions" switch is not a sudo flag. It does not elevate privileges. It does not grant access to anything the agent couldn't already request. It only removes the requirement that you manually approve each request. The agent still logs every auto-approved call. You can review what happened after the fact. The recording is there if you need to audit a session.

The categories that still require explicit approval are the ones that move data off the machine or spend resources: pushes to remotes, publishing operations, payment actions, messages that carry your identity, and anything that reads or transmits secrets or local data outward. The switch respects these categories unconditionally. There is no second switch to override the override.

## What to do now

Update to 0.75.0. Open a Code composer session where you expect repetitive tool calls. Look for the "Ignore permissions" switch on the screen. Turn it on when the approval cards become noise. Turn it off when you need the guardrails back. Restart the app to reset it. Read the full list of changes in the [release notes][Chimera Agent v0.75.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.75.0).
