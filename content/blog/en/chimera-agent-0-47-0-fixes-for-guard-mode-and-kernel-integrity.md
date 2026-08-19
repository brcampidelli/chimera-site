---
title: "Chimera Agent 0.47.0: Fixes for Guard Mode and Kernel Integrity"
date: 2026-08-19
category: update
summary: "Critical fixes for guard mode reliability, rule enforcement accuracy, and kernel visibility in governed deployments."
version: "0.47.0"
---

## Guard Mode Now Reports Refusals Correctly

A gate refusing a tool call previously returned an observation string that didn't start with `error:`, making the system record it as successful. This affected three surfaces: the desktop frame, step logs, and drift detection. A run where every dangerous action was blocked would appear successful in all structured data, with the model even reporting completed actions like force pushes that never happened. The kernel now properly marks refusals, and the refusal text identifies which guard made the decision.

## Rule Matching Fixed for Multi-line Scripts

The rules engine previously interpolated script text using `repr`, which escaped newlines into two characters. This broke word boundaries in rule patterns, causing two issues:

1. Simple one-line scripts could bypass protections because the `\n` fused with the next word
2. Markdown documents quoting dangerous commands were incorrectly blocked

Two rules never fired at all due to this issue. The text is now passed to rules without escaping, matching actual script behavior.

## Audit System No Longer Stores Secrets

A governed `write_file` operation would store the complete file contents in `audit.jsonl`, including sensitive data like `.env` files or private keys. This happened even when another guard had already blocked the operation. The audit now redacts sensitive content (using an existing redactor previously only wired to step traces) and records document-shaped arguments as size-only metadata.

## Kernel Visibility Added to HTTP Endpoints

The trust kernel's verdicts weren't being included in HTTP responses for run, batch, and turn endpoints. This meant critical decisions like force push approvals weren't visible to clients. The kernel is now properly installed in HTTP surfaces when `CHIMERA_GOVERNANCE` is `observe` or `enforce`. Note that HTTP deployments never prompt on the server's terminal - the person at that console didn't make the request.

## Other Fixes

- Audit chains no longer falsely report tampering from concurrent writes
- `observe` mode now properly counts refusals it was only meant to measure
- Stuck workers no longer hold entire batches indefinitely
- Container resource limits can now be configured
- Context budget controls added to terminal usage

## Known Limitations

The team has explicitly documented three current gaps rather than leaving them to be discovered:

1. `observe` reports don't yet surface in HTTP interfaces
2. The API lacks an approval path under `enforce` mode
3. Four HTTP endpoints still don't include kernel verdicts

Update with `pip install --upgrade chimera-agent` or see [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) for detailed release notes.
