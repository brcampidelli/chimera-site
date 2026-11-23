---
title: "Chimera Agent 0.92.0 : des coûts plus clairs, une planification configurable"
date: 2026-11-23
category: update
summary: "Les reçus de coûts utilisent désormais la tarification publique pour les exécutions hors de serve, le planificateur peut être désactivé par lane ou par exécution, et la recherche des paramètres de Desktop trouve le routage des modèles."
version: "0.92.0"
---

## Des reçus de coûts qui correspondent au modèle que vous avez réellement appelé

Les versions précédentes pouvaient vous laisser deviner ce qu'une exécution coûtait vraiment. Les reçus dépendaient d'un contexte qui n'était pas toujours disponible, et un modèle qui ne correspondait à aucune entrée du catalogue pouvait retomber sur un tarif qui ne reflétait pas l'appel que vous aviez fait. Cela rendait difficile l'audit des dépenses ou la comparaison des exécutions.

La version 0.92.0 change la façon dont les reçus sont construits pour les exécutions hors de `serve`. Ces exécutions utilisent désormais l'index de prix public d'OpenRouter. Les slugs de modèles exacts obtiennent leurs propres tarifs au lieu d'hériter d'une entrée plus large ou moins précise. Les appels stricts conservent le devis utilisé à l'admission, de sorte que le reçu reflète le prix qui a été accepté au moment où l'appel a été admis plutôt qu'une estimation ultérieure ou différente. L'entrée du catalogue `gpt-oss-20b` a également été actualisée.

Pour quiconque exécute des agents en dehors de l'environnement servi, cela supprime une source d'ambiguïté. Vous pouvez consulter un reçu et savoir qu'il provient de la tarification publique, lié au slug de modèle spécifique, les appels stricts préservant le devis qui a régi l'admission. Ce changement ne modifie pas la façon dont les modèles sont sélectionnés. Il change ce que le reçu rapporte après l'exécution.

## La planification devient une décision par exécution

Le planificateur était auparavant un comportement global. Si vous vouliez qu'une lane, une exécution API ou une étape de résolution de workflow ignore la planification, il n'existait aucun interrupteur direct pour ce contexte. Soit vous acceptiez le défaut, soit vous modifiiez le comportement plus largement que la tâche ne l'exigeait.

`use_planner` est désormais configurable sur les lanes Kanban, les exécutions API et les étapes de résolution de workflow. Le planificateur reste activé par défaut. Ce défaut compte : les configurations existantes conservent leur comportement actuel, sauf si vous vous en excluez explicitement. Le nouveau paramètre vous donne un point de contrôle plus fin pour les cas où la planification ajoute de la latence ou des étapes dont une exécution particulière n'a pas besoin.

C'est utile lorsqu'une lane gère une tâche contrainte, lorsqu'un appelant API sait que l'entrée est déjà formatée pour une exécution directe, ou lorsqu'une étape de résolution doit se poursuivre sans passage de planification supplémentaire. Vous pouvez désormais exprimer cela au niveau de la lane, de l'exécution ou de l'étape, au lieu de modifier tout le système.

## Des paramètres Desktop que vous pouvez réellement trouver

La recherche des paramètres ne faisait pas remonter la table de routage des modèles par rôle. Si vous ne saviez pas déjà où elle se trouvait, vous pouviez passer du temps à cliquer dans l'interface pour la trouver. C'est corrigé : la recherche trouve désormais la table de routage.

Deux corrections Desktop plus petites sont incluses. Le texte du routage et des reçus s'affiche désormais correctement en portugais brésilien. Les nouvelles conversations et les tours en réponse seule affichent également un statut plus clair, de sorte que l'interface vous indique ce qui se passe au lieu de laisser l'état ambigu.

## Que faire maintenant

Mettez à jour vers la 0.92.0 et vérifiez les trois domaines qui ont changé. Si vous exécutez des agents hors de `serve`, examinez un reçu et confirmez qu'il reflète le slug de modèle et le devis d'admission que vous attendez. Si vous avez des lanes ou des exécutions API qui n'ont pas besoin de planification, définissez `use_planner` sur false à ce niveau et laissez le défaut activé partout ailleurs. Si vous utilisez Desktop, recherchez dans les paramètres la table de routage des modèles par rôle et vérifiez le texte de statut dans une nouvelle conversation.

Notes de version complètes : [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
