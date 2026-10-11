---
title: "Chimera Agent 0.49.3: Errores más claros, modelos actualizados"
date: 2026-10-03
category: update
summary: "Seis correcciones para mensajes confusos y configuraciones obsoletas, todas identificadas al construir proyectos reales con el framework."
version: "0.49.3"
---

## Cuando MCP bloquea escrituras

La lectura de datos a través de MCP antes contaminaba ejecuciones sin explicar por qué fallaban las escrituras. El mensaje de error agrupaba tres escenarios distintos: denegación del usuario, configuración del propietario y casos donde ningún humano podría aprobar una solicitud HTTP. Los usuarios veían mensajes idénticos para los tres, perdiendo tiempo y presupuesto en reintentos que nunca funcionarían. Ahora cada caso tiene una explicación específica — especialmente crucial en contextos HTTP donde el mensaje indica claramente que la aprobación es imposible y sugiere habilitar pausas-para-aprobación o evitar contenido no confiable.

## Pruebas que realmente prueban

El botón de prueba MCP antes verificaba conectividad del servidor mientras ocultaba silenciosamente si los agentes podían usar esas herramientas. Un servidor podía pasar la prueba mientras sus herramientas seguían inaccesibles para agentes (cuando la carga de servidores MCP al inicio estaba desactivada). Ahora la prueba reporta tanto conectividad como disponibilidad real, con mensajes distintos que explican cómo resolver cada problema potencial.

## Verificación vs. Entrega

La verificación de ejecuciones antes mostraba `verified: True` sin indicar si los archivos actuales coincidían con los verificados. Una ejecución verificada podía luego contener contenido completamente diferente (20/20 fallos en un caso observado) sin indicación visual. Ahora las ejecuciones rastrean `delivered_matches_verified` y muestran distintivos claros cuando el contenido en disco diverge del estado verificado.

## Modelos predeterminados actualizados

La selección de modelos por defecto se había quedado atrás:
- Modelo base cambió de `deepseek-chat-v3.1` (0.25/0.95) a `deepseek-v4-flash-0731` (0.065/0.18)
- Modelo premium reemplazó `deepseek-r1` por `z-ai/glm-5.3`
- Modelos para jueces de fusión y paneles actualizados a generaciones actuales

Estos cambios reflejan mejoras medibles en precio, tamaño de ventana de contexto y benchmarks de terceros — no afirmaciones de calidad no verificadas. La actualización también elimina modelos en vista previa de posiciones predeterminadas donde usuarios no los eligieron explícitamente.

## Otras correcciones
- Errores de instalación de skills ahora identifican correctamente qué host rechazó la solicitud
- Permisos de escritura en rutas absolutas muestran comparaciones claras con patrones glob relativos al workspace
- `.env.example` ya no sugiere modelos obsoletos o precios incorrectos

Actualiza con `pip install --upgrade chimera-agent` o consulta [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3) para detalles completos.
