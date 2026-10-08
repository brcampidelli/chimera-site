---
title: "Chimera Agent 0.50.0: Visibilidad, Control y Búsqueda Híbrida"
date: 2026-10-08
category: update
summary: "Esta versión corrige comportamientos silenciosos, añade controles de gobernanza y mejora la recuperación con búsqueda híbrida."
version: "0.50.0"
---

## Las Tareas Ahora Son Visibles

Anteriormente, los agentes mantenían una lista interna de tareas que era inaccesible durante la ejecución. `RunState.tasks` existía, pero nunca se llenaba. Ahora, las tareas se muestran en tiempo real con marcadores de progreso, y la lista persiste a través de la compactación de contexto. Esto significa que los agentes de larga duración ya no pierden el rastro de sus propios planes durante la ejecución.

## Las Solicitudes de Aprobación Te Siguen

Los flujos de trabajo de aprobación asumían previamente que siempre había alguien atendiendo una consola. Tres superficies no atendidas—incluyendo trabajos cron—podían solicitar entrada humana, pero no tenían forma de entregar la pregunta si nadie estaba mirando. Configurar `CHIMERA_APPROVAL_WEBHOOK` ahora dirige las solicitudes de aprobación a un canal especificado. Los sistemas sin capacidad de entrega informan correctamente `unreachable` en lugar de fallar en silencio.

## La Gobernanza Puede Activarse

El registro de auditoría de seguridad era anteriormente una característica pasiva sin mecanismo de activación. `CHIMERA_GOVERNANCE` ahora proporciona un control para activarlo, y la pantalla de Seguridad muestra explícitamente su estado actual. Esto se implementó porque tener un registro de auditoría que no se podía activar no tenía ningún propósito práctico.

## La Búsqueda Híbrida Supera a las Palabras Clave

`chimera find` usaba previamente búsqueda por palabras clave o vectorial, con la decisión tomada después de iniciar la ejecución. La recuperación híbrida—combinando ambos métodos—ahora supera las búsquedas solo por palabras clave en 6.25 puntos (p = 1.7e-04) en el corpus propio del proyecto. La búsqueda vectorial sola tiene un rendimiento inferior a las palabras clave, por lo que el enfoque híbrido es ahora el predeterminado. El sistema también calcula los costos por adelantado.

## Correcciones de Compatibilidad de Modelos

Los agentes asumían que los modelos no catalogados tenían una ventana de 128,000 tokens, lo que causaba fallos para los 31 modelos en el índice que realmente soportan 64,000 tokens o menos. El sistema ahora verifica el índice en vivo para modelos desconocidos. También se corrigieron cinco entradas del catálogo por tamaños de ventana inexactos, y se solucionó un error de precios (2.2x fuera de lo esperado).

## Visibilidad del Backend en los Trazos

Los trazos ahora registran qué backend sirvió cada paso, no solo qué modelo respondió. Esto es importante porque los slugs de modelos en OpenRouter pueden representar grupos con capacidades muy variadas—un grupo abarca endpoints con diferencias de 5x en ventanas de contexto y variaciones de precio de 8.8x. Las afirmaciones anteriores sobre el rendimiento de modelos específicos en realidad medían grupos; el changelog retira los benchmarks afectados.

### Qué Hacer Ahora

Actualiza a 0.50.0 y revisa el [changelog completo][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) para detalles de implementación. Activa la gobernanza si es necesario, y prueba la búsqueda híbrida con `chimera find`.
