---
title: "El costo de la inteligencia de los agentes se mide en aire y en código"
date: 2026-10-22
category: analysis
summary: "Quienes construyen agentes enfrentan ahora un doble problema contable: las externalidades de la inferencia y el riesgo asimétrico de las vulnerabilidades descubiertas por IA."
sources:
  - headline: "Data centers could erase decades of air quality gains"
    url: https://www.theverge.com/ai-artificial-intelligence/1015958/data-center-pollution-rising-report
    outlet: "The Verge"
    published: 2026-10-21
  - headline: "Tesla supera em lucro e melhora fluxo de caixa apesar de investimentos em IA"
    url: https://www.infomoney.com.br/mercados/tesla-supera-em-lucro-e-melhora-fluxo-de-caixa-apesar-de-investimentos-em-ia/
    outlet: "InfoMoney"
    published: 2026-10-21
  - headline: "OpenAI's GPT-5.6 Sol and Google's Gemini 4 Argon found critical PHP flaw affecting millions of websites"
    url: https://the-decoder.com/openais-gpt-5-6-sol-and-gemini-4-argon-discovered-the-critical-php-vulnerability-affecting-millions-of-websites/
    outlet: "The Decoder"
    published: 2026-10-21
dropped: "18 matérias examinadas de 532 reunidas, 3 lidas para este texto."
---

La infraestructura que hace posibles los agentes autónomos ha empezado a generar facturas que no aparecen en ninguna factura de la nube. Una llega en forma de material particulado. Otra llega como una vulnerabilidad crítica en código que comparten millones de sitios. Ninguna estaba contemplada en la propuesta original de la IA agéntica, y ambas recaen ahora sobre quienes construyen con estos sistemas.

La demanda eléctrica de los centros de datos podría, en cinco años, borrar décadas de avances en calidad del aire [[1]](https://www.theverge.com/ai-artificial-intelligence/1015958/data-center-pollution-rising-report). No es una preocupación regulatoria lejana. Es una restricción que va a impactar en la selección de modelos, el enrutamiento de inferencia y la decisión de si una tarea justifica siquiera usar un agente. La suposición de que más cómputo es siempre la respuesta ya se estaba debilitando bajo la presión de los costos. Los datos de calidad del aire la convierten en algo más cercano a un principio de diseño: la inferencia más barata es la que no ejecutas.

## El problema del descubrimiento de doble filo

Los sistemas agénticos ahora son lo bastante buenos para encontrar fallas que la revisión humana pasó por alto durante años. Una vulnerabilidad crítica de PHP que afecta a millones de sitios web fue descubierta por GPT-5.6 Sol de OpenAI como parte de la iniciativa Patch the Planet, e independientemente por la firma de seguridad Wiz usando Gemini 4 Argon de Google [[3]](https://the-decoder.com/openais-gpt-5-6-sol-and-gemini-4-argon-discovered-the-critical-php-vulnerability-affecting-millions-of-websites/). Es una ganancia de capacidad genuina. También es una advertencia. El propio comunicado de OpenAI señala que las mismas capacidades que encuentran vulnerabilidades pueden ayudar a los atacantes a explotarlas [[3]](https://the-decoder.com/openais-gpt-5-6-sol-and-gemini-4-argon-discovered-the-critical-php-vulnerability-affecting-millions-of-websites/).

Para los constructores, esto colapsa la distancia entre ofensiva y defensiva. Un agente que audita tus dependencias también es un agente que puede mapear tu superficie de ataque. Las herramientas son simétricas. La única asimetría está en quién se mueve primero. Los equipos que tratan la revisión de seguridad asistida por IA como un proceso continuo parchearán antes de la explotación. Los equipos que la tratan como una auditoría periódica competirán en velocidad contra los mismos modelos que usan.

## El baño de realidad del flujo de caja

El trimestre de Tesla ofrece un contrapunto útil al catastrofismo. La compañía reportó 1.530 millones de dólares en flujo de caja libre, frente a una cifra negativa el trimestre anterior, mientras citaba explícitamente las inversiones en IA y robótica como parte de su posicionamiento en esos sectores [[2]](https://www.infomoney.com.br/mercados/tesla-supera-em-lucro-e-melhora-fluxo-de-caixa-apesar-de-investimentos-em-ia/). La lección no es que la inversión en IA sea segura. Es que la disciplina de flujo de caja y el gasto en IA no son mutuamente excluyentes, incluso para una empresa que invierte con fuerza en modelos y hardware.

Para los constructores de agentes, la conclusión práctica es más concreta. Puedes invertir en capacidad agéntica sin tratar el cómputo como si fuera gratis. Puedes ejecutar agentes enfocados en seguridad sin asumir que solo los usará tu equipo. Y puedes medir el costo de una tarea en algo más que tokens y latencia. Los datos de calidad del aire y la vulnerabilidad de PHP son la misma historia desde dos ángulos: las externalidades de la inteligencia de los agentes se están volviendo visibles, y se están convirtiendo en tu problema.

Lo que sigue siendo práctico es esto: audita tu volumen de inferencia como auditas tus dependencias. Trata cada despliegue de un agente como una superficie de seguridad, no solo como una herramienta de productividad. Y cuando un modelo encuentre una vulnerabilidad en tu stack, asume que el modelo de alguien más ya la está buscando también.
