---
title: "Chimera Agent 0.66.0: Settings that read, rails that speak"
date: 2026-10-13
category: update
summary: "Settings becomes a navigable document, the rail and composer stop hiding their controls, and Work, Memory, and Profile stop speaking in identifiers."
version: "0.66.0"
---

## What changed for the person building agents

The release tightens the parts of the app that were technically present but practically invisible. Settings is the clearest example. It was a single scrolling list where Appearance sat inside General, and where rows for key pools, MCP, sandbox, and diagnostics shared space with everyday preferences. That made the screen hard to scan and harder to link to. In 0.66.0, Settings reads as a document with a table of contents. Sections sit beside the content on a wide window, Appearance is its own section, and the rows most people never change fold under Advanced. Nothing was removed; it was moved out of the way.

The same logic applies to the desktop rail. Five icons with names only on hover forced people to remember what each destination was. Now the rail writes the name under every icon. The Code screen's composer follows the same principle. The pickers for who runs the turn, cost profile, model, and style used to occupy four rows above the message box. They now start as one line of chips, and the whole line opens them. Armed Fuse and Plan first read as pressed outlines, which leaves Send as the only filled button in the row. The change is small, but it removes the visual competition between configuration and action.

## Where the app stopped speaking its own language

Several screens printed internal identifiers instead of meaning. Memory kinds appeared as episodic and semantic in monospace on every row. Schedules were described in English regardless of the app language. Profile showed source ids like chat and extracted, plus the store's tainted flag, in English for every locale. The learned-skills rows did the same with tainted and retire?, and the second one used the red of a failure. Work › Git asked for confirmation through the browser's confirm box, which could not name the files and did not look like the app.

Each of these was a place where the interface exposed the data model instead of the decision. The release translates Memory kinds, describes schedules in the app's language, and makes Profile say where a fact came from in a sentence. Unverified counts and the no OS sandbox note move from red to amber, because they are conditions to review, not errors. The Git discard question now sits under the button, red, with Cancel first, and each file checkbox has a name. In Portuguese, Connections and Usage also stop using jargon: Ferramentas externas (MCP), Ferramentas, and APIs (OpenAPI) replace the previous labels.

## What to do now

Update to 0.66.0 and open Settings. The new Appearance section is where the accent colour, surface tint, and high-contrast option live, and every combination is checked for contrast. Then open Work › Runs and use the search and outcome filter on a long history; the earlier attempts of a run fold under the one that decided it. If you maintain links into the app, note that Knowledge and Automation tabs now have addresses, so they survive a reload and answer the back button. The full list is in the release notes. [Chimera Agent v0.66.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.66.0)
