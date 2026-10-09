---
title: "Chimera Agent 0.50.0: Widoczność, Kontrola i Niezawodność"
date: 2026-10-09
category: update
summary: "Chimera Agent 0.50.0 wprowadza widoczność zadań agenta, webhooki do zatwierdzania, kontrolę zarządzania, hybrydowe wyszukiwanie oraz poprawki dotyczące okien kontekstowych modeli."
version: "0.50.0"
---

## Widoczność zadań agenta

Jedną z najważniejszych zmian w Chimera Agent 0.50.0 jest wprowadzenie widoczności zadań. Wcześniej pole `RunState.tasks` istniało, ale nigdy nie było wypełniane, pozostawiając użytkowników w nieświadomości co do działań agenta. Teraz agent utrzymuje listę zadań, która jest wyświetlana na ekranie podczas działania. Każde zadanie jest oznaczone jako w trakcie lub zakończone, a lista przetrwa kompaktowanie kontekstu. Oznacza to, że nawet podczas długich działań agent nie zapomina swojego planu, zapewniając użytkownikom jasny widok postępów.

## Webhooki do zatwierdzania dla działań bez nadzoru

Kolejną istotną poprawą jest możliwość zwracania się przez agenta o zatwierdzenia nawet wtedy, gdy nikt nie jest przy konsoli. Ustawiając zmienną środowiskową `CHIMERA_APPROVAL_WEBHOOK` na webhook kanału, agent może teraz wysyłać pytania o zatwierdzenie do wyznaczonego kanału. Ta zmiana rozwiązuje wcześniejszy problem, gdy niezauważone działania, w tym zadania cron, podejmowały decyzje bez udziału użytkownika. Teraz, jeśli nie ma możliwości dostarczenia pytania, agent wyraźnie informuje, że jest `nieosiągalny`, zapewniając przejrzystość.

## Kontrola zarządzania

Jądro zarządzania, które wcześniej było niewidoczne i nieaktywne, może teraz zostać włączone. Parametr `CHIMERA_GOVERNANCE` domyślnie jest ustawiony na `off`, ale użytkownicy mają teraz możliwość jego aktywacji. Ekran Zabezpieczeń również wskazuje aktualny stan zarządzania, zapewniając użytkownikom niezbędną kontrolę i widoczność nad tą kluczową funkcją.

## Hybrydowe wyszukiwanie w `chimera find`

Polecenie `chimera find` zostało ulepszone o hybrydowe wyszukiwanie, łączące metody wyszukiwania słów kluczowych i wektorowego. To podejście hybrydowe, które jest ustalane przed rozpoczęciem działania, wykazało przewagę nad wyszukiwaniem słów kluczowych o 6,25 punktów na własnym korpusie projektu. Co istotne, samo wyszukiwanie wektorowe wypada gorzej niż wyszukiwanie słów kluczowych, dlatego metoda hybrydowa jest teraz domyślna. Ta zmiana zapewnia bardziej dokładne i niezawodne wyniki wyszukiwania.

## Poprawki dotyczące okien kontekstowych modeli

Wcześniej modele nieuwzględnione w ręcznie sprawdzonym katalogu były domyślnie przypisywane do okna kontekstowego o rozmiarze 128 000 tokenów, co prowadziło do przepełnienia kontekstu i błędów działania dla modeli z mniejszymi oknami. Ta wersja naprawia ten problem, pobierając rozmiar okna kontekstowego z indeksu na żywo, gdy katalog nie zna modelu. Dodatkowo poprawiono pięć wpisów w katalogu, aby odzwierciedlały rzeczywiste rozmiary okien kontekstowych dostarczane przez ich dostawców, oraz dostosowano jedną cenę do zweryfikowanych danych.

## Dodatkowe ulepszenia

Ślady teraz rejestrują, który backend obsłużył każdy krok, a nie tylko który model odpowiedział. Jest to szczególnie ważne dla modeli na OpenRouter, gdzie pojedynczy slug modelu może reprezentować pulę endpointów o różnych rozmiarach okien kontekstowych i cenach. Ta zmiana zapewnia użytkownikom lepsze zrozumienie wykorzystywanych zasobów.

## Szczere zastrzeżenia

- **Instalatory są niepodpisane.** Pierwsze uruchomienie wyświetla ostrzeżenie SmartScreen na Windows i Gatekeeper na macOS. To oczekiwane; *aktualizator* jest podpisany, co jest kluczowe dla tego, co trafia na Twój komputer po instalacji.
- **Zarządzanie jest domyślnie wyłączone.** Kontrola istnieje, abyś mógł ją włączyć, a nie dlatego, że jest aktywna.
- **Podsumowanie kompaktowania jest domyślnie wyłączone**, ukryte za `AgentConfig.summarise_compaction`. Kompaktowanie samo w sobie nigdy nie wystąpiło w zwykłym użyciu — zmierzone 0 razy w 137 przebiegach — więc podsumowanie jest zbudowane i nieprzetestowane, a nie zbudowane i potrzebne.
- **Anulowanie jest współpracujące.** Zatrzymanie działania zatrzymuje je przed kolejnym wywołaniem modelu; wywołania już w trakcie kończą się i są rozliczane.

Pełne szczegóły, w tym pomiary, które wpłynęły na te zmiany, znajdziesz w [changelogu][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0).
