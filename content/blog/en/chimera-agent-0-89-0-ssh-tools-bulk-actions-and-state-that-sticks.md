---
title: "Chimera Agent 0.89.0: SSH tools, bulk actions, and state that sticks"
date: 2026-11-13
category: update
summary: "File tools now run on the SSH host, commands survive dropped connections, bulk folder and conversation actions arrive, and the Plan-first choice persists across reloads."
version: "0.89.0"
---

## What you set stays set

Before this release, the "Plan first" choice in the Code composer was a session-only preference. You could switch it to Always or Never, but reloading the window reset it to Auto. That meant every return to a conversation required reconfiguring the mode you already decided on. The setting is now remembered per conversation. A new conversation picks up the last choice you made, and a plan waiting for approval—along with its card—survives a reload. The test that pins this behavior confirms the card comes back, so you no longer lose a pending plan because the tab refreshed.

Settings search had a blind spot of a different kind. The Environments card lived on the General tab, but searching for "WSL," "SSH," or "environment" returned nothing. The card was present but unreachable through the search field. That is fixed. Typing any of those terms now lists the Environments card and the allowed SSH hosts, and opening a result scrolls directly to it. If you manage multiple remote environments, you can now find them the same way you find everything else.

## File tools cross the SSH boundary

SSH conversations previously refused file operations. Reading, writing, editing, patching, listing, grep, and glob all stopped at the local boundary. That restriction is gone. In an SSH conversation, those tools now act on the remote folder. The implementation adds several guardrails because a tool that writes to a remote host is a tool that can cause damage.

Paths cannot leave the conversation's folder. The check is lexical and confirmed by the host's own `realpath`, so a symlink cannot escape. Credential files—`.ssh`, `.env`, keys, and cloud configs—are refused outright. A write is replaced only after its size and hash are checked on the host, which prevents overwriting a file that changed since you last read it. The Manual card shows the diff of the remote file and names the host, so you know exactly what changed and where. When a turn reads outside content and then writes to a git hook, shell startup file, cron, or systemd unit, Chimera asks first. What the host returns counts as outside content, so the prompt appears when the risk is real.

Commands on the SSH host now survive a dropped connection. Each command runs detached under its own run ID. If the link drops, Chimera reconnects and resumes reading the output without restarting the command. A script that arrives incomplete is never run. A timeout or Stop ends the entire process group. If Chimera closes mid-command, the command keeps running and the conversation that started it is told where its output is. You can reconnect and pick up the log without guessing whether the command finished or ran twice.

## Act on many items at once

Managing folders and conversations one at a time was the only option. The Folders card in Settings and the Code sidebar now have checkboxes, a tri-state "Select all," and an action bar. For folders, you can pin, unpin, allow or revoke commands, remove from the lists, or show again. For conversations, you can archive, unarchive, delete, or remove their folders from the lists.

Selection mode draws every row so nothing off screen is acted on by accident. Deleting asks first and shows the count. Allowing commands in bulk also asks first. One failure is counted without stopping the rest, so a single problematic item does not block the operation on everything else you selected.

Update with `pip install --upgrade chimera-agent`. The full notes are at [Chimera Agent v0.89.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.89.0).
