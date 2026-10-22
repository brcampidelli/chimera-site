---
title: "Chimera 0.72.0 : Votre Chrome, selon vos règles"
date: 2026-10-22
category: update
summary: "Chimera 0.72.0 introduit une confiance navigateur par site, la recherche Google optionnelle et un flux d'appairage qui garde la clé Chrome hors du shell de l'agent."
version: "0.72.0"
---

## Ce qui change pour vos agents

Jusqu'ici, donner à Chimera l'accès à votre Chrome signifiait accepter un choix binaire : soit l'agent pouvait agir dans le navigateur, soit il ne le pouvait pas. Il n'y avait aucun moyen de dire « oui sur ce site, demande partout ailleurs », ni de le laisser chercher sur Google sans ouvrir la porte à tout ce qu'un navigateur peut faire. L'extension elle-même avait aussi perdu sa popup dans une version précédente, ce qui empêchait d'arrêter une exécution ou d'accorder une permission par site depuis le navigateur.

La version 0.72.0 remplace ce binaire par un modèle de confiance par site. Vous listez les sites où Chimera peut cliquer et taper sans demander, et partout ailleurs, chaque action vous montre d'abord une carte. La distinction est importante car elle correspond à la façon dont les gens travaillent réellement : vous pouvez faire confiance à un agent pour remplir un formulaire sur votre tableau de bord interne, mais pas pour toucher à votre prestataire de paiement. Cette release garde cette limite explicite. Acheter, payer, envoyer, supprimer, publier et les soumissions de formulaires demandent toujours confirmation, même sur un site de confiance. Les mots de passe, numéros de carte, codes de vérification, iframes de paiement, téléchargements et uploads sont purement refusés. Face à un CAPTCHA, l'agent s'arrête et vous passe l'onglet.

L'extension vérifie aussi à nouveau, juste avant d'agir, que l'élément sur lequel elle a décidé d'intervenir est toujours celui qu'elle s'apprête à cliquer, et que rien ne le recouvre. Cette seconde vérification comble une brèche où une page pouvait changer entre la décision de l'agent et l'action elle-même.

## La recherche Google devient un choix

La recherche Google dans votre propre Chrome est désormais désactivée, sauf si vous l'activez. Avec `CHIMERA_BROWSER_GOOGLE=ask`, les tours desktop peuvent chercher sur Google dans un onglet visible de votre Chrome appairé, et chaque recherche vous montre d'abord une carte — même si les approbations sont réglées sur « autoriser ». Le rythme est délibérément humain : une recherche toutes les 20 secondes, cinq par tour, 30 par jour. Les résultats reviennent sous forme de titres, liens et extraits, marqués comme contenu récupéré.

Ce que la release exclut est aussi important que ce qu'elle inclut. Les bots, les jobs planifiés et le pont MCP n'ont jamais accès à la recherche Google. Au premier CAPTCHA ou page de trafic inhabituel, elle s'arrête et vous passe l'onglet, et ne réessaie pas avant 30 minutes. Il n'y a aucun déguisement impliqué. La fonctionnalité est conçue pour une personne qui regarde son propre navigateur, pas pour de l'automatisation sans surveillance.

## L'appairage ne fait plus fuiter la clé

L'appairage de Chrome se fait maintenant avec un code à six chiffres affiché sur votre écran. Paramètres → Navigateur montre un code à usage unique, valide deux minutes avec cinq essais, que vous tapez dans la popup de l'extension. La clé est ensuite stockée dans le coffre-fort du système d'exploitation, jamais dans l'environnement des commandes que Chimera exécute. C'est le correctif qui compte le plus pour quiconque exécute des agents en local : le token serveur seul, que n'importe quel processus local peut lire, ne donne plus accès à Chrome. Modifier la liste des sites de confiance, arrêter et désappairer nécessitent tous l'écran de l'application elle-même.

Les notes de release énoncent clairement la limite restante : un programme malveillant s'exécutant déjà en tant que votre utilisateur Windows peut toujours prendre la clé. La documentation le dit. Mais la clé ne réside plus dans l'environnement du shell, où une commande égarée ou un agent mal écrit pourrait la lire.

Pour commencer, ouvrez Paramètres → Navigateur dans l'application. Cela indique si l'extension est appairée et connectée, vous donne la commande unique pour l'enregistrer, et vous permet de lister les sites où Chimera peut agir sans demander. Les notes de release complètes sont disponibles ici [Chimera Agent v0.72.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.72.0).
