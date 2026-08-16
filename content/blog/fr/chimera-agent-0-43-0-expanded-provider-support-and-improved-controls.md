---
title: "Chimera Agent 0.43.0 : Support étendu des fournisseurs et contrôles améliorés"
date: 2026-08-16
category: update
summary: "Chimera Agent 0.43.0 élargit le support des fournisseurs via LiteLLM, ajoute de nouveaux contrôles dans l'interface pour des paramètres précédemment cachés, et corrige les problèmes de pièces jointes et de persistance du thème."
version: "0.43.0"
---

## Support étendu des fournisseurs avec LiteLLM

Chimera Agent s'intègre désormais pleinement avec LiteLLM, permettant aux utilisateurs de se connecter à n'importe quel fournisseur pris en charge par LiteLLM. Auparavant, seuls cinq fournisseurs étaient reconnus, bloquant les utilisateurs avec des clés pour des services comme Groq ou Mistral. La mise à jour garantit que toute clé `<PROVIDER>_API_KEY` est acceptée, avec une liste noire pour exclure les fournisseurs non liés aux modèles comme ElevenLabs et Stability. De plus, `doctor` signale désormais les noms de fournisseurs non reconnus, évitant les fautes de frappe qui pourraient imiter des fournisseurs valides.

## Contrôles améliorés dans l'interface

Trois paramètres auparavant accessibles uniquement via les fichiers `.env` sont maintenant disponibles dans l'interface : le modèle d'embedding, l'URL de base d'Ollama et les pools de clés. Le paramètre du modèle d'embedding est désormais directement lié au switch de mémoire sémantique, évitant les échecs silencieux. Les pools de clés sont gérés via des opérations (ajout/suppression) plutôt que par édition directe, préservant la sécurité en évitant l'affichage d'informations sensibles.

## Corrections et améliorations

L'ajout de documents et la dictée de messages fonctionnent désormais correctement, résolvant une erreur 422 causée par des en-têtes Content-Type incorrects. L'application conserve également votre thème, espace de travail, liste de projets et langue entre les lancements, corrigeant un problème où ces paramètres étaient perdus lors des changements de port.

Pour découvrir ces mises à jour, consultez les [notes de version][Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0).
