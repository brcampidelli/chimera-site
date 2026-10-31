---
title: "Chimera Agent 0.81.0: Atomic sessions, named endpoints, and artboard fixes"
date: 2026-10-31
category: update
summary: "Session writes are now atomic, HTML artboards carry their own fonts and images, and you can route models to named OpenAI-compatible endpoints."
version: "0.81.0"
---

## Sessions no longer corrupt under parallel turns

Reopening a Code conversation used to rewrite its session file in place. The write came from a read taken before a wait of up to ten seconds. During that window, another reader or a crash saw half a file. Turns saved in the gap were lost. Under many parallel turns, this damaged several sessions and their backups.

The fix makes session writes atomic, flushed to disk, and locked across processes. The reopen step now merges only the fields it actually learned. You stop losing turns to a race between a read and a delayed write. If you run multiple agents against the same session, or restart while a turn is in flight, the file stays whole.

## HTML artboards get their own assets and inspector

Before this release, an HTML artboard pulled fonts from a token-level list written as one quoted name. Screens fell back to a serif face on the canvas and in exports. The inspector always showed the first artboard, so a second HTML screen could not reach its tweaks or select its elements.

Each design now keeps its own store of images and fonts. You add PNG, JPEG, WebP, or GIF images, and WOFF2, WOFF, or TTF fonts, from the assistant. The assistant knows which assets exist. Screens and exports use them. SVG and disguised files are refused. On the canvas, assets arrive as inline data, so the sandboxed screen still reaches no network.

Clicking an artboard or its label makes it the active one. The inspector follows. A second HTML screen gets its own element selection and style tweaks. The design system's fonts render on the canvas and in exports.

## Named endpoints replace the global base URL

Routing models to an OpenAI-compatible provider previously meant setting `CHIMERA_API_BASE` globally. Every model went through that single base. You could not mix providers in one configuration without proxying them yourself.

`CHIMERA_ENDPOINTS` lists endpoints by name. Each entry declares a base URL and the variable holding its key. A model written as `endpoint/<name>/<model>` goes to that endpoint with its own base and key, beside OpenRouter. The privacy card, receipts, and Usage panel name the endpoint and its host. `/api/endpoints` lists and tests them.

This lands as part of the multi-provider routing work. You keep separate keys for separate providers, and the agent routes each model to the correct base without a proxy in front.

## Connectors you name in a message connect for that turn

With MCP autoload off, a Code turn whose message names a configured, enabled connector connects just that one. The turn says so, and keeps the connector for later turns that name it. Text from tools, pages, or files never switches a connector on. Bots keep their own list.

This stops a mention in a retrieved document from silently enabling a connector you did not intend to use. You control connection by what you type in the message.

## Smaller fixes that remove friction

A message that names Chimera Design while asking for a code path, a pytest command, or words like fix, implement, or test no longer opens the canvas. The system no longer reads engineering work as a design request.

The detail card of a URL connector no longer claims that testing starts a command or that npx may download a package. A server on loopback no longer carries the "reaches the network" chip. What the card describes now matches what the connector actually does.

## Get it

Install or upgrade with pip:

```
pip install chimera-agent --upgrade
```

Read the full changelog at [Chimera Agent v0.81.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.81.0).
