---
title: "Chimera Agent 0.86.0: Mode Picker, Side Chat, and Secrets Isolation"
date: 2026-11-11
category: update
summary: "A new mode picker replaces posture confusion, side chat answers without polluting history, the agent's shell no longer sees your API keys, and conversations auto-archive on PR merge."
version: "0.86.0"
---

This release fixes a structural problem that made agent posture hard to trust. Before 0.86.0, you set a posture in Settings—Manual, Auto, or something in between—and then the bridge, the API, and the UI each had their own way to override it. You could end up with a conversation running in Auto when you thought it was Manual because the bridge moved it without telling you. The mode picker replaces that with a single control.

## One mode picker instead of three mechanisms

The picker sits under the prompt and opens with Ctrl/Cmd+Shift+M. It lists six modes: Manual, Accept edits, Plan, Auto, Don't ask, and Ignore permissions when the project allows it. Each mode maps directly onto the existing posture system. The conversation's mode is saved and starts from what Settings say—never becomes Don't ask, suspicious becomes Auto, always becomes Manual. Accept edits shows a card before each command unless the command only reads or the sandbox isolates it. Plan never runs wider than Auto. The bridge can only move a conversation to a mode that widens nothing, so a conversation you locked to Manual stays there. Ctrl/Cmd+Shift+O opens the model picker and Ctrl/Cmd+Shift+E the effort picker; maximise moved to Ctrl/Cmd+Shift+Enter.

This matters because posture was the primary safety boundary between you and the agent, and it had two backdoors. Now it has one control that everything respects.

## The agent's shell no longer inherits your secrets

Child processes of the agent used to inherit provider key pools like `CHIMERA_OPENROUTER_KEYS`, `DATABASE_URL` with a password, and cloud credentials. Any command the agent ran could print them. The desktop app had the same problem in the other direction: it handed the backend its server token, screen credential, and launcher key through environment variables, which on Linux stay readable in `/proc/<pid>/environ` to any process of the same user—the agent's shell included.

Both paths are closed. The agent's shell and the new terminal now get an environment with secrets removed by name and by value. Proxy settings still pass through. The GitHub CLI keeps the token it needs. The desktop app now sends its secrets to the backend on stdin as one line that is read and closed immediately; the server token is kept in memory rather than in the process environment. A missing or malformed line stops the backend instead of starting it without a token, and the app refuses to use a backend that answers without one.

## Side chat and suggested-task cards

Side chat (Ctrl/Cmd+;) answers a quick question about the conversation without adding to it. It reads the conversation as data, answers with no tools, and writes nothing into the conversation's history. Before this, asking a question meant polluting the context with a turn the agent would later try to act on. "Bring into the conversation" only fills the composer, and when the conversation has read outside content, side chat quotes the answer as data and asks first. Its cost is recorded, local models stay free under a daily cap, and the shortcuts help moved to Ctrl/Cmd+/.

Suggested-task cards prevent the agent from drifting. When it notices something outside the task—dead code, a stale doc, a missing test, a security issue seen in passing—it can only propose a card. You see the full prompt before anything runs and choose Start (a new conversation in the same project), Do it here, Options, or Dismiss. Start all asks for confirmation and is capped at five. Only the owner's screen starts a card, and a card proposed by a turn that read outside content starts its conversation marked as tainted and without "Ignore permissions," with a warning on the card.

## What to do now

Update with `pip install chimera-agent --upgrade` or pull the latest container image. The mode picker, side chat, and terminal are available immediately. If you relied on the old posture overrides, check each conversation's mode after the upgrade—the picker reads your Settings default, but existing conversations may have been moved by the bridge before 0.86.0. The secrets isolation is automatic; no configuration change is needed. Full release notes: [Chimera Agent v0.86.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.86.0)
