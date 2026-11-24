---
title: "Chimera Agent 0.92.0: Recibos de coste, control del planificador y ajustes con búsqueda"
date: 2026-11-24
category: update
summary: "Los recibos de coste ahora usan precios en tiempo real, el planificador se puede activar o desactivar por ejecución y la búsqueda de ajustes en Desktop encuentra la tabla de enrutamiento."
version: "0.92.0"
---

## Qué cambió realmente para los que construyen agentes

Tres cosas en esta versión modifican la forma en que ejecutas agentes en el día a día. El resto son experimentos que permanecen desactivados por defecto, y pertenecen al laboratorio, no a tu pipeline.

**Los recibos de coste dejaron de adivinar.** Antes de la 0.92.0, una ejecución fuera de `serve` no tenía una fuente de precios fiable. El recibo mostraba lo que la caché del catálogo local tuviera, lo cual podía estar desactualizado o directamente no existir para modelos más nuevos. Si usabas un slug de modelo exacto que no estaba en el catálogo, la línea de coste era incorrecta o no aparecía. Eso rompía el presupuesto de cualquiera que apuntara a un endpoint de proveedor específico.

Ahora las ejecuciones fuera de `serve` obtienen los precios del índice público de OpenRouter. Los slugs de modelo exactos obtienen sus propias tarifas en lugar de heredar una coincidencia difusa. Las llamadas de admisión estricta conservan la cotización que se usó cuando la llamada fue admitida, por lo que el recibo coincide con lo que realmente se reservó. La entrada del catálogo `gpt-oss-20b` se actualizó como parte del mismo proceso. Si haces seguimiento del coste por ejecución, los números ahora son reproducibles.

**El planificador se convirtió en un interruptor.** El planificador siempre estaba activo. No podías desactivarlo para un solo carril Kanban, una sola llamada a la API o un solo paso de resolución en un flujo de trabajo. Eso significaba que cada tarea ligera pagaba la latencia y el overhead de tokens de la planificación, incluso cuando la instrucción era trivial o el modelo no se beneficiaba de la descomposición.

Con `use_planner`, lo configuras donde importa: en la definición de un carril, en el payload de una ejecución de API o en un paso de resolución de un flujo de trabajo. El valor por defecto sigue siendo activado, por lo que el comportamiento existente no cambia. Pero si tienes un carril que no hace más que formatear la salida, puedes saltarte el planificador y ahorrarte un viaje de ida y vuelta. El mismo flag funciona en las tres superficies, por lo que el modelo mental es un booleano, no tres configuraciones separadas.

**Los ajustes de Desktop se volvieron localizables.** La tabla de enrutamiento de modelo por rol estaba enterrada. Tenías que saber en qué pestaña de ajustes se encontraba y desplazarte hasta ella. La búsqueda de ajustes ahora la indexa, por lo que escribir "enrutamiento" o el nombre de un rol la muestra. Esto importa cuando cambias entre proyectos que usan diferentes modelos para el mismo rol.

Dos correcciones de localización se incluyeron al mismo tiempo: el enrutamiento y el texto del recibo ahora se leen correctamente en portugués brasileño, y las nuevas conversaciones y los turnos de solo respuesta muestran un estado más claro. El cambio de estado es pequeño pero elimina la ambigüedad cuando un turno está esperando una llamada a herramienta versus esperando una respuesta del modelo.

## Qué significan los experimentos (y qué no)

Cuatro experimentos aterrizaron, todos opcionales y todos desactivados por defecto. Ninguno de ellos cambia el comportamiento en producción a menos que los habilites explícitamente.

La extracción de memoria tuvo una ejecución de referencia que no fue concluyente. El límite de 6.000 caracteres y el modelo global siguen siendo los valores por defecto. Puedes optar por un modelo de extracción explícito y un prefiltro determinista, pero aún no hay evidencia de que ninguno mejore la recuperación de forma medible. Habilítalos si quieres recopilar tus propios datos.

Los tiers de modelo para Cron se probaron en trabajos sintéticos. El tier más barato fue completamente correcto en siete de ocho. Eso no te dice nada sobre tus trabajos cron en producción, porque los trabajos sintéticos no son tus trabajos. Los valores por defecto no se modifican. Si ejecutas cron de alto volumen, puedes experimentar con el tier más barato y validarlo contra tus propios criterios de éxito.

El refinamiento de diseño y la proporcionalidad de prompts permanecen desactivados por defecto. Son experimentos internos sin superficie de cara al usuario todavía. Las notas los referencian por transparencia, no para que los toques.

## Qué hacer ahora

Si haces seguimiento de costes, descarga la última imagen y ejecuta un trabajo fuera de `serve`. Compara el recibo con las tarifas publicadas de OpenRouter. Si fijas slugs de modelo exactos, verifica que la línea de tarifa coincida con tu proveedor.

Si tienes carriles Kanban ligeros, añade `use_planner: false` a un carril y compara la latencia. El flag está documentado en el esquema de configuración de ejecución.

Si usas Desktop, abre los ajustes y busca el nombre de un rol. Confirma que la tabla de enrutamiento aparece.

Notas de la versión con la lista completa: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
