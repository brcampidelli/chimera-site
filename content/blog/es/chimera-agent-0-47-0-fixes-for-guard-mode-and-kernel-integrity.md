---
title: "Chimera Agent 0.47.0: Correcciones para Guard Mode e Integridad del Kernel"
date: 2026-08-19
category: update
summary: "Correcciones críticas para la confiabilidad del modo guardia, precisión en la aplicación de reglas y visibilidad del kernel en despliegues gobernados."
version: "0.47.0"
---

## Guard Mode Ahora Reporta Rechazos Correctamente

Una puerta que rechazaba una llamada a herramienta devolvía previamente una cadena de observación que no comenzaba con `error:`, haciendo que el sistema la registrara como exitosa. Esto afectaba tres superficies: el marco de escritorio, los registros de pasos y la detección de desviaciones. Una ejecución donde cada acción peligrosa era bloqueada aparecía como exitosa en todos los datos estructurados, con el modelo incluso reportando acciones completadas como force pushes que nunca ocurrieron. El kernel ahora marca los rechazos correctamente, y el texto de rechazo identifica qué guardia tomó la decisión.

## Corregido el Emparejamiento de Reglas para Scripts Multilínea

El motor de reglas interpolaba previamente el texto del script usando `repr`, lo que escapaba los saltos de línea en dos caracteres. Esto rompía los límites de palabras en los patrones de reglas, causando dos problemas:

1. Scripts simples de una línea podían eludir protecciones porque el `\n` se fusionaba con la siguiente palabra
2. Documentos Markdown que citaban comandos peligrosos eran bloqueados incorrectamente

Dos reglas nunca se activaron debido a este problema. El texto ahora se pasa a las reglas sin escape, coincidiendo con el comportamiento real del script.

## El Sistema de Auditoría Ya No Almacena Secretos

Una operación gobernada `write_file` almacenaba el contenido completo del archivo en `audit.jsonl`, incluyendo datos sensibles como archivos `.env` o claves privadas. Esto ocurría incluso cuando otra guardia ya había bloqueado la operación. La auditoría ahora redacta contenido sensible (usando un redactor existente previamente conectado solo a trazas de pasos) y registra argumentos con forma de documento como metadatos de solo tamaño.

## Visibilidad del Kernel Añadida a Endpoints HTTP

Las decisiones del kernel de confianza no se incluían en las respuestas HTTP para los endpoints de ejecución, lote y turno. Esto significaba que decisiones críticas como aprobaciones de force push no eran visibles para los clientes. El kernel ahora se instala correctamente en superficies HTTP cuando `CHIMERA_GOVERNANCE` es `observe` o `enforce`. Nota que los despliegues HTTP nunca solicitan en la terminal del servidor - la persona en esa consola no hizo la solicitud.

## Otras Correcciones

- Las cadenas de auditoría ya no reportan falsamente manipulación por escrituras concurrentes
- El modo `observe` ahora cuenta correctamente los rechazos que solo debía medir
- Los workers atascados ya no retienen lotes completos indefinidamente
- Los límites de recursos de contenedores ahora pueden configurarse
- Se añadieron controles de presupuesto de contexto para uso en terminal

## Limitaciones Conocidas

El equipo ha documentado explícitamente tres brechas actuales en lugar de dejarlas para ser descubiertas:

1. Los reportes de `observe` aún no aparecen en interfaces HTTP
2. La API carece de una ruta de aprobación bajo el modo `enforce`
3. Cuatro endpoints HTTP aún no incluyen decisiones del kernel

Actualiza con `pip install --upgrade chimera-agent` o consulta [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) para notas de lanzamiento detalladas.
