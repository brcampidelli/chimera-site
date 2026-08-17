---
title: "Chimera Agent 0.46.0: Reglas que Aplican en Casa"
date: 2026-08-17
category: update
summary: "Corregida la pérdida silenciosa de datos, tarjetas de habilidades no traducidas y compuertas que no bloqueaban — más una biblioteca de 23 tarjetas de habilidades derivadas de incidentes."
version: "0.46.0"
---

## Cuando las Reglas no Alcanzan

Cinco almacenes JSON, incluido el de habilidades, permitían que procesos concurrentes sobrescribieran silenciosamente los datos del otro. Una ejecución que aprendió algo podía ver su memoria borrada por la siguiente. Todos cinco ahora bloquean y escriben atómicamente — sin configuración necesaria. El mismo patrón corrigió funciones de gobernanza que fallaban al importar y un bot de Discord que ejecutaba sin verificaciones.

## Tarjetas de Habilidades como Reportes de Incidentes

Veintitrés tarjetas ahora residen en `skills/`, trece escritas a partir de defectos propios del proyecto. Cada una documenta un modo de fallo en el formato Disparador/Hacer/Evitar/Verificar/Riesgo — datos, no código. Están agrupadas por fase del flujo de trabajo (`define · build · verify · review · ship`) y etiquetadas por tema. Importa una con:

```
chimera skills-import skills/verify-before-claiming
```

Las tarjetas soportan nueve idiomas mediante archivos adjuntos que preservan el hash SHA-256 original. El sistema detecta traducciones obsoletas (que afirman traducir texto modificado) e incompletas (con secciones faltantes), pero permite traducciones ausentes con etiquetado claro.

## Compuertas que Realmente Bloquean

Tres defectos del agente comprometieron componentes críticos sin fallar en pruebas. La causa raíz: las verificaciones listaban comportamientos requeridos en lugar de exenciones permitidas. Cuando aparecían nuevos comportamientos, las compuertas seguían abiertas. Ahora listan exenciones — si algo no está explícitamente permitido para omitir verificaciones, se verifica.

Dieciséis afirmaciones en documentación fueron corregidas en diez idiomas. Cinco eran directamente falsas: los modos de gobernanza no incluyen `ask`, el riel de escritorio no tiene destino de chat, y `CHIMERA_TAVILY_API_KEY` no existe en el código. Dos afirmaciones optimistas ahora llevan su evidencia desconfirmadora adyacente.

```
pip install -U chimera-agent
```

Explora las tarjetas en chimeraagent.space/skills [Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0) o revisa `bench/skillcard/RESULTS.md` para la compensación de rendimiento opcional.
