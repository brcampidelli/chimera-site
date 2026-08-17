---
title: "Chimera Agent 0.46.0 : Correction des échecs silencieux et introduction des fiches de compétences"
date: 2026-08-17
category: update
summary: "Chimera Agent 0.46.0 corrige les échecs silencieux, introduit une bibliothèque de compétences organisée et garantit des traductions fiables dans neuf langues."
version: "0.46.0"
---

## Correction des échecs silencieux

Chimera Agent 0.46.0 résout une série d'échecs silencieux qui passaient auparavant inaperçus. Ces problèmes ne provoquaient ni plantages ni erreurs, mais compromettaient des fonctionnalités critiques. Par exemple, cinq stockages JSON perdaient des données silencieusement en raison de l'absence de mécanismes de verrouillage lors des opérations de lecture-modification-écriture. Cela signifiait qu'un processus pouvait écraser les modifications d'un autre sans avertissement. L'un de ces stockages était celui des compétences, où les données apprises pouvaient être effacées lors d'exécutions ultérieures. Désormais, les cinq stockages verrouillent et écrivent de manière atomique, garantissant l'intégrité des données.

Un autre échec silencieux concernait le bot Discord de l'application, qui s'exécutait sans isolation adéquate. Ainsi, la porte de build ne pouvait pas le détecter, laissant une faille de sécurité potentielle. De même, une barrière de gouvernance qui arrêtait l'interface CLI à l'importation lorsqu'elle était activée passait inaperçue car personne ne l'avait jamais exécutée avec la gouvernance activée. Ces problèmes ont été corrigés, assurant un comportement conforme aux attentes.

## Bibliothèque de compétences organisée

Cette version introduit une bibliothèque de compétences organisée, comprenant 23 fiches regroupées par application dans le flux de travail : définir, construire, vérifier, réviser et livrer. Ces fiches sont des données, pas du code, ce qui facilite leur contribution et leur révision. Chaque fiche comprend des sections comme Déclencheur, Action, À éviter, Vérification et Risque, et elles sont disponibles en neuf langues. Les traductions sont gérées dans un fichier annexe, garantissant que la fiche originale reste identique octet par octet.

Cependant, l'intégration de ces fiches dans l'invite de l'agent est optionnelle et désactivée par défaut en raison d'une augmentation significative de l'utilisation de tokens sans gain de performance notable. Cette décision s'appuie sur un test A/B enregistré montrant une amélioration de +16,7 points de pourcentage, mais n'atteignant pas le seuil de significativité.

## Traductions fiables

Un nouveau test garantit que les traductions des fiches de compétences sont fiables et complètes. Il distingue trois états identiques dans un fichier : obsolète, incomplet et manquant. Les traductions obsolètes prétendent traduire un texte modifié, tandis que les traductions incomplètes manquent des sections. Les traductions manquantes sont des dettes clairement identifiées. Cette barrière évite le problème des fiches non traduites dans l'interface, précédemment détectable uniquement en lisant les fichiers, et non par des échecs de build.

## Corrections de la documentation

Seize affirmations non supportées par le code ont été corrigées dans les dix langues de la documentation. Cinq d'entre elles étaient carrément fausses, comme les options de gouvernance et les destinations du rail desktop. Deux affirmations incluent désormais les mises en garde nécessaires, garantissant des informations précises aux utilisateurs.

## Prochaines étapes

Pour mettre à jour vers Chimera Agent 0.46.0, exécutez :

```
pip install -U chimera-agent
pip install -U 'chimera-agent[desktop]'
```

Pour plus de détails, consultez les [notes de version][Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0).

[Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0): chimeraagent.space/release-notes
