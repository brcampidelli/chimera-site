---
title: "Los creadores de agentes ahora son dueños de la superficie"
date: 2026-10-29
category: analysis
summary: "Las nuevas plataformas de desarrollo de Google muestran que los creadores de agentes, no los dueños de las aplicaciones, se están convirtiendo en la interfaz principal hacia los usuarios y las herramientas."
sources:
  - headline: "Como criar um agente de IA com Python, LangChain e ferramentas | IA Expert Academy"
    url: https://iaexpert.academy/2026/10/28/como-criar-um-agente-de-ia-com-python-langchain-e-ferramentas/
    outlet: "IA Expert Academy"
    published: 2026-10-28
  - headline: "As AI agents reshape the web, Google opens Gemini and Search to more apps"
    url: https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/
    outlet: "TechCrunch"
    published: 2026-10-28
  - headline: "Google opens Android development to third-party AI agents and unveils new Gemini APIs"
    url: https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/
    outlet: "The Decoder"
    published: 2026-10-28
dropped: "87 matérias examinadas de 585 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (2), publicado há 149h (1), publicado há 198h (1), publicado há 200h (1), publicado há 384h (1), publicado há 675h (1)"
---

La superficie del software está cambiando. Durante años, la interfaz era la aplicación: una pantalla, un botón, un formulario. Ahora la interfaz es cada vez más el agente—y quien controla el agente controla lo que el usuario puede hacer. Dos anuncios de Google esta semana hacen ese cambio concreto, no especulativo.

Google está abriendo Gemini y Search a servicios de terceros a través de una nueva plataforma de desarrollo, permitiendo que las empresas lleven sus ofertas directamente a las experiencias de IA de Google [[2]](https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/). Al mismo tiempo, Android Studio incorpora una función "Bring Your Own Agent" que soporta más de 40 agentes de programación, incluidos Claude Agent de Anthropic y Codex de OpenAI [[3]](https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/). El patrón es el mismo en ambos casos: Google no está construyendo el agente por ti. Está construyendo el lugar donde tu agente se ejecuta y la superficie donde tu agente aparece.

## El agente es el nuevo punto de entrada

Para cualquiera que construya agentes, esto cambia la cuestión de la distribución. Ya no necesitas convencer a un usuario de que instale tu aplicación o visite tu sitio. Necesitas convencer a un agente—o a la plataforma que aloja ese agente—de que tu servicio es la herramienta adecuada para el trabajo. Ese es un tipo de problema de ingeniería diferente. Se trata de descubribilidad, descripciones de herramientas y ejecución confiable, no de flujos de onboarding o notificaciones push.

El movimiento de Android Studio es más específico pero igual de revelador. Google no está impulsando un único agente de programación propio. Está abriendo el IDE al agente que cada desarrollador quiera usar. Las herramientas de terminal que Google menciona están diseñadas para ayudar a los agentes a completar tareas de UI más rápido y con menos tokens [[3]](https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/). Eso es un reconocimiento de que el rendimiento de los agentes ahora es una preocupación de la plataforma. El trabajo de la plataforma es hacer que los agentes sean más eficientes, no reemplazarlos.

## El diseño de herramientas se convierte en el trabajo real

El tutorial de IA Expert Academy, aunque más básico, apunta en la misma dirección. Recorre la construcción de un agente que usa herramientas, consulta precios, calcula descuentos y combina funciones para completar una tarea [[1]](https://iaexpert.academy/2026/10/28/como-criar-um-agente-de-ia-com-python-langchain-e-ferramentas/). La parte interesante no es el código de LangChain. Es la estructura: el agente es tan bueno como las herramientas que puede invocar y el orden en que las invoca. Ahí es donde vive ahora la verdadera ingeniería.

Cuando Google abre Search a servicios externos, la misma lógica se aplica a escala web. Una empresa que quiere ser encontrada por un agente necesita describir su servicio de una manera que un agente pueda analizar, evaluar y ejecutar. Ese es un nuevo tipo de diseño de API. No basta con exponer un endpoint. Tienes que exponer la intención, las restricciones y los modos de fallo de una manera sobre la que un agente pueda razonar.

## Qué significa esto para los creadores

La conclusión práctica es simple: deja de pensar en los agentes como una funcionalidad dentro de tu producto. Empieza a pensar en tu producto como una herramienta dentro del agente de otra persona. Eso significa invertir en descripciones de herramientas claras, salidas predecibles y acciones pequeñas y componibles. Significa probar tu servicio contra múltiples agentes, no solo contra el tuyo. Y significa tratar el ecosistema de agentes como un canal de distribución, con todo el trabajo de descubribilidad y confiabilidad que eso implica.

Las plataformas no están esperando. Están construyendo los rieles ahora mismo. Los creadores que entiendan que su usuario real a menudo es otra pieza de software serán aquellos cuyas herramientas sean invocadas.
