---
title: "Chimera 0.70.0: Undo, Design y Control del Editor"
date: 2026-10-19
category: update
summary: "El chat de terminal alcanza funciones de deshacer y planificación propias de escritorio, el Editor incorpora diffs conscientes de git y vistas previas de archivos, y Chimera Design añade exportación, canvas y tooling para agentes."
version: "0.70.0"
---

## La terminal deja de ser un cliente de segunda

Antes de esta versión, `chimera chat` y `chimera assist` operaban con menos salvaguardas que el escritorio. El contexto crecía hasta alcanzar un límite, los planes no se mostraban antes de ejecutarse y deshacer un turno implicaba confiar en una ruta de restauración más simple. Esa brecha está cerrada.

Las sesiones de terminal compactan el contexto por defecto usando la misma política que el escritorio. Si quieres el comportamiento anterior, `--no-compact` lo desactiva. `/plan <tarea>` ahora muestra el plan primero y ejecuta la tarea solo tras la aprobación. Aprobar un plan no pre-aprueba acciones riesgosas. `/undo N` lista los archivos tocados en los últimos N turnos, pide confirmación y restaura a través del mismo almacenamiento duradero que usa la pantalla de Código. Los archivos que editaste después del turno objetivo no se tocan. Un `/undo` simple sigue revirtiendo el último turno.

El escritorio también gana una línea de tiempo de rebobinado en la cabecera de la conversación. Cada punto guardado muestra la hora y cuántos archivos tocó. Al seleccionar uno se muestra exactamente qué archivos se restaurarían y cuáles se omitirían por haber sido editados después. La restauración en sí puede rehacerse desde la misma línea de tiempo. Los turnos sin copia guardada aparecen deshabilitados con el motivo. Ni la vista previa ni la ruta de restauración se exponen en el puente de escritorio, por lo que ningún dispositivo emparejado o cliente externo puede disparar una restauración.

## El Editor ahora refleja lo que ve git

El árbol de archivos antes te daba una lista de nombres. Ahora marca los archivos modificados, añadidos y no rastreados con una letra, y las carpetas con un punto, usando el mismo estado de git que la tarjeta de Cambios. El estado se refresca tras guardar y cuando termina un turno del agente. Ctrl+P abre un archivo por su nombre. Los archivos HTML obtienen una opción de Vista Previa en el mismo sandbox que usa la pantalla de Código, incluyendo ediciones no guardadas. Cerrar una pestaña con cambios sin guardar pregunta si quieres seguir editando, cerrar sin guardar, o guardar y cerrar.

Las acciones basadas en selección cambian cómo pides ayuda con el código. Selecciona líneas y presiona Ctrl/⌘+L para enviarlas a la conversación de Código como un elemento de contexto, la misma ruta que una mención `@`. Ctrl/⌘+I añade `propose_change`, que el servidor ejecuta en modo solo lectura con un archivo y rango de líneas. La propuesta retorna como un diff inline con Aceptar y Rechazar. Aceptar guarda a través del Editor. Si las líneas cambian antes de que respondas, la propuesta desaparece. Un archivo que cambia en disco mientras está abierto se retiene con su diff y permanece en solo lectura hasta que elijas Conservar o Deshacer.

El compositor de Código ahora soporta menciones `@` para archivos, carpetas, diseños y conversaciones recientes. Un archivo de hasta 8.000 caracteres se adjunta inline, saneado, delimitado como datos y registrado en el libro mayor como una lectura. Archivos y carpetas más grandes se pasan por ruta para que el agente los lea. Las rutas absolutas y `..` se rechazan antes de que el turno se ejecute. Los enlaces simbólicos fuera del proyecto y el `.env` propio de Chimera se rechazan al resolverse. Los invitados en enlaces compartidos no pueden mencionar diseños ni conversaciones.

## Chimera Design gana exportación, canvas y una herramienta

Chimera Design ahora exporta a PDF, PNG y PPTX. El PDF es la página estática impresa por el Chromium de Playwright, una página por mesa de trabajo, con JavaScript desactivado y peticiones no `data:` abortadas. PNG produce una imagen por mesa de trabajo o un zip. PPTX coloca cada elemento en su marco en una diapositiva por mesa de trabajo. Cuando falta Chromium o python-pptx, la exportación se niega y te dice qué instalar. No se descarga nada automáticamente.

El canvas se abre en la ranura central de la pantalla de Código, con la conversación a la izquierda y el canvas a la derecha. Se autoguarda a través de la ruta de operaciones con un estado visible. Las ediciones manuales y del agente comparten un historial de deshacer. Un turno que pide un diseño muestra una acción "Abrir en Chimera Design". Junto al canvas puedes proponer desde un brief, refinar una selección, auditar, editar tokens, comprobar el diseño contra ellos, comentar por elemento, restaurar versiones y exportar a HTML. Restaurar y exportar preguntan primero.

La herramienta `design` se ofrece solo cuando un turno pide un diseño visual. Un detector determinista cubre portugués, inglés y español, normalizando acentos y buscando palabras completas. Sentidos de código como "design pattern" o "system design" nunca se activan. La herramienta obedece la postura, nunca envía HTML a un bot, marca su salida como no confiable y se mantiene fuera de los turnos de invitado. `CHIMERA_TOOL_DENYLIST=design` la elimina.

## Qué hacer ahora

Actualiza a la 0.70.0 y abre una sesión de terminal: ejecuta `/plan` antes de una tarea arriesgada, y luego `/undo N` después de una. En el Editor, selecciona un bloque y presiona Ctrl/⌘+I para ver un cambio propuesto como diff. Para trabajo de diseño, abre el canvas desde un turno que pida un diseño visual y exporta desde allí. Notas de la versión completas: [Chimera Agent v0.70.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.70.0).
