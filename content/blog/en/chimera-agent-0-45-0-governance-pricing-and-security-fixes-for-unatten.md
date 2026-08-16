---
title: "Chimera Agent 0.45.0: Governance, Pricing, and Security Fixes for Unattended Runs"
date: 2026-08-16
category: update
summary: "This release hardens the unattended execution path with mandatory auth, spending caps, and unified governance across all surfaces."
version: "0.45.0"
---

## Security First: Binding and Authentication

Previous versions of Chimera Agent exposed an unauthenticated gateway on all network interfaces by default. The `docker-compose.yml` published port 8765 globally, and `.env.example` shipped with no token set. This meant a one-command deployment could inadvertently create an open agent gateway accessible to anyone who discovered the port.

v0.45.0 changes this in three ways:
- The `serve` command now refuses to bind to non-loopback addresses without an authentication token
- Docker Compose defaults to publishing on `127.0.0.1` only
- An explicit `--allow-insecure-bind` flag exists for legitimate cases (like authenticated proxies)

This is a breaking change for deployments accessing the gateway from another machine. Set `CHIMERA_SERVER_TOKEN` or use the escape hatch if needed.

## Spending Control That Actually Works

Before this release, the only limits were step counters - a job in a retry loop could drain your entire provider balance. v0.45.0 introduces three separate spending ceilings:
1. Per-run limit
2. Per-job limit (for scheduled tasks)
3. Daily aggregate limit that prevents cron jobs from firing

Unpriced calls now stop execution rather than silently continuing. Local models are treated as zero-cost rather than unknown, preventing caps from blocking the one configuration that can't overspend. Run `chimera doctor` to check if your default model can be priced before setting limits.

## Unified Governance Across All Surfaces

Previously, each execution surface (`serve`, cron, MCP, A2A, and messaging adapters) built its own tool registry. Now a single `governed_profile()` constructs the stack for all five, with build-time AST checks preventing regression.

The key insight: `CHIMERA_GOVERNANCE=observe` mode exists to measure the cost of enforcement before enabling it. It runs the full stack while only recording what would be blocked, providing concrete data rather than forcing a production risk. Default remains `off` - governance should be an explicit opt-in.

This release also wires up the long-dormant approver system for dangerous-class calls, eliminating over-blocking (false positives) without reducing attack blocking effectiveness.

## What's Next

Upgrade with `pip install --upgrade chimera-agent` and review your deployment's authentication and spending limits. For editor integration, point your editor's agent settings to `chimera acp --workspace <repo>`. Full details in the [release notes][Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
