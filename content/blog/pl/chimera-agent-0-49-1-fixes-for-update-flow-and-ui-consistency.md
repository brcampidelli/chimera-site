---
title: "Chimera Agent 0.49.1: Poprawki w procesie aktualizacji i spójności interfejsu"
date: 2026-09-15
category: update
summary: "Chimera Agent 0.49.1 rozwiązuje kluczowe problemy związane z procesem aktualizacji, spójnością interfejsu oraz lukami w tłumaczeniach, zapewniając płynniejsze działanie i bardziej przejrzyste interakcje użytkownika."
version: "0.49.1"
---

## Ulepszenia procesu aktualizacji

Mechanizm aktualizacji w Chimera Agent 0.49.0 miał poważną wadę: proces backendowy błędnie raportował wersję z powodu pozostałych plików z poprzednich instalacji. Konkretnie, pakiet PyInstaller zachowywał katalogi `dist-info` zarówno ze starej, jak i nowej wersji, co powodowało, że `importlib.metadata` zwracało niewłaściwą wersję. Skutkowało to tym, że aplikacja ciągle oferowała aktualizację do wersji, która już była zainstalowana. Instalator teraz usuwa stary pakiet przed zapisaniem nowego, zapewniając, że raportowana jest tylko prawidłowa wersja. Należy zauważyć, że ta poprawka dotyczy instalatora dostarczanego z wersją 0.49.1, a nie tego, który ją instaluje. Jeśli aktualizujesz z wersji 0.49.0, możesz nadal widzieć nieaktualny `dist-info` do następnej aktualizacji.

## Niezawodność automatycznej aktualizacji

Kolejny problem został wykryty w mechanizmie automatycznej aktualizacji. Przez około dwadzieścia pięć minut po każdym wydaniu aktualizator zawodził, ponieważ endpoint `latest.json` zwracał błąd 404. Dzieje się tak, ponieważ wydanie było oznaczone jako najnowsze, zanim wszystkie kompilacje na platformy zostały ukończone. Teraz wydania są wstrzymywane z opcją `--latest=false` i promowane dopiero po dołączeniu manifestu. To zapewnia, że endpoint zawsze wskazuje na prawidłowe wydanie, poprawiając niezawodność i zapobiegając oferowaniu uszkodzonych wydań.

## Spójność i przejrzystość interfejsu

Panel 'dostępna nowa wersja' wcześniej zadawał pytanie, na które nie mógł odpowiedzieć: *"Dostępna jest nowa wersja. Zaktualizować?"* Jednak panel oferował tylko opcje obejrzenia wydania lub odrzucenia powiadomienia, bez faktycznej funkcjonalności aktualizacji. Panel teraz po prostu informuje, że dostępna jest nowa wersja i kieruje użytkowników do opcji **Sprawdź dostępność aktualizacji** w zasobniku. Ta zmiana eliminuje zamieszanie i dostosowuje interfejs do jego rzeczywistych możliwości.

## Poprawki w tłumaczeniach

Kreator pierwszego uruchomienia miał drobny, ale zauważalny problem z tłumaczeniem: rozwijana lista trybów kosztowych wyświetlała surowe wartości (`auto / cheap / balanced / premium`) zamiast ich przetłumaczonych odpowiedników. Etykiety istniały i były przetłumaczone, ale nie były używane w tym kontekście. Ta niespójność została rozwiązana, dzięki czemu lista teraz wyświetla prawidłowe przetłumaczone etykiety, zgodne z ekranem Ustawień.

Pełne szczegóły znajdziesz w [informacjach o wydaniu][Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1). Aby zaktualizować, uruchom `chimera-desktop --update` lub pobierz najnowszą wersję z oficjalnej strony.
