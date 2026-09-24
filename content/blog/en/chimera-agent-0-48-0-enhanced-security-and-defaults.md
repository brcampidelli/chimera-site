---
title: "Chimera Agent 0.48.0: Enhanced Security and Defaults"
date: 2026-09-02
category: update
summary: "Chimera Agent 0.48.0 introduces significant security improvements and default changes, focusing on sandbox isolation and cost-effective model selection."
version: "0.48.0"
---

## Enhanced Sandbox Isolation

The default sandbox setting has been updated to prioritize security. Previously, the `local` sandbox was not isolated, relying on governance kernels and confirmation prompts to protect your machine. This approach had vulnerabilities, especially when users bypassed prompts or when instructions were injected. Now, the default is `auto`, which uses **Seatbelt** on macOS with a `(deny default)` profile and **bubblewrap** on Linux with stringent isolation parameters. This ensures network isolation and restricts writes to the working directory and temp directory, significantly reducing potential risks.

## Windows and Linux Kernel Considerations

For Windows, the update explicitly states that no sandbox mechanism is provided. The existing restricted token and network filters are not approximated, as a missing boundary is less dangerous than a falsely believed one. Similarly, Linux kernels that refuse unprivileged user namespaces will report the sandbox as *unavailable*, ensuring transparency about security limitations.

## Cost-Effective Default Model

The default model has been switched from GPT-5.5 to DeepSeek V3.1. This change addresses the high cost associated with the previous default model, which was the most expensive in the catalog. DeepSeek V3.1 offers a more economical option at $0.25/$0.95 per 1M tokens compared to $5.00/$30.00 for GPT-5.5. The `CHIMERA_DEFAULT_MODEL` environment variable still takes precedence, and the model picker allows changes per conversation.

## Audit-Driven Improvements

An extensive audit identified numerous recommendations, with 56% of the work focusing on wiring rather than product features. This release addresses many of these issues, ensuring that the code runs correctly and logs accurately. Notable fixes include handling refused tools correctly, removing failed cron jobs, and securing credential-carrying strings. Each fix was rigorously tested by reverting changes and ensuring tests caught the defects.

## New Features and Enhancements

New features include credentials stored in the OS keychain (`chimera secrets`), a decision approval mechanism (`chimera approve`), and coding turns that survive dropped connections. Additionally, commands proven to be read-only no longer require confirmation, and MCP servers can be opened rather than handed over. Three new gates in CI further enhance the robustness of the system.

For a detailed account of all changes, refer to the [CHANGELOG.md][Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0).

[Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0): CHANGELOG.md
