---
title: "Chimera Agent 0.49.1: Fixes for Update Flow and UI Consistency"
date: 2026-09-12
category: update
summary: "Version 0.49.1 resolves critical update issues, improves UI consistency, and fixes translation gaps in the first-run wizard."
version: "0.49.1"
---

## Update Flow Fixes

One of the most significant issues addressed in Chimera Agent 0.49.1 involves the update mechanism. Previously, after an in-place update, the backend process would incorrectly report the old version due to a lingering `dist-info` file from the previous installation. This occurred because the PyInstaller bundle retained both the old and new version files, causing `importlib.metadata` to return the first version it encountered. As a result, the app would persistently offer an update to the version it was already running, leading to confusion and unnecessary update prompts.

To resolve this, the installer now removes the old bundle before writing the new one, ensuring only the correct version is recognized. However, note that this fix applies to the installer shipped with 0.49.1, not the one used to install it. Users updating from 0.49.0 may still encounter this issue until the next update. A manual fix involves deleting the stale `dist-info` file and restarting the app.

Another update-related issue involved the auto-update feature. For approximately twenty-five minutes after every release, the updater would fail because the `releases/latest/download/latest.json` endpoint returned a 404 error while builds were still in progress. This issue went unnoticed because the updater silently swallowed errors. Now, releases are held back with `--latest=false` until all builds are complete, ensuring the endpoint always resolves to a valid release.

## UI Consistency and Translation Fixes

The 'new version available' panel previously asked a question it couldn't answer. The panel's heading read 'A new version is available. Update?' but only offered buttons to view the release or dismiss the panel. Since the panel resides in the webview without IPC to the Rust updater, it couldn't initiate an update. The panel now simply states the availability of a new version and directs users to the tray's 'Check for updates' option.

Additionally, the first-run wizard had a translation gap in the cost-mode dropdown, which displayed raw values (`auto / cheap / balanced / premium`) instead of translated labels. This inconsistency has been corrected, aligning the wizard with the Settings screen, which already used the translated labels. Note that the values remain in English to match the server's expected input.

For full details, refer to the [release notes][Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1).

[Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1): CHANGELOG.md
