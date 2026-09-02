---
title: "Chimera Agent 0.48.0 : Sécurité renforcée et nouveaux paramètres par défaut"
date: 2026-09-02
category: update
summary: "Chimera Agent 0.48.0 introduit des améliorations significatives en matière de sécurité et des changements de paramètres par défaut, avec un accent sur l'isolation des sandbox et la sélection de modèles économiques."
version: "0.48.0"
---

## Isolation renforcée des sandbox

Le paramètre par défaut des sandbox a été mis à jour pour privilégier la sécurité. Auparavant, la sandbox `local` n'était pas isolée, reposant sur des noyaux de gouvernance et des invites de confirmation pour protéger votre machine. Cette approche présentait des vulnérabilités, notamment lorsque les utilisateurs contournaient les invites ou lorsque des instructions étaient injectées. Désormais, le paramètre par défaut est `auto`, qui utilise **Seatbelt** sur macOS avec un profil `(deny default)` et **bubblewrap** sur Linux avec des paramètres d'isolation stricts. Cela garantit l'isolation réseau et limite les écritures au répertoire de travail et au répertoire temporaire, réduisant ainsi considérablement les risques potentiels.

## Considérations pour Windows et les noyaux Linux

Pour Windows, la mise à jour indique explicitement qu'aucun mécanisme de sandbox n'est fourni. Le jeton restreint existant et les filtres réseau ne sont pas approximés, car une limite manquante est moins dangereuse qu'une limite supposée à tort. De même, les noyaux Linux qui refusent les espaces de noms utilisateurs non privilégiés signaleront la sandbox comme *indisponible*, assurant une transparence sur les limitations de sécurité.

## Modèle par défaut économique

Le modèle par défaut a été changé de GPT-5.5 à DeepSeek V3.1. Ce changement répond au coût élevé associé au modèle précédent, qui était le plus cher du catalogue. DeepSeek V3.1 offre une option plus économique à $0.25/$0.95 par million de tokens, contre $5.00/$30.00 pour GPT-5.5. La variable d'environnement `CHIMERA_DEFAULT_MODEL` reste prioritaire, et le sélecteur de modèle permet des changements par conversation.

## Améliorations guidées par l'audit

Un audit approfondi a identifié de nombreuses recommandations, avec 56% du travail axé sur le câblage plutôt que sur les fonctionnalités du produit. Cette version traite de nombreux problèmes, assurant que le code fonctionne correctement et que les logs sont précis. Les correctifs notables incluent la gestion correcte des outils refusés, la suppression des tâches cron échouées et la sécurisation des chaînes portant des identifiants. Chaque correctif a été rigoureusement testé en annulant les changements et en vérifiant que les tests détectaient les défauts.

## Nouvelles fonctionnalités et améliorations

Les nouvelles fonctionnalités incluent les identifiants stockés dans le trousseau du système d'exploitation (`chimera secrets`), un mécanisme d'approbation de décision (`chimera approve`) et des tours de codage qui survivent aux déconnexions. De plus, les commandes prouvées comme étant en lecture seule ne nécessitent plus de confirmation, et les serveurs MCP peuvent être ouverts plutôt que transférés. Trois nouvelles portes dans le CI renforcent encore la robustesse du système.

Pour un compte rendu détaillé de tous les changements, consultez le [CHANGELOG.md][Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0).

[Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0): CHANGELOG.md
