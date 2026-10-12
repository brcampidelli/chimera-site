---
title: "Chimera Agent 0.65.0 : appairage, délais et garanties de sandbox"
date: 2026-10-12
category: update
summary: "Les bots s'appairent désormais de manière sécurisée au premier démarrage, le repli du sandbox disparaît, les tours ont des délais et les modèles Ollama lisent l'intégralité du prompt."
version: "0.65.0"
---

## Le premier démarrage apparie le bot, pas le salon

Avant cette version, l'application desktop demandait « est-ce une nouvelle installation ? » sur la carte Messaging lorsque le dossier de données était déjà rempli. Cela signifiait que chaque bot lancé par l'application tournait en mode ouvert — répondant à quiconque le contactait, avec les outils et les dépenses du propriétaire. Un code d'appairage, s'il était généré, finissait dans une console que personne ne lit.

L'application enregistre désormais quels bots étaient déjà configurés au démarrage. Ces bots continuent de répondre comme avant. Un bot configuré après ce point démarre par un appairage, et son code apparaît sur la carte Messaging, là où quelqu'un regarde vraiment. L'API reflète cela : `GET /api/messaging` renvoie les états `pairing_code`, `pairing` et `open`. Le pont desktop voit `pairing` mais jamais le code lui-même, donc l'automatisation ne peut pas contourner l'étape humaine.

## Un sandbox qui ne peut pas s'exécuter refuse de s'exécuter

Définir `CHIMERA_SANDBOX=docker` sans démon Docker faisait auparavant basculer vers l'hôte avec une seule ligne de log. Une commande qui aurait dû être isolée s'exécutait directement sur la machine. Ce repli a disparu. Désormais, `run_shell`, `execute_code` et les étapes de workflow refusent avant même de poser la question de l'exécution sur l'hôte. Le message de refus indique ce qui s'est passé, que rien n'a été exécuté, et les deux issues possibles : démarrer Docker, ou définir `CHIMERA_SANDBOX=local`. Le vérificateur s'abstient plutôt que de revenir sur le travail parce qu'un démon était arrêté.

Un appelant qui passe explicitement `fallback=` conserve l'ancien comportement. Tous les autres obtiennent un arrêt ferme. La même limite s'applique aux médias entrants : les téléchargements Telegram et WhatsApp s'arrêtent désormais à la limite de 20 Mo avant le premier octet lorsque la taille est déclarée, au lieu de lire tout le fichier en mémoire et de mesurer ensuite.

## Les délais atteignent la bande de gouvernance

Une décision peut désormais porter un délai, et le manquer pousse la bande REVIEW vers un examen plus strict. `DecisionSpec.deadline_s` en déclare un par décision ; `Decider.decide(..., deadline_s=)` le remplace par appel. Une réponse qui n'arrive pas à temps s'arrête avec `deadline_missed` sur le reçu et dans le journal de décision, ce qui rend les manquements comptables.

Avec `CHIMERA_GOVERNANCE_BAND_DEADLINE_S` défini, un manquement produit une carte REVIEW avec `band: deadline` — jamais ALLOW. Une réponse tardive n'est jamais mise en cache ni appliquée après coup. C'est désactivé par défaut, et le nouveau panneau Settings › General › Governance and audit l'expose aux côtés de cinq autres contrôles optionnels qui n'étaient auparavant accessibles que via `.env` ou pouvaient être enregistrés mais pas relus. `GET /api/config` les renvoie dans un bloc `governance_audit`. Effacer le délai ne laisse plus une application incapable de démarrer : une valeur vide est désormais lue comme absence de délai.

## Les modèles Ollama lisent tout le prompt

Les appels vers les modèles `ollama_chat/` ou `ollama/` ne précisaient jamais de fenêtre de contexte, donc Ollama utilisait sa valeur par défaut machine — 4 096 tokens dans le cas qui a révélé ce problème. Tout prompt plus long était tronqué à environ la moitié de cette taille, en silence. La première requête d'une exécution `chimera solve`, environ 20 500 caractères, était lue comme 2 050 tokens, et le modèle ne voyait jamais la tâche.

Chaque chemin de passerelle envoie désormais `num_ctx` uniquement vers les routes Ollama, tiré de `CHIMERA_OLLAMA_NUM_CTX` (par défaut 32 768 ; définir à `0` pour conserver la valeur par défaut du serveur). Le budget de compaction d'un modèle Ollama est dimensionné à partir de cette fenêtre au lieu du repli de 128 000 tokens. Une réponse dont le nombre de tokens du prompt montre une troncature journalise un avertissement `PROMPT TRUNCATED` au lieu de passer en silence. Les fournisseurs hébergés sont inchangés.

## Que faire maintenant

Mettez à niveau avec `pip install chimera-agent==0.65.0`. Si vous utilisez l'application desktop, redémarrez-la et vérifiez la carte Messaging pour tout bot nécessitant un appairage. Si vous utilisez `CHIMERA_SANDBOX=docker`, vérifiez que le démon tourne ou passez à `local`. Si vous appelez des modèles Ollama, définissez `CHIMERA_OLLAMA_NUM_CTX` pour correspondre à la fenêtre de votre modèle. Les notes de version complètes sont sur [Chimera Agent v0.65.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.65.0).
