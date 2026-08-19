---
title: "Chimera Agent 0.47.0: Poprawki dla trybu Guard i integralności kernela"
date: 2026-08-19
category: update
summary: "Krytyczne poprawki dotyczące niezawodności trybu guard, dokładności egzekwowania reguł oraz widoczności kernela w zarządzanych wdrożeniach."
version: "0.47.0"
---

## Tryb Guard teraz poprawnie raportuje odmowy

Brama odrzucająca wywołanie narzędzia wcześniej zwracała ciąg obserwacji niezaczynający się od `error:`, przez co system zapisywał to jako sukces. Dotyczyło to trzech obszarów: ramki desktopowej, logów kroków i wykrywania dryfów. Uruchomienie, w którym każde niebezpieczne działanie zostało zablokowane, wyglądało na udane we wszystkich strukturalnych danych, z modelem zgłaszającym nawet wykonane akcje (jak force pushy, które nigdy nie wystąpiły). Kernel teraz prawidłowo oznacza odmowy, a tekst odmowy identyfikuje, który guard podjął decyzję.

## Naprawiono dopasowywanie reguł dla skryptów wielolinijkowych

Silnik reguł wcześniej interpolował tekst skryptu używając `repr`, co zamieniało znaki nowej linii na dwa znaki. To zaburzało granice słów w wzorcach reguł, powodując dwa problemy:

1. Proste skrypty jednolinijkowe mogły omijać zabezpieczenia, ponieważ `\n` scalało się z następnym słowem
2. Dokumenty Markdown cytujące niebezpieczne komendy były błędnie blokowane

Dwie reguły w ogóle nie działały z powodu tego błędu. Tekst jest teraz przekazywany do reguł bez escapowania, pasując do faktycznego zachowania skryptów.

## System audytu już nie przechowuje sekretów

Zarządzana operacja `write_file` zapisywała pełną zawartość pliku w `audit.jsonl`, w tym wrażliwe dane jak pliki `.env` czy klucze prywatne. Działo się tak nawet gdy inny guard już zablokował operację. Audit teraz redaguje wrażliwe treści (używając istniejącego redaktora wcześniej podłączonego tylko do śladów kroków) i zapisuje argumenty w formie dokumentów jako metadane zawierające tylko rozmiar.

## Widoczność kernela dodana do endpointów HTTP

Werdykty kernela zaufania nie były uwzględniane w odpowiedziach HTTP dla endpointów run, batch i turn. Oznaczało to, że kluczowe decyzje (jak zatwierdzenia force pushy) nie były widoczne dla klientów. Kernel jest teraz prawidłowo instalowany w powierzchniach HTTP gdy `CHIMERA_GOVERNANCE` ma wartość `observe` lub `enforce`. Uwaga: wdrożenia HTTP nigdy nie promptują na terminalu serwera - osoba przy tej konsoli nie składała żądania.

## Inne poprawki

- Łańcuchy audytu już nie zgłaszają fałszywej ingerencji przy współbieżnych zapisach
- Tryb `observe` teraz poprawnie zlicza odmowy, które miał tylko mierzyć
- Zablokowani workerzy już nie wstrzymują całych batchy w nieskończoność
- Limity zasobów kontenerów mogą być teraz konfigurowane
- Dodano kontrolę budżetu kontekstu dla użycia terminala

## Znane ograniczenia

Zespół wyraźnie udokumentował trzy obecne luki zamiast pozostawiać je do odkrycia:

1. Raporty `observe` jeszcze nie pojawiają się w interfejsach HTTP
2. API nie ma ścieżki zatwierdzania w trybie `enforce`
3. Cztery endpointy HTTP wciąż nie uwzględniają werdyktów kernela

Aktualizacja przez `pip install --upgrade chimera-agent` lub szczegółowe informacje w [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0).
