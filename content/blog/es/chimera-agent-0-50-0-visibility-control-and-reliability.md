---
title: "Chimera Agent 0.50.0: Visibilidad, Control y Fiabilidad"
date: 2026-10-07
category: update
summary: "Chimera Agent 0.50.0 introduce transparencia, mejor control y correcciones para fallos silenciosos."
version: "0.50.0"
---

## Visibilidad en las Operaciones del Agente

Anteriormente, la lista de tareas del agente era invisible para los usuarios, a pesar de que existía el campo `RunState.tasks`. Ahora, el agente muestra su lista de tareas en tiempo real, marcando elementos como en progreso o completados. Esta lista persiste a través de la compactación de contexto, asegurando que las ejecuciones largas no pierdan el rastro de sus planes. Este cambio aborda una frustración común donde los usuarios no podían ver qué estaba haciendo el agente, especialmente durante operaciones prolongadas.

## Accesibilidad Más Allá de la Consola

Los agentes que se ejecutan sin supervisión, como los trabajos cron, no podían comunicarse eficazmente con los usuarios cuando se necesitaba aprobación. Al configurar `CHIMERA_APPROVAL_WEBHOOK`, los usuarios ahora pueden recibir solicitudes de aprobación en sus canales preferidos. Este cambio asegura que los agentes puedan llegar a los usuarios incluso cuando nadie está monitoreando activamente la consola. Anteriormente, estas solicitudes fallaban silenciosamente si no había un método de entrega disponible, lo que llevaba a decisiones inesperadas.

## Control de Gobernanza

La función de gobernanza, que incluye un registro de auditoría, anteriormente era inaccesible. Aunque la pantalla de Seguridad mostraba el registro de auditoría, no había forma de habilitarlo. Ahora, los usuarios pueden activar la gobernanza usando el parámetro `CHIMERA_GOVERNANCE`. Este cambio proporciona a los usuarios la capacidad de monitorear y controlar los ajustes de seguridad de su agente, abordando una brecha en la transparencia y el control.

## Mejora en el Manejo de Modelos

Los agentes anteriormente asumían un tamaño de ventana de tokens predeterminado para modelos no catalogados explícitamente, lo que llevaba a desbordamientos de contexto y fallos en las ejecuciones. Con esta versión, el agente ahora recupera el tamaño correcto de la ventana de tokens del índice en vivo para modelos no catalogados. Además, se corrigieron cinco entradas del catálogo para reflejar ventanas de tokens y precios precisos. Este cambio evita que las ejecuciones fallen debido a suposiciones incorrectas sobre las capacidades de los modelos.

## Trazabilidad Mejorada

Los rastreos ahora registran qué backend sirvió cada paso, no solo qué modelo respondió. Esto es especialmente importante para modelos como los de OpenRouter, donde un solo slug de modelo puede representar un grupo de endpoints con capacidades y costos variables. Anteriormente, los usuarios no podían distinguir entre diferentes endpoints, lo que llevaba a confusión y mediciones inexactas. Este cambio mejora la transparencia y precisión en el seguimiento del rendimiento.

## Qué Hacer a Continuación

Para aprovechar estas mejoras, actualiza a Chimera Agent 0.50.0 y revisa las [notas de la versión][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) para obtener instrucciones detalladas sobre cómo configurar nuevas funciones como `CHIMERA_APPROVAL_WEBHOOK` y `CHIMERA_GOVERNANCE`.
