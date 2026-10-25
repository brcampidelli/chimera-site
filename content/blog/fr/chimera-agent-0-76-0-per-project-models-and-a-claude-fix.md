---
title: "Chimera Agent 0.76.0: Modèles par projet et correctif pour Claude"
date: 2026-10-25
category: update
summary: "Chimera Agent 0.76.0 permet à chaque projet d'épingler son propre modèle et corrige les modèles Claude dans l'écran Code."
version: "0.76.0"
---

## Modèles par projet

Avant cette version, changer le modèle pour un projet le changeait pour toutes les conversations de tous les projets. Le modèle était un paramètre global unique, et si vous vouliez des modèles différents selon les projets, vous deviez penser à basculer manuellement. C'était source d'erreurs et rendait difficile de garder un projet sur un modèle spécifique pour des raisons de cohérence ou de coût.

Désormais, chaque projet peut avoir son propre modèle. Une conversation Code utilise son propre modèle épinglé si elle en a un, puis le modèle du projet, puis le modèle global par défaut. Le reçu du tour indique quel modèle a été utilisé, ce qui permet de vérifier en un coup d'œil. Changer le modèle d'un projet n'affecte plus les conversations d'un autre. Cela signifie que vous pouvez configurer un projet pour utiliser un modèle moins coûteux pour l'expérimentation et un autre pour utiliser un modèle plus performant en production, sans vous soucier des interférences.

Quand l'agent propose un modèle différent, il peut seulement vous laisser une carte indiquant la conversation ou le projet concerné. Rien ne change tant que vous ne l'approuvez pas. Cela vous garde aux commandes et empêche l'agent de changer silencieusement de modèle en cours de conversation.

## Les modèles Claude fonctionnent à nouveau dans l'écran Code

Avec un modèle Anthropic par défaut, chaque tour de codage échouait à sa première étape avec une erreur sur le schéma d'entrée d'un outil. Le schéma de l'outil question utilisait une construction que l'API d'Anthropic refuse. Cela signifiait que si vous utilisiez Claude comme modèle par défaut, vous ne pouviez pas du tout utiliser l'écran Code — chaque tour échouait avant de faire quoi que ce soit d'utile.

Le schéma est maintenant un objet simple, que l'API d'Anthropic accepte. Un test vérifie le schéma de chaque outil pour que le problème ne puisse pas revenir. Ce correctif est important car il garantit que tous les modèles supportés fonctionnent sur tous les écrans, pas seulement ceux qui se montrent indulgents avec les particularités de schéma.

## Que faire maintenant

Mettez à jour vers la version 0.76.0 et définissez un modèle spécifique au projet si vous en avez besoin. Si vous évitiez Claude dans l'écran Code, réessayez. Consultez les [notes de version][Chimera Agent v0.76.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.76.0) pour tous les détails.
