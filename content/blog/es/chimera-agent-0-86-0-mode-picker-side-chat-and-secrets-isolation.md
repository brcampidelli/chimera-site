---
title: "Chimera Agent 0.86.0: Selector de Modo, Chat Lateral y Aislamiento de Secretos"
date: 2026-11-11
category: update
summary: "Un nuevo selector de modo reemplaza la confusa gestión de posturas, el chat lateral responde sin contaminar el historial, la shell del agente ya no ve tus API keys, y las conversaciones se archivan automáticamente al hacer merge de un PR."
version: "0.86.0"
---

Esta versión corrige un problema estructural que hacía difícil confiar en la postura del agente. Antes de la 0.86.0, definías una postura en Configuración —Manual, Auto, o algo intermedio— y luego el puente, la API y la UI tenían cada uno su propia forma de sobrescribirla. Podías terminar con una conversación ejecutándose en Auto cuando creías que estaba en Manual porque el puente la cambió sin avisarte. El selector de modo reemplaza todo eso con un único control.

## Un selector de modo en lugar de tres mecanismos

El selector se ubica debajo del prompt y se abre con Ctrl/Cmd+Shift+M. Lista seis modos: Manual, Aceptar ediciones, Planificar, Auto, No preguntar e Ignorar permisos cuando el proyecto lo permite. Cada modo se mapea directamente al sistema de posturas existente. El modo de la conversación se guarda y arranca según lo que diga Configuración —nunca pasa a No preguntar, sospechoso pasa a Auto, siempre pasa a Manual. Aceptar ediciones muestra una tarjeta antes de cada comando a menos que el comando solo lea o el sandbox lo aísle. Planificar nunca se ejecuta con más alcance que Auto. El puente solo puede mover una conversación a un modo que no amplíe nada, así que una conversación que bloqueaste en Manual se queda ahí. Ctrl/Cmd+Shift+O abre el selector de modelo y Ctrl/Cmd+Shift+E el de esfuerzo; maximizar se movió a Ctrl/Cmd+Shift+Enter.

Esto es importante porque la postura era la principal barrera de seguridad entre tú y el agente, y tenía dos puertas traseras. Ahora tiene un solo control que todo respeta.

## La shell del agente ya no hereda tus secretos

Los procesos hijos del agente solían heredar pools de claves de proveedor como `CHIMERA_OPENROUTER_KEYS`, `DATABASE_URL` con contraseña y credenciales de cloud. Cualquier comando que ejecutara el agente podía imprimirlos. La app de escritorio tenía el mismo problema en la dirección opuesta: le pasaba al backend su token de servidor, credencial de pantalla y clave del launcher mediante variables de entorno, que en Linux permanecen legibles en `/proc/<pid>/environ` para cualquier proceso del mismo usuario —incluida la shell del agente.

Ambos caminos están cerrados. La shell del agente y la nueva terminal ahora reciben un entorno con los secretos eliminados por nombre y por valor. La configuración del proxy sí se transmite. El CLI de GitHub conserva el token que necesita. La app de escritorio ahora envía sus secretos al backend por stdin como una línea que se lee y se cierra inmediatamente; el token del servidor se mantiene en memoria en lugar de en el entorno del proceso. Una línea faltante o malformada detiene el backend en vez de iniciarlo sin token, y la app se niega a usar un backend que responda sin uno.

## Chat lateral y tarjetas de tareas sugeridas

El chat lateral (Ctrl/Cmd+;) responde una pregunta rápida sobre la conversación sin añadir nada a ella. Lee la conversación como datos, responde sin herramientas y no escribe nada en el historial de la conversación. Antes de esto, hacer una pregunta significaba contaminar el contexto con un turno sobre el cual el agente luego intentaría actuar. "Traer a la conversación" solo llena el compositor, y cuando la conversación ha leído contenido externo, el chat lateral cita la respuesta como datos y pide permiso primero. Su costo se registra, los modelos locales siguen siendo gratuitos bajo un límite diario, y la ayuda de atajos se movió a Ctrl/Cmd+/.

Las tarjetas de tareas sugeridas evitan que el agente se desvíe. Cuando detecta algo fuera de la tarea —código muerto, un documento desactualizado, un test faltante, un problema de seguridad visto de pasada— solo puede proponer una tarjeta. Ves el prompt completo antes de que se ejecute nada y eliges Iniciar (una nueva conversación en el mismo proyecto), Hacerlo aquí, Opciones o Descartar. Iniciar todo pide confirmación y tiene un límite de cinco. Solo la pantalla del propietario inicia una tarjeta, y una tarjeta propuesta por un turno que leyó contenido externo inicia su conversación marcada como contaminada y sin "Ignorar permisos", con una advertencia en la tarjeta.

## Qué hacer ahora

Actualiza con `pip install chimera-agent --upgrade` o descarga la última imagen del contenedor. El selector de modo, el chat lateral y la terminal están disponibles de inmediato. Si dependías de las antiguas sobrescrituras de postura, revisa el modo de cada conversación después de la actualización —el selector lee tu valor por defecto en Configuración, pero las conversaciones existentes pueden haber sido movidas por el puente antes de la 0.86.0. El aislamiento de secretos es automático; no se necesita ningún cambio de configuración. Notas de la versión completas: [Chimera Agent v0.86.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.86.0)
