---
title: "Chimera Agent 0.49.2: Fixes for Updater and Installer"
date: 2026-09-30
category: update
summary: "Chimera Agent 0.49.2 resolves critical issues with the updater and installer, ensuring smoother updates and accurate version reporting."
version: "0.49.2"
---

## Updater Now Works Continuously

In previous versions, the updater only checked for new releases once—at launch. This was a significant oversight for an application like Chimera Agent, which is designed to stay open for extended periods. As a result, users often missed updates unless they manually checked for them or restarted the application. This issue was particularly evident when version 0.49.1 was released: the app didn’t notify users of the update, forcing them to manually download the installer from the website.

**With 0.49.2, the updater now checks for new releases every six hours** while the app is running. This change ensures that users are promptly informed of updates without requiring frequent restarts. Additionally, the updater avoids unnecessary nagging by remembering declined updates for the duration of the process. If a newer version becomes available, it will prompt the user again, ensuring that manual update requests are always honored.

## Installer Fix Takes Effect

Version 0.49.1 introduced a fix for an installer issue that left behind files from previous versions. Specifically, the `_internal` directory could end up containing multiple `chimera_agent-*.dist-info` directories, causing the app to report the wrong version and repeatedly offer updates to itself. However, this fix only applied to the installer that ships with a release, not the one used for in-place updates.

**0.49.2 is the first release where the repaired installer is used for in-place updates.** If you updated to 0.49.1 and experienced incorrect version reporting, this release resolves the issue. The installer now correctly removes old files, ensuring accurate version reporting and preventing redundant update prompts.

## Additional Improvements

Several other enhancements introduced in 0.49.1 are worth noting if you skipped that release:

- **Releases are held back from "latest" until their manifest is attached.** Previously, the updater endpoint would return a 404 error during the build process, silently failing because error messages were suppressed to avoid nagging users.
- **Failure dialogs and tray notifications are now localized**, while technical diagnostics remain in English to ensure they can be easily searched.
- **The first-run wizard’s cost modes are no longer displayed as untranslated English words** on localized screens.

For the full details, refer to the [release notes][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).

To take advantage of these fixes, update to Chimera Agent 0.49.2 now.
