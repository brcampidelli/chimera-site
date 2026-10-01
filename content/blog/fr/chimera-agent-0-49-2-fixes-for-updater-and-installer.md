---
title: "Chimera Agent 0.49.2 : Corrections pour le Mise à Jour et l'Installateur"
date: 2026-10-01
category: update
summary: "Chimera Agent 0.49.2 résout des problèmes critiques liés au système de mise à jour et à l'installateur, garantissant des mises à jour plus fluides et un reporting correct des versions."
version: "0.49.2"
---

## Le Mise à Jour Vérifie Maintenant Toutes les Six Heures

Auparavant, la vérification des mises à jour dans Chimera Agent ne s'effectuait qu'une seule fois au lancement, ce qui signifiait que si l'application restait ouverte, elle ne détecterait jamais les nouvelles versions. Ce problème était particulièrement gênant pour un outil comme Chimera, conçu pour rester actif pendant de longues périodes. En conséquence, les utilisateurs devaient récupérer manuellement les mises à jour sur le site, ce qui annulait l'intérêt d'un système de mise à jour automatique.

Avec la version 0.49.2, le système de mise à jour vérifie désormais les nouvelles versions toutes les six heures pendant que l'application est en cours d'exécution. Ce changement garantit que les utilisateurs sont informés rapidement des mises à jour sans intervention manuelle. De plus, le système de mise à jour mémorise les versions refusées pendant la durée du processus, évitant ainsi des invites répétées pour la même mise à jour, sauf si une version plus récente est disponible.

## Correction de l'Installateur Appliquée

La version 0.49.1 avait introduit une correction pour un problème d'installateur qui laissait des fichiers de la version précédente, entraînant un reporting incorrect de la version et proposant des mises à jour à elle-même. Cependant, cette correction ne s'appliquait qu'à l'installateur livré avec cette version, et non à celui utilisé pour l'installer.

Dans la version 0.49.2, l'installateur réparé est désormais utilisé pour les mises à jour sur place, garantissant que la version correcte est rapportée après une mise à jour. Si vous avez mis à jour vers la version 0.49.1 et avez rencontré ce problème de reporting de version, cette version le résout.

## Améliorations Supplémentaires

D'autres améliorations dans cette version incluent le retardement du marquage des versions comme "latest" jusqu'à ce que leur manifeste soit attaché, garantissant que le point de terminaison de mise à jour ne renvoie pas une erreur 404 pendant le processus de build. Les dialogues d'erreur et la barre des tâches utilisent désormais la langue de l'utilisateur, tandis que les diagnostics techniques restent en anglais pour faciliter la recherche des messages d'erreur. Les modes de coût de l'assistant de première exécution ont également été localisés, évitant le problème précédent d'affichage de mots en anglais sur un écran traduit.

Pour une liste complète des modifications, consultez le [Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).
