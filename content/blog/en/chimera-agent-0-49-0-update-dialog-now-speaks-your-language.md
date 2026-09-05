---
title: "Chimera Agent 0.49.0: Update Dialog Now Speaks Your Language"
date: 2026-09-05
category: update
summary: "Chimera Agent 0.49.0 introduces localized update dialogs and a manual update check, improving user experience across ten languages."
version: "0.49.0"
---

## Update Dialog in Your Language

Chimera Agent now supports localized update dialogs across ten languages. Previously, the update dialog was displayed only in English, regardless of the language selected within the app. This inconsistency has been resolved, ensuring that the update dialog follows the operating system's language settings. This change is particularly beneficial for users who rely on their system's default language, as the app's language detection falls back to the same locale.

Additionally, the tray menu now includes a **Check for updates** option, providing users with a manual way to verify if updates are available. The automatic update check, which runs once at startup, remains silent when no updates are found to avoid unnecessary interruptions. However, the manual check explicitly informs users if they are up to date or if the check failed, addressing the previous issue where silence after a click could be misinterpreted as a broken feature.

## Failure Dialogs and Diagnostics

The backend-failure dialogs and the tray's Quit option have also been translated. However, the diagnostic information remains in its original language. This distinction is crucial: **what tells you what to do is translated, but what goes into a bug report is not.** For example, while the error message explaining the issue is displayed in your language, the path, OS error, and backend's stderr stay verbatim. This ensures that users can effectively search for solutions and report bugs without encountering language barriers.

## What Remains Unchanged

This update does not alter the update mechanism itself. The automatic check still runs at every launch, and the installation process remains user-initiated, requiring explicit consent before proceeding. There is no periodic check while the app is running. Additionally, it's important to note that the version displaying the update dialog is the one currently installed, not the one being offered. This means that the prompt offering you version 0.49.0 is drawn by the version you are currently using.

For more details, refer to the [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
