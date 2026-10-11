---
title: "Chimera Agent 0.49.3: Lepsze komunikaty błędów, zaktualizowane modele"
date: 2026-10-03
category: update
summary: "Sześć poprawek dotyczących mylących komunikatów i przestarzałych ustawień domyślnych, wszystkie wykryte podczas budowania rzeczywistych projektów z wykorzystaniem frameworka."
version: "0.49.3"
---

## Gdy MCP blokuje zapisy

Odczyt danych przez MCP wcześniej zakłócał działanie bez wyjaśnienia przyczyny niepowodzenia zapisu. Komunikat błędu łączył trzy różne scenariusze: odmowę użytkownika, konfigurację właściciela oraz przypadki, gdzie żaden człowiek nie mógł zatwierdzić żądania HTTP. Użytkownicy widzieli identyczne komunikaty odmowy dla wszystkich trzech sytuacji, tracąc czas i budżet na ponowne próby, które nie mogły się powieść. Teraz każdy przypadek otrzymuje konkretne wyjaśnienie - szczególnie ważne w kontekście HTTP, gdzie komunikat jasno stwierdza, że zatwierdzenie jest niemożliwe i sugeruje włączenie pauzy-na-zatwierdzenie lub unikanie niezaufanych treści.

## Testowanie, które rzeczywiście testuje

Przycisk testu MCP wcześniej sprawdzał tylko łączność z serwerem, ukrywając milczeniem, czy agenci faktycznie mogli korzystać z tych narzędzi. Serwer mógł przejść test, podczas gdy jego narzędzia pozostawały niedostępne dla agentów (gdy ładowanie serwerów MCP przy starcie było wyłączone). Teraz test raportuje zarówno łączność, jak i faktyczną dostępność, z odrębnymi komunikatami wyjaśniającymi, jak rozwiązać każdy potencjalny problem.

## Weryfikacja a dostarczenie

Weryfikacja przebiegu wcześniej pokazywała `verified: True` bez wskazania, czy obecne pliki pasują do tych, które zostały zweryfikowane. Zweryfikowany przebieg mógł później zawierać zupełnie inną zawartość (20/20 testów niezdanych w jednym zaobserwowanym przypadku) bez wizualnej wskazówki. Przebiegi teraz śledzą `delivered_matches_verified` i wyświetlają wyraźne oznaczenia, gdy zawartość dysku różni się od stanu zweryfikowanego.

## Zaktualizowane domyślne modele

Domyślny zestaw modeli pozostawał w tyle za obecną ofertą:
- Model bazowy zmieniony z `deepseek-chat-v3.1` (0.25/0.95) na `deepseek-v4-flash-0731` (0.065/0.18)
- Model top-tier zastąpiony `deepseek-r1` przez `z-ai/glm-5.3`
- Sędzia fuzji i miejsca panelowe zaktualizowane do obecnej generacji modeli

Te zmiany odzwierciedlają zmierzone poprawy w cenie, rozmiarze okna kontekstu i testach porównawczych stron trzecich - a nie niezweryfikowane twierdzenia o jakości. Aktualizacja usuwa również modele w wersji preview z pozycji domyślnych, gdzie użytkownicy nie wybrali ich wyraźnie.

## Inne poprawki
- Błędy instalacji umiejętności teraz poprawnie identyfikują, który host odrzucił żądanie
- Uprawnienia zapisu ścieżek bezwzględnych pokazują jasne porównania z wzorcami glob względnymi obszaru roboczego
- `.env.example` nie sugeruje już przestarzałych modeli ani nieprawidłowych cen

Aktualizuj przez `pip install --upgrade chimera-agent` lub zobacz [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3) aby poznać pełne szczegóły.
