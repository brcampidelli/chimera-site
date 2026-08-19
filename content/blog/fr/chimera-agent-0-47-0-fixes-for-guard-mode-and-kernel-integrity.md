---
title: "Chimera Agent 0.47.0 : Corrections pour le mode Guard et l'intégrité du Kernel"
date: 2026-08-19
category: update
summary: "Correctifs critiques pour la fiabilité du mode Guard, la précision des règles et la visibilité du kernel dans les déploiements gouvernés."
version: "0.47.0"
---

## Le mode Guard signale désormais correctement les refus

Un portail refusant un appel d'outil renvoyait auparavant une chaîne d'observation ne commençant pas par `error:`, ce qui faisait enregistrer l'action comme réussie. Cela affectait trois surfaces : le cadre desktop, les logs d'étapes et la détection de dérive. Une exécution où chaque action dangereuse était bloquée apparaissait comme réussie dans toutes les données structurées, avec même le modèle rapportant des actions terminées comme des force pushes qui n'ont jamais eu lieu. Le kernel marque désormais correctement les refus, et le texte de refus identifie quel guard a pris la décision.

## Correction du matching des règles pour les scripts multi-lignes

Le moteur de règles interpolait auparavant le texte des scripts avec `repr`, ce qui échappait les sauts de ligne en deux caractères. Cela brisait les limites de mots dans les motifs de règles, causant deux problèmes :

1. Des scripts simples d'une ligne pouvaient contourner les protections car le `\n` fusionnait avec le mot suivant
2. Les documents Markdown citant des commandes dangereuses étaient incorrectement bloqués

Deux règles ne se déclenchaient jamais à cause de ce problème. Le texte est maintenant passé aux règles sans échappement, correspondant au comportement réel des scripts.

## Le système d'audit ne stocke plus les secrets

Une opération gouvernée `write_file` stockait auparavant l'intégralité du contenu du fichier dans `audit.jsonl`, y compris des données sensibles comme les fichiers `.env` ou les clés privées. Cela se produisait même lorsqu'un autre guard avait déjà bloqué l'opération. L'audit masque désormais le contenu sensible (en utilisant un réducteur existant auparavant réservé aux traces d'étapes) et enregistre les arguments en forme de document comme métadonnées de taille uniquement.

## Visibilité du kernel ajoutée aux endpoints HTTP

Les verdicts du kernel de confiance n'étaient pas inclus dans les réponses HTTP pour les endpoints run, batch et turn. Cela signifiait que des décisions critiques comme les approbations de force push n'étaient pas visibles par les clients. Le kernel est maintenant correctement installé sur les surfaces HTTP lorsque `CHIMERA_GOVERNANCE` est en `observe` ou `enforce`. Notez que les déploiements HTTP ne demandent jamais confirmation sur le terminal du serveur - la personne à cette console n'a pas fait la demande.

## Autres correctifs

- Les chaînes d'audit ne signalent plus de falsification due à des écritures concurrentes
- Le mode `observe` compte désormais correctement les refus qu'il devait seulement mesurer
- Les workers bloqués ne retiennent plus indéfiniment des lots entiers
- Les limites de ressources des conteneurs peuvent maintenant être configurées
- Contrôles de budget de contexte ajoutés à l'usage terminal

## Limitations connues

L'équipe a explicitement documenté trois lacunes actuelles plutôt que de les laisser être découvertes :

1. Les rapports `observe` ne sont pas encore visibles dans les interfaces HTTP
2. L'API manque d'un chemin d'approbation en mode `enforce`
3. Quatre endpoints HTTP n'incluent toujours pas les verdicts du kernel

Mettez à jour avec `pip install --upgrade chimera-agent` ou consultez [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) pour les notes de version détaillées.
