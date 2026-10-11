---
title: "Chimera Agent 0.50.0 : Visibilité, Contrôle et Recherche Hybride"
date: 2026-10-11
category: update
summary: "Cette version corrige des comportements silencieux, ajoute des contrôles manquants et améliore la récupération avec la recherche hybride."
version: "0.50.0"
---

## Les Tâches Sont Maintenant Visibles

Les agents conservaient auparavant une liste de tâches interne (`RunState.tasks`) qui n'était jamais exposée ou persistée. Les exécutions longues pouvaient perdre la trace de leur progression lors de la compaction de contexte. Désormais, la tâche active est affichée pendant l'exécution, et les tâches terminées sont barrées. La liste survit à la compaction, donc les agents n'oublient plus leur plan en cours d'exécution.

## Les Demandes d'Approbation Vous Suivent

Trois surfaces d'exécution non surveillées (y compris les tâches cron) pouvaient demander des approbations, mais le mécanisme était opaque. Si configuré avec `CHIMERA_APPROVAL_WEBHOOK`, les agents acheminent désormais les questions d'approbation vers le canal spécifié au lieu d'échouer silencieusement lorsqu'aucune console n'est disponible. Le système signale également explicitement les états `unreachable` lorsque la livraison n'est pas possible.

## Améliorations de Gouvernance et de Récupération

Le noyau de confiance (`CHIMERA_GOVERNANCE`) n'avait auparavant aucun contrôle d'activation malgré la journalisation des événements de sécurité. Il est maintenant désactivé par défaut avec un interrupteur visible. Pour la récupération, `chimera find` utilise désormais la recherche hybride (mot-clé + vecteur) par défaut après que des tests ont montré qu'elle surpasse la recherche par mot-clé seul de 6,25 points (p = 1,7e-04) sur le corpus du projet. La recherche vectorielle seule sous-performe, justifiant l'approche fusionnée.

## Corrections de Gestion des Modèles

Les agents supposaient que les modèles non catalogués avaient des fenêtres de 128k tokens, provoquant des plantages pour les 31 modèles (sur 431 indexés) qui servent réellement ≤64k. Le système vérifie désormais l'index en direct pour les modèles inconnus. Cinq entrées du catalogue ont été corrigées pour des tailles de fenêtre gonflées, et une erreur de tarification (2,2x trop élevée) a été rectifiée.

## Traçabilité et Mises en Garde

Les traces enregistrent désormais quel backend a servi chaque étape, pas seulement quel modèle a répondu. Cela compte pour des services comme OpenRouter où les slugs de modèles représentent des pools avec des variations de prix de 8,8x. Le journal des modifications retire certaines affirmations de performance qui comparaient par erreur des mesures poolées.

Des limitations clés subsistent : les installateurs ne sont pas signés (bien que les mises à jour le soient), la gouvernance est désactivée par défaut, et le compresseur de résumé est désactivé par défaut car il est inutilisé en pratique (0 déclencheurs sur 137 exécutions mesurées). L'annulation est coopérative - les appels actifs se terminent avant l'arrêt.

Voir [Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) pour les mesures et le journal complet des modifications. Pour mettre à jour : `pip install --upgrade chimera-agent`.
