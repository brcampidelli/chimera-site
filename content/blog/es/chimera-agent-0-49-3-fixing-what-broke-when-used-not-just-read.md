---
title: "Chimera Agent 0.49.3: Arreglando lo que falla al usarlo, no solo al leerlo"
date: 2026-10-06
category: update
summary: "Seis defectos corregidos tras pruebas en el mundo real, incluyendo fallos silenciosos de escritura, resultados de pruebas engañosos y valores predeterminados de modelos desactualizados."
version: "0.49.3"
---

## Cuando las herramientas mienten sobre su propio estado

La lección más costosa vino de la lectura de datos de MCP. Una tarea que costó US$5.11 no generó ningún archivo porque el mensaje de rechazo no distinguía entre una negativa humana y una aprobación imposible. Tres intentos idénticos quemaron el presupuesto antes de que los usuarios se dieran cuenta de que los reintentos no funcionarían. Ahora, cada caso de rechazo se explica por sí mismo: la negativa humana muestra quién la rechazó, la negativa del sistema nombra el bloque de configuración, y los casos HTTP indican explícitamente que no existe un aprobador mientras sugieren dos soluciones: habilitar la pausa para aprobación o evitar contenido no confiable.

## Verificación que no lo era

Una insignia `verified: True` con registros de pruebas aprobadas se volvió irrelevante cuando escrituras posteriores alteraron los archivos. Los usuarios veían marcas de verificación verde mientras trabajaban con contenido no verificado. Ahora el sistema rastrea si los archivos entregados coinciden con el estado verificado y muestra insignias de advertencia cuando divergen. La verificación original sigue visible — era precisa en su momento — pero la discrepancia actual aparece junto a ella.

## Valores predeterminados que fallaron

Las asignaciones de modelos habían derivado peligrosamente:
- El modelo principal era 4 veces más caro que las opciones actuales
- Un modelo de vista previa estaba en una posición predeterminada crítica
- Las ventanas de contexto no cumplían con los requisitos del nivel

Los nuevos valores predeterminados coinciden con el precio/rendimiento actual (deepseek-v4-flash-0731 a 1/4 del costo) mientras mantienen la capacidad. El archivo .env.example ya no sugiere modelos retirados o precios de otra época. Notablemente, la selección de modelos no se basó en pruebas de calidad de salida — ocho candidatos escribieron archivos exitosamente — sino en factores medibles: precio, ventana de contexto y benchmarks de terceros.

## Qué hacer ahora

Actualiza inmediatamente si usas:
- Servidores MCP (el comportamiento de prueba cambió)
- Verificación de archivos (nueva detección de discrepancias)
- Valores predeterminados de modelos (cambios significativos en costo/rendimiento)

Los detalles técnicos completos explican el razonamiento detrás de cada corrección: [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
