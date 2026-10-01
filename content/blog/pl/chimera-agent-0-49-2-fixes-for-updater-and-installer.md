---
title: "Chimera Agent 0.49.2: Poprawki dla aktualizatora i instalatora"
date: 2026-10-01
category: update
summary: "Chimera Agent 0.49.2 rozwiązuje krytyczne problemy z aktualizatorem i instalatorem, zapewniając płynniejsze aktualizacje i poprawne raportowanie wersji."
version: "0.49.2"
---

## Aktualizator sprawdza teraz co sześć godzin

Wcześniej sprawdzanie aktualizacji w Chimera Agent odbywało się tylko raz przy uruchomieniu, co oznaczało, że jeśli aplikacja pozostawała otwarta, nigdy nie wykrywała nowych wersji. Ten problem był szczególnie uciążliwy dla narzędzia takiego jak Chimera, które jest zaprojektowane do ciągłej pracy. W efekcie użytkownicy musieli ręcznie pobierać aktualizacje ze strony, co negowało cel automatycznego aktualizatora.

W wersji 0.49.2 aktualizator sprawdza teraz dostępność nowych wersji co sześć godzin podczas działania aplikacji. Ta zmiana zapewnia, że użytkownicy są na bieżąco informowani o aktualizacjach bez konieczności ręcznej interwencji. Dodatkowo, aktualizator zapamiętuje odrzucone wersje na czas trwania procesu, zapobiegając wielokrotnym monitom o tę samą aktualizację, chyba że dostępna jest nowsza wersja.

## Poprawka instalatora zaczyna działać

Wersja 0.49.1 wprowadziła poprawkę dla problemu z instalatorem, który pozostawiał pliki z poprzedniej wersji, powodując błędne raportowanie wersji aplikacji i oferowanie aktualizacji do samej siebie. Jednak ta poprawka dotyczyła tylko instalatora dostarczonego z tą wersją, a nie tego używanego do jej instalacji.

W 0.49.2 naprawiony instalator jest teraz używany do aktualizacji na miejscu, zapewniając poprawne raportowanie wersji po aktualizacji. Jeśli zaktualizowałeś do wersji 0.49.1 i napotkałeś problem z raportowaniem wersji, ta wersja go rozwiązuje.

## Dodatkowe ulepszenia

Inne ulepszenia w tej wersji obejmują wstrzymywanie oznaczania wersji jako "najnowsza" do momentu dołączenia manifestu, co zapobiega zwracaniu błędu 404 przez punkt końcowy aktualizatora podczas procesu budowania. Komunikaty o błędach i zasobnik systemowy są teraz w języku użytkownika, podczas gdy diagnostyka techniczna pozostaje nieprzetłumaczona, aby ułatwić wyszukiwanie komunikatów o błędach. Tryby kosztów kreatora pierwszego uruchomienia zostały również zlokalizowane, unikając wcześniejszego problemu wyświetlania angielskich słów na przetłumaczonym ekranie.

Pełna lista zmian dostępna jest w [Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).
