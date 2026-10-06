---
title: "Chimera Agent 0.49.3: Naprawiamy to, co się zepsuło podczas używania, nie tylko czytania"
date: 2026-10-06
category: update
summary: "Sześć błędów naprawionych po testach w rzeczywistych warunkach, w tym ciche błędy zapisu, mylące wyniki testów i przestarzałe domyślne ustawienia modeli."
version: "0.49.3"
---

## Kiedy narzędzia kłamią o swoim stanie

Najdroższą lekcją były odczyty danych MCP. Zadanie kosztujące 5,11 USD nie wygenerowało żadnych plików, ponieważ komunikat odmowy nie rozróżniał odmowy przez człowieka i niemożliwej do zatwierdzenia prośby. Trzy identyczne próby spaliły budżet, zanim użytkownicy zorientowali się, że ponowne próby nie mają sensu. Teraz każdy przypadek odmowy wyjaśnia się sam: odmowa człowieka pokazuje, kto odmówił, odmowa systemu wskazuje blok konfiguracyjny, a przypadki HTTP wyraźnie stwierdzają brak osoby zatwierdzającej, sugerując dwie rozwiązania - włączenie pauzy na zatwierdzenie lub unikanie niezaufanych treści.

## Weryfikacja, która nie weryfikowała

Znacznik `verified: True` z pozytywnymi logami testów stał się bezwartościowy, gdy późniejsze zapisy zmieniały pliki. Użytkownicy widzieli zielone ptaszki, pracując na nieweryfikowanych treściach. System teraz śledzi, czy dostarczone pliki pasują do zweryfikowanego stanu i pokazuje ostrzegawcze znaczniki, gdy się rozchodzą. Oryginalna weryfikacja pozostaje widoczna - była prawidłowa w momencie nadania - ale obecna niezgodność pojawia się obok.

## Domyślne ustawienia, które zawiodły

Przydziały modeli niebezpiecznie odbiegały od normy:
- Główny model był 4x droższy od obecnych opcji
- Model podglądowy znajdował się w krytycznej domyślnej pozycji
- Okna kontekstowe nie spełniały wymagań poziomu

Nowe domyślne ustawienia pasują do obecnego stosunku ceny do wydajności (deepseek-v4-flash-0731 za 1/4 kosztu) przy zachowaniu możliwości. Plik .env.example nie sugeruje już wycofanych modeli ani cen z innej epoki. Co istotne, wybór modelu nie był oparty na testach jakości wyjścia - wszystkie osiem kandydatów pomyślnie zapisywało pliki - ale na mierzalnych czynnikach: cenie, oknie kontekstowym i zewnętrznych benchmarkach.

## Co teraz zrobić

Zaktualizuj natychmiast, jeśli używasz:
- Serwerów MCP (zmieniono zachowanie testowe)
- Weryfikacji plików (nowe wykrywanie niezgodności)
- Domyślnych ustawień modeli (znaczne zmiany kosztów/wydajności)

Pełne szczegóły techniczne wyjaśniają uzasadnienie każdej poprawki: [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
