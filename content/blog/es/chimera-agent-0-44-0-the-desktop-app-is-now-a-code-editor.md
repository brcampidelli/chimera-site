---
title: "Chimera Agent 0.44.0: La aplicación de escritorio ahora es un editor de código"
date: 2026-08-16
category: update
summary: "La aplicación de escritorio de Chimera evoluciona de una consola de agentes a un editor de código completo con diagnósticos, autocompletado en línea, búsqueda e integración con agentes externos."
version: "0.44.0"
---

## De consola a editor de código

La aplicación de escritorio de Chimera Agent cambió radicalmente en la versión 0.44.0. Lo que antes era principalmente una consola para interactuar con agentes ahora es un entorno completo de edición de código. Este cambio refleja cómo los usuarios realmente trabajan con agentes de IA: no solo chateando con ellos, sino colaborando en código.

Siete características clave llegan juntas en esta versión. El editor en `#/edit` usa CodeMirror con pestañas propias, historial de deshacer por archivo y advertencias cuando un agente intenta modificar un archivo no guardado en el que estás trabajando. Los diagnósticos ahora vienen de `ruff server`, asegurando que las advertencias coincidan con lo que fallaría en CI. El editor ofrece autocompletado en línea desde un modelo local, mostrando texto previo en gris que puedes aceptar con Tab o rechazar con Escape.

## Mejoras prácticas

La búsqueda ahora funciona en todo tu workspace, usando ripgrep donde esté disponible. Puedes ver el uso de recursos del sistema (CPU, memoria, VRAM de GPU) y realizar búsquedas en tu repositorio con benchmarks preconfigurados. El ejecutor de comandos mantiene historial por proyecto entre recargas, con terminación adecuada del árbol de procesos al detenerlo o cerrarlo.

Quizás lo más importante: ahora puedes delegar tareas de código a agentes externos como Claude Code o Gemini CLI. Estos se integran mediante ACP y pasan por el mismo proceso de verificación y snapshot/revert que los agentes nativos. La aplicación deja claro cuando agentes externos operan bajo diferentes límites de seguridad: pueden ignorar las protecciones de escritura de Chimera, aunque el sistema de checkpoint/revert sigue ahí como red de seguridad.

## Cómo empezar

La configuración sigue siendo sencilla. Solo se requiere una clave de proveedor para comenzar, con capacidades opcionales claramente indicadas. Para diagnósticos en el editor, asegúrate de tener `ruff` instalado. El autocompletado en línea necesita Ollama con el modelo específico `qwen2.5-coder:1.5b-base` (atención al tag base - los modelos instruct no funcionarán bien para esto). Los agentes externos requieren sus respectivas herramientas CLI.

La versión incluye advertencias honestas: los instaladores no firmados activarán alertas de seguridad, los agentes externos tienen diferentes límites de seguridad, y el sistema de búsqueda aún no está integrado al flujo principal del agente. El ejecutor de comandos no es una terminal completa - cada comando corre en un proceso nuevo, por lo que estados como `cd` o `export` no persisten.

Para detalles completos, incluyendo dos bugs encontrados en escenarios no testeados, consulta el [CHANGELOG][Chimera Agent v0.44.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.44.0). Para probarlo tú mismo, actualiza tu instalación de Chimera Agent y explora el nuevo editor en `#/edit`.
