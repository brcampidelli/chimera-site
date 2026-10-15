---
title: "La entrevista ahora está a un prompt de distancia"
date: 2026-10-15
category: analysis
summary: "La entrevista con un cliente-IA de McKinsey y los experimentos de autonomía en la industria financiera revelan el mismo cambio: los agentes ya no son herramientas que usas, sino roles que diseñas y frente a los cuales te evalúas."
sources:
  - headline: "Apple atinge valor de mercado inédito de US$ 5 tri e segue como segunda mais valiosa"
    url: https://www.infomoney.com.br/mercados/apple-atinge-valor-de-mercado-inedito-de-us-5-tri-e-segue-como-segunda-mais-valiosa/
    outlet: "InfoMoney"
    published: 2026-10-14
  - headline: "McKinsey is making job applicants spar with a fake AI client"
    url: https://www.theverge.com/news/1011654/mckinsey-ai-client-interview
    outlet: "The Verge"
    published: 2026-10-14
  - headline: "Crossing the Threshold: How OpenAI and Anthropic Approach Autonomy and Safety in Financial Agents"
    url: https://www.latent.space/p/crossing-the-threshold
    outlet: "Latent Space"
    published: 2026-10-14
dropped: "9 matérias examinadas de 589 reunidas, 3 lidas para este texto."
---

En el momento en que una empresa le pide a un candidato que demuestre su valía hablando con una máquina, la máquina deja de ser una herramienta y se convierte en el estándar. Esa es la línea que cruzamos esta semana, y cambia lo que significa construir un agente.

McKinsey & Company ahora exigirá que algunos aspirantes a puestos de entrada mantengan una conversación de 10 minutos con una simulación de IA de un cliente como parte del proceso de entrevista [[2]](https://www.theverge.com/news/1011654/mckinsey-ai-client-interview). Esto no es un chatbot filtrando palabras clave. Es un adversario de juego de roles diseñado para probar cómo piensa un humano bajo presión. La IA no es el asistente en la sala. Es el guardián.

Para cualquiera que construya agentes, la implicación es inmediata. La evaluación ya no es una preocupación separada que añades después del entrenamiento. Cuando una firma como McKinsey despliega un cliente simulado para juzgar el rendimiento humano, la misma lógica aplica a los agentes que pones en producción. Tu agente no está listo cuando pasa un benchmark. Está listo cuando puede defenderse contra un homólogo simulado que fue construido para exponer sus debilidades. Si no estás construyendo entornos de evaluación adversarial para tus agentes, alguien más los construirá por ti — y serán ellos quienes decidan si tu sistema es apto para producción.

## Autonomía con correa

La misma tensión entre capacidad y control surgió en un entorno muy diferente. En AI Engineer New York, laboratorios de vanguardia y firmas financieras discutieron cómo dar a los agentes autonomía útil sobre decisiones trascendentales manteniendo a un humano en el circuito [[3]](https://www.latent.space/p/crossing-the-threshold). La industria financiera no tiene el lujo de moverse rápido y disculparse después. Una operación errónea ejecutada por un agente con dinero real no es una alucinación que puedas regenerar. Es una pérdida.

Lo que surgió de esas conversaciones es un patrón que aplica mucho más allá de las finanzas: las arquitecturas de agentes más interesantes no son las que maximizan la autonomía, sino las que hacen explícito y auditable el límite entre autonomía y supervisión. El agente no pide permiso en cada paso. Opera dentro de un umbral declarado y expone su razonamiento cuando se acerca al borde de ese umbral. Esto no es un detalle técnico. Es una primitiva de gobernanza.

## La valoración real es la confianza

Apple rozó brevemente una valoración de mercado de 5 billones de dólares durante el horario regular de negociación, una cifra tan grande que se vuelve abstracta [[1]](https://www.infomoney.com.br/mercados/apple-atinge-valor-de-mercado-inedito-de-us-5-tri-e-segue-como-segunda-mais-valiosa/). Pero el número en sí no es el punto. El punto es lo que sostiene una valoración así a lo largo del tiempo: una cadena de decisiones sobre qué se ejecuta en el dispositivo, qué sale del dispositivo y quién puede auditar la diferencia. Esa cadena está hecha de las mismas preguntas de gobernanza que las firmas financieras se hacen sobre sus agentes y que McKinsey está integrando en su proceso de contratación.

Cuando una empresa decide que una IA puede simular a un cliente lo suficientemente bien como para juzgar a un humano, está declarando dónde deposita su confianza. La misma declaración se hace cada vez que decides si tu agente llama a una API externa, escribe en una base de datos o envía un correo electrónico sin un humano en el circuito. Los constructores que entiendan esto dejarán de tratar la evaluación como una fase y empezarán a tratarla como infraestructura. Construirán homólogos simulados que desafíen a sus agentes antes de que el mundo lo haga. Y definirán los umbrales de autonomía no en un documento de diseño, sino en código que pueda ser inspeccionado, probado y sometido a rendición de cuentas.

Esa es la conclusión práctica. Construye el evaluador antes de construir el agente. Haz del límite entre autonomía y supervisión una primitiva configurable, no un acuerdo de palabra. Y asume que cada agente que lances se enfrentará eventualmente a un adversario simulado que fue diseñado para romperlo. Si no construyes ese adversario primero, alguien más lo hará.
