---
title: "Chimera 0.70.0: Undo, Design, and Editor Control"
date: 2026-10-19
category: update
summary: "Terminal chat gains desktop-grade undo and planning, the Editor gets git-aware diffs and file previews, and Chimera Design adds export, canvas, and agent tooling."
version: "0.70.0"
---

## The terminal stops being a second-class client

Before this release, `chimera chat` and `chimera assist` operated with a narrower set of safeguards than the desktop. Context grew until it hit a limit, plans were not shown before execution, and undoing a turn meant trusting a simpler restore path. That gap is now closed.

Terminal sessions compact context by default using the same policy as the desktop. If you want the old behavior, `--no-compact` disables it. `/plan <task>` now shows the plan first and runs the task only after approval. Approving a plan does not pre-approve risky actions. `/undo N` lists the files touched in the last N turns, asks for confirmation, and restores through the same durable store the Code screen uses. Files you edited after the target turn are left alone. Plain `/undo` still reverts the last turn.

The desktop also gains a rewind timeline in the conversation header. Each saved point shows the time and how many files it touched. Selecting one shows exactly which files would be restored and which would be skipped because you edited them later. The restore itself can be redone from the same timeline. Turns with no saved copy appear disabled with the reason. Neither the preview nor the restore route is exposed on the desktop bridge, so no paired device or outside client can trigger a restore.

## The Editor now reflects what git sees

The file tree previously gave you a list of names. It now marks modified, added, and untracked files with a letter, and folders with a dot, using the same git status as the Changes card. The status refreshes after a save and when an agent turn ends. Ctrl+P opens a file by name. HTML files get a Preview toggle in the same sandbox the Code screen uses, including unsaved edits. Closing a tab with unsaved changes asks whether to keep editing, close without saving, or save and close.

Selection-based actions change how you ask for code help. Select lines and press Ctrl/⌘+L to send them to the Code conversation as a context item, the same path as an `@` mention. Ctrl/⌘+I adds `propose_change`, which the server runs read-only with one file and line range. The proposal returns as an inline diff with Accept and Reject. Accept saves through the Editor. If the lines change before you respond, the proposal disappears. A file that changes on disk while open is held with its diff and stays read-only until you choose Keep or Undo.

The Code composer now supports `@` mentions for files, folders, designs, and recent conversations. A file up to 8,000 characters is attached inline, sanitised, fenced as data, and recorded in the ledger as a read. Larger files and folders go by path for the agent to read. Absolute paths and `..` are refused before the turn runs. Symlinks out of the project and Chimera's own `.env` are refused when resolved. Guests on share links cannot mention designs or conversations.

## Chimera Design gains export, canvas, and a tool

Chimera Design now exports to PDF, PNG, and PPTX. PDF is the static page printed by Playwright's Chromium, one page per artboard, with JavaScript off and non-`data:` requests aborted. PNG produces one image per artboard or a zip. PPTX places each element at its frame on a slide per artboard. When Chromium or python-pptx is missing, the export refuses and tells you what to install. Nothing is downloaded automatically.

The canvas opens in the Code screen's centre slot, with the conversation on the left and the canvas on the right. It autosaves through the operations route with a visible state. Manual and agent edits share one undo history. A turn that asks for a design shows an "Open in Chimera Design" action. Beside the canvas you can propose from a brief, refine a selection, audit, edit tokens, check the design against them, comment per element, restore versions, and export to HTML. Restore and export ask first.

The `design` tool is offered only when a turn asks for a visual design. A deterministic detector covers Portuguese, English, and Spanish, with accents folded and whole words matched. Code senses such as "design pattern" or "system design" never fire. The tool obeys the posture, never sends HTML to a bot, marks its output as untrusted, and stays out of guest turns. `CHIMERA_TOOL_DENYLIST=design` removes it.

## What to do now

Update to 0.70.0 and open a terminal session: run `/plan` before a risky task, then `/undo N` after one. In the Editor, select a block and press Ctrl/⌘+I to see a proposed change as a diff. For design work, open the canvas from a turn that asks for a visual design and export from there. Full release notes: [Chimera Agent v0.70.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.70.0).
