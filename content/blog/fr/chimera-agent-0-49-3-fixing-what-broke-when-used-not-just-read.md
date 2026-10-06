---
title: "Chimera Agent 0.49.3 : Corriger ce qui casse à l'usage, pas seulement à la lecture"
date: 2026-10-06
category: update
summary: "Six défauts résolus après des tests en conditions réelles, incluant des échecs d'écriture silencieux, des résultats de tests trompeurs et des modèles par défaut obsolètes."
version: "0.49.3"
---

## Quand les outils mentent sur leur propre état

La leçon la plus coûteuse vient de la lecture des données MCP. Une tâche à 5,11$ ne produisait aucun fichier car le message de refus ne distinguait pas un rejet humain d'une approbation impossible. Trois tentatives identiques ont brûlé le budget avant que les utilisateurs comprennent que les relances étaient vouées à l'échec. Désormais, chaque cas de refus s'explique : un rejet humain indique qui a refusé, un rejet système nomme le bloc de configuration concerné, et les cas HTTP précisent explicitement qu'aucun approbateur n'existe tout en proposant deux solutions - activer la pause-pour-approbation ou éviter le contenu non fiable.

## Vérification qui n'en était pas

Un badge `verified: True` avec des logs de tests passants est devenu inutile lorsque des écritures ultérieures modifiaient les fichiers. Les utilisateurs voyaient des coches vertes tout en travaillant sur du contenu non vérifié. Le système vérifie maintenant si les fichiers livrés correspondent à l'état vérifié et affiche des badges d'avertissement en cas d'écart. La vérification initiale reste visible - elle était exacte au moment donné - mais l'incohérence actuelle apparaît à côté.

## Valeurs par défaut dépassées

Les affectations de modèles avaient dangereusement dérivé :
- Le modèle principal coûtait 4x plus que les options actuelles
- Un modèle preview occupait un slot critique par défaut
- Les fenêtres de contexte ne répondaient plus aux exigences

Les nouveaux paramètres par défaut correspondent au rapport prix/performance actuel (deepseek-v4-flash-0731 à 1/4 du coût) tout en conservant les capacités. Le fichier .env.example ne suggère plus de modèles retirés ou des prix d'une autre époque. Notamment, la sélection des modèles ne reposait pas sur des tests de qualité de sortie - huit candidats écrivaient tous les fichiers avec succès - mais sur des facteurs mesurables : prix, fenêtre de contexte et benchmarks tiers.

## Que faire maintenant

Mettez à jour immédiatement si vous utilisez :
- Des serveurs MCP (comportement des tests modifié)
- La vérification de fichiers (nouvelle détection d'incohérence)
- Les modèles par défaut (changements majeurs coût/performance)

Les détails techniques complets expliquent la logique de chaque correction : [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
