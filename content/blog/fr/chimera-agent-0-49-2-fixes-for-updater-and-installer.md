---
title: "Chimera Agent 0.49.2 : Corrections pour le Mise à Jour et l'Installateur"
date: 2026-09-30
category: update
summary: "Chimera Agent 0.49.2 résout des problèmes critiques liés au système de mise à jour et à l'installateur, garantissant des mises à jour plus fluides et un reporting précis des versions."
version: "0.49.2"
---

## Le Mise à Jour Fonctionne Désormais en Continu

Dans les versions précédentes, le système de mise à jour ne vérifiait les nouvelles versions qu'une seule fois—au démarrage. C'était une lacune importante pour une application comme Chimera Agent, conçue pour rester ouverte pendant de longues périodes. En conséquence, les utilisateurs manquaient souvent les mises à jour à moins de vérifier manuellement ou de redémarrer l'application. Ce problème était particulièrement évident lors de la sortie de la version 0.49.1 : l'application n'a pas notifié les utilisateurs de la mise à jour, les obligeant à télécharger manuellement l'installateur depuis le site.

**Avec la version 0.49.2, le système de mise à jour vérifie désormais les nouvelles versions toutes les six heures** pendant que l'application est en cours d'exécution. Ce changement garantit que les utilisateurs sont informés rapidement des mises à jour sans nécessiter des redémarrages fréquents. De plus, le système évite les rappels inutiles en mémorisant les mises à jour refusées pendant la durée du processus. Si une version plus récente devient disponible, il redemandera à l'utilisateur, assurant que les demandes de mise à jour manuelle sont toujours honorées.

## La Correction de l'Installateur Est Effective

La version 0.49.1 avait introduit une correction pour un problème d'installateur qui laissait des fichiers des versions précédentes. Plus précisément, le répertoire `_internal` pouvait contenir plusieurs répertoires `chimera_agent-*.dist-info`, ce qui faisait que l'application rapportait la mauvaise version et proposait des mises à jour répétées. Cependant, cette correction ne s'appliquait qu'à l'installateur livré avec une version, et non à celui utilisé pour les mises à jour sur place.

**La version 0.49.2 est la première où l'installateur corrigé est utilisé pour les mises à jour sur place.** Si vous avez mis à jour vers la version 0.49.1 et avez rencontré des problèmes de reporting de version, cette version résout le problème. L'installateur supprime désormais correctement les anciens fichiers, garantissant un reporting précis des versions et évitant les invites de mise à jour redondantes.

## Améliorations Supplémentaires

Plusieurs autres améliorations introduites dans la version 0.49.1 méritent d'être mentionnées si vous avez sauté cette version :

- **Les versions sont retenues de "latest" jusqu'à ce que leur manifeste soit attaché.** Auparavant, le point de terminaison de mise à jour retournait une erreur 404 pendant le processus de build, échouant silencieusement car les messages d'erreur étaient supprimés pour éviter de déranger les utilisateurs.
- **Les dialogues d'erreur et les notifications dans la barre des tâches sont désormais localisés**, tandis que les diagnostics techniques restent en anglais pour garantir qu'ils peuvent être facilement recherchés.
- **Les modes de coût de l'assistant de première exécution ne s'affichent plus en anglais non traduit** sur les écrans localisés.

Pour plus de détails, consultez les [notes de version][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).

Pour profiter de ces corrections, mettez à jour Chimera Agent vers la version 0.49.2 dès maintenant.
