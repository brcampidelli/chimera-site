---
title: "Chimera Agent 0.49.1 : Corrections pour le flux de mise à jour et l'homogénéité de l'interface"
date: 2026-09-12
category: update
summary: "La version 0.49.1 résout des problèmes critiques de mise à jour, améliore l'homogénéité de l'interface et comble les lacunes de traduction dans l'assistant de première utilisation."
version: "0.49.1"
---

## Corrections du flux de mise à jour

L'un des problèmes majeurs résolus dans Chimera Agent 0.49.1 concerne le mécanisme de mise à jour. Auparavant, après une mise à jour en place, le processus backend signalait incorrectement l'ancienne version en raison de la persistance d'un fichier `dist-info` de l'installation précédente. Cela se produisait car le bundle PyInstaller conservait à la fois les fichiers de l'ancienne et de la nouvelle version, ce qui amenait `importlib.metadata` à retourner la première version rencontrée. En conséquence, l'application proposait continuellement une mise à jour vers la version déjà en cours d'exécution, créant confusion et invites de mise à jour superflues.

Pour résoudre ce problème, l'installateur supprime désormais l'ancien bundle avant d'écrire le nouveau, garantissant que seule la version correcte soit reconnue. Notez cependant que cette correction s'applique à l'installateur livré avec la version 0.49.1, et non à celui utilisé pour l'installer. Les utilisateurs mettant à jour depuis la 0.49.0 peuvent encore rencontrer ce problème jusqu'à la prochaine mise à jour. Une solution manuelle consiste à supprimer le fichier `dist-info` obsolète et à redémarrer l'application.

Un autre problème lié aux mises à jour concernait la fonctionnalité de mise à jour automatique. Pendant environ vingt-cinq minutes après chaque publication, le système de mise à jour échouait car l'endpoint `releases/latest/download/latest.json` retournait une erreur 404 pendant que les builds étaient encore en cours. Ce problème passait inaperçu car le système de mise à jour ignorait silencieusement les erreurs. Désormais, les publications sont retenues avec `--latest=false` jusqu'à ce que tous les builds soient terminés, garantissant que l'endpoint pointe toujours vers une version valide.

## Homogénéité de l'interface et corrections de traduction

Le panneau 'nouvelle version disponible' posait auparavant une question à laquelle il ne pouvait pas répondre. Son en-tête indiquait 'Une nouvelle version est disponible. Mettre à jour ?' mais ne proposait que des boutons pour voir la publication ou ignorer le panneau. Comme le panneau se trouve dans la webview sans IPC vers le système de mise à jour Rust, il ne pouvait pas initier la mise à jour. Le panneau indique désormais simplement la disponibilité d'une nouvelle version et oriente les utilisateurs vers l'option 'Vérifier les mises à jour' dans la barre des tâches.

Par ailleurs, l'assistant de première utilisation présentait une lacune de traduction dans le menu déroulant du mode de coût, qui affichait des valeurs brutes (`auto / cheap / balanced / premium`) au lieu des libellés traduits. Cette incohérence a été corrigée, alignant l'assistant sur l'écran des paramètres, qui utilisait déjà les libellés traduits. Notez que les valeurs restent en anglais pour correspondre aux entrées attendues par le serveur.

Pour plus de détails, consultez les [notes de publication][Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1).

[Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1): CHANGELOG.md
