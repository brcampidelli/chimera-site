---
title: "Chimera Agent 0.69.0: plugins, worktrees y conversaciones que conocen su repositorio"
date: 2026-10-18
category: update
summary: "Los plugins de Claude Code llegan como datos inspeccionables, cada conversación registra su repositorio y rama, y la barra lateral finalmente agrupa los worktrees bajo un mismo proyecto."
version: "0.69.0"
---

## Plugins como datos, no como código en ejecución

Antes de esta versión, un plugin era un directorio opaco que le pasabas a Chimera y esperabas que funcionara. El framework no tenía vocabulario para describir lo que contenía un plugin hasta que se ejecutaba, ni forma de inspeccionarlo sin correrlo. Esa brecha hacía que los plugins fueran riesgosos en entornos compartidos e imposibles de razonar antes de instalarlos.

`chimera.plugins` cambia el modelo por completo. Lee un directorio de plugin — su manifiesto, skills, comandos, agentes, hooks, servidores MCP y LSP — y clasifica cada componente según lo que haría si se ejecutara: instrucciones solo texto, arranque de un proceso local, acceso a red o ejecución de comandos. Durante esta inspección no se instala, importa, ejecuta ni descarga nada. Solo las fuentes ancladas se consideran instalables: una ruta local, un repositorio de GitHub anclado a un SHA de commit, o un archivo HTTPS con hash sha256. Cada problema reporta un código de error estable compatible con `claude plugin validate`, así que podés integrar esto en un hook de pre-commit o en un chequeo de CI antes de que un plugin toque siquiera un agente.

La misma lógica de lectura alimenta la integración con el marketplace. `chimera.plugins` lee un `marketplace.json` y clasifica cada plugin listado por su superficie de capacidades. Las entradas que no tienen ancla permanecen visibles junto con la razón por la que no pueden instalarse, para que puedas explorar sin traerte accidentalmente algo mutable.

Los plugins se instalan deshabilitados. `chimera plugin install` los coloca en `<home>/plugins` como pendientes, y nada llega al agente hasta que ejecutás `chimera plugin enable`. Habilitar muestra el diff: skills, comandos y agentes aparecen con namespace `plugin:name` como texto no confiable. Los agentes siguen las reglas de proyecto-agente; los nombres de herramientas de Claude Code se traducen y solo pueden restringir permisos existentes; los campos `allowed-tools` y `model` del manifiesto se ignoran. La expansión de un comando de plugin marca la ejecución como contaminada, y los hooks, directorios `bin/` y monitores permanecen inertes. Los servidores MCP se agregan solo cuando los nombrás explícitamente, mediante una retención por manifiesto anclado. Una actualización que cambie el manifiesto, hooks, servidores o herramientas retiene el plugin mostrando el diff. Bots, cron jobs, `serve` y sesiones invitadas no reciben plugins a menos que `CHIMERA_UNATTENDED_PLUGINS` los liste explícitamente.

La pantalla de Configuración › Plugins muestra cada plugin instalado con su estado, origen, ancla, línea de capacidades y lista de componentes. Descubrir muestra los marketplaces que agregaste, con búsqueda y filtros por categoría y por lo que un plugin ejecuta. Agregar acepta un marketplace anclado, una carpeta local o un `.zip`. Activar un plugin muestra exactamente qué llegará al agente y pregunta por cada servidor MCP por separado. Solo vos podés hacer esto: el puente MCP puede listar, validar e instalar pendientes, pero nunca puede habilitar, eliminar ni agregar marketplaces.

## Cada conversación conoce su repositorio

Una conversación de Code solía ser un archivo plano en una carpeta. La relación entre una conversación y el repositorio git a su alrededor era implícita: sabías en qué proyecto estabas trabajando porque abriste la carpeta, pero el framework no. Eso hacía imposible automatizar el agrupamiento, la limpieza y el razonamiento entre worktrees.

Al inicio de cada turno, la conversación ahora registra su proyecto — el checkout principal del repositorio — junto con su rama y si la carpeta es el checkout principal, un git worktree o una carpeta común. Esta información se lee directamente de los archivos de git, sin ejecutar git, así que es rápida y funciona incluso cuando el repositorio está en un estado roto. El registro sobrevive a la eliminación del worktree, lo que permite que la lista de sesiones agrupe los worktrees de un repositorio bajo el repositorio mismo.

La barra lateral de Code usa este agrupamiento. Los worktrees de un repositorio aparecen bajo el encabezado del repositorio — una sección colapsable con un `+` para una nueva conversación ahí, un contador de worktrees y un menú para abrir, colapsar, renombrar, ocultar, eliminar y limpiar. Las filas muestran el título, la rama y la hora; cinco por proyecto con un enlace "mostrar más"; la búsqueda cubre título, rama y proyecto; los filtros de estado aparecen solo cuando tienen elementos. Un interruptor desactiva el agrupamiento si preferís la vieja lista plana.

La limpieza de worktrees ahora tiene su propio diálogo. Lista cada worktree del repositorio con la razón por la que se conserva — checkout principal, en uso, sucio, sin mergear, creado fuera de Chimera — previsualiza la eliminación y elimina solo lo que la previsualización listó, usando `git worktree remove` sin `--force` y `git branch -d`. Solo los worktrees que Chimera creó pueden eliminarse ahí; sus conversaciones se archivan, nunca se eliminan. El puente MCP puede listar pero nunca podar.

El puente MCP también gana la capacidad de abrir una conversación dentro de un proyecto específico. `desktop_send` recibe un parámetro `project` — un proyecto registrado o un repositorio conocido — y una opción `worktree: "new"` con una rama opcional. Chimera crea y posee el worktree junto al repositorio en `.chimera-worktrees/<repo>/`, nunca en la carpeta temporal, y la conversación se agrupa bajo el proyecto. Proyectos desconocidos, rutas fuera del proyecto y nombres de rama en ejecución se rechazan. Un worktree nuevo no hereda la concesión de shell del proyecto.

Los títulos de conversación ahora son legibles y renombrables. El título sigue tu propio nombre para ella, luego un título que pasó el llamador, luego el primer encabezado `#` de un archivo Markdown que el primer mensaje cite dentro del espacio de trabajo, y solo entonces el primer mensaje en sí. Renombrá con el lápiz en la fila o F2; un nombre vacío vuelve al automático. Ningún título es generado por un modelo.

## Qué hacer ahora

Actualizá a 0.69.0, abrí la pantalla de Configuración › Plugins y agregá un marketplace en el que confíes. Inspeccioná un plugin con `chimera.plugins` antes de instalarlo. Creá un worktree a través del puente MCP con `worktree: "new"` y miralo agruparse bajo su repositorio en la barra lateral.

Las notas de versión completas están en [Chimera Agent v0.69.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.69.0).
