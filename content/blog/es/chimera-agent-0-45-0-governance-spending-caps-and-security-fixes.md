---
title: "Chimera Agent 0.45.0: Gobernanza, límites de gasto y correcciones de seguridad"
date: 2026-08-16
category: update
summary: "Esta versión implementa configuraciones de seguridad por defecto, añade controles de gasto y extiende la gobernanza a todas las superficies no supervisadas."
version: "0.45.0"
---

## Configuraciones de Seguridad Que Realmente Son Por Defecto

La versión anterior se envió con una configuración insegura: puertos abiertos, sin autenticación y sin advertencias. Esto no fue un descuido—fue una decisión consciente para priorizar la facilidad de configuración sobre la seguridad, pero el equilibrio estaba mal. Ahora `serve` se niega a vincularse a direcciones que no sean de loopback sin un token, y la configuración de Docker solo publica en `127.0.0.1`. Si necesitas exponer la puerta de enlace, debes optar explícitamente con `--allow-insecure-bind` o establecer `CHIMERA_SERVER_TOKEN`.

Esto rompe las implementaciones existentes que dependían del comportamiento anterior. La solución es sencilla, pero era un cambio necesario: una puerta de enlace de agente accesible para cualquiera en la red es un riesgo, no una característica.

## Límites de Gasto Que Funcionan

Antes de esta versión, el único control de gasto era un contador de pasos. Un trabajo en un bucle de reintentos podía agotar tus créditos de API sin advertencia. Ahora hay tres límites separados: por ejecución, por trabajo y un agregado diario. Si una llamada no puede ser tarifada, la ejecución se detiene en lugar de continuar sin control. Los modelos locales se tratan como gratuitos en lugar de desconocidos, por lo que los límites no bloquean la única configuración que no puede gastar en exceso.

`chimera doctor` verifica si tu modelo predeterminado puede ser tarifado. Esto evita sorpresas cuando intentas establecer un límite de gasto.

## Gobernanza Que Cubre Todas las Superficies

Cinco componentes diferentes (`serve`, cron, MCP, A2A y adaptadores de mensajería) tenían cada uno su propio registro mínimo de herramientas. Ahora comparten una única pila `governed_profile()`, reforzada por una verificación AST en tiempo de compilación. La idea clave es que `CHIMERA_GOVERNANCE=observe` es más útil que `enforce`—registra lo que habría sido bloqueado sin realmente bloquear nada, para que puedas medir el impacto antes de activarlo.

Esta versión también conecta el sistema de aprobación que existía pero no estaba enlazado. Las llamadas de clase peligrosa que leen datos externos ahora tienen a alguien al otro lado de la puerta, reduciendo el bloqueo excesivo sin comprometer la seguridad.

## Qué Sigue

Ejecuta `chimera doctor` para verificar tu configuración, luego revisa tu implementación si estabas vinculando a `0.0.0.0`. Los cambios completos están en [Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
