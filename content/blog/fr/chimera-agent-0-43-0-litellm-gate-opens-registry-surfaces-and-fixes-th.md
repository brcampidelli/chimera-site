---
title: "Chimera Agent 0.43.0 : Ouverture de la porte LiteLLM, Registre exposé et Correctifs Essentiels"
date: 2026-08-16
category: update
summary: "Chimera 0.43.0 supprime les restrictions arbitraires de fournisseurs, expose les paramètres cachés et corrige les téléchargements de documents et la persistance des sessions."
version: "0.43.0"
---

## La porte LiteLLM accepte désormais n'importe quelle clé de fournisseur

Auparavant, Chimera ne reconnaissait que cinq fournisseurs LiteLLM, rejetant les clés valides de services comme Groq ou Mistral avec une erreur trompeuse "Aucune clé de fournisseur configurée". La porte accepte maintenant n'importe quelle `<PROVIDER>_API_KEY`, avec deux protections :

1. Une liste noire empêche les fournisseurs non-modèles (comme ElevenLabs ou Stability AI) d'être identifiés à tort comme sources de modèles
2. `doctor` valide désormais les noms des fournisseurs contre l'énumération de LiteLLM, détectant les fautes de frappe qui échoueraient autrement silencieusement

Ce changement résout un problème plus profond : les clés placées dans `.env` étaient ignorées silencieusement à cause du paramètre `extra="ignore"` de Pydantic. Comme `chimera init` crée des fichiers `.env` et que la documentation y dirige les utilisateurs, cela causait des échecs persistants de configuration.

## Fonctionnalités précédemment cachées maintenant accessibles

Trois capacités importantes existaient dans le code mais manquaient d'interfaces utilisateur :

1. **Registre des Agents** : La boîte de voie du tableau était un champ de texte libre devinant des IDs de registre qui n'étaient jamais affichés. Maintenant accessible via le troisième onglet d'Automation, il montre les agents existants tout en permettant de déposer du travail contre des IDs inexistants (qui attendent dans le backlog).
2. **Sélection du Modèle d'Embedding** : Précédemment cachée, elle apparaît maintenant directement sous l'interrupteur de mémoire sémantique qu'elle affecte. Les échecs dégradent silencieusement vers la recherche lexicale, rendant la configuration visible cruciale.
3. **Pools de Clés** : Ils tournaient en round-robin avec des temps de repos mais n'avaient pas d'interface. L'interface les gère maintenant par opération (ajout/suppression) plutôt que d'exposer les valeurs secrètes.

## Correctifs critiques pour les fonctionnalités de base

Deux fonctionnalités étaient livrées cassées dans l'application :

- **Téléchargements de Fichiers et Dictée de Messages** : Les deux échouaient avec des erreurs 422 car `authHeaders()` forçait un Content-Type `application/json`, empêchant les bonnes limites de formulaire multipart. Les tests avaient manqué cela car ils simulaient toute la couche API.

- **Persistance des Sessions** : L'application perdait les paramètres de thème, d'espace de travail et de langue au lancement à cause de l'attribution aléatoire de ports changeant l'origine du `localStorage`. Elle se souvient et réutilise maintenant les ports.

L'assistant de première exécution gère aussi mieux la sélection de modèles, montrant (mais n'appliquant pas automatiquement) les modèles compatibles pour votre fournisseur pour éviter les erreurs 401 immédiates.

Mettez à jour avec `pip install --upgrade chimera-agent` ou consultez [Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0) pour les détails complets.
