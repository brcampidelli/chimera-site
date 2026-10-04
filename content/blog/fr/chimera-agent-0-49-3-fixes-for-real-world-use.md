---
title: "Chimera Agent 0.49.3 : Corrections pour un usage réel"
date: 2026-10-04
category: update
summary: "La version 0.49.3 résout des problèmes critiques rencontrés en conditions réelles, améliorant la clarté, la fiabilité et l'efficacité économique."
version: "0.49.3"
---

## Messages d'erreur plus clairs pour les opérations MCP

Un des problèmes les plus coûteux des versions précédentes concernait la lecture de données MCP. Lorsqu'une exécution était compromise par du contenu non fiable, le message d'erreur était ambigu, poussant les utilisateurs à réessayer plusieurs fois sans succès. Cela engendrait des dépenses inutiles et de la frustration. Désormais, les messages d'erreur sont spécifiques à chaque scénario, indiquant clairement si une nouvelle tentative est utile et proposant des alternatives actionnables comme l'utilisation de l'option pause-for-approval ou l'évitement pur et simple du contenu non fiable.

## Amélioration des tests de serveur MCP

Le bouton Test MCP ne vérifiait auparavant que la connectivité du serveur, laissant les utilisateurs dans l'ignorance quant à sa réelle utilisation par l'agent. Cela entraînait une perte de temps et de ressources lorsque les exécutions échouaient à cause de serveurs non chargés. Le bouton Test signale maintenant explicitement si l'agent peut exploiter le serveur, avec des messages distincts selon les causes et des conseils de résolution.

## État de vérification précis

Les exécutions indiquaient auparavant `verified: True` via un instantané, ce qui pouvait être trompeur si les fichiers étaient modifiés ultérieurement. Désormais, elles incluent un flag `delivered_matches_verified`, et la liste des Runs affiche un badge lorsque les fichiers sur disque ne correspondent plus à l'état vérifié. Cela garantit une prise de conscience des écarts et une action appropriée.

## Correction des erreurs d'installation de compétences

Les échecs d'installation étaient auparavant attribués à la limite horaire de téléchargements anonymes sur GitHub, même quand ce n'était pas la cause. Les messages identifient maintenant correctement l'hôte ayant refusé la requête et s'assurent que le token atteigne bien les deux hôtes. De plus, les erreurs 429 déclenchent une nouvelle tentative avec le délai spécifié par le serveur, réduisant les essais superflus.

## Refus d'écriture de fichiers plus précis

L'écriture de fichiers était parfois refusée avec des messages erronés comparant des répertoires au lieu des chemins. Cela conduisait l'agent à épuiser son budget en réessais inutiles. Les messages de refus décrivent désormais correctement la comparaison des chemins et expliquent le motif des globs relatifs au workspace, évitant confusion et tentatives gaspillées.

## Mise à jour des modèles par défaut

Les modèles par défaut étaient obsolètes, certains d'une génération en retard et d'autres risquant d'être retirés. Ils ont été actualisés vers des versions plus récentes et stables, garantissant de meilleures performances. Par ailleurs, `.env.example` ne définit plus de modèles par défaut significativement plus chers ou retirés.

Ces corrections, basées sur des retours terrain, visent à améliorer l'expérience utilisateur en adressant les points critiques. Pour le détail complet, consultez [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
