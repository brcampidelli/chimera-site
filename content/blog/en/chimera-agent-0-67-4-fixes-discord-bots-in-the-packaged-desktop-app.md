---
title: "Chimera Agent 0.67.4 fixes Discord bots in the packaged desktop app"
date: 2026-10-16
category: update
summary: "The installed desktop application no longer crashes with a missing module error when starting a Discord bot."
version: "0.67.4"
---

The packaged desktop app introduced in the previous release shipped with a broken contract. If someone installed the application and pointed it at a Discord bot, the status panel didn't show a running bot. It showed a traceback ending in `ModuleNotFoundError: No module named 'discord'`. The agent configuration was valid. The token was correct. The failure was in the packaging itself.

## What broke and why it matters

The problem was a combination of two decisions that didn't collide until the release build ran. First, the messaging adapters—Discord included—were designed as lazy imports. The framework doesn't load every chat surface at startup; it only imports the adapter when a bot configuration requests it. That design kept cold starts fast and memory low, and it worked in every environment where all optional dependencies were present.

Second, the release build used a trimmed dependency set. The messaging extra, which carries the Discord client libraries, was marked optional and got omitted from the installed application. PyInstaller's analysis walked the import graph statically, saw the lazy import hidden behind a string-based loader, and concluded the adapter code was dead. The result: a working configuration that the runtime couldn't execute.

For whoever builds agents, the impact was specific. Any bot defined with a Discord surface would fail exclusively in the packaged app. The same configuration file worked from source. The same configuration file worked in a container. The inconsistency meant the desktop app was untrustworthy for a whole class of agents, which is exactly the class that drives the most community feedback.

## The fix and what it means for packaging

The 0.67.4 release corrects the dependency declaration so the messaging extra is bundled with the installed application. PyInstaller now sees the Discord adapter as reachable code and includes the required modules. No configuration change is needed. No update to agent definitions. The bot status panel displays a running state instead of an import error.

Behind that simple statement sits a broader lesson the maintainers acted on immediately. Lazy imports are a performance technique that authoring tools need to respect but packaging tools need to be told about explicitly. The hidden import was always intentional architecture. The omission was a metadata gap between the package manifest and the freezing process. Version 0.67.4 closes that gap for the Discord adapter and establishes a pattern for every messaging surface that follows the same lazy-load design.

## What to do now

If you are running the 0.67.3 installed application, download the 0.67.4 update from the releases page. The packaged app is signed the same way and installs over the existing version. After the update, restart any Discord bot configuration. The status moves to running without additional steps.

If you build agents from source and never touched the packaged app, nothing changes. The pip-installed package already included the messaging extra when installed with the standard `[all]` flag. This release only affects the bundled desktop application.

For the full list of changes in this release, see [Chimera Agent v0.67.4](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.67.4).
