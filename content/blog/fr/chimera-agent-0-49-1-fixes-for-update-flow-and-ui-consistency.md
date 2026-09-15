---
title: "Chimera Agent 0.49.1 : Corrections pour le flux de mise à jour et la cohérence de l'interface utilisateur"
date: 2026-09-15
category: update
summary: "Chimera Agent 0.49.1 résout des problèmes critiques dans le processus de mise à jour, la cohérence de l'interface utilisateur et les lacunes de traduction, garantissant un fonctionnement plus fluide et des interactions utilisateur plus claires."
version: "0.49.1"
---

## Améliorations du processus de mise à jour

Le mécanisme de mise à jour de Chimera Agent 0.49.0 présentait un défaut majeur : le processus backend rapportait incorrectement la version en raison de fichiers résiduels provenant d'installations précédentes. Plus précisément, le bundle PyInstaller conservait les répertoires `dist-info` des versions anciennes et nouvelles, ce qui amenait `importlib.metadata` à retourner la mauvaise version. Cela entraînait l'application à proposer constamment une mise à jour vers la version déjà installée. L'installateur supprime désormais l'ancien bundle avant d'écrire le nouveau, garantissant que seule la version correcte est rapportée. Notez que cette correction s'applique à l'installateur livré avec 0.49.1, et non à celui qui l'installe. Si vous effectuez une mise à jour depuis 0.49.0, vous pourriez encore voir un `dist-info` obsolète jusqu'à la prochaine mise à jour.

## Fiabilité de la mise à jour automatique

Un autre problème a été découvert dans le mécanisme de mise à jour automatique. Pendant environ vingt-cinq minutes après chaque publication, le système de mise à jour échouait car l'endpoint `latest.json` retournait une erreur 404. Cela se produisait car la publication était marquée comme la dernière avant que toutes les builds pour les plateformes ne soient terminées. Désormais, les publications sont retenues avec `--latest=false` et ne sont promues qu'une fois le manifeste attaché. Cela garantit que l'endpoint résout toujours une publication valide, améliorant la fiabilité et empêchant l'offre de publications cassées.

## Cohérence et clarté de l'interface utilisateur

Le panneau 'nouvelle version disponible' posait auparavant une question à laquelle il ne pouvait pas répondre : *"Une nouvelle version est disponible. Mettre à jour ?"* Cependant, le panneau ne proposait que des options pour voir la publication ou ignorer la notification, sans aucune fonctionnalité de mise à jour réelle. Le panneau indique maintenant simplement qu'une nouvelle version est disponible et dirige les utilisateurs vers l'option **Vérifier les mises à jour** dans la barre des tâches. Ce changement élimine la confusion et aligne l'interface utilisateur avec ses capacités réelles.

## Corrections de traduction

L'assistant de première exécution présentait un problème de traduction mineur mais notable : le menu déroulant du mode de coût affichait des valeurs brutes (`auto / cheap / balanced / premium`) au lieu de leurs équivalents traduits. Bien que les étiquettes existaient et étaient traduites, elles n'étaient pas utilisées dans ce contexte. Cette incohérence a été résolue, garantissant que le menu déroulant affiche désormais les étiquettes traduites correctes, cohérentes avec l'écran des paramètres.

Pour plus de détails, consultez les [notes de publication][Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1). Pour mettre à jour, exécutez `chimera-desktop --update` ou téléchargez la dernière version sur le site officiel.
