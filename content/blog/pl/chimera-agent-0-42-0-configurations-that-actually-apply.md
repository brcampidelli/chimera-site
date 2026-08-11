---
title: "Chimera Agent 0.42.0: Konfiguracje, które faktycznie działają"
date: 2026-08-11
category: update
summary: "Naprawiono siedem ustawień, które zapisywały się bez zmiany zachowania, ujednolicono kontrolę bezpieczeństwa i umożliwiono konfigurację agentów zamiast akceptowania domyślnych wartości."
version: "0.42.0"
---

## Ustawienia, które teraz działają

Siedem konfiguracji, które wcześniej zapisywały się bez efektu — domyślny model, buforowanie odpowiedzi, niestandardowy endpoint, timeout, łańcuch fallback i buforowanie promptów. `LLMGateway` przechwytywał ustawienia przy konstrukcji, ale `chimera app` budował go raz na proces. Sześć z nich teraz aktualizuje się na żywo. Trzy (kaskada, trwałość czatu, pamięć czatu) dotyczą **następnej konwersacji** i to zaznaczają. Dwie wymagające restartu (demon scheduler i autoload MCP) deklarują to. Etykiety są teraz pobierane z serwera, co zapobiega cichej niespójności.

## Ujednolicone kontrole bezpieczeństwa

`CHIMERA_TOOL_ALLOWLIST` i `CHIMERA_TOOL_DENYLIST` wcześniej dotyczyły tylko `chimera run` i `chimera solve`. Inne powierzchnie (app, API, zadania wsadowe, boty komunikacyjne) całkowicie je ignorowały. Teraz działają wszędzie. Blokady **sumują się** — ograniczenia wdrożenia, żądania i postawy muszą wszystkie zezwalać na narzędzie. Uprawnienia **przecinają się**, uniemożliwiając żądaniom wykroczenie poza zakres nadawcy. Naprawiono `explore_repository` omijający filtry z powodu późnej rejestracji.

## Tożsamość i instrukcje agenta

Nazwa agenta, język i stałe instrukcje wcześniej nie działały. `profile.json` nie był czytany przez API, fakty o personie stosowano tylko gdy były istotne dla tury, a bezwarunkowa preambuła była zarezerwowana dla kompatybilności REPL/OpenAI. Teraz dotyczą edycji kodu, autonomicznego wykonania i komunikacji. Instrukcje **dołączają** — domyślne prompty zachowują zabezpieczenia, a niestandardowe bloki ostrzegają, gdy nie nadają uprawnień.

## Postawa wdrożenia jako podłoga

Zakres wykonania, wymagania zatwierdzenia i uprawnienia poleceń hosta były rozproszone między usunięte komponenty, zakodowane na stałe pary i zmienną środowiskową odrzucaną przez `PATCH /api/config`. Teraz scalone w jedną kartę. Postawa wdrożenia to **podłoga**, nie domyślna wartość — klienci nie mogą cicho nadpisać ograniczeń na maszynach, którymi nie zarządzają. Wykonanie na hoście wymaga wyraźnego potwierdzenia.

## Co robić dalej

Wykonaj `chimera app update` i sprawdź [Chimera Agent v0.42.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.42.0) dla szczegółów o agentach na poziomie projektu, poprawkach audytu bezpieczeństwa i aktywacji kart umiejętności.
