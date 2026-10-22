---
title: "Chimera 0.72.0: Tu Chrome, con tus reglas"
date: 2026-10-22
category: update
summary: "Chimera 0.72.0 incorpora confianza por sitio en el navegador, búsqueda de Google opcional y un flujo de emparejamiento que mantiene la clave de Chrome fuera del shell del agente."
version: "0.72.0"
---

## Qué cambia para tus agentes

Hasta ahora, darle a Chimera acceso a tu Chrome implicaba aceptar una decisión binaria: o el agente podía actuar en el navegador, o no podía. No había forma de decir "sí en este sitio, pregunta en todos los demás", ni manera de permitirle buscar en Google sin abrir también la puerta a todo lo demás que un navegador puede hacer. La extensión misma también había perdido su popup en una versión anterior, lo que significaba que no podías detener una ejecución ni conceder un permiso por sitio desde el propio navegador.

La versión 0.72.0 reemplaza ese binario con un modelo de confianza por sitio. Tú indicas los sitios donde Chimera puede hacer clic y escribir sin preguntar, y en cualquier otro lugar cada acción te muestra una tarjeta primero. La distinción importa porque coincide con cómo trabaja la gente en la práctica: puedes confiar en que un agente rellene un formulario en tu panel interno, pero no en que toque tu proveedor de pagos. Esta versión mantiene ese límite explícito. Comprar, pagar, enviar, eliminar, publicar y enviar formularios siguen preguntando incluso en un sitio de confianza. Contraseñas, números de tarjeta, códigos de verificación, marcos de pago, descargas y subidas se rechazan de plano. Ante un CAPTCHA, el agente se detiene y te pasa la pestaña.

La extensión también verifica de nuevo justo antes de actuar que el elemento sobre el que decidió sigue siendo el mismo que está a punto de clicar, y que nada lo cubre. Esa segunda comprobación cierra un hueco donde una página podía cambiar entre la decisión del agente y la acción en sí.

## La búsqueda de Google pasa a ser una elección

La búsqueda de Google en tu propio Chrome ahora está desactivada a menos que la actives. Con `CHIMERA_BROWSER_GOOGLE=ask`, los turnos de escritorio pueden buscar en Google en una pestaña visible de tu Chrome emparejado, y cada búsqueda te muestra una tarjeta primero — incluso si las aprobaciones están configuradas para permitir. El ritmo es deliberadamente humano: una búsqueda cada 20 segundos, cinco por turno, 30 al día. Los resultados llegan como títulos, enlaces y fragmentos, marcados como contenido obtenido.

Lo que esta versión excluye es tan importante como lo que incluye. Los bots, trabajos programados y el puente MCP nunca obtienen la búsqueda de Google. Ante el primer CAPTCHA o página de tráfico inusual, se detiene y te pasa la pestaña, y no lo reintenta durante 30 minutos. No hay ningún disfraz involucrado. La funcionalidad está diseñada para una persona que observa su propio navegador, no para automatización desatendida.

## El emparejamiento ya no filtra la clave

Emparejar Chrome ahora es un código de seis dígitos desde tu pantalla. Ajustes → Navegador muestra un código de un solo uso, válido por dos minutos con cinco intentos, que introduces en el popup de la extensión. La clave va entonces al almacén seguro del sistema operativo, nunca al entorno de los comandos que ejecuta Chimera. Esa es la corrección que más importa para cualquiera que ejecute agentes localmente: el token del servidor por sí solo, que cualquier proceso local puede leer, ya no te da acceso a Chrome. Cambiar la lista de sitios de confianza, detener y desemparejar requieren todos la pantalla de la propia aplicación.

Las notas de la versión declaran la limitación restante con claridad: un programa malicioso que ya se esté ejecutando como tu usuario de Windows aún puede tomar la clave. La documentación lo dice. Pero la clave ya no reside en el entorno del shell donde un comando suelto o un agente mal escrito podría leerla.

Para empezar, abre Ajustes → Navegador en la aplicación. Muestra si la extensión está emparejada y conectada, te da el único comando para registrarla y te permite listar los sitios donde Chimera puede actuar sin preguntar. Las notas completas de la versión están en [Chimera Agent v0.72.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.72.0).
