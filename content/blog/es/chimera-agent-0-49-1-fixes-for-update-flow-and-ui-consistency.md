---
title: "Chimera Agent 0.49.1: Correcciones en el flujo de actualización y consistencia de la UI"
date: 2026-09-12
category: update
summary: "La versión 0.49.1 soluciona problemas críticos de actualización, mejora la consistencia de la interfaz y corrige lagunas de traducción en el asistente de primera ejecución."
version: "0.49.1"
---

## Correcciones en el flujo de actualización

Uno de los problemas más importantes resueltos en Chimera Agent 0.49.1 afecta al mecanismo de actualización. Anteriormente, tras una actualización in situ, el proceso en segundo plano reportaba incorrectamente la versión anterior debido a un archivo `dist-info` residual de la instalación previa. Esto ocurría porque el paquete de PyInstaller conservaba tanto los archivos de la versión antigua como los de la nueva, haciendo que `importlib.metadata` devolviera la primera versión que encontraba. Como resultado, la aplicación seguía ofreciendo una actualización a la versión que ya estaba ejecutando, generando confusión y avisos innecesarios.

Para solucionarlo, el instalador ahora elimina el paquete antiguo antes de escribir el nuevo, asegurando que solo se reconozca la versión correcta. Sin embargo, esta corrección aplica al instalador incluido en 0.49.1, no al usado para instalarla. Los usuarios que actualicen desde 0.49.0 podrían seguir experimentando el problema hasta la próxima actualización. Una solución manual implica borrar el archivo `dist-info` obsoleto y reiniciar la app.

Otro problema relacionado afectaba a la actualización automática. Durante aproximadamente veinticinco minutos después de cada lanzamiento, el actualizador fallaba porque el endpoint `releases/latest/download/latest.json` devolvía un error 404 mientras las builds aún estaban en proceso. Este fallo pasó desapercibido porque el actualizador silenciaba los errores. Ahora, los lanzamientos se retienen con `--latest=false` hasta que todas las builds finalizan, garantizando que el endpoint siempre apunte a un release válido.

## Consistencia de UI y correcciones de traducción

El panel de 'nueva versión disponible' antes formulaba una pregunta que no podía responder. El encabezado decía 'Hay una nueva versión. ¿Actualizar?', pero solo ofrecía botones para ver el release o descartar el panel. Al residir en el webview sin IPC hacia el actualizador en Rust, no podía iniciar una actualización. Ahora el panel simplemente informa sobre la disponibilidad y dirige a los usuarios a la opción 'Buscar actualizaciones' en la bandeja del sistema.

Además, el asistente de primera ejecución tenía un hueco de traducción en el desplegable de modo de costo, que mostraba valores crudos (`auto / cheap / balanced / premium`) en lugar de etiquetas traducidas. Esta inconsistencia se corrigió, alineando el asistente con la pantalla de Configuración, que ya usaba las etiquetas traducidas. Los valores siguen en inglés para coincidir con lo que espera el servidor.

Para detalles completos, consulta las [notas de lanzamiento][Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1).

[Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1): CHANGELOG.md
