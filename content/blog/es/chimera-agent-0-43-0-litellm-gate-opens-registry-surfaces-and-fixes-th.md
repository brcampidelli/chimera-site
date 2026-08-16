---
title: "Chimera Agent 0.43.0: LiteLLM Gate se abre, Registro surge y correcciones clave"
date: 2026-08-16
category: update
summary: "Chimera 0.43.0 elimina restricciones arbitrarias de proveedores, expone configuraciones ocultas y corrige carga de documentos y persistencia de sesiones."
version: "0.43.0"
---

## LiteLLM Gate ahora acepta cualquier clave de proveedor

Antes, Chimera solo reconocía cinco proveedores de LiteLLM, rechazando claves válidas de servicios como Groq o Mistral con un error confuso: "No hay clave de proveedor configurada". Ahora la puerta acepta cualquier `<PROVIDER>_API_KEY`, con dos salvaguardas:

1. Una lista negra evita que proveedores que no son de modelos (como ElevenLabs o Stability AI) se identifiquen erróneamente como fuentes de modelos
2. `doctor` ahora valida los nombres de proveedores contra el enum de LiteLLM, detectando errores tipográficos que antes fallaban en silencio

El cambio resuelve un problema más profundo: las claves colocadas en `.env` se ignoraban silenciosamente debido a la configuración `extra="ignore"` de Pydantic. Como `chimera init` crea archivos `.env` y la documentación dirige a los usuarios allí, esto causaba fallos persistentes de configuración.

## Funcionalidades ocultas ahora accesibles

Tres capacidades importantes existían en el código pero carecían de interfaces:

1. **Registro de Agentes**: El cuadro de carriles del tablero era un campo de texto libre que adivinaba IDs de registro que nunca se mostraban. Ahora accesible en la tercera pestaña de Automatización, muestra agentes existentes mientras permite asignar trabajo a IDs inexistentes (que esperan en backlog).
2. **Selección de Modelo de Embedding**: Antes oculta, ahora aparece directamente bajo el interruptor de memoria semántica que afecta. Los fallos degradan silenciosamente a búsqueda léxica, haciendo crucial la configuración visible.
3. **Grupos de Claves**: Rotaban en round-robin con tiempos de espera pero no tenían interfaz. Ahora se gestionan por operación (añadir/eliminar) sin exponer valores secretos.

## Correcciones críticas para funcionalidad básica

Dos características llegaron rotas a la app:

- **Carga de Archivos y Dictado de Mensajes**: Ambas fallaban con errores 422 porque `authHeaders()` forzaba Content-Type `application/json`, evitando límites correctos de formularios multiparte. Las pruebas no lo detectaron porque simulaban toda la capa API.
- **Persistencia de Sesión**: La app perdía tema, espacio de trabajo e idioma al iniciar debido a asignación aleatoria de puertos que cambiaba el origen de `localStorage`. Ahora recuerda y reutiliza puertos.

El asistente de primera ejecución también maneja mejor la selección de modelos, mostrando (sin aplicar automáticamente) modelos compatibles con tu proveedor para evitar errores 401 inmediatos.

Actualiza con `pip install --upgrade chimera-agent` o consulta [Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0) para detalles completos.
