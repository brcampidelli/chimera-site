---
title: "Chimera Agent 0.47.0: Correcciones para Ejecuciones Protegidas"
date: 2026-08-22
category: update
summary: "Siete correcciones abordan reportes incorrectos de llamadas a herramientas rechazadas, fallos en evaluación de reglas y problemas de integridad en auditorías."
version: "0.47.0"
---

## Ejecuciones Protegidas Ahora se Reportan Correctamente

Se corrigió un problema crítico en ejecuciones protegidas (bandera `--guard`). Anteriormente, cuando una llamada a herramienta era rechazada por reglas de gobernanza, el sistema la reportaba incorrectamente como exitosa. Esto ocurría porque el mensaje de rechazo no comenzaba con `error:`, haciendo que la verificación de estado devolviera `True`. Tres áreas clave fueron afectadas:

1. La visualización en el marco de escritorio
2. El registro de pasos usado para recibos
3. El detector de desviaciones

Esto hacía que ejecuciones donde cada acción peligrosa era bloqueada aparecieran como exitosas en todas las salidas estructuradas. El modelo incluso podía responder con mensajes de confirmación para acciones que nunca se ejecutaron.

## Correcciones en Evaluación de Reglas para Scripts y Documentos

El motor de reglas tenía dos problemas significativos:

1. **Scripts multi-línea eludían protección**: Debido a cómo se escapaban los saltos de línea durante interpolación de texto, los límites de palabras en reglas se rompían. Esto permitía que comandos peligrosos pasaran si aparecían después de otros benignos en un script.

2. **Documentos generaban falsos positivos**: Mientras tanto, archivos Markdown que citaban comandos peligrosos eran bloqueados completamente. La protección estaba efectivamente invertida - amenazas reales se permitían mientras documentación se bloqueaba.

Dos reglas no se activaban en ningún caso. Estos problemas han sido corregidos, con manejo adecuado tanto para ejecución de scripts como contenido de documentos.

## Mejoras en Auditoría y Seguridad

Se implementaron varias correcciones relacionadas con seguridad:

- **Almacenamiento de credenciales**: El sistema de auditoría almacenaba datos sensibles que debía detectar. Cuando una operación gobernada `write_file` era bloqueada, el contenido del archivo aún aparecía en `audit.jsonl`. Ahora hay dos capas: la auditoría redacta datos sensibles (usando capacidades existentes), y argumentos en forma de documento solo se registran por tamaño.

- **Integridad de cadena de auditoría**: La pantalla de Seguridad a veces reportaba falsamente manipulación cuando no había modificación. Esto ocurría cuando múltiples escritores resumían cadenas hash desde diferentes instantáneas, creando números de secuencia duplicados. La verificación ahora funciona correctamente.

- **Correcciones en modo observación**: El modo `observe` estaba aplicando reglas que prometía solo medir. Los BLOCKs duros ahora retornan apropiadamente antes de consultar aprobadores, y los rechazos se cuentan correctamente en métricas.

## Visibilidad y Confiabilidad del Kernel

El kernel de confianza no se servía via HTTP, por lo que sus veredictos no llegaban a consumidores de API. Ahora se instala correctamente para todos los endpoints cuando `CHIMERA_GOVERNANCE` está en `observe` o `enforce`. Otras correcciones de confiabilidad incluyen:

- Manejo adecuado de timeouts de workers
- Distinción entre fallas de tareas vs. expiraciones
- Configuración de límites de contenedores
- Recuperación automática del backend

## Limitaciones Conocidas

La actualización aborda varios problemas pero deja algunas brechas conocidas:

1. Reportes de `observe` aún no llegan a interfaces HTTP
2. La API carece de ruta de aprobación en modo `enforce`
3. Cuatro endpoints HTTP aún carecen de integración con kernel

Estos están documentados en el README en lugar de dejarse como problemas ocultos.

Actualiza ahora con `pip install --upgrade chimera-agent` o mediante tu gestor de paquetes preferido. Para detalles completos, consulta las [notas de versión][Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0).
