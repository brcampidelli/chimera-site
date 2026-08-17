---
title: "Chimera Agent 0.46.0: Zasady, które obowiązują tuż obok"
date: 2026-08-17
category: update
summary: "Naprawiono cichą utratę danych, nieprzetłumaczone karty umiejętności oraz bramy, które nie spełniały swojej funkcji — plus biblioteka 23 kart umiejętności opartych na incydentach."
version: "0.46.0"
---

## Kiedy zasady nie sięgają

Pięć magazynów JSON, w tym sklep z umiejętnościami, wcześniej pozwalało współbieżnym procesom na ciche nadpisywanie danych innych procesów. Uruchomienie, które czegoś się nauczyło, mogło mieć swoją pamięć wymazaną przez kolejne uruchomienie. Wszystkie pięć teraz blokuje i zapisuje dane atomowo — bez konieczności konfiguracji. Ten sam wzór naprawił funkcje zarządzania, które padały przy imporcie, oraz bota Discord, który działał bez kontroli.

## Karty umiejętności jako raporty z incydentów

Dwadzieścia trzy karty znajdują się teraz w `skills/`, z czego trzynaście powstało na podstawie defektów tego projektu. Każda dokumentuje tryb awarii w formacie Wyzwalacz/Rób/Unikaj/Sprawdź/Ryzyko — dane, nie kod. Są pogrupowane według fazy workflow (`define · build · verify · review · ship`) i otagowane tematycznie. Zaimportuj jedną za pomocą:

```
chimera skills-import skills/verify-before-claiming
```

Karty obsługują dziewięć języków poprzez pliki dodatkowe, które zachowują oryginalny hash SHA-256. System wykrywa nieaktualne tłumaczenia (twierdzące, że tłumaczą tekst, który się zmienił) i niekompletne (brakujące sekcje), ale pozwala na brakujące tłumaczenia z wyraźnym oznakowaniem.

## Bramy, które naprawdę filtrują

Trzy defekty agenta osłabiły komponenty nośne bez powodowania niepowodzenia testów. Przyczyna: kontrole wymieniały wymagane zachowania zamiast dozwolonych wyjątków. Gdy pojawiały się nowe zachowania, bramy pozostawały otwarte. Teraz wymieniają wyjątki — jeśli coś nie jest wyraźnie pozwolone na ominięcie kontroli, jest sprawdzane.

Szesnaście twierdzeń w dokumentacji zostało poprawionych w dziesięciu językach. Pięć było całkowicie fałszywych: tryby zarządzania nie obejmują `ask`, desktop rail nie ma celu czatu, a `CHIMERA_TAVILY_API_KEY` nie istnieje w kodzie. Dwa optymistyczne twierdzenia teraz mają swoje zaprzeczające dowody obok.

```
pip install -U chimera-agent
```

Przeglądaj karty na chimeraagent.space/skills [Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0) lub sprawdź `bench/skillcard/RESULTS.md` dla opcjonalnego kompromisu wydajnościowego.
