---
title: "Chimera Agent 0.92.0: Recibos de costo, control del planner y búsqueda en configuración"
date: 2026-11-22
category: update
summary: "Los recibos de costo ahora usan el índice público de precios de OpenRouter para ejecuciones fuera de serve. El planner se configura por carril, y la búsqueda en configuración de Desktop encuentra la tabla de enrutamiento."
version: "0.92.0"
---

## Lo que realmente cambió para los constructores de agentes

Tres puntos de fricción se resolvieron en esta versión: el seguimiento de costos opaco fuera del entorno `serve`, un planner que no se podía desactivar donde estorbaba, y un panel de configuración de Desktop que ocultaba la tabla de enrutamiento de la búsqueda.

Nada de esto era catastrófico. Eran de esos roces que te hacen abrir una segunda terminal para hacer grep en un archivo de log, o hacer clic en cuatro pestañas para encontrar el menú desplegable que necesitas. Las correcciones son pequeñas, pero eliminan pasos de flujos de trabajo que se ejecutan docenas de veces al día.

## Recibos de costo que coinciden con lo que realmente te facturan

Antes de 0.92.0, las ejecuciones fuera de `serve` tenían que adivinar el precio de los modelos. El framework no tenía acceso a los mismos datos de tarifas que usa el entorno alojado, por lo que los recibos podían desviarse de lo que OpenRouter realmente cobraba. Si estabas rastreando costos por agente para un cliente o un presupuesto, tenías que conciliar manualmente.

Ahora esas ejecuciones obtienen los datos del índice público de precios de OpenRouter. Los slugs exactos de modelo obtienen sus propias tarifas en lugar de recurrir a una estimación genérica por familia. Las llamadas estrictas conservan la cotización que se usó en el momento de admisión, por lo que el recibo refleja el precio al que se aceptó la llamada, no una tarifa obtenida después. La entrada del catálogo `gpt-oss-20b` también se actualizó, lo cual importa si ese modelo era parte de tu línea base de costos.

El cambio no afecta las ejecuciones dentro de `serve`—esas ya tenían recibos precisos. Cierra la brecha para todo lo demás: invocaciones de CLI, trabajos cron, pasos de pipeline que se ejecutan en una estación de trabajo en lugar del servidor.

## El planner ya no es obligatorio

`use_planner` ahora es una bandera de configuración en carriles Kanban, ejecuciones de API y pasos de resolución de flujos de trabajo. El planner permanece activado por defecto, por lo que el comportamiento existente no cambia a menos que lo desactives explícitamente.

Por qué esto importa: el planner añade una pasada de razonamiento antes de la ejecución. Eso es útil cuando el agente necesita descomponer una solicitud vaga en pasos concretos. Es sobrecarga cuando los pasos ya son explícitos—cuando un carril dispara una secuencia conocida, o un paso de resolución llama a una sola herramienta con entrada estructurada. En esos casos, el planner podía introducir latencia y costo de tokens sin mejorar el resultado. Ahora puedes desactivarlo donde no aporta valor.

## Configuración de Desktop que realmente puedes encontrar

La búsqueda de configuración de la app Desktop ahora indexa la tabla de enrutamiento por rol de modelo. Anteriormente, buscar "routing" o el nombre de un rol no devolvía nada, aunque la configuración existía. Tenías que saber dónde estaba y navegar manualmente. Eso está arreglado.

Dos correcciones de localización se incluyeron: el texto de enrutamiento y recibos ahora se lee correctamente en portugués brasileño, y las nuevas conversaciones y los turnos de solo respuesta muestran indicadores de estado más claros. No son funcionalidades, pero eliminan ambigüedad del estado de la UI.

## Lo que sigue siendo experimental

Varios experimentos corrieron junto a esta versión. La extracción de memoria obtuvo un benchmark que no fue concluyente—el límite de 6,000 caracteres y el modelo global siguen siendo los valores por defecto, con un modelo de extracción explícito y pre-filtro determinista disponibles como opción. Los tiers de modelo de Cron probaron un modelo más barato en trabajos sintéticos; fue completamente correcto en siete de ocho, pero el benchmark no cubrió cargas de trabajo de producción, por lo que los valores por defecto no cambian. Los experimentos de refinamiento de diseño y proporcionalidad de prompts permanecen desactivados por defecto. Nada de esto cambia lo que hacen tus agentes a menos que los actives.

## Qué hacer ahora

Si rastreas costos para ejecuciones fuera de `serve`, revisa un recibo contra tu facturación de OpenRouter. Los números deberían alinearse sin ajuste manual. Si tienes carriles o pasos de resolución donde el planner añade latencia sin valor, establece `use_planner: false` en esas configuraciones. Si antes no podías encontrar la tabla de enrutamiento mediante la búsqueda de Desktop, pruébalo ahora.

Los instaladores de Desktop permanecen sin firmar y pueden pedir confirmación en el primer lanzamiento. La app verifica firmas en los paquetes del actualizador. Notas completas: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0)
