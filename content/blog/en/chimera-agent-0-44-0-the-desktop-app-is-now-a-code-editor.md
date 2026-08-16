---
title: "Chimera Agent 0.44.0: The Desktop App is Now a Code Editor"
date: 2026-08-16
category: update
summary: "The Chimera desktop app transforms from an agent console into a full-featured code editor with diagnostics, inline completions, search, and external agent integration."
version: "0.44.0"
---

## From Console to Code Editor

The Chimera Agent desktop app has fundamentally changed in version 0.44.0. What was once primarily a console for interacting with agents is now a capable code editing environment. This shift reflects how users actually work with AI agents - not just chatting with them, but collaborating on code.

Seven key features arrive together in this release. The editor at `#/edit` uses CodeMirror with proper tabs, per-file undo history, and warnings when an agent tries to modify an unsaved file you're working on. Diagnostics now come from `ruff server`, ensuring the warnings you see match what would fail in CI. The editor offers inline completions from a local model, showing grey preview text that you can accept with Tab or reject with Escape.

## Practical Improvements

Search now works across your entire workspace, using ripgrep where available. You can see system resource usage (CPU, memory, GPU VRAM) and perform retrieval over your repository with pre-registered benchmarks. The command runner keeps history per project across reloads, with proper process tree termination when you stop or close it.

Perhaps most significantly, you can now hand coding tasks to external agents like Claude Code or Gemini CLI. These integrate through ACP and undergo the same verification and snapshot/revert process as native turns. The app makes clear when external agents operate under different security boundaries - they can decline Chimera's file write guards, though checkpoint/revert remains as a safety net.

## Getting Started

Setup remains straightforward. Only a provider key is required to start, with optional capabilities clearly indicated. For editor diagnostics, ensure `ruff` is installed. Inline completions need Ollama with the specific `qwen2.5-coder:1.5b-base` model (note the base tag - instruct models won't work properly for this). External agents require their respective CLI tools.

The release includes honest caveats: unsigned installers will trigger security warnings, external agents have different security boundaries, and retrieval isn't yet wired into the main agent flow. The command runner isn't a full terminal - each command runs in a fresh process, so state like `cd` or `export` won't persist.

For full details including two bugs found through untested scenarios, see the [CHANGELOG][Chimera Agent v0.44.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.44.0). To try it yourself, update your Chimera Agent installation and explore the new editor at `#/edit`.
