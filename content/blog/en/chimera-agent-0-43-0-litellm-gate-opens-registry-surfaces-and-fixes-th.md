---
title: "Chimera Agent 0.43.0: LiteLLM Gate Opens, Registry Surfaces, and Fixes That Matter"
date: 2026-08-16
category: update
summary: "Chimera 0.43.0 removes arbitrary provider restrictions, exposes buried settings, and fixes document uploads and session persistence."
version: "0.43.0"
---

## LiteLLM Gate Now Accepts Any Provider Key

Previously, Chimera only recognized five LiteLLM providers, rejecting valid keys from services like Groq or Mistral with a misleading "No provider key configured" error. The gate now accepts any `<PROVIDER>_API_KEY`, with two safeguards:

1. A denylist prevents non-model providers (like ElevenLabs or Stability AI) from being misidentified as model sources
2. `doctor` now validates provider names against LiteLLM's enum, catching typos that would otherwise fail silently

The change addresses a deeper issue: keys placed in `.env` were being silently ignored due to Pydantic's `extra="ignore"` setting. Since `chimera init` creates `.env` files and documentation directs users there, this was causing persistent configuration failures.

## Previously Hidden Features Now Accessible

Three significant capabilities existed in the code but lacked user interfaces:

1. **Agent Registry**: The board's lane box was a free-text field guessing at registry IDs that were never displayed. Now accessible via Automation's third tab, it shows existing agents while still allowing work to be filed against non-existent IDs (which wait in backlog).
2. **Embed Model Selection**: Previously buried, this now appears directly under the semantic memory switch it affects. Failures degrade to lexical search silently, making visible configuration crucial.
3. **Key Pools**: These rotated round-robin with cooldowns but had no UI. The interface now manages them by operation (add/remove) rather than exposing secret values.

## Critical Fixes for Core Functionality

Two features shipped broken in the app:

- **File Uploads and Message Dictation**: Both failed with 422 errors because `authHeaders()` forced `application/json` Content-Type, preventing proper multipart form boundaries. Tests had missed this because they mocked the entire API layer.
- **Session Persistence**: The app lost theme, workspace, and language settings on launch due to random port assignment changing the `localStorage` origin. Now remembers and reuses ports.

The first-run wizard also better handles model selection, showing (but not auto-applying) compatible models for your provider to prevent immediate 401 errors.

Update with `pip install --upgrade chimera-agent` or see [Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0) for full details.
