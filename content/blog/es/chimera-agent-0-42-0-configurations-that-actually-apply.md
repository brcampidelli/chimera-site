---
title: "Chimera Agent 0.42.0: Configuraciones Que Realmente Se Aplican"
date: 2026-08-11
category: update
summary: "Corregimos siete configuraciones que se guardaban pero no cambiaban el comportamiento, unificamos los controles de seguridad y permitimos que los agentes sean configurables en lugar de aceptar valores por defecto."
version: "0.42.0"
---

## Configuraciones Que Ahora Se Aplican

Siete configuraciones que antes se guardaban sin tener efecto—modelo por defecto, caché de respuestas, endpoint personalizado, timeout, cadena de fallback y caché de prompts. El `LLMGateway` capturaba las configuraciones al construirse, pero `chimera app` lo construía una vez por proceso. Ahora seis se actualizan en vivo. Tres (cascada, persistencia de chat, memoria de chat) se aplican a la **próxima conversación** y lo indican. Dos que requieren reinicio (demonio del scheduler y autoload de MCP) lo declaran. Las etiquetas ahora vienen del servidor, evitando desalineaciones silenciosas.

## Controles de Seguridad Unificados

`CHIMERA_TOOL_ALLOWLIST` y `CHIMERA_TOOL_DENYLIST` antes solo afectaban a `chimera run` y `chimera solve`. Otras superficies (app, API, trabajos por lotes, bots de mensajería) las ignoraban por completo. Ahora se aplican en todas partes. Las denegaciones **se combinan**—las restricciones de despliegue, solicitud y postura deben permitir una herramienta. Los permisos **se intersectan**, evitando que las solicitudes excedan el alcance del remitente. Se corrigió que `explore_repository` evitaba los filtros debido a un registro tardío.

## Identidad e Instrucciones del Agente

El nombre, idioma e instrucciones permanentes del agente antes no funcionaban. `profile.json` no era leído por la API, los hechos de la persona solo se aplicaban cuando eran relevantes para un turno, y el espacio de preámbulo incondicional estaba reservado para compatibilidad con REPL/OpenAI. Ahora se aplican a la edición de código, ejecución autónoma y mensajería. Las instrucciones **se añaden**—los prompts por defecto mantienen las protecciones de seguridad, y los bloques personalizados advierten cuando no otorgan capacidades.

## Postura de Despliegue Como Base

El alcance de ejecución, los requisitos de aprobación y los permisos de comandos del host estaban dispersos en componentes eliminados, pares codificados y una variable de entorno rechazada por `PATCH /api/config`. Ahora están consolidados en una sola tarjeta. La postura de despliegue es una **base**, no un valor por defecto—los clientes no pueden anular silenciosamente las restricciones en máquinas que no controlan. La ejecución en el host requiere confirmación explícita.

## Qué Hacer Ahora

Ejecuta `chimera app update` y revisa [Chimera Agent v0.42.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.42.0) para detalles sobre agentes a nivel de proyecto, correcciones de auditoría de seguridad y activación de tarjetas de habilidades.
