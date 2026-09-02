---
title: "Chimera Agent 0.48.0: Lepsze zabezpieczenia i domyślne ustawienia"
date: 2026-09-02
category: update
summary: "Chimera Agent 0.48.0 wprowadza znaczące poprawki w zakresie bezpieczeństwa oraz zmiany domyślnych ustawień, skupiając się na izolacji sandboxa i bardziej opłacalnym wyborze modeli."
version: "0.48.0"
---

## Ulepszona izolacja sandboxa

Domyślne ustawienie sandboxa zostało zaktualizowane w celu zwiększenia bezpieczeństwa. Wcześniej sandbox `local` nie był izolowany, polegając na jądrach zarządzania i monitach potwierdzających, aby chronić Twoją maszynę. To podejście miało luki, szczególnie gdy użytkownicy omijali monity lub gdy wstrzykiwano instrukcje. Teraz domyślnie używane jest `auto`, które wykorzystuje **Seatbelt** na macOS z profilem `(deny default)` oraz **bubblewrap** na Linuxie z rygorystycznymi parametrami izolacji. To zapewnia izolację sieciową i ogranicza zapisy do katalogu roboczego i tymczasowego, znacząco redukując potencjalne ryzyka.

## Uwagi dotyczące Windows i jądra Linux

W przypadku Windows aktualizacja jasno stwierdza, że nie zapewniono mechanizmu sandboxa. Istniejące ograniczone tokeny i filtry sieciowe nie są przybliżane, ponieważ brak granicy jest mniej niebezpieczny niż błędnie przekonanie o jej istnieniu. Podobnie jądra Linuxa, które odmawiają nieuprzywilejowanych przestrzeni nazw użytkownika, zgłoszą sandbox jako *niedostępny*, zapewniając przejrzystość co do ograniczeń bezpieczeństwa.

## Ekonomiczny domyślny model

Domyślny model został zmieniony z GPT-5.5 na DeepSeek V3.1. Ta zmiana odpowiada na wysokie koszty związane z poprzednim domyślnym modelem, który był najdroższy w katalogu. DeepSeek V3.1 oferuje bardziej ekonomiczną opcję w cenie $0.25/$0.95 za 1M tokenów w porównaniu do $5.00/$30.00 za GPT-5.5. Zmienna środowiskowa `CHIMERA_DEFAULT_MODEL` nadal ma pierwszeństwo, a narzędzie do wyboru modelu pozwala na zmiany w trakcie konwersacji.

## Poprawki wynikające z audytu

Szczegółowy audyt zidentyfikował wiele rekomendacji, z czego 56% pracy skupiało się na okablowaniu, a nie na funkcjach produktu. Ta wersja rozwiązuje wiele z tych problemów, zapewniając poprawne działanie kodu i dokładne logowanie. Wśród istotnych poprawek znajdują się poprawne obsługiwanie odrzuconych narzędzi, usuwanie nieudanych zadań cron oraz zabezpieczanie ciągów znaków zawierających dane uwierzytelniające. Każda poprawka została rygorystycznie przetestowana poprzez cofnięcie zmian i upewnienie się, że testy wykryły defekty.

## Nowe funkcje i ulepszenia

Nowe funkcje obejmują przechowywanie danych uwierzytelniających w keychain systemu operacyjnego (`chimera secrets`), mechanizm zatwierdzania decyzji (`chimera approve`) oraz tury kodowania, które przetrwają zerwane połączenia. Ponadto polecenia, które są udowodnione jako tylko do odczytu, nie wymagają już potwierdzenia, a serwery MCP mogą być otwierane zamiast przekazywane. Trzy nowe bramy w CI dodatkowo zwiększają niezawodność systemu.

Szczegółowy opis wszystkich zmian znajdziesz w [CHANGELOG.md][Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0).

[Chimera Agent v0.48.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.48.0): CHANGELOG.md
