---
title: "Chimera Agent 0.49.2: Correcciones para el actualizador y el instalador"
date: 2026-10-01
category: update
summary: "Chimera Agent 0.49.2 soluciona problemas críticos en el actualizador y el instalador, garantizando actualizaciones más fluidas y un reporte correcto de versiones."
version: "0.49.2"
---

## El actualizador ahora verifica cada seis horas

Anteriormente, la verificación de actualizaciones en Chimera Agent solo se ejecutaba al iniciar la aplicación, lo que significaba que, si la app permanecía abierta, nunca detectaría nuevas versiones. Este problema era especialmente crítico para una herramienta como Chimera, diseñada para permanecer en ejecución por largos períodos. Como resultado, los usuarios debían buscar manualmente las actualizaciones en el sitio web, anulando el propósito de un actualizador automático.

Con la versión 0.49.2, el actualizador ahora verifica nuevas versiones cada seis horas mientras la aplicación está en ejecución. Este cambio garantiza que los usuarios reciban notificaciones oportunas sin necesidad de intervención manual. Adicionalmente, el actualizador recuerda las versiones rechazadas durante el proceso, evitando solicitudes repetidas para la misma actualización, a menos que exista una versión más reciente disponible.

## Corrección del instalador entra en vigor

La versión 0.49.1 introdujo una solución para un problema del instalador que dejaba archivos residuales de la versión anterior, causando que la aplicación reportara incorrectamente su versión y ofreciera actualizaciones de sí misma. Sin embargo, esta corrección solo se aplicaba al instalador incluido en esa versión, no al utilizado para instalarla.

En la 0.49.2, el instalador reparado ahora se usa para actualizaciones in situ, asegurando que la versión correcta se reporte después de una actualización. Si actualizaste a la 0.49.1 y experimentaste el problema de reporte de versión, esta versión lo resuelve.

## Mejoras adicionales

Otras mejoras en esta versión incluyen retrasar el marcado de versiones como "más reciente" hasta que su manifiesto esté adjunto, evitando que el endpoint del actualizador devuelva un error 404 durante el proceso de compilación. Los diálogos de error y la bandeja del sistema ahora usan el idioma del usuario, mientras que los diagnósticos técnicos permanecen sin traducir para facilitar la búsqueda de mensajes de error. Los modos de costo del asistente de primera ejecución también se han localizado, evitando el problema previo de mostrar términos en inglés en pantallas traducidas.

Para una lista completa de cambios, consulta la [Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).
