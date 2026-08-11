---
title: "Chimera Agent 0.42.0 : Des Configurations Qui Fonctionnent Enfin"
date: 2026-08-11
category: update
summary: "Correction de sept paramètres qui étaient sauvegardés sans modifier le comportement, unification des contrôles de sécurité, et possibilité de configurer les agents plutôt que d'accepter les valeurs par défaut."
version: "0.42.0"
---

## Paramètres Qui Fonctionnent Enfin

Sept configurations précédemment sauvegardées sans effet—modèle par défaut, mise en cache des réponses, endpoint personnalisé, délai d'attente, chaîne de secours, et mise en cache des prompts. Le `LLMGateway` capturait les paramètres à la construction, mais `chimera app` le construisait une fois par processus. Six sont maintenant mis à jour en temps réel. Trois (cascade, persistance de chat, mémoire de chat) s'appliquent à la **prochaine conversation** et le précisent. Deux nécessitant un redémarrage (démon de planification et autoload MCP) le déclarent. Les labels proviennent désormais du serveur, évitant les désalignements silencieux.

## Contrôles de Sécurité Unifiés

`CHIMERA_TOOL_ALLOWLIST` et `CHIMERA_TOOL_DENYLIST` affectaient auparavant uniquement `chimera run` et `chimera solve`. Les autres surfaces (app, API, tâches batch, bots de messagerie) les ignoraient complètement. Maintenant, ils s'appliquent partout. Les refus se **combinent**—les restrictions de déploiement, de requête et de posture doivent toutes autoriser un outil. Les permissions **s'intersectent**, empêchant les requêtes de dépasser la portée de leur expéditeur. Correction de `explore_repository` qui contournait les filtres en raison d'une inscription tardive.

## Identité et Instructions de l'Agent

Le nom, la langue et les instructions permanentes de l'agent étaient auparavant non fonctionnels. `profile.json` n'était pas lu par l'API, les faits de la persona ne s'appliquaient que lorsqu'ils étaient pertinents pour un tour, et l'espace préambule inconditionnel était réservé pour la compatibilité REPL/OpenAI. Maintenant, ils s'appliquent à l'édition de code, à l'exécution autonome et à la messagerie. Les instructions **s'ajoutent**—les prompts par défaut conservent les gardes de sécurité, et les blocs personnalisés avertissent lorsqu'ils n'accordent pas de capacités.

## Posture de Déploiement Comme Base

La portée d'exécution, les exigences d'approbation et les permissions de commande hôte étaient dispersées entre des composants supprimés, des paires codées en dur et une variable d'environnement rejetée par `PATCH /api/config`. Maintenant consolidées dans une seule carte. La posture de déploiement est une **base**, pas une valeur par défaut—les clients ne peuvent pas ignorer silencieusement les restrictions sur les machines qu'ils ne contrôlent pas. L'exécution hôte nécessite une confirmation explicite.

## Prochaines Étapes

Exécutez `chimera app update` et consultez [Chimera Agent v0.42.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.42.0) pour les détails sur les agents au niveau du projet, les corrections d'audit de sécurité et l'activation des cartes de compétences.
