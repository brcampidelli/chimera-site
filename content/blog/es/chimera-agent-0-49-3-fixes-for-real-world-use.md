---
title: "Chimera Agent 0.49.3: Correcciones para uso en el mundo real"
date: 2026-10-05
category: update
summary: "La versión 0.49.3 aborda problemas críticos descubiertos durante su uso práctico, mejorando claridad, confiabilidad y eficiencia en costos."
version: "0.49.3"
---

## Problema de escritura de archivos MCP: Claridad y costo

Una de las correcciones más importantes de esta versión aborda un problema costoso relacionado con la escritura de archivos MCP. Anteriormente, al leer datos a través de MCP, la ejecución se detenía sin escribir archivos, y el mensaje de error era ambiguo. Esto llevaba a intentos repetidos, cada uno incurriendo en costos sin progreso alguno. Por ejemplo, cuatro ejecuciones de la misma tarea costaron **US$ 5.11** sin producir archivos, mientras que la misma tarea usando herramientas integradas tuvo éxito en el primer intento por **US$ 0.37**.

Ahora, el mensaje de error distingue entre tres escenarios: rechazo humano, denegación de configuración y ausencia de un aprobador. También sugiere soluciones prácticas, como usar el interruptor de pausa para aprobación o evitar contenido no confiable en la ejecución. Este cambio evita reintentos innecesarios y reduce costos.

## Botón de prueba MCP: Mejor retroalimentación

Otra mejora significativa es el botón de prueba MCP. Anteriormente, solo confirmaba la conectividad del servidor, lo que llevaba a los usuarios a pensar que el agente podía usar el servidor. En realidad, el agente no podía acceder al servidor porque la carga de servidores MCP al inicio estaba desactivada por defecto. Esto resultó en pérdida de tiempo y recursos, como en un caso donde se hicieron **veintidós llamadas a herramientas en diecinueve minutos** sin usar el servidor.

Ahora, el botón de prueba proporciona retroalimentación sobre si el agente puede usar el servidor, con mensajes diferentes para distintas causas. Esto asegura que los usuarios comprendan los pasos necesarios para habilitar el uso del servidor.

## Estado verificado: Representación precisa

El estado `verified` antes indicaba una verificación instantánea, pero no tenía en cuenta cambios posteriores al momento de verificación. Esto causaba confusión cuando el mismo comando ejecutado contra el árbol resultante producía **20 fallas en 20 ejecuciones**. Ahora, el estado incluye `delivered_matches_verified`, y la lista de ejecuciones muestra una insignia cuando los archivos en disco ya no coinciden con el estado verificado. Esto ofrece una imagen más clara del resultado de la ejecución.

## Instalación de habilidades: Mensajes de error correctos

Los fallos en la instalación de habilidades antes culpaban al límite incorrecto, sugiriendo reintentos o configurar `GITHUB_TOKEN` cuando el problema no estaba relacionado. Ahora, el token llega a ambos hosts, y los mensajes de error identifican con precisión el host que rechaza. Esto evita reintentos innecesarios y asegura que los usuarios tomen la acción correcta.

## Escritura de archivos: Mensajes de rechazo claros

Los rechazos en la escritura de archivos antes eran poco claros, especialmente cuando se declaraba una ruta absoluta como región de escritura. Ahora, el mensaje de rechazo nombra la ruta que se está comparando, explica la región como una lista de globs relativos al espacio de trabajo y señala el patrón que nunca coincidirá. Esto evita reintentos repetidos y reportes de fallos en el entorno.

## Modelos por defecto: Actualizados y confiables

Los modelos por defecto se actualizaron para reflejar las generaciones actuales, asegurando mejor rendimiento y eficiencia en costos. El modelo predeterminado cambió de `deepseek-chat-v3.1` a `deepseek-v4-flash-0731`, reduciendo costos significativamente. El modelo de gama alta se actualizó a `z-ai/glm-5.3`, y los modelos de juez y panel de fusión también se actualizaron. Una prueba ahora asegura que ningún modelo predeterminado sea un slug `-preview`, que los proveedores pueden retirar sin previo aviso.

Para más detalles, consulta [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
