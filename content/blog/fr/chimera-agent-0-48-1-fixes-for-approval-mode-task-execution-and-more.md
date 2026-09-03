---
title: "Chimera Agent 0.48.1 : Correctifs pour le mode d'approbation, l'exécution des tâches et plus encore"
date: 2026-09-03
category: update
summary: "Chimera Agent 0.48.1 résout des problèmes critiques liés au mode d'approbation, à l'exécution des tâches et au reporting des coûts, garantissant un fonctionnement plus fluide et une meilleure sécurité."
version: "0.48.1"
---

## Le mode d'approbation fonctionne désormais comme prévu

Le paramètre `CHIMERA_APPROVAL_MODE=allow` fonctionne maintenant correctement sur toutes les interfaces, y compris l'application de bureau et `chimera serve`. Auparavant, ce paramètre ne fonctionnait que sur `solve` et `crew`, ce qui entraînait des refus inattendus pour la plupart des utilisateurs. Ce correctif garantit que les outils dangereux ne sont plus bloqués lors de la lecture de contenu non vérifié, conformément à l'intention initiale du paramètre. Les benchmarks montrent qu'avec un approbateur, le système bloque 85,7 % des attaques tout en permettant tout travail honnête, une amélioration significative par rapport au taux de refus précédent de 50 % pour les tâches légitimes.

## Écran unifié pour l'exécution des tâches

L'écran de travail a été rationalisé pour réduire la redondance et améliorer l'ergonomie. Auparavant, les utilisateurs devaient choisir entre quatre formulaires différents pour exécuter des tâches, chacun nécessitant les mêmes informations. Cela entraînait des inefficacités et des frustrations, car essayer une méthode différente impliquait de ressaisir la tâche. Désormais, un seul écran avec quatre boutons gère tous les modes d'exécution des tâches, simplifiant le processus et réduisant le nombre d'onglets de cinq à quatre. Ce changement garantit également que les tâches et les vérifications sont cohérentes entre les modes, tandis que les tentatives, les rôles et les emplacements des travailleurs restent spécifiques à chaque mode.

## Correctifs et ajouts clés

- **Les variables vides ne font plus planter l'application :** Une variable `CHIMERA_GUARD_CHAT` vide dans le fichier `.env` empêchait auparavant le démarrage de l'application. Ce problème a été résolu, les valeurs vides étant maintenant traitées comme non définies plutôt que de provoquer un crash.
- **Compteur de coûts pour les modèles coûteux :** Le compteur de coûts indique désormais correctement les coûts pour tous les modèles, y compris les plus coûteux comme `claude-opus-5` et `gpt-5.5`. Auparavant, ces modèles affichaient des coûts inconnus en raison d'un appel de fonction manquant.
- **Anneau de focus pour les boutons :** Le composant Button adopte désormais correctement l'anneau de focus partagé, corrigeant une incohérence visuelle.

## Nouvelle fonctionnalité : Chargement différé des outils

Le paramètre `CHIMERA_DEFER_TOOLS` a été ajouté pour réduire l'utilisation de tokens en différant le chargement des schémas d'outils jusqu'à ce qu'ils soient nécessaires. Les benchmarks montrent une réduction de 26 % du coût par tâche terminée, bien que l'impact sur les taux de réussite des tâches reste incertain. Ce paramètre est désactivé par défaut en raison des résultats mitigés.

## Prochaines étapes

Mettez à jour vers Chimera Agent 0.48.1 pour bénéficier de ces correctifs et améliorations. Pour les notes de version détaillées, consultez [Chimera Agent v0.48.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.1).
