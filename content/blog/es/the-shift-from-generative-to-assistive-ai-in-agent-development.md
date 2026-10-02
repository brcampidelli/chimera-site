---
title: "El cambio de la IA generativa a la asistencial en el desarrollo de agentes"
date: 2026-09-18
category: analysis
summary: "A medida que evoluciona la IA, los desarrolladores deben enfocarse en usar los LLMs como herramientas de asistencia en lugar de muletas generativas, garantizando que los agentes mantengan autonomía y precisión."
sources:
  - headline: "How To Write With An LLM"
    url: https://simonwillison.net/2026/Sep/17/how-to-write-with-an-llm/
    outlet: "Simon Willison"
    published: 2026-09-17
  - headline: "Crusoe raises $3.9B to build massive data centers and small modular \"AI factories\""
    url: https://techcrunch.com/2026/09/17/crusoe-raises-3-9b-to-build-massive-data-centers-and-small-modular-ai-factories/
    outlet: "TechCrunch"
    published: 2026-09-17
  - headline: "Small AI models let drones autonomously identify and attack battlefield targets"
    url: https://arstechnica.com/ai/2026/09/nato-backed-startup-adapts-ai-for-autonomous-drone-recon-and-attack-missions/
    outlet: "Ars Technica"
    published: 2026-09-17
dropped: "9 matérias examinadas de 568 reunidas, 3 lidas para este texto."
---

El papel de los modelos de lenguaje grandes (LLMs) en el desarrollo de agentes está experimentando un cambio sutil pero significativo. En lugar de depender de los LLMs para generar contenido o decisiones, los desarrolladores los están usando cada vez más como herramientas de asistencia para refinar y mejorar procesos impulsados por humanos. Este enfoque asegura que los agentes mantengan precisión, responsabilidad y alineación con su propósito original. Los recientes hallazgos de [[1]](https://simonwillison.net/2026/Sep/17/how-to-write-with-an-llm/) destacan esta tendencia, enfatizando la importancia de usar los LLMs como editores de texto en lugar de escritores principales. Esta distinción es crucial para desarrolladores que construyen agentes que deben operar con alta confiabilidad y márgenes de error mínimos.

## Los riesgos de la dependencia generativa
Usar los LLMs como herramientas generativas puede generar una dependencia que socava la autonomía de los agentes. Cuando los desarrolladores dependen de los LLMs para producir salidas completas, corren el riesgo de introducir imprecisiones, sesgos o comportamientos no deseados. El consejo en [[1]](https://simonwillison.net/2026/Sep/17/how-to-write-with-an-llm/)—evitar usar cualquier palabra sugerida por un LLM—subraya la necesidad de que los desarrolladores mantengan el control sobre el proceso de toma de decisiones del agente. Este enfoque garantiza que las salidas del agente sean deliberadas y estén alineadas con sus objetivos de diseño.

## La IA asistencial en acción
El cambio hacia la IA asistencial es evidente en aplicaciones como las descritas en [[3]](https://arstechnica.com/ai/2026/09/nato-backed-startup-adapts-ai-for-autonomous-drone-recon-and-attack-missions/), donde modelos pequeños de IA permiten que drones identifiquen y ataquen objetivos en el campo de batalla de forma autónoma. Aquí, la IA no está generando decisiones desde cero, sino ayudando a refinar y ejecutar tareas predefinidas. Este enfoque aprovecha las fortalezas de la IA—velocidad, reconocimiento de patrones y escalabilidad—manteniendo la supervisión humana como núcleo. De manera similar, la inversión en infraestructura de IA por parte de Crusoe, reportada en [[2]](https://techcrunch.com/2026/09/17/crusoe-raises-3-9b-to-build-massive-data-centers-and-small-modular-ai-factories/), refleja una tendencia más amplia hacia sistemas que soportan operaciones asistidas por IA en lugar de completamente autónomas.

## Implicaciones prácticas para desarrolladores
Para los desarrolladores que construyen agentes, este cambio implica enfocarse en modularidad y precisión. En lugar de depender de los LLMs para generar contenido o decisiones, deberían usarlos para mejorar flujos de trabajo existentes. Esto podría incluir usar LLMs para validar salidas, sugerir mejoras o identificar errores potenciales. Al tratar los LLMs como herramientas en lugar de tomadores de decisiones, los desarrolladores pueden construir agentes que sean tanto poderosos como confiables. La clave está en mantener el control sobre la lógica central del agente mientras se aprovecha la IA para optimizar su rendimiento.
