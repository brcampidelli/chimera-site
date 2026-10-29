---
title: "Chimera 0.79.1: las aprobaciones funcionan, los conectores arrancan y los diseños vienen con formas"
date: 2026-10-29
category: update
summary: "0.79.1 corrige las carreras en la aprobación de diseños, conectores rotos en Windows, inundación de contexto por base64 y propuestas iniciales en blanco — además de persistencia de permisos por proyecto."
version: "0.79.1"
---

## Qué rompía las aprobaciones — y qué detiene la carrera ahora

Antes de esta versión, aprobar un diseño podía fallar con un mensaje confuso: “otro proceso de Chimera hizo esta pregunta”. El fallo no tenía nada que ver con otro proceso. La aprobación del diseño se responde como una pregunta en su propia conversación, y la respuesta aparece en la ventana de aprobaciones, en la barra de estado y en la lista de Gobernanza. Solo la pantalla del propietario puede responderla. El problema era que dos respuestas que llegaban al mismo momento podían colisionar, y el sistema no tenía forma de registrar exactamente una y continuar. El error era ruido, pero bloqueaba la aprobación y dejaba al usuario sin una ruta de recuperación clara.

La versión 0.79.1 maneja esto correctamente. Cuando dos respuestas llegan a la aprobación a la vez, exactamente una se registra — la carrera se resuelve, no se rechaza. La aprobación se completa, el diseño avanza y el usuario ve un estado consistente en las tres superficies de la interfaz. Cualquiera que construya agentes que produzcan salidas de diseño y las enruten a través de un paso de aprobación humana ahora puede confiar en el flujo de Gobernanza sin un fallo intermitente que en realidad nunca tuvo que ver con la concurrencia.

## Una propuesta de diseño que no es texto en blanco

Chimera Design tenía un problema más profundo: su primera propuesta era prácticamente inútil. El modelo devolvía una operación malformada, el sistema mostraba un error crudo que el modelo no podía reparar y la conversación se estancaba. Incluso cuando la operación era estructuralmente válida, la propuesta en sí era texto plano — sin tipografía, sin fondos, sin formas. Eso significaba que la primera interacción con Design era un prompt pidiendo salida visual y no obteniendo nada visual de vuelta.

La corrección tiene cuatro partes. Una operación malformada ahora regresa como un error de argumento que el modelo puede corregir, así la conversación se autocorrige en lugar de detenerse. Cada operación muestra su forma esperada, lo que le da al modelo un objetivo al que apuntar. Cuando una propuesta se corta porque intenta empaquetar demasiadas operaciones en un turno, el sistema detecta el truncamiento y vuelve a preguntar con menos operaciones. Finalmente, la primera propuesta solicita tipografía, fondos y formas por defecto — la salida comienza visual desde el primer turno. El resultado es una primera propuesta utilizable sin un bucle de reintentos manual.

## Conectores que arrancan, y archivos que no inundan el contexto

Dos correcciones de infraestructura importan para cualquiera que conecte herramientas externas. Primero, los usuarios de Windows que ejecutan conectores a través de lanzadores `.cmd` — Supabase vía `npx` es el caso común — se encontraban con una rotura silenciosa cuando el comando del conector contenía un `&` en su URL. El lanzador interpretaba el carácter, el comando se dividía y el conector nunca arrancaba. Chimera ahora rechaza un argumento que no puede pasar de forma segura y te dice por qué, así el fallo es explícito y reparable. La aplicación tampoco espera más a que los servidores MCP se conecten antes de abrir. Antes, la interfaz podía quedarse en “Failed to fetch” hasta dos minutos mientras los conectores agotaban el tiempo de espera. El servicio se abre inmediatamente y las conexiones se resuelven en segundo plano.

Segundo, los conectores que devuelven audio o imágenes en línea — la narración de VoiceStudio, por ejemplo — solían volcar base64 directamente en el contexto del modelo. El modelo tenía que leer el blob codificado como texto, lo que llenaba la ventana de contexto y detenía el turno. Esos archivos ahora se guardan en la carpeta `mcp-output/` del proyecto, se mantienen fuera de los commits, y la conversación los referencia como artefactos reproducibles o visibles. El modelo nunca ve los bytes crudos, y el turno se completa sin agotamiento de contexto.

## Estado de permisos que sobrevive a un reinicio

El interruptor “Ignorar permisos” ahora vive a nivel de proyecto y persiste a través de reinicios. Un interruptor a nivel de proyecto cubre todas sus conversaciones, incluidas las nuevas, mientras que cada conversación mantiene su propio toggle independiente. Activar el interruptor del proyecto libera inmediatamente las tarjetas que ya están esperando permiso. Después de un reinicio, un banner lista cada proyecto y conversación guardados que tenían el interruptor activado; confirmas con un clic para reactivarlos, y el resto se descartan. Solo la pantalla de escritorio puede activar el interruptor, y desactivarlo siempre se aplica en todas partes — el límite de seguridad es unidireccional.

## Qué hacer ahora

Actualiza con `pip install chimera-agent==0.79.1`. Si usas Design, inicia una nueva propuesta y verifica que la primera respuesta incluya estructura visual. Si ejecutas en Windows con Supabase o cualquier conector basado en `npx`, verifica que el conector arranque sin escape manual de argumentos. Las notas completas están en [Chimera Agent v0.79.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.79.1).
