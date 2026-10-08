---
title: "Chimera Agent 0.50.0 : Visibilité, Contrôle et Recherche Hybride"
date: 2026-10-08
category: update
summary: "Cette version corrige des comportements silencieux, ajoute des contrôles de gouvernance et améliore la récupération avec la recherche hybride."
version: "0.50.0"
---

## Les Tâches Sont Maintenant Visibles

Les agents maintenaient auparavant une liste de tâches interne inaccessible pendant l'exécution. `RunState.tasks` existait mais n'était jamais rempli. Désormais, les tâches s'affichent en temps réel avec des indicateurs de progression, et la liste persiste lors de la compaction du contexte. Ainsi, les agents de longue durée ne perdent plus le fil de leurs propres plans en cours d'exécution.

## Les Demandes d'Approbation Vous Suivent

Les workflows d'approbation supposaient auparavant qu'une console était toujours surveillée. Trois surfaces non surveillées—y compris les tâches cron—pouvaient demander une intervention humaine mais n'avaient aucun moyen de transmettre la question si personne ne regardait. Configurer `CHIMERA_APPROVAL_WEBHOOK` achemine désormais les demandes d'approbation vers un canal spécifié. Les systèmes incapables de les transmettre signalent correctement `unreachable` au lieu d'échouer silencieusement.

## La Gouvernance Peut Être Activée

Le journal d'audit de sécurité était auparavant une fonctionnalité passive sans mécanisme d'activation. `CHIMERA_GOVERNANCE` fournit désormais un contrôle pour l'activer, et l'écran Sécurité affiche explicitement son état actuel. Cette implémentation répond au fait qu'un journal d'audit inactivable n'avait aucune utilité pratique.

## La Recherche Hybride Surpasse les Mots-Clés

`chimera find` utilisait auparavant soit la recherche par mots-clés, soit la recherche vectorielle, avec une décision prise après le début de l'exécution. La récupération hybride—combinant les deux méthodes—surpasse désormais la recherche par mots-clés seule de 6,25 points (p = 1,7e-04) sur le corpus du projet. La recherche vectorielle seule est moins performante que les mots-clés, d'où le choix de l'approche hybride comme valeur par défaut. Le système calcule aussi les coûts à l'avance.

## Corrections de Compatibilité des Modèles

Les agents supposaient que les modèles non catalogués avaient une fenêtre de 128 000 tokens, ce qui provoquait des plantages pour les 31 modèles de l'index supportant réellement 64 000 tokens ou moins. Le système vérifie désormais l'index en direct pour les modèles inconnus. Cinq entrées du catalogue ont aussi été corrigées pour des tailles de fenêtre inexactes, et une erreur de tarification (2,2x trop élevée) a été rectifiée.

## Visibilité des Backends dans les Traces

Les traces enregistrent désormais quel backend a servi chaque étape, pas seulement quel modèle a répondu. Ceci est crucial car les identifiants de modèles sur OpenRouter peuvent représenter des pools aux capacités très variables—un pool couvre des endpoints avec des fenêtres de contexte variant d'un facteur 5 et des prix variant d'un facteur 8,8. Les précédentes affirmations de performance sur des modèles spécifiques mesuraient en réalité des pools ; le changelog retire les benchmarks concernés.

### Prochaines Étapes

Mettez à jour vers 0.50.0 et consultez le [changelog complet][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) pour les détails d'implémentation. Activez la gouvernance si nécessaire, et testez la recherche hybride avec `chimera find`.
