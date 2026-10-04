---
title: "Chimera Agent 0.49.3: Poprawki dla zastosowań w rzeczywistych warunkach"
date: 2026-10-04
category: update
summary: "Wersja 0.49.3 rozwiązuje krytyczne problemy wykryte podczas rzeczywistego użytkowania, poprawiając przejrzystość, niezawodność i efektywność kosztową."
version: "0.49.3"
---

## Bardziej czytelne komunikaty błędów dla operacji MCP

Jednym z najbardziej kosztownych problemów w poprzednich wersjach było odczytywanie danych MCP. Gdy przebieg był zanieczyszczony przez niezaufane treści, komunikat błędu był niejasny, co prowadziło do wielokrotnych prób ponownego wykonania tej samej operacji bez powodzenia. Skutkowało to niepotrzebnymi kosztami i frustracją. Teraz komunikaty błędów są specyficzne dla każdego scenariusza, jasno wskazując, czy ponowna próba może pomóc, oraz sugerując działania alternatywne, takie jak użycie przełącznika pauzy-do-akceptacji lub unikanie niezaufanych treści.

## Ulepszone testowanie serwera MCP

Przycisk Test MCP wcześniej sprawdzał tylko łączność z serwerem, pozostawiając użytkowników w nieświadomości, czy agent może faktycznie korzystać z serwera. Prowadziło to do marnowania czasu i zasobów, gdy przebiegi kończyły się niepowodzeniem z powodu niezaładowanych serwerów. Przycisk Test teraz wyraźnie informuje, czy agent może wykorzystać serwer, dostarczając różnych komunikatów dla różnych przyczyn i wskazując użytkownikom, jak rozwiązać problem.

## Dokładny status weryfikacji

Przebiegi wcześniej raportowały `verified: True` na podstawie migawki w danym momencie, co mogło być mylące, jeśli pliki zmieniły się później. Teraz przebiegi zawierają flagę `delivered_matches_verified`, a lista przebiegów wyświetla oznaczenie, gdy pliki na dysku już nie pasują do zweryfikowanego stanu. Zapewnia to użytkownikom świadomość rozbieżności i możliwość podjęcia odpowiednich działań.

## Poprawione błędy instalacji umiejętności

Błędy instalacji umiejętności były wcześniej przypisywane do godzinnego limitu GitHub dla pobrań anonimowych, nawet gdy limit nie był problemem. Komunikaty błędów teraz poprawnie identyfikują hosta, który odrzucił żądanie, oraz zapewniają, że token dociera do obu hostów. Dodatkowo, błędy 429 są ponawiane z czasem oczekiwania określonym przez serwer, redukując niepotrzebne próby.

## Precyzyjne komunikaty o odmowie zapisu plików

Zapisywanie plików było czasem odrzucane z mylącymi komunikatami, które porównywały katalogi zamiast ścieżek. Powodowało to, że agent wyczerpywał swój budżet na ponowne próby tej samej operacji. Komunikaty o odmowie teraz dokładnie opisują porównanie ścieżek i wyjaśniają wzorzec względnych globów obszaru roboczego, zapobiegając zamieszaniu i marnowaniu prób.

## Zaktualizowane domyślne modele

Domyślne modele były przestarzałe, niektóre o generację w tyle, a inne zagrożone wycofaniem. Domyślne ustawienia zostały zaktualizowane do nowszych i stabilniejszych modeli, zapewniając lepszą wydajność i niezawodność. Dodatkowo, `.env.example` nie ustawia już domyślnych wartości znacząco droższych ani nie zawiera wycofanych modeli.

Te zmiany są oparte na rzeczywistym użytkowaniu i mają na celu poprawę doświadczenia użytkownika poprzez rozwiązanie częstych problemów. Pełne szczegóły można znaleźć w [Chimera Agent v0.49.3](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.3).
