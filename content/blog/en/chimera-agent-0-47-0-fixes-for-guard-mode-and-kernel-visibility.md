---
title: "Chimera Agent 0.47.0: Fixes for Guard Mode and Kernel Visibility"
date: 2026-08-20
category: update
summary: "Seven critical fixes address guard mode misreporting, rule enforcement gaps, audit integrity, and kernel visibility."
version: "0.47.0"
---

## Guard Mode Now Reports Refusals Correctly

A fundamental flaw in guard mode (`--guard`) caused refused tool calls to report as successes. The system checked for an `error:` prefix in the refusal message, but most refusals didn't include it. This meant three critical surfaces - the desktop frame, step logs, and drift detection - all showed successful execution when every dangerous action had actually been blocked. The model would confidently report completed actions like force pushes that never occurred. Now refusals are properly flagged across all surfaces, with clear attribution to the guard's decision.

## Rule Engine Fixes for Scripts and Documents

The rules engine had two opposing failures. Multi-line scripts always passed because newline escaping broke word boundary detection in the rule patterns. Meanwhile, documents quoting blocked commands were incorrectly hard-blocked. The protection was exactly backwards - real scripts evaded rules while documentation triggered false positives. Two rules had never fired at all due to these parsing issues. The interpolation now preserves boundaries correctly.

## Audit System Overhaul

Three audit issues were resolved. First, the system that detected credentials was the same one storing them unredacted in the audit log. Second, concurrent writes could corrupt the audit chain's cryptographic verification. Third, the security UI falsely reported tampering due to hash chain resets during concurrent writes. Now credentials are redacted before audit storage, and writers maintain a single consistent chain state.

## Observation Mode Actually Observes

`observe` mode was enforcing rules while claiming to only measure them. Hard blocks would trigger before approver consultation, then be excluded from the refusal count used for rollout decisions. Over 33 real calls, eight refusals showed as zero. These refusals remain (they're unambiguous signals), but now count properly and identify their source.

## Kernel Visibility Restored

The trust kernel's verdicts weren't reaching HTTP endpoints for runs, batches or turns - critical decisions like force push approvals were made invisibly. The kernel now participates in all HTTP flows when `CHIMERA_GOVERNANCE` is active. Server-side prompts won't appear on HTTP connections, ensuring the person seeing them actually made the request.

Run `chimera upgrade` to get the fixes. If you use guard mode, update immediately - the previous version's reports were dangerously misleading. The [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) details all changes.

For production deployments, review your audit logs for any credential leaks from governed `write_file` calls. Check whether multi-line scripts in your rules files need adjustment for the fixed boundary detection.
