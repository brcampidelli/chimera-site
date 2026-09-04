---
title: "Chimera Agent 0.49.0: Okno Aktualizacji Teraz Mówi Twoim Językiem"
date: 2026-09-04
category: update
summary: "Okno aktualizacji i komunikaty o błędach są teraz wyświetlane w języku systemu, z opcją ręcznej weryfikacji w zasobniku."
version: "0.49.0"
---

## Tłumaczenia Okna Aktualizacji i Ręczna Weryfikacja

Okno aktualizacji w Chimera Agent było wcześniej dostępne tylko w języku angielskim, niezależnie od ustawień językowych aplikacji. W wersji 0.49.0 zostało to poprawione — okno teraz dostosowuje się do języka systemu operacyjnego. Ta zmiana eliminuje niezgodność dla użytkowników, którzy korzystają z aplikacji w jednym języku, ale widzą krytyczne komunikaty systemowe w innym.

W menu zasobnika dodano opcję **Sprawdź aktualizacje**, która stanowi pierwszy sposób ręcznego sprawdzenia dostępności aktualizacji. Wcześniej automatyczne sprawdzanie odbywało się po cichu podczas uruchamiania, bez żadnej informacji zwrotnej, chyba że znaleziono aktualizację. Chociaż takie podejście unika niepotrzebnych powiadomień, pozostawiało użytkowników bez możliwości potwierdzenia, czy mają najnowszą wersję, bez restartowania aplikacji. Nowa opcja ręcznej weryfikacji zapewnia wyraźne potwierdzenie, gdy brak aktualizacji, oraz czytelne komunikaty o błędach w przypadku niepowodzenia.

## Przetłumaczone Komunikaty o Błędach z Niezmienionymi Diagnostykami

Komunikaty o błędach — w tym raporty o awariach backendu i opcja Zakończ w zasobniku — są teraz również tłumaczone. Istnieje jednak ważne rozróżnienie co podlega tłumaczeniu:

- **Instrukcje dla użytkownika** są wyświetlane w języku systemu (np. "Zamknij Chimera i uruchom ponownie")
- **Szczegóły techniczne** (ścieżki plików, kody błędów, logi backendu) pozostają w oryginalnej formie

To rozdzielenie zapewnia użytkownikom jasne wskazówki w preferowanym języku, jednocześnie zachowując możliwość wyszukiwania i analizy informacji o błędach. Test weryfikuje to zachowanie, sprawdzając, czy tekst widoczny dla użytkownika pochodzi z tabel tłumaczeń, a dane diagnostyczne pozostają niezmienione.

## Co Pozostaje Niezmienione

Mechanizm aktualizacji sam w sobie nie uległ zmianie — sprawdzanie nadal odbywa się automatycznie przy uruchomieniu, a instalacja zawsze wymaga potwierdzenia przez użytkownika. Aplikacja nigdy nie instaluje aktualizacji bez wyraźnej zgody. Jedna subtelna, ale ważna szczegółowość: wersja wyświetlająca okno aktualizacji zawsze jest tą obecnie zainstalowaną, a nie nową wersją, która jest oferowana. Oznacza to, że monit oferujący wersję 0.49.0 pojawia się w języku używanym przez bieżącą wersję — od 0.49.0 wzwyż będzie to język systemu.

Aby zobaczyć zmiany, zaktualizuj do wersji 0.49.0 lub sprawdź ręcznie przez menu zasobnika. Pełne szczegóły znajdują się w [informacjach o wydaniu][Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
