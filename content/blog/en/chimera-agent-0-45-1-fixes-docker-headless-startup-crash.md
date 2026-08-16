---
title: "Chimera Agent 0.45.1 fixes Docker headless startup crash"
date: 2026-08-16
category: update
summary: "v0.45.1 resolves a critical Docker deployment issue where headless instances failed to start due to an eager FastAPI import chain."
version: "0.45.1"
---

## Docker deployments no longer crash on startup

Chimera Agent 0.45.0 introduced a regression where headless Docker containers running the gateway service would crash immediately on startup. The issue occurred because the cron path began importing `chimera.api.usage`, which triggered an eager import of FastAPI dependencies - despite the Docker image intentionally not including the `desktop` extra.

This wasn't caught during testing because development environments typically have FastAPI installed. The 2,945 existing tests all passed since they ran in environments where the dependency happened to be present. The failure only manifested in production deployments using the lean `.[full]` installation.

## Lazy imports prevent hidden dependencies

The fix addresses the root cause rather than just adding missing dependencies. Previously, five CLI-reachable leaf modules in `chimera/api` were silently pulling in the entire web stack through eager re-exports in `__init__.py`. v0.45.1 makes these imports lazy, so they only load when actually needed by web-facing components.

This maintains the documented separation where the core CLI/gateway shouldn't require web dependencies, while still ensuring `chimera app` fails clearly when FastAPI is missing for legitimate web use cases.

## New test prevents regression

A dedicated test now verifies this behavior by running in a subprocess where `fastapi` is deliberately made unimportable. The test first confirms this environment setup works before proceeding with other assertions - catching cases where tests would silently pass due to environmental contamination.

The fix has been verified end-to-end with clean `.[full]` installations. Headless Docker deployments can now run `serve --cron` as expected.

For existing deployments affected by this issue, upgrade to v0.45.1. The [release notes][Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) contain full details on the changes from v0.45.0.
