---
title: "Chimera Agent 0.89.0: herramientas SSH, acciones masivas y estado que persiste"
date: 2026-11-13
category: update
summary: "Las herramientas de archivos ahora se ejecutan en el host SSH, los comandos sobreviven a conexiones caídas, llegan las acciones masivas sobre carpetas y conversaciones, y la preferencia de Plan-first persiste entre recargas."
version: "0.89.0"
---

## Lo que configuras se mantiene

Antes de esta versión, la opción "Plan first" en el compositor de Código era una preferencia de sesión únicamente. Podías cambiarla a Siempre o Nunca, pero recargar la ventana la restablecía a Auto. Eso implicaba que cada vez que volvías a una conversación tenías que reconfigurar el modo que ya habías decidido. Ahora la configuración se recuerda por conversación. Una conversación nueva retoma la última elección que hiciste, y un plan pendiente de aprobación —junto con su tarjeta— sobrevive a una recarga. La prueba que verifica este comportamiento confirma que la tarjeta regresa, así que ya no pierdes un plan pendiente porque la pestaña se haya refrescado.

La búsqueda en Configuración tenía un punto ciego de otro tipo. La tarjeta de Entornos estaba en la pestaña General, pero buscar "WSL", "SSH" o "entorno" no devolvía nada. La tarjeta estaba presente pero era inalcanzable a través del campo de búsqueda. Eso está corregido. Escribir cualquiera de esos términos ahora lista la tarjeta de Entornos y los hosts SSH permitidos, y al abrir un resultado se desplaza directamente hasta él. Si gestionas múltiples entornos remotos, ahora puedes encontrarlos de la misma forma que encuentras todo lo demás.

## Las herramientas de archivos cruzan la frontera SSH

Las conversaciones SSH antes rechazaban las operaciones de archivos. Leer, escribir, editar, parchear, listar, grep y glob se detenían en el límite local. Esa restricción desapareció. En una conversación SSH, esas herramientas ahora actúan sobre la carpeta remota. La implementación añade varias barreras de protección porque una herramienta que escribe en un host remoto es una herramienta que puede causar daños.

Las rutas no pueden salir de la carpeta de la conversación. La comprobación es léxica y la confirma el propio `realpath` del host, así que un enlace simbólico no puede escapar. Los archivos de credenciales —`.ssh`, `.env`, claves y configuraciones de nube— se rechazan de plano. Una escritura se reemplaza solo después de que su tamaño y hash se verifiquen en el host, lo que evita sobrescribir un archivo que cambió desde la última vez que lo leíste. La tarjeta Manual muestra el diff del archivo remoto y nombra el host, para que sepas exactamente qué cambió y dónde. Cuando un turno lee contenido externo y luego escribe en un hook de git, archivo de inicio de shell, cron o unidad de systemd, Chimera pregunta primero. Lo que el host devuelve cuenta como contenido externo, por lo que el aviso aparece cuando el riesgo es real.

Los comandos en el host SSH ahora sobreviven a una conexión caída. Cada comando se ejecuta en segundo plano bajo su propio ID de ejecución. Si el enlace se cae, Chimera se reconecta y reanuda la lectura de la salida sin reiniciar el comando. Un script que llega incompleto nunca se ejecuta. Un timeout o Stop termina todo el grupo de procesos. Si Chimera se cierra a mitad de un comando, el comando sigue ejecutándose y a la conversación que lo inició se le indica dónde está su salida. Puedes reconectarte y retomar el registro sin adivinar si el comando terminó o se ejecutó dos veces.

## Actúa sobre muchos elementos a la vez

Gestionar carpetas y conversaciones de una en una era la única opción. La tarjeta de Carpetas en Configuración y la barra lateral de Código ahora tienen casillas de verificación, un "Seleccionar todo" triestado y una barra de acciones. Para las carpetas, puedes anclar, desanclar, permitir o revocar comandos, eliminar de las listas o mostrar de nuevo. Para las conversaciones, puedes archivar, desarchivar, eliminar o quitar sus carpetas de las listas.

El modo de selección dibuja cada fila para que nada fuera de pantalla sea afectado por accidente. Al eliminar se pregunta primero y se muestra la cuenta. Permitir comandos en masa también pregunta primero. Un fallo se contabiliza sin detener el resto, de modo que un único elemento problemático no bloquea la operación sobre todo lo demás que seleccionaste.

Actualiza con `pip install --upgrade chimera-agent`. Las notas completas están en [Chimera Agent v0.89.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.89.0).
