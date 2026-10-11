---
title: "Chimera Agent 0.49.3: Poprawki dla rzeczywistego użytku"
date: 2026-10-05
category: update
summary: "Wersja 0.49.3 rozwiązuje krytyczne problemy wykryte podczas rzeczywistego użytkowania, poprawiając klarowność, niezawodność i efektywność kosztową."
version: "0.49.3"
---

## Problem z zapisywaniem plików MCP: Jasność i koszty

Jedna z najważniejszych poprawek w tej wersji dotyczy kosztownego problemu z zapisywaniem plików MCP. Wcześniej, podczas odczytywania danych przez MCP, proces zatrzymywał się bez zapisywania plików, a komunikat błędu był niejasny. To prowadziło do wielokrotnych prób, z których każda generowała koszty bez postępu. Na przykład cztery uruchomienia tego samego zadania kosztowały **5,11 USD**, nie produkując żadnych plików, podczas gdy to samo zadanie z użyciem wbudowanych narzędzi zakończyło się sukcesem za pierwszym razem za **0,37 USD**.

Komunikat błędu teraz rozróżnia trzy scenariusze: odmowa przez człowieka, odmowa konfiguracji oraz brak osoby zatwierdzającej. Sugeruje również działania naprawcze, takie jak użycie przełącznika oczekiwania na zatwierdzenie lub unikanie niezaufanej treści w procesie. Ta zmiana zapobiega niepotrzebnym ponownym próbom i redukuje koszty.

## Przycisk testowania MCP: Lepsze informacje zwrotne

Kolejną istotną poprawą jest przycisk testowania MCP. Wcześniej potwierdzał tylko łączność z serwerem, wprowadzając użytkowników w błąd, że agent może korzystać z serwera. W rzeczywistości agent nie miał dostępu do serwera, ponieważ ładowanie serwerów MCP przy starcie było domyślnie wyłączone. To prowadziło do marnowania czasu i zasobów, jak w przypadku, gdzie wykonano **dwadzieścia dwa wywołania narzędzi w ciągu dziewiętnastu minut** bez użycia serwera.

Przycisk testowania teraz informuje, czy agent może korzystać z serwera, z różnymi komunikatami dla różnych przyczyn. To zapewnia, że użytkownicy rozumieją kroki potrzebne do włączenia korzystania z serwera.

## Status `verified`: Dokładne przedstawienie

Status `verified` wcześniej wskazywał natychmiastową weryfikację, ale nie uwzględniał zmian po chwili weryfikacji. To prowadziło do zamieszania, gdy to samo polecenie wykonane na wynikowym drzewie powodowało **20 błędów na 20 prób**. Status teraz zawiera `delivered_matches_verified`, a lista Runs pokazuje znacznik, gdy pliki na dysku nie zgadzają się ze stanem zweryfikowanym. To zapewnia jaśniejszy obraz wyniku procesu.

## Instalacja skilli: Poprawne komunikaty błędów

Błędy instalacji skilli wcześniej wskazywały niewłaściwy limit, sugerując ponowne próby lub ustawienie `GITHUB_TOKEN`, gdy problem był niepowiązany. Token teraz dociera do obu hostów, a komunikaty błędów dokładnie identyfikują hosta odmawiającego. To zapobiega niepotrzebnym ponownym próbom i zapewnia, że użytkownicy podejmują właściwe działania.

## Zapisywanie plików: Jasne komunikaty odmowy

Komunikaty odmowy zapisywania plików były wcześniej niejasne, zwłaszcza gdy ścieżka absolutna była zadeklarowana jako region zapisu. Komunikat odmowy teraz nazywa ścieżkę porównywaną, wyjaśnia region jako listę globów względnych do obszaru roboczego i wskazuje wzór, który nigdy nie może pasować. To zapobiega powtarzającym się próbom i zgłoszeniom błędów środowiska.

## Domyślne modele: Zaktualizowane i niezawodne

Domyślne modele zostały zaktualizowane, aby odzwierciedlać obecne generacje, zapewniając lepszą wydajność i efektywność kosztową. Domyślny model zmienił się z `deepseek-chat-v3.1` na `deepseek-v4-flash-0731`, znacząco redukując koszty. Model najwyższej klasy został zaktualizowany do `z-ai/glm-5.3`, a modele sędziego fuzji i panelu również zostały zaktualizowane. Test teraz zapewnia, że żaden domyślny model nie jest `-preview`, który dostawcy mogą wycofać bez ostrzeżenia.

Pełne szczegóły można znaleźć w [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
