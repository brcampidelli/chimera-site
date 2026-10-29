---
title: "Les créateurs d'agents possèdent désormais la surface"
date: 2026-10-29
category: analysis
summary: "Les nouvelles plateformes de développement de Google montrent que les créateurs d'agents, et non les propriétaires d'applications, deviennent l'interface principale vers les utilisateurs et les outils."
sources:
  - headline: "Como criar um agente de IA com Python, LangChain e ferramentas | IA Expert Academy"
    url: https://iaexpert.academy/2026/10/28/como-criar-um-agente-de-ia-com-python-langchain-e-ferramentas/
    outlet: "IA Expert Academy"
    published: 2026-10-28
  - headline: "As AI agents reshape the web, Google opens Gemini and Search to more apps"
    url: https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/
    outlet: "TechCrunch"
    published: 2026-10-28
  - headline: "Google opens Android development to third-party AI agents and unveils new Gemini APIs"
    url: https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/
    outlet: "The Decoder"
    published: 2026-10-28
dropped: "87 matérias examinadas de 585 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (2), publicado há 149h (1), publicado há 198h (1), publicado há 200h (1), publicado há 384h (1), publicado há 675h (1)"
---

La surface d'exposition du logiciel est en train de changer. Pendant des années, l'interface était l'application : un écran, un bouton, un formulaire. Désormais, l'interface est de plus en plus l'agent — et celui qui contrôle l'agent contrôle ce que l'utilisateur peut faire. Deux annonces de Google cette semaine rendent ce changement concret, et non plus spéculatif.

Google ouvre Gemini et Search à des services tiers via une nouvelle plateforme de développement, permettant aux entreprises d'intégrer leurs offres directement dans les expériences d'IA de Google [[2]](https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/). Dans le même temps, Android Studio se dote d'une fonctionnalité « Bring Your Own Agent » qui prend en charge plus de 40 agents de codage, dont Claude Agent d'Anthropic et Codex d'OpenAI [[3]](https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/). Le schéma est le même dans les deux cas : Google ne construit pas l'agent à votre place. Il construit l'endroit où votre agent s'exécute et la surface où votre agent apparaît.

## L'agent est le nouveau point d'entrée

Pour tous ceux qui construisent des agents, cela change la question de la distribution. Vous n'avez plus besoin de convaincre un utilisateur d'installer votre application ou de visiter votre site. Vous devez convaincre un agent — ou la plateforme qui héberge cet agent — que votre service est le bon outil pour la tâche. C'est un type de problème d'ingénierie différent. Il s'agit de découvrabilité, de descriptions d'outils et d'exécution fiable, pas de parcours d'intégration ou de notifications push.

Le mouvement d'Android Studio est plus spécifique mais tout aussi révélateur. Google ne pousse pas un seul agent de codage first-party. Il ouvre l'IDE à n'importe quel agent que le développeur souhaite utiliser. Les outils de terminal mentionnés par Google sont conçus pour aider les agents à terminer les tâches d'interface plus rapidement et avec moins de tokens [[3]](https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/). C'est une reconnaissance que la performance des agents est désormais une préoccupation de plateforme. Le rôle de la plateforme est de rendre les agents plus efficaces, pas de les remplacer.

## La conception des outils devient le vrai travail

Le tutoriel de l'IA Expert Academy, bien que plus basique, va dans le même sens. Il montre comment construire un agent qui utilise des outils, consulte les prix, calcule des remises et combine des fonctions pour accomplir une tâche [[1]](https://iaexpert.academy/2026/10/28/como-criar-um-agente-de-ia-com-python-langchain-e-ferramentas/). La partie intéressante n'est pas le code LangChain. C'est la structure : l'agent n'est aussi bon que les outils qu'il peut appeler et l'ordre dans lequel il les appelle. C'est là que réside désormais le vrai travail d'ingénierie.

Lorsque Google ouvre Search à des services externes, la même logique s'applique à l'échelle du web. Une entreprise qui veut être trouvée par un agent doit décrire son service d'une manière qu'un agent peut analyser, évaluer et exploiter. C'est un nouveau type de conception d'API. Il ne suffit pas d'exposer un endpoint. Il faut exposer l'intention, les contraintes et les modes d'échec d'une manière qu'un agent peut raisonner.

## Ce que cela signifie pour les créateurs

La leçon pratique est simple : arrêtez de considérer les agents comme une fonctionnalité à l'intérieur de votre produit. Commencez à considérer votre produit comme un outil à l'intérieur de l'agent de quelqu'un d'autre. Cela signifie investir dans des descriptions d'outils claires, des sorties prévisibles et des actions petites et composables. Cela signifie tester votre service avec plusieurs agents, pas seulement le vôtre. Et cela signifie traiter l'écosystème des agents comme un canal de distribution, avec tout le travail de découvrabilité et de fiabilité que cela implique.

Les plateformes n'attendent pas. Elles construisent les rails dès maintenant. Les créateurs qui comprennent que leur véritable utilisateur est souvent un autre logiciel seront ceux dont les outils seront appelés.
