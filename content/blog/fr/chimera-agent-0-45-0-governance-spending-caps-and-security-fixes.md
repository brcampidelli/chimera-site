---
title: "Chimera Agent 0.45.0 : Gouvernance, Plafonds de Dépenses et Corrections de Sécurité"
date: 2026-08-16
category: update
summary: "Cette version corrige des paramètres de sécurité manquants, ajoute des contrôles de dépenses et étend la gouvernance à toutes les surfaces non surveillées."
version: "0.45.0"
---

## Paramètres de Sécurité Qui Sont Activement Sécurisés

La version précédente était livrée avec une configuration non sécurisée : ports ouverts, aucune authentification et aucune alerte. Ce n'était pas une erreur—c'était un choix délibéré pour privilégier la simplicité d'installation au détriment de la sécurité, mais l'équilibre était mauvais. Désormais, `serve` refuse de se lier à des adresses non locales sans token, et le setup Docker ne publie que sur `127.0.0.1`. Si vous devez exposer la passerelle, vous devez l'autoriser explicitement avec `--allow-insecure-bind` ou définir `CHIMERA_SERVER_TOKEN`.

Cela casse les déploiements existants qui dépendaient de l'ancien comportement. La correction est simple, mais ce changement était nécessaire : une passerelle d'agent accessible à n'importe qui sur le réseau est un risque, pas une fonctionnalité.

## Plafonds de Dépenses Qui Fonctionnent

Avant cette version, le seul contrôle des dépenses était un compteur d'étapes. Un job dans une boucle de réessai pouvait épuiser vos crédits d'API sans avertissement. Désormais, il y a trois plafonds distincts : par exécution, par job et un agrégat quotidien. Si un appel ne peut pas être tarifé, l'exécution s'arrête au lieu de continuer sans contrôle. Les modèles locaux sont considérés comme gratuits plutôt qu'inconnus, donc les plafonds ne bloquent pas la seule configuration qui ne peut pas dépasser le budget.

`chimera doctor` vérifie si votre modèle par défaut peut être tarifé. Cela évite les mauvaises surprises lorsque vous essayez de définir une limite de dépenses.

## Gouvernance Qui Couvre Toutes les Surfaces

Cinq composants différents (`serve`, cron, MCP, A2A et les adaptateurs de messagerie) avaient chacun leur propre registre d'outils minimal. Maintenant, ils partagent une seule pile `governed_profile()`, appliquée par une vérification AST à la compilation. L'idée clé est que `CHIMERA_GOVERNANCE=observe` est plus utile que `enforce`—cela enregistre ce qui aurait été bloqué sans rien bloquer réellement, vous permettant ainsi de mesurer l'impact avant de l'activer.

Cette version connecte également le système d'approbation qui existait mais n'était pas opérationnel. Les appels de classe dangereuse qui lisent des données externes ont désormais un intervenant de l'autre côté de la barrière, réduisant les blocages excessifs sans compromettre la sécurité.

## Prochaines Étapes

Exécutez `chimera doctor` pour vérifier votre configuration, puis révisez votre déploiement si vous vous liiez à `0.0.0.0`. Les modifications complètes sont dans [Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
