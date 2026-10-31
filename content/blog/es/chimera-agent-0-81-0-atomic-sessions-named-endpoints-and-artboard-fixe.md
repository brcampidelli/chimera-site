---
title: "Chimera Agent 0.81.0: Sesiones atómicas, endpoints con nombre y correcciones en artboards"
date: 2026-10-31
category: update
summary: "La escritura de sesiones ahora es atómica, los artboards HTML incluyen sus propias fuentes e imágenes, y puedes enrutar modelos a endpoints con nombre compatibles con OpenAI."
version: "0.81.0"
---

## Las sesiones ya no se corrompen con turnos en paralelo

Reabrir una conversación de Code solía reescribir su archivo de sesión en el mismo lugar. La escritura partía de una lectura tomada antes de una espera de hasta diez segundos. Durante esa ventana, otro lector o un crash veían medio archivo. Los turnos guardados en ese intervalo se perdían. Con muchos turnos en paralelo, esto dañó varias sesiones y sus copias de seguridad.

La solución hace que las escrituras de sesión sean atómicas, se vacíen a disco y se bloqueen entre procesos. El paso de reapertura ahora fusiona solo los campos que realmente aprendió. Dejas de perder turnos por una condición de carrera entre una lectura y una escritura diferida. Si ejecutas múltiples agentes contra la misma sesión, o reinicias mientras un turno está en vuelo, el archivo se mantiene íntegro.

## Los artboards HTML obtienen sus propios recursos e inspector

Antes de esta versión, un artboard HTML tomaba las fuentes de una lista a nivel de token escrita como un único nombre entrecomillado. Las pantallas recurrían a una tipografía con serifa en el lienzo y en las exportaciones. El inspector siempre mostraba el primer artboard, por lo que una segunda pantalla HTML no podía acceder a sus ajustes ni seleccionar sus elementos.

Ahora cada diseño mantiene su propio almacén de imágenes y fuentes. Añades imágenes PNG, JPEG, WebP o GIF, y fuentes WOFF2, WOFF o TTF, desde el asistente. El asistente sabe qué recursos existen. Las pantallas y exportaciones los usan. Se rechazan archivos SVG y enmascarados. En el lienzo, los recursos llegan como datos inline, de modo que la pantalla aislada en sandbox sigue sin acceso a la red.

Al hacer clic en un artboard o en su etiqueta, este se convierte en el activo. El inspector lo sigue. Una segunda pantalla HTML obtiene su propia selección de elementos y ajustes de estilo. Las fuentes del sistema de diseño se renderizan en el lienzo y en las exportaciones.

## Los endpoints con nombre reemplazan la URL base global

Enrutar modelos a un proveedor compatible con OpenAI significaba antes establecer `CHIMERA_API_BASE` de forma global. Cada modelo pasaba por esa única base. No podías mezclar proveedores en una misma configuración sin proxy propio.

`CHIMERA_ENDPOINTS` lista endpoints por nombre. Cada entrada declara una URL base y la variable que contiene su clave. Un modelo escrito como `endpoint/<nombre>/<modelo>` va a ese endpoint con su propia base y clave, junto a OpenRouter. La tarjeta de privacidad, los recibos y el panel de Uso nombran el endpoint y su host. `/api/endpoints` los lista y prueba.

Esto aterriza como parte del trabajo de enrutamiento multi-proveedor. Mantienes claves separadas para proveedores separados, y el agente enruta cada modelo a la base correcta sin un proxy por delante.

## Los conectores que nombras en un mensaje se conectan durante ese turno

Con la autocarga MCP desactivada, un turno de Code cuyo mensaje nombra un conector configurado y habilitado conecta solo ese. El turno lo indica y mantiene el conector para turnos posteriores que lo nombren. El texto proveniente de herramientas, páginas o archivos nunca activa un conector. Los bots mantienen su propia lista.

Esto evita que una mención en un documento recuperado habilite silenciosamente un conector que no pretendías usar. Tú controlas la conexión mediante lo que escribes en el mensaje.

## Correcciones menores que eliminan fricción

Un mensaje que nombra Chimera Design mientras pide una ruta de código, un comando pytest, o palabras como fix, implement o test ya no abre el lienzo. El sistema deja de interpretar el trabajo de ingeniería como una solicitud de diseño.

La tarjeta de detalle de un conector URL ya no afirma que probar inicia un comando o que npx puede descargar un paquete. Un servidor en loopback ya no lleva la etiqueta de "alcanza la red". Lo que la tarjeta describe ahora coincide con lo que el conector realmente hace.

## Consíguelo

Instala o actualiza con pip:

```
pip install chimera-agent --upgrade
```

Lee el changelog completo en [Chimera Agent v0.81.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.81.0).
