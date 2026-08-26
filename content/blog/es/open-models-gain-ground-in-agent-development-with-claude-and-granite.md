---
title: "Los modelos abiertos ganan terreno en el desarrollo de agentes con Claude y Granite"
date: 2026-08-26
category: analysis
summary: "La integración de Claude con Ollama y los modelos de pesos abiertos Granite de IBM señalan un cambio hacia frameworks de agentes más accesibles y personalizables."
sources:
  - headline: "Claude Desktop support with Ollama · Ollama Blog"
    url: https://ollama.com/blog/claude-desktop
    outlet: "Ollama"
    published: 2026-08-25
  - headline: "IBM's new Granite 4.2 models ride the wave of interest in local LLMs"
    url: https://arstechnica.com/ai/2026/08/ibms-new-granite-4-2-models-ride-the-wave-of-interest-in-local-llms/
    outlet: "Ars Technica"
    published: 2026-08-26
  - headline: "IBM drops open-weight Granite 4.2 family with built-in agentic capabilities under Apache 2.0"
    url: https://the-decoder.com/ibm-drops-open-weight-granite-4-2-family-with-built-in-agentic-capabilities-under-apache-2-0/
    outlet: "The Decoder"
    published: 2026-08-26
dropped: "370 matérias examinadas de 556 reunidas, 3 lidas para este texto. Descartadas: HTTP 429 (16), publicado há 16964h (4), publicado há 2160h (3), publicado há 2184h (2), publicado há 6692h (2), publicado há 6739h (2)"
---

El panorama del desarrollo de agentes de IA está virando hacia la apertura y flexibilidad. Dos avances recientes—la integración de Claude con Ollama y el lanzamiento de la familia de modelos Granite 4.2 por IBM—destacan una tendencia creciente: las herramientas para construir agentes se vuelven más accesibles y adaptables a necesidades personalizadas. Este cambio importa para desarrolladores que buscan control sobre su stack sin sacrificar capacidades.

## Modelos abiertos entran al ecosistema Claude

La nueva compatibilidad de Claude con Ollama [[1]](https://ollama.com/blog/claude-desktop) permite que desarrolladores enruten solicitudes de Claude Desktop a través de Ollama como puerta de entrada externa. Esto conecta efectivamente la interfaz de Claude con modelos abiertos, expandiendo las opciones para quienes prefieren o requieren alternativas de código abierto. El movimiento reconoce que muchos creadores de agentes quieren combinar componentes en lugar de quedar atados a ecosistemas propietarios.

## Granite lleva capacidades agentes a pesos abiertos

Los modelos Granite 4.2 de IBM [[2]](https://arstechnica.com/ai/2026/08/ibms-new-granite-4-2-models-ride-the-wave-of-interest-in-local-llms/)[[3]](https://the-decoder.com/ibm-drops-open-weight-granite-4-2-family-with-built-in-agentic-capabilities-under-apache-2-0/) llevan esta apertura más lejos al integrar capacidades agentes directamente en modelos con licencia Apache 2.0. La versión 30B con entrenamiento "agentic RL" permite al modelo aprender uso de herramientas y ejecución de código autónomamente—características típicas de sistemas propietarios. Con ventanas de contexto de hasta 512.000 tokens y tres variantes de tamaño (3B, 8B, 30B), Granite ofrece opciones escalables para distintos escenarios de despliegue, especialmente en entornos empresariales donde la predictibilidad es clave.

## Implicaciones prácticas para creadores de agentes

Para desarrolladores, estos avances significan más opciones al diseñar sistemas de agentes. La integración Claude-Ollama permite probar interfaces propietarias con modelos abiertos, mientras que los pesos abiertos de Granite con capacidades agentes integradas reducen la dependencia de APIs cerradas para comportamientos avanzados. La conclusión clave es que la barrera para experimentar y desplegar agentes capaces sigue bajando—siempre que estés dispuesto a trabajar directamente con las herramientas en lugar de soluciones preempaquetadas.
