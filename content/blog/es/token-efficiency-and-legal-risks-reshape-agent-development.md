---
title: "La eficiencia en tokens y los riesgos legales redefinen el desarrollo de agentes"
date: 2026-09-26
category: analysis
summary: "El sistema SoL-Pi de Nvidia demuestra el potencial sin explotar en la optimización de infraestructura para agentes, mientras la demanda a Suno resalta los crecientes riesgos legales en IA generativa."
sources:
  - headline: "Nvidia's SoL-Pi system cuts coding agent token usage nearly in half by optimizing the harness"
    url: https://the-decoder.com/nvidias-sol-pi-system-cuts-coding-agent-token-usage-nearly-in-half-by-optimizing-the-harness/
    outlet: "The Decoder"
    published: 2026-09-26
  - headline: "Sony and UMG are suing Suno again"
    url: https://www.theverge.com/ai-artificial-intelligence/1000758/suno-sony-umg-lawsuit-ai-music
    outlet: "The Verge"
    published: 2026-09-25
  - headline: "Ahead of US IPO, British AI neocloud Nscale secures $3.36B in convertible financing"
    url: https://techcrunch.com/2026/09/25/ahead-of-u-s-ipo-british-ai-neocloud-nscale-secures-3-36b-in-convertible-finacing/
    outlet: "TechCrunch"
    published: 2026-09-25
dropped: "68 matérias examinadas de 573 reunidas, 3 lidas para este texto. Descartadas: publicado há 236h (3), publicado há 94h (1), publicado há 235h (1), publicado há 438h (1), publicado há 618h (1), publicado há 958h (1)"
---

Las mayores ganancias en eficiencia para agentes podrían venir no de modelos más grandes, sino de repensar cómo interactúan con sus entornos. El sistema SoL-Pi de Nvidia [[1]](https://the-decoder.com/nvidias-sol-pi-system-cuts-coding-agent-token-usage-nearly-in-half-by-optimizing-the-harness/) prueba que se pueden lograr ahorros sustanciales de tokens—hasta 49% para agentes de programación—optimizando la capa de control entre modelos y entornos de ejecución. Esto sugiere que muchos frameworks de agentes aún operan con sobrecarga innecesaria, tratando el arnés como simple tubería en lugar de un componente ajustable.

## Infraestructura como palanca de rendimiento

El enfoque de SoL-Pi destaca por usar agentes de investigación para probar sistemáticamente 152 enfoques en miles de ejecuciones. Aunque los resultados variaron entre benchmarks, la metodología apunta a un principio más amplio: la infraestructura de agentes merece la misma optimización rigurosa que normalmente reservamos para arquitecturas de modelos. Los desarrolladores que construyan agentes personalizados deberían auditar sus capas de control en busca de ineficiencias similares, especialmente en patrones de interacción repetitivos.

## Crece la exposición legal para sistemas generativos

La renovada demanda contra Suno por parte de Sony y UMG [[2]](https://www.theverge.com/ai-artificial-intelligence/1000758/suno-sony-umg-lawsuit-ai-music) señala posiciones legales más duras en torno a datos de entrenamiento. A diferencia de casos anteriores centrados en similitud de salidas, esta acción alega infracción sistémica en la construcción del modelo. Para desarrolladores de agentes, esto subraya la necesidad de documentar la procedencia de componentes de entrenamiento, especialmente al incorporar modelos o datasets de terceros.

## Conclusiones prácticas

1. Perfila el uso de tokens de tu agente a nivel de arnés, no solo del modelo—busca paso redundante de contexto o gestión subóptima de estado
2. Trata la evaluación de riesgo legal como un proceso continuo, no como una casilla de cumplimiento única
3. Considera estructuras de financiación convertible como las de Nscale [[3]](https://techcrunch.com/2026/09/25/ahead-of-u-s-ipo-british-ai-neocloud-nscale-secures-3-36b-in-convertible-finacing/) al construir plataformas de agentes intensivas en infraestructura, pero reconoce que este camino exige métricas claras de escalado

El próximo año separará los frameworks de agentes que simplemente envuelven modelos de aquellos diseñados holísticamente—con igual atención a eficiencia computacional, viabilidad legal y escalado sostenible.
