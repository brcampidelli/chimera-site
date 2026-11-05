---
title: "Chimera Agent 0.84.0: Code Turns That Record Lessons and Close the Loop"
date: 2026-11-05
category: update
summary: "Code-screen turns can now record lessons from their own output and, when enabled, commit, open a PR, and follow CI through to merge—both features off by default."
version: "0.84.0"
---

The Code screen has always been a tight loop: you prompt, the agent works, you verify. But what happened after verification was a dead end. The turn ended, and nothing the agent learned during that turn was kept for the next one. Two changes in 0.84.0 break that pattern, and both ship with the switch flipped off.

## Lessons recorded from finished turns

Before this release, a completed Code turn left no trace of what the model got right or wrong. The only memory was the conversation itself. That meant every new turn started from the same blank state, even when the agent had just demonstrated it could handle a particular kind of task correctly.

The Code screen now records a short lesson after each finished turn. The lesson goes into its own store, `code_lessons.json`, and only the Code screen reads it—and only when skill cards are turned on. The setting stays off by default because seven pre-registered runs found no measurable gain from the recorded lessons. Autonomous runs never see them at all.

What gets recorded matters as much as where it goes. An answer you never checked is stored as unverified, not as a success. Background work and tainted output are kept out of the prompt entirely. The recorded text is capped, so the lesson store does not grow unbounded. The design assumes that a lesson you did not explicitly verify is not a lesson you want the agent to repeat.

Minting also gets tighter in this release. Every minting path now names its trace, which fixes a bug where cards were refused because the system could not find evidence of where they came from. Recurrence detection now requires two shared content words instead of one, and the check works in Portuguese as well. The change reduces false matches without blocking legitimate ones.

## Closing the loop: commit, PR, and CI

The second change is larger in scope. With "Close the loop" turned on in Settings, a Code-screen turn that passes verification and its own diff check does not stop there. It commits on its worktree branch, pushes it, opens a pull request, and watches the CI run in the background. If CI comes back red, the agent reads the failure and runs up to two fix turns. If CI comes back green, the agent merges the pull request.

This was not possible before. A turn that produced working code still required you to switch contexts, stage the changes, write a commit message, push, open the PR yourself, and babysit the checks. Now the agent handles that sequence, but only when you explicitly allow it.

The safeguards are specific and non-negotiable. A pull request that touches billing, a destructive migration, row-level security, or grants never merges automatically—the agent will open it, but you must merge it yourself. A turn that would commit a secret commits nothing. Only the owner's screen can turn the feature on or start it. The bridge, channels, guests, and background work never trigger it. The main branch, a detached HEAD, and force pushes are all refused. The design draws a hard line: automation stops where irreversible damage becomes possible.

The feature is off by default. You enable it in Settings on the owner's screen, and it only applies to Code-screen turns that pass verification and the diff check. If you never turn it on, nothing changes about how your turns end.

Both features share the same philosophy: record what you verify, automate what you trust, and default to doing neither until you decide otherwise.

To start: update to 0.84.0, open Settings on the owner's screen, and decide which loops you want the agent to close. Full notes at [Chimera Agent v0.84.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.84.0).
