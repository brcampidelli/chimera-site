---
title: "Chimera Agent 0.45.1 : Correction des plantages de Docker en mode headless"
date: 2026-08-16
category: update
summary: "La version 0.45.1 corrige un problème critique au démarrage de Docker où les conteneurs headless plantaient à cause d'une dépendance inutile à FastAPI."
version: "0.45.1"
---

## Pourquoi les conteneurs Docker plantaient au démarrage

Chimera Agent 0.45.0 introduisait un échec silencieux pour les déploiements Docker en mode headless. L'image du conteneur installait `.[full]` sans l'extra `desktop`, ce qui exclut intentionnellement FastAPI. Cependant, le chemin cron a commencé à importer `chimera.api.usage`, déclenchant une initialisation prématurée du module API. Cela a entraîné l'inclusion de FastAPI comme dépendance indirecte via un lecteur JSONL, provoquant des crash-loops avec `ModuleNotFoundError`.

Le bug est passé inaperçu car :
1. Les environnements de développement ont généralement FastAPI installé
2. Aucun des 2 945 tests existants ne simulait une installation propre de `.[full]`
3. L'échec ne se manifestait qu'en production

## Chargement paresseux pour les dépendances principales

La correction traite la cause racine plutôt que de masquer les symptômes. Ajouter `desktop` à l'image aurait fonctionné, mais cela aurait violé la documentation de l'extra ("le CLI/gateway principal n'en a jamais besoin") et augmenté inutilement la taille de l'image.

La version 0.45.1 modifie `chimera/api/__init__.py` pour :
- Résoudre les ré-exports de manière paresseuse plutôt que prématurée
- Isoler les dépendances FastAPI aux composants spécifiques au web
- Maintenir des modes d'échec clairs lorsque `desktop` est réellement requis

Cinq modules feuilles (`usage`, `roles`, `sessions`, `posture`, et `config_api`) n'importent plus implicitement la pile web lorsqu'ils sont utilisés par des opérations CLI. Le gateway reste fonctionnel avec seulement `.[full]` installé.

## Nouveau filet de sécurité

Un test de sous-processus vérifie désormais que les imports fonctionnent sans FastAPI disponible. Cela aurait détecté le problème avant la sortie en :
1. Exécutant dans un environnement où `fastapi` est rendu intentionnellement inimportable
2. Vérifiant les fonctionnalités principales avant de passer à d'autres vérifications
3. Reflétant les conditions réelles de déploiement

La vérification end-to-end confirme la correction : une installation propre de `.[full]` peut désormais exécuter `serve --cron` sans planter.

Mettez à jour avec `pip install -U chimera-agent==0.45.1`. Pour vérifier le déploiement, testez votre conteneur avec `serve --cron` et vérifiez les messages d'initialisation du gateway. [Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) contient tous les détails techniques sur les changements.
