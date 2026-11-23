---
title: "Chimera Agent 0.92.0: costos más claros, planificación configurable"
date: 2026-11-23
category: update
summary: "Los recibos de costo ahora usan precios públicos para ejecuciones fuera de serve, el planificador se puede desactivar por carril o ejecución, y la búsqueda en configuración de Desktop encuentra el enrutamiento de modelos."
version: "0.92.0"
---

## Recibos de costo que coinciden con el modelo que realmente invocaste

En versiones anteriores podías quedarte adivinando cuánto costó realmente una ejecución. Los recibos dependían de un contexto que no siempre estaba disponible, y un modelo que no coincidía con una entrada del catálogo podía usar una tarifa que no reflejaba la llamada que hiciste. Esto dificultaba auditar el gasto o comparar ejecuciones.

La versión 0.92.0 cambia cómo se construyen los recibos para ejecuciones fuera de `serve`. Esas ejecuciones ahora usan el índice de precios público de OpenRouter. Los slugs exactos de modelo obtienen sus propias tarifas en lugar de heredar una entrada más amplia o menos precisa. Las llamadas estrictas conservan la cotización usada en la admisión, por lo que el recibo refleja el precio que se aceptó cuando la llamada fue admitida, en lugar de una estimación posterior o diferente. La entrada de catálogo `gpt-oss-20b` también ha sido actualizada.

Para cualquiera que ejecute agentes fuera del entorno servido, esto elimina una fuente de ambigüedad. Puedes mirar un recibo y saber que proviene de precios públicos, vinculado al slug específico del modelo, con llamadas estrictas que preservan la cotización que rigió la admisión. El cambio no altera cómo se seleccionan los modelos. Cambia lo que el recibo reporta después de la ejecución.

## La planificación se convierte en una decisión por ejecución

El planificador era previamente un comportamiento global. Si querías que un carril, una ejecución de API o un paso de resolución de flujo de trabajo omitiera la planificación, no había un interruptor directo para ese contexto. Aceptabas el valor por defecto o cambiabas el comportamiento de forma más amplia de lo que la tarea requería.

`use_planner` ahora es configurable en carriles Kanban, ejecuciones de API y pasos de resolución de flujos de trabajo. El planificador permanece activado por defecto. Ese valor por defecto importa: las configuraciones existentes mantienen su comportamiento actual a menos que explícitamente lo desactives. La nueva configuración te da un punto de control más preciso para casos donde la planificación añade latencia o pasos que una ejecución particular no necesita.

Esto es útil cuando un carril maneja una tarea acotada, cuando un llamador de API sabe que la entrada ya está formada para ejecución directa, o cuando un paso de resolución debe proceder sin una pasada de planificación adicional. Ahora puedes expresar eso a nivel de carril, ejecución o paso en lugar de cambiar todo el sistema.

## Configuración de Desktop que realmente puedes encontrar

La búsqueda de configuración no mostraba la tabla de enrutamiento de modelo por rol. Si no sabías de antemano dónde estaba, podías perder tiempo haciendo clic por la interfaz para encontrarla. Eso está corregido: la búsqueda ahora encuentra la tabla de enrutamiento.

Se incluyen dos correcciones menores de Desktop. La copia de enrutamiento y recibos ahora se lee correctamente en portugués brasileño. Las conversaciones nuevas y los turnos de solo respuesta también muestran un estado más claro, para que la interfaz te diga qué está pasando en lugar de dejar el estado ambiguo.

## Qué hacer ahora

Actualiza a 0.92.0 y revisa las tres áreas que cambiaron. Si ejecutas agentes fuera de `serve`, revisa un recibo y confirma que refleja el slug del modelo y la cotización de admisión que esperas. Si tienes carriles o ejecuciones de API que no necesitan planificación, establece `use_planner` en false en ese nivel y deja el valor por defecto activado en todos los demás. Si usas Desktop, busca en Configuración la tabla de enrutamiento de modelo por rol y verifica el texto de estado en una conversación nueva.

Notas de versión completas: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
