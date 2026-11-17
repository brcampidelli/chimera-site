---
title: "Chimera 0.91.0: Esfuerzo por rol, avisos de caché y seguridad para invitados"
date: 2026-11-17
category: update
summary: "El esfuerzo de razonamiento ahora es por rol, la caché de prompts avisa cuando se degrada, los invitados ya no ven las herramientas internas y la gobernanza por defecto pasa a observar en nuevas instalaciones."
version: "0.91.0"
---

## El esfuerzo de razonamiento se define a nivel de rol

Antes de esta versión, asignar un esfuerzo de razonamiento en un archivo de agente aplicaba un valor global que era fácil malinterpretar. Ahora, el campo `effort` del archivo de agente solo controla las llamadas de ese subagente. Los roles de código y el elenco de fusión obtienen su esfuerzo de una nueva variable de entorno, `CHIMERA_ROLE_EFFORTS`, que fija el esfuerzo por rol y no por agente. El archivo de agente de un repositorio no puede aumentar el esfuerzo que eligió el propietario, así que un agente traído de fuera no puede consumir silenciosamente más tokens de razonamiento de lo previsto.

Esto es relevante porque el esfuerzo es una palanca de coste. Un esfuerzo alto en un rol de resumen malgasta dinero; un esfuerzo bajo en un rol de planificación produce planes frágiles. La configuración plana anterior forzaba un compromiso que no se correspondía con el consumo real de razonamiento de cada rol. Ahora defines el esfuerzo donde corresponde, y el sistema rechaza cualquier sobrescritura que intente aumentarlo.

## La caché de prompts avisa cuando deja de funcionar

El caché de prompts ahorra dinero solo cuando realmente acierta. Antes, una conversación podía derivar en una zona de pocos aciertos de caché sin señal alguna. Te dabas cuenta del coste después, en una hoja de cálculo. Ahora, cuando la proporción de tokens de prompt leídos de caché cae por debajo del 80% en los turnos cuya ruta reporta caché, el recibo del turno y la barra de estado avisan una vez, indicando la causa principal. El aviso se rearma cuando la caché se recupera y vuelve a degradarse. Las rutas que nunca reportan caché no generan aviso, así que no te molesta algo que nunca se esperó cachear.

Worth también obtiene una cifra de coste por ejecución resuelta. Muestra el coste total de todas las ejecuciones dividido entre las que pasaron, lo mismo por ejecución verificada, y la proporción de ejecuciones con precio conocido. Cuando una ejecución no tiene precio, Worth muestra un guion en lugar de un número engañoso. La tabla se mantiene ordenada por nombre, no por ranking, porque Worth es una herramienta de diagnóstico, no una tabla de clasificación.

## Los invitados ven respuestas, no el funcionamiento interno

Una conversación compartida filtraba previamente los argumentos de herramientas del propietario, los diffs de edición, las previsualizaciones de aprobación, las capturas de pantalla del navegador, la salida del verificador, las fuentes de instrucciones, los recibos de coste y las rutas del host. Un invitado viendo en directo, reproduciendo o inspeccionando el contexto del modelo podía reconstruir mucho más que las respuestas. Ese agujero está cerrado. Los invitados ahora reciben solo las respuestas y los nombres y estado de las herramientas, a través de una lista blanca que descarta cualquier tipo de marco que no reconozca. El funcionamiento interno del propietario se queda en su pantalla.

## La gobernanza por defecto pasa a observar en nuevas carpetas de datos

Una instalación nueva ahora arranca con la gobernanza en modo `observe`, registrado en `governance_default.json`. Bajo `observe`, los bloqueos fijos del kernel rechazan comandos como `rm -rf /`, `mkfs` o curl entubado a una shell. Lo que `enforce` enviaría a revisión se registra, no se pregunta. Una carpeta de datos existente mantiene `off` y recibe un aviso en el log y una nota descartable en Configuración. Un `CHIMERA_GOVERNANCE` explícito sigue teniendo prioridad, y uno vacío cuenta como no establecido. Esto significa que una instalación nueva queda bloqueada desde la primera ejecución, sin necesidad de que quien la configura lea una página de seguridad aparte.

## Los trabajos programados obtienen su propio modelo, esfuerzo y presupuesto de pasos

Un trabajo cron ahora puede especificar su propio modelo, esfuerzo y presupuesto de pasos mediante `cron add/edit --model --effort --max-steps` o la pantalla de Programación. Los valores vacíos heredan de `serve`, como antes. Los valores inválidos se rechazan al guardar; un `jobs.json` editado a mano con valores incorrectos los carga con un aviso en lugar de descartar el trabajo silenciosamente. La última respuesta entregada del trabajo, hasta 2 KB, cierra su contexto para que deje de repetirse entre invocaciones. Una entrega que el destino rechazó cuenta para el freno de fallos y nunca se trata como entregada. Los trabajos de webhook que nombren estos campos se rechazan, porque un webhook lleva su propia configuración.

## Qué hacer ahora

Actualiza con `pip install chimera-agent --upgrade` y reinicia tu servidor. Si definiste el esfuerzo de razonamiento en archivos de agente, traslada esos valores a `CHIMERA_ROLE_EFFORTS` y usa el `effort` del archivo de agente solo para llamadas a subagentes. Revisa tus conversaciones compartidas: los invitados ya no verán los marcos internos, y no necesitas cambiar nada para obtener esa protección. Las nuevas instalaciones obtienen gobernanza `observe` por defecto; las carpetas existentes se quedan como están a menos que definas `CHIMERA_GOVERNANCE` explícitamente. Notas completas en [Chimera Agent v0.91.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.91.0).
