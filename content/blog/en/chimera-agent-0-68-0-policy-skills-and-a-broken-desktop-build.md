---
title: "Chimera Agent 0.68.0: policy, skills, and a broken desktop build"
date: 2026-10-17
category: update
summary: "0.68.0 adds owner-level deny policy, local skill discovery, project prompt commands, and much more — but do not install the desktop app; use v0.67.4 until 0.68.1."
version: "0.68.0"
---

The headline for 0.68.0 is not a feature. It is a warning: **do not install this release.** The desktop app's backend fails to start because the PyInstaller freeze left out `chimera.cli.commands.apilogs`, which the CLI imports by name. The PyPI package is unaffected. If you run the desktop app, stay on v0.67.4 until v0.68.1 is out. The rest of this post covers what actually changed for people building agents.

## Owner policy moves from per-tool blocks to deny-only rules

Before this release, restricting what an agent could touch meant combining environment variables like `CHIMERA_TOOL_DENYLIST` with per-project rules. That worked for individual tools, but it did not give the owner of an install a single place to say "this provider never runs here" or "this MCP server never connects."

0.68.0 adds `<CHIMERA_HOME>/policy.json` — or the file `CHIMERA_POLICY_FILE` names. The rules are deny-only and ordered. You can deny a provider, an integration (`mcp:<name>`, `skill:<name>`), or a tool. A denied provider leaves the model lists and the tier ladder, and its calls are refused. A denied MCP server never connects. A denied skill is never loaded. A denied tool is refused at the registry.

The golden rule matters: a later `allow` only undoes an earlier `deny` in the same file. It never reopens `CHIMERA_TOOL_DENYLIST`, the reach floor, or a kernel block. An invalid policy file stops `serve`, `chat`, `assist`, `tui`, and `acp`, and fails `doctor`. The desktop app starts but refuses every tool until the file is fixed. The agent's write tools cannot write the policy file.

This is a different model from per-project rules. It is owner-level, install-wide, and it cannot be bypassed by a clever prompt or a project file. For anyone running a shared machine or a fleet of agents, that is the change that matters.

## Skills, prompt commands, and bounded questions

Local Agent Skills are now discovered as reviewable bundles. Skills found in workspace and user `.claude/skills` and `.agents/skills` trees are imported through the bounded upload path. They remain pending and tainted until approved, and they return to pending when their manifest changes. The API reports the winning source and collisions. That means a skill is not silently trusted just because it sits in a folder.

Project and global Markdown prompt commands work the same way. Terminal chat and the TUI discover namespaced templates in `.chimera/commands/` and `<CHIMERA_HOME>/commands/`. Templates expand `$ARGUMENTS` and `$1` into ordinary message text. Template content is never executed. This gives projects a way to ship repeatable prompts without granting the template any execution power.

The Code agent can now ask the user a bounded question. `ask_user` pauses an attended Code turn for an option or free-text answer, returns an explicit no-response result on timeout, and remains a distinct data-only kind that cannot approve a governed action. Terminal, bot, and unattended turns do not register it. That closes a gap: before, a Code turn that needed a decision from the user had no structured way to stop and ask.

## What to do now

If you use the desktop app, do not upgrade. Stay on v0.67.4. If you use the PyPI package, you can install 0.68.0 and start with the policy file: create `<CHIMERA_HOME>/policy.json`, write your deny rules, and run `chimera policy show` to see the rules in force. Full release notes are at [Chimera Agent v0.68.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.68.0).
