---
title: "Chimera Agent 0.49.0: Update Dialog Now Speaks Your Language"
date: 2026-09-04
category: update
summary: "The update dialog and failure messages now follow your system's language, with a manual check option in the tray."
version: "0.49.0"
---

## Update Dialog Translations and Manual Checks

The update dialog in Chimera Agent was previously only available in English, regardless of the app's language setting. This has been fixed in version 0.49.0 — the dialog now follows your operating system's language. This change addresses a disconnect for users who run the app in one language but see critical system messages in another.

The tray menu now includes a **Check for updates** option, which serves as the first manual way to trigger an update check. Previously, the automatic check ran silently at startup, providing no feedback unless an update was found. While this design avoids unnecessary notifications, it left users with no way to confirm they were up to date without restarting the app. The new manual check provides explicit confirmation when no update is available, along with clear error messages if the check fails.

## Translated Failure Messages with Untouched Diagnostics

Failure dialogs — including backend crash reports and the tray's Quit option — are now also translated. However, there's an important distinction in what gets translated:

- **User instructions** appear in your system's language (e.g., "Feche o Chimera e abra de novo")
- **Technical details** (file paths, error codes, backend logs) remain in their original form

This separation ensures that users receive clear guidance in their preferred language while maintaining searchable, actionable error information for troubleshooting. A test enforces this behavior, verifying that user-facing text comes from translation tables while diagnostic data passes through unchanged.

## What Remains Unchanged

The update mechanism itself hasn't changed — checks still happen automatically at launch, and installations always require user confirmation. The app never installs updates without explicit permission. One subtle but important detail: the version displaying the update dialog is always the currently installed one, not the new version being offered. This means the prompt offering 0.49.0 appears in whatever language your current version uses — from 0.49.0 onward, that will match your system language.

To see the changes, update to 0.49.0 or check manually via the tray menu. Full details are in the [release notes][Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
