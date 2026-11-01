---
title: "Chimera 0.82.0: Worktrees arrancan limpios, los archivos conservan sus terminaciones"
date: 2026-11-01
category: update
summary: "Los worktrees ahora clonan desde el remoto en vez de un checkout local desactualizado, la escritura de archivos respeta los finales de línea, y el agente pregunta antes de actuar donde los comandos están deshabilitados."
version: "0.82.0"
---

## Los worktrees parten del remoto, no de un checkout local desactualizado

Antes, un worktree nuevo ramificaba desde lo que estuviera checked out localmente. Si el clon local tenía días de atraso, el agente arrancaba con código viejo sin saberlo. El primer turno podía perder tiempo en problemas ya resueltos, o introducir conflictos que solo aparecían después.

Ahora, una solicitud de worktree hace fetch de la rama por defecto del remoto y crea el worktree desde ese commit. La salida indica desde qué commit partió. Cuando el fetch no puede alcanzar el remoto, el agente hace fallback al HEAD local y te avisa. El fetch nunca pide credenciales, así que la operación no se cuelga esperando una entrada que no puede llegar.

Esto importa porque un agente que arranca con código desactualizado produce trabajo que parece correcto en aislamiento pero falla contra el estado actual del repositorio. El cambio elimina una fuente silenciosa de divergencia entre lo que el agente ve y lo que el resto del equipo ve.

## Los archivos que escribe Chimera conservan sus terminaciones de línea

Las escrituras del agente pasaban por un modo texto que convertía cada salto de línea a CRLF en Windows. Un archivo creado en Windows discrepaba con la convención LF del repositorio, y un hash de traducción que pasaba localmente fallaba en CI. La discrepancia era difícil de rastrear porque el archivo se veía idéntico en una herramienta de diff que normaliza los finales de línea.

Las escrituras ahora son byte a byte exactas. Un archivo nuevo recibe LF. Un archivo existente con CRLF mantiene CRLF. Los hashes de traducción ignoran los finales de línea, así que un hash calculado en una plataforma coincide con el hash calculado en otra. La corrección elimina una falla específica de plataforma que rompía pipelines de CI y forzaba a los desarrolladores a depurar una salida del agente que no podían ver.

## El agente pregunta antes de trabajar donde los comandos están apagados

Una solicitud de código en una carpeta con comandos deshabilitados solía ejecutar herramientas durante una hora y solo entonces reportar que no podía verificar nada. El agente editaba, no probaba nada, y entregaba una respuesta no verificada. El dueño descubría el problema a posteriori.

Ahora el agente se detiene antes de que cualquier herramienta se ejecute y pregunta al dueño si permite comandos, continúa sin ellos o cancela. Solo la pantalla del dueño puede otorgar el permiso. Un turno sin nadie en pantalla nunca espera—procede sin comandos. La elección se recuerda por conversación, y una respuesta no verificada lo declara al inicio. El cambio previene trabajo desperdiciado y hace visible la restricción antes de que el agente actúe.

## Otras correcciones que cambian el uso diario

Una herramienta de verificación faltante ya no marca un turno como fallido. Cuando la comprobación post-turno no puede ejecutarse porque su programa no está instalado—`vitest` en un worktree nuevo sin `node_modules`—el turno se lee como no verificado, con la razón y la solución. Un comando `setup` en `.chimera/verify.toml` instala lo que falta. Una comprobación cuyas pruebas corrieron y fallaron aún se lee como fallida. La distinción te permite ver si la salida del agente rompió pruebas o si el test runner simplemente estaba ausente.

Una extracción de memoria fallida ya no es silenciosa. Cuando la extracción detrás de un turno de Code no puede iniciar, la app registra una advertencia con el tipo de error—nunca la conversación ni una clave—y el turno aún responde. Antes, la falla no dejaba rastro y no podías saber por qué el agente parecía olvidar el contexto.

La app instalada conserva sus claves sin importar desde qué carpeta se abra. El backend solía leer el `.env` de la carpeta de lanzamiento y registrar esa carpeta para el servicio en segundo plano. Una app abierta desde una terminal en otro lugar arrancaba sin clave de proveedor y cada turno fallaba. El acceso directo del menú Inicio ocultaba el problema. Una build empaquetada ahora siempre ejecuta su backend en la carpeta de instalación.

Un tweak numérico se aplica cuando terminas de escribir, no en cada tecla. Escribir `34` en un tweak que va de 28 a 56 enviaba `3` primero, era rechazado y rebotaba. El campo ahora se aplica una vez, al salir del campo o presionar Enter, se ajusta al rango, y Esc descarta el borrador.

El README ya no llama a Chimera auto-evolutivo. Siete ejecuciones de aprendizaje pre-registradas no encontraron ganancia medible, así que el titular, la descripción del paquete, la ayuda de CLI, la app y los READMEs traducidos ahora dicen lo que la evidencia respalda: un agente gobernado que publica sus propios resultados nulos. Los READMEs traducidos tampoco prometen más un test A/B que el bucle de aprendizaje no ejecuta.

El bridge pagina y filtra la lista de conversaciones. Listar conversaciones a través del bridge de Claude devolvía las 1,465 de una vez. Ahora acepta `limit`, `cursor`, `state`, `project` y `q`, por defecto 50 por página en el bridge, y la lista sin parámetros en pantalla no cambia.

Actualiza con `pip install --upgrade chimera-agent` y lee las notas completas en [Chimera Agent v0.82.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.82.0).
