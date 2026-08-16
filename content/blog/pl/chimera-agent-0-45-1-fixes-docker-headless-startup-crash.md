---
title: "Chimera Agent 0.45.1 naprawia crash przy starcie w Dockerze w trybie headless"
date: 2026-08-16
category: update
summary: "v0.45.1 rozwiązuje krytyczny problem z wdrożeniami w Dockerze, gdzie instancje headless nie mogły się uruchomić z powodu przedwczesnego importu zależności FastAPI."
version: "0.45.1"
---

## Wdrożenia w Dockerze nie crashują już przy starcie

Chimera Agent 0.45.0 wprowadził regresję, w której kontenery Docker w trybie headless uruchamiające usługę gateway crashowały natychmiast po starcie. Problem występował, ponieważ ścieżka cron zaczęła importować `chimera.api.usage`, co wywoływało przedwczesny import zależności FastAPI — mimo że obraz Docker celowo nie zawierał dodatku `desktop`.

Nie zostało to wykryte podczas testów, ponieważ środowiska deweloperskie zazwyczaj mają zainstalowany FastAPI. Wszystkie 2945 istniejących testów przeszło pomyślnie, ponieważ były uruchamiane w środowiskach, gdzie ta zależność była obecna. Błąd ujawniał się dopiero w produkcyjnych wdrożeniach korzystających z lekkiej instalacji `.[full]`.

## Leniwe importy zapobiegają ukrytym zależnościom

Naprawa rozwiązuje przyczynę źródłową, a nie tylko dodaje brakujące zależności. Wcześniej pięć modułów dostępnych z CLI w `chimera/api` cicho ściągało cały stos webowy poprzez przedwczesne reeksporty w `__init__.py`. v0.45.1 sprawia, że te importy są leniwe, więc ładują się tylko wtedy, gdy są rzeczywiście potrzebne przez komponenty webowe.

To zachowuje dokumentowane rozdzielenie, gdzie podstawowe CLI/gateway nie powinno wymagać zależności webowych, jednocześnie zapewniając, że `chimera app` wyraźnie kończy się niepowodzeniem, gdy FastAPI jest brakuje w uzasadnionych przypadkach użycia webowego.

## Nowy test zapobiega regresji

Dedykowany test teraz weryfikuje to zachowanie, uruchamiając się w subprocesie, gdzie `fastapi` jest celowo niedostępny. Test najpierw potwierdza poprawne działanie tego środowiska przed przejściem do innych asercji — wychwytując przypadki, w których testy mogłyby cicho przechodzić z powodu zanieczyszczenia środowiska.

Naprawa została zweryfikowana end-to-end z czystymi instalacjami `.[full]`. Wdrożenia w Dockerze w trybie headless mogą teraz uruchamiać `serve --cron` zgodnie z oczekiwaniami.

Dla istniejących wdrożeń dotkniętych tym problemem, zaleca się aktualizację do v0.45.1. [Notki wydania][Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) zawierają pełne szczegóły dotyczące zmian od wersji v0.45.0.
