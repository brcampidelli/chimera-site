---
title: "Chimera Agent 0.92.0: Recibos de coste, control del planner y ajustes buscables"
date: 2026-11-28
category: update
summary: "Los recibos de coste ahora usan el índice público de precios de OpenRouter para ejecuciones fuera de serve, el planner se configura por carril y la búsqueda de ajustes en Desktop encuentra la tabla de enrutamiento de modelos."
version: "0.92.0"
---

## Qué cambió en los recibos de coste

Las ejecuciones fuera de `serve` antes dependían de un catálogo de precios estático o incompleto. Cuando el slug de un modelo no coincidía exactamente, el recibo mostraba una tarifa incorrecta u omitía directamente la línea de coste. Esto dificultaba auditar el gasto en variantes ajustadas o modelos recién lanzados.

La versión 0.92.0 migra esas ejecuciones al índice público de precios de OpenRouter. Los slugs exactos ahora obtienen sus propias tarifas directamente del índice. Las llamadas estrictas también conservan la cotización aceptada en el momento de admisión, de modo que el recibo refleja el precio al que el agente se comprometió realmente, no una estimación posterior. La entrada del catálogo `gpt-oss-20b` se ha actualizado para reflejar los precios actuales.

Para cualquiera que siga los costes por ejecución fuera del camino de `serve`, los recibos ahora son precisos sin necesidad de corrección manual. Si un modelo está listado en el índice público, el agente le asigna el precio correcto. Si el slug es desconocido, el recibo lo deja claro en lugar de asumir silenciosamente un coste cero.

## El planner ya no está siempre activo

Antes de esta versión, el planner se ejecutaba en cada carril, cada llamada a la API y cada paso de resolución de flujo de trabajo. No había forma de desactivarlo para tareas donde la planificación añadía latencia sin mejorar el resultado. Los equipos que querían una ejecución más rápida en carriles simples tenían que buscarle las vueltas al framework.

`use_planner` es ahora un flag de configuración expuesto en los carriles Kanban, las ejecuciones de API y los pasos de resolución de flujos de trabajo. El planner permanece activo por defecto, por lo que el comportamiento existente no cambia a menos que lo desactives explícitamente. Poner el flag a `false` en un carril omite por completo la fase de planificación y procede directamente a la ejecución.

Esto es más relevante para carriles que manejan operaciones deterministas de un solo paso. Un carril que consulta un endpoint conocido o transforma un payload con un esquema fijo no se beneficia de una pasada de planificación. Eliminarla reduce la latencia y el consumo de tokens sin afectar a la corrección. El flag es por carril, así que puedes mantener el planner activo para tareas ambiguas y desactivarlo para las mecánicas dentro del mismo proyecto.

## Los ajustes de Desktop son buscables

La búsqueda de ajustes en la aplicación de escritorio antes no indexaba la tabla de enrutamiento de modelos por rol. Encontrar qué modelo estaba asignado a un rol específico requería desplazarse por toda la lista. Esa fricción crecía a medida que los equipos añadían más roles y modelos de respaldo.

La búsqueda ahora cubre la tabla de enrutamiento. Escribir el nombre de un rol o el slug de un modelo en la barra de búsqueda de ajustes devuelve directamente las entradas de enrutamiento coincidentes. La misma actualización corrige el texto de enrutamiento y recibos en portugués brasileño, donde las etiquetas truncadas dificultaban la lectura de la tabla. Las nuevas conversaciones y los turnos de solo respuesta también muestran indicadores de estado más claros, para que sepas si el agente está esperando la respuesta de un modelo o procesando una llamada a herramienta.

## Experimentos que siguieron siendo opcionales

Varios experimentos aterrizaron sin cambiar los valores por defecto. La extracción de memoria con un modelo explícito y pre-filtro determinista está disponible pero desactivada. El benchmark no fue concluyente, por lo que el límite de 6.000 caracteres y el modelo global se mantienen. Se probó un nivel de modelo cron más barato en trabajos sintéticos y acertó siete de ocho, pero no se midió con cargas de trabajo reales. Los experimentos de refinamiento de diseño y proporcionalidad de prompts también permanecen desactivados por defecto.

Están disponibles tras flags de funcionalidad para los equipos que quieran probarlos en sus propios entornos. Nada cambió automáticamente.

## Qué hacer ahora

Actualiza con `pip install chimera-agent==0.92.0`. Si ejecutas agentes fuera de `serve`, revisa tu próximo recibo para confirmar que el precio coincide con el índice público de OpenRouter. Para los carriles que no necesiten planificación, añade `use_planner: false` a la configuración del carril. Los usuarios de Desktop pueden abrir los ajustes y buscar el nombre de un rol para verificar que la tabla de enrutamiento está indexada.

Notas completas de la versión: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
