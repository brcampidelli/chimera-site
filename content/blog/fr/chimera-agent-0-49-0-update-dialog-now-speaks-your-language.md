---
title: "Chimera Agent 0.49.0 : La boîte de dialogue de mise à jour parle désormais votre langue"
date: 2026-09-04
category: update
summary: "La boîte de dialogue de mise à jour et les messages d'erreur suivent désormais la langue de votre système, avec une option de vérification manuelle dans la barre des tâches."
version: "0.49.0"
---

## Traductions de la boîte de dialogue et vérifications manuelles

La boîte de dialogue de mise à jour de Chimera Agent était auparavant uniquement disponible en anglais, quelle que soit la langue configurée dans l'application. Ce problème est résolu dans la version 0.49.0 — la boîte de dialogue suit désormais la langue de votre système d'exploitation. Ce changement corrige une incohérence pour les utilisateurs qui exécutent l'application dans une langue mais voient les messages système critiques dans une autre.

Le menu de la barre des tâches inclut désormais une option **Vérifier les mises à jour**, qui constitue le premier moyen manuel de déclencher une vérification. Auparavant, la vérification automatique s'exécutait silencieusement au démarrage, sans aucun retour sauf si une mise à jour était trouvée. Bien que cette conception évite les notifications inutiles, elle ne permettait pas aux utilisateurs de confirmer qu'ils étaient à jour sans redémarrer l'application. La vérification manuelle fournit désormais une confirmation explicite lorsqu'aucune mise à jour n'est disponible, ainsi que des messages d'erreur clairs en cas d'échec.

## Messages d'erreur traduits avec diagnostics intacts

Les boîtes de dialogue d'erreur — y compris les rapports de plantage du backend et l'option Quitter dans la barre des tâches — sont désormais également traduites. Cependant, une distinction importante est faite sur ce qui est traduit :

- **Les instructions utilisateur** apparaissent dans la langue de votre système (ex. "Fermez Chimera et rouvrez-le")
- **Les détails techniques** (chemins de fichiers, codes d'erreur, logs backend) restent dans leur forme originale

Cette séparation garantit que les utilisateurs reçoivent des instructions claires dans leur langue préférée tout en conservant des informations d'erreur exploitables pour le dépannage. Un test vérifie ce comportement, confirmant que les textes utilisateur proviennent des tables de traduction tandis que les données techniques restent inchangées.

## Ce qui ne change pas

Le mécanisme de mise à jour lui-même n'a pas changé — les vérifications ont toujours lieu automatiquement au lancement, et les installations nécessitent toujours une confirmation utilisateur. L'application n'installe jamais de mises à jour sans permission explicite. Un détail subtil mais important : la version affichant la boîte de dialogue est toujours celle actuellement installée, pas la nouvelle version proposée. Cela signifie que l'invite proposant la 0.49.0 apparaît dans la langue utilisée par votre version actuelle — à partir de la 0.49.0, cela correspondra à la langue de votre système.

Pour voir ces changements, mettez à jour vers la 0.49.0 ou vérifiez manuellement via le menu de la barre des tâches. Les détails complets sont dans les [notes de version][Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
