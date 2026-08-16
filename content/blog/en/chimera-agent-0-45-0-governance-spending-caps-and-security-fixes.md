---
title: "Chimera Agent 0.45.0: Governance, Spending Caps, and Security Fixes"
date: 2026-08-16
category: update
summary: "This release wires in missing security defaults, adds spending controls, and extends governance to all unattended surfaces."
version: "0.45.0"
---

## Security Defaults That Actually Default

The previous version shipped with an insecure configuration: open ports, no authentication, and no warnings. This wasn't an oversight—it was a conscious choice to prioritize ease of setup over security, but the balance was wrong. Now `serve` refuses to bind to non-loopback addresses without a token, and the Docker setup publishes only to `127.0.0.1`. If you need to expose the gateway, you must explicitly opt in with `--allow-insecure-bind` or set `CHIMERA_SERVER_TOKEN`.

This breaks existing deployments that relied on the old behavior. The fix is straightforward, but it's a change that had to happen: an agent gateway accessible to anyone on the network is a liability, not a feature.

## Spending Limits That Work

Before this release, the only spending control was a step counter. A job in a retry loop could drain your API credits with no warning. Now there are three separate ceilings: per run, per job, and a daily aggregate. If a call can't be priced, the run stops rather than proceeding unchecked. Local models are treated as free rather than unknown, so caps don't block the one configuration that can't overspend.

`chimera doctor` checks whether your default model can be priced at all. This avoids surprises when you try to set a spending limit.

## Governance That Covers All Surfaces

Five different components (`serve`, cron, MCP, A2A, and messaging adapters) each had their own minimal tool registry. Now they share a single `governed_profile()` stack, enforced by a build-time AST check. The key insight is that `CHIMERA_GOVERNANCE=observe` is more useful than `enforce`—it logs what would have been blocked without actually blocking anything, so you can measure the impact before turning it on.

This release also wires up the approver system that existed but wasn't connected. Dangerous-class calls that read external data now have someone on the other side of the gate, reducing over-blocking without compromising security.

## What's Next

Run `chimera doctor` to check your setup, then review your deployment if you were binding to `0.0.0.0`. The full changes are in [Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
