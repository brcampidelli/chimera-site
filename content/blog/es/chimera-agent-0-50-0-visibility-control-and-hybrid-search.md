---
title: "Chimera Agent 0.50.0: Visibilidad, Control y Búsqueda Híbrida"
date: 2026-10-11
category: update
summary: "Esta versión corrige comportamientos silenciosos, añade controles faltantes y mejora la recuperación con búsqueda híbrida."
version: "0.50.0"
---

## Las Tareas Ahora Son Visibles

Los agentes mantenían una lista interna de tareas (`RunState.tasks`) que nunca se exponía ni persistía. Ejecuciones largas podían perder el rastro de su progreso durante la compactación de contexto. Ahora, la tarea activa se muestra durante la ejecución y las tareas completadas se tachan. La lista sobrevive a la compactación, por lo que los agentes ya no olvidan su plan a mitad de ejecución.

## Las Solicitudes de Aprobación Te Siguen

Tres superficies de ejecución desatendidas (incluyendo trabajos cron) podían solicitar aprobaciones, pero el mecanismo era opaco. Si se configura con `CHIMERA_APPROVAL_WEBHOOK`, los agentes ahora enrutan preguntas de aprobación al canal especificado en lugar de fallar silenciosamente cuando no hay consola disponible. El sistema también reporta explícitamente estados `unreachable` cuando la entrega no es posible.

## Mejoras en Gobernanza y Recuperación

El núcleo de confianza (`CHIMERA_GOVERNANCE`) no tenía control de activación a pesar de registrar eventos de seguridad. Ahora viene desactivado por defecto con un interruptor visible. Para recuperación, `chimera find` usa búsqueda híbrida (palabras clave + vector) por defecto tras pruebas que mostraron un rendimiento 6.25 puntos superior (p = 1.7e-04) en el corpus del proyecto. La búsqueda vectorial sola tiene menor rendimiento, justificando el enfoque fusionado.

## Correcciones en Manejo de Modelos

Los agentes asumían que modelos no catalogados tenían ventanas de 128k tokens, causando fallos en los 31 modelos (de 431 indexados) que realmente sirven ≤64k. El sistema ahora verifica el índice en vivo para modelos desconocidos. Se corrigieron cinco entradas del catálogo por tamaños de ventana inflados y un error de precios (2.2x de diferencia).

## Trazabilidad y Advertencias

Los trazos ahora registran qué backend sirvió cada paso, no solo qué modelo respondió. Esto es relevante para servicios como OpenRouter donde los slugs de modelo representan grupos con variaciones de precio de 8.8x. El registro de cambios retira algunas afirmaciones de rendimiento que comparaban erróneamente mediciones agrupadas.

Quedan limitaciones clave: los instaladores no están firmados (aunque los actualizadores sí), la gobernanza viene desactivada, y el resumidor de compactación está desactivado por defecto al no usarse en la práctica (0 activaciones en 137 ejecuciones medidas). La cancelación es cooperativa - las llamadas activas se completan antes de detenerse.

Ver [Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) para mediciones y registro completo de cambios. Para actualizar: `pip install --upgrade chimera-agent`.
