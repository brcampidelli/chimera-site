---
title: Un generador que perdió silenciosamente la mitad de la CLI
date: 2026-08-09
category: terminal
summary: La referencia de comandos de este sitio se genera automáticamente. La primera versión del generador produjo un archivo JSON limpio, ordenado y completamente convincente, con 53 subcomandos faltantes — y no arrojó ningún error.
---

La CLI de Chimera tiene 109 invocaciones: 56 comandos raíz más 53 subcomandos repartidos en 11
grupos. La documentación cubre el camino feliz de unos diecisiete de ellos, escrita por una persona,
que es la manera correcta de escribir una guía de inicio y la manera equivocada de mantener una
referencia exhaustiva. Una lista de flags copiada a mano es correcta exactamente una vez: el día en
que se escribió.

Por eso la referencia de este sitio se genera a partir de la propia CLI, de la misma manera en que
los tipos de TypeScript de la app de escritorio se generan a partir del esquema de la API, con la
misma compuerta de desvío en CI: regenerar, y fallar si la copia confirmada difiere.

## El bug

La primera versión recorría el árbol de comandos así:

```python
root = typer.main.get_command(cli_app)
if not isinstance(root, click.Group):
    raise TypeError("the Chimera CLI is expected to be a command group")
```

Esa comprobación falló. No el recorrido — la comprobación. `typer.main.get_command()` devolvía un
objeto que no era una instancia del `click.Group` instalado, porque Typer 0.27 empaqueta su propia
copia de Click bajo `typer._click`. `TyperGroup` hereda de `typer._click.core.Command`, y el `click`
que importa tu propio código es un objeto de clase completamente distinto.

Que lanzara una excepción fue pura suerte. La versión anterior hacía en cambio lo obvio: tratar
cualquier cosa que no fuera un `click.Group` como un comando hoja, y esa no lanzaba nada. Producía
un archivo JSON bien formado, ordenado y determinista que describía 56 comandos, con cada grupo
aplanado a una sola entrada y los 53 subcomandos desaparecidos.

## Por qué es el peor fallo posible

Un generador que se cae te dice que falló. Un generador que produce una salida plausible no te dice
nada, y todo lo que viene después hereda ese silencio. La página de referencia se habría renderizado
perfectamente. `chimera kanban` habría aparecido listado con su texto de ayuda y sin subcomandos, lo
cual se lee exactamente igual que un comando que no tiene subcomandos. La búsqueda lo habría
indexado. Nadie que mirara la página podría haber detectado la ausencia, porque la ausencia se ve
exactamente igual que una página completa.

El fallo se detectó contando, no mirando: la referencia debía mostrar 109 invocaciones y mostraba
56.

## La corrección, y la prueba que le sobrevive

El volcador ahora usa duck typing: pregunta si un objeto tiene un mapeo `commands` en lugar de
preguntar de qué clase es. Eso sobrevive a un Click empaquetado, a una actualización de Typer y a un
cambio de versión mayor de Click, porque "tiene subcomandos" es una propiedad de la cosa en sí, y
"es un `click.Group`" es una propiedad del grafo de importación.

Más útil que la corrección es la forma de la prueba. La aserción obvia es que el volcado tuvo éxito:

```python
def test_dump_works():
    assert build()  # passes with 53 subcommands missing
```

La aserción que detecta este fallo es sobre lo que se encontró:

```python
def test_finds_the_groups_and_not_just_the_leaves():
    groups = [c for c in build()["commands"] if "commands" in c]
    assert len(groups) >= 10
```

Cualquier prueba que se limite a afirmar que un generador se ejecutó es una prueba que pasa mientras
el generador está equivocado. La que vale la pena escribir afirma lo que se suponía que debía
encontrar.

## Dónde mirar

- El volcador y sus pruebas:
  [`chimera/cli/schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/chimera/cli/schema_dump.py)
  y
  [`tests/test_cli_schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/tests/test_cli_schema_dump.py)
- El Click empaquetado por Typer, si quieres confirmar el mecanismo tú mismo:
  [`typer/_click`](https://github.com/fastapi/typer)
