---
title: "Chimera Agent 0.85.0 : fin des blocages silencieux et un navigateur qui s’appaire"
date: 2026-11-08
category: update
summary: "Corrige un blocage d’exécution causé par des pipes hérités, ajoute l’appairage du navigateur avec un code à usage unique, la voix locale pour les chatbots et des endpoints nommés compatibles OpenAI."
version: "0.85.0"
---

## L’exécution qui ne finissait jamais

Une exécution dont le processus enfant gardait son pipe de sortie ouvert bloquait l’agent indéfiniment. Le lecteur attendait sans limite la fermeture du pipe. Un petit-fils qui héritait du pipe — un worker de test runner, un serveur en arrière-plan — laissait l’exécution, son bouton d’annulation et la suite de tests en attente pour toujours. Le bouton d’annulation ne faisait rien parce que l’arbre de processus restait vivant, et la suite de tests se figeait silencieusement au lieu de signaler le blocage.

Cela change dans la 0.85.0. Le lecteur de sortie tourne désormais dans son propre thread avec une période de grâce de cinq secondes après la sortie de l’enfant. Quand vous annulez une exécution, Chimera tue tout le groupe de processus sur POSIX et l’arbre de processus sur Windows. La suite de tests cesse aussi de se cacher derrière un mur gelé : si un seul test dépasse quinze minutes, la suite vide la stack trace de chaque thread au lieu de se bloquer sans un mot. Vous obtenez un diagnostic plutôt qu’un terminal vide.

Le correctif compte surtout quand vous enchaînez des outils qui lancent leurs propres sous-processus — frameworks de test, scripts de build, ou toute commande qui fork un serveur en arrière-plan. Avant, ces exécutions étaient irrécupérables. Maintenant, annuler veut dire annuler.

## Appairer un onglet de navigateur sans ouvrir de port

Jusqu’ici, donner à un onglet de navigateur l’accès à l’écran du propriétaire impliquait d’exposer le bridge ou un canal de chat. Les deux chemins charriaient plus de surface d’attaque que nécessaire. La version 0.85.0 ajoute un flux d’appairage qui les élimine complètement.

L’application desktop affiche un code de huit caractères, valide cinq minutes et pour cinq tentatives. Vous le tapez dans l’onglet du navigateur. Cet onglet reçoit un cookie HttpOnly same-site valable jusqu’à douze heures, révocable depuis le desktop à tout moment. Seul le desktop émet des codes — le bridge et les canaux de chat ne le peuvent pas. Un onglet appairé ne peut pas activer le bridge, ne peut pas activer le contrôle total, et ne peut pas basculer « Ignorer les permissions ». Chaque requête qui change l’état depuis cet onglet doit provenir de la même origine.

Cela vous donne une fenêtre à durée limitée, révocable et à faibles privilèges sur l’écran du propriétaire. Vous appairez un onglet quand vous en avez besoin, vous le révoquez quand ce n’est plus le cas, et le bridge reste éteint tout du long.

## Les messages vocaux arrivent en local, et les endpoints reçoivent des noms

Les bots Discord et Telegram peuvent maintenant entendre les messages vocaux et répondre à voix haute, et les deux se passent sur votre machine. Les notes vocales sont transcrites localement avec faster-whisper en utilisant une révision de modèle épinglée. La durée est vérifiée avant le décodage, et une limite de débit par utilisateur empêche les abus. Les réponses parlées sont désactivées par défaut. Pour les activer, vous pointez `CHIMERA_CHAT_VOICE_MODEL` vers un fichier `.onnx` de voix Piper que vous avez choisi vous-même. Chimera ne livre aucun modèle vocal, et `piper-tts` (GPL-3.0) vit dans un extra `voice` séparé, en dehors de `[full]`. Vous optez pour la voix, et vous fournissez la voix.

Les endpoints compatibles OpenAI reçoivent aussi un traitement de première classe. Paramètres › Connexions liste désormais vos endpoints — un vLLM local, LM Studio, ou un serveur llama.cpp, ou un endpoint hébergé — et vous permet de les ajouter, tester et supprimer. Le test fait un seul appel `GET /models` borné à cet endpoint uniquement. Seul l’écran du propriétaire peut modifier ou tester les endpoints, la clé n’est jamais affichée, et la clé d’un endpoint doit être sa propre variable `*_API_KEY`, jamais la credential d’un autre fournisseur ni un paramètre `CHIMERA_`. Cela clôt la demande de longue date dans #1133.

## Que faire maintenant

Mettez à jour avec `pip install chimera-agent --upgrade`. Lisez les notes complètes sur [Chimera Agent v0.85.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.85.0). Si vous utilisez des chatbots et voulez la voix, installez l’extra `voice` et définissez `CHIMERA_CHAT_VOICE_MODEL` vers votre modèle Piper. Pour appairer un onglet de navigateur, ouvrez l’application desktop et cherchez le code d’appairage dans les contrôles d’écran du propriétaire.
