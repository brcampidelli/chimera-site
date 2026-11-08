---
title: "Chimera Agent 0.85.0: Se Acabaron los Bloqueos Silenciosos y un Navegador que se Empareja"
date: 2026-11-08
category: update
summary: "Corrige un bloqueo de ejecución por pipes heredados, añade emparejamiento del navegador con un código de un solo uso, voz local para bots de chat y endpoints con nombre compatibles con OpenAI."
version: "0.85.0"
---

## La ejecución que nunca terminaba

Una ejecución cuyo proceso hijo mantenía abierto su pipe de salida solía colgar al agente indefinidamente. El lector esperaba sin límite a que el pipe se cerrara. Un proceso nieto que heredaba el pipe —un worker de un test runner, un servidor en segundo plano— mantenía la ejecución, su botón de cancelar y la suite de pruebas esperando para siempre. El botón de cancelar no hacía nada porque el árbol de procesos seguía vivo, y la suite de pruebas se congelaba en silencio en lugar de reportar el bloqueo.

Eso cambia en la 0.85.0. El lector de salida ahora se ejecuta en su propio hilo con un período de gracia de cinco segundos tras la salida del hijo. Cuando cancelas una ejecución, Chimera mata todo el grupo de procesos en POSIX y el árbol de procesos en Windows. La suite de pruebas también deja de esconderse tras un muro congelado: si una sola prueba se ejecuta más de quince minutos, la suite vuelca la traza de pila de cada hilo en lugar de bloquearse sin decir nada. Obtienes un diagnóstico en lugar de una terminal en blanco.

La corrección es más importante cuando encadenas herramientas que generan sus propios subprocesos —frameworks de testing, scripts de build o cualquier comando que bifurque un servidor en segundo plano. Antes, esas ejecuciones eran irrecuperables. Ahora, cancelar significa cancelar.

## Empareja una pestaña del navegador sin abrir un puerto

Hasta ahora, dar a una pestaña del navegador acceso a la pantalla del propietario significaba exponer el bridge o un canal de chat. Ambos caminos implicaban más superficie de ataque de la necesaria. La versión 0.85.0 añade un flujo de emparejamiento que los elimina por completo.

La app de escritorio muestra un código de ocho caracteres, válido por cinco minutos y cinco intentos. Lo escribes en la pestaña del navegador. Esa pestaña recibe una cookie HttpOnly, same-site válida por hasta doce horas, revocable desde el escritorio en cualquier momento. Solo el escritorio emite códigos —el bridge y los canales de chat no pueden. Una pestaña emparejada no puede activar el bridge, no puede habilitar el control total y no puede alternar "Ignorar permisos". Cada petición de cambio de estado desde ella debe originarse del mismo origen.

Esto te da una ventana acotada en el tiempo, revocable y con pocos privilegios a la pantalla del propietario. Emparejas una pestaña cuando la necesitas, la revocas cuando no, y el bridge permanece apagado todo el tiempo.

## Los mensajes de voz llegan localmente, y los endpoints reciben nombres

Los bots de Discord y Telegram ahora pueden escuchar mensajes de voz y responder en voz alta, y ambas cosas ocurren en tu máquina. Las notas de voz se transcriben localmente con faster-whisper usando una revisión de modelo fijada. La duración se verifica antes de la decodificación, y un límite de tasa por usuario previene abusos. Las respuestas habladas están desactivadas por defecto. Para activarlas, apuntas `CHIMERA_CHAT_VOICE_MODEL` a un archivo `.onnx` de voz Piper que tú mismo hayas elegido. Chimera no incluye ningún modelo de voz, y `piper-tts` (GPL-3.0) reside en un extra `voice` separado, fuera de `[full]`. Tú optas por la voz, y tú proporcionas la voz.

Los endpoints compatibles con OpenAI también reciben un tratamiento de primera clase. Ajustes › Conexiones ahora lista tus endpoints —un vLLM local, LM Studio, un servidor llama.cpp o uno alojado— y te permite añadirlos, probarlos y eliminarlos. La prueba hace una sola llamada acotada `GET /models` a ese endpoint únicamente. Solo la pantalla del propietario puede cambiar o probar endpoints, la clave nunca se muestra, y la clave de un endpoint debe ser su propia variable `*_API_KEY`, nunca la credencial de otro proveedor o un ajuste de `CHIMERA_`. Esto cierra la solicitud de larga data en #1133.

## Qué hacer ahora

Actualiza con `pip install chimera-agent --upgrade`. Lee las notas completas en [Chimera Agent v0.85.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.85.0). Si usas bots de chat y quieres voz, instala el extra `voice` y configura `CHIMERA_CHAT_VOICE_MODEL` con tu modelo Piper. Para emparejar una pestaña del navegador, abre la app de escritorio y busca el código de emparejamiento en los controles de pantalla del propietario.
