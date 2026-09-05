---
title: "Chimera Agent 0.49.0 : Les dialogues de mise à jour parlent désormais votre langue"
date: 2026-09-05
category: update
summary: "Chimera Agent 0.49.0 introduit des dialogues de mise à jour localisés et une vérification manuelle des mises à jour, améliorant l'expérience utilisateur dans dix langues."
version: "0.49.0"
---

## Dialogue de mise à jour dans votre langue

Chimera Agent prend désormais en charge les dialogues de mise à jour localisés dans dix langues. Auparavant, le dialogue de mise à jour s'affichait uniquement en anglais, indépendamment de la langue sélectionnée dans l'application. Cette incohérence est résolue, garantissant que le dialogue de mise à jour suit les paramètres de langue du système d'exploitation. Ce changement est particulièrement bénéfique pour les utilisateurs qui dépendent de la langue par défaut de leur système, car la détection de langue de l'application se base sur cette même locale.

De plus, le menu de la barre des tâches inclut désormais une option **Vérifier les mises à jour**, offrant aux utilisateurs un moyen manuel de vérifier si des mises à jour sont disponibles. La vérification automatique des mises à jour, qui s'exécute une fois au démarrage, reste silencieuse lorsqu'aucune mise à jour n'est trouvée pour éviter des interruptions inutiles. Cependant, la vérification manuelle informe explicitement les utilisateurs s'ils sont à jour ou si la vérification a échoué, résolvant le problème précédent où le silence après un clic pouvait être interprété comme une fonctionnalité défectueuse.

## Dialogues d'erreur et diagnostics

Les dialogues d'échec du backend et l'option Quitter de la barre des tâches ont également été traduits. Cependant, les informations de diagnostic restent dans leur langue d'origine. Cette distinction est cruciale : **ce qui vous indique quoi faire est traduit, mais ce qui est destiné à un rapport de bug ne l'est pas.** Par exemple, bien que le message d'erreur expliquant le problème soit affiché dans votre langue, le chemin, l'erreur système et la sortie d'erreur du backend restent tels quels. Cela garantit que les utilisateurs peuvent rechercher efficacement des solutions et signaler des bugs sans rencontrer de barrières linguistiques.

## Ce qui reste inchangé

Cette mise à jour ne modifie pas le mécanisme de mise à jour lui-même. La vérification automatique s'exécute toujours à chaque lancement, et le processus d'installation reste initié par l'utilisateur, nécessitant un consentement explicite avant de continuer. Il n'y a pas de vérification périodique pendant que l'application est en cours d'exécution. De plus, il est important de noter que la version affichant le dialogue de mise à jour est celle actuellement installée, et non celle proposée. Cela signifie que l'invite vous proposant la version 0.49.0 est générée par la version que vous utilisez actuellement.

Pour plus de détails, consultez la [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
