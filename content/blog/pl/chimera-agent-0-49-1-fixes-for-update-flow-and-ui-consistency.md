---
title: "Chimera Agent 0.49.1: Poprawki w przepływie aktualizacji i spójności interfejsu"
date: 2026-09-12
category: update
summary: "Wersja 0.49.1 naprawia krytyczne problemy z aktualizacjami, poprawia spójność interfejsu oraz uzupełnia brakujące tłumaczenia w kreatorze pierwszego uruchomienia."
version: "0.49.1"
---

## Poprawki w przepływie aktualizacji

Jednym z najważniejszych problemów rozwiązanych w Chimera Agent 0.49.1 jest mechanizm aktualizacji. Wcześniej, po aktualizacji w miejscu, proces backendowy błędnie zgłaszał starą wersję z powodu pozostającego pliku `dist-info` z poprzedniej instalacji. Dzieje się tak, ponieważ pakiet PyInstaller zachowywał zarówno stare, jak i nowe pliki wersji, przez co `importlib.metadata` zwracało pierwszą napotkaną wersję. W efekcie aplikacja uporczywie oferowała aktualizację do wersji, która już była uruchomiona, co prowadziło do zamieszania i niepotrzebnych monitów o aktualizację.

Aby rozwiązać ten problem, instalator teraz usuwa stary pakiet przed zapisaniem nowego, zapewniając, że tylko prawidłowa wersja jest rozpoznawana. Należy jednak pamiętać, że ta poprawka dotyczy instalatora dostarczanego z wersją 0.49.1, a nie tego używanego do jej instalacji. Użytkownicy aktualizujący z wersji 0.49.0 mogą nadal napotkać ten problem do następnej aktualizacji. Ręczna naprawa polega na usunięciu zaległego pliku `dist-info` i ponownym uruchomieniu aplikacji.

Kolejny problem związany z aktualizacjami dotyczył funkcji automatycznej aktualizacji. Przez około dwadzieścia pięć minut po każdym wydaniu aktualizator zawodził, ponieważ endpoint `releases/latest/download/latest.json` zwracał błąd 404, gdy budowanie wciąż trwało. Problem ten pozostawał niezauważony, ponieważ aktualizator po cichu ignorował błędy. Teraz wydania są wstrzymywane z `--latest=false` do czasu zakończenia wszystkich budowań, co zapewnia, że endpoint zawsze wskazuje na prawidłowe wydanie.

## Spójność interfejsu i poprawki w tłumaczeniach

Panel 'dostępna nowa wersja' wcześniej zadawał pytanie, na które nie mógł odpowiedzieć. Nagłówek panelu brzmiał 'Dostępna jest nowa wersja. Zaktualizować?', ale oferował tylko przyciski do przejrzenia wydania lub zamknięcia panelu. Ponieważ panel znajduje się w webview bez IPC do aktualizatora w Rust, nie mógł zainicjować aktualizacji. Teraz panel po prostu informuje o dostępności nowej wersji i kieruje użytkowników do opcji 'Sprawdź dostępność aktualizacji' w zasobniku systemowym.

Dodatkowo, kreator pierwszego uruchomienia miał lukę w tłumaczeniu w rozwijanym menu trybu kosztowego, które wyświetlało surowe wartości (`auto / cheap / balanced / premium`) zamiast przetłumaczonych etykiet. Ta niespójność została poprawiona, dostosowując kreator do ekranu Ustawień, który już używał przetłumaczonych etykiet. Warto zauważyć, że wartości pozostają w języku angielskim, aby pasowały do danych oczekiwanych przez serwer.

Pełne szczegóły znajdziesz w [notatkach wydania][Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1).

[Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1): CHANGELOG.md
