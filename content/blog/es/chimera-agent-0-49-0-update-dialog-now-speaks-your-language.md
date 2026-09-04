---
title: "Chimera Agent 0.49.0: El diálogo de actualización ahora habla tu idioma"
date: 2026-09-04
category: update
summary: "El diálogo de actualización y los mensajes de error ahora siguen el idioma de tu sistema, con una opción de verificación manual en la bandeja."
version: "0.49.0"
---

## Traducciones del diálogo de actualización y verificaciones manuales

El diálogo de actualización en Chimera Agent antes solo estaba disponible en inglés, sin importar el idioma configurado en la aplicación. Esto se ha corregido en la versión 0.49.0 — ahora el diálogo sigue el idioma de tu sistema operativo. Este cambio resuelve una desconexión para los usuarios que ejecutan la aplicación en un idioma pero ven mensajes críticos del sistema en otro.

El menú de la bandeja ahora incluye una opción **Buscar actualizaciones**, que sirve como la primera forma manual de iniciar una verificación de actualizaciones. Anteriormente, la verificación automática se ejecutaba en silencio al iniciar la aplicación, sin dar retroalimentación a menos que se encontrara una actualización. Aunque este diseño evita notificaciones innecesarias, dejaba a los usuarios sin una forma de confirmar si estaban al día sin reiniciar la aplicación. La nueva verificación manual proporciona una confirmación explícita cuando no hay actualizaciones disponibles, junto con mensajes de error claros si la verificación falla.

## Mensajes de error traducidos con diagnósticos intactos

Los diálogos de error — incluyendo informes de fallos del backend y la opción Salir en la bandeja — ahora también están traducidos. Sin embargo, hay una distinción importante en lo que se traduce:

- **Instrucciones para el usuario** aparecen en el idioma de tu sistema (por ejemplo, "Cierra Chimera y ábrelo de nuevo")
- **Detalles técnicos** (rutas de archivos, códigos de error, registros del backend) permanecen en su forma original

Esta separación asegura que los usuarios reciban orientación clara en su idioma preferido, manteniendo al mismo tiempo información de error buscable y útil para la resolución de problemas. Una prueba garantiza este comportamiento, verificando que el texto orientado al usuario provenga de tablas de traducción mientras que los datos de diagnóstico pasan sin cambios.

## Lo que permanece sin cambios

El mecanismo de actualización en sí no ha cambiado — las verificaciones siguen ocurriendo automáticamente al iniciar, y las instalaciones siempre requieren confirmación del usuario. La aplicación nunca instala actualizaciones sin permiso explícito. Un detalle sutil pero importante: la versión que muestra el diálogo de actualización siempre es la instalada actualmente, no la nueva versión que se ofrece. Esto significa que el mensaje que ofrece la 0.49.0 aparece en el idioma que usa tu versión actual — a partir de la 0.49.0, coincidirá con el idioma de tu sistema.

Para ver los cambios, actualiza a la 0.49.0 o verifica manualmente desde el menú de la bandeja. Los detalles completos están en las [notas de la versión][Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
