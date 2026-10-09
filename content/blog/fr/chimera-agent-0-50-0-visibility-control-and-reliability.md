---
title: "Chimera Agent 0.50.0 : Visibilité, Contrôle et Fiabilité"
date: 2026-10-09
category: update
summary: "Chimera Agent 0.50.0 introduit la visibilité des tâches des agents, des webhooks d'approbation, des contrôles de gouvernance, une recherche hybride et des corrections pour les fenêtres de contexte des modèles."
version: "0.50.0"
---

## Visibilité des tâches de l'agent

L'une des modifications majeures de Chimera Agent 0.50.0 est l'introduction de la visibilité des tâches. Auparavant, le champ `RunState.tasks` existait mais n'était jamais renseigné, laissant les utilisateurs dans l'ignorance des actions de l'agent. Désormais, l'agent maintient une liste de tâches affichée à l'écran pendant son exécution. Chaque tâche est marquée comme en cours ou terminée, et cette liste persiste malgré la compaction du contexte. Ainsi, même lors d'exécutions longues, l'agent n'oublie pas son plan, offrant aux utilisateurs une vision claire de sa progression.

## Webhooks d'approbation pour les exécutions non surveillées

Une autre amélioration majeure est la capacité de l'agent à demander des approbations même en l'absence d'un utilisateur à la console. En définissant la variable d'environnement `CHIMERA_APPROVAL_WEBHOOK` avec l'URL d'un webhook de canal, l'agent peut désormais envoyer des demandes d'approbation vers un canal désigné. Cette modification résout un problème précédent où les surfaces non surveillées, y compris les tâches cron, prenaient des décisions silencieuses sans intervention humaine. Maintenant, si aucune méthode de livraison n'est disponible, l'agent indique explicitement qu'il est `unreachable`, garantissant ainsi la transparence.

## Contrôles de gouvernance

Le noyau de gouvernance, auparavant invisible et inactif, peut désormais être activé. Le paramètre `CHIMERA_GOVERNANCE` est par défaut `off`, mais les utilisateurs ont maintenant la possibilité de l'activer. L'écran de sécurité indique également l'état actuel de la gouvernance, offrant aux utilisateurs le contrôle et la visibilité nécessaires sur cette fonctionnalité critique.

## Recherche hybride dans `chimera find`

La commande `chimera find` a été améliorée avec une recherche hybride, combinant des méthodes de recherche par mots-clés et vectorielle. Cette approche hybride, figée avant le début de l'exécution, surpasse la recherche par mots-clés de 6,25 points sur le corpus propre au projet. Notamment, la recherche vectorielle seule est moins performante que la recherche par mots-clés, ce qui explique pourquoi la méthode hybride est désormais activée par défaut. Ce changement garantit des résultats de recherche plus précis et fiables.

## Corrections pour les fenêtres de contexte des modèles

Auparavant, les modèles non listés dans le catalogue vérifié manuellement étaient supposés avoir une fenêtre de contexte de 128 000 tokens, entraînant des dépassements de contexte et des échecs d'exécution pour les modèles avec des fenêtres plus petites. Cette version corrige ce problème en récupérant la fenêtre de contexte depuis l'index en temps réel lorsque le catalogue ne connaît pas le modèle. De plus, cinq entrées du catalogue ont été corrigées pour refléter les fenêtres de contexte réelles fournies par leurs prestataires, et un prix a été ajusté pour correspondre aux données vérifiées.

## Améliorations supplémentaires

Les traces enregistrent désormais quel backend a servi chaque étape, et pas seulement quel modèle a répondu. Ceci est particulièrement important pour les modèles sur OpenRouter, où un seul identifiant de modèle peut représenter un pool de points de terminaison avec des fenêtres de contexte et des prix variables. Ce changement garantit une meilleure compréhension des ressources utilisées.

## Mises en garde honnêtes

- **Les installateurs ne sont pas signés.** Le premier lancement affiche un avertissement SmartScreen sous Windows et un avertissement Gatekeeper sous macOS. C'est normal ; le *mise à jour* est signé, ce qui est la partie importante pour ce qui est installé sur votre machine après l'installation.
- **La gouvernance est désactivée par défaut.** Le contrôle existe pour que vous puissiez l'activer, pas parce qu'il est déjà actif.
- **Le résumé de compaction est désactivé**, derrière `AgentConfig.summarise_compaction`. La compaction elle-même n'a jamais été déclenchée en usage normal — mesurée 0 fois sur 137 exécutions — donc le résumé est construit mais non éprouvé, plutôt que construit et nécessaire.
- **L'annulation est coopérative.** Arrêter une exécution la stoppe avant son prochain appel de modèle ; les appels déjà en cours se terminent et sont facturés.

Pour plus de détails, y compris les mesures ayant conduit à ces changements, consultez le [changelog][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0).
