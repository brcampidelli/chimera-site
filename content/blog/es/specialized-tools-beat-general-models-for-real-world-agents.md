---
title: "Herramientas especializadas superan a los modelos generales en agentes para el mundo real"
date: 2026-11-02
category: analysis
summary: "Los agentes que eligen la herramienta adecuada para cada tarea superan a los modelos de propósito general, pero la adopción en el mundo real sigue rezagada por costos y desconfianza."
sources:
  - headline: "Adobe is testing how well AI agents can use editing tools like a Photoshop professional would"
    url: https://the-decoder.com/adobe-is-testing-how-well-ai-agents-can-use-editing-tools-like-a-photoshop-professional-would/
    outlet: "The Decoder"
    published: 2026-11-01
  - headline: "Basically no one is using AI agents for their DoorDash orders"
    url: https://arstechnica.com/ai/2026/10/doordash-says-outside-ai-agents-have-only-led-to-hundreds-of-orders-so-far/
    outlet: "Ars Technica"
    published: 2026-10-30
  - headline: "Zest's new AI agent finds restaurants and books reservations over text"
    url: https://techcrunch.com/2026/10/30/zests-new-ai-agent-finds-restaurants-and-books-reservations-over-text/
    outlet: "TechCrunch"
    published: 2026-10-30
dropped: "80 matérias examinadas de 530 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (2), publicado há 122h (1), publicado há 245h (1), publicado há 294h (1), publicado há 296h (1), publicado há 480h (1)"
---

La brecha entre lo que los agentes de IA pueden hacer en un laboratorio y lo que la gente realmente usa se está ampliando. EditAgent de Adobe demuestra que las herramientas especializadas —no modelos generales más grandes— son la clave para un rendimiento competente, pero necesita diez veces más cómputo. Mientras tanto, agentes orientados al consumidor como los pedidos de DoorDash y el concierge de restaurantes de Zest están luchando por encontrar usuarios. La lección para quienes construyen: enfóquense en la selección de herramientas y la eficiencia, no solo en escalar el modelo.

## La herramienta correcta para cada trabajo

Adobe Research y UC San Diego construyeron EditAgent, un sistema de IA que edita imágenes más como un profesional de Photoshop. En lugar de reintentar una y otra vez con el mismo editor de propósito general, el agente elige la herramienta especializada correcta para cada tarea y deja que un modelo de lenguaje estándar seleccione el mejor resultado basándose en datos medidos de la imagen [[1]](https://the-decoder.com/adobe-is-testing-how-well-ai-agents-can-use-editing-tools-like-a-photoshop-professional-would/). Este enfoque funciona, pero necesita aproximadamente diez veces más cómputo. El trade-off es claro: la competencia viene de la orquestación, no solo del poder bruto del modelo.

Para quienes construyen agentes, esta es una idea crucial. Los modelos de propósito general son versátiles pero ineficientes. Al darle a un agente una caja de herramientas especializadas y una forma de evaluar resultados, puedes lograr mejores resultados —si puedes pagar el overhead. El desafío es hacer que esa orquestación sea lo suficientemente barata para producción.

## La brecha de adopción

A pesar de los avances técnicos, el uso en el mundo real sigue siendo bajo. Ars Technica reporta que básicamente nadie está usando agentes de IA para sus pedidos de DoorDash, aunque todavía es temprano para este caso de uso de e-commerce relativamente nuevo [[2]](https://arstechnica.com/ai/2026/10/doordash-says-outside-ai-agents-have-only-led-to-hundreds-of-orders-so-far/). De manera similar, el nuevo agente de IA de Zest encuentra restaurantes y reserva mesas por mensaje de texto, pero recién está lanzándose y enfrenta la misma batalla cuesta arriba por la confianza del usuario [[3]](https://techcrunch.com/2026/10/30/zests-new-ai-agent-finds-restaurants-and-books-reservations-over-text/).

¿Por qué la reticencia? Para los consumidores, los agentes todavía son poco confiables y opacos. Un pedido equivocado en DoorDash o una reserva mal hecha es una molestia real. Para las empresas, el costo de ejecutar agentes como EditAgent es prohibitivo. Hasta que los agentes sean confiables y asequibles a la vez, la adopción seguirá rezagada respecto a la capacidad.

## Qué deberían hacer quienes construyen

Primero, inviertan en selección de herramientas. En lugar de depender de un solo modelo para hacer todo, diseñen agentes que puedan elegir entre un conjunto de herramientas especializadas y evaluar resultados de forma objetiva. Segundo, optimicen para eficiencia. El costo de cómputo diez veces mayor de EditAgent es una advertencia: si tu agente no es ligero, no va a escalar. Finalmente, construyan confianza de forma incremental. Empiecen con tareas de bajo riesgo donde los errores sean tolerables y dejen que los usuarios vean el razonamiento del agente. El camino hacia la adopción está pavimentado con victorias pequeñas y confiables —no con demos llamativos.
