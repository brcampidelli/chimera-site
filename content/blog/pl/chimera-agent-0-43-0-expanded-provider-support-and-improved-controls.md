---
title: "Chimera Agent 0.43.0: Rozszerzone wsparcie dla dostawców i ulepszone kontrolki"
date: 2026-08-16
category: update
summary: "Chimera Agent 0.43.0 wprowadza szersze wsparcie dla dostawców poprzez LiteLLM, nowe kontrolki interfejsu dla wcześniej ukrytych ustawień oraz poprawki dotyczące załączania dokumentów i trwałości motywów."
version: "0.43.0"
---

## Szersze wsparcie dla dostawców dzięki LiteLLM

Chimera Agent teraz w pełni integruje się z LiteLLM, umożliwiając użytkownikom łączenie się z dowolnym dostawcą obsługiwanym przez LiteLLM. Wcześniej rozpoznawanych było tylko pięciu dostawców, co uniemożliwiało użytkownikom z kluczami od dostawców takich jak Groq czy Mistral dalsze działanie. Aktualizacja zapewnia, że każdy `<PROVIDER>_API_KEY` jest akceptowany, z listą wykluczeń, która eliminuje dostawców niezwiązanych z modelami, takich jak ElevenLabs czy Stability. Dodatkowo, `doctor` teraz wskazuje nierozpoznane nazwy dostawców, pomagając użytkownikom uniknąć literówek, które mogłyby imitować prawidłowych dostawców.

## Ulepszone kontrolki interfejsu

Trzy ustawienia, które wcześniej były dostępne tylko poprzez pliki `.env`, są teraz dostępne w interfejsie: model embed, podstawowy URL Ollama oraz pulki kluczy. Ustawienie modelu embed jest teraz bezpośrednio powiązane z przełącznikiem pamięci semantycznej, zapewniając, że użytkownicy mogą je skonfigurować bez cichych błędów. Pulki kluczy są zarządzane poprzez operacje (dodaj/usuń) zamiast bezpośredniej edycji, utrzymując bezpieczeństwo poprzez unikanie wyświetlania wrażliwych informacji.

## Poprawki i ulepszenia

Załączanie dokumentów i dyktowanie wiadomości teraz działają poprawnie, rozwiązując błąd 422 spowodowany nieprawidłowymi nagłówkami Content-Type. Aplikacja również zachowuje Twój motyw, obszar roboczy, listę projektów i język pomiędzy uruchomieniami, naprawiając problem, w którym te ustawienia były tracone z powodu zmian portów.

Aby zapoznać się z tymi aktualizacjami, sprawdź [notatki do wydania][Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0).
