---
title: "Chimera Agent 0.43.0: LiteLLM Gate Otwarte, Rejestr Widoczny i Ważne Poprawki"
date: 2026-08-16
category: update
summary: "Chimera 0.43.0 usuwa arbitralne ograniczenia dostawców, udostępnia ukryte ustawienia oraz naprawia przesyłanie dokumentów i trwałość sesji."
version: "0.43.0"
---

## LiteLLM Gate Teraz Akceptuje Klucze Od Dowolnego Dostawcy

Wcześniej Chimera rozpoznawała tylko pięciu dostawców LiteLLM, odrzucając ważne klucze od usług takich jak Groq czy Mistral z mylącym błędem "Brak skonfigurowanego klucza dostawcy". Teraz brama akceptuje dowolny `<PROVIDER>_API_KEY`, z dwoma zabezpieczeniami:

1. Czarna lista zapobiega błędnemu identyfikowaniu dostawców niebędących źródłami modeli (np. ElevenLabs czy Stability AI)
2. `doctor` teraz sprawdza nazwy dostawców względem enuma LiteLLM, wychwytując literówki, które wcześniej kończyły się cichym błędem

Zmiana ta rozwiązuje głębszy problem: klucze umieszczane w `.env` były cicho ignorowane z powodu ustawienia Pydantic `extra="ignore"`. Ponieważ `chimera init` tworzy pliki `.env`, a dokumentacja kieruje tam użytkowników, powodowało to uporczywe problemy z konfiguracją.

## Wcześniej Ukryte Funkcje Teraz Dostępne

Trzy istotne funkcje istniały w kodzie, ale brakowało dla nich interfejsu użytkownika:

1. **Rejestr Agentów**: Pole tekstowe na tablicy zgadywało ID rejestru, które nigdy nie były wyświetlane. Teraz dostępne przez trzecią zakładkę Automatyzacji, pokazuje istniejących agentów, ale nadal pozwala na przypisywanie zadań do nieistniejących ID (które trafiają do backlogu).

2. **Wybór Modelu Embed**: Wcześniej ukryty, teraz pojawia się bezpośrednio pod przełącznikiem pamięci semantycznej, na który wpływa. Błędy degradują do wyszukiwania leksykalnego cicho, więc widoczna konfiguracja jest kluczowa.

3. **Pule Kluczy**: Rotowały się round-robin z okresami cooldownu, ale nie miały interfejsu. Teraz zarządzane są przez operacje (dodaj/usuń), zamiast eksponować wartości sekretów.

## Krytyczne Poprawki Dla Podstawowych Funkcji

Dwie funkcje były dostarczane w aplikacji w stanie nie działającym:

- **Przesyłanie Plików i Dykcja Wiadomości**: Obie kończyły się błędami 422, ponieważ `authHeaders()` wymuszał `application/json` Content-Type, uniemożliwiając poprawne granice formularzy multipart. Testy tego nie wychwyciły, ponieważ mockowały całą warstwę API.

- **Trwałość Sesji**: Aplikacja traciła ustawienia motywu, przestrzeni roboczej i języka przy uruchomieniu z powodu losowego przypisywania portów, co zmieniało origin `localStorage`. Teraz porty są zapamiętywane i ponownie używane.

Kreator pierwszego uruchomienia lepiej radzi sobie z wyborem modelu, pokazując (ale nie automatycznie stosując) kompatybilne modele dla twojego dostawcy, aby zapobiec natychmiastowym błędom 401.

Zaktualizuj przez `pip install --upgrade chimera-agent` lub zobacz [Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0) po pełne szczegóły.
