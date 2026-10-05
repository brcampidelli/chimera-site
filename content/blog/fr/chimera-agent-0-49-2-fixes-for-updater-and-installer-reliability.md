---
title: "Chimera Agent 0.49.2 : Corrections pour la fiabilité du système de mise à jour et de l'installateur"
date: 2026-10-02
category: update
summary: "Cette version garantit que le système de mise à jour vérifie périodiquement les nouvelles versions et corrige un problème d'installateur causant des erreurs de rapport de version."
version: "0.49.2"
---

## Le système de mise à jour fonctionne désormais comme prévu

Auparavant, le système de mise à jour ne vérifiait les nouvelles versions qu'une seule fois—au lancement. C'était problématique pour Chimera Agent, qui reste souvent ouvert pendant de longues périodes. Si une nouvelle version était publiée pendant l'exécution de l'application, les utilisateurs ne le savaient pas à moins de vérifier manuellement ou de redémarrer l'application. Cela entraînait des situations où les mises à jour étaient complètement manquées, obligeant les utilisateurs à télécharger les installateurs directement depuis le site web.

Désormais, le système de mise à jour vérifie toutes les six heures pendant l'exécution de l'application. Ce changement garantit que les utilisateurs sont informés des nouvelles versions rapidement, sans intervention manuelle. Pour éviter les rappels inutiles, le refus d'une mise à jour mémorise cette version pour la session en cours, mais les versions plus récentes déclencheront quand même une nouvelle vérification. Les vérifications manuelles via le menu de la barre des tâches affichent toujours une invite, quel que soit le refus précédent.

## Correction de l'installateur effective

La version 0.49.1 a introduit une correction pour un problème d'installateur où la mise à niveau laissait des fichiers de la version précédente. Cela faisait que l'application signalait incorrectement sa version, créant une boucle où elle proposait continuellement une mise à jour d'elle-même. Cependant, cette correction ne s'appliquait qu'aux nouveaux installateurs—pas à ceux utilisés pour les mises à jour sur place. Avec la version 0.49.2, l'installateur corrigé est maintenant utilisé pour les mises à jour, garantissant un rapport de version précis après une mise à niveau.

## Autres améliorations depuis la version 0.49.1

- Les versions ne sont plus marquées comme "latest" tant que leurs artefacts de build ne sont pas complètement prêts, évitant les erreurs 404 pendant la fenêtre de build.
- Les boîtes de dialogue d'erreur et les messages de la barre des tâches sont localisés, tandis que les diagnostics techniques restent en anglais pour faciliter la recherche.
- Les options de mode de coût de l'assistant de première exécution sont désormais correctement traduites.

Pour obtenir les dernières corrections, exécutez le système de mise à jour ou téléchargez la nouvelle version depuis les [notes de version][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).

[Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2): CHANGELOG.md
