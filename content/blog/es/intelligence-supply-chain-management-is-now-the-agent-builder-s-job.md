---
title: "La gestión de la cadena de suministro de inteligencia ya es tarea del creador de agentes"
date: 2026-11-03
category: analysis
summary: "Demandas, pérdidas y herramientas de entrenamiento sin código apuntan al mismo cambio: el valor en IA se desplaza de la creación de modelos al ensamblaje de modelos, y los creadores de agentes heredan el desorden."
sources:
  - headline: "The New York Times sues Brave web browser for AI scraping and bypassing paywalls"
    url: https://www.theverge.com/tech/1024588/brave-lawsuit-ai-scraping-new-york-times
    outlet: "The Verge"
    published: 2026-11-02
  - headline: "Trajectory raises $45M to make AI model training accessible to nontechnical experts"
    url: https://techcrunch.com/2026/11/02/trajectory-raises-45m-to-make-ai-model-training-accessible-to-nontechnical-experts/
    outlet: "TechCrunch"
    published: 2026-11-02
  - headline: "Anthropic grows revenue twelvefold but posts $23 billion loss"
    url: https://the-decoder.com/anthropic-grows-revenue-twelvefold-but-posts-23-billion-loss/
    outlet: "The Decoder"
    published: 2026-11-02
dropped: "77 matérias examinadas de 586 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (3), publicado há 74h (2), publicado há 75h (2), publicado há 146h (2), publicado há 78h (1), publicado há 79h (1)"
---

La frontera entre consumir información y producirla se ha derrumbado, y el sistema legal apenas está reaccionando. Cuando un navegador puede extraer silenciosamente todo el archivo de un periódico para entrenar un modelo, el viejo pacto de la web —contenido gratuito a cambio de visualizaciones de anuncios— se rompe. Para cualquiera que construya agentes, esto no es una pelea lejana por derechos de autor. Es una señal de que la cadena de suministro de datos de la que depende tu agente está a punto de volverse más restringida, más cara y más hostil.

The New York Times y otros editores están demandando a Brave Software, alegando que el fabricante del navegador extrajo su contenido para entrenamiento de IA y ayudó a los usuarios a saltarse los muros de pago [[1]](https://www.theverge.com/tech/1024588/brave-lawsuit-ai-scraping-new-york-times). La demanda ataca tanto la ingesta como la entrega: tomar los datos y luego facilitar que los usuarios finales eviten pagar por ellos. Esa doble acusación es relevante porque refleja exactamente cómo funcionan hoy muchos pipelines de agentes. Un agente recupera una página, extrae texto estructurado y lo introduce en una ventana de contexto. Si el modelo de negocio del editor depende de que un humano vea un muro de pago o un anuncio, el agente no ve ninguno. La exposición legal ya no es teórica.

## La economía de la creación de modelos se está rompiendo

Mientras la capa de datos enfrenta presión legal, la capa financiera muestra sus propias grietas. Los ingresos de Anthropic se multiplicaron por doce y, aun así, la compañía registró una pérdida operativa de 23 mil millones de dólares antes de su salida a bolsa [[3]](https://the-decoder.com/anthropic-grows-revenue-twelvefold-but-posts-23-billion-loss/). La cifra es asombrosa no por ser grande, sino porque revela lo lejos que está aún la industria de una economía unitaria que tenga sentido. Entrenar modelos frontera consume capital a un ritmo que ni siquiera un crecimiento explosivo de ingresos puede compensar. La implicación para los creadores de agentes es clara: el coste de la inteligencia bruta que consume tu agente está siendo subsidiado por inversores, no por clientes. Esa subvención no durará para siempre.

Cuando la subvención termine, los proveedores de modelos subirán precios, restringirán niveles de acceso o ambas cosas. Los agentes que hoy llaman a un modelo grande para cada subtarea tendrán que ser rediseñados para ser más austeros: enrutando consultas simples a modelos más pequeños, cacheando de forma más agresiva y tomando decisiones más difíciles sobre cuándo una tarea realmente requiere razonamiento de frontera. La era de tratar un modelo masivo como un recurso infinito y barato se está acabando.

## La capa de herramientas se está desplazando hacia abajo

En el mismo momento en que la cima de la pila está bajo tensión, la base se está abriendo. Trajectory, una startup de un año ahora valorada en 300 millones de dólares, levantó 45 millones para construir herramientas que permitan a expertos no técnicos entrenar modelos de IA [[2]](https://techcrunch.com/2026/11/02/trajectory-raises-45m-to-make-ai-model-training-accessible-to-nontechnical-experts/). La propuesta no va de simplificar el machine learning. Va de acercar el acto de creación de modelos a quienes entienden el dominio: los expertos en la materia que saben cómo es un buen resultado pero no pueden escribir un bucle de entrenamiento.

Para los creadores de agentes, esto cambia el cálculo de hacer o comprar. Si un experto de dominio en tu equipo puede ajustar un modelo pequeño para una tarea específica de clasificación o extracción sin apoyo de ingeniería, la arquitectura del agente cambia. Dejas de enrutar todo a través de un único modelo de propósito general y empiezas a componer componentes especializados. Ese problema de composición —elegir a qué modelo llamar, cuándo, con qué prompt, bajo qué gobernanza— es exactamente el problema que los frameworks de agentes existen para resolver.

## Lo que queda para los creadores

Las tres historias apuntan en la misma dirección. El acceso a los datos se está volviendo legalmente conflictivo. La economía de los modelos es insostenible a los precios actuales. Las herramientas están abaratando la producción de modelos especializados. El trabajo del creador de agentes ya no es solo ingeniería de prompts o diseño de cadenas. Es gestión de la cadena de suministro de inteligencia: saber de dónde vienen tus datos, cuánto cuesta procesarlos y qué modelo es la herramienta correcta para cada eslabón de la cadena. Incorpora auditoría en las rutas de recuperación ahora, antes de que la regulación te obligue. Diseña arquitecturas de agentes que se degraden con gracia cuando una fuente de datos se apague o una API de modelo se encarezca. Los creadores que traten estas restricciones como parámetros de diseño, no como obstáculos, serán aquellos cuyos agentes sigan funcionando cuando las subvenciones se acaben.
