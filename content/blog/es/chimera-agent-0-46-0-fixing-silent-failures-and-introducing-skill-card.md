---
title: "Chimera Agent 0.46.0: Corrección de fallos silenciosos e introducción de Skill Cards"
date: 2026-08-17
category: update
summary: "Chimera Agent 0.46.0 soluciona fallos silenciosos, introduce una biblioteca de habilidades curada y garantiza traducciones honestas en nueve idiomas."
version: "0.46.0"
---

## Fallos Silenciosos Corregidos

Chimera Agent 0.46.0 aborda una serie de fallos silenciosos que antes pasaban desapercibidos. Estos problemas no causaban cierres inesperados ni errores, pero comprometían funcionalidades críticas. Por ejemplo, cinco almacenes JSON perdían datos silenciosamente debido a la falta de mecanismos de bloqueo durante operaciones de lectura-modificación-escritura. Esto permitía que un proceso sobrescribiera los cambios de otro sin advertencia. Uno de estos almacenes era el de habilidades, donde datos aprendidos podían borrarse en ejecuciones posteriores. Ahora, los cinco almacenes bloquean y escriben atómicamente, garantizando integridad.

Otro fallo involucraba el bot de Discord de la app, que funcionaba sin aislamiento adecuado. Esto impedía que el build gate lo detectara, dejando un vacío de seguridad. De igual modo, una barrera de gobernanza que mataba la CLI al importar (cuando activada) pasó desapercibida porque nadie la había ejecutado con gobernanza habilitada. Estos problemas ya están corregidos, asegurando que las funcionalidades se comporten como se espera.

## Biblioteca de Habilidades Curada

Esta versión introduce una biblioteca de habilidades curada, con 23 skill cards agrupadas por su uso en el flujo de trabajo: definir, construir, verificar, revisar y enviar. Estas cards son datos, no código, facilitando contribuciones y revisiones. Cada card incluye secciones como Trigger, Do, Avoid, Check y Risk, y están disponibles en nueve idiomas. Las traducciones se gestionan en un archivo adjunto, manteniendo la skill card original idéntica byte a byte.

Sin embargo, incluir estas cards en el prompt del agente es opcional y está desactivado por defecto, debido a un aumento significativo en el uso de tokens sin mejora proporcional en rendimiento. Esta decisión se basó en una prueba A/B que mostró una mejora del +16.7pp, pero sin significancia estadística.

## Traducciones Honestas

Una nueva prueba garantiza que las traducciones de skill cards sean honestas y completas. Distingue tres estados que parecen idénticos en un archivo: desactualizadas, incompletas y faltantes. Las traducciones desactualizadas afirman traducir texto que ha cambiado, mientras que las incompletas carecen de secciones. Las faltantes son deudas claramente marcadas. Esta barrera evita que cards no traducidas aparezcan en la UI, un problema antes detectable solo leyendo archivos, no por fallos en builds.

## Correcciones en Documentación

Se corrigieron dieciséis afirmaciones en la documentación que el código no respaldaba, en los diez idiomas. Cinco eran directamente falsas, como las opciones de gobernanza y los destinos de desktop rail. Además, dos afirmaciones ahora incluyen advertencias necesarias, asegurando información precisa para usuarios.

## Qué Hacer Ahora

Para actualizar a Chimera Agent 0.46.0, ejecuta:

```
pip install -U chimera-agent
pip install -U 'chimera-agent[desktop]'
```

Para más detalles, consulta las [notas de la versión][Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0).

[Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0): chimeraagent.space/release-notes
