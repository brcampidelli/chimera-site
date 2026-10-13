---
title: "Chimera Agent 0.66.0: Ajustes que se leen, rieles que hablan"
date: 2026-10-13
category: update
summary: "Settings se convierte en un documento navegable, el riel y el compositor dejan de esconder sus controles, y Work, Memory y Profile dejan de hablarte con identificadores."
version: "0.66.0"
---

## Qué cambió para quien construye agentes

El release ajusta las partes de la app que técnicamente estaban presentes pero en la práctica eran invisibles. Settings es el ejemplo más claro. Era una única lista con scroll donde Appearance vivía dentro de General, y donde filas para key pools, MCP, sandbox y diagnósticos compartían espacio con preferencias de uso diario. Eso hacía la pantalla difícil de escanear y más difícil de enlazar. En 0.66.0, Settings se lee como un documento con tabla de contenidos. Las secciones quedan al lado del contenido en una ventana amplia, Appearance es su propia sección, y las filas que casi nadie modifica se pliegan bajo Advanced. No se eliminó nada; se sacó del medio.

La misma lógica aplica al riel del escritorio. Cinco íconos con nombres solo al hacer hover obligaban a recordar qué era cada destino. Ahora el riel escribe el nombre debajo de cada ícono. El compositor de la pantalla Code sigue el mismo principio. Los selectores de quién ejecuta el turno, perfil de costo, modelo y estilo antes ocupaban cuatro filas sobre la caja de mensaje. Ahora empiezan como una sola línea de chips, y la línea completa los despliega. Armed Fuse y Plan se leen primero como contornos presionados, lo que deja a Send como el único botón relleno de la fila. El cambio es chico, pero elimina la competencia visual entre configuración y acción.

## Dónde la app dejó de hablar su propio idioma

Varias pantallas imprimían identificadores internos en vez de significado. Los tipos de Memory aparecían como episodic y semantic en monoespaciado en cada fila. Los schedules se describían en inglés sin importar el idioma de la app. Profile mostraba ids de origen como chat y extracted, más el flag tainted del store, en inglés para cualquier locale. Las filas de learned-skills hacían lo mismo con tainted y retire?, y la segunda usaba el rojo de un error. Work › Git pedía confirmación con el cuadro de diálogo del navegador, que no podía nombrar los archivos y no se veía como la app.

Cada uno de estos era un lugar donde la interfaz exponía el modelo de datos en vez de la decisión. El release traduce los tipos de Memory, describe los schedules en el idioma de la app, y hace que Profile diga de dónde vino un hecho en una oración. Los conteos sin verificar y la nota de no OS sandbox pasan de rojo a ámbar, porque son condiciones a revisar, no errores. La pregunta de descarte en Git ahora aparece bajo el botón, en rojo, con Cancel primero, y cada checkbox de archivo tiene un nombre. En portugués, Connections y Usage también dejan la jerga: Ferramentas externas (MCP), Ferramentas, y APIs (OpenAPI) reemplazan las etiquetas anteriores.

## Qué hacer ahora

Actualizá a 0.66.0 y abrí Settings. La nueva sección Appearance es donde viven el color de acento, el tinte de superficie y la opción de alto contraste, y cada combinación está chequeada por contraste. Después abrí Work › Runs y usá el buscador y el filtro de outcome en un historial largo; los intentos anteriores de un run se pliegan bajo el que decidió. Si mantenés enlaces hacia adentro de la app, notá que las pestañas Knowledge y Automation ahora tienen direcciones, así que sobreviven un reload y responden al botón de atrás. La lista completa está en las notas del release. [Chimera Agent v0.66.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.66.0)
