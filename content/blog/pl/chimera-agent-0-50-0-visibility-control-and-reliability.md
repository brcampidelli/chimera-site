---
title: "Chimera Agent 0.50.0: Widoczność, kontrola i niezawodność"
date: 2026-10-07
category: update
summary: "Chimera Agent 0.50.0 wprowadza przejrzystość, lepszą kontrolę oraz naprawia ciche błędy."
version: "0.50.0"
---

## Widoczność operacji agenta

Wcześniej lista zadań agenta była niewidoczna dla użytkowników, mimo istnienia pola `RunState.tasks`. Teraz agent wyświetla swoją listę zadań w czasie rzeczywistym, oznaczając elementy jako w trakcie lub zakończone. Ta lista jest zachowywana podczas kompaktowania kontekstu, co zapewnia, że długotrwałe operacje nie tracą śladu swoich planów. Ta zmiana rozwiązuje częsty problem, gdy użytkownicy nie mogli zobaczyć, co agent robi, szczególnie podczas długotrwałych operacji.

## Dostępność poza konsolą

Agenty działające bez nadzoru, takie jak zadania cron, nie mogły skutecznie komunikować się z użytkownikami, gdy potrzebna była aprobata. Ustawiając `CHIMERA_APPROVAL_WEBHOOK`, użytkownicy mogą teraz otrzymywać prośby o aprobatę w preferowanych kanałach. Ta zmiana zapewnia, że agenty mogą dotrzeć do użytkowników, nawet gdy nikt aktywnie nie monitoruje konsoli. Wcześniej takie prośby cicho zawodziły, jeśli nie było dostępnej metody dostarczenia, prowadząc do nieoczekiwanych decyzji.

## Kontrola zarządzania

Funkcja zarządzania, która obejmuje dziennik audytu, była wcześniej niedostępna. Chociaż ekran Security wyświetlał dziennik audytu, nie było możliwości jego włączenia. Teraz użytkownicy mogą włączyć zarządzanie za pomocą parametru `CHIMERA_GOVERNANCE`. Ta zmiana daje użytkownikom możliwość monitorowania i kontrolowania ustawień bezpieczeństwa ich agenta, rozwiązując lukę w przejrzystości i kontroli.

## Lepsze zarządzanie modelami

Wcześniej agenty zakładały domyślny rozmiar okna tokenów dla modeli, które nie były jawnie skatalogowane, co prowadziło do przepełnienia kontekstu i błędów w działaniu. W tej wersji agent teraz pobiera prawidłowy rozmiar okna tokenów z żywego indeksu dla nieskatalogowanych modeli. Dodatkowo poprawiono pięć wpisów w katalogu, aby odzwierciedlały dokładne rozmiary okien tokenów i ceny. Ta zmiana zapobiega błędom w działaniu spowodowanym błędnymi założeniami dotyczącymi możliwości modeli.

## Ulepszona śledzalność

Ślady teraz rejestrują, który backend obsłużył każdy krok, a nie tylko który model odpowiedział. Jest to szczególnie ważne dla modeli takich jak te na OpenRouter, gdzie pojedynczy slug modelu może reprezentować pulę endpointów o różnych możliwościach i kosztach. Wcześniej użytkownicy nie mogli rozróżnić między różnymi endpointami, co prowadziło do zamieszania i nieprecyzyjnych pomiarów. Ta zmiana poprawia przejrzystość i dokładność w śledzeniu wydajności.

## Co robić dalej

Aby skorzystać z tych ulepszeń, zaktualizuj do Chimera Agent 0.50.0 i przejrzyj [notki wydania][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0), aby uzyskać szczegółowe instrukcje dotyczące konfigurowania nowych funkcji, takich jak `CHIMERA_APPROVAL_WEBHOOK` i `CHIMERA_GOVERNANCE`.
