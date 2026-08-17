---
title: "Chimera Agent 0.46.0 : Des règles qui s'appliquent à côté"
date: 2026-08-17
category: update
summary: "Correction de la perte silencieuse de données, des cartes de compétences non traduites et des contrôles qui ne contrôlaient pas — plus une bibliothèque de 23 cartes de compétences dérivées d'incidents."
version: "0.46.0"
---

## Quand les règles ne s'appliquent pas

Cinq magasins JSON, y compris le magasin de compétences, permettaient auparavant à des processus concurrents de se remplacer silencieusement les données. Une exécution qui avait appris quelque chose pouvait voir sa mémoire effacée par la suivante. Les cinq verrouillent et écrivent maintenant de manière atomique — aucune configuration nécessaire. Le même schéma a corrigé des fonctionnalités de gouvernance qui plantaient à l'importation et un bot Discord qui fonctionnait sans vérifications.

## Des cartes de compétences comme rapports d'incidents

Vingt-trois cartes résident désormais dans `skills/`, treize écrites à partir des défauts propres à ce projet. Chacune documente un mode de défaillance dans le format Déclencheur/Faire/Éviter/Vérifier/Risque — des données, pas du code. Elles sont regroupées par phase de workflow (`define · build · verify · review · ship`) et étiquetées par sujet. Importez-en une avec :

```
chimera skills-import skills/verify-before-claiming
```

Les cartes prennent en charge neuf langues via des fichiers annexes qui préservent le hachage SHA-256 original. Le système détecte les traductions obsolètes (prétendant traduire un texte qui a changé) et incomplètes (sections manquantes), mais autorise les traductions manquantes avec un étiquetage clair.

## Des contrôles qui contrôlent vraiment

Trois défauts d'agent ont compromis des composants critiques sans faire échouer les tests. La cause racine : les vérifications listaient les comportements requis au lieu des exemptions autorisées. Quand de nouveaux comportements apparaissaient, les contrôles restaient ouverts. Maintenant, ils listent les exemptions — si quelque chose n'est pas explicitement autorisé à contourner les vérifications, il est vérifié.

Seize affirmations de documentation ont été corrigées dans dix langues. Cinq étaient carrément fausses : les modes de gouvernance n'incluent pas `ask`, le rail desktop n'a pas de destination de chat, et `CHIMERA_TAVILY_API_KEY` n'existe pas dans le codebase. Deux affirmations optimistes portent désormais leurs preuves infirmantes à côté.

```
pip install -U chimera-agent
```

Parcourez les cartes sur chimeraagent.space/skills [Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0) ou consultez `bench/skillcard/RESULTS.md` pour le compromis de performance optionnel.
