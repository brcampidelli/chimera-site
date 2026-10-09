---
title: "Chimera Agent 0.50.0: Visibilidad, Control y Fiabilidad"
date: 2026-10-09
category: update
summary: "Chimera Agent 0.50.0 introduce visibilidad en las tareas del agente, webhooks de aprobación, controles de gobernanza, recuperación híbrida y correcciones para las ventanas de contexto de los modelos."
version: "0.50.0"
---

## Visibilidad en las Tareas del Agente

Uno de los cambios más importantes en Chimera Agent 0.50.0 es la introducción de la visibilidad de las tareas. Anteriormente, el campo `RunState.tasks` existía pero nunca se poblaba, dejando a los usuarios sin saber qué estaba haciendo el agente. Ahora, el agente mantiene una lista de tareas que se muestra en pantalla durante la ejecución. Cada tarea se marca como en progreso o finalizada, y la lista sobrevive a la compactación de contexto. Esto significa que, incluso en ejecuciones largas, el agente no olvida su plan, proporcionando a los usuarios una visión clara de su progreso.

## Webhooks de Aprobación para Ejecuciones Desatendidas

Otra mejora importante es la capacidad del agente de solicitar aprobaciones incluso cuando no hay nadie en la consola. Al configurar la variable de entorno `CHIMERA_APPROVAL_WEBHOOK` con un webhook de canal, el agente puede ahora enviar preguntas de aprobación a un canal designado. Este cambio resuelve un problema anterior en el que las superficies desatendidas, incluyendo trabajos cron, tomaban decisiones silenciosamente sin la intervención del usuario. Ahora, si no hay forma de entregar la pregunta, el agente indica explícitamente que es `inaccesible`, asegurando transparencia.

## Controles de Gobernanza

El núcleo de gobernanza, que antes era invisible e inactivo, ahora puede activarse. El parámetro `CHIMERA_GOVERNANCE` viene `off` por defecto, pero los usuarios ahora tienen la capacidad de habilitarlo. La pantalla de Seguridad también indica el estado actual de la gobernanza, proporcionando a los usuarios el control y la visibilidad necesarios sobre esta característica crítica.

## Recuperación Híbrida en `chimera find`

El comando `chimera find` ha sido mejorado con recuperación híbrida, combinando métodos de búsqueda por palabras clave y vectorial. Este enfoque híbrido, que se fija antes de que comience la ejecución, ha demostrado superar a la búsqueda por palabras clave en 6.25 puntos en el propio corpus del proyecto. Es importante destacar que la búsqueda vectorial por sí sola tiene un rendimiento inferior en comparación con la búsqueda por palabras clave, por lo que el método híbrido es ahora el predeterminado. Este cambio asegura resultados de recuperación más precisos y fiables.

## Correcciones para las Ventanas de Contexto de los Modelos

Anteriormente, los modelos no incluidos en el catálogo verificado manualmente se asumían con una ventana de 128,000 tokens, lo que provocaba desbordamientos de contexto y fallos en la ejecución para modelos con ventanas más pequeñas. Esta versión soluciona este problema obteniendo la ventana de contexto del índice en vivo cuando el catálogo no conoce el modelo. Además, se corrigieron cinco entradas del catálogo para reflejar las ventanas de contexto reales proporcionadas por sus proveedores, y se ajustó un precio para que coincida con datos verificados.

## Mejoras Adicionales

Los rastreos ahora registran qué backend sirvió cada paso, no solo qué modelo respondió. Esto es especialmente importante para los modelos en OpenRouter, donde un solo slug de modelo puede representar un grupo de endpoints con ventanas de contexto y precios variables. Este cambio asegura que los usuarios tengan una comprensión más clara de los recursos que se están utilizando.

## Advertencias Honestas

- **Los instaladores no están firmados.** La primera ejecución muestra una advertencia de SmartScreen en Windows y una advertencia de Gatekeeper en macOS. Esto es esperado; el *actualizador* está firmado, que es la parte que importa para lo que llega a tu máquina después de la instalación.
- **La gobernanza viene `off`.** El control existe para que puedas activarlo, no porque esté activado.
- **El resumen de compactación viene desactivado**, detrás de `AgentConfig.summarise_compaction`. La compactación en sí nunca se ha activado en uso ordinario — medido 0 veces en 137 ejecuciones — por lo que el resumen está construido y no probado en lugar de construido y necesario.
- **La cancelación es cooperativa.** Detener una ejecución la detiene antes de su próxima llamada al modelo; las llamadas ya en curso terminan y se facturan.

Para más detalles, incluyendo las mediciones que informaron estos cambios, consulta el [changelog][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0).
