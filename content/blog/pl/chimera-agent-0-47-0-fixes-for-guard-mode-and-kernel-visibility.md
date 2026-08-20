---
title: "Chimera Agent 0.47.0: Poprawki dla trybu Guard i widoczności kernela"
date: 2026-08-20
category: update
summary: "Siedem krytycznych poprawek dotyczy błędnego raportowania w trybie guard, luk w egzekwowaniu reguł, integralności audytu oraz widoczności kernela."
version: "0.47.0"
---

## Tryb Guard teraz poprawnie raportuje odmowy

Podstawowy błąd w trybie guard (`--guard`) powodował, że odrzucone wywołania narzędzi były raportowane jako sukcesy. System sprawdzał prefiks `error:` w komunikacie odmowy, ale większość odmów go nie zawierała. Oznaczało to, że trzy krytyczne powierzchnie - ramka pulpitu, logi kroków i wykrywanie dryfu - wszystkie pokazywały pomyślne wykonanie, gdy każde niebezpieczne działanie było faktycznie zablokowane. Model pewnie raportował ukończone akcje, takie jak wymuszone pushy, które nigdy nie wystąpiły. Teraz odmowy są prawidłowo oznaczane na wszystkich powierzchniach, z jasnym wskazaniem decyzji guarda.

## Poprawki silnika reguł dla skryptów i dokumentów

Silnik reguł miał dwie przeciwstawne usterki. Wielolinijkowe skrypty zawsze przechodziły, ponieważ escapowanie znaków nowej linii łamało wykrywanie granic słów w wzorcach reguł. Tymczasem dokumenty cytujące zablokowane komendy były błędnie twardo blokowane. Ochrona działała dokładnie na odwrót - prawdziwe skrypty omijały reguły, podczas gdy dokumentacja wyzwalała fałszywe alarmy. Dwie reguły nigdy nie zadziałały z powodu tych problemów z parsowaniem. Interpolacja teraz poprawnie zachowuje granice.

## Przegląd systemu audytu

Rozwiązano trzy problemy z audytem. Po pierwsze, system wykrywający dane uwierzytelniające był tym samym, który przechowywał je niezacenzurowane w logu audytu. Po drugie, równoczesne zapisy mogły uszkodzić weryfikację kryptograficzną łańcucha audytu. Po trzecie, interfejs bezpieczeństwa fałszywie zgłaszał manipulację z powodu resetów łańcucha skrótów podczas równoczesnych zapisów. Teraz dane uwierzytelniające są cenzurowane przed zapisem audytu, a zapisy utrzymują spójny stan łańcucha.

## Tryb Observe faktycznie obserwuje

Tryb `observe` egzekwował reguły, twierdząc że je tylko mierzy. Twarde bloki uruchamiały się przed konsultacją z zatwierdzającym, a następnie były wykluczane z liczby odmów używanej do decyzji o wdrożeniu. W ponad 33 rzeczywistych wywołaniach osiem odmów pokazywało się jako zero. Te odmowy pozostają (są jednoznacznymi sygnałami), ale teraz są prawidłowo liczone i identyfikują swoje źródło.

## Przywrócono widoczność kernela

Werdykty kernela zaufania nie docierały do endpointów HTTP dla przebiegów, partii lub tur - krytyczne decyzje takie jak zatwierdzenia wymuszonych pushów były podejmowane niewidocznie. Kernel teraz uczestniczy we wszystkich przepływach HTTP gdy `CHIMERA_GOVERNANCE` jest aktywny. Monity po stronie serwera nie pojawią się na połączeniach HTTP, zapewniając że osoba je widząca faktycznie złożyła żądanie.

Uruchom `chimera upgrade` aby otrzymać poprawki. Jeśli używasz trybu guard, zaktualizuj natychmiast - raporty poprzedniej wersji były niebezpiecznie mylące. [Chimera Agent v0.47.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.47.0) szczegółowo opisuje wszystkie zmiany.

Dla wdrożeń produkcyjnych przejrzyj logi audytu pod kątem potencjalnych wycieków danych uwierzytelniających z zarządzanych wywołań `write_file`. Sprawdź czy wielolinijkowe skrypty w plikach reguł wymagają dostosowania do poprawionego wykrywania granic.
