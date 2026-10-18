---
title: "Chimera Agent 0.69.0: plugins, worktrees, and conversations that know their repo"
date: 2026-10-18
category: update
summary: "Claude Code plugins arrive as inspectable data, every conversation records its repository and branch, and the sidebar finally groups worktrees under a single project."
version: "0.69.0"
---

## Plugins as data, not as running code

Before this release, a plugin was an opaque directory you handed to Chimera and hoped it would work. The framework had no vocabulary for what a plugin contained until it ran, and no way to inspect it without executing it. That gap made plugins risky in shared environments and impossible to reason about before installation.

`chimera.plugins` changes the model entirely. It reads a plugin directory — its manifest, skills, commands, agents, hooks, MCP and LSP servers — and classifies every component by what it would do if it ran: text-only instructions, a local process start, network access, or command execution. Nothing is installed, imported, executed or downloaded during this inspection. Only pinned sources are considered installable: a local path, a GitHub repository pinned to a commit SHA, or an HTTPS archive with a sha256 hash. Every problem carries a stable error code compatible with `claude plugin validate`, so you can integrate this into a pre-commit hook or a CI check before a plugin ever touches an agent.

The same reading logic powers the marketplace integration. `chimera.plugins` reads a `marketplace.json` and classifies each listed plugin by its capability surface. Entries that lack a pin stay visible with the reason they cannot be installed, so you can browse without accidentally pulling something mutable.

Plugins install disabled. `chimera plugin install` places them in `<home>/plugins` as pending, and nothing reaches the agent until you run `chimera plugin enable`. Enabling surfaces the diff: skills, commands, and agents appear namespaced under `plugin:name` as untrusted text. Agents follow project-agent rules; Claude Code tool names are translated and can only narrow existing permissions; `allowed-tools` and `model` fields in the manifest are ignored. A plugin command expansion marks the run as tainted, and hooks, `bin/` directories, and monitors stay inert. MCP servers are added only when you name them explicitly, through a pinned-manifest hold. An update that changes the manifest, hooks, servers, or tools holds the plugin with the diff shown. Bots, cron jobs, `serve`, and guest sessions get no plugin unless `CHIMERA_UNATTENDED_PLUGINS` explicitly lists it.

The Settings › Plugins screen shows every installed plugin with its status, source, pin, capability line, and component list. Discover shows the marketplaces you added with search and filters by category and by what a plugin runs. Adding takes a pinned marketplace, a local folder, or a `.zip`. Switching a plugin on shows exactly what will reach the agent and asks for each MCP server separately. Only you can do this: the MCP bridge can list, validate, and install pending, but it can never enable, remove, or add marketplaces.

## Every conversation knows its repository

A Code conversation used to be a flat file in a folder. The relationship between a conversation and the git repository around it was implicit: you knew which project you were working on because you opened the folder, but the framework did not. That made grouping, cleanup, and cross-worktree reasoning impossible to automate.

At the start of each turn, the conversation now records its project — the repository's main checkout — along with its branch and whether the folder is the main checkout, a git worktree, or a plain folder. This information is read from the git files directly, without running git, so it is fast and works even when the repository is in a broken state. The record survives the worktree's removal, which means the session list can group a repository's worktrees under the repository itself.

The Code sidebar uses this grouping. A repository's worktrees fall under the repository header — a collapsible section with a `+` for a new conversation there, a worktree count, and a menu for open, collapse, rename, hide, delete, and cleanup. Rows show the title, branch, and time; five per project with a "show more" link; search covers title, branch, and project; status filters appear only when they have counts. A switch turns the grouping off if you prefer the old flat list.

Worktree cleanup has its own dialog now. It lists every worktree of the repository with the reason each one is kept — main checkout, in use, dirty, unmerged, created outside Chimera — previews the removal, and removes only what the preview listed, using `git worktree remove` without `--force` and `git branch -d`. Only worktrees Chimera created can be removed there; their conversations are archived, never deleted. The MCP bridge can list but never prune.

The MCP bridge also gains the ability to open a conversation inside a specific project. `desktop_send` takes a `project` parameter — a registered project or a known repository — and a `worktree: "new"` option with an optional branch. Chimera creates and owns the worktree beside the repository in `.chimera-worktrees/<repo>/`, never in the temp folder, and the conversation groups under the project. Unknown projects, paths outside the project, and run-branch names are refused. A new worktree does not inherit the project's shell grant.

Conversation titles are now readable and renameable. The title follows your own name for it, then a title the caller passed, then the first `#` heading of a Markdown file the first message cites inside the workspace, and only then the first message itself. Rename with the pencil on the row or F2; an empty name returns to the automatic one. No title is generated by a model.

## What to do now

Upgrade to 0.69.0, open the Settings › Plugins screen, and add a marketplace you trust. Inspect a plugin with `chimera.plugins` before you install it. Create a worktree through the MCP bridge with `worktree: "new"` and watch it group under its repository in the sidebar.

The full release notes are at [Chimera Agent v0.69.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.69.0).
