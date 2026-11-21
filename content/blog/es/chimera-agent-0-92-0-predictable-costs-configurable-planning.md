---
title: "Chimera Agent 0.92.0: Costos predecibles, planificación configurable"
date: 2026-11-21
category: update
summary: "Los recibos de costo ahora usan precios en tiempo real, el planificador es explícitamente configurable y la búsqueda de configuración en Desktop cubre la tabla de enrutamiento."
version: "0.92.0"
---

## Recibos que reflejan lo que realmente pagas

Antes de la 0.92.0, el seguimiento de costos fuera de `serve` dependía de un catálogo estático que se desfasaba de las tarifas reales de los proveedores. Una ejecución podía reportar un costo que parecía plausible pero era incorrecto—a veces lo suficiente como para descalibrar un cálculo de presupuesto. La discrepancia era especialmente visible cuando usabas un slug de modelo exacto que el catálogo no reconocía: el sistema recurría a una tarifa genérica o simplemente no mostraba nada útil.

Esta versión cambia al índice público de precios de OpenRouter para las ejecuciones que no pasan por `serve`. Los slugs de modelo exactos ahora se resuelven con sus propias tarifas en lugar de agruparse en un promedio familiar. Cuando una llamada es estricta—es decir, el proveedor y el modelo se bloquean en la admisión—el recibo conserva la cotización que fue aceptada, de modo que el número que ves es el número que realmente se autorizó. La entrada del catálogo `gpt-oss-20b` también se ha actualizado para coincidir con los precios actuales.

El efecto práctico es que puedes tomar un recibo de una ejecución por lotes, multiplicarlo por tu volumen esperado y obtener un número que se sostiene. Se acabaron las verificaciones manuales contra el panel del proveedor.

## El planificador ahora es un interruptor que tú controlas

Hasta ahora, el planificador siempre estaba activo. No podías desactivarlo para un carril Kanban específico, una llamada a la API o un paso de resolución de flujo de trabajo. Eso significaba que cada tarea pagaba la latencia y el costo de tokens de una pasada de planificación, incluso cuando la tarea era trivial o las instrucciones ya eran lo suficientemente explícitas como para que la planificación no aportara nada.

La versión 0.92.0 expone `use_planner` como una bandera de configuración. Ponla en `false` en un carril, una ejecución o un paso de resolución, y el agente se salta la fase de planificación por completo. El valor predeterminado sigue siendo `true`, por lo que los flujos de trabajo existentes no cambian su comportamiento a menos que optes por ello. La bandera está disponible en las tres superficies—configuración Kanban, la API y definiciones de flujo de trabajo—para que puedas ser selectivo. Un carril que maneja clasificación simple puede saltarse la planificación mientras que un carril vecino que hace investigación en múltiples pasos la mantiene.

¿Por qué no simplemente hacer la planificación más inteligente? Porque el costo de adivinar mal es más alto que el costo de darte el interruptor. Una heurística que intente decidir si se necesita planificación a veces decidirá mal, y depurar eso es más difícil que invertir un booleano que tú controlas.

## Configuración de Desktop que realmente puedes encontrar

La búsqueda de configuración en la aplicación de Desktop antes omitía la tabla de enrutamiento de modelo por rol. Podías escribir "enrutamiento" o "rol" y no obtener resultados, aunque la tabla estuviera justo ahí en el panel de configuración. Eso está arreglado: la tabla de enrutamiento ahora está indexada y aparece en la búsqueda.

Dos correcciones de localización se incluyen también en esta versión. La tabla de enrutamiento y la copia del recibo ahora se leen correctamente en portugués brasileño—antes, algunas etiquetas recurrían al inglés. Las conversaciones nuevas y los turnos de solo respuesta también muestran mensajes de estado más claros, para que no te quedes mirando un spinner preguntándote si el modelo está pensando o se cayó la conexión.

## Lo que se mantiene experimental

Varios experimentos recibieron actualizaciones sin cambiar los valores predeterminados. El benchmark de extracción de memoria no fue concluyente, por lo que el límite de 6,000 caracteres y el modelo global se mantienen. Puedes optar por un modelo de extracción explícito y un prefiltro determinista si quieres probar la ruta más nueva. El experimento de niveles de modelo cron mostró total corrección en siete de ocho trabajos sintéticos, pero los trabajos sintéticos no son trabajos de producción, y los valores predeterminados no cambian. Los experimentos de refinamiento ligero de Design y proporcionalidad de prompts también permanecen desactivados por defecto.

Los instaladores de Desktop aún no están firmados y pueden solicitar confirmación en el primer lanzamiento. La aplicación verifica las firmas en los paquetes del actualizador.

Actualiza con `pip install chimera-agent --upgrade` y configura `use_planner` donde lo necesites. El changelog completo está en [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
