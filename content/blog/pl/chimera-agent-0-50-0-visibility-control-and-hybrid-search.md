---
title: "Chimera Agent 0.50.0: Widoczność, Kontrola i Hybrydowe Wyszukiwanie"
date: 2026-10-08
category: update
summary: "Ta wersja naprawia ciche zachowania, dodaje mechanizmy kontroli zarządczej i poprawia wyszukiwanie dzięki hybrydowemu podejściu."
version: "0.50.0"
---

## Zadania Są Teraz Widoczne

Agenty wcześniej przechowywały wewnętrzną listę zadań, która była niedostępna podczas wykonywania. `RunState.tasks` istniało, ale nigdy nie było wypełniane. Teraz zadania są wyświetlane w czasie rzeczywistym z markerami postępu, a lista jest zachowywana nawet podczas kompaktowania kontekstu. Oznacza to, że długo działające agenty nie tracą już orientacji w swoich planach w trakcie wykonywania.

## Prośby o Zatwierdzenie Podążają za Tobą

Przepływy pracy związane z zatwierdzaniem wcześniej zakładały, że konsola jest zawsze obsługiwana. Trzy nieobsługiwane powierzchnie—w tym zadania cron—mogły prosić o interakcję człowieka, ale nie miały sposobu na dostarczenie pytania, jeśli nikt nie był obecny. Ustawienie `CHIMERA_APPROVAL_WEBHOOK` teraz kieruje prośby o zatwierdzenie do określonego kanału. Systemy bez możliwości dostarczania poprawnie zgłaszają `unreachable` zamiast cicho zawieść.

## Zarządzanie Może Być Włączone

Dziennik audytu bezpieczeństwa był wcześniej funkcją pasywną bez mechanizmu aktywacji. `CHIMERA_GOVERNANCE` teraz zapewnia kontrolę do jego włączenia, a ekran Bezpieczeństwa wyraźnie pokazuje jego aktualny stan. Zostało to zaimplementowane, ponieważ posiadanie dziennika audytu, którego nie można było włączyć, nie miało praktycznego zastosowania.

## Hybrydowe Wyszukiwanie Przewyższa Słowa Kluczowe

`chimera find` wcześniej używało albo wyszukiwania słów kluczowych, albo wektorowego, z decyzją podejmowaną po rozpoczęciu działania. Hybrydowe wyszukiwanie—łączące obie metody—teraz przewyższa wyszukiwanie tylko słów kluczowych o 6,25 punktów (p = 1.7e-04) na własnym korpusie projektu. Wyszukiwanie wektorowe samo w sobie wypada gorzej niż słowa kluczowe, dlatego hybrydowe podejście jest teraz domyślne. System również oblicza koszty z góry.

## Naprawy Kompatybilności Modeli

Agenty zakładały, że niekatalogowane modele mają okno 128 000 tokenów, co powodowało awarie dla 31 modeli w indeksie, które faktycznie obsługują 64 000 lub mniej tokenów. System teraz sprawdza żywy indeks dla nieznanych modeli. Pięć wpisów katalogowych zostało również poprawionych pod kątem nieprawidłowych rozmiarów okien, a jeden błąd cenowy (2,2x za wysoko) został naprawiony.

## Widoczność Backendu w Śladach

Ślady teraz rejestrują, który backend obsłużył każdy krok, a nie tylko który model odpowiedział. To ma znaczenie, ponieważ identyfikatory modeli na OpenRouter mogą reprezentować pule o skrajnie różnych możliwościach—jedna pula obejmuje punkty końcowe z 5-krotną różnicą w oknach kontekstu i 8,8-krotną różnicą cenową. Poprzednie twierdzenia dotyczące wydajności konkretnych modeli faktycznie mierzyły pule; dziennik zmian wycofuje dotknięte benchmarki.

### Co Robić Dalej

Zaktualizuj do wersji 0.50.0 i przejrzyj [pełny dziennik zmian][Chimera Agent v0.50.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.50.0) w celu uzyskania szczegółów implementacyjnych. Włącz zarządzanie, jeśli jest potrzebne, i przetestuj hybrydowe wyszukiwanie za pomocą `chimera find`.
