---
title: "Открытые модели набирают обороты в разработке агентов с Claude и Granite"
date: 2026-08-26
category: analysis
summary: "Интеграция Claude с Ollama и выпуск IBM моделей Granite с открытыми весами сигнализируют о сдвиге в сторону более доступных и настраиваемых фреймворков для агентов."
sources:
  - headline: "Claude Desktop support with Ollama · Ollama Blog"
    url: https://ollama.com/blog/claude-desktop
    outlet: "Ollama"
    published: 2026-08-25
  - headline: "IBM's new Granite 4.2 models ride the wave of interest in local LLMs"
    url: https://arstechnica.com/ai/2026/08/ibms-new-granite-4-2-models-ride-the-wave-of-interest-in-local-llms/
    outlet: "Ars Technica"
    published: 2026-08-26
  - headline: "IBM drops open-weight Granite 4.2 family with built-in agentic capabilities under Apache 2.0"
    url: https://the-decoder.com/ibm-drops-open-weight-granite-4-2-family-with-built-in-agentic-capabilities-under-apache-2-0/
    outlet: "The Decoder"
    published: 2026-08-26
dropped: "370 matérias examinadas de 556 reunidas, 3 lidas para este texto. Descartadas: HTTP 429 (16), publicado há 16964h (4), publicado há 2160h (3), publicado há 2184h (2), publicado há 6692h (2), publicado há 6739h (2)"
---

Ландшафт разработки AI-агентов смещается в сторону открытости и гибкости. Два недавних события — интеграция Claude с Ollama и выпуск IBM семейства моделей Granite 4.2 — подчеркивают растущую тенденцию: инструменты для создания агентов становятся более доступными и адаптируемыми под индивидуальные нужды. Этот сдвиг важен для разработчиков, которые хотят контролировать свой стек, не жертвуя функциональностью.

## Открытые модели входят в экосистему Claude

Новая совместимость Claude с Ollama [[1]](https://ollama.com/blog/claude-desktop) означает, что разработчики теперь могут направлять запросы Claude Desktop через Ollama как сторонний шлюз. Это эффективно связывает интерфейс Claude с открытыми моделями, расширяя выбор для тех, кто предпочитает или требует open-source альтернативы. Этот шаг признает, что многие разработчики агентов хотят комбинировать компоненты, а не быть привязанными к проприетарным экосистемам.

## Granite добавляет агентные возможности в модели с открытыми весами

Модели IBM Granite 4.2 [[2]](https://arstechnica.com/ai/2026/08/ibms-new-granite-4-2-models-ride-the-wave-of-interest-in-local-llms/)[[3]](https://the-decoder.com/ibm-drops-open-weight-granite-4-2-family-with-built-in-agentic-capabilities-under-apache-2-0/) продвигают эту открытость еще дальше, встраивая агентные возможности непосредственно в модели с лицензией Apache 2.0. Версия 30B с обучением "agentic RL" позволяет модели автономно обучаться использованию инструментов и выполнению кода — функции, которые обычно ассоциируются с проприетарными системами. С контекстными окнами до 512 000 токенов и тремя вариантами размеров (3B, 8B, 30B), Granite предоставляет масштабируемые решения для различных сценариев развертывания, особенно в корпоративных средах, где важна предсказуемость.

## Практические последствия для разработчиков агентов

Для разработчиков эти изменения означают больше выбора при проектировании систем агентов. Интеграция Claude-Ollama позволяет тестировать проприетарные интерфейсы с открытыми моделями, а открытые веса Granite со встроенными агентными возможностями снижают зависимость от закрытых API для продвинутых функций. Главный вывод заключается в том, что барьер для экспериментов и развертывания мощных агентов продолжает снижаться — при условии, что вы готовы работать с инструментами напрямую, а не через готовые решения.
