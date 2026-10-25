---
title: "Chimera Agent 0.76.0: Modelos por proyecto y un arreglo para Claude"
date: 2026-10-25
category: update
summary: "Chimera Agent 0.76.0 permite que cada proyecto fije su propio modelo y corrige el funcionamiento de los modelos de Claude en la pantalla de Código."
version: "0.76.0"
---

## Modelos por proyecto

Antes de esta versión, cambiar el modelo de un proyecto lo cambiaba para todas las conversaciones de todos los proyectos. El modelo era una única configuración global, y si querías modelos distintos para diferentes proyectos, tenías que acordarte de alternar manualmente entre ellos. Eso daba lugar a errores y dificultaba mantener un proyecto con un modelo específico por consistencia o por costos.

Ahora cada proyecto puede tener su propio modelo. Una conversación de Código usa su propio modelo fijado si lo tiene, luego el del proyecto y, por último, el predeterminado global. El recibo del turno muestra qué modelo se utilizó, para que puedas verificarlo de un vistazo. Cambiar el modelo de un proyecto ya no afecta las conversaciones de otro. Esto significa que puedes configurar un proyecto para que use un modelo más económico en experimentación y otro para que use uno más potente en producción, sin preocuparte por la contaminación cruzada.

Cuando el agente propone un modelo diferente, solo puede dejarte una tarjeta que indique la conversación o el proyecto al que se aplicaría. Nada cambia hasta que lo apruebas. Esto te mantiene en control y evita que el agente cambie de modelo silenciosamente a mitad de una conversación.

## Los modelos de Claude vuelven a funcionar en la pantalla de Código

Con un modelo de Anthropic como predeterminado, cada turno de programación fallaba en su primer paso con un error sobre el esquema de entrada de una herramienta. El esquema de la herramienta de preguntas usaba una estructura que la API de Anthropic rechaza. Esto significaba que, si usabas Claude como modelo predeterminado, no podías usar la pantalla de Código en absoluto: cada turno daba error antes de hacer nada útil.

Ahora el esquema es un objeto plano, que la API de Anthropic acepta. Una prueba verifica el esquema de cada herramienta para que el problema no pueda reaparecer. Este arreglo es importante porque garantiza que todos los modelos soportados funcionen en todas las pantallas, no solo en aquellas que resultan ser permisivas con peculiaridades de esquema.

## Qué hacer ahora

Actualiza a la versión 0.76.0 y configura un modelo específico para un proyecto si lo necesitas. Si estabas evitando Claude en la pantalla de Código, pruébalo de nuevo. Consulta las [notas de la versión][Chimera Agent v0.76.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.76.0) para todos los detalles.
