---
title: "Chimera Agent 0.49.3: Correcciones para uso en entornos reales"
date: 2026-10-04
category: update
summary: "La versión 0.49.3 soluciona problemas críticos detectados en uso real, mejorando claridad, confiabilidad y eficiencia de costos."
version: "0.49.3"
---

## Mensajes de error más claros para operaciones MCP

Uno de los problemas más costosos en versiones anteriores involucraba la lectura de datos MCP. Cuando una ejecución se contaminaba por contenido no confiable, el mensaje de error era ambiguo, llevando a los usuarios a reintentar la misma operación sin éxito. Esto generaba gastos innecesarios y frustración. Ahora, los mensajes son específicos para cada escenario, indicando claramente si reintentar ayudará y sugiriendo alternativas accionables como usar el interruptor de pausa-para-aprobación o evitar contenido no confiable.

## Mejoras en pruebas de servidores MCP

El botón de Prueba MCP antes solo verificaba conectividad, dejando a los usuarios sin saber si el agente podía usar realmente el servidor. Esto causaba pérdida de tiempo y recursos cuando las ejecuciones fallaban por servidores no cargados. Ahora el botón reporta explícitamente si el agente puede utilizar el servidor, con mensajes diferenciados por causa y guía para resolver cada problema.

## Estado de verificación preciso

Antes, las ejecuciones mostraban `verified: True` basado en una instantánea, lo que podía ser engañoso si los archivos cambiaban después. Ahora incluyen un flag `delivered_matches_verified`, y la lista de ejecuciones muestra un distintivo cuando los archivos en disco no coinciden con el estado verificado. Esto alerta sobre discrepancias para tomar acción.

## Corrección de errores en instalación de skills

Los fallos de instalación se atribuían incorrectamente al límite horario de GitHub para descargas anónimas, incluso cuando no era el problema. Los mensajes ahora identifican correctamente el host que rechazó la solicitud y aseguran que el token llegue a ambos hosts. Además, los errores 429 se reintentan con el tiempo de espera especificado por el servidor, reduciendo reintentos innecesarios.

## Mensajes precisos al rechazar escritura de archivos

La escritura de archivos a veces se rechazaba con mensajes confusos que comparaban directorios en lugar de rutas. Esto hacía que el agente agotara su presupuesto reintentando. Ahora los mensajes describen acertadamente la comparación de rutas y explican el patrón de globs relativo al workspace, evitando confusiones.

## Actualización de modelos predeterminados

Los modelos predeterminados estaban desactualizados, algunos con una generación de retraso y otros en riesgo de retiro. Se actualizaron a modelos más recientes y estables, garantizando mejor rendimiento. Además, `.env.example` ya no establece defaults significativamente más costosos o con modelos retirados.

Estos cambios, basados en uso real, mejoran la experiencia al abordar puntos críticos. Para detalles completos, consulta [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
