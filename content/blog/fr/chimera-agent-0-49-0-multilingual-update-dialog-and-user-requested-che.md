---
title: "Chimera Agent 0.49.0 : Dialogue de mise à jour multilingue et vérifications à la demande"
date: 2026-09-06
category: update
summary: "Chimera Agent 0.49.0 introduit le support multilingue pour le dialogue de mise à jour et ajoute une option de vérification manuelle dans la barre des tâches."
version: "0.49.0"
---

## Dialogue de mise à jour multilingue et vérification manuelle

Chimera Agent parle désormais votre langue partout, y compris dans le dialogue de mise à jour. Auparavant, ce dialogue était uniquement en anglais, indépendamment du paramètre linguistique de l'application. Ce problème est résolu, et le dialogue suit maintenant la langue de votre système d'exploitation. Ce changement garantit que les utilisateurs qui n'ont pas modifié le paramètre linguistique de l'application verront le dialogue dans la langue de leur système, tandis que ceux qui l'ont personnalisé continueront à le voir en anglais.

De plus, la barre des tâches inclut désormais une option **Vérifier les mises à jour**. C'est la première méthode permettant de demander manuellement une vérification de mise à jour. La vérification automatique s'exécute une fois au démarrage et reste silencieuse s'il n'y a pas de mise à jour pour éviter de harceler les utilisateurs. Cependant, ce silence pourrait être interprété à tort comme un échec, incitant les utilisateurs à relancer l'application inutilement. Avec la nouvelle vérification manuelle, les utilisateurs peuvent maintenant confirmer que leur application est à jour ou recevoir un retour d'information si la vérification échoue.

## Dialogues d'erreur traduits et diagnostics inchangés

Le dialogue de mise à jour n'est pas le seul élément de l'application à avoir été traduit. Les deux dialogues d'échec du backend et l'option Quitter de la barre des tâches sont désormais également disponibles en plusieurs langues. Cependant, une distinction claire est faite entre ce qui est traduit et ce qui ne l'est pas :

> **Ce qui vous indique quoi faire est traduit. Ce qui entre dans un rapport de bug ne l'est pas.**

Par exemple, si le backend plante, le message d'erreur sera dans votre langue, mais le chemin, l'erreur système et la sortie d'erreur du backend resteront dans leur forme originale. Cela garantit que les utilisateurs peuvent toujours rechercher et comprendre les erreurs système sans confusion.

## Ce qui reste inchangé

Cette mise à jour ne modifie pas le mécanisme de mise à jour lui-même, qui fonctionne depuis la version 0.48.0. La vérification automatique s'exécute toujours à chaque lancement, et le processus d'installation reste initié par l'utilisateur. Il n'y a pas de vérification périodique pendant que l'application est en cours d'exécution.

Un aspect contre-intuitif demeure : **la version qui vous montre le dialogue est celle déjà installée**, et non celle proposée. Cela signifie que l'invite vous proposant la version 0.49.0 est générée par la version que vous utilisez actuellement. À partir de la version 0.49.0, cette invite sera dans votre langue.

Pour plus de détails, consultez le [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
