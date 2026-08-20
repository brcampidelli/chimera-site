---
title: "Chimera Agent 0.47.0 : Corrections pour le mode Garde et la visibilité du noyau"
date: 2026-08-20
category: update
summary: "Sept corrections critiques adressent les erreurs de rapport du mode garde, les lacunes dans l'application des règles, l'intégrité des audits et la visibilité du noyau."
version: "0.47.0"
---

## Le mode Garde signale désormais les refus correctement

Un défaut fondamental dans le mode garde (`--guard`) faisait que les appels d'outils refusés étaient signalés comme des succès. Le système vérifiait la présence du préfixe `error:` dans le message de refus, mais la plupart des refus ne l'incluaient pas. Cela signifiait que trois surfaces critiques - le cadre desktop, les logs d'étapes et la détection de dérive - affichaient toutes une exécution réussie alors que chaque action dangereuse avait en réalité été bloquée. Le modèle signalait avec confiance des actions terminées comme des force pushes qui n'avaient jamais eu lieu. Désormais, les refus sont correctement signalés sur toutes les surfaces, avec une attribution claire à la décision du garde.

## Corrections du moteur de règles pour les scripts et documents

Le moteur de règles avait deux échecs opposés. Les scripts multi-lignes passaient toujours car l'échappement des sauts de ligne brisait la détection des limites de mots dans les motifs de règles. Par ailleurs, les documents citant des commandes bloquées étaient incorrectement bloqués en dur. La protection était exactement à l'envers - les vrais scripts contournaient les règles tandis que la documentation déclenchait des faux positifs. Deux règles n'avaient jamais été déclenchées à cause de ces problèmes d'analyse. L'interpolation préserve désormais correctement les limites.

## Refonte du système d'audit

Trois problèmes d'audit ont été résolus. D'abord, le système détectant les identifiants était le même qui les stockait non masqués dans le journal d'audit. Ensuite, les écritures concurrentes pouvaient corrompre la vérification cryptographique de la chaîne d'audit. Enfin, l'interface de sécurité signalait à tort des altérations à cause des réinitialisations de chaîne de hachage pendant les écritures concurrentes. Désormais, les identifiants sont masqués avant stockage dans l'audit, et les writers maintiennent un état de chaîne cohérent.

## Le mode Observation observe réellement

Le mode `observe` appliquait des règles tout en prétendant seulement les mesurer. Les blocages durs se déclenchaient avant consultation de l'approbateur, puis étaient exclus du décompte des refus utilisé pour les décisions de déploiement. Sur 33 appels réels, huit refus apparaissaient comme zéro. Ces refus restent (ce sont des signaux non ambigus), mais sont maintenant comptés correctement et identifient leur source.

## Visibilité du noyau rétablie

Les verdicts du noyau de confiance n'atteignaient pas les endpoints HTTP pour les runs, batches ou turns - des décisions critiques comme les approbations de force push étaient prises invisiblement. Le noyau participe maintenant à tous les flux HTTP quand `CHIMERA_GOVERNANCE` est actif. Les prompts côté serveur n'apparaîtront pas sur les connexions HTTP, garantissant que la personne les voyant a bien fait la demande.

Exécutez `chimera upgrade` pour obtenir les corrections. Si vous utilisez le mode garde, mettez à jour immédiatement - les rapports de la version précédente étaient dangereusement trompeurs. Le [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) détaille tous les changements.

Pour les déploiements en production, vérifiez vos logs d'audit pour toute fuite d'identifiants provenant d'appels gouvernés `write_file`. Vérifiez si les scripts multi-lignes dans vos fichiers de règles nécessitent des ajustements pour la détection corrigée des limites.
