---
title: "Chimera 0.74.1: Los servicios que se detienen realmente se detienen, y las dependencias se ajustan"
date: 2026-10-23
category: update
summary: "Corrige una condición de carrera donde un servicio que se estaba deteniendo desaparecía del registro antes de terminar, y actualiza dos dependencias indirectas con vulnerabilidades conocidas."
version: "0.74.1"
---

El comando `chimera service stop` tenía una condición de carrera que lo hacía mentir. Le pedías a un servicio en segundo plano que se detuviera, este confirmaba la solicitud y luego desaparecía de la lista de servicios mientras seguía ejecutándose. Si acto seguido usabas `chimera service stop --now` para forzar la finalización de un apagado bloqueado, la CLI respondía "not running" — aunque el proceso siguiera vivo y consumiendo recursos. La versión 0.74.1 elimina esa brecha.

## Por qué un servicio que se detenía se volvía invisible

Un servicio en segundo plano de Chimera ejecuta un bucle de agente de larga duración. Cuando recibe una señal de parada, necesita terminar los turnos en vuelo, volcar el estado y cerrar conexiones. El código antiguo eliminaba el registro del servicio del tracker en el momento en que aceptaba la solicitud de parada. Era un atajo contable: el servicio estaba "parando" desde su propia perspectiva, pero para el resto del sistema ya no existía.

El problema inmediato era `--now`. Una parada forzosa consulta el tracker por un ID de servicio coincidente. Si el registro desapareció, el comando reporta que no hay nada que detener y termina. El proceso real seguía corriendo, manteniendo bloqueos, sockets o memoria de GPU, hasta que eventualmente completaba su limpieza o se mataba externamente. Para un operador depurando un agente atascado, esto significaba que la herramienta decía que todo estaba bien mientras la tabla de procesos mostraba lo contrario.

## Qué cambia la corrección para el ciclo de vida del servicio

Un servicio ahora permanece visible en el tracker con un estado `stopping` desde el momento en que acepta la solicitud de parada hasta que termina. El tracker mantiene el registro, por lo que cualquier llamada posterior a `stop` o `status` lo ve. El servicio realiza su apagado graceful — completando el turno actual, persistiendo lo que necesite, cerrando bucles — y luego se elimina a sí mismo. Solo después de que el proceso termina, el registro desaparece.

El flag `--now` todavía existe, pero su comportamiento es más estricto. Envía una señal de forzar finalización solo después de confirmar que el proceso rastreado coincide con el ID de servicio en archivo. Si el servicio ya terminó limpiamente entre la última verificación y la llamada a `--now`, el comando lo reporta en lugar de disparar una señal a un PID reciclado. Esto previene la finalización accidental de procesos no relacionados que reutilizaron el mismo identificador.

Para cualquiera que ejecute múltiples servicios de Chimera en una misma máquina, esto elimina una clase de heisenbugs donde un script de reinicio lanzaba una nueva instancia mientras la anterior todavía se estaba apagando, porque el script no podía ver la instancia anterior para esperarla.

## Parches de dependencias que se incluyen en esta versión

Se actualizan dos dependencias indirectas para cerrar avisos de seguridad. Ninguna es llamada directamente por el código del agente de Chimera, pero ambas están en la cadena de suministro de flujos de trabajo comunes.

GitPython pasa a 3.2.1. Las versiones hasta la 3.2.0 verificaban la ruta `.git` de un submódulo solo después de clonarlo, lo que permitía que un repositorio manipulado provocara un path traversal durante la operación de clonado. Esto importa si tu agente clona repositorios como parte de un bucle de llamada a herramientas — por ejemplo, un agente de revisión de código que hace checkout de pull requests. El aviso lo califica con severidad alta.

OpenTelemetry pasa a 1.45.1. El límite anterior, 1.45.0, parseaba la cabecera `tracestate` sin un límite en el número de entradas. Un servicio downstream que refleje un `tracestate` sin límites de vuelta a tu agente instrumentado podría causar un uso excesivo de memoria. Las superficies de tracing propias de Chimera no se ven afectadas, pero cualquier agente que exporte spans a un colector OpenTelemetry sobre HTTP está expuesto a través del SDK. El aviso lo califica como moderado.

Ambos parches son incrementos de versión mínima en el árbol de dependencias. No cambia ninguna superficie de API. Si fijas dependencias con un lockfile, ejecutar tu resolutor de nuevo después de actualizar Chimera traerá las nuevas versiones.

## Actualización

Instala la versión directamente:

```
pip install chimera-agent==0.74.1
```

Si usas la CLI de Chimera para gestionar servicios en ejecución, reinicia cualquier agente de larga duración para que adopten el seguimiento de ciclo de vida corregido. Las notas de la versión con el changelog completo están en [Chimera Agent v0.74.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.74.1).
