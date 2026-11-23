---
title: "Chimera Agent 0.92.0: jaśniejsze koszty, konfigurowalne planowanie"
date: 2026-11-23
category: update
summary: "Rachunki kosztów korzystają teraz z publicznego cennika dla uruchomień poza serve, planer można wyłączyć dla pojedynczej ścieżki lub uruchomienia, a wyszukiwarka ustawień Desktop znajduje routing modeli."
version: "0.92.0"
---

## Rachunki kosztów zgodne z modelem, który faktycznie wywołałeś

Poprzednie wydania potrafiły zostawić cię z pytaniem, ile naprawdę kosztowało uruchomienie. Rachunki zależały od kontekstu, który nie zawsze był dostępny, a model niepasujący do wpisu w katalogu mógł otrzymać stawkę nieodzwierciedlającą wywołania, które wykonałeś. Przez to trudno było audytować wydatki albo porównywać uruchomienia.

Wersja 0.92.0 zmienia sposób budowania rachunków dla uruchomień poza `serve`. Te uruchomienia korzystają teraz z publicznego indeksu cen OpenRouter. Dokładne slugi modeli dostają własne stawki, zamiast dziedziczyć szerszy lub mniej precyzyjny wpis. Wywołania strict zachowują wycenę przyjętą w momencie dopuszczenia, więc rachunek odzwierciedla cenę zaakceptowaną przy dopuszczeniu wywołania, a nie późniejszą lub inną estymację. Odświeżono też wpis katalogowy `gpt-oss-20b`.

Dla każdego, kto uruchamia agenty poza środowiskiem serwowanym, usuwa to źródło niejednoznaczności. Możesz spojrzeć na rachunek i wiedzieć, że pochodzi z publicznego cennika, jest powiązany z konkretnym slugiem modelu, a wywołania strict zachowują wycenę, która obowiązywała przy dopuszczeniu. Zmiana nie wpływa na sposób wybierania modeli. Zmienia to, co rachunek raportuje po uruchomieniu.

## Planowanie staje się decyzją na poziomie pojedynczego uruchomienia

Planer był wcześniej zachowaniem globalnym. Jeśli chciałeś, żeby ścieżka, uruchomienie API albo krok solve w workflow pominął planowanie, nie było bezpośredniego przełącznika dla tego kontekstu. Albo akceptowałeś domyślne zachowanie, albo zmieniałeś je szerzej, niż wymagało tego zadanie.

`use_planner` jest teraz konfigurowalny na ścieżkach Kanban, uruchomieniach API i krokach solve w workflow. Planer pozostaje domyślnie włączony. Ten domyślny stan ma znaczenie: istniejące konfiguracje zachowują obecne zachowanie, dopóki jawnie z niego nie zrezygnujesz. Nowe ustawienie daje węższy punkt kontroli w przypadkach, gdy planowanie dodaje opóźnienia lub kroki, których dane uruchomienie nie potrzebuje.

Przydaje się to, gdy ścieżka obsługuje ograniczone zadanie, gdy wywołujący API wie, że dane wejściowe są już przygotowane do bezpośredniego wykonania, albo gdy krok solve powinien działać bez dodatkowego przebiegu planowania. Możesz to teraz wyrazić na poziomie ścieżki, uruchomienia lub kroku, zamiast zmieniać cały system.

## Ustawienia Desktop, które faktycznie da się znaleźć

Wyszukiwarka ustawień nie pokazywała tabeli routingu modeli według ról. Jeśli nie wiedziałeś już, gdzie ona się znajduje, mogłeś spędzić czas na przeklikiwaniu interfejsu, żeby ją znaleźć. To naprawione: wyszukiwarka znajduje teraz tabelę routingu.

Dołączono dwie mniejsze poprawki Desktop. Teksty routingu i rachunków wyświetlają się teraz poprawnie w brazylijskim portugalskim. Nowe konwersacje i tury z samą odpowiedzią pokazują też wyraźniejszy status, więc interfejs mówi ci, co się dzieje, zamiast zostawiać stan niejednoznacznym.

## Co zrobić teraz

Zaktualizuj do 0.92.0 i sprawdź trzy obszary, które się zmieniły. Jeśli uruchamiasz agentów poza `serve`, przejrzyj rachunek i potwierdź, że odzwierciedla slug modelu i wycenę dopuszczenia, których oczekujesz. Jeśli masz ścieżki lub uruchomienia API, które nie potrzebują planowania, ustaw `use_planner` na false na tym poziomie, a wszędzie indziej zostaw domyślne włączone. Jeśli używasz Desktop, wyszukaj w Ustawieniach tabelę routingu modeli według ról i zweryfikuj tekst statusu w nowej konwersacji.

Pełne informacje o wydaniu: [Chimera Agent v0.92.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.92.0).
