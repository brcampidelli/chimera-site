---
title: Um gerador que perdeu metade da CLI silenciosamente
date: 2026-08-09
category: terminal
summary: A referência de comandos deste site é gerada automaticamente. A primeira versão do gerador produzia um arquivo JSON limpo, ordenado e inteiramente convincente, com 53 subcomandos faltando — e não dava erro nenhum.
---

A CLI do Chimera tem 109 invocações: 56 comandos raiz mais 53 subcomandos distribuídos em 11
grupos. A documentação cobre o caminho feliz de uns dezessete deles, escrita por uma pessoa, que é
a maneira certa de escrever um guia de início rápido e a maneira errada de manter uma referência
exaustiva. Uma lista de flags copiada à mão está correta exatamente uma vez: no dia em que foi
digitada.

Por isso a referência deste site é gerada a partir da própria CLI, do mesmo jeito que os tipos
TypeScript do app desktop são gerados a partir do schema da API, com o mesmo gate de desvio no CI:
regenerar, e falhar se a cópia commitada for diferente.

## O bug

A primeira versão percorria a árvore de comandos assim:

```python
root = typer.main.get_command(cli_app)
if not isinstance(root, click.Group):
    raise TypeError("the Chimera CLI is expected to be a command group")
```

Essa checagem falhou. Não o percurso — a checagem. `typer.main.get_command()` retornava um objeto
que não era instância do `click.Group` instalado, porque o Typer 0.27 vendoriza sua própria cópia
do Click sob `typer._click`. `TyperGroup` herda de `typer._click.core.Command`, e o `click` que o
seu próprio código importa é um objeto de classe inteiramente diferente.

Ter lançado exceção foi sorte. A versão anterior fazia a coisa óbvia em vez disso — tratar qualquer
coisa que não fosse um `click.Group` como um comando folha — e essa não lançava nada. Ela produzia
um arquivo JSON bem formado, ordenado e determinístico descrevendo 56 comandos, com cada grupo
achatado em uma única entrada e os 53 subcomandos todos sumidos.

## Por que essa é a pior falha possível

Um gerador que trava te avisa que falhou. Um gerador que produz uma saída plausível não te avisa
nada, e tudo que vem depois herda esse silêncio. A página de referência teria renderizado
perfeitamente. `chimera kanban` teria sido listado com seu texto de ajuda e sem subcomandos, o que
tem exatamente a cara de um comando que não tem subcomandos. A busca teria indexado isso. Ninguém
olhando para a página conseguiria detectar a ausência, porque ausência é exatamente a cara que uma
página completa também tem.

A falha foi pega contando, não olhando: a referência deveria mostrar 109 invocações e mostrava 56.

## O conserto, e o teste que sobrevive a ele

O dumper agora usa duck typing — ele pergunta se um objeto tem um mapeamento `commands` em vez de
perguntar de que classe ele é. Isso sobrevive a um Click vendorizado, a um upgrade do Typer e a uma
mudança de versão major do Click, porque "tem subcomandos" é uma propriedade da coisa em si, e "é
um `click.Group`" é uma propriedade do grafo de import.

Mais útil que o conserto é o formato do teste. A asserção óbvia é que o dump teve sucesso:

```python
def test_dump_works():
    assert build()  # passes with 53 subcommands missing
```

A asserção que pega essa falha é sobre o que foi encontrado:

```python
def test_finds_the_groups_and_not_just_the_leaves():
    groups = [c for c in build()["commands"] if "commands" in c]
    assert len(groups) >= 10
```

Qualquer teste que só afirma que um gerador rodou é um teste que passa enquanto o gerador está
errado. O que vale a pena escrever afirma o que ele deveria ter encontrado.

## Onde olhar

- O dumper e seus testes:
  [`chimera/cli/schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/chimera/cli/schema_dump.py)
  e
  [`tests/test_cli_schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/tests/test_cli_schema_dump.py)
- O Click vendorizado do Typer, se você quiser confirmar o mecanismo você mesmo:
  [`typer/_click`](https://github.com/fastapi/typer)
