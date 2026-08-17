---
title: "Chimera Agent 0.46.0: Fixing Silent Failures and Introducing Skill Cards"
date: 2026-08-17
category: update
summary: "Chimera Agent 0.46.0 addresses silent failures, introduces a curated skill library, and ensures honest translations across nine languages."
version: "0.46.0"
---

## Silent Failures Addressed

Chimera Agent 0.46.0 tackles a series of silent failures that previously went unnoticed. These issues didn’t cause crashes or errors but undermined critical functionalities. For instance, five JSON stores lost data silently due to a lack of locking mechanisms during read-modify-write operations. This meant that one process could overwrite another’s changes without any warning. One of these stores was the skill store, where learned data could be erased by subsequent runs. Now, all five stores lock and write atomically, ensuring data integrity.

Another silent failure involved the app’s Discord bot, which ran without proper fencing. This meant the build gate couldn’t detect it, leaving a potential security gap. Similarly, a governance fence that killed the CLI at import when enabled went unnoticed because no one had ever run it with governance turned on. These issues have been fixed, ensuring that functionalities behave as expected.

## Curated Skill Library

This release introduces a curated skill library, featuring 23 skill cards grouped by their application in the workflow: define, build, verify, review, and ship. These cards are data, not code, making them easy to contribute to and review. Each card includes sections like Trigger, Do, Avoid, Check, and Risk, and they are available in nine languages. The translations are managed in a sidecar file, ensuring the original skill card remains byte-identical.

However, reading these cards into the agent’s prompt is opt-in and off by default due to a significant increase in token usage without a significant performance boost. This decision was based on a registered A/B test that showed a +16.7pp improvement but failed to meet significance thresholds.

## Honest Translations

A new test ensures that skill card translations are honest and complete. It separates three states that look identical inside a file: stale, incomplete, and missing. Stale translations claim to translate text that has changed, while incomplete translations lack sections. Missing translations are honest debts, clearly marked as such. This gate prevents the issue of untranslated cards appearing in the UI, which was previously only detectable by reading files, not by failing builds.

## Documentation Corrections

Sixteen claims in the documentation that the code did not support have been corrected across all ten languages. Five of these were outright false, such as the governance options and the desktop rail destinations. Additionally, two claims now include necessary caveats, ensuring users have accurate information.

## What to Do Next

To update to Chimera Agent 0.46.0, run:

```
pip install -U chimera-agent
pip install -U 'chimera-agent[desktop]'
```

For more details, check the [release notes][Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0).

[Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0): chimeraagent.space/release-notes
