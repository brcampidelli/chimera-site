---
title: "Chimera Agent 0.45.1: Naprawa awarii w Headless Docker"
date: 2026-08-16
category: update
summary: "Wersja 0.45.1 naprawia krytyczny problem z uruchamianiem Docker, gdzie kontenery headless ulegały awarii z powodu niepotrzebnej zależności FastAPI."
version: "0.45.1"
---

## Dlaczego kontenery Docker ulegały awarii przy starcie

Chimera Agent 0.45.0 wprowadził cichą awarię dla wdrożeń headless Docker. Obraz kontenera instaluje `.[full]` bez dodatku `desktop`, co celowo wyklucza FastAPI. Jednak ścieżka cron zaczęła importować `chimera.api.usage`, co spowodowało przedwczesną inicjalizację modułu API. To spowodowało, że FastAPI zostało pobrane jako pośrednia zależność przez czytnik JSONL, prowadząc do zapętlenia się kontenerów z błędem `ModuleNotFoundError`.

Błąd pozostał niezauważony, ponieważ:
1. Środowiska deweloperskie zazwyczaj mają zainstalowane FastAPI
2. Żaden z 2945 istniejących testów nie symulował czystej instalacji `.[full]`
3. Awaria ujawniła się tylko w środowiskach produkcyjnych

## Leniwe ładowanie podstawowych zależności

Naprawa rozwiązuje przyczynę problemu, zamiast maskować objawy. Dodanie `desktop` do obrazu zadziałałoby, ale naruszyłoby dokumentowane przeznaczenie dodatku ("core CLI/gateway nigdy tego nie potrzebuje") i niepotrzebnie zwiększyłoby rozmiar obrazu.

Wersja 0.45.1 modyfikuje `chimera/api/__init__.py`, aby:
- Rozwiązywać re-eksporty leniwie zamiast przedwcześnie
- Izolować zależności FastAPI do komponentów związanych z webem
- Zachować jasne komunikaty błędów, gdy `desktop` jest rzeczywiście wymagane

Pięć modułów końcowych (`usage`, `roles`, `sessions`, `posture` i `config_api`) nie importuje już niejawnie stosu webowego, gdy są używane przez operacje CLI. Brama pozostaje funkcjonalna z zainstalowanym tylko `.[full]`.

## Nowa siatka bezpieczeństwa

Test podprocesowy teraz weryfikuje, czy importy działają bez dostępnego FastAPI. To pozwoliłoby wykryć problem przed wydaniem, poprzez:
1. Uruchomienie w środowisku, gdzie `fastapi` jest celowo niedostępne
2. Sprawdzenie podstawowej funkcjonalności przed przejściem do innych testów
3. Odbicie rzeczywistych warunków wdrożenia

Weryfikacja end-to-end potwierdza poprawkę: czysta instalacja `.[full]` może teraz uruchomić `serve --cron` bez awarii.

Zaktualizuj za pomocą `pip install -U chimera-agent==0.45.1`. Aby zweryfikować wdrożenie, przetestuj swój kontener za pomocą `serve --cron` i sprawdź komunikaty inicjalizacji bramy. [Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) zawiera pełne szczegóły techniczne dotyczące zmian.
