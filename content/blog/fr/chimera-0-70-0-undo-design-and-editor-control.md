---
title: "Chimera 0.70.0 : annulation, conception et contrôle de l'éditeur"
date: 2026-10-19
category: update
summary: "Le chat en terminal bénéficie d'une annulation et d'une planification de niveau bureau, l'éditeur obtient des diffs conscients de git et des aperçus de fichiers, et Chimera Design ajoute l'export, le canevas et l'outillage pour agents."
version: "0.70.0"
---

## Le terminal cesse d'être un client de seconde classe

Avant cette version, `chimera chat` et `chimera assist` fonctionnaient avec un ensemble de garde-fous plus restreint que le bureau. Le contexte grandissait jusqu'à atteindre une limite, les plans n'étaient pas affichés avant l'exécution, et annuler un tour signifiait faire confiance à un chemin de restauration plus simple. Cet écart est désormais comblé.

Les sessions terminal compactent le contexte par défaut en utilisant la même politique que le bureau. Si vous voulez l'ancien comportement, `--no-compact` le désactive. `/plan <tâche>` affiche maintenant le plan d'abord et n'exécute la tâche qu'après approbation. Approuver un plan ne pré-approuve pas les actions risquées. `/undo N` liste les fichiers touchés lors des N derniers tours, demande confirmation et restaure via le même stockage durable que celui utilisé par l'écran Code. Les fichiers que vous avez modifiés après le tour cible sont laissés intacts. Un simple `/undo` annule toujours le dernier tour.

Le bureau gagne également une chronologie de rembobinage dans l'en-tête de conversation. Chaque point sauvegardé affiche l'heure et le nombre de fichiers touchés. En sélectionner un montre exactement quels fichiers seraient restaurés et lesquels seraient ignorés parce que vous les avez modifiés plus tard. La restauration elle-même peut être refaite depuis la même chronologie. Les tours sans copie sauvegardée apparaissent désactivés avec la raison. Ni l'aperçu ni la route de restauration ne sont exposés sur le pont du bureau, donc aucun appareil apparié ou client externe ne peut déclencher une restauration.

## L'éditeur reflète maintenant ce que git voit

L'arborescence de fichiers donnait auparavant une liste de noms. Elle marque désormais les fichiers modifiés, ajoutés et non suivis avec une lettre, et les dossiers avec un point, en utilisant le même statut git que la carte des modifications. Le statut se rafraîchit après une sauvegarde et à la fin d'un tour d'agent. Ctrl+P ouvre un fichier par son nom. Les fichiers HTML disposent d'un bouton Aperçu dans le même bac à sable que celui utilisé par l'écran Code, y compris les modifications non enregistrées. Fermer un onglet avec des modifications non enregistrées demande si vous voulez continuer à éditer, fermer sans enregistrer, ou enregistrer et fermer.

Les actions basées sur la sélection changent la façon dont vous demandez de l'aide pour le code. Sélectionnez des lignes et appuyez sur Ctrl/⌘+L pour les envoyer à la conversation Code comme élément de contexte, le même chemin qu'une mention `@`. Ctrl/⌘+I ajoute `propose_change`, que le serveur exécute en lecture seule avec un fichier et une plage de lignes. La proposition revient sous forme de diff en ligne avec Accepter et Rejeter. Accepter enregistre via l'éditeur. Si les lignes changent avant que vous répondiez, la proposition disparaît. Un fichier qui change sur le disque pendant qu'il est ouvert est conservé avec son diff et reste en lecture seule jusqu'à ce que vous choisissiez Conserver ou Annuler.

Le composeur de code prend désormais en charge les mentions `@` pour les fichiers, dossiers, conceptions et conversations récentes. Un fichier jusqu'à 8 000 caractères est joint en ligne, assaini, clôturé comme données et enregistré dans le grand livre comme une lecture. Les fichiers plus grands et les dossiers sont transmis par chemin pour que l'agent les lise. Les chemins absolus et `..` sont refusés avant l'exécution du tour. Les liens symboliques hors du projet et le `.env` propre à Chimera sont refusés lors de la résolution. Les invités sur les liens de partage ne peuvent pas mentionner les conceptions ou les conversations.

## Chimera Design gagne l'export, le canevas et un outil

Chimera Design exporte désormais en PDF, PNG et PPTX. Le PDF est la page statique imprimée par le Chromium de Playwright, une page par planche, avec JavaScript désactivé et les requêtes non-`data:` interrompues. Le PNG produit une image par planche ou un zip. Le PPTX place chaque élément à son cadre sur une diapositive par planche. Lorsque Chromium ou python-pptx est manquant, l'export refuse et vous indique quoi installer. Rien n'est téléchargé automatiquement.

Le canevas s'ouvre dans l'emplacement central de l'écran Code, avec la conversation à gauche et le canevas à droite. Il s'enregistre automatiquement via la route des opérations avec un état visible. Les modifications manuelles et celles des agents partagent un seul historique d'annulation. Un tour qui demande une conception affiche une action « Ouvrir dans Chimera Design ». À côté du canevas, vous pouvez proposer à partir d'un brief, affiner une sélection, auditer, modifier les jetons, vérifier la conception par rapport à eux, commenter par élément, restaurer des versions et exporter en HTML. La restauration et l'export demandent d'abord.

L'outil `design` n'est proposé que lorsqu'un tour demande une conception visuelle. Un détecteur déterministe couvre le portugais, l'anglais et l'espagnol, avec les accents repliés et les mots entiers correspondants. Les sens de code tels que « design pattern » ou « system design » ne se déclenchent jamais. L'outil obéit à la posture, n'envoie jamais de HTML à un bot, marque sa sortie comme non fiable et reste hors des tours d'invités. `CHIMERA_TOOL_DENYLIST=design` le supprime.

## Que faire maintenant

Mettez à jour vers 0.70.0 et ouvrez une session terminal : exécutez `/plan` avant une tâche risquée, puis `/undo N` après. Dans l'éditeur, sélectionnez un bloc et appuyez sur Ctrl/⌘+I pour voir un changement proposé sous forme de diff. Pour le travail de conception, ouvrez le canevas à partir d'un tour qui demande une conception visuelle et exportez à partir de là. Notes de version complètes : [Chimera Agent v0.70.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.70.0).
