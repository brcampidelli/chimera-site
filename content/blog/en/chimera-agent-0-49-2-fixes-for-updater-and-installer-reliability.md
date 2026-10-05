---
title: "Chimera Agent 0.49.2: Fixes for Updater and Installer Reliability"
date: 2026-10-02
category: update
summary: "This release ensures the updater checks for new versions periodically and fixes an installer issue that caused version misreporting."
version: "0.49.2"
---

## The Updater Now Works as Expected

Previously, the updater only checked for new versions once—at launch. This was a problem for Chimera Agent, which often stays open for extended periods. If a new version was released while the app was running, users wouldn’t know unless they manually checked or restarted the app. This led to situations where updates were missed entirely, forcing users to download installers directly from the website.

Now, the updater checks every six hours while the app is running. This change ensures users are notified of new releases promptly, without requiring manual intervention. To avoid unnecessary nagging, declining an update remembers that version for the current session, but newer versions will still trigger a fresh check. Manual checks via the tray menu always prompt regardless of previous declines.

## Installer Fix Takes Effect

Version 0.49.1 introduced a fix for an installer issue where upgrading left behind files from the previous version. This caused the app to misreport its version, creating a loop where it kept offering an update to itself. However, that fix only applied to new installers—not the ones used for in-place updates. With 0.49.2, the repaired installer is now used for updates, ensuring version reporting is accurate after an upgrade.

## Other Improvements from 0.49.1

- Releases are now held back from being marked as "latest" until their build artifacts are fully ready, preventing 404 errors during the build window.
- Error dialogs and tray messages are localized, while technical diagnostics remain in English for searchability.
- The first-run wizard’s cost mode options are now properly translated.

To get the latest fixes, run the updater or download the new version from the [release notes][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).

[Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2): CHANGELOG.md
