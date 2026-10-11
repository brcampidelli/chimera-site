---
title: "Chimera Agent 0.50.0: Widoczność, kontrola i hybrydowe wyszukiwanie"
date: 2026-10-11
category: update
summary: "Ta wersja naprawia ukryte zachowania, dodaje brakujące kontrole i poprawia wyszukiwanie dzięki hybrydowemu podejściu."
version: "0.50.0"
---

## Zadania są teraz widoczne

Agenty wcześniej przechowywały wewnętrzną listę zadań (`RunState.tasks`), która nigdy nie była udostępniana ani zapisywana. Długie przebiegi mogły tracić ślad swojego postępu podczas kompaktowania kontekstu. Teraz aktywna zadanie jest wyświetlane podczas wykonywania, a zakończone zadania są przekreślone. Lista przetrwa kompaktowanie, więc agenty nie zapominają już swojego planu w trakcie działania.

## Prośby o zatwierdzenie podążają za tobą

Trzy niezauważone powierzchnie wykonawcze (w tym zadania cron) mogły prosić o zatwierdzenia, ale mechanizm był niejasny. Jeśli skonfigurowane z `CHIMERA_APPROVAL_WEBHOOK`, agenty teraz kierują pytania o zatwierdzenie do określonego kanału zamiast cicho zawieść, gdy konsola jest niedostępna. System również wyraźnie zgłasza stany `unreachable`, gdy dostarczenie nie jest możliwe.

## Ulepszenia zarządzania i wyszukiwania

Jądro zaufania (`CHIMERA_GOVERNANCE`) wcześniej nie miało kontroli aktywacji pomimo logowania zdarzeń bezpieczeństwa. Teraz jest domyślnie wyłączone z widocznym przełącznikiem. Dla wyszukiwania, `chimera find` teraz domyślnie używa hybrydowego wyszukiwania (słowa kluczowe + wektory) po testach pokazujących przewagę o 6.25 punktów (p = 1.7e-04) w porównaniu z samymi słowami kluczowymi na korpusie projektu. Samo wyszukiwanie wektorowe wypada gorzej, uzasadniając połączone podejście.

## Naprawy w obsłudze modeli

Agenty zakładały, że niekatalogowane modele mają okna 128k tokenów, powodując awarie dla 31 modeli (z 431 indeksowanych), które faktycznie obsługują ≤64k. System teraz sprawdza indeks na żywo dla nieznanych modeli. Pięć wpisów w katalogu zostało poprawionych z powodu zawyżonych rozmiarów okien, a jeden błąd cenowy (2.2x różnicy) został naprawiony.

## Śledzenie i zastrzeżenia

Ślady teraz rejestrują, który backend obsłużył każdy krok, a nie tylko który model odpowiedział. To ma znaczenie dla usług takich jak OpenRouter, gdzie skróty modeli reprezentują pule z 8.8x różnicą cen. Zmiany w dzienniku wycofują niektóre deklaracje wydajności, które błędnie porównywały połączone pomiary.

Kluczowe ograniczenia pozostają: instalatory są niepodpisane (choć aktualizatory są podpisane), zarządzanie jest domyślnie wyłączone, a podsumowanie kompaktowania jest wyłączone domyślnie, ponieważ nie jest używane w praktyce (0 wywołań w 137 zmierzonych przebiegach). Anulowanie jest kooperatywne - aktywne wywołania kończą się przed zatrzymaniem.

Zobacz [Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) dla pomiarów i pełnego dziennika zmian. Aby zaktualizować: `pip install --upgrade chimera-agent`.
