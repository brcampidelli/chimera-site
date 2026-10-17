---
title: "Chimera Agent 0.68.0: polityka, umiejętności i zepsuty build desktopowy"
date: 2026-10-17
category: update
summary: "0.68.0 dodaje politykę odmowy na poziomie właściciela, lokalne wykrywanie umiejętności, polecenia promptów projektu i wiele więcej — ale nie instaluj aplikacji desktopowej; używaj v0.67.4 do czasu 0.68.1."
version: "0.68.0"
---

Nagłówek dla 0.68.0 to nie funkcja. To ostrzeżenie: **nie instaluj tego wydania.** Backend aplikacji desktopowej nie uruchamia się, ponieważ zamrożenie PyInstaller pominęło `chimera.cli.commands.apilogs`, które CLI importuje po nazwie. Pakiet PyPI nie jest dotknięty. Jeśli używasz aplikacji desktopowej, pozostań przy v0.67.4 do czasu wydania v0.68.1. Reszta tego wpisu opisuje, co faktycznie się zmieniło dla osób budujących agentów.

## Polityka właściciela przechodzi z blokad per-narzędzie na reguły tylko-odmawiające

Przed tym wydaniem ograniczanie tego, czego agent może dotknąć, oznaczało łączenie zmiennych środowiskowych takich jak `CHIMERA_TOOL_DENYLIST` z regułami per-projekt. Działało to dla pojedynczych narzędzi, ale nie dawało właścicielowi instalacji jednego miejsca, aby powiedzieć „ten dostawca nigdy tu nie działa” lub „ten serwer MCP nigdy się nie łączy”.

0.68.0 dodaje `<CHIMERA_HOME>/policy.json` — lub plik wskazany przez `CHIMERA_POLICY_FILE`. Reguły są tylko-odmawiające i uporządkowane. Możesz odmówić dostawcy, integracji (`mcp:<nazwa>`, `skill:<nazwa>`) lub narzędziu. Odmówiony dostawca znika z list modeli i drabiny poziomów, a jego wywołania są odrzucane. Odmówiony serwer MCP nigdy się nie łączy. Odmówiona umiejętność nigdy nie jest ładowana. Odmówione narzędzie jest odrzucane w rejestrze.

Złota zasada ma znaczenie: późniejsze `allow` cofa wcześniejsze `deny` tylko w tym samym pliku. Nigdy nie otwiera ponownie `CHIMERA_TOOL_DENYLIST`, dolnego progu zasięgu ani blokady jądra. Nieprawidłowy plik polityki zatrzymuje `serve`, `chat`, `assist`, `tui` i `acp` oraz powoduje niepowodzenie `doctor`. Aplikacja desktopowa uruchamia się, ale odmawia każdemu narzędziu, dopóki plik nie zostanie naprawiony. Narzędzia zapisu agenta nie mogą zapisać pliku polityki.

To inny model niż reguły per-projekt. Jest na poziomie właściciela, obejmuje całą instalację i nie można go obejść sprytnym promptem ani plikiem projektu. Dla każdego, kto uruchamia współdzieloną maszynę lub flotę agentów, to jest zmiana, która ma znaczenie.

## Umiejętności, polecenia promptów i ograniczone pytania

Lokalne umiejętności agenta są teraz wykrywane jako możliwe do przejrzenia pakiety. Umiejętności znalezione w drzewach `.claude/skills` i `.agents/skills` w obszarze roboczym i użytkownika są importowane przez ścieżkę ograniczonego przesyłania. Pozostają oczekujące i skażone do czasu zatwierdzenia, a wracają do stanu oczekującego, gdy zmieni się ich manifest. API raportuje zwycięskie źródło i kolizje. Oznacza to, że umiejętność nie jest po cichu zaufana tylko dlatego, że znajduje się w folderze.

Projektowe i globalne polecenia promptów Markdown działają w ten sam sposób. Czat terminalowy i TUI wykrywają szablony z przestrzeniami nazw w `.chimera/commands/` i `<CHIMERA_HOME>/commands/`. Szablony rozwijają `$ARGUMENTS` i `$1` do zwykłego tekstu wiadomości. Zawartość szablonu nigdy nie jest wykonywana. Daje to projektom sposób na dostarczanie powtarzalnych promptów bez nadawania szablonowi żadnej mocy wykonawczej.

Agent Code może teraz zadać użytkownikowi ograniczone pytanie. `ask_user` wstrzymuje obsługiwaną turę Code w oczekiwaniu na odpowiedź opcją lub dowolnym tekstem, zwraca jawny wynik braku odpowiedzi po przekroczeniu limitu czasu i pozostaje odrębnym rodzajem tylko-danych, który nie może zatwierdzić zarządzanej akcji. Tury terminalowe, botowe i bez nadzoru nie rejestrują go. To zamyka lukę: wcześniej tura Code, która potrzebowała decyzji użytkownika, nie miała ustrukturyzowanego sposobu, aby się zatrzymać i zapytać.

## Co robić teraz

Jeśli używasz aplikacji desktopowej, nie aktualizuj. Pozostań przy v0.67.4. Jeśli używasz pakietu PyPI, możesz zainstalować 0.68.0 i zacząć od pliku polityki: utwórz `<CHIMERA_HOME>/policy.json`, zapisz swoje reguły odmowy i uruchom `chimera policy show`, aby zobaczyć obowiązujące reguły. Pełne informacje o wydaniu znajdują się w [Chimera Agent v0.68.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.68.0).
