---
title: "Chimera 0.75.0: Anulación de permisos en un solo paso en el compositor de Código"
date: 2026-10-24
category: update
summary: "Un interruptor por conversación en el compositor de Código auto-aprueba llamadas a herramientas seguras, registra cada decisión y elimina el tiempo de espera de cinco minutos para la intervención humana."
version: "0.75.0"
---

## Lo que cambia para ti

Hasta ahora, cada llamada a una herramienta que tocara algo fuera del sandbox generaba una tarjeta de aprobación. Tenías que hacer clic en cada una. Ese era el contrato: el agente se detiene, tú decides, él continúa. El contrato se mantenía incluso cuando estabas iterando un script y el agente necesitaba ejecutar el mismo comando seguro doce veces seguidas. La fricción no era un bug, era el diseño. Pero hacía que la iteración rápida fuera más lenta de lo necesario.

La versión 0.75.0 añade un interruptor al compositor de Código etiquetado como "Ignorar permisos". Cuando lo activas, el agente auto-aprueba las llamadas a herramientas que normalmente generarían una tarjeta de aprobación. Registra cada decisión que toma en tu nombre. El interruptor aplica solo a una conversación. No persiste al reiniciar la aplicación. Y no toca nada que envíe datos locales hacia afuera: pushes, publicaciones, pagos, mensajes enviados en tu nombre, acceso a secretos y cualquier operación que transmita datos fuera de la máquina siguen deteniéndose y preguntando. El límite es explícito. El agente puede moverse más rápido dentro del límite; no puede cruzarlo sin ti.

Esto no es una configuración global. No es un toggle en un archivo de configuración. Es un botón en la pantalla, y solo tú puedes presionarlo. El diseño mantiene la anulación cerca del trabajo. Ves la conversación, sabes lo que el agente está haciendo y decides que, para esta sesión, las aprobaciones repetitivas son ruido. Cuando la aplicación se reinicia, el ruido vuelve. Tú optas por incluirlo de nuevo, deliberadamente.

## Por qué cambió el comportamiento del tiempo de espera

La pantalla de Código tenía un plazo de cinco minutos para tu respuesta. Si no respondías a una tarjeta de aprobación dentro de ese margen, el agente rechazaba la llamada y la conversación se estancaba. La suposición era que una tarjeta sin respuesta significaba una sesión desatendida. Pero la suposición fallaba en un flujo de trabajo común: le pides al agente que haga algo, cambias a otra ventana para consultar documentación o probar una hipótesis, y vuelves seis minutos después a una conversación muerta. El tiempo de espera castigaba la concentración.

La pantalla de Código ahora espera indefinidamente tu respuesta. El agente permanece en pausa hasta que regreses. El límite de cinco minutos sigue aplicándose donde tiene sentido: automatizaciones que nadie está mirando. Esas mantienen la barrera de seguridad. Pero cuando estás presente, incluso si te alejas, la conversación ya no expira.

## Lo que el interruptor no hace

El interruptor "Ignorar permisos" no es una bandera de sudo. No eleva privilegios. No concede acceso a nada que el agente no pudiera ya solicitar. Solo elimina el requisito de que apruebes manualmente cada solicitud. El agente sigue registrando cada llamada auto-aprobada. Puedes revisar lo que sucedió a posteriori. El registro está ahí si necesitas auditar una sesión.

Las categorías que aún requieren aprobación explícita son las que mueven datos fuera de la máquina o gastan recursos: pushes a remotos, operaciones de publicación, acciones de pago, mensajes que llevan tu identidad y cualquier cosa que lea o transmita secretos o datos locales hacia el exterior. El interruptor respeta estas categorías incondicionalmente. No hay un segundo interruptor para anular la anulación.

## Qué hacer ahora

Actualiza a la versión 0.75.0. Abre una sesión del compositor de Código donde esperes llamadas a herramientas repetitivas. Busca el interruptor "Ignorar permisos" en la pantalla. Actívalo cuando las tarjetas de aprobación se conviertan en ruido. Desactívalo cuando necesites las barreras de seguridad de vuelta. Reinicia la aplicación para restablecerlo. Lee la lista completa de cambios en las [notas de la versión][Chimera Agent v0.75.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.75.0).
