---
title: "Chimera Agent 0.49.0: Wielojęzyczny dialog aktualizacji i ręczne sprawdzanie aktualizacji"
date: 2026-09-06
category: update
summary: "Chimera Agent 0.49.0 wprowadza wielojęzyczne wsparcie dla dialogu aktualizacji oraz dodaje opcję ręcznego sprawdzania aktualizacji w zasobniku systemowym."
version: "0.49.0"
---

## Wielojęzyczny dialog aktualizacji i ręczne sprawdzanie

Chimera Agent teraz mówi w Twoim języku wszędzie, w tym w dialogu aktualizacji. Wcześniej dialog ten był wyłącznie po angielsku, niezależnie od ustawień języka aplikacji. To zostało poprawione — dialog teraz dostosowuje się do języka systemu operacyjnego. Dzięki temu użytkownicy, którzy nie zmieniali ustawień języka aplikacji, zobaczą dialog w języku systemu, a ci, którzy dostosowali język, nadal będą widzieć go po angielsku.

Dodatkowo w zasobniku systemowym pojawiła się opcja **Sprawdź aktualizacje**. To pierwszy sposób na ręczne żądanie sprawdzenia aktualizacji. Automatyczne sprawdzanie odbywa się raz przy starcie i pozostaje ciche, jeśli nie ma aktualizacji, aby nie niepokoić użytkowników. Jednak ta cisza mogła być błędnie interpretowana jako awaria, skłaniając użytkowników do niepotrzebnego ponownego uruchamiania aplikacji. Dzięki ręcznemu sprawdzaniu użytkownicy mogą teraz potwierdzić, czy aplikacja jest aktualna, lub otrzymać informację w przypadku błędu.

## Przetłumaczone komunikaty błędów i niezmienione diagnostyki

Dialog aktualizacji to nie jedyna część aplikacji, która została przetłumaczona. Dwa komunikaty o błędach backendu oraz opcja **Zakończ** w zasobniku są teraz dostępne w wielu językach. Jednak istnieje wyraźne rozróżnienie między tym, co jest tłumaczone, a co nie:

> **Tłumaczone jest to, co mówi Ci, co zrobić. To, co trafia do raportu błędów — nie.**

Na przykład, jeśli backend ulegnie awarii, komunikat o błędzie będzie w Twoim języku, ale ścieżka, błąd systemowy oraz stderr backendu pozostaną w oryginalnej formie. Dzięki temu użytkownicy nadal mogą wyszukiwać i rozumieć błędy systemowe bez nieporozumień.

## Co pozostało niezmienione

Ta aktualizacja nie zmienia mechanizmu aktualizacji, który działa od wersji 0.48.0. Automatyczne sprawdzanie nadal odbywa się przy każdym uruchomieniu, a proces instalacji pozostaje inicjowany przez użytkownika. Nie ma okresowego sprawdzania podczas działania aplikacji.

Pozostaje jeden kontrintuicyjny aspekt: **wersja, która pokazuje Ci dialog, to ta już zainstalowana**, a nie ta oferowana. Oznacza to, że monit oferujący wersję 0.49.0 jest wyświetlany przez aktualnie uruchomioną wersję. Od wersji 0.49.0 ten monit będzie w Twoim języku.

Pełne szczegóły znajdziesz w [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
