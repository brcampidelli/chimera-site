---
title: "Chimera Agent 0.65.0: Emparejamiento, plazos y garantías del sandbox"
date: 2026-10-12
category: update
summary: "Los bots ahora se emparejan de forma segura al iniciar por primera vez, se elimina el fallback del sandbox, los turnos tienen plazo límite y los modelos de Ollama leen el prompt completo."
version: "0.65.0"
---

## El primer arranque empareja al bot, no a la sala

Antes de esta versión, la app de escritorio preguntaba "¿es una instalación nueva?" en la tarjeta de Mensajería cuando la carpeta de datos ya estaba poblada. Eso significaba que cada bot que la app iniciaba corría abierto, respondiendo a cualquiera que lo contactara, usando las herramientas y el presupuesto del dueño. Un código de emparejamiento, si se generaba, iba a una consola que nadie lee.

La app ahora registra qué bots ya estaban configurados al arrancar. Esos bots siguen respondiendo como antes. Un bot configurado después de ese punto arranca emparejándose, y su código aparece en la tarjeta de Mensajería, donde alguien realmente lo ve. La API lo refleja: `GET /api/messaging` reporta los estados `pairing_code`, `pairing` y `open`. El puente de escritorio ve `pairing` pero nunca el código en sí, así que la automatización no puede saltarse el paso humano.

## Un sandbox que no puede ejecutarse se niega a ejecutar

Configurar `CHIMERA_SANDBOX=docker` sin un daemon de Docker antes hacía un fallback al host con una sola línea de log. Un comando que debió estar aislado corría directamente en la máquina. Ese fallback desapareció. Ahora `run_shell`, `execute_code` y los pasos de workflow se niegan incluso antes de preguntar por la ejecución en host. El mensaje de rechazo dice qué pasó, que nada se ejecutó y las dos salidas: iniciar Docker o configurar `CHIMERA_SANDBOX=local`. El verificador se abstiene en lugar de revertir trabajo porque un daemon estaba caído.

Un llamador que pase `fallback=` explícitamente conserva el comportamiento anterior. Todos los demás reciben un freno en seco. El mismo límite aplica a medios entrantes: las descargas de Telegram y WhatsApp ahora se detienen en el límite de 20 MB antes del primer byte cuando el tamaño está declarado, en lugar de leer el archivo completo en memoria y medir después.

## Los plazos alcanzan la banda de gobernanza

Una decisión ahora puede llevar un plazo, y no cumplirlo empuja la banda REVIEW hacia el escrutinio. `DecisionSpec.deadline_s` declara uno por decisión; `Decider.decide(..., deadline_s=)` lo sobrescribe por llamada. Una respuesta que no llegue a tiempo se detiene con `deadline_missed` en el recibo y en el log de decisión, así que los incumplimientos se vuelven contables.

Con `CHIMERA_GOVERNANCE_BAND_DEADLINE_S` configurado, un incumplimiento produce una tarjeta REVIEW con `band: deadline`—nunca ALLOW. Una respuesta tardía nunca se cachea ni se aplica después del hecho. Esto está desactivado por defecto, y el nuevo panel de Configuración › General › Gobernanza y auditoría lo expone junto con otros cinco controles opcionales que antes solo eran accesibles mediante `.env` o podían guardarse pero no leerse de vuelta. `GET /api/config` los reporta en un bloque `governance_audit`. Limpiar el plazo ya no deja una app que no puede iniciar: un valor vacío ahora se lee como sin plazo.

## Los modelos de Ollama leen el prompt completo

Las llamadas a modelos `ollama_chat/` o `ollama/` nunca nombraban una ventana de contexto, así que Ollama servía su default de máquina—4,096 tokens en el caso que destapó esto. Cada prompt más largo se recortaba a más o menos la mitad de ese tamaño, silenciosamente. La primera solicitud de una ejecución `chimera solve`, de unas 20,500 caracteres, se leía como 2,050 tokens, y el modelo nunca veía la tarea.

Cada ruta del gateway ahora envía `num_ctx` solo a las rutas de Ollama, tomado de `CHIMERA_OLLAMA_NUM_CTX` (default 32,768; configúralo en `0` para mantener el default del servidor). El presupuesto de compactación de un modelo Ollama se dimensiona desde esa ventana en lugar del fallback de 128,000 tokens. Una respuesta cuyo conteo de prompt muestre un recorte registra una advertencia `PROMPT TRUNCATED` en lugar de pasar en silencio. Los proveedores alojados no cambian.

## Qué hacer ahora

Actualiza con `pip install chimera-agent==0.65.0`. Si usas la app de escritorio, reiníciala y revisa la tarjeta de Mensajería para cualquier bot que necesite emparejamiento. Si usas `CHIMERA_SANDBOX=docker`, verifica que el daemon esté corriendo o cambia a `local`. Si llamas a modelos de Ollama, configura `CHIMERA_OLLAMA_NUM_CTX` para que coincida con la ventana de tu modelo. Las notas de lanzamiento completas están en [Chimera Agent v0.65.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.65.0).
