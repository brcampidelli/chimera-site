---
title: Un générateur qui a silencieusement perdu la moitié de la CLI
date: 2026-08-09
category: terminal
summary: La référence des commandes de ce site est générée automatiquement. La première version du générateur a produit un fichier JSON propre, trié, entièrement convaincant, avec 53 sous-commandes manquantes — et n'a levé aucune erreur.
---

La CLI de Chimera compte 109 invocations : 56 commandes racines plus 53 sous-commandes réparties sur
11 groupes. La documentation couvre le chemin heureux d'une dix-septaine d'entre elles, rédigée par
un humain — ce qui est la bonne façon d'écrire un guide de démarrage et la mauvaise façon de
maintenir une référence exhaustive. Une liste de flags recopiée à la main n'est correcte qu'une seule
fois : le jour où elle a été tapée.

C'est pourquoi la référence de ce site est générée à partir de la CLI elle-même, de la même manière
que les types TypeScript de l'application de bureau sont générés à partir du schéma de l'API, avec la
même barrière anti-dérive en CI : régénérer, et échouer si la copie commitée diffère.

## Le bug

La première version parcourait l'arbre de commandes ainsi :

```python
root = typer.main.get_command(cli_app)
if not isinstance(root, click.Group):
    raise TypeError("the Chimera CLI is expected to be a command group")
```

Cette vérification échouait. Pas le parcours — la vérification. `typer.main.get_command()` renvoyait
un objet qui n'était pas une instance du `click.Group` installé, parce que Typer 0.27 embarque sa
propre copie de Click sous `typer._click`. `TyperGroup` hérite de `typer._click.core.Command`, et le
`click` que votre propre code importe est un tout autre objet de classe.

Lever une exception a été un coup de chance. La version précédente faisait à la place la chose
évidente — traiter tout ce qui n'est pas un `click.Group` comme une commande feuille — et celle-là ne
levait rien. Elle produisait un fichier JSON bien formé, trié, déterministe, décrivant 56 commandes,
chaque groupe étant aplati en une seule entrée et les 53 sous-commandes ayant disparu.

## Pourquoi c'est le pire échec possible

Un générateur qui plante vous dit qu'il a échoué. Un générateur qui produit une sortie plausible ne
vous dit rien, et tout ce qui en dépend hérite de ce silence. La page de référence se serait affichée
parfaitement. `chimera kanban` aurait été listé avec son texte d'aide et sans sous-commandes, ce qui
se lit exactement comme une commande qui n'a pas de sous-commandes. La recherche l'aurait indexé.
Personne, en regardant la page, n'aurait pu détecter l'absence, parce que l'absence ressemble
exactement à ce à quoi ressemble aussi une page complète.

L'échec a été détecté en comptant, pas en regardant : la référence devait afficher 109 invocations, et
elle en affichait 56.

## Le correctif, et le test qui lui survit

L'extracteur utilise désormais le duck typing — il demande si un objet possède un mapping `commands`,
plutôt que de quelle classe il relève. Cela survit à un Click embarqué, à une mise à jour de Typer et
à un changement de version majeure de Click, parce que « avoir des sous-commandes » est une propriété
de la chose elle-même, tandis que « être un `click.Group` » est une propriété du graphe d'imports.

Plus utile que le correctif, la forme du test. L'assertion évidente est que l'extraction a réussi :

```python
def test_dump_works():
    assert build()  # passes with 53 subcommands missing
```

L'assertion qui détecte cet échec porte sur ce qui a été trouvé :

```python
def test_finds_the_groups_and_not_just_the_leaves():
    groups = [c for c in build()["commands"] if "commands" in c]
    assert len(groups) >= 10
```

Tout test qui se contente d'affirmer qu'un générateur s'est exécuté est un test qui passe alors même
que le générateur se trompe. Celui qui mérite d'être écrit affirme ce qu'il était censé trouver.

## Où regarder

- L'extracteur et ses tests :
  [`chimera/cli/schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/chimera/cli/schema_dump.py)
  et
  [`tests/test_cli_schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/tests/test_cli_schema_dump.py)
- Le Click embarqué par Typer, si vous voulez vérifier le mécanisme par vous-même :
  [`typer/_click`](https://github.com/fastapi/typer)
