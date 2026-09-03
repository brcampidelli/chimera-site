---
title: "Chimera Agent 0.48.1: Correcciones para el Modo de Aprobación, Ejecución de Tareas y Más"
date: 2026-09-03
category: update
summary: "Chimera Agent 0.48.1 soluciona problemas críticos con el modo de aprobación, ejecución de tareas y reporte de costos, garantizando un funcionamiento más fluido y mayor seguridad."
version: "0.48.1"
---

## El Modo de Aprobación Ahora Funciona como se Espera

El ajuste `CHIMERA_APPROVAL_MODE=allow` ahora opera correctamente en todas las superficies, incluyendo la app de escritorio y `chimera serve`. Antes, este ajuste solo funcionaba en `solve` y `crew`, dejando a la mayoría de usuarios con rechazos inesperados. Esta corrección asegura que herramientas peligrosas no sean bloqueadas al leer contenido no confiable, alineándose con el propósito original del ajuste. Benchmarks muestran que, con un aprobador, el sistema bloquea el 85.7% de ataques mientras permite todo el trabajo legítimo, una mejora significativa frente al 50% de rechazos previos para tareas válidas.

## Pantalla Unificada de Ejecución de Tareas

La pantalla de Trabajo ha sido optimizada para reducir redundancias y mejorar usabilidad. Anteriormente, los usuarios debían elegir entre cuatro formularios distintos para ejecutar tareas, cada uno requiriendo los mismos datos. Esto generaba ineficiencia y frustración, ya que probar un método diferente implicaba reescribir la tarea. Ahora, una sola pantalla con cuatro botones maneja todos los modos de ejecución, simplificando el proceso y reduciendo el número de pestañas de cinco a cuatro. Este cambio también garantiza que tareas y verificaciones sean consistentes entre modos, mientras que intentos, roles y slots de trabajadores siguen siendo específicos por modo.

## Correcciones y Añadidos Clave

- **Variables Vacías Ya No Bloquean la App:** Una variable `CHIMERA_GUARD_CHAT` vacía en el archivo `.env` antes impedía el inicio de la aplicación. Esto se ha corregido, tratando valores vacíos como no configurados en lugar de causar un fallo.
- **Medidor de Costos para Modelos Caros:** El medidor ahora reporta correctamente costos para todos los modelos, incluyendo los costosos como `claude-opus-5` y `gpt-5.5`. Antes, estos modelos mostraban costos desconocidos por una llamada a función faltante.
- **Anillo de Enfoque para Botones:** El componente Button ahora adopta correctamente el anillo de enfoque compartido, corrigiendo una inconsistencia visual.

## Nueva Función: Carga Diferida de Herramientas

Se añadió el ajuste `CHIMERA_DEFER_TOOLS` para reducir uso de tokens, cargando esquemas de herramientas solo cuando se necesitan. Benchmarks muestran un 26% de reducción en costo por tarea completada, aunque el impacto en tasas de finalización sigue siendo inconcluso. Esta opción viene desactivada por defecto debido a resultados mixtos.

## Qué Hacer Ahora

Actualice a Chimera Agent 0.48.1 para aprovechar estas correcciones y mejoras. Para notas detalladas de la versión, visite [Chimera Agent v0.48.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.1).
