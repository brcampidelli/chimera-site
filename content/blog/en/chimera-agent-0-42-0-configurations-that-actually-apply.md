---
title: "Chimera Agent 0.42.0: Configurations That Actually Apply"
date: 2026-08-11
category: update
summary: "Fixed seven settings that saved but didn't change behavior, unified security controls, and made agents configurable rather than accepted defaults."
version: "0.42.0"
---

## Settings That Now Apply

Seven configurations previously saved without taking effect—default model, response caching, custom endpoint, timeout, fallback chain, and prompt caching. The `LLMGateway` captured settings at construction, but `chimera app` built it once per process. Six now update live. Three (cascade, chat persistence, chat memory) apply to the **next conversation** and state this. Two requiring restart (scheduler daemon and MCP autoload) declare it. Labels now come from the server, preventing silent misalignment.

## Unified Security Controls

`CHIMERA_TOOL_ALLOWLIST` and `CHIMERA_TOOL_DENYLIST` previously only affected `chimera run` and `chimera solve`. Other surfaces (app, API, batch jobs, messaging bots) ignored them entirely. Now they apply everywhere. Denials **combine**—deployment, request, and posture restrictions must all permit a tool. Permissions **intersect**, preventing requests from elevating beyond their sender's scope. Fixed `explore_repository` bypassing filters due to late registration.

## Agent Identity and Instructions

Agent name, language, and permanent instructions were previously non-functional. `profile.json` went unread by the API, persona facts applied only when relevant to a turn, and the unconditional preamble space was reserved for REPL/OpenAI compatibility. Now they apply to code editing, autonomous execution, and messaging. Instructions **append**—default prompts retain security guards, and custom blocks warn when they don’t grant capabilities.

## Deployment Posture as a Floor

Execution scope, approval requirements, and host command permissions were scattered across deleted components, hardcoded pairs, and an env var rejected by `PATCH /api/config`. Now consolidated into a single card. Deployment posture is a **floor**, not a default—clients can’t silently override restrictions on machines they don’t control. Host execution requires explicit confirmation.

## What to Do Next

Run `chimera app update` and review [Chimera Agent v0.42.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.42.0) for details on project-level agents, security audit fixes, and skill card activation.
