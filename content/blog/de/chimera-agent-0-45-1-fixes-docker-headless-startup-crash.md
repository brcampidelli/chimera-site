---
title: "Chimera Agent 0.45.1 behebt Absturz beim Headless-Start in Docker"
date: 2026-08-16
category: update
summary: "v0.45.1 löst ein kritisches Problem bei Docker-Deployments, bei dem Headless-Instanzen aufgrund einer vorzeitigen FastAPI-Importkette nicht starten konnten."
version: "0.45.1"
---

## Docker-Deployments stürzen beim Start nicht mehr ab

Chimera Agent 0.45.0 führte einen Regression-Fehler ein, bei dem Headless-Docker-Container, die den Gateway-Service ausführen, sofort beim Start abstürzten. Das Problem trat auf, weil der Cron-Pfad begann, `chimera.api.usage` zu importieren, was wiederum einen vorzeitigen Import von FastAPI-Abhängigkeiten auslöste – obwohl das Docker-Image bewusst nicht die `desktop`-Extra enthielt.

Dies wurde während der Tests nicht erkannt, da Entwicklungsumgebungen in der Regel FastAPI installiert haben. Die 2.945 bestehenden Tests bestanden alle, da sie in Umgebungen liefen, in denen die Abhängigkeit zufällig vorhanden war. Der Fehler zeigte sich erst in Produktions-Deployments, die die schlanke `.[full]`-Installation verwendeten.

## Lazy Imports verhindern versteckte Abhängigkeiten

Die Lösung behebt die Ursache, anstatt einfach fehlende Abhängigkeiten hinzuzufügen. Zuvor haben fünf CLI-erreichbare Leaf-Module in `chimera/api` stillschweigend den gesamten Web-Stack durch vorzeitige Re-Exports in `__init__.py` eingebunden. v0.45.1 macht diese Imports lazy, sodass sie nur geladen werden, wenn sie tatsächlich von Web-Komponenten benötigt werden.

Dies bewahrt die dokumentierte Trennung, bei der die Core CLI/Gateway keine Web-Abhängigkeiten benötigen sollte, während sichergestellt wird, dass `chimera app` klar scheitert, wenn FastAPI für legitime Web-Anwendungsfälle fehlt.

## Neuer Test verhindert Regression

Ein spezieller Test überprüft nun dieses Verhalten, indem er in einem Subprozess ausgeführt wird, in dem `fastapi` absichtlich nicht importierbar gemacht wird. Der Test bestätigt zunächst, dass diese Umgebungseinrichtung funktioniert, bevor er mit weiteren Assertions fortfährt – und fängt so Fälle ab, in denen Tests aufgrund von Umgebungskontamination stillschweigend bestanden hätten.

Die Lösung wurde end-to-end mit sauberen `.[full]`-Installationen verifiziert. Headless-Docker-Deployments können nun wie erwartet `serve --cron` ausführen.

Für bestehende Deployments, die von diesem Problem betroffen sind, empfiehlt sich ein Upgrade auf v0.45.1. Die [Release Notes][Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) enthalten detaillierte Informationen zu den Änderungen gegenüber v0.45.0.
