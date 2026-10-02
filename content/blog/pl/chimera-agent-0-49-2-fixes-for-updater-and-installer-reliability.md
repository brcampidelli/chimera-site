---
title: "Chimera Agent 0.49.2: Naprawy niezawodności aktualizatora i instalatora"
date: 2026-10-02
category: update
summary: "Ta wersja zapewnia okresowe sprawdzanie nowych wersji przez aktualizator oraz naprawia problem instalatora powodujący błędne raportowanie wersji."
version: "0.49.2"
---

## Aktualizator Działa Teraz Prawidłowo

Wcześniej aktualizator sprawdzał nowe wersje tylko raz — przy uruchomieniu. To był problem dla Chimera Agent, który często działa przez długi czas. Gdy nowa wersja pojawiła się podczas pracy aplikacji, użytkownicy nie wiedzieli o niej, dopóki nie sprawdzili ręcznie lub nie zrestartowali programu. To prowadziło do sytuacji, gdzie aktualizacje były całkowicie pomijane, zmuszając użytkowników do pobierania instalatorów bezpośrednio ze strony.

Teraz aktualizator sprawdza co sześć godzin podczas działania aplikacji. Ta zmiana zapewnia natychmiastowe powiadomienia o nowych wersjach bez konieczności ręcznej interwencji. Aby uniknąć niepotrzebnego nagabywania, odrzucenie aktualizacji zapamiętuje tę wersję na bieżącą sesję, ale nowsze wersje nadal wywołają sprawdzenie. Ręczne sprawdzanie przez menu w zasobniku zawsze wyświetla monit, niezależnie od wcześniejszych odrzuceń.

## Naprawa Instalatora Wchodzi w Życie

Wersja 0.49.1 wprowadziła poprawkę dla problemu instalatora, gdzie aktualizacja pozostawiała pliki z poprzedniej wersji. To powodowało błędne raportowanie wersji przez aplikację, tworząc pętlę, gdzie ciągle oferowała aktualizację samej siebie. Jednak ta poprawka dotyczyła tylko nowych instalatorów — nie tych używanych do aktualizacji na miejscu. W 0.49.2 naprawiony instalator jest teraz używany również do aktualizacji, zapewniając prawidłowe raportowanie wersji po uaktualnieniu.

## Inne Ulepszenia z 0.49.1

- Wydania są teraz wstrzymywane przed oznaczeniem jako "najnowsze", dopóki ich artefakty budowania nie będą w pełni gotowe, zapobiegając błędom 404 podczas okna budowania.
- Komunikaty błędów i powiadomienia w zasobniku są zlokalizowane, podczas gdy diagnostyka techniczna pozostaje po angielsku dla ułatwienia wyszukiwania.
- Opcje trybu kosztów w kreatorze pierwszego uruchomienia są teraz poprawnie przetłumaczone.

Aby uzyskać najnowsze poprawki, uruchom aktualizator lub pobierz nową wersję z [informacji o wydaniu][Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2).

[Chimera Agent v0.49.2](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.2): CHANGELOG.md
