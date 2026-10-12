---
title: "Chimera Agent 0.65.0: Parowanie, terminy i gwarancje sandboxa"
date: 2026-10-12
category: update
summary: "Boty teraz bezpiecznie parują się przy pierwszym uruchomieniu, nie ma już awaryjnego przełączania na hosta, tury mają terminy, a modele Ollama czytają cały prompt."
version: "0.65.0"
---

## Pierwsze uruchomienie paruje bota, nie pokój

Przed tą wersją aplikacja desktopowa pytała „czy to nowa instalacja?” na karcie Messaging, gdy folder danych był już zapełniony. Oznaczało to, że każdy bot uruchamiany przez aplikację działał otwarcie—odpowiadając każdemu, kto do niego dotarł, używając narzędzi i środków właściciela. Kod parowania, jeśli został wygenerowany, trafiał do konsoli, której nikt nie czyta.

Aplikacja teraz rejestruje, które boty były już skonfigurowane przy starcie. Te boty odpowiadają jak wcześniej. Bot skonfigurowany po tym momencie zaczyna od parowania, a jego kod pojawia się na karcie Messaging, gdzie ktoś faktycznie patrzy. API to odzwierciedla: `GET /api/messaging` raportuje stany `pairing_code`, `pairing` i `open`. Mostek desktopowy widzi `pairing`, ale nigdy sam kod, więc automatyzacja nie może ominąć kroku z udziałem człowieka.

## Sandbox, który nie może działać, odmawia działania

Ustawienie `CHIMERA_SANDBOX=docker` bez działającego demona Dockera powodowało wcześniej awaryjne przełączenie na hosta z pojedynczą linią w logu. Polecenie, które powinno być izolowane, wykonywało się bezpośrednio na maszynie. Ten fallback zniknął. Teraz `run_shell`, `execute_code` i kroki workflow odmawiają, zanim jeszcze zadadzą pytanie o wykonanie na hoście. Komunikat odmowy stwierdza, co się stało, że nic nie zostało uruchomione, i podaje dwa wyjścia: uruchom Dockera lub ustaw `CHIMERA_SANDBOX=local`. Weryfikator wstrzymuje się zamiast cofać pracę, ponieważ demon nie działał.

Wywołujący, który jawnie przekazuje `fallback=`, zachowuje stare zachowanie. Wszyscy inni dostają twarde zatrzymanie. Ta sama granica dotyczy przychodzących mediów: pobieranie z Telegrama i WhatsApp zatrzymuje się teraz na limicie 20 MB przed pierwszym bajtem, gdy rozmiar jest zadeklarowany, zamiast wczytywać cały plik do pamięci i mierzyć po fakcie.

## Terminy docierają do pasma zarządzania

Decyzja może teraz mieć termin, a jego przekroczenie przesuwa pasmo REVIEW w stronę kontroli. `DecisionSpec.deadline_s` deklaruje termin dla każdej decyzji; `Decider.decide(..., deadline_s=)` nadpisuje go dla pojedynczego wywołania. Odpowiedź nieudzielona na czas zatrzymuje się z `deadline_missed` na potwierdzeniu i w logu decyzji, więc przekroczenia stają się policzalne.

Przy ustawionym `CHIMERA_GOVERNANCE_BAND_DEADLINE_S` przekroczenie tworzy kartę REVIEW z `band: deadline`—nigdy ALLOW. Spóźniona odpowiedź nigdy nie jest buforowana ani stosowana po fakcie. Domyślnie jest to wyłączone, a nowy panel Ustawienia › Ogólne › Zarządzanie i audyt udostępnia tę opcję wraz z pięcioma innymi opcjonalnymi kontrolkami, które wcześniej były dostępne tylko przez `.env` lub można je było zapisać, ale nie odczytać. `GET /api/config` raportuje je w bloku `governance_audit`. Wyczyszczenie terminu nie pozostawia już aplikacji, która nie może wystartować: pusta wartość jest teraz odczytywana jako brak terminu.

## Modele Ollama czytają cały prompt

Wywołania modeli `ollama_chat/` lub `ollama/` nigdy nie określały okna kontekstu, więc Ollama serwował domyślne ustawienie maszyny—4 096 tokenów w przypadku, który to ujawnił. Każdy dłuższy prompt był po cichu przycinany do około połowy tego rozmiaru. Pierwsze żądanie uruchomienia `chimera solve`, około 20 500 znaków, było odczytywane jako 2 050 tokenów, a model nigdy nie widział zadania.

Każda ścieżka bramy wysyła teraz `num_ctx` tylko do tras Ollama, pobierany z `CHIMERA_OLLAMA_NUM_CTX` (domyślnie 32 768; ustaw `0`, aby zachować domyślne ustawienie serwera). Budżet kompaktowania modelu Ollama jest określany na podstawie tego okna zamiast fallbacku 128 000 tokenów. Odpowiedź, której liczba tokenów promptu wskazuje na przycięcie, loguje ostrzeżenie `PROMPT TRUNCATED` zamiast przechodzić w ciszy. Dostawcy hostowani pozostają bez zmian.

## Co zrobić teraz

Zaktualizuj przez `pip install chimera-agent==0.65.0`. Jeśli używasz aplikacji desktopowej, uruchom ją ponownie i sprawdź kartę Messaging pod kątem botów wymagających parowania. Jeśli używasz `CHIMERA_SANDBOX=docker`, zweryfikuj, czy demon działa, lub przełącz na `local`. Jeśli wywołujesz modele Ollama, ustaw `CHIMERA_OLLAMA_NUM_CTX` zgodnie z oknem swojego modelu. Pełne informacje o wydaniu znajdują się w [Chimera Agent v0.65.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.65.0).
