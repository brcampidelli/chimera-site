---
title: "Chimera Agent 0.45.1: Corrección para fallos en Docker sin interfaz gráfica"
date: 2026-08-16
category: update
summary: "La versión 0.45.1 soluciona un problema crítico en el inicio de Docker donde los contenedores sin interfaz gráfica fallaban debido a una dependencia innecesaria de FastAPI."
version: "0.45.1"
---

## Por qué fallaban los contenedores Docker al iniciar

Chimera Agent 0.45.0 introdujo un fallo silencioso en despliegues Docker sin interfaz gráfica. La imagen del contenedor instalaba `.[full]` sin el extra `desktop`, que excluye FastAPI intencionalmente. Sin embargo, la ruta cron comenzó a importar `chimera.api.usage`, activando la inicialización temprana del módulo API. Esto arrastró FastAPI como dependencia indirecta a través de un lector JSONL, haciendo que los contenedores entraran en bucle de fallos con `ModuleNotFoundError`.

El error pasó desapercibido porque:
1. Los entornos de desarrollo normalmente tienen FastAPI instalado
2. Ninguna de las 2,945 pruebas existentes simulaba una instalación limpia de `.[full]`
3. El fallo solo se manifestaba en despliegues de producción

## Carga diferida para dependencias principales

La solución aborda la causa raíz en lugar de enmascarar síntomas. Añadir `desktop` a la imagen habría funcionado, pero violaba el propósito documentado del extra ("el CLI/gateway principal nunca lo necesita") e incrementaba innecesariamente el tamaño de la imagen.

La versión 0.45.1 modifica `chimera/api/__init__.py` para:
- Resolver reexportaciones de forma diferida en lugar de inmediata
- Mantener las dependencias de FastAPI aisladas en componentes web específicos
- Conservar modos de fallo claros cuando `desktop` es realmente necesario

Cinco módulos terminales (`usage`, `roles`, `sessions`, `posture` y `config_api`) ya no arrastran implícitamente la pila web cuando son importados por operaciones CLI. El gateway sigue funcionando con solo `.[full]` instalado.

## Nueva red de seguridad

Una prueba en subproceso ahora verifica que los imports funcionan sin FastAPI disponible. Esto habría detectado el problema antes del lanzamiento al:
1. Ejecutarse en un entorno donde `fastapi` se hace deliberadamente no importable
2. Verificar la funcionalidad principal antes de otras comprobaciones
3. Reflejar condiciones reales de despliegue

La verificación end-to-end confirma la corrección: una instalación limpia de `.[full]` ahora puede ejecutar `serve --cron` sin fallos.

Actualiza con `pip install -U chimera-agent==0.45.1`. Para verificar el despliegue, prueba tu contenedor con `serve --cron` y comprueba los mensajes de inicialización del gateway. [Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) tiene detalles técnicos completos de los cambios.
