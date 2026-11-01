---
title: "Chimera 0.82.0: Worktrees Start Fresh, Files Keep Their Endings"
date: 2026-11-01
category: update
summary: "Worktrees now clone from the remote instead of a stale local checkout, file writes preserve line endings, and the agent asks before working where commands are off."
version: "0.82.0"
---

## Worktrees start from the remote, not a stale local checkout

A new worktree used to branch from whatever happened to be checked out locally. If the local clone was days behind, the agent started from old code and never knew it. The first turn could waste time on problems already fixed, or introduce conflicts that only surfaced later.

Now a worktree request fetches the remote's default branch and creates the worktree from that commit. The output says which commit it started from. When the fetch cannot reach the remote, the agent falls back to the local HEAD and warns you. The fetch never prompts for credentials, so the operation does not hang waiting for input that cannot arrive.

This matters because an agent that starts from stale code produces work that looks correct in isolation but fails against the current state of the repository. The change removes a silent source of drift between what the agent sees and what the rest of the team sees.

## Files Chimera writes keep their line endings

The agent's file writes went through a text mode that converted every newline to CRLF on Windows. A file created on Windows would disagree with the repository's LF convention, and a translation hash that passed locally would fail in CI. The mismatch was hard to trace because the file looked identical in a diff tool that normalizes line endings.

Writes are now byte-exact. A new file gets LF. An existing CRLF file keeps CRLF. Translation hashes ignore line endings, so a hash computed on one platform matches the hash computed on another. The fix removes a platform-specific failure that broke CI pipelines and forced developers to debug agent output they could not see.

## The agent asks before working where commands are off

A coding request in a folder with commands disabled used to run tools for an hour and only then report that it could not check anything. The agent edited, tested nothing, and delivered an unverified answer. The owner discovered the problem after the fact.

Now the agent stops before any tool runs and asks the owner to allow commands, continue without them, or cancel. Only the owner's screen can grant permission. A turn with nobody at the screen never waits—it proceeds without commands. The choice is remembered per conversation, and an unverified answer states that fact at the top. The change prevents wasted work and makes the constraint visible before the agent acts.

## Other fixes that change daily use

A missing verify tool no longer marks a turn as failed. When the check after a turn cannot run because its program is not installed—`vitest` in a fresh worktree with no `node_modules`—the turn reads as not verified, with the reason and the fix. A `setup` command in `.chimera/verify.toml` installs what is missing. A check whose tests ran and failed still reads as failed. The distinction lets you see whether the agent's output broke tests or the test runner was simply absent.

A failed memory extraction is no longer silent. When the extraction behind a Code turn cannot start, the app logs a warning with the error type—never the conversation or a key—and the turn still answers. Before, the failure left no trace and you could not tell why the agent seemed to forget context.

The installed app keeps its keys whatever folder it is opened from. The backend used to read the `.env` of the launch folder and record that folder for the background service. An app opened from a terminal elsewhere started with no provider key and every turn failed. The Start menu shortcut hid the problem. A packaged build now always runs its backend in the install folder.

A number tweak applies when you finish typing, not on every keystroke. Typing `34` into a tweak that runs from 28 to 56 sent `3` first, was refused, and snapped back. The field now applies once, on leaving the field or pressing Enter, clamps to the range, and Esc discards the draft.

The README no longer calls Chimera self-evolving. Seven pre-registered learning runs found no measurable gain, so the headline, package description, CLI help, app, and translated READMEs now say what the evidence supports: a governed agent that publishes its own null results. The translated READMEs also no longer promise an A/B test that the learning loop does not run.

The bridge pages and filters the conversation list. Listing conversations through the Claude bridge returned all 1,465 at once. It now takes `limit`, `cursor`, `state`, `project`, and `q`, defaults to 50 per page on the bridge, and the screen's unparameterised list is unchanged.

Upgrade with `pip install --upgrade chimera-agent` and read the full notes at [Chimera Agent v0.82.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.82.0).
