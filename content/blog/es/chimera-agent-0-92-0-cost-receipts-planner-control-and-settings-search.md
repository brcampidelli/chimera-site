---
title: "Chimera Agent 0.92.0: Recibos de costo, control del planner y búsqueda en configuración"
date: 2026-11-19
category: update
summary: "Las ejecuciones fuera de serve ahora muestran costos precisos por modelo, el planner se puede desactivar por carril o llamada a la API, y la búsqueda de configuración en Desktop encuentra la tabla de enrutamiento."
version: "0.92.0"
---

## Lo que pagas es lo que ves

El seguimiento de costos para ejecuciones fuera de `serve` era una estimación. El sistema usaba un fallback genérico que ignoraba el modelo real que llamabas. Si ejecutabas una verificación de admisión estricta contra un slug de modelo específico, el recibo seguía mostrando el precio general del catálogo. Los números iban en la dirección correcta pero fallaban en el detalle, y eso hacía que las auditorías de costo no fueran confiables.

La versión 0.92.0 corrige esto obteniendo las tarifas del índice público de precios de OpenRouter. Los slugs exactos de modelo ahora se resuelven a sus propias tarifas en lugar de heredar un promedio de familia. Las llamadas estrictas conservan la cotización obtenida en el momento de la admisión, por lo que el recibo coincide con la decisión que el sistema ya tomó. La entrada de catálogo `gpt-oss-20b` también se ha actualizado para reflejar los precios actuales. Si haces seguimiento de costos por ejecución o facturas a consumidores downstream, los números que ves ahora son los números que realmente se usaron.

## Control del planner donde lo necesitas

Antes de esta versión, el planner se ejecutaba en cada interacción. No había forma de desactivarlo para un carril Kanban específico, una ejecución de API o un paso de resolución de workflow. Eso imponía la sobrecarga de planificación a tareas que no se beneficiaban de ella: transformaciones simples, pipelines deterministas o pasos donde ya sabías la siguiente acción.

Ahora puedes establecer `use_planner` en carriles individuales, ejecuciones de API y pasos de resolución. El planner permanece activado por defecto, por lo que los workflows existentes no cambian su comportamiento. La diferencia es que ahora puedes optar por desactivarlo donde la planificación añade latencia sin aportar valor. Un carril que ejecuta una única llamada a herramienta no necesita una fase de planificación. Una ejecución de API que sigue una secuencia fija no necesita que el modelo decida qué viene después. El control es granular: desactivas la planificación por contexto, no globalmente.

## Configuración que realmente puedes encontrar

La configuración de Desktop tenía una caja de búsqueda que no buscaba en la tabla de enrutamiento de modelos por rol. Esa tabla es donde asignas modelos a roles como `assistant`, `tool` o `vision`. Si olvidabas dónde estaba, tenías que desplazarte por los paneles hasta encontrarla. Ahora el índice de búsqueda la cubre. Escribe un nombre de rol o un slug de modelo, y la tabla de enrutamiento aparece en los resultados.

La misma actualización de Desktop corrige dos vacíos de localización. Las etiquetas de enrutamiento y el texto de los recibos ahora se leen correctamente en portugués brasileño. Los indicadores de nueva conversación y el estado de turno de solo respuesta también son más claros, eliminando la ambigüedad sobre si el sistema está inactivo o procesando.

## Lo que se mantuvo experimental

Tres experimentos recibieron actualizaciones sin cambiar los valores predeterminados. El benchmark de extracción de memoria no fue concluyente, por lo que el límite de 6.000 caracteres y el modelo global permanecen. Puedes optar por un modelo de extracción explícito y un prefiltro determinista si quieres probar un comportamiento de memoria más acotado. El experimento de niveles de modelo cron mostró total corrección en siete de ocho trabajos sintéticos, pero los trabajos sintéticos no son cargas de trabajo de producción. Los valores predeterminados no cambian. Los experimentos de refinamiento de Design ligero y proporcionalidad de prompts también permanecen desactivados por defecto.

## Consíguelo ahora

Actualiza con `pip install chimera-agent==0.92.0`. Los instaladores de Desktop no están firmados y pueden solicitar confirmación en el primer lanzamiento; la aplicación verifica firmas en los paquetes del actualizador. Notas completas en [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
