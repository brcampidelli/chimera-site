---
title: "Chimera Agent 0.85.0: No More Silent Hangs and a Browser That Pairs"
date: 2026-11-08
category: update
summary: "Fixes a run hang caused by inherited pipes, adds browser pairing with a one-time code, local voice for chat bots, and named OpenAI-compatible endpoints."
version: "0.85.0"
---

## The run that never ended

A run whose child process kept its output pipe open used to hang the agent indefinitely. The reader waited without limit for the pipe to close. A grandchild that inherited the pipe—a test runner’s worker, a background server—kept the run, its cancel button, and the test suite waiting forever. The cancel button did nothing because the process tree stayed alive, and the test suite froze silently instead of reporting the deadlock.

That changes in 0.85.0. The output reader now runs on its own thread with a five-second grace period after the child exits. When you cancel a run, Chimera kills the entire process group on POSIX and the process tree on Windows. The test suite also stops hiding behind a frozen wall: if a single test runs past fifteen minutes, the suite dumps every thread’s stack trace instead of locking up without a word. You get a diagnosis instead of a blank terminal.

The fix matters most when you chain tools that spawn their own subprocesses—test frameworks, build scripts, or any command that forks a server in the background. Before, those runs were unrecoverable. Now, cancel means cancel.

## Pair a browser tab without opening a port

Until now, giving a browser tab access to the owner’s screen meant exposing the bridge or a chat channel. Both paths carried more surface area than necessary. Version 0.85.0 adds a pairing flow that cuts them out entirely.

The desktop app shows an eight-character code, valid for five minutes and five attempts. You type it into the browser tab. That tab receives an HttpOnly, same-site cookie good for up to twelve hours, revocable from the desktop at any time. Only the desktop issues codes—the bridge and chat channels cannot. A paired tab cannot turn on the bridge, cannot enable full control, and cannot toggle “Ignore permissions.” Every state-changing request from it must originate from the same origin.

This gives you a time-boxed, revocable, low-privilege window into the owner’s screen. You pair a tab when you need it, revoke it when you don’t, and the bridge stays off the whole time.

## Voice messages land locally, and endpoints get names

Discord and Telegram bots can now hear voice messages and answer aloud, and both happen on your machine. Voice notes are transcribed locally with faster-whisper using a pinned model revision. Duration is checked before decoding, and a per-user rate limit prevents abuse. Spoken replies are off by default. To turn them on, you point `CHIMERA_CHAT_VOICE_MODEL` at a Piper voice `.onnx` file you chose yourself. Chimera ships no voice model, and `piper-tts` (GPL-3.0) lives in a separate `voice` extra, outside `[full]`. You opt into voice, and you supply the voice.

OpenAI-compatible endpoints also get first-class treatment. Settings › Connections now lists your endpoints—a local vLLM, LM Studio, or llama.cpp server, or a hosted one—and lets you add, test, and remove them. The test makes one bounded `GET /models` call to that endpoint only. Only the owner’s screen can change or test endpoints, the key is never displayed, and an endpoint’s key must be its own `*_API_KEY` variable, never another provider’s credential or a `CHIMERA_` setting. This closes the long-standing request in #1133.

## What to do now

Upgrade with `pip install chimera-agent --upgrade`. Read the full notes at [Chimera Agent v0.85.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.85.0). If you use chat bots and want voice, install the `voice` extra and set `CHIMERA_CHAT_VOICE_MODEL` to your Piper model. To pair a browser tab, open the desktop app and look for the pairing code in the owner’s screen controls.
