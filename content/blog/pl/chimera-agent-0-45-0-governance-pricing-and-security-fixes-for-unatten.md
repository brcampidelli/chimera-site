---
title: "Chimera Agent 0.45.0: Zarządzanie, limity kosztów i poprawki bezpieczeństwa dla samodzielnych uruchomień"
date: 2026-08-16
category: update
summary: "Ta wersja wzmacnia bezpieczeństwo samodzielnego wykonania poprzez obowiązkowe uwierzytelnianie, limity wydatków i ujednolicone zarządzanie we wszystkich interfejsach."
version: "0.45.0"
---

## Bezpieczeństwo przede wszystkim: wiązanie i uwierzytelnianie

Poprzednie wersje Chimera Agent udostępniały nieuwierzytelnioną bramę na wszystkich interfejsach sieciowych domyślnie. Plik `docker-compose.yml` publikował port 8765 globalnie, a `.env.example` nie zawierał ustawionego tokenu. Oznaczało to, że jedno polecenie deployu mogło przypadkowo utworzyć otwartą bramę agenta dostępną dla każdego, kto odkrył port.

Wersja 0.45.0 zmienia to w trzech aspektach:
- Polecenie `serve` teraz odmawia wiązania z adresami innymi niż loopback bez tokenu uwierzytelniającego
- Docker Compose domyślnie publikuje tylko na `127.0.0.1`
- Istnieje jawna flaga `--allow-insecure-bind` dla uzasadnionych przypadków (np. uwierzytelnione proxy)

To zmiana łamiąca kompatybilność dla wdrożeń korzystających z bramy z innej maszyny. Ustaw `CHIMERA_SERVER_TOKEN` lub użyj obejścia jeśli potrzebne.

## Kontrola wydatków, która naprawdę działa

Przed tą wersją jedynymi limitami były liczniki kroków - zadanie w pętli ponawiania mogło wyczerpać całe saldo dostawcy. Wersja 0.45.0 wprowadza trzy osobne pułapy wydatków:
1. Limit na pojedyncze uruchomienie
2. Limit na zadanie (dla zadań zaplanowanych)
3. Dzienny limit agregowany, który blokuje zadania cron

Nieocenione wywołania teraz zatrzymują wykonanie zamiast kontynuować w ciszy. Modele lokalne traktowane są jako zerokosztowe zamiast nieznane, zapobiegając blokowaniu przez limity jedynej konfiguracji, która nie może przekroczyć budżetu. Uruchom `chimera doctor`, aby sprawdzić czy twój domyślny model może być wyceniony przed ustawieniem limitów.

## Ujednolicone zarządzanie we wszystkich interfejsach

Wcześniej każdy interfejs wykonania (`serve`, cron, MCP, A2A i adaptery komunikatów) budował własny rejestr narzędzi. Teraz pojedyncza funkcja `governed_profile()` konstruuje stos dla wszystkich pięciu, z kontrolą AST w czasie budowy zapobiegającą regresji.

Kluczowa obserwacja: tryb `CHIMERA_GOVERNANCE=observe` istnieje, aby zmierzyć koszt egzekwowania przed jego włączeniem. Uruchamia pełny stos tylko rejestrując co zostałoby zablokowane, dostarczając konkretne dane zamiast wymuszać ryzyko produkcyjne. Domyślnie pozostaje `off` - zarządzanie powinno być wyraźną decyzją.

Ta wersja również aktywuje długo uśpiony system zatwierdzania dla wywołań niebezpiecznej klasy, eliminując nadmierne blokowanie (fałszywe pozytywy) bez zmniejszania skuteczności blokowania ataków.

## Co dalej

Zaktualizuj przez `pip install --upgrade chimera-agent` i przejrzyj ustawienia uwierzytelniania oraz limitów wydatków w swoim wdrożeniu. Dla integracji z edytorem, wskaż ustawienia agenta edytora na `chimera acp --workspace <repo>`. Pełne szczegóły w [notatkach wydania][Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
