---
title: "Chimera Agent 0.49.0: Dialog Aktualizacji Teraz Mówi Twoim Językiem"
date: 2026-09-05
category: update
summary: "Chimera Agent 0.49.0 wprowadza zlokalizowane dialogi aktualizacji oraz ręczną opcję sprawdzania aktualizacji, poprawiając doświadczenie użytkownika w dziesięciu językach."
version: "0.49.0"
---

## Dialog Aktualizacji w Twoim Języku

Chimera Agent obsługuje teraz zlokalizowane dialogi aktualizacji w dziesięciu językach. Wcześniej dialog aktualizacji był wyświetlany wyłącznie po angielsku, niezależnie od języka wybranego w aplikacji. Ta niespójność została rozwiązana, dzięki czemu dialog aktualizacji dostosowuje się do ustawień języka systemu operacyjnego. Ta zmiana jest szczególnie korzystna dla użytkowników, którzy polegają na domyślnym języku systemu, ponieważ wykrywanie języka aplikacji korzysta z tego samego ustawienia.

Dodatkowo, menu w zasobniku systemowym zawiera teraz opcję **Sprawdź aktualizacje**, umożliwiając ręczne sprawdzenie dostępności aktualizacji. Automatyczne sprawdzanie aktualizacji, które odbywa się raz przy starcie, pozostaje ciche, gdy nie znaleziono aktualizacji, aby uniknąć niepotrzebnych przerw. Jednak ręczne sprawdzanie wyraźnie informuje użytkownika, czy jest on na bieżąco lub czy sprawdzanie nie powiodło się, rozwiązując problem, w którym cisza po kliknięciu mogła być błędnie interpretowana jako uszkodzona funkcja.

## Dialogi Błędów i Diagnostyka

Dialogi błędów backendu oraz opcja Zakończ w zasobniku systemowym również zostały przetłumaczone. Jednak informacje diagnostyczne pozostają w oryginalnym języku. To rozróżnienie jest kluczowe: **to, co mówi ci, co zrobić, jest przetłumaczone, ale to, co trafia do raportu o błędach, nie jest.** Na przykład, podczas gdy komunikat o błędzie wyjaśniający problem jest wyświetlany w twoim języku, ścieżka, błąd systemu operacyjnego oraz stderr backendu pozostają niezmienione. To zapewnia, że użytkownicy mogą skutecznie szukać rozwiązań i zgłaszać błędy bez napotykania barier językowych.

## Co Pozostaje Niezmienione

Ta aktualizacja nie zmienia samego mechanizmu aktualizacji. Automatyczne sprawdzanie nadal odbywa się przy każdym uruchomieniu, a proces instalacji pozostaje inicjowany przez użytkownika, wymagając wyraźnej zgody przed kontynuacją. Nie ma okresowego sprawdzania podczas działania aplikacji. Ponadto ważne jest, aby pamiętać, że wersja wyświetlająca dialog aktualizacji to ta obecnie zainstalowana, a nie ta, która jest oferowana. Oznacza to, że monit oferujący ci wersję 0.49.0 jest wyświetlany przez wersję, której aktualnie używasz.

W celu uzyskania dodatkowych informacji, zapoznaj się z [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
