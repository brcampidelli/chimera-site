---
title: "Chimera Agent 0.46.0: Naprawa ukrytych błędów i wprowadzenie kart umiejętności"
date: 2026-08-17
category: update
summary: "Chimera Agent 0.46.0 rozwiązuje problem ukrytych błędów, wprowadza bibliotekę kart umiejętności oraz zapewnia rzetelne tłumaczenia w dziewięciu językach."
version: "0.46.0"
---

## Naprawa ukrytych błędów

Chimera Agent 0.46.0 eliminuje serię ukrytych błędów, które wcześniej pozostawały niezauważone. Te problemy nie powodowały awarii ani błędów, ale osłabiały kluczowe funkcjonalności. Na przykład pięć magazynów JSON traciło dane w ciszy z powodu braku mechanizmów blokujących podczas operacji odczyt-modyfikacja-zapis. Oznaczało to, że jeden proces mógł nadpisać zmiany innego bez ostrzeżenia. Jeden z tych magazynów przechowywał dane umiejętności, gdzie zdobyta wiedza mogła zostać usunięta podczas kolejnych uruchomień. Teraz wszystkie pięć magazynów blokuje i zapisuje dane atomowo, zapewniając ich spójność.

Kolejny ukryty błąd dotyczył bota Discord aplikacji, który działał bez odpowiedniego zabezpieczenia. Oznaczało to, że brama kompilacji nie mogła go wykryć, pozostawiając potencjalną lukę bezpieczeństwa. Podobnie, zabezpieczenie governance, które wyłączało CLI podczas importu, gdy było włączone, pozostawało niezauważone, ponieważ nikt nigdy nie uruchomił go z włączonym governance. Te problemy zostały naprawione, zapewniając poprawne działanie funkcji.

## Biblioteka kart umiejętności

Ta wersja wprowadza bibliotekę kart umiejętności, zawierającą 23 karty pogrupowane według zastosowania w procesie: definiuj, buduj, weryfikuj, przeglądaj i publikuj. Te karty to dane, a nie kod, co ułatwia ich rozwijanie i przeglądanie. Każda karta zawiera sekcje takie jak Wyzwalacz, Działanie, Unikaj, Sprawdź i Ryzyko, i są dostępne w dziewięciu językach. Tłumaczenia są zarządzane w pliku dodatkowym, co gwarantuje, że oryginalna karta pozostaje identyczna bajtowo.

Jednak wczytywanie tych kart do promptu agenta jest opcjonalne i domyślnie wyłączone ze względu na znaczny wzrost użycia tokenów bez znaczącej poprawy wydajności. Decyzja ta została podjęta na podstawie testu A/B, który wykazał poprawę o +16,7pp, ale nie osiągnął progu istotności.

## Rzetelne tłumaczenia

Nowy test zapewnia, że tłumaczenia kart umiejętności są rzetelne i kompletne. Rozróżnia trzy stany, które w pliku wyglądają identycznie: nieaktualne, niekompletne i brakujące. Nieaktualne tłumaczenia twierdzą, że tłumaczą tekst, który się zmienił, podczas gdy niekompletne brakują sekcji. Brakujące tłumaczenia są uczciwie oznaczone jako brakujące. Ta brama zapobiega problemowi nieprzetłumaczonych kart w interfejsie, który wcześniej można było wykryć tylko przez czytanie plików, a nie przez błędy kompilacji.

## Korekty dokumentacji

Szesnaście twierdzeń w dokumentacji, których kod nie obsługiwał, zostało poprawionych we wszystkich dziesięciu językach. Pięć z nich było całkowicie błędnych, takich jak opcje governance i destynacje desktop rail. Dodatkowo, dwa twierdzenia zostały uzupełnione o niezbędne zastrzeżenia, zapewniając użytkownikom dokładne informacje.

## Co dalej

Aby zaktualizować do Chimera Agent 0.46.0, wykonaj:

```
pip install -U chimera-agent
pip install -U 'chimera-agent[desktop]'
```

Więcej szczegółów znajdziesz w [notatkach wydania][Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0).

[Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0): chimeraagent.space/release-notes
