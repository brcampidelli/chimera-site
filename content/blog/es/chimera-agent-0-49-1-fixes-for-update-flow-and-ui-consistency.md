---
title: "Chimera Agent 0.49.1: Correcciones en el flujo de actualización y consistencia de la UI"
date: 2026-09-15
category: update
summary: "Chimera Agent 0.49.1 soluciona problemas críticos en el proceso de actualización, la consistencia de la interfaz de usuario y las lagunas en las traducciones, garantizando un funcionamiento más fluido y una interacción más clara para el usuario."
version: "0.49.1"
---

## Mejoras en el proceso de actualización

El mecanismo de actualización en Chimera Agent 0.49.0 tenía un fallo importante: el proceso del backend informaba incorrectamente la versión debido a archivos residuales de instalaciones anteriores. En concreto, el paquete de PyInstaller conservaba los directorios `dist-info` tanto de la versión antigua como de la nueva, lo que hacía que `importlib.metadata` devolviera la versión incorrecta. Esto provocaba que la aplicación sugiriera constantemente una actualización a la versión que ya estaba instalada. Ahora, el instalador elimina el paquete antiguo antes de escribir el nuevo, asegurando que solo se informe la versión correcta. Ten en cuenta que esta corrección se aplica al instalador incluido en 0.49.1, no al que instala esta versión. Si estás actualizando desde 0.49.0, es posible que aún veas un `dist-info` obsoleto hasta la próxima actualización.

## Fiabilidad de la actualización automática

Se descubrió otro problema en el mecanismo de actualización automática. Durante aproximadamente veinticinco minutos después de cada lanzamiento, el actualizador fallaba porque el endpoint `latest.json` devolvía un error 404. Esto ocurría porque el lanzamiento se marcaba como "último" antes de que se completaran todas las compilaciones para las distintas plataformas. Ahora, los lanzamientos se retienen con `--latest=false` y solo se promocionan una vez que se adjunta el manifiesto. Esto garantiza que el endpoint siempre resuelva un lanzamiento válido, mejorando la fiabilidad y evitando que se ofrezcan lanzamientos defectuosos.

## Consistencia y claridad en la UI

El panel de "nueva versión disponible" planteaba antes una pregunta que no podía responder: *"Hay una nueva versión disponible. ¿Actualizar?"* Sin embargo, el panel solo ofrecía opciones para ver el lanzamiento o descartar la notificación, sin ninguna funcionalidad real de actualización. Ahora, el panel simplemente indica que hay una nueva versión disponible y dirige a los usuarios a la opción **Buscar actualizaciones** en la bandeja del sistema. Este cambio elimina la confusión y alinea la interfaz con sus capacidades reales.

## Correcciones en las traducciones

El asistente de primera ejecución tenía un problema menor pero notable en las traducciones: el menú desplegable del modo de coste mostraba valores crudos (`auto / cheap / balanced / premium`) en lugar de sus equivalentes traducidos. Aunque las etiquetas existían y estaban traducidas, no se estaban utilizando en este contexto. Esta inconsistencia ha sido resuelta, asegurando que el menú desplegable muestre ahora las etiquetas traducidas correctas, consistentes con la pantalla de Configuración.

Para más detalles, consulta las [notas de lanzamiento][Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1). Para actualizar, ejecuta `chimera-desktop --update` o descarga la última versión desde el sitio oficial.
