---
title: "Chimera Agent 0.49.3 : Corrections pour un usage réel"
date: 2026-10-05
category: update
summary: "La version 0.49.3 résout des problèmes critiques rencontrés en conditions réelles, améliorant la clarté, la fiabilité et l'efficacité économique."
version: "0.49.3"
---

## Problème d'écriture MCP : Clarté et coût

L'une des corrections les plus importantes de cette version concerne un problème coûteux lié à l'écriture de fichiers MCP. Auparavant, lors de la lecture de données via MCP, l'exécution s'arrêtait sans écrire les fichiers, avec un message d'erreur ambigu. Cela entraînait des tentatives répétées, chacune générant des coûts sans progrès. Par exemple, quatre exécutions de la même tâche ont coûté **5,11 $US** sans produire de fichiers, alors que la même tâche avec des outils natifs réussissait dès le premier essai pour **0,37 $US**.

Le message d'erreur distingue désormais trois scénarios : refus humain, refus de configuration et absence d'approbateur. Il propose aussi des solutions actionnables, comme utiliser l'option pause-for-approval ou éviter le contenu non fiable. Ce changement évite les tentatives inutiles et réduit les coûts.

## Bouton Test MCP : Meilleur retour

Une autre amélioration majeure concerne le bouton Test MCP. Auparavant, il ne confirmait que la connectivité serveur, induisant en erreur sur la capacité réelle à l'utiliser. En réalité, l'agent ne pouvait accéder au serveur car le chargement des serveurs MCP au démarrage était désactivé par défaut. Cela a causé des pertes de temps et de ressources, comme dans un cas avec **vingt-deux appels d'outil sur dix-neuf minutes** sans utilisation du serveur.

Le bouton Test indique maintenant si l'agent peut utiliser le serveur, avec des messages distincts selon les causes. Cela garantit que les utilisateurs comprennent les étapes nécessaires.

## Statut Verified : Représentation exacte

Le statut `verified` indiquait auparavant une vérification instantanée, sans prendre en compte les changements ultérieurs. Cela créait de la confusion quand la même commande exécutée sur l'arborescence produisait **20 échecs sur 20 exécutions**. Le statut inclut maintenant `delivered_matches_verified`, et la liste des Runs affiche un badge si les fichiers disque ne correspondent plus à l'état vérifié. Cela donne une vision plus claire du résultat.

## Installation de compétences : Messages d'erreur corrects

Les échecs d'installation de compétences attribuaient auparavant la faute à la mauvaise limite, suggérant des réessais ou la configuration de `GITHUB_TOKEN` alors que le problème était ailleurs. Le token atteint maintenant les deux hôtes, et les messages identifient correctement l'hôte refusant. Cela évite les réessais inutiles et guide vers la bonne action.

## Écriture de fichiers : Messages de refus clairs

Les refus d'écriture étaient peu clairs, surtout quand un chemin absolu était déclaré comme région d'écriture. Le message nomme maintenant le chemin comparé, explique la région comme une liste de globs relatifs au workspace, et pointe le motif incompatible. Cela évite les réessais et rapports d'erreur environnementale inutiles.

## Modèles par défaut : Mis à jour et fiables

Les modèles par défaut ont été actualisés pour refléter les générations actuelles, garantissant meilleures performances et coûts réduits. Le modèle par défaut est passé de `deepseek-chat-v3.1` à `deepseek-v4-flash-0731`, diminuant significativement les coûts. Le modèle haut de gamme est maintenant `z-ai/glm-5.3`, et les modèles de jugement fusion et panel ont aussi été mis à jour. Un test vérifie désormais qu'aucun modèle par défaut n'est un slug `-preview`, que les fournisseurs peuvent retirer sans préavis.

Pour les détails complets, voir [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
