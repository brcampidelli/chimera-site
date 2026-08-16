---
title: "Chimera Agent 0.43.0: Soporte Ampliado para Proveedores y Mejoras en los Controles"
date: 2026-08-16
category: update
summary: "Chimera Agent 0.43.0 introduce un soporte más amplio para proveedores a través de LiteLLM, nuevos controles en la UI para configuraciones previamente ocultas, y correcciones para la adjunción de documentos y la persistencia del tema."
version: "0.43.0"
---

## Soporte Ampliado para Proveedores con LiteLLM

Chimera Agent ahora se integra completamente con LiteLLM, permitiendo a los usuarios conectarse a cualquier proveedor que LiteLLM soporte. Anteriormente, solo se reconocían cinco proveedores, lo que dejaba a usuarios con claves para proveedores como Groq o Mistral sin poder avanzar. La actualización garantiza que cualquier `<PROVIDER>_API_KEY` sea aceptada, con una lista de exclusión para evitar proveedores que no son modelos, como ElevenLabs y Stability. Además, `doctor` ahora marca nombres de proveedores no reconocidos, ayudando a los usuarios a evitar errores tipográficos que podrían imitar proveedores válidos.

## Mejoras en los Controles de la UI

Tres configuraciones que antes solo estaban disponibles en archivos `.env` ahora están accesibles en la UI: el modelo de embeddings, la URL base de Ollama y los grupos de claves. La configuración del modelo de embeddings ahora está directamente vinculada al interruptor de memoria semántica, asegurando que los usuarios puedan configurarlo sin fallos silenciosos. Los grupos de claves se gestionan mediante operaciones (añadir/eliminar) en lugar de ediciones directas, manteniendo la seguridad al evitar la visualización de información sensible.

## Correcciones y Mejoras

Adjuntar documentos y dictar mensajes ahora funciona correctamente, resolviendo un error 422 causado por cabeceras Content-Type incorrectas. La aplicación también conserva tu tema, espacio de trabajo, lista de proyectos y lenguaje entre lanzamientos, corrigiendo un problema donde estos ajustes se perdían debido a cambios de puerto.

Para explorar estas actualizaciones, revisa las [notas de la versión][Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0).
