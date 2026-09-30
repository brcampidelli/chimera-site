---
title: "Chimera Agent 0.49.2: Correcciones para el actualizador y el instalador"
date: 2026-09-30
category: update
summary: "Chimera Agent 0.49.2 resuelve problemas críticos con el actualizador y el instalador, garantizando actualizaciones más fluidas y un reporte preciso de versiones."
version: "0.49.2"
---

## El actualizador ahora funciona continuamente

En versiones anteriores, el actualizador solo verificaba nuevas versiones una vez: al iniciar la aplicación. Esto era un error importante para una aplicación como Chimera Agent, diseñada para permanecer abierta durante largos períodos. Como resultado, los usuarios a menudo se perdían actualizaciones a menos que las verificaran manualmente o reiniciaran la aplicación. Este problema fue especialmente evidente cuando se lanzó la versión 0.49.1: la app no notificó a los usuarios de la actualización, obligándolos a descargar manualmente el instalador desde el sitio web.

**Con 0.49.2, el actualizador ahora verifica nuevas versiones cada seis horas** mientras la aplicación está en ejecución. Este cambio asegura que los usuarios sean informados rápidamente de las actualizaciones sin necesidad de reinicios frecuentes. Además, el actualizador evita molestias innecesarias al recordar las actualizaciones rechazadas durante el proceso. Si una versión más nueva está disponible, volverá a notificar al usuario, garantizando que las solicitudes manuales de actualización siempre sean atendidas.

## La corrección del instalador entra en vigor

La versión 0.49.1 introdujo una corrección para un problema del instalador que dejaba archivos de versiones anteriores. Específicamente, el directorio `_internal` podía terminar con múltiples directorios `chimera_agent-*.dist-info`, haciendo que la aplicación reportara la versión incorrecta y ofreciera actualizaciones redundantes. Sin embargo, esta corrección solo se aplicaba al instalador incluido en un lanzamiento, no al usado para actualizaciones en el lugar.

**0.49.2 es la primera versión donde el instalador reparado se usa para actualizaciones en el lugar.** Si actualizaste a 0.49.1 y experimentaste reportes de versión incorrectos, esta versión resuelve el problema. El instalador ahora elimina correctamente los archivos antiguos, asegurando un reporte preciso de la versión y evitando solicitudes de actualización redundantes.

## Mejoras adicionales

Varias otras mejoras introducidas en 0.49.1 son dignas de mención si te saltaste esa versión:

- **Las versiones se retienen de "última" hasta que su manifiesto está adjunto.** Anteriormente, el endpoint del actualizador devolvía un error 404 durante el proceso de compilación, fallando silenciosamente porque los mensajes de error se suprimían para evitar molestar a los usuarios.
- **Los diálogos de fallo y las notificaciones en la bandeja del sistema ahora están localizados**, mientras que los diagnósticos técnicos permanecen en inglés para asegurar que puedan ser fácilmente buscados.
- **Los modos de costo del asistente de primera ejecución ya no se muestran como palabras en inglés sin traducir** en pantallas localizadas.

Para más detalles, consulta las [notas de lanzamiento][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).

Para aprovechar estas correcciones, actualiza ahora a Chimera Agent 0.49.2.
