---
title: "Chimera Agent 0.49.0: Diálogo de Actualización Multilingüe y Comprobaciones Solicitadas por el Usuario"
date: 2026-09-06
category: update
summary: "Chimera Agent 0.49.0 introduce soporte multilingüe para el diálogo de actualización y añade una opción de comprobación manual de actualizaciones en la bandeja del sistema."
version: "0.49.0"
---

## Diálogo de Actualización Multilingüe y Comprobación Manual de Actualizaciones

Chimera Agent ahora habla tu idioma en todas partes, incluyendo el diálogo de actualización. Anteriormente, este diálogo solo estaba en inglés, independientemente del idioma configurado en la aplicación. Esto se ha corregido, y ahora el diálogo sigue el idioma de tu sistema operativo. Este cambio garantiza que los usuarios que no han modificado el idioma de la aplicación verán el diálogo en el idioma de su sistema, mientras que aquellos que lo han personalizado seguirán viéndolo en inglés.

Además, la bandeja del sistema ahora incluye una opción **Comprobar actualizaciones**. Esta es la primera forma de solicitar manualmente una comprobación de actualizaciones. La comprobación automática se ejecuta una vez al inicio y permanece silenciosa si no hay actualizaciones para evitar molestar al usuario. Sin embargo, este silencio podría malinterpretarse como un fallo, llevando a los usuarios a reiniciar la aplicación innecesariamente. Con la nueva comprobación manual, los usuarios pueden confirmar que su aplicación está actualizada o recibir retroalimentación si la comprobación falla.

## Diálogos de Fallo Traducidos y Diagnósticos Sin Modificar

El diálogo de actualización no es la única parte de la aplicación que ha sido traducida. Los dos diálogos de fallo del backend y la opción **Salir** de la bandeja del sistema también están ahora disponibles en varios idiomas. Sin embargo, hay una clara distinción entre lo que se traduce y lo que no:

> **Lo que te dice qué hacer está traducido. Lo que va a un informe de errores no.**

Por ejemplo, si el backend falla, el mensaje de error estará en tu idioma, pero la ruta, el error del sistema y el stderr del backend permanecerán en su forma original. Esto asegura que los usuarios puedan seguir buscando y entendiendo los errores del sistema sin confusión.

## Lo que Permanece Sin Cambios

Esta actualización no modifica el mecanismo de actualización en sí, que ha sido funcional desde la versión 0.48.0. La comprobación automática sigue ejecutándose en cada inicio, y el proceso de instalación sigue siendo iniciado por el usuario. No hay una comprobación periódica mientras la aplicación está en ejecución.

Un aspecto contraintuitivo permanece: **la versión que te muestra el diálogo es la que ya tienes instalada**, no la que se te está ofreciendo. Esto significa que el mensaje que te ofrece la versión 0.49.0 es generado por la versión que estás ejecutando actualmente. A partir de la versión 0.49.0, este mensaje estará en tu idioma.

Para más detalles, consulta la [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
