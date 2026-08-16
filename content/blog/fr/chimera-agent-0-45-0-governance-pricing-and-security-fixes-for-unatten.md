---
title: "Chimera Agent 0.45.0 : Gouvernance, Contrôle des Coûts et Correctifs de Sécurité pour les Exécutions Automatisées"
date: 2026-08-16
category: update
summary: "Cette version renforce les exécutions automatisées avec une authentification obligatoire, des plafonds de dépenses et une gouvernance unifiée sur toutes les interfaces."
version: "0.45.0"
---

## Sécurité d'Abord : Liaison et Authentification

Les versions précédentes de Chimera Agent exposaient une passerelle non authentifiée sur toutes les interfaces réseau par défaut. Le `docker-compose.yml` publiait le port 8765 globalement, et `.env.example` était livré sans jeton défini. Une installation en une seule commande pouvait ainsi créer involontairement une passerelle ouverte accessible à quiconque découvrait le port.

v0.45.0 change cela de trois manières :
- La commande `serve` refuse maintenant de se lier à des adresses non locales sans jeton d'authentification
- Docker Compose publie par défaut uniquement sur `127.0.0.1`
- Un flag explicite `--allow-insecure-bind` existe pour les cas légitimes (comme les proxies authentifiés)

Ce changement est breaking pour les déploiements accédant à la passerelle depuis une autre machine. Définissez `CHIMERA_SERVER_TOKEN` ou utilisez l'échappatoire si nécessaire.

## Contrôle des Dépenses Qui Fonctionne Vraiment

Avant cette version, les seules limites étaient des compteurs d'étapes - un job dans une boucle de réessai pouvait vider votre solde chez le fournisseur. v0.45.0 introduit trois plafonds distincts :
1. Limite par exécution
2. Limite par job (pour les tâches planifiées)
3. Limite quotidienne globale empêchant le déclenchement des crons

Les appels non tarifés stoppent maintenant l'exécution au lieu de continuer silencieusement. Les modèles locaux sont traités comme à coût zéro plutôt qu'inconnus, évitant que les plafonds ne bloquent la seule configuration incapable de dépassement. Lancez `chimera doctor` pour vérifier si votre modèle par défaut peut être tarifé avant de définir des limites.

## Gouvernance Unifiée sur Toutes les Interfaces

Auparavant, chaque interface d'exécution (`serve`, cron, MCP, A2A et adaptateurs de messagerie) construisait son propre registre d'outils. Désormais, un seul `governed_profile()` construit la pile pour les cinq, avec des vérifications AST à la compilation empêchant les régressions.

L'idée clé : le mode `CHIMERA_GOVERNANCE=observe` existe pour mesurer le coût de la gouvernance avant son activation. Il exécute la pile complète tout en enregistrant seulement ce qui serait bloqué, fournissant des données concrètes sans risque pour la production. Le défaut reste `off` - la gouvernance doit être un choix explicite.

Cette version active aussi le système d'approbation longtemps inactif pour les appels de classe dangereuse, éliminant les faux positifs sans réduire l'efficacité contre les attaques.

## Prochaines Étapes

Mettez à jour avec `pip install --upgrade chimera-agent` et révisez l'authentification et les limites de dépenses de votre déploiement. Pour l'intégration à l'éditeur, pointez les paramètres de l'agent vers `chimera acp --workspace <repo>`. Détails complets dans les [notes de version][Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
