---
title: "Chimera Agent 0.76.0: Per-project models and a Claude fix"
date: 2026-10-25
category: update
summary: "Chimera Agent 0.76.0 lets each project pin its own model and fixes Claude models in the Code screen."
version: "0.76.0"
---

## Per-project models

Before this release, changing the model for one project changed it for every conversation in every project. The model was a single global setting, and if you wanted different models for different projects, you had to remember to switch back and forth manually. That was error-prone and made it hard to keep a project on a specific model for consistency or cost reasons.

Now each project can have its own model. A Code conversation uses its own pinned model if it has one, then the project's model, then the global default. The turn's receipt shows which model was used, so you can verify at a glance. Changing the model for one project no longer affects conversations in another. This means you can set a project to use a cheaper model for experimentation and another to use a more capable model for production, without worrying about cross-contamination.

When the agent proposes a different model, it can only leave you a card naming the conversation or project it would apply to. Nothing changes until you approve it. This keeps you in control and prevents the agent from silently switching models mid-conversation.

## Claude models work in the Code screen again

With an Anthropic model as the default, every coding turn failed on its first step with an error about a tool's input schema. The question tool's schema used a construct that Anthropic's API refuses. This meant that if you were using Claude as your default model, you couldn't use the Code screen at all—every turn would error out before doing anything useful.

The schema is now a plain object, which Anthropic's API accepts. A test checks every tool's schema so the problem cannot come back. This fix is important because it ensures that all supported models work across all screens, not just the ones that happen to be lenient about schema quirks.

## What to do now

Update to version 0.76.0 and set a project-specific model if you need one. If you were avoiding Claude in the Code screen, try it again. See the [release notes][Chimera Agent v0.76.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.76.0) for full details.
