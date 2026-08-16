---
title: "Chimera Agent 0.45.0: Zarządzanie, limity wydatków i poprawki bezpieczeństwa"
date: 2026-08-16
category: update
summary: "Ta wersja wprowadza brakujące domyślne ustawienia bezpieczeństwa, dodaje kontrolę wydatków i rozszerza zarządzanie na wszystkie nieobsługiwane powierzchnie."
version: "0.45.0"
---

## Domyślne ustawienia bezpieczeństwa, które faktycznie działają

Poprzednia wersja była dostarczana z niebezpieczną konfiguracją: otwarte porty, brak uwierzytelniania i brak ostrzeżeń. To nie był przeoczenie — to był świadomy wybór, aby priorytetowo traktować łatwość konfiguracji kosztem bezpieczeństwa, ale równowaga była niewłaściwa. Teraz `serve` odmawia powiązania z adresami innymi niż loopback bez tokenu, a konfiguracja Docker publikuje tylko na `127.0.0.1`. Jeśli chcesz udostępnić bramę, musisz wyraźnie wyrazić zgodę za pomocą `--allow-insecure-bind` lub ustawić `CHIMERA_SERVER_TOKEN`.

To powoduje problemy z istniejącymi wdrożeniami, które opierały się na starym zachowaniu. Naprawa jest prosta, ale ta zmiana musiała nastąpić: brama agenta dostępna dla każdego w sieci to ryzyko, a nie funkcja.

## Limity wydatków, które działają

Przed tą wersją jedyną kontrolą wydatków był licznik kroków. Zadanie w pętli ponawiania mogło wyczerpać Twoje kredyty API bez ostrzeżenia. Teraz są trzy osobne limity: na pojedyncze uruchomienie, na zadanie i dzienny agregat. Jeśli wywołanie nie może być wycenione, uruchomienie zostaje zatrzymane, zamiast kontynuować bez kontroli. Modele lokalne są traktowane jako darmowe, a nie nieznane, więc limity nie blokują jedynej konfiguracji, która nie może przekroczyć budżetu.

`chimera doctor` sprawdza, czy Twój domyślny model może być w ogóle wyceniony. To pozwala uniknąć niespodzianek przy próbie ustawienia limitu wydatków.

## Zarządzanie obejmujące wszystkie powierzchnie

Piec różnych komponentów (`serve`, cron, MCP, A2A i adaptery komunikatów) miało własne minimalne rejestry narzędzi. Teraz współdzielą jeden stos `governed_profile()`, wymuszany przez kontrolę AST w czasie kompilacji. Kluczowe spostrzeżenie jest takie, że `CHIMERA_GOVERNANCE=observe` jest bardziej przydatne niż `enforce` — loguje to, co zostałoby zablokowane, bez faktycznego blokowania, więc możesz zmierzyć wpływ, zanim je włączysz.

Ta wersja również podłącza system zatwierdzania, który istniał, ale nie był połączony. Wywołania klasy niebezpiecznej, które odczytują dane zewnętrzne, mają teraz kogoś po drugiej stronie bramy, zmniejszając nadmierne blokowanie bez uszczerbku dla bezpieczeństwa.

## Co dalej

Uruchom `chimera doctor`, aby sprawdzić swoją konfigurację, a następnie przejrzyj swoje wdrożenie, jeśli wiązałeś z `0.0.0.0`. Pełne zmiany znajdują się w [Chimera Agent v0.45.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.0).
