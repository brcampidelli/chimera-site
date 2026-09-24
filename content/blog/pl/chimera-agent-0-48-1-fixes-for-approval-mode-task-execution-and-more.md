---
title: "Chimera Agent 0.48.1: Poprawki dla trybu zatwierdzania, wykonywania zadań i więcej"
date: 2026-09-03
category: update
summary: "Chimera Agent 0.48.1 rozwiązuje krytyczne problemy związane z trybem zatwierdzania, wykonywaniem zadań i raportowaniem kosztów, zapewniając płynniejszą pracę i lepsze bezpieczeństwo."
version: "0.48.1"
---

## Tryb Zatwierdzania Działa Teraz Tak, Jak Powinien

Ustawienie `CHIMERA_APPROVAL_MODE=allow` działa teraz poprawnie na wszystkich platformach, w tym w aplikacji desktopowej i `chimera serve`. Wcześniej to ustawienie działało tylko w `solve` i `crew`, co powodowało nieoczekiwane odmowy dla większości użytkowników. Ta poprawka zapewnia, że niebezpieczne narzędzia nie są już blokowane podczas czytania niezaufanych treści, co jest zgodne z pierwotnym zamysłem tego ustawienia. Testy pokazują, że z zatwierdzającym system blokuje 85,7% ataków, jednocześnie pozwalając na wszystkie uczciwe zadania, co stanowi znaczną poprawę w porównaniu z poprzednim wskaźnikiem odmów wynoszącym 50% dla legalnych zadań.

## Ujednolicony Ekran Wykonywania Zadań

Ekran Work został uproszczony, aby zmniejszyć redundancję i poprawić użyteczność. Wcześniej użytkownicy musieli wybierać między czterema różnymi formularzami do uruchamiania zadań, z których każdy wymagał tych samych danych wejściowych. Prowadziło to do nieefektywności i frustracji, ponieważ próba użycia innej metody wymagała ponownego wpisania zadania. Teraz jeden ekran z czterema przyciskami obsługuje wszystkie tryby wykonywania zadań, co upraszcza proces i zmniejsza liczbę zakładek z pięciu do czterech. Ta zmiana zapewnia również spójność zadań i kontroli między trybami, podczas gdy próby, role i sloty pracowników pozostają specyficzne dla każdego trybu.

## Kluczowe Poprawki i Dodatki

- **Puste Zmienne Nie Powodują Już Awarii Aplikacji:** Pusta zmienna `CHIMERA_GUARD_CHAT` w pliku `.env` wcześniej uniemożliwiała uruchomienie aplikacji. To zostało naprawione, a puste wartości są teraz traktowane jako nieustawione, zamiast powodować awarię.
- **Licznik Kosztów dla Drogich Modeli:** Licznik kosztów teraz poprawnie raportuje koszty dla wszystkich modeli, w tym drogich, takich jak `claude-opus-5` i `gpt-5.5`. Wcześniej te modele pokazywały nieznane koszty z powodu brakującego wywołania funkcji.
- **Pierścień Fokusu dla Przycisków:** Komponent Button teraz poprawnie przyjmuje wspólny pierścień fokusu, naprawiając niespójność wizualną.

## Nowa Funkcja: Opóźnione Ładowanie Narzędzi

Dodano ustawienie `CHIMERA_DEFER_TOOLS`, aby zmniejszyć użycie tokenów poprzez opóźnienie ładowania schematów narzędzi do momentu, gdy są potrzebne. Testy pokazują 26% redukcję kosztów na ukończone zadanie, choć wpływ na wskaźniki ukończenia zadań pozostaje niejasny. To ustawienie jest domyślnie wyłączone ze względu na mieszane wyniki.

## Co Robić Dalej

Zaktualizuj do Chimera Agent 0.48.1, aby skorzystać z tych poprawek i ulepszeń. Szczegółowe informacje o wydaniu znajdziesz w [Chimera Agent v0.48.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.1).
