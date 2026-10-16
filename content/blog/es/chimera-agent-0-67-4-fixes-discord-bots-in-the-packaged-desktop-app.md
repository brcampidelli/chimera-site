---
title: "Chimera Agent 0.67.4 corrige los bots de Discord en la app de escritorio empaquetada"
date: 2026-10-16
category: update
summary: "La aplicación de escritorio instalada ya no crashea con un error de módulo faltante al iniciar un bot de Discord."
version: "0.67.4"
---

La app de escritorio empaquetada que se introdujo en la versión anterior se distribuyó con un contrato roto. Si alguien instalaba la aplicación y la apuntaba a un bot de Discord, el panel de estado no mostraba un bot en ejecución. Mostraba un traceback que terminaba en `ModuleNotFoundError: No module named 'discord'`. La configuración del agente era válida. El token era correcto. La falla estaba en el empaquetado mismo.

## Qué se rompió y por qué importa

El problema fue la combinación de dos decisiones que no colisionaron hasta que se ejecutó la build de release. Primero, los adaptadores de mensajería —incluido Discord— se diseñaron como imports lazy. El framework no carga cada superficie de chat al iniciar; solo importa el adaptador cuando una configuración de bot lo solicita. Ese diseño mantenía los arranques en frío rápidos y el uso de memoria bajo, y funcionaba en todo entorno donde todas las dependencias opcionales estuvieran presentes.

Segundo, la build de release usaba un conjunto de dependencias recortado. El extra de mensajería, que contiene las librerías cliente de Discord, se marcó como opcional y se omitió de la aplicación instalada. El análisis de PyInstaller recorrió el grafo de imports estáticamente, vio el import lazy escondido detrás de un cargador basado en strings y concluyó que el código del adaptador era código muerto. El resultado: una configuración funcional que el runtime no podía ejecutar.

Para quien construye agentes, el impacto fue específico. Cualquier bot definido con una superficie de Discord fallaba exclusivamente en la app empaquetada. El mismo archivo de configuración funcionaba desde source. El mismo archivo de configuración funcionaba en un contenedor. La inconsistencia significaba que la app de escritorio no era confiable para toda una clase de agentes, que es exactamente la clase que genera la mayor cantidad de feedback de la comunidad.

## La corrección y lo que implica para el empaquetado

La versión 0.67.4 corrige la declaración de dependencias para que el extra de mensajería se incluya en la aplicación instalada. PyInstaller ahora ve el adaptador de Discord como código alcanzable e incluye los módulos necesarios. No se requiere ningún cambio de configuración. Ni actualizar las definiciones de los agentes. El panel de estado del bot muestra un estado en ejecución en lugar de un error de importación.

Detrás de esa simple afirmación hay una lección más amplia sobre la que los maintainers actuaron de inmediato. Los imports lazy son una técnica de performance que las herramientas de autoría deben respetar, pero a las herramientas de empaquetado hay que explicarles explícitamente. El import oculto siempre fue arquitectura intencional. La omisión fue una brecha de metadatos entre el manifiesto del paquete y el proceso de freezing. La versión 0.67.4 cierra esa brecha para el adaptador de Discord y establece un patrón para cada superficie de mensajería que siga el mismo diseño de carga lazy.

## Qué hacer ahora

Si estás ejecutando la aplicación instalada 0.67.3, descargá la actualización 0.67.4 desde la página de releases. La app empaquetada está firmada de la misma manera y se instala sobre la versión existente. Después de la actualización, reiniciá cualquier configuración de bot de Discord. El estado pasa a running sin pasos adicionales.

Si construís agentes desde source y nunca usaste la app empaquetada, nada cambia. El paquete instalado vía pip ya incluía el extra de mensajería cuando se instalaba con el flag estándar `[all]`. Esta versión solo afecta la aplicación de escritorio empaquetada.

Para la lista completa de cambios en esta versión, ver [Chimera Agent v0.67.4](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.67.4).
