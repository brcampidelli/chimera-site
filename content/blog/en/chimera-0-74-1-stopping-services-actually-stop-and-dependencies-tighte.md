---
title: "Chimera 0.74.1: Stopping services actually stop, and dependencies tighten"
date: 2026-10-23
category: update
summary: "Fixes a race where a stopping service vanished from tracking before it exited, and bumps two indirect dependencies with known vulnerabilities."
version: "0.74.1"
---

The `chimera service stop` command had a race condition that made it lie. You told a background service to stop, it acknowledged the request, and then it disappeared from the service list while still running. If you followed up with `chimera service stop --now` to force-kill a stuck shutdown, the CLI answered "not running" — even though the process was alive and consuming resources. Version 0.74.1 removes that gap.

## Why a stopping service went invisible

A Chimera background service runs a long-lived agent loop. When it receives a stop signal, it needs to finish in-flight turns, flush state, and tear down connections. The old code removed the service record from the tracker the moment it accepted the stop request. That was a bookkeeping shortcut: the service was "stopping" in its own view, but to the rest of the system it no longer existed.

The immediate problem was `--now`. A force-stop checks the tracker for a matching service ID. If the record is gone, the command reports nothing to stop and exits. The actual process kept running, holding locks, sockets, or GPU memory, until it eventually finished its cleanup or was killed externally. For an operator debugging a stuck agent, this meant the tool said everything was fine while the process table showed otherwise.

## What the fix changes for service lifecycle

A service now stays visible in the tracker with a `stopping` status from the moment it accepts the stop request until it exits. The tracker holds the record, so any subsequent `stop` or `status` call sees it. The service performs its graceful shutdown — completing the current turn, persisting whatever it needs, closing loops — and then removes itself. Only after the process exits does the record disappear.

The `--now` flag still exists, but its behavior is tighter. It sends a force-kill only after confirming the tracked process matches the service ID on file. If the service already exited cleanly between the last check and the `--now` call, the command reports that instead of firing a signal at a recycled PID. This prevents accidental kills of unrelated processes that happened to reuse the same identifier.

For anyone running multiple Chimera services on one machine, this removes a class of heisenbugs where a restart script would launch a new instance while the old one was still shutting down, because the script couldn't see the old instance to wait on it.

## Dependency patches that ship with this release

Two indirect dependencies are bumped to close security advisories. Neither is called directly by Chimera agent code, but both sit in the supply chain of common workflows.

GitPython moves to 3.2.1. Versions up to 3.2.0 checked a submodule's `.git` path only after cloning into it, which allowed a crafted repository to trigger path traversal during the clone operation. This matters if your agent clones repositories as part of a tool-calling loop — for example, a code-review agent that checks out pull requests. The advisory rates it high severity.

OpenTelemetry moves to 1.45.1. The previous ceiling, 1.45.0, parsed the `tracestate` header without a bound on the number of entries. A downstream service that reflects unbounded `tracestate` back at your instrumented agent could cause excessive memory use. Chimera's own tracing surfaces are unaffected, but any agent that exports spans to an OpenTelemetry collector over HTTP is exposed through the SDK. The advisory rates it moderate.

Both patches are minimum-version bumps in the dependency tree. No API surfaces change. If you pin dependencies with a lockfile, running your resolver again after updating Chimera will pull the new versions.

## Upgrading

Install the release directly:

```
pip install chimera-agent==0.74.1
```

If you use the Chimera CLI to manage running services, restart any long-lived agents so they pick up the corrected lifecycle tracking. The release notes with the full changelog are at [Chimera Agent v0.74.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.74.1).
