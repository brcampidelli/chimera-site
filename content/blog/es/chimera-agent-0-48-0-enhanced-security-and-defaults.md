---
title: "Chimera Agent 0.48.0: Mejoras en Seguridad y Configuraciones por Defecto"
date: 2026-09-02
category: update
summary: "Chimera Agent 0.48.0 introduce mejoras significativas en seguridad y cambios en las configuraciones por defecto, centrándose en el aislamiento del sandbox y la selección de modelos más económicos."
version: "0.48.0"
---

## Mejoras en el Aislamiento del Sandbox

La configuración por defecto del sandbox ha sido actualizada para priorizar la seguridad. Anteriormente, el sandbox `local` no estaba aislado, dependiendo de kernels de gobernanza y prompts de confirmación para proteger tu máquina. Este enfoque tenía vulnerabilidades, especialmente cuando los usuarios omitían los prompts o se inyectaban instrucciones. Ahora, el valor por defecto es `auto`, que utiliza **Seatbelt** en macOS con un perfil `(deny default)` y **bubblewrap** en Linux con parámetros de aislamiento estrictos. Esto asegura el aislamiento de la red y restringe las escrituras al directorio de trabajo y al directorio temporal, reduciendo significativamente los riesgos potenciales.

## Consideraciones para Windows y Kernels de Linux

Para Windows, la actualización indica explícitamente que no se proporciona ningún mecanismo de sandbox. Los filtros de red y tokens restringidos existentes no se aproximan, ya que la ausencia de un límite es menos peligrosa que uno que se cree erróneamente seguro. De manera similar, los kernels de Linux que rechazan espacios de nombres de usuario no privilegiados reportarán el sandbox como *no disponible*, asegurando transparencia sobre las limitaciones de seguridad.

## Modelo por Defecto Más Económico

El modelo por defecto ha sido cambiado de GPT-5.5 a DeepSeek V3.1. Este cambio aborda el alto costo asociado con el modelo anterior, que era el más caro del catálogo. DeepSeek V3.1 ofrece una opción más económica a $0.25/$0.95 por 1M tokens, comparado con $5.00/$30.00 de GPT-5.5. La variable de entorno `CHIMERA_DEFAULT_MODEL` sigue teniendo prioridad, y el selector de modelos permite cambios por conversación.

## Mejoras Basadas en Auditorías

Una auditoría extensa identificó numerosas recomendaciones, con el 56% del trabajo enfocado en el cableado más que en características del producto. Esta versión aborda muchos de estos problemas, asegurando que el código se ejecute correctamente y que los logs sean precisos. Algunas correcciones notables incluyen el manejo correcto de herramientas rechazadas, la eliminación de trabajos cron fallidos y la seguridad de cadenas que transportan credenciales. Cada corrección fue rigurosamente probada revirtiendo los cambios y asegurando que las pruebas detectaran los defectos.

## Nuevas Características y Mejoras

Las nuevas características incluyen credenciales almacenadas en el llavero del sistema operativo (`chimera secrets`), un mecanismo de aprobación de decisiones (`chimera approve`) y turnos de codificación que sobreviven a conexiones interrumpidas. Además, los comandos probados como de solo lectura ya no requieren confirmación, y los servidores MCP pueden abrirse en lugar de entregarse. Tres nuevas compuertas en CI mejoran aún más la robustez del sistema.

Para un relato detallado de todos los cambios, consulta el [CHANGELOG.md][Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0).

[Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0): CHANGELOG.md
