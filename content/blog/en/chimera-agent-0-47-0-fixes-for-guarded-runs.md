---
title: "Chimera Agent 0.47.0: Fixes for Guarded Runs"
date: 2026-08-22
category: update
summary: "Seven fixes address incorrect reporting of refused tool calls, rule evaluation flaws, and audit integrity issues."
version: "0.47.0"
---

## Guarded Runs Now Report Correctly

A critical issue in guarded runs (`--guard` flag) has been fixed. Previously, when a tool call was refused by governance rules, the system incorrectly reported it as successful. This happened because the refusal message didn't start with `error:`, making the status check return `True`. Three key surfaces were affected:

1. The desktop frame visualization
2. The step log used for receipts
3. The drift detector

This meant runs where every dangerous action was blocked would appear successful in all structured outputs. The model might even respond with confirmation messages for actions that never executed.

## Rule Evaluation Fixed for Scripts and Documents

The rules engine had two significant problems:

1. **Multi-line scripts bypassed protection**: Due to how newlines were escaped during text interpolation, word boundaries in rules were broken. This allowed dangerous commands to slip through if they appeared after benign ones in a script.

2. **Documents triggered false positives**: Meanwhile, Markdown files quoting dangerous commands were being hard-blocked. The protection was effectively inverted - real threats were allowed while documentation was blocked.

Two rules weren't firing at all on any input. These issues have been corrected, with proper handling of both script execution and document content.

## Audit and Security Improvements

Several security-related fixes were implemented:

- **Credential storage**: The audit system was storing sensitive data it was supposed to detect. When a governed `write_file` operation was blocked, the file content still appeared in `audit.jsonl`. Now there are two layers: the audit redacts sensitive data (using existing redaction capabilities), and document-shaped arguments are recorded only by size.

- **Audit chain integrity**: The Security screen sometimes falsely reported tampering when no modification occurred. This happened when multiple writers resumed hash chains from different snapshots, creating duplicate sequence numbers. The verification now works correctly.

- **Observation mode fixes**: The `observe` mode was actually enforcing rules it promised to only measure. Hard BLOCKs now properly return before approver consultation, and refusals are correctly counted in metrics.

## Kernel Visibility and Reliability

The trust kernel wasn't being served over HTTP, meaning its verdicts weren't reaching API consumers. It's now properly installed for all endpoints when `CHIMERA_GOVERNANCE` is set to `observe` or `enforce`. Other reliability fixes include:

- Proper handling of worker timeouts
- Distinguishable task failures vs. expirations
- Container limit configuration
- Automatic backend recovery

## Known Limitations

The update addresses several issues but leaves some known gaps:

1. `observe` reports don't yet surface to HTTP interfaces
2. The API lacks an approval path under `enforce` mode
3. Four HTTP endpoints still lack kernel integration

These are documented in the README rather than left as hidden issues.

Update now with `pip install --upgrade chimera-agent` or through your preferred package manager. For full details, see the [release notes][Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0).
