---
title: "Chimera Agent 0.49.0: El diálogo de actualización ahora habla tu idioma"
date: 2026-09-05
category: update
summary: "Chimera Agent 0.49.0 introduce diálogos de actualización localizados y una verificación manual de actualizaciones, mejorando la experiencia del usuario en diez idiomas."
version: "0.49.0"
---

## Diálogo de actualización en tu idioma

Chimera Agent ahora soporta diálogos de actualización localizados en diez idiomas. Anteriormente, el diálogo de actualización solo se mostraba en inglés, independientemente del idioma seleccionado dentro de la aplicación. Esta inconsistencia ha sido resuelta, asegurando que el diálogo de actualización siga la configuración de idioma del sistema operativo. Este cambio es especialmente beneficioso para usuarios que dependen del idioma predeterminado de su sistema, ya que la detección de idioma de la aplicación recurre a la misma configuración.

Además, el menú de la bandeja del sistema ahora incluye una opción **Buscar actualizaciones**, proporcionando a los usuarios una forma manual de verificar si hay actualizaciones disponibles. La verificación automática de actualizaciones, que se ejecuta una vez al inicio, sigue siendo silenciosa cuando no se encuentran actualizaciones para evitar interrupciones innecesarias. Sin embargo, la verificación manual informa explícitamente a los usuarios si están al día o si la verificación falló, abordando el problema anterior donde el silencio después de un clic podía malinterpretarse como una función rota.

## Diálogos de fallos y diagnósticos

Los diálogos de fallos del backend y la opción Salir en la bandeja del sistema también han sido traducidos. Sin embargo, la información de diagnóstico permanece en su idioma original. Esta distinción es crucial: **lo que te dice qué hacer está traducido, pero lo que va en un informe de errores no lo está.** Por ejemplo, mientras que el mensaje de error que explica el problema se muestra en tu idioma, la ruta, el error del sistema operativo y el stderr del backend permanecen textuales. Esto asegura que los usuarios puedan buscar soluciones y reportar errores de manera efectiva sin encontrarse con barreras de idioma.

## Lo que permanece sin cambios

Esta actualización no altera el mecanismo de actualización en sí. La verificación automática sigue ejecutándose en cada inicio, y el proceso de instalación sigue siendo iniciado por el usuario, requiriendo consentimiento explícito antes de proceder. No hay una verificación periódica mientras la aplicación está en ejecución. Además, es importante destacar que la versión que muestra el diálogo de actualización es la que está actualmente instalada, no la que se está ofreciendo. Esto significa que el aviso que te ofrece la versión 0.49.0 es generado por la versión que estás utilizando actualmente.

Para más detalles, consulta la [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
