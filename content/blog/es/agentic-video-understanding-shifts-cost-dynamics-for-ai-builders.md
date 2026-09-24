---
title: "La comprensión de video basada en agentes cambia la dinámica de costos para los desarrolladores de IA"
date: 2026-09-02
category: analysis
summary: "El análisis de video adaptativo de Google y la política de precios transparente de Ollama muestran cómo los enfoques basados en agentes están transformando la economía de la IA multimodal."
sources:
  - headline: "Introducing agentic video understanding with Gemini"
    url: https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/
    outlet: "Google DeepMind"
    published: 2026-09-01
  - headline: "Ollama's transparent pricing · Ollama Blog"
    url: https://ollama.com/blog/transparent-pricing
    outlet: "Ollama"
    published: 2026-08-31
  - headline: "Google Gemini's new agent-based video analysis cuts token usage by up to 88 percent"
    url: https://the-decoder.com/google-geminis-new-agent-based-video-analysis-cuts-token-usage-by-up-to-88-percent/
    outlet: "The Decoder"
    published: 2026-09-02
dropped: "373 matérias examinadas de 557 reunidas, 3 lidas para este texto. Descartadas: HTTP 429 (17), publicado há 17132h (4), publicado há 2328h (3), publicado há 2352h (2), publicado há 2469h (2), publicado há 6860h (2)"
---

La economía de construir agentes de IA acaba de cambiar para quienes trabajan con video. Dos anuncios esta semana—la comprensión de video basada en agentes de Google [[1]](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/)[[3]](https://the-decoder.com/google-geminis-new-agent-based-video-analysis-cuts-token-usage-by-up-to-88-percent/) y la actualización de precios de Ollama [[2]](https://ollama.com/blog/transparent-pricing)—apuntan a la misma tendencia: los proveedores de infraestructura están pasando del cómputo bruto a enfoques más inteligentes y adaptativos que permiten a los modelos decidir cómo asignar recursos.

## Modelos como agentes conscientes del presupuesto

El avance de Google en el análisis de video no se trata de un mejor reconocimiento—sino de permitir que el modelo actúe como un analista consciente de los costos. En lugar de procesar cada fotograma a intervalos fijos (un método que consume tokens en secuencias irrelevantes), el enfoque agéntico de Gemini decide qué segmentos examinar y a qué resolución [[3]](https://the-decoder.com/google-geminis-new-agent-based-video-analysis-cuts-token-usage-by-up-to-88-percent/). La reducción del 88% en tokens para videos largos [[3]](https://the-decoder.com/google-geminis-new-agent-based-video-analysis-cuts-token-usage-by-up-to-88-percent/) sugiere que la mayoría del procesamiento actual de video es literalmente derrochador.

Esto es importante porque el video ha sido la modalidad más cara de manejar a escala. Los equipos que construyen herramientas de vigilancia, moderación de contenido o investigación a menudo tenían que elegir entre costos de API prohibitivos o desarrollar lógicas personalizadas de muestreo de fotogramas. Ahora, el modelo mismo maneja esa optimización, lo que cambia el cálculo para cualquier agente que trabaje con datos temporales.

## El efecto dominó de la transparencia

La decisión de Ollama de adoptar precios por token [[2]](https://ollama.com/blog/transparent-pricing) parece irrelevante al principio, pero es parte de la misma maduración de la infraestructura. Cuando los proveedores dejan de agrupar el cómputo en niveles opacos y comienzan a cobrar por el uso real, obliga a los desarrolladores a pensar como el agente de video de Gemini—evaluando constantemente qué procesamiento es esencial. Los precios transparentes premian las arquitecturas eficientes.

Para los desarrolladores de agentes, esto significa dos cambios concretos:
1. Los flujos de trabajo intensivos en video que antes eran prohibitivos ahora pueden ser viables, especialmente para análisis de larga duración (como la revisión de deposiciones legales o el monitoreo de vida silvestre)
2. El viejo enfoque de "arrojar más tokens al problema" se vuelve claramente derrochador a medida que los proveedores exponen los costos reales

La conclusión no se trata específicamente de Gemini o Ollama—sino de que la infraestructura está evolucionando para apoyar agentes que gastan recursos computacionales con el mismo cuidado con el que los humanos gestionan un presupuesto. Los desarrolladores que diseñen sus sistemas en torno a este principio tendrán una ventaja a medida que estas tendencias de precios y eficiencia se aceleren.
