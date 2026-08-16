---
title: "Chimera Agent 0.43.0: Expanded Provider Support and Improved Controls"
date: 2026-08-16
category: update
summary: "Chimera Agent 0.43.0 introduces broader provider support via LiteLLM, new UI controls for previously hidden settings, and fixes for document attachment and theme persistence."
version: "0.43.0"
---

## Broader Provider Support with LiteLLM

Chimera Agent now fully integrates with LiteLLM, allowing users to connect to any provider LiteLLM supports. Previously, only five providers were recognized, leaving users with keys for vendors like Groq or Mistral unable to proceed. The update ensures that any `<PROVIDER>_API_KEY` is accepted, with a denylist in place to exclude non-model providers like ElevenLabs and Stability. Additionally, `doctor` now flags unrecognized provider names, helping users avoid typos that could mimic valid providers.

## Improved UI Controls

Three settings previously accessible only via `.env` files are now available in the UI: the embed model, Ollama base URL, and key pools. The embed model setting is now directly linked to the semantic-memory switch, ensuring that users can configure it without silent failures. Key pools are managed through operations (add/remove) rather than direct editing, maintaining security by avoiding the display of sensitive information.

## Fixes and Enhancements

Attaching documents and dictating messages now work correctly, resolving a 422 error caused by incorrect Content-Type headers. The app also retains your theme, workspace, project list, and language across launches, fixing an issue where these settings were lost due to port changes.

To explore these updates, check out the [release notes][Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0).
