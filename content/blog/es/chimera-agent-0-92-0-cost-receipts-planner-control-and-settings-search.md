---
title: "Chimera Agent 0.92.0: Recibos de costo, control del planner y búsqueda en configuración"
date: 2026-11-26
category: update
summary: "Los recibos de costo ahora usan el índice público de precios de OpenRouter para ejecuciones fuera de serve. El planner se configura por carril, y la búsqueda de configuración en Desktop encuentra la tabla de enrutamiento."
version: "0.92.0"
---

## Qué cambia en el seguimiento de costos

Antes de la 0.92.0, los recibos de costo para ejecuciones fuera de `serve` dependían de un catálogo interno estático. Si el slug del modelo no coincidía exactamente, el recibo mostraba cero o una tarifa genérica que no reflejaba el costo real de la llamada. La entrada `gpt-oss-20b` estaba desactualizada, y las llamadas de admisión estricta perdían la cotización con la que fueron admitidas, lo que hacía imposible auditar por qué una ejecución costó lo que costó.

Esta versión migra esas ejecuciones al índice público de precios de OpenRouter. Los slugs exactos de modelo ahora obtienen sus tarifas directamente de ese índice. Cuando se admite una llamada estricta, el recibo conserva la cotización usada en la admisión en lugar de recalcularla después. La entrada del catálogo `gpt-oss-20b` se actualizó para reflejar los precios actuales. En conjunto, estos cambios significan que el número que ves en el recibo es el número que realmente se cobró, no una aproximación de una tabla de búsqueda obsoleta.

## El control del planner va donde configurás el trabajo

El planner siempre estaba activo y no había un interruptor para apagarlo en un carril específico, una ejecución de API o un paso de resolución de workflow. Si querías que un carril se ejecutara sin fase de planificación, tenías que hacer una pirueta con el framework. Esa pirueta se rompía cuando cambiaba el valor por defecto o cuando un workflow reutilizaba la definición del carril.

Ahora `use_planner` es una configuración en los carriles Kanban, ejecuciones de API y pasos de resolución de workflow. El planner sigue activo por defecto, así que las configuraciones existentes no cambian su comportamiento. Poner `use_planner: false` en un carril omite la fase de planificación solo para ese carril. La misma configuración en una ejecución de API o un paso de resolución anula el valor por defecto del carril para esa ejecución. Esto pone la decisión junto a la definición del trabajo, que es donde corresponde, en lugar de un flag global o una variable de entorno.

## Configuración de Desktop que ahora se puede encontrar

La tabla de enrutamiento por rol existía antes de esta versión, pero la búsqueda de configuración no la indexaba. Tenías que saber dónde estaba y navegar manualmente hasta ella. En portugués brasileño, las etiquetas de enrutamiento y el texto de los recibos se renderizaban mal, y las conversaciones nuevas mostraban un estado que no dejaba claro qué estaba pasando.

La búsqueda de configuración ahora encuentra la tabla de enrutamiento. Podés escribir el nombre de un rol y llegar directamente a la asignación. El texto de enrutamiento y recibos se lee correctamente en portugués brasileño. Las conversaciones nuevas y los turnos de solo respuesta muestran un estado más claro, para que sepas si el modelo está cargando, pensando o esperando entrada.

## Experimentos que no cambiaron los valores por defecto

Tres experimentos aterrizaron en esta versión, y ninguno cambia el comportamiento por defecto. El benchmark de extracción de memoria no fue concluyente; el límite de 6.000 caracteres y el modelo global siguen siendo los valores por defecto, con un modelo de extracción explícito y un prefiltro determinista disponibles como opción. El experimento de cron model tier mostró corrección total en siete de ocho trabajos sintéticos, pero los trabajos sintéticos no son trabajos de producción, y los valores por defecto no cambiaron. Los experimentos de refinamiento lean de Design y proporcionalidad de prompts siguen desactivados por defecto.

Estos experimentos están documentados en las notas de la versión para los equipos que quieran probarlos con sus propias cargas de trabajo. No los actives en producción sin medirlos contra tus propios datos.

## Qué hacer ahora

Actualizá con `pip install chimera-agent==0.92.0`. Si ejecutás cargas de trabajo con seguimiento de costos fuera de `serve`, revisá tus recibos después de la actualización: los números reflejarán el índice público de OpenRouter. Si tenés carriles que deberían omitir la planificación, agregá `use_planner: false` en la definición del carril. Los usuarios de Desktop en macOS y Windows deben tener en cuenta que los instaladores no están firmados y pueden pedir confirmación en el primer lanzamiento; la aplicación verifica firmas en los paquetes de actualización posteriores. Las notas completas de la versión están en [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
