---
title: "Chimera Agent 0.49.2: Correcciones en la fiabilidad del actualizador e instalador"
date: 2026-10-02
category: update
summary: "Esta versión garantiza que el actualizador verifique nuevas versiones periódicamente y corrige un problema del instalador que causaba reportes incorrectos de versión."
version: "0.49.2"
---

## El Actualizador Ahora Funciona como Debe

Antes, el actualizador solo buscaba nuevas versiones una vez—al iniciar. Esto era un problema para Chimera Agent, que suele permanecer abierto por largos períodos. Si se lanzaba una nueva versión con la app en ejecución, los usuarios no lo sabían a menos que verificaran manualmente o reiniciaran. Esto generaba situaciones donde las actualizaciones se perdían por completo, obligando a descargar instaladores directamente desde el sitio web.

Ahora, el actualizador verifica cada seis horas mientras la app está en uso. Este cambio asegura que los usuarios reciban notificaciones de nuevos lanzamientos oportunamente, sin intervención manual. Para evitar molestias innecesarias, rechazar una actualización recuerda esa versión durante la sesión actual, pero versiones más nuevas seguirán activando una nueva verificación. Las comprobaciones manuales desde el menú de la bandeja siempre notifican, independientemente de rechazos previos.

## Corrección del Instalador Entra en Vigor

La versión 0.49.1 introdujo una corrección para un problema del instalador donde las actualizaciones dejaban archivos residuales de la versión anterior. Esto hacía que la app reportara incorrectamente su versión, creando un bucle donde seguía ofreciéndose a sí misma como actualización. Sin embargo, esa corrección solo aplicaba a instaladores nuevos—no a los usados para actualizaciones in situ. Con 0.49.2, el instalador reparado ahora se usa también para actualizaciones, garantizando que el reporte de versión sea preciso tras una actualización.

## Otras Mejoras de 0.49.1

- Los lanzamientos ahora se retrasan para marcarse como "latest" hasta que sus artefactos de compilación estén completamente listos, evitando errores 404 durante la ventana de compilación.
- Los diálogos de error y mensajes en la bandeja están localizados, mientras los diagnósticos técnicos permanecen en inglés para facilitar búsquedas.
- Las opciones de modo de costo en el asistente de primera ejecución ahora están correctamente traducidas.

Para obtener las últimas correcciones, ejecuta el actualizador o descarga la nueva versión desde las [notas de lanzamiento][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).

[Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2): CHANGELOG.md
