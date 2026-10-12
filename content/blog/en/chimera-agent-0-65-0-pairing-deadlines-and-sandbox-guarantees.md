---
title: "Chimera Agent 0.65.0: Pairing, Deadlines, and Sandbox Guarantees"
date: 2026-10-12
category: update
summary: "Bots now pair securely on first start, sandbox fallback is gone, turns have deadlines, and Ollama models read the full prompt."
version: "0.65.0"
---

## First boot pairs the bot, not the room

Before this release, the desktop app asked "is this a new install?" on the Messaging card when the data folder was already populated. That meant every bot the app started ran open—answering anyone who reached it, using the owner's tools and spend. A pairing code, if one was generated, went to a console nobody reads.

The app now records which bots were already configured at startup. Those bots keep answering as before. A bot configured after that point starts by pairing, and its code appears on the Messaging card where someone actually looks. The API reflects this: `GET /api/messaging` reports `pairing_code`, `pairing`, and `open` states. The desktop bridge sees `pairing` but never the code itself, so automation cannot bypass the human step.

## A sandbox that cannot run refuses to run

Setting `CHIMERA_SANDBOX=docker` without a Docker daemon used to fall back to the host with a single log line. A command that should have been isolated ran directly on the machine. That fallback is gone. Now `run_shell`, `execute_code`, and workflow steps refuse before they even ask the host-exec question. The refusal message states what happened, that nothing ran, and the two ways out: start Docker, or set `CHIMERA_SANDBOX=local`. The verifier abstains rather than reverting work because a daemon was down.

A caller that passes `fallback=` explicitly keeps the old behaviour. Everyone else gets a hard stop. The same boundary applies to inbound media: Telegram and WhatsApp downloads now stop at the 20 MB limit before the first byte when the size is declared, instead of reading the whole file into memory and measuring afterward.

## Deadlines reach the governance band

A decision can now carry a deadline, and missing it pushes the REVIEW band toward scrutiny. `DecisionSpec.deadline_s` declares one per decision; `Decider.decide(..., deadline_s=)` overrides it per call. An answer not back in time halts with `deadline_missed` on the receipt and in the decision log, so misses become countable.

With `CHIMERA_GOVERNANCE_BAND_DEADLINE_S` set, a miss produces a REVIEW card with `band: deadline`—never ALLOW. A late answer is never cached or applied after the fact. This is off by default, and the new Settings › General › Governance and audit panel exposes it alongside five other opt-in controls that were previously reachable only through `.env` or could be saved but not read back. `GET /api/config` reports them in a `governance_audit` block. Clearing the deadline no longer leaves an app that cannot start: an empty value now reads as no deadline.

## Ollama models read the whole prompt

Calls to `ollama_chat/` or `ollama/` models never named a context window, so Ollama served its machine default—4,096 tokens in the case that surfaced this. Every longer prompt was cut to about half that size, silently. The first request of a `chimera solve` run, roughly 20,500 characters, was read as 2,050 tokens, and the model never saw the task.

Every gateway path now sends `num_ctx` to Ollama routes only, drawn from `CHIMERA_OLLAMA_NUM_CTX` (default 32,768; set to `0` to keep the server's default). The compaction budget of an Ollama model is sized from that window instead of the 128,000-token fallback. A response whose prompt count shows a cut logs a `PROMPT TRUNCATED` warning instead of passing in silence. Hosted providers are unchanged.

## What to do now

Upgrade with `pip install chimera-agent==0.65.0`. If you run the desktop app, restart it and check the Messaging card for any bot that needs pairing. If you use `CHIMERA_SANDBOX=docker`, verify the daemon is running or switch to `local`. If you call Ollama models, set `CHIMERA_OLLAMA_NUM_CTX` to match your model's window. The full release notes are at [Chimera Agent v0.65.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.65.0).
