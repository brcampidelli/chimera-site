---
title: "Chimera Agent 0.45.0: Gobernanza, Control de Costos y Correcciones de Seguridad para Ejecuciones Automatizadas"
date: 2026-08-16
category: update
summary: "Esta versión fortalece la ejecución automatizada con autenticación obligatoria, límites de gasto y gobernanza unificada en todas las superficies."
version: "0.45.0"
---

## Seguridad Primero: Enlace y Autenticación

Versiones anteriores de Chimera Agent exponían una puerta de enlace sin autenticar en todas las interfaces de red por defecto. El `docker-compose.yml` publicaba el puerto 8765 globalmente, y `.env.example` se distribuía sin token configurado. Esto significaba que una implementación con un solo comando podía crear inadvertidamente una puerta de enlace abierta accesible para cualquiera que descubriera el puerto.

v0.45.0 cambia esto en tres aspectos:
- El comando `serve` ahora rechaza enlazar a direcciones no loopback sin un token de autenticación
- Docker Compose ahora publica solo en `127.0.0.1` por defecto
- Existe una bandera explícita `--allow-insecure-bind` para casos legítimos (como proxies autenticados)

Este es un cambio disruptivo para implementaciones que acceden a la puerta de enlace desde otra máquina. Configure `CHIMERA_SERVER_TOKEN` o use la opción de escape si es necesario.

## Control de Gastos que Realmente Funciona

Antes de esta versión, los únicos límites eran contadores de pasos: un trabajo en un bucle de reintentos podía agotar todo tu saldo con el proveedor. v0.45.0 introduce tres techos de gasto separados:
1. Límite por ejecución
2. Límite por trabajo (para tareas programadas)
3. Límite diario agregado que evita que se activen trabajos cron

Las llamadas sin precio ahora detienen la ejecución en lugar de continuar silenciosamente. Los modelos locales se tratan como de costo cero en lugar de desconocido, evitando que los límites bloqueen la única configuración que no puede gastar de más. Ejecuta `chimera doctor` para verificar si tu modelo predeterminado puede tener precio antes de establecer límites.

## Gobernanza Unificada en Todas las Superficies

Anteriormente, cada superficie de ejecución (`serve`, cron, MCP, A2A y adaptadores de mensajería) construía su propio registro de herramientas. Ahora un único `governed_profile()` construye la pila para las cinco, con verificaciones AST en tiempo de compilación que evitan regresiones.

La clave: el modo `CHIMERA_GOVERNANCE=observe` existe para medir el costo de la aplicación antes de activarla. Ejecuta toda la pila mientras solo registra lo que se bloquearía, proporcionando datos concretos sin forzar un riesgo en producción. El valor predeterminado sigue siendo `off`: la gobernanza debe ser una opción explícita.

Esta versión también activa el sistema de aprobación para llamadas de clase peligrosa, eliminando bloqueos excesivos (falsos positivos) sin reducir la efectividad contra ataques.

## Próximos Pasos

Actualiza con `pip install --upgrade chimera-agent` y revisa la autenticación y límites de gasto de tu implementación. Para integración con editores, apunta la configuración del agente de tu editor a `chimera acp --workspace <repo>`. Detalles completos en las [notas de la versión][Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
