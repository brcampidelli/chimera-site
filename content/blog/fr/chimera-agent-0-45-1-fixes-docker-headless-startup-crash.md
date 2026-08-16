---
title: "Chimera Agent 0.45.1 corrige le crash au démarrage des instances Docker headless"
date: 2026-08-16
category: update
summary: "La version 0.45.1 résout un problème critique de déploiement Docker où les instances headless échouaient à démarrer à cause d'une chaîne d'imports FastAPI trop précoce."
version: "0.45.1"
---

## Les déploiements Docker ne plantent plus au démarrage

Chimera Agent 0.45.0 introduisait une régression où les conteneurs Docker headless exécutant le service gateway crashent immédiatement au démarrage. Le problème survenait car le chemin cron commençait à importer `chimera.api.usage`, déclenchant un import prématuré des dépendances FastAPI - alors que l'image Docker exclut intentionnellement l'extra `desktop`.

Ce bug n'a pas été détecté lors des tests car les environnements de développement ont typiquement FastAPI installé. Les 2 945 tests existants passaient car ils s'exécutaient dans des environnements où la dépendance était présente par hasard. L'échec ne se manifestait qu'en production avec l'installation minimale `.[full]`.

## Les imports lazy évitent les dépendances cachées

Le correctif traite la cause racine plutôt que d'ajouter simplement les dépendances manquantes. Auparavant, cinq modules feuilles accessibles via CLI dans `chimera/api` importaient silencieusement toute la stack web via des ré-exports dans `__init__.py`. La v0.45.1 rend ces imports lazy, ils ne chargent que lorsque nécessaires par les composants web.

Cela préserve la séparation documentée où le CLI/gateway core ne devrait pas nécessiter les dépendances web, tout en garantissant que `chimera app` échoue clairement quand FastAPI manque pour des cas légitimes d'usage web.

## Un nouveau test empêche la régression

Un test dédié vérifie désormais ce comportement en s'exécutant dans un sous-processus où `fastapi` est rendu intentionnellement non importable. Le test confirme d'abord que cet environnement est correct avant de procéder aux assertions - détectant les cas où les tests passeraient silencieusement à cause de contamination environnementale.

Le correctif a été validé de bout en bout avec des installations propres `.[full]`. Les déploiements Docker headless peuvent désormais exécuter `serve --cron` comme attendu.

Pour les déploiements affectés par ce problème, mettez à jour vers la v0.45.1. Les [notes de version][Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) détaillent les changements depuis la v0.45.0.
