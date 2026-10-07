---
title: "Chimera Agent 0.49.3 : Erreurs plus claires, modèles mis à jour"
date: 2026-10-03
category: update
summary: "Six correctifs pour des messages trompeurs et des valeurs par défaut obsolètes, tous identifiés en développant des projets réels avec le framework."
version: "0.49.3"
---

## Quand le MCP bloque les écritures

La lecture de données via MCP précédemment contaminait les exécutions sans expliquer pourquoi les écritures échouaient. Le message d'erreur regroupait trois scénarios distincts : le refus de l'utilisateur, la configuration du propriétaire et les cas où aucune approbation humaine n'était possible pour une requête HTTP. Les utilisateurs voyaient des messages de refus identiques pour ces trois cas, perdant du temps et du budget sur des tentatives vouées à l'échec. Désormais, chaque cas reçoit une explication spécifique - particulièrement cruciale dans les contextes HTTP où le message indique clairement que l'approbation est impossible et suggère soit d'activer la pause pour approbation, soit d'éviter le contenu non fiable.

## Des tests qui testent vraiment

Le bouton de test MCP vérifiait auparavant la connectivité du serveur tout en masquant silencieusement si les agents pouvaient réellement utiliser ces outils. Un serveur pouvait passer le test alors que ses outils restaient indisponibles pour les agents (lorsque le chargement des serveurs MCP au démarrage était désactivé). Maintenant, le test rapporte à la fois la connectivité et la disponibilité réelle, avec des messages distincts expliquant comment résoudre chaque problème potentiel.

## Vérification vs. Livraison

La vérification des exécutions affichait auparavant `verified: True` sans indiquer si les fichiers actuels correspondaient à ceux qui avaient été vérifiés. Une exécution vérifiée pouvait ensuite contenir un contenu complètement différent (20/20 échecs de tests dans un cas observé) sans aucune indication visuelle. Les exécutions suivent désormais `delivered_matches_verified` et affichent des badges clairs lorsque le contenu du disque diverge de l'état vérifié.

## Modèles par défaut mis à jour

La liste des modèles par défaut était en retard par rapport aux offres actuelles :
- Le modèle de base est passé de `deepseek-chat-v3.1` (0.25/0.95) à `deepseek-v4-flash-0731` (0.065/0.18)
- Le modèle haut de gamme a remplacé `deepseek-r1` par `z-ai/glm-5.3`
- Les modèles de jugement et de panel de fusion ont été mis à jour vers les modèles de génération actuelle

Ces changements reflètent des améliorations mesurées en termes de prix, de taille de fenêtre contextuelle et de benchmarks tiers - pas des affirmations de qualité non vérifiées. La mise à jour supprime également les modèles en prévision des positions par défaut où les utilisateurs ne les avaient pas explicitement choisis.

## Autres correctifs
- Les erreurs d'installation de compétences identifient désormais correctement l'hôte qui a refusé la requête
- Les permissions d'écriture en chemin absolu montrent des comparaisons claires avec les modèles globaux relatifs à l'espace de travail
- `.env.example` ne suggère plus de modèles obsolètes ou des prix incorrects

Mettez à jour avec `pip install --upgrade chimera-agent` ou consultez [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3) pour plus de détails.
