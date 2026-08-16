---
title: "Chimera Agent 0.44.0 : L'application desktop devient un éditeur de code"
date: 2026-08-16
category: update
summary: "L'application desktop de Chimera évolue d'une console d'agents vers un éditeur de code complet, avec diagnostics, complétions inline, recherche et intégration d'agents externes."
version: "0.44.0"
---

## De la console à l'éditeur de code

L'application desktop de Chimera Agent a radicalement changé dans la version 0.44.0. Ce qui était principalement une console pour interagir avec les agents est désormais un environnement complet d'édition de code. Ce changement reflète la manière dont les utilisateurs travaillent réellement avec les agents IA - pas seulement en discutant avec eux, mais en collaborant sur du code.

Sept fonctionnalités clés arrivent ensemble dans cette version. L'éditeur accessible via `#/edit` utilise CodeMirror avec des onglets fonctionnels, un historique d'annulation par fichier, et des avertissements lorsqu'un agent tente de modifier un fichier non sauvegardé sur lequel vous travaillez. Les diagnostics proviennent désormais de `ruff server`, garantissant que les avertissements affichés correspondent à ce qui échouerait en CI. L'éditeur propose des complétions inline à partir d'un modèle local, affichant un texte gris en prévisualisation que vous pouvez accepter avec Tab ou rejeter avec Escape.

## Améliorations pratiques

La recherche fonctionne désormais sur l'ensemble de votre espace de travail, utilisant ripgrep lorsqu'il est disponible. Vous pouvez voir l'utilisation des ressources système (CPU, mémoire, VRAM GPU) et effectuer des recherches dans votre dépôt avec des benchmarks pré-enregistrés. Le lanceur de commandes conserve l'historique par projet entre les rechargements, avec une terminaison correcte de l'arborescence des processus lorsque vous l'arrêtez ou le fermez.

Peut-être plus significatif encore, vous pouvez désormais confier des tâches de codage à des agents externes comme Claude Code ou Gemini CLI. Ces derniers s'intègrent via ACP et subissent le même processus de vérification et de snapshot/revert que les tours natifs. L'application indique clairement lorsque les agents externes opèrent sous des limites de sécurité différentes - ils peuvent ignorer les garde-fous d'écriture de fichiers de Chimera, bien que le checkpoint/revert reste disponible comme filet de sécurité.

## Pour commencer

La configuration reste simple. Seule une clé de fournisseur est requise pour démarrer, avec des capacités optionnelles clairement indiquées. Pour les diagnostics de l'éditeur, assurez-vous que `ruff` est installé. Les complétions inline nécessitent Ollama avec le modèle spécifique `qwen2.5-coder:1.5b-base` (notez le tag base - les modèles instruct ne fonctionneront pas correctement pour cela). Les agents externes nécessitent leurs outils CLI respectifs.

La version inclut des mises en garde honnêtes : les installateurs non signés déclencheront des avertissements de sécurité, les agents externes ont des limites de sécurité différentes, et la recherche n'est pas encore intégrée dans le flux principal de l'agent. Le lanceur de commandes n'est pas un terminal complet - chaque commande s'exécute dans un nouveau processus, donc des états comme `cd` ou `export` ne persistent pas.

Pour plus de détails, y compris deux bugs découverts dans des scénarios non testés, consultez le [CHANGELOG][Chimera Agent v0.44.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.44.0). Pour l'essayer vous-même, mettez à jour votre installation de Chimera Agent et explorez le nouvel éditeur à `#/edit`.
