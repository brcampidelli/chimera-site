---
title: "Chimera Agent 0.49.2: Poprawki dla aktualizatora i instalatora"
date: 2026-09-30
category: update
summary: "Chimera Agent 0.49.2 rozwiązuje krytyczne problemy z aktualizatorem i instalatorem, zapewniając płynniejsze aktualizacje i dokładne raportowanie wersji."
version: "0.49.2"
---

## Aktualizator działa teraz ciągle

W poprzednich wersjach aktualizator sprawdzał dostępność nowych wersji tylko raz — przy uruchomieniu aplikacji. To było poważne przeoczenie w przypadku aplikacji takiej jak Chimera Agent, która jest zaprojektowana do długotrwałego działania. W efekcie użytkownicy często przegapiali aktualizacje, chyba że ręcznie sprawdzili ich dostępność lub ponownie uruchomili aplikację. Problem ten był szczególnie widoczny po wydaniu wersji 0.49.1: aplikacja nie powiadomiła użytkowników o aktualizacji, zmuszając ich do ręcznego pobrania instalatora ze strony internetowej.

**W wersji 0.49.2 aktualizator sprawdza dostępność nowych wersji co sześć godzin**, podczas gdy aplikacja jest uruchomiona. Ta zmiana zapewnia, że użytkownicy są na bieżąco informowani o aktualizacjach bez konieczności częstego restartowania aplikacji. Dodatkowo, aktualizator unika niepotrzebnego natręctwa, zapamiętując odrzucone aktualizacje na czas trwania procesu. Jeśli dostępna będzie nowsza wersja, użytkownik zostanie ponownie powiadomiony, co gwarantuje, że ręczne żądania aktualizacji są zawsze uwzględniane.

## Poprawka instalatora wchodzi w życie

Wersja 0.49.1 wprowadziła poprawkę dla problemu z instalatorem, który pozostawiał pliki z poprzednich wersji. W szczególności katalog `_internal` mógł zawierać wiele katalogów `chimera_agent-*.dist-info`, co powodowało, że aplikacja zgłaszała błędną wersję i wielokrotnie oferowała aktualizacje samej siebie. Jednak ta poprawka dotyczyła tylko instalatora dostarczanego z wydaniem, a nie tego używanego do aktualizacji w miejscu.

**0.49.2 to pierwsza wersja, w której naprawiony instalator jest używany do aktualizacji w miejscu.** Jeśli zaktualizowałeś do wersji 0.49.1 i doświadczyłeś błędnego raportowania wersji, ta wersja rozwiązuje problem. Instalator teraz poprawnie usuwa stare pliki, zapewniając dokładne raportowanie wersji i zapobiegając zbędnym powiadomieniom o aktualizacjach.

## Dodatkowe ulepszenia

Kilka innych ulepszeń wprowadzonych w wersji 0.49.1 warto odnotować, jeśli pominąłeś to wydanie:

- **Wydania są wstrzymywane od oznaczenia "latest", dopóki nie zostanie dołączony ich manifest.** Wcześniej punkt końcowy aktualizatora zwracał błąd 404 podczas procesu budowania, cicho zawodził, ponieważ komunikaty o błędach były tłumione, aby uniknąć natręctwa wobec użytkowników.
- **Okna dialogowe błędów i powiadomienia w zasobniku systemowym są teraz zlokalizowane**, podczas gdy diagnostyka techniczna pozostaje w języku angielskim, aby można było ją łatwo wyszukać.
- **Tryby kosztów w kreatorze pierwszego uruchomienia nie są już wyświetlane jako nieprzetłumaczone angielskie słowa** na zlokalizowanych ekranach.

Aby poznać pełne szczegóły, zapoznaj się z [notatkami wydania][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).

Aby skorzystać z tych poprawek, zaktualizuj teraz do Chimera Agent 0.49.2.
