---
title: "Chimera Agent 0.46.0: Rules That Apply Next Door"
date: 2026-08-17
category: update
summary: "Fixed silent data loss, untranslated skill cards, and gates that didn't gate — plus a library of 23 incident-derived skill cards."
version: "0.46.0"
---

## When Rules Don't Reach

Five JSON stores, including the skill store, previously allowed concurrent processes to silently overwrite each other's data. A run that learned something could have its memory erased by the next run. All five now lock and write atomically — no configuration needed. The same pattern fixed governance features that crashed on import and a Discord bot that ran without checks.

## Skill Cards as Incident Reports

Twenty-three cards now live in `skills/`, thirteen written from this project's own defects. Each documents a failure mode in the format Trigger/Do/Avoid/Check/Risk — data, not code. They're grouped by workflow phase (`define · build · verify · review · ship`) and tagged by topic. Import one with:

```
chimera skills-import skills/verify-before-claiming
```

Cards support nine languages through sidecar files that preserve the original SHA-256 hash. The system detects stale translations (claiming to translate text that changed) and incomplete ones (missing sections), but allows missing translations with clear labeling.

## Gates That Actually Gate

Three agent defects undermined load-bearing components without failing tests. The root cause: checks listed required behaviors instead of allowed exemptions. When new behaviors appeared, the gates stayed open. Now they list exemptions — if something isn't explicitly allowed to bypass checks, it gets checked.

Sixteen documentation claims were corrected across ten languages. Five were outright false: governance modes don't include `ask`, the desktop rail has no chat destination, and `CHIMERA_TAVILY_API_KEY` doesn't exist in the codebase. Two optimistic claims now carry their disconfirming evidence adjacent.

```
pip install -U chimera-agent
```

Browse cards at chimeraagent.space/skills [Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0) or check `bench/skillcard/RESULTS.md` for the opt-in performance tradeoff.
