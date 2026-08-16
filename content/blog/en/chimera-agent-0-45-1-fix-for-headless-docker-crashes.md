---
title: "Chimera Agent 0.45.1: Fix for Headless Docker Crashes"
date: 2026-08-16
category: update
summary: "v0.45.1 fixes a critical Docker startup issue where headless containers crashed due to an unnecessary FastAPI dependency."
version: "0.45.1"
---

## Why Docker Containers Crashed on Startup

Chimera Agent 0.45.0 introduced a silent failure for headless Docker deployments. The container image installs `.[full]` without the `desktop` extra, which intentionally excludes FastAPI. However, the cron path started importing `chimera.api.usage`, triggering eager initialization of the API module. This pulled in FastAPI as an indirect dependency through a JSONL reader, causing containers to crash-loop with `ModuleNotFoundError`.

The bug escaped detection because:
1. Development environments typically have FastAPI installed
2. None of the 2,945 existing tests simulated a clean `.[full]` installation
3. The failure only manifested in production deployments

## Lazy Loading for Core Dependencies

The fix addresses the root cause rather than masking symptoms. Adding `desktop` to the image would have worked but violated the extra's documented purpose ("the core CLI/gateway never needs it") and increased image size unnecessarily.

v0.45.1 modifies `chimera/api/__init__.py` to:
- Resolve re-exports lazily instead of eagerly
- Keep FastAPI dependencies isolated to web-specific components
- Maintain clear failure modes when `desktop` is actually required

Five leaf modules (`usage`, `roles`, `sessions`, `posture`, and `config_api`) no longer implicitly pull the web stack when imported by CLI operations. The gateway remains functional with just `.[full]` installed.

## New Safety Net

A subprocess test now verifies imports work without FastAPI available. This would have caught the issue pre-release by:
1. Running in an environment with `fastapi` deliberately made unimportable
2. Asserting core functionality before proceeding to other checks
3. Mirroring actual deployment conditions

End-to-end verification confirms the fix: a clean `.[full]` installation can now run `serve --cron` without crashing.

Upgrade with `pip install -U chimera-agent==0.45.1`. For deployment verification, test your container with `serve --cron` and check for gateway initialization messages. [Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) has full technical details on the changes.
