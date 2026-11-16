---
title: "Chimera Agent 0.90.0: Agentes gobernados, invitados más seguros y prompts medidos"
date: 2026-11-16
category: update
summary: "Esta versión añade controles de gobernanza a los agentes, restringe el acceso de invitados, mide los cambios en los prompts con una línea base de tokens y corrige la precisión de costos, la recuperación de memoria y las fugas de credenciales."
version: "0.90.0"
---

## Lo que el agente ahora tiene permitido hacer

Antes de esta versión, `chimera agent` se ejecutaba con un conjunto fijo de hooks y permisos de herramientas. Si querías saber qué habría decidido la gobernanza sobre sus acciones, tenías que adivinarlo. El nuevo comando `chimera report governance` cambia eso. Cuenta, por superficie y durante un número configurable de días, lo que la gobernanza concedió, rechazó, escaló a revisión o retuvo. En modo `observe`, también muestra lo que `enforce` habría rechazado o enviado a un aprobador. Esto te da un simulacro de una política más estricta antes de activarla.

`chimera agent` ahora se ejecuta sobre el mismo ensamblaje gobernado que chat, assist y tui. Sus hooks provienen del proyecto en el que trabaja, y `--deny-tools` alcanza las herramientas MCP diferidas. El agente ya no opera fuera del marco de gobernanza que usa el resto de la aplicación.

El modelo de seguridad también se endureció para las conversaciones compartidas. Un turno de invitado accedido a través de un enlace compartido podía previamente alcanzar las otras conversaciones del propietario, buzón, calendario, paquetes de habilidades, servidores MCP, instrucciones globales, hooks, sesiones de navegador y trabajos de otras conversaciones. Tenía una shell y podía ejecutar cualquier cosa que pudiera haber editado, incluyendo verificadores, formateadores, hooks y comandos git. Ahora se ejecuta con el mínimo privilegio. No puede leer ni escribir fuera de la carpeta de la conversación ni dentro de los datos propios de Chimera, incluso a través de enlaces simbólicos, uniones o importaciones de instrucciones. Los gráficos PNG y SVG renderizados rechazan URLs de datos remotas, y las instantáneas ya no siguen enlaces fuera del espacio de trabajo.

## Qué cambió en cómo se construyen y miden los prompts

Las descripciones de herramientas MCP ahora se pueden reducir a una línea por servidor. Establecer `"description_mode": "one_line"` en `mcp.json` muestra al modelo una línea de la descripción de cada herramienta y sirve el resto a través de una llamada delimitada `mcp_describe` que respeta las listas de permisos y denegaciones de la sesión, incluso a través de los wrappers de libro mayor y gobernanza. Esto es opcional. El valor por defecto sigue siendo las descripciones completas porque una ejecución pareada pre-registrada de 540 iteraciones midió el recorte en -24.4 puntos porcentuales de selección de herramienta en la primera llamada, con un intervalo de confianza de [-31.7, -16.2]. En tareas cuya respuesta está en la cola de la descripción, la elección es un volado. Lo que el recorte aporta también está medido: los intentos de acciones prohibidas cayeron 16.7 puntos porcentuales, del 27.5% al 10.8%, todo ello proveniente de cargas útiles en la cola de la descripción de una herramienta. Los falsos positivos benignos no fueron inferiores, con salvedades.

Ahora está disponible una línea base de tokens y costos. `scripts/token_baseline.py` lee los registros de uso, ejecución y traza del hogar de escritorio e imprime solo agregados por superficie, con cobertura de precio y caché y un umbral de 30 turnos por debajo del cual solo se muestra el conteo. Sus totales coinciden con la pantalla de Costos sobre las mismas filas. El directorio `bench/token_baseline/` contiene el pre-registro y la primera lectura. Esto significa que puedes rastrear los cambios de costo de los prompts entre versiones sin depender de la memoria o mediciones ad-hoc.

Las instantáneas del esquema de herramientas ahora se mantienen por superficie. `tests/prompt_snapshots/schema.<superficie>.txt` contiene el esquema de herramientas que envían el turno de Código, turno de Diseño, CLI, cron y bot, ensamblado por las funciones propias de cada superficie. Una descripción de herramienta modificada aparece como un diff. El lint de prompts lo totaliza por superficie, y `docs/tool-schema-by-surface.md` lo tabula con un conteo estimado de tokens. Esto hace visibles los cambios de prompts en la revisión de código.

## Lo que estaba roto y ahora está arreglado

La recuperación de memoria previamente descartaba hechos escritos en ruso, chino o japonés. La puerta de admisión usaba un divisor de palabras solo ASCII, por lo que un hecho que la recuperación acababa de encontrar se descartaba como irrelevante sin ningún mensaje. Ahora lee el texto de la misma manera que lo hace la recuperación, y el índice de búsqueda de código sigue el mismo criterio.

Los números de costos ahora coinciden en toda la aplicación. La pantalla de Costos mostraba una tasa de aciertos de caché limitada al 50%. El límite de gasto diario no contaba las ejecuciones autónomas de `solve` y el escritor de blogs de la misma manera que la pantalla. Solo un demonio cron se ejecuta por hogar ahora, por lo que un trabajo programado ya no se dispara dos veces cuando la aplicación y `chimera serve --cron` están ambos abiertos.

Los enlaces en una respuesta ya no pueden llevarse las credenciales de la aplicación. La ventana de escritorio permanece en sus propias páginas, y otros sitios se abren en tu navegador. Los tokens de acceso que posee se entregan solo a la aplicación misma, nunca a un sitio al que se envíe o al servidor de desarrollo y las vistas previas de Diseño dentro de él.

Las credenciales pegadas ya no residen en los archivos de sesión de chat. Las transcripciones de chat se enmascaran en disco. Las escrituras desde otro origen se rechazan cuando no se establece un token de servidor. Las cargas de archivos adjuntos y dictados reciben la misma verificación de origen que las cargas de habilidades. Un encabezado bearer no ASCII ahora recibe un 401 en lugar de un 500.

La tarjeta de Almacenamiento previamente listaba solo los árboles de trabajo en la carpeta temporal del sistema, omitiendo la carpeta duradera del proyecto. En una máquina, eso significó que 89 checkouts y 72.9 GiB no se contabilizaron. Ahora los lista con tamaño, antigüedad y la razón por la que cada uno sigue existiendo, advierte por encima de un límite configurable (`CHIMERA_WORKTREE_LIMIT_GB`, por defecto 50), y ofrece archivar conversaciones inactivas por un número configurable de días (`CHIMERA_WORKTREE_IDLE_DAYS`, por defecto 14) a través de la ruta de archivado existente. Nada se elimina automáticamente.

Un reintento después de una verificación fallida ahora realmente escala. Aumenta el esfuerzo de razonamiento, luego pasa al siguiente modelo único, en lugar de volver a ejecutar el mismo modelo mientras el recibo afirmaba fusión. La fusión ya no se une a ningún turno que lleve herramientas, incluyendo "fusiona este turno". Cada intento en el recibo registra el modelo y el esfuerzo realmente enviados.

Cada página HTML que el servidor entrega ahora lleva una Content-Security-Policy. `/redoc` y `/docs/oauth2-redirect` de FastAPI, que se servían fuera de la protección del token sin política y cargaban un script CDN en el origen de la aplicación, están desactivadas. `/api/docs` envía una política que nombra exactamente lo que Swagger carga. Un `.htm` o `.xhtml` suelto en la raíz del paquete se regula como `.html`. Una nueva prueba solicita cada página y enumera cada ruta fuera de la API para que la próxima no pueda enviarse sin una política.

Actualiza con `pip install chimera-agent --upgrade`. Las notas de la versión completas están en [Chimera Agent v0.90.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.90.0).
