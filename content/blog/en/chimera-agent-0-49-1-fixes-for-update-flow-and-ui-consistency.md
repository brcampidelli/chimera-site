---
title: "Chimera Agent 0.49.1: Fixes for Update Flow and UI Consistency"
date: 2026-09-15
category: update
summary: "Chimera Agent 0.49.1 addresses critical issues in the update process, UI consistency, and translation gaps, ensuring smoother operation and clearer user interactions."
version: "0.49.1"
---

## Update Process Improvements

The update mechanism in Chimera Agent 0.49.0 had a significant flaw: the backend process incorrectly reported the version due to leftover files from previous installations. Specifically, the PyInstaller bundle retained `dist-info` directories from both the old and new versions, causing `importlib.metadata` to return the wrong version. This led to the app persistently offering an update to the version it already was. The installer now removes the old bundle before writing the new one, ensuring that only the correct version is reported. Note that this fix applies to the installer shipped with 0.49.1, not the one that installs it. If you're updating from 0.49.0, you may still see a stale `dist-info` until the next update.

## Auto-Update Reliability

Another issue was discovered in the auto-update mechanism. For approximately twenty-five minutes after every release, the updater would fail because the `latest.json` endpoint returned a 404 error. This happened because the release was marked as latest before all platform builds were complete. Now, releases are held back with `--latest=false` and only promoted once the manifest is attached. This ensures that the endpoint always resolves to a valid release, improving reliability and preventing broken releases from being offered.

## UI Consistency and Clarity

The 'new version available' panel previously asked a question it couldn't answer: *"A new version is available. Update?"* However, the panel only offered options to view the release or dismiss the notification, with no actual update functionality. The panel now simply states that a new version is available and directs users to the tray's **Check for updates** option. This change eliminates confusion and aligns the UI with its actual capabilities.

## Translation Fixes

The first-run wizard had a minor but noticeable translation issue: the cost-mode dropdown displayed raw values (`auto / cheap / balanced / premium`) instead of their translated counterparts. While the labels existed and were translated, they weren't being used in this context. This inconsistency has been resolved, ensuring that the dropdown now displays the correct translated labels, consistent with the Settings screen.

For full details, refer to the [release notes][Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1). To update, run `chimera-desktop --update` or download the latest version from the official site.
