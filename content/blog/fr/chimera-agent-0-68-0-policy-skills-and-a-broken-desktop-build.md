---
title: "Chimera Agent 0.68.0 : politique, compétences et une version desktop cassée"
date: 2026-10-17
category: update
summary: "0.68.0 ajoute une politique de refus au niveau du propriétaire, la découverte locale de compétences, des commandes de prompt de projet, et bien plus — mais n'installez pas l'application desktop ; utilisez la v0.67.4 jusqu'à la 0.68.1."
version: "0.68.0"
---

Le titre de la version 0.68.0 n'est pas une fonctionnalité. C'est un avertissement : **n'installez pas cette version.** Le backend de l'application desktop ne démarre pas car le gel PyInstaller a omis `chimera.cli.commands.apilogs`, que la CLI importe par son nom. Le paquet PyPI n'est pas affecté. Si vous utilisez l'application desktop, restez sur la v0.67.4 jusqu'à la sortie de la v0.68.1. Le reste de cet article couvre ce qui a réellement changé pour les personnes qui construisent des agents.

## La politique du propriétaire passe des blocages par outil à des règles de refus uniquement

Avant cette version, restreindre ce qu'un agent pouvait toucher signifiait combiner des variables d'environnement comme `CHIMERA_TOOL_DENYLIST` avec des règles par projet. Cela fonctionnait pour des outils individuels, mais ne donnait pas au propriétaire d'une installation un endroit unique pour dire « ce fournisseur ne s'exécute jamais ici » ou « ce serveur MCP ne se connecte jamais ».

0.68.0 ajoute `<CHIMERA_HOME>/policy.json` — ou le fichier désigné par `CHIMERA_POLICY_FILE`. Les règles sont uniquement de refus et ordonnées. Vous pouvez refuser un fournisseur, une intégration (`mcp:<nom>`, `skill:<nom>`) ou un outil. Un fournisseur refusé disparaît des listes de modèles et de l'échelle de niveaux, et ses appels sont refusés. Un serveur MCP refusé ne se connecte jamais. Une compétence refusée n'est jamais chargée. Un outil refusé est refusé au niveau du registre.

La règle d'or compte : une `allow` ultérieure ne fait qu'annuler une `deny` antérieure dans le même fichier. Elle ne rouvre jamais `CHIMERA_TOOL_DENYLIST`, le plancher de portée ou un blocage du noyau. Un fichier de politique invalide arrête `serve`, `chat`, `assist`, `tui` et `acp`, et fait échouer `doctor`. L'application desktop démarre mais refuse tous les outils jusqu'à ce que le fichier soit corrigé. Les outils d'écriture de l'agent ne peuvent pas écrire le fichier de politique.

C'est un modèle différent des règles par projet. C'est au niveau du propriétaire, à l'échelle de l'installation, et il ne peut pas être contourné par un prompt astucieux ou un fichier de projet. Pour quiconque gère une machine partagée ou une flotte d'agents, c'est le changement qui compte.

## Compétences, commandes de prompt et questions bornées

Les compétences d'agent locales sont désormais découvertes sous forme de bundles révisables. Les compétences trouvées dans les arborescences `.claude/skills` et `.agents/skills` de l'espace de travail et de l'utilisateur sont importées via le chemin de téléversement borné. Elles restent en attente et contaminées jusqu'à approbation, et reviennent en attente lorsque leur manifeste change. L'API rapporte la source gagnante et les collisions. Cela signifie qu'une compétence n'est pas silencieusement approuvée simplement parce qu'elle se trouve dans un dossier.

Les commandes de prompt Markdown de projet et globales fonctionnent de la même manière. Le chat terminal et la TUI découvrent des modèles avec espaces de noms dans `.chimera/commands/` et `<CHIMERA_HOME>/commands/`. Les modèles développent `$ARGUMENTS` et `$1` en texte de message ordinaire. Le contenu du modèle n'est jamais exécuté. Cela donne aux projets un moyen de fournir des prompts répétables sans accorder au modèle un quelconque pouvoir d'exécution.

L'agent Code peut désormais poser une question bornée à l'utilisateur. `ask_user` met en pause un tour de Code assisté pour une option ou une réponse en texte libre, renvoie un résultat explicite de non-réponse en cas de délai dépassé, et reste un type distinct uniquement de données qui ne peut pas approuver une action gouvernée. Les tours en terminal, en bot et sans surveillance ne l'enregistrent pas. Cela comble une lacune : auparavant, un tour de Code qui nécessitait une décision de l'utilisateur n'avait aucun moyen structuré de s'arrêter et de demander.

## Que faire maintenant

Si vous utilisez l'application desktop, ne mettez pas à niveau. Restez sur la v0.67.4. Si vous utilisez le paquet PyPI, vous pouvez installer la 0.68.0 et commencer avec le fichier de politique : créez `<CHIMERA_HOME>/policy.json`, écrivez vos règles de refus et exécutez `chimera policy show` pour voir les règles en vigueur. Les notes de version complètes sont disponibles sur [Chimera Agent v0.68.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.68.0).
