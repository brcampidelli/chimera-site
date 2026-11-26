---
title: "Chimera Agent 0.92.0 : reçus de coûts, contrôle du planificateur et recherche dans les paramètres"
date: 2026-11-26
category: update
summary: "Les reçus de coûts utilisent désormais l'index public des prix d'OpenRouter pour les exécutions hors de `serve`. Le planificateur est configurable par lane, et la recherche des paramètres de Desktop trouve la table de routage."
version: "0.92.0"
---

## Ce qui change pour le suivi des coûts

Avant la 0.92.0, les reçus de coûts pour les exécutions hors de `serve` reposaient sur un catalogue interne statique. Si un slug de modèle ne correspondait pas exactement, le reçu affichait un zéro ou un taux de repli qui ne reflétait pas le coût réel de l'appel. L'entrée `gpt-oss-20b` était obsolète, et les appels à admission stricte perdaient le devis avec lequel ils avaient été admis, ce qui rendait impossible d'auditer pourquoi une exécution donnée avait coûté ce qu'elle avait coûté.

Cette version bascule ces exécutions vers l'index public des prix d'OpenRouter. Les slugs de modèles exacts récupèrent désormais leurs propres taux directement depuis cet index. Lorsqu'un appel strict est admis, le reçu conserve le devis utilisé au moment de l'admission au lieu de le recalculer plus tard. L'entrée du catalogue `gpt-oss-20b` a été actualisée pour correspondre à la tarification actuelle. Ensemble, ces changements font que le nombre que vous voyez dans le reçu est le montant réellement facturé, pas une approximation issue d'une table de correspondance périmée.

## Le contrôle du planificateur se déplace là où vous configurez le travail

Le planificateur était toujours actif, et il n'existait aucun interrupteur pour le désactiver sur une lane spécifique, une exécution d'API ou une étape de résolution de workflow. Si vous vouliez qu'une lane s'exécute sans phase de planification, vous deviez contourner le framework. Ce contournement cassait quand la valeur par défaut changeait ou quand un workflow réutilisait la définition de la lane.

Désormais, `use_planner` est un paramètre sur les lanes Kanban, les exécutions d'API et les étapes de résolution de workflow. Le planificateur reste actif par défaut, donc les configurations existantes ne changent pas de comportement. Définir `use_planner: false` sur une lane saute la phase de planification pour cette lane uniquement. Le même paramètre sur une exécution d'API ou une étape de résolution remplace la valeur par défaut de la lane pour cette exécution. Cela place la décision à côté de la définition du travail, là où elle doit être, plutôt que dans un flag global ou une variable d'environnement.

## Des paramètres Desktop réellement trouvables

La table de routage par rôle de modèle existait avant cette version, mais la recherche des paramètres ne l'indexait pas. Il fallait savoir où elle se trouvait et y naviguer manuellement. En portugais brésilien, les libellés de routage et le texte des reçus s'affichaient incorrectement, et les nouvelles conversations montraient un statut qui ne permettait pas de comprendre ce qui se passait.

La recherche des paramètres trouve désormais la table de routage. Vous pouvez taper un nom de rôle et accéder directement à l'affectation. Le texte de routage et des reçus s'affiche correctement en portugais brésilien. Les nouvelles conversations et les tours en mode réponse seule affichent un statut plus clair, pour que vous sachiez si le modèle charge, réfléchit ou attend une entrée.

## Des expérimentations qui n'ont pas changé les valeurs par défaut

Trois expérimentations sont arrivées dans cette version, et aucune ne change le comportement par défaut. Le benchmark d'extraction de mémoire n'a pas été concluant ; la limite de 6 000 caractères et le modèle global restent les valeurs par défaut, avec un modèle d'extraction explicite et un pré-filtre déterministe disponibles en opt-in. L'expérimentation sur le tier de modèle cron a montré une exactitude totale sur sept des huit tâches synthétiques, mais les tâches synthétiques ne sont pas des tâches de production, et les valeurs par défaut restent inchangées. Les expérimentations de raffinement lean du Design et de proportionnalité des prompts restent désactivées par défaut.

Ces expérimentations sont documentées dans les notes de version pour les équipes qui veulent les tester sur leurs propres charges de travail. Ne les activez pas en production sans mesurer par rapport à vos propres données.

## Que faire maintenant

Mettez à niveau avec `pip install chimera-agent==0.92.0`. Si vous exécutez des charges avec suivi des coûts hors de `serve`, vérifiez vos reçus après la mise à niveau — les montants refléteront l'index public d'OpenRouter. Si vous avez des lanes qui devraient sauter la planification, ajoutez `use_planner: false` à la définition de la lane. Les utilisateurs Desktop sur macOS et Windows doivent noter que les installateurs ne sont pas signés et peuvent demander une confirmation au premier lancement ; l'application vérifie les signatures des bundles de mise à jour après cela. Les notes de version complètes sont disponibles sur [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
