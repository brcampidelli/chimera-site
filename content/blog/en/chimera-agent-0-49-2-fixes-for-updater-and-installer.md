---
title: "Chimera Agent 0.49.2: Fixes for Updater and Installer"
date: 2026-10-01
category: update
summary: "Chimera Agent 0.49.2 addresses critical issues with the updater and installer, ensuring smoother updates and correct version reporting."
version: "0.49.2"
---

## Updater Now Checks Every Six Hours

Previously, the update check in Chimera Agent ran only once at launch, which meant that if the app remained open, it would never detect new releases. This issue was particularly problematic for a tool like Chimera, which is designed to stay running for extended periods. As a result, users had to manually fetch updates from the website, defeating the purpose of an automatic updater.

With version 0.49.2, the updater now checks for new releases every six hours while the app is running. This change ensures that users are promptly informed of updates without the need for manual intervention. Additionally, the updater remembers declined versions for the duration of the process, preventing repeated prompts for the same update unless a newer version is available.

## Installer Fix Takes Effect

Version 0.49.1 introduced a fix for an installer issue that left behind files from the previous version, causing the app to incorrectly report its version and offer updates to itself. However, this fix only applied to the installer shipped with that release, not the one used to install it.

In 0.49.2, the repaired installer is now used for in-place updates, ensuring that the correct version is reported after an update. If you updated to 0.49.1 and encountered the version reporting issue, this release resolves it.

## Additional Improvements

Other improvements in this release include holding back releases from being marked as "latest" until their manifest is attached, ensuring that the updater endpoint does not return a 404 error during the build process. The failure dialogs and tray now speak the user's language, while technical diagnostics remain untranslated to facilitate easier searching for error messages. The first-run wizard's cost modes have also been localized, avoiding the previous issue of displaying English words on a translated screen.

For a complete list of changes, refer to the [Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).
