---
title: "Chimera Agent 0.47.0: Poprawki dla Guarded Runs"
date: 2026-08-22
category: update
summary: "Siedem poprawek dotyczy nieprawidłowego raportowania odrzuconych wywołań narzędzi, błędów w ocenie reguł oraz problemów z integralnością audytu."
version: "0.47.0"
---

## Guarded Runs teraz raportują poprawnie

Naprawiono krytyczny błąd w funkcji guarded runs (flaga `--guard`). Wcześniej, gdy wywołanie narzędzia zostało odrzucone przez reguły zarządzania, system błędnie zgłaszał je jako udane. Dzieje się tak, ponieważ komunikat odmowy nie zaczynał się od `error:`, przez co sprawdzanie statusu zwracało `True`. Dotyczyło to trzech kluczowych obszarów:

1. Wizualizacji w ramce pulpitu
2. Dziennika kroków używanych do potwierdzeń
3. Detektora dryfu

Oznaczało to, że przebiegi, w których każde niebezpieczne działanie zostało zablokowane, wyglądały na udane we wszystkich strukturalnych wynikach. Model mógł nawet odpowiadać komunikatami potwierdzającymi działania, które nigdy nie zostały wykonane.

## Naprawiono ocenę reguł dla skryptów i dokumentów

Silnik reguł miał dwa poważne problemy:

1. **Wielolinijkowe skrypty omijały ochronę**: Ze względu na sposób escapowania znaków nowej linii podczas interpolacji tekstu, granice słów w regułach były łamane. Pozwalało to na przedostawanie się niebezpiecznych poleceń, jeśli pojawiały się po bezpiecznych w skrypcie.

2. **Dokumenty wywoływały fałszywe alarmy**: Tymczasem pliki Markdown cytujące niebezpieczne polecenia były całkowicie blokowane. Ochrona była skutecznie odwrócona - prawdziwe zagrożenia były przepuszczane, podczas gdy dokumentacja była blokowana.

Dwie reguły w ogóle nie działały na żadnych danych wejściowych. Te problemy zostały poprawione, z właściwym obsłużeniem zarówno wykonywania skryptów, jak i zawartości dokumentów.

## Ulepszenia audytu i bezpieczeństwa

Wprowadzono kilka poprawek związanych z bezpieczeństwem:

- **Przechowywanie poświadczeń**: System audytu przechowywał wrażliwe dane, które miał wykrywać. Gdy zarządzana operacja `write_file` była blokowana, zawartość pliku nadal pojawiała się w `audit.jsonl`. Teraz są dwie warstwy: audyt redakuje wrażliwe dane (używając istniejących możliwości redakcji), a argumenty w formie dokumentów są rejestrowane tylko po rozmiarze.

- **Integralność łańcucha audytu**: Ekran bezpieczeństwa czasami fałszywie zgłaszał naruszenie, gdy żadna modyfikacja nie wystąpiła. Dzieje się tak, gdy wielu autorów wznawiało łańcuchy hashów z różnych migawek, tworząc zduplikowane numery sekwencji. Weryfikacja działa teraz poprawnie.

- **Poprawki trybu obserwacji**: Tryb `observe` faktycznie egzekwował reguły, które miał tylko mierzyć. Twarde BLOCKi teraz właściwie zwracają się przed konsultacją z zatwierdzającym, a odmowy są prawidłowo liczone w metrykach.

## Widoczność i niezawodność kernela

Kernel zaufania nie był serwowany przez HTTP, co oznacza, że jego werdykty nie docierały do konsumentów API. Jest teraz poprawnie instalowany dla wszystkich endpointów, gdy `CHIMERA_GOVERNANCE` jest ustawione na `observe` lub `enforce`. Inne poprawki niezawodności obejmują:

- Właściwe obsłużenie limitów czasu workerów
- Rozróżnienie awarii zadań od ich wygaśnięć
- Konfigurację limitów kontenera
- Automatyczne odzyskiwanie backendu

## Znane ograniczenia

Aktualizacja rozwiązuje kilka problemów, ale pozostawia pewne znane luki:

1. Raporty `observe` nie są jeszcze dostępne przez interfejsy HTTP
2. API nie ma ścieżki zatwierdzania w trybie `enforce`
3. Cztery endpointy HTTP nadal nie mają integracji z kernelem

Są one udokumentowane w README, a nie pozostawione jako ukryte problemy.

Zaktualizuj teraz za pomocą `pip install --upgrade chimera-agent` lub przez preferowany menedżer pakietów. Pełne szczegóły znajdziesz w [informacjach o wydaniu][Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0).
