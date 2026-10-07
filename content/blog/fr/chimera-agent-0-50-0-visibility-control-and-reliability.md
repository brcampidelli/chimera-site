---
title: "Chimera Agent 0.50.0 : Visibilité, Contrôle et Fiabilité"
date: 2026-10-07
category: update
summary: "Chimera Agent 0.50.0 introduit de la transparence, un meilleur contrôle et des corrections pour les échecs silencieux."
version: "0.50.0"
---

## Visibilité sur les Opérations de l'Agent

Auparavant, la liste des tâches de l'agent était invisible pour les utilisateurs, bien que le champ `RunState.tasks` existât. Désormais, l'agent affiche sa liste de tâches en temps réel, marquant les éléments en cours ou terminés. Cette liste persiste lors de la compaction du contexte, garantissant que les exécutions longues ne perdent pas trace de leurs plans. Ce changement répond à une frustration courante où les utilisateurs ne pouvaient pas voir ce que l'agent faisait, notamment lors d'opérations prolongées.

## Accessibilité au-delà de la Console

Les agents exécutés sans surveillance, comme les tâches cron, ne pouvaient pas communiquer efficacement avec les utilisateurs lorsqu'une approbation était nécessaire. En configurant `CHIMERA_APPROVAL_WEBHOOK`, les utilisateurs peuvent désormais recevoir les demandes d'approbation dans leurs canaux préférés. Ce changement garantit que les agents peuvent joindre les utilisateurs même lorsque personne ne surveille activement la console. Auparavant, ces demandes échouaient silencieusement si aucune méthode de livraison n'était disponible, entraînant des décisions inattendues.

## Contrôle de Gouvernance

La fonctionnalité de gouvernance, incluant un journal d'audit, était auparavant inaccessible. Bien que l'écran de Sécurité affichât le journal d'audit, il n'y avait aucun moyen de l'activer. Désormais, les utilisateurs peuvent activer la gouvernance via le paramètre `CHIMERA_GOVERNANCE`. Ce changement donne aux utilisateurs la capacité de surveiller et contrôler les paramètres de sécurité de leur agent, comblant ainsi un manque de transparence et de contrôle.

## Gestion Améliorée des Modèles

Les agents supposaient auparavant une taille de fenêtre de tokens par défaut pour les modèles non explicitement catalogués, entraînant des dépassements de contexte et des échecs d'exécution. Avec cette version, l'agent récupère désormais la taille correcte de la fenêtre de tokens depuis l'index en direct pour les modèles non catalogués. De plus, cinq entrées du catalogue ont été corrigées pour refléter des fenêtres de tokens et des tarifs précis. Ce changement évite les échecs d'exécution dus à des hypothèses incorrectes sur les capacités des modèles.

## Traçabilité Renforcée

Les traces enregistrent désormais quel backend a servi chaque étape, et pas seulement quel modèle a répondu. Ceci est particulièrement important pour les modèles comme ceux d'OpenRouter, où un seul identifiant de modèle peut représenter un pool de endpoints aux capacités et coûts variables. Auparavant, les utilisateurs ne pouvaient pas distinguer les différents endpoints, entraînant confusion et mesures imprécises. Ce changement améliore la transparence et la précision du suivi des performances.

## Prochaines Étapes

Pour profiter de ces améliorations, mettez à jour vers Chimera Agent 0.50.0 et consultez les [notes de version][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) pour des instructions détaillées sur la configuration des nouvelles fonctionnalités comme `CHIMERA_APPROVAL_WEBHOOK` et `CHIMERA_GOVERNANCE`.
