---
title: "Chimera 0.72.0: Your Chrome, on Your Terms"
date: 2026-10-22
category: update
summary: "Chimera 0.72.0 adds per-site browser trust, optional Google search, and a pairing flow that keeps the Chrome key out of the agent's shell."
version: "0.72.0"
---

## What Changes for Your Agents

Until now, giving Chimera access to your Chrome meant accepting a binary choice: either the agent could act in the browser, or it couldn't. There was no way to say "yes on this site, ask everywhere else," and no way to let it search Google without also opening the door to everything else a browser can do. The extension itself had also lost its popup in a previous version, which meant you couldn't stop a run or grant a per-site permission from the browser itself.

Version 0.72.0 replaces that binary with a per-site trust model. You list the sites where Chimera may click and type without asking, and everywhere else each action shows you a card first. The distinction matters because it matches how people actually work: you might trust an agent to fill a form on your internal dashboard, but not to touch your payment provider. The release keeps that boundary explicit. Buying, paying, sending, deleting, publishing, and form submissions still ask even on a trusted site. Passwords, card numbers, verification codes, payment frames, downloads, and uploads are refused outright. At a CAPTCHA, the agent stops and hands you the tab.

The extension also checks again just before acting that the element it decided on is still the one it's about to click, and that nothing covers it. That second check closes a gap where a page could change between the agent's decision and the action itself.

## Google Search Becomes a Choice

Google search in your own Chrome is now off unless you turn it on. With `CHIMERA_BROWSER_GOOGLE=ask`, desktop turns can search Google in a visible tab of your paired Chrome, and each search shows you a card first — even if approvals are set to allow. The pacing is deliberately human: one search per 20 seconds, five per turn, 30 per day. Results come back as titles, links, and snippets, marked as fetched content.

What the release excludes is as important as what it includes. Bots, scheduled jobs, and the MCP bridge never get Google search. At the first CAPTCHA or unusual-traffic page, it stops and hands you the tab, and it doesn't try again for 30 minutes. There's no disguise involved. The feature is designed for a person watching their own browser, not for unattended automation.

## Pairing No Longer Leaks the Key

Pairing Chrome is now a six-digit code from your screen. Settings → Browser shows a one-time code, valid for two minutes with five tries, that you type in the extension's popup. The key then goes to the operating system's vault, never into the environment of the commands Chimera runs. That's the fix that matters most for anyone who runs agents locally: the server token alone, which any local process can read, no longer gets you Chrome. Changing the trusted-site list, stopping, and unpairing all require the app's own screen.

The release notes state the remaining limit plainly: a malicious program already running as your Windows user can still take the key. The docs say so. But the key no longer sits in the shell environment where a stray command or a poorly written agent could read it.

To start, open Settings → Browser in the app. It shows whether the extension is paired and connected, gives you the one command to register it, and lets you list the sites where Chimera may act without asking. The full release notes are at [Chimera Agent v0.72.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.72.0).
