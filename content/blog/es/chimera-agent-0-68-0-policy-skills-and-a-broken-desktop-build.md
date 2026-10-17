---
title: "Chimera Agent 0.68.0: política, habilidades y una compilación de escritorio rota"
date: 2026-10-17
category: update
summary: "0.68.0 añade política de denegación a nivel de propietario, descubrimiento local de habilidades, comandos de prompt de proyecto y mucho más, pero no instales la aplicación de escritorio; usa v0.67.4 hasta que salga 0.68.1."
version: "0.68.0"
---

El titular de 0.68.0 no es una característica. Es una advertencia: **no instales esta versión.** El backend de la aplicación de escritorio no arranca porque el congelado de PyInstaller omitió `chimera.cli.commands.apilogs`, que la CLI importa por nombre. El paquete PyPI no se ve afectado. Si usas la aplicación de escritorio, quédate en v0.67.4 hasta que salga v0.68.1. El resto de esta publicación cubre lo que realmente cambió para quienes construyen agentes.

## La política de propietario pasa de bloques por herramienta a reglas solo de denegación

Antes de esta versión, restringir lo que un agente podía tocar significaba combinar variables de entorno como `CHIMERA_TOOL_DENYLIST` con reglas por proyecto. Eso funcionaba para herramientas individuales, pero no le daba al propietario de una instalación un único lugar para decir "este proveedor nunca se ejecuta aquí" o "este servidor MCP nunca se conecta".

0.68.0 añade `<CHIMERA_HOME>/policy.json` — o el archivo que indique `CHIMERA_POLICY_FILE`. Las reglas son solo de denegación y ordenadas. Puedes denegar un proveedor, una integración (`mcp:<nombre>`, `skill:<nombre>`) o una herramienta. Un proveedor denegado desaparece de las listas de modelos y de la escalera de niveles, y sus llamadas son rechazadas. Un servidor MCP denegado nunca se conecta. Una habilidad denegada nunca se carga. Una herramienta denegada es rechazada en el registro.

La regla de oro importa: un `allow` posterior solo deshace un `deny` anterior en el mismo archivo. Nunca reabre `CHIMERA_TOOL_DENYLIST`, el piso de alcance ni un bloqueo del kernel. Un archivo de política inválido detiene `serve`, `chat`, `assist`, `tui` y `acp`, y falla en `doctor`. La aplicación de escritorio arranca pero rechaza todas las herramientas hasta que se arregle el archivo. Las herramientas de escritura del agente no pueden escribir el archivo de política.

Este es un modelo diferente de las reglas por proyecto. Es a nivel de propietario, para toda la instalación, y no puede ser eludido por un prompt ingenioso o un archivo de proyecto. Para cualquiera que ejecute una máquina compartida o una flota de agentes, ese es el cambio que importa.

## Habilidades, comandos de prompt y preguntas acotadas

Las Habilidades de Agente Locales ahora se descubren como paquetes revisables. Las habilidades encontradas en los árboles `.claude/skills` y `.agents/skills` del espacio de trabajo y del usuario se importan a través de la ruta de carga acotada. Permanecen pendientes y contaminadas hasta que se aprueban, y vuelven a pendientes cuando su manifiesto cambia. La API informa la fuente ganadora y las colisiones. Eso significa que una habilidad no se confía silenciosamente solo porque esté en una carpeta.

Los comandos de prompt Markdown de proyecto y globales funcionan de la misma manera. El chat de terminal y la TUI descubren plantillas con espacios de nombres en `.chimera/commands/` y `<CHIMERA_HOME>/commands/`. Las plantillas expanden `$ARGUMENTS` y `$1` en texto de mensaje ordinario. El contenido de la plantilla nunca se ejecuta. Esto da a los proyectos una forma de enviar prompts repetibles sin otorgar a la plantilla ningún poder de ejecución.

El agente Code ahora puede hacer al usuario una pregunta acotada. `ask_user` pausa un turno de Code atendido para una opción o respuesta de texto libre, devuelve un resultado explícito de no-respuesta al agotarse el tiempo, y sigue siendo un tipo distinto solo de datos que no puede aprobar una acción gobernada. Los turnos de terminal, bot y desatendidos no lo registran. Eso cierra una brecha: antes, un turno de Code que necesitaba una decisión del usuario no tenía una forma estructurada de detenerse y preguntar.

## Qué hacer ahora

Si usas la aplicación de escritorio, no actualices. Quédate en v0.67.4. Si usas el paquete PyPI, puedes instalar 0.68.0 y empezar con el archivo de política: crea `<CHIMERA_HOME>/policy.json`, escribe tus reglas de denegación y ejecuta `chimera policy show` para ver las reglas en vigor. Las notas de la versión completas están en [Chimera Agent v0.68.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.68.0).
