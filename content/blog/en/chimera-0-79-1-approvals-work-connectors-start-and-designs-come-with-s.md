---
title: "Chimera 0.79.1: Approvals Work, Connectors Start, and Designs Come With Shapes"
date: 2026-10-29
category: update
summary: "0.79.1 fixes design approval races, broken Windows connectors, base64 media flooding, and blank first proposals — plus per-project permission persistence."
version: "0.79.1"
---

## What broke approvals — and what stops racing now

Before this release, approving a design could fail with a confusing message: “another Chimera process asked this question.” The failure had nothing to do with another process. The design approval is answered as a question in its own conversation, and the answer appears in the approvals window, the status bar, and the Governance list. Only the owner’s screen can answer it. The problem was that two answers arriving at the same moment could collide, and the system had no way to record exactly one and move on. The error was noise, but it blocked the approval and left the user without a clear recovery path.

Version 0.79.1 handles this correctly. When two answers reach the approval at once, exactly one is recorded — the race is resolved, not rejected. The approval completes, the design moves forward, and the user sees a consistent state across all three UI surfaces. Anyone who builds agents that produce design output and route it through a human approval step can now rely on the Governance flow without an intermittent crash that was never really about concurrency at all.

## A design proposal that isn’t blank text

Chimera Design had a deeper problem: its first proposal was practically useless. The model would return a malformed operation, the system would surface a raw error the model could not repair, and the conversation would stall. Even when the operation was structurally valid, the proposal itself was plain text — no typography, no backgrounds, no shapes. That meant the first interaction with Design was a prompt asking for visual output and getting nothing visual back.

The fix has four parts. A malformed operation now comes back as an argument error the model can fix, so the conversation self-corrects instead of stopping. Each operation shows its expected shape, which gives the model a target it can hit. When a proposal is cut off because it tries to pack too many operations into one turn, the system detects the truncation and re-asks with fewer operations. Finally, the first proposal requests typography, backgrounds, and shapes by default — the output starts visual from the first turn. The result is a usable first proposal without a manual retry loop.

## Connectors that start, and files that don’t flood context

Two infrastructure fixes matter for anyone connecting external tools. First, Windows users running connectors through `.cmd` launchers — Supabase via `npx` is the common case — would hit a silent break when the connector’s command contained an `&` in its URL. The launcher interpreted the character, the command split, and the connector never started. Chimera now refuses an argument that cannot pass safely and tells you why, so the failure is explicit and fixable. The app also no longer waits for MCP servers to connect before opening. Previously, the UI could sit on “Failed to fetch” for up to two minutes while connectors timed out. The service opens immediately, and the connections resolve in the background.

Second, connectors that return audio or images inline — VoiceStudio’s narration, for instance — used to dump base64 directly into the model’s context. The model had to read the encoded blob as text, which filled the context window and stopped the turn. Those files are now saved to the project’s `mcp-output/` folder, kept out of commits, and the conversation references them as playable or viewable artifacts. The model never sees the raw bytes, and the turn completes without context exhaustion.

## Permission state that survives a restart

The “Ignore permissions” switch now lives at the project level and persists across restarts. A project-level switch covers all its conversations, including new ones, while each conversation still keeps its own independent toggle. Turning the project switch on immediately releases cards that are already waiting for permission. After a restart, a banner lists each saved project and conversation that had the switch on; you confirm with one click to reactivate them, and the rest are discarded. Only the desktop screen can turn the switch on, and turning it off always applies everywhere — the safety boundary is one-directional.

## What to do now

Upgrade with `pip install chimera-agent==0.79.1`. If you use Design, start a new proposal and check that the first response includes visual structure. If you run on Windows with Supabase or any `npx`-based connector, verify the connector starts without manual argument escaping. The full notes are at [Chimera Agent v0.79.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.79.1).
