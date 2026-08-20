---
title: "Chimera Agent 0.47.0: Correcciones para el Modo Guardia y Visibilidad del Kernel"
date: 2026-08-20
category: update
summary: "Siete correcciones críticas abordan errores en reportes del modo guardia, brechas en aplicación de reglas, integridad de auditoría y visibilidad del kernel."
version: "0.47.0"
---

## El Modo Guardia Ahora Reporta Rechazos Correctamente

Un error fundamental en el modo guardia (`--guard`) hacía que llamadas rechazadas a herramientas se reportaran como éxitos. El sistema verificaba un prefijo `error:` en el mensaje de rechazo, pero la mayoría no lo incluía. Esto causaba que tres superficies críticas - el marco de escritorio, logs de pasos y detección de desviaciones - mostraran ejecución exitosa cuando en realidad cada acción peligrosa había sido bloqueada. El modelo reportaba con confianza acciones completadas como pushes forzados que nunca ocurrieron. Ahora los rechazos se marcan correctamente en todas las superficies, con atribución clara a la decisión del guardia.

## Correcciones al Motor de Reglas para Scripts y Documentos

El motor de reglas tenía dos fallos opuestos. Scripts multi-línea siempre pasaban porque el escape de saltos de línea rompía la detección de límites de palabras en los patrones. Mientras, documentos que citaban comandos bloqueados eran incorrectamente bloqueados. La protección funcionaba al revés: scripts reales evadían reglas mientras documentación generaba falsos positivos. Dos reglas nunca se activaron debido a estos problemas. La interpolación ahora preserva correctamente los límites.

## Revisión del Sistema de Auditoría

Se resolvieron tres problemas. Primero, el sistema que detectaba credenciales era el mismo que las almacenaba sin redactar en el log. Segundo, escrituras concurrentes podían corromper la verificación criptográfica de la cadena de auditoría. Tercero, la UI de seguridad reportaba falsamente manipulación por reinicios de cadena hash durante escrituras concurrentes. Ahora las credenciales se redactan antes del almacenamiento, y los escritores mantienen un único estado consistente de la cadena.

## El Modo Observación Realmente Observa

El modo `observe` aplicaba reglas mientras decía solo medirlas. Bloques duros se activaban antes de consultar al aprobador, luego se excluían del conteo de rechazos usado para decisiones de despliegue. En 33 llamadas reales, ocho rechazos aparecían como cero. Estos rechazos permanecen (son señales inequívocas), pero ahora se cuentan correctamente e identifican su origen.

## Visibilidad del Kernel Restaurada

Las decisiones del kernel de confianza no llegaban a endpoints HTTP para ejecuciones, lotes o turnos - aprobaciones críticas como pushes forzados ocurrían invisiblemente. El kernel ahora participa en todos los flujos HTTP cuando `CHIMERA_GOVERNANCE` está activo. Los prompts del servidor no aparecerán en conexiones HTTP, asegurando que quien los vea realmente hizo la solicitud.

Ejecuta `chimera upgrade` para obtener las correcciones. Si usas modo guardia, actualiza inmediatamente - los reportes de la versión anterior eran peligrosamente engañosos. Los [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) detallan todos los cambios.

Para despliegues en producción, revisa tus logs de auditoría por posibles fugas de credenciales en llamadas gobernadas a `write_file`. Verifica si scripts multi-línea en tus archivos de reglas necesitan ajustes por la corrección en detección de límites.
