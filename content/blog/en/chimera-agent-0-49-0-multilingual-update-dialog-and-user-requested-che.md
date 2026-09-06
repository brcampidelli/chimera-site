---
title: "Chimera Agent 0.49.0: Multilingual Update Dialog and User-Requested Checks"
date: 2026-09-06
category: update
summary: "Chimera Agent 0.49.0 introduces multilingual support for the update dialog and adds a manual update check option in the tray."
version: "0.49.0"
---

## Multilingual Update Dialog and Manual Update Check

Chimera Agent now speaks your language everywhere, including the update dialog. Previously, the update dialog was only in English, regardless of the app's language setting. This has been fixed, and the dialog now follows your operating system's language. This change ensures that users who haven't changed the app's language setting will see the dialog in their system's language, while those who have customized it will still see the dialog in English.

Additionally, the tray now includes a **Check for updates** option. This is the first way to manually request an update check. The automatic check runs once at startup and remains silent if there is no update to avoid nagging users. However, this silence could be misinterpreted as a failure, leading users to relaunch the app unnecessarily. With the new manual check, users can now confirm their app is up to date or receive feedback if the check fails.

## Translated Failure Dialogs and Untouched Diagnostics

The update dialog isn't the only part of the app that has been translated. The two backend-failure dialogs and the tray's Quit option are now also available in multiple languages. However, there's a clear distinction between what gets translated and what doesn't:

> **What tells you what to do is translated. What goes into a bug report is not.**

For example, if the backend crashes, the error message will be in your language, but the path, OS error, and backend's stderr will remain in their original form. This ensures that users can still search for and understand system errors without confusion.

## What Remains Unchanged

This update doesn't change the update mechanism itself, which has been functional since version 0.48.0. The automatic check still runs at every launch, and the installation process remains user-initiated. There is no periodic check while the app is running.

One counter-intuitive aspect remains: **the version that shows you the dialog is the one already installed**, not the one being offered. This means that the prompt offering you version 0.49.0 is drawn by whatever version you are currently running. From version 0.49.0 onward, this prompt will be in your language.

For the full details, check out the [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
