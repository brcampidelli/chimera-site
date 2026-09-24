---
title: "Chimera Agent 0.47.0 : Corrections pour les Exécutions Protégées"
date: 2026-08-22
category: update
summary: "Sept correctifs traitent des rapports incorrects d'appels d'outils refusés, des défauts d'évaluation des règles et des problèmes d'intégrité d'audit."
version: "0.47.0"
---

## Les Exécutions Protégées Rapportent Correctement

Un problème critique dans les exécutions protégées (flag `--guard`) a été corrigé. Auparavant, lorsqu'un appel d'outil était refusé par les règles de gouvernance, le système le rapportait incorrectement comme réussi. Cela se produisait car le message de refus ne commençait pas par `error:`, ce qui faisait que la vérification de statut retournait `True`. Trois surfaces principales étaient affectées :

1. La visualisation du cadre desktop
2. Le journal des étapes utilisé pour les reçus
3. Le détecteur de dérive

Cela signifiait que les exécutions où chaque action dangereuse était bloquée apparaissaient comme réussies dans toutes les sorties structurées. Le modèle pouvait même répondre avec des messages de confirmation pour des actions qui n'ont jamais été exécutées.

## Évaluation des Règles Corrigée pour les Scripts et Documents

Le moteur de règles avait deux problèmes majeurs :

1. **Les scripts multi-lignes contournaient la protection** : En raison de la manière dont les sauts de ligne étaient échappés lors de l'interpolation de texte, les limites de mots dans les règles étaient brisées. Cela permettait à des commandes dangereuses de passer si elles apparaissaient après des commandes bénignes dans un script.

2. **Les documents déclenchaient des faux positifs** : Par ailleurs, les fichiers Markdown citant des commandes dangereuses étaient bloqués de manière stricte. La protection était en quelque sorte inversée - les vraies menaces étaient autorisées tandis que la documentation était bloquée.

Deux règles ne se déclenchaient pas du tout, quel que soit l'entrée. Ces problèmes ont été corrigés, avec une gestion appropriée à la fois de l'exécution des scripts et du contenu des documents.

## Améliorations d'Audit et de Sécurité

Plusieurs correctifs liés à la sécurité ont été implémentés :

- **Stockage des identifiants** : Le système d'audit stockait des données sensibles qu'il était censé détecter. Lorsqu'une opération gouvernée `write_file` était bloquée, le contenu du fichier apparaissait toujours dans `audit.jsonl`. Il y a maintenant deux couches : l'audit masque les données sensibles (en utilisant les capacités existantes de masquage), et les arguments en forme de document sont enregistrés uniquement par taille.

- **Intégrité de la chaîne d'audit** : L'écran de Sécurité signalait parfois à tort une falsification alors qu'aucune modification n'avait eu lieu. Cela se produisait lorsque plusieurs écrivains reprenaient les chaînes de hachage à partir de différents instantanés, créant des numéros de séquence en double. La vérification fonctionne maintenant correctement.

- **Correctifs du mode observation** : Le mode `observe` appliquait en réalité des règles qu'il promettait de seulement mesurer. Les BLOCKS stricts retournent maintenant correctement avant consultation de l'approbateur, et les refus sont correctement comptabilisés dans les métriques.

## Visibilité et Fiabilité du Noyau

Le noyau de confiance n'était pas servi via HTTP, ce qui signifiait que ses verdicts n'atteignaient pas les consommateurs d'API. Il est maintenant correctement installé pour tous les endpoints lorsque `CHIMERA_GOVERNANCE` est défini sur `observe` ou `enforce`. D'autres correctifs de fiabilité incluent :

- Gestion appropriée des délais d'attente des workers
- Distinction entre les échecs de tâches et les expirations
- Configuration des limites de conteneurs
- Récupération automatique du backend

## Limitations Connues

La mise à jour traite plusieurs problèmes mais laisse quelques lacunes connues :

1. Les rapports `observe` ne sont pas encore exposés sur les interfaces HTTP
2. L'API manque d'un chemin d'approbation en mode `enforce`
3. Quatre endpoints HTTP manquent encore d'intégration avec le noyau

Ces points sont documentés dans le README plutôt que laissés comme des problèmes cachés.

Mettez à jour maintenant avec `pip install --upgrade chimera-agent` ou via votre gestionnaire de paquets préféré. Pour plus de détails, consultez les [notes de version][Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0).
