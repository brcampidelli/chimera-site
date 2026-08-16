---
title: "Chimera Agent 0.44.0: Aplikacja Desktopowa Teraz Edytorem Kodu"
date: 2026-08-16
category: update
summary: "Aplikacja desktopowa Chimera przekształca się z konsoli agenta w pełnoprawny edytor kodu, oferujący diagnostykę, podpowiedzi inline, wyszukiwanie oraz integrację z zewnętrznymi agentami."
version: "0.44.0"
---

## Od Konsoli do Edytora Kodu

Aplikacja desktopowa Chimera Agent przeszła fundamentalną zmianę w wersji 0.44.0. To, co było głównie konsolą do interakcji z agentami, stało się teraz funkcjonalnym środowiskiem do edycji kodu. Ta zmiana odzwierciedla sposób, w jaki użytkownicy faktycznie pracują z agentami AI — nie tylko rozmawiają z nimi, ale współpracują przy kodzie.

W tej wersji pojawia się siedem kluczowych funkcji. Edytor dostępny pod `#/edit` wykorzystuje CodeMirror z właściwymi zakładkami, historią cofania dla poszczególnych plików oraz ostrzeżeniami, gdy agent próbuje zmodyfikować niezapisany plik, nad którym pracujesz. Diagnostyka pochodzi teraz z `ruff server`, co zapewnia, że ostrzeżenia, które widzisz, są zgodne z tym, co zawiodłoby w CI. Edytor oferuje podpowiedzi inline z lokalnego modelu, pokazując szary tekst podglądu, który można zaakceptować za pomocą Tab lub odrzucić Escape.

## Praktyczne Ulepszenia

Wyszukiwanie działa teraz w całym obszarze roboczym, wykorzystując ripgrep tam, gdzie jest dostępny. Możesz sprawdzić wykorzystanie zasobów systemowych (CPU, pamięć, VRAM GPU) oraz przeprowadzić wyszukiwanie w swoim repozytorium z wcześniej zarejestrowanymi benchmarkami. Command runner zachowuje historię dla każdego projektu po przeładowaniu, z właściwym zakończeniem drzewa procesów po zatrzymaniu lub zamknięciu.

Być może najważniejsze jest to, że teraz można przekazywać zadania kodowania zewnętrznym agentom, takim jak Claude Code czy Gemini CLI. Integrują się one przez ACP i przechodzą ten sam proces weryfikacji oraz snapshotu/cofnięcia, co rodzime tury. Aplikacja jasno wskazuje, gdy zewnętrzni agenci działają w innych granicach bezpieczeństwa — mogą odmówić strażników zapisu plików Chimery, choć checkpoint/cofnięcie pozostaje jako siatka bezpieczeństwa.

## Jak Zacząć

Konfiguracja pozostaje prosta. Wystarczy klucz dostawcy, aby rozpocząć, z opcjonalnymi możliwościami jasno wskazanymi. Dla diagnostyki edytora upewnij się, że `ruff` jest zainstalowany. Podpowiedzi inline wymagają Ollama z konkretnym modelem `qwen2.5-coder:1.5b-base` (zwróć uwagę na tag base — modele instruct nie będą działać poprawnie). Zewnętrzni agenci wymagają odpowiednich narzędzi CLI.

Wersja zawiera szczere zastrzeżenia: niepodpisane instalatory wywołają ostrzeżenia bezpieczeństwa, zewnętrzni agenci mają różne granice bezpieczeństwa, a wyszukiwanie nie jest jeszcze zintegrowane z głównym przepływem agenta. Command runner nie jest pełnym terminalem — każde polecenie uruchamia się w nowym procesie, więc stan jak `cd` czy `export` nie będzie się utrzymywał.

Pełne szczegóły, w tym dwa błędy znalezione w nieprzetestowanych scenariuszach, znajdziesz w [CHANGELOG][Chimera Agent v0.44.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.44.0). Aby samemu wypróbować, zaktualizuj swoją instalację Chimera Agent i odkryj nowy edytor pod `#/edit`.
