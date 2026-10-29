---
title: "Quem constrói agentes agora é dono da superfície"
date: 2026-10-29
category: analysis
summary: "As novas plataformas de desenvolvimento do Google mostram que os construtores de agentes, e não os donos de aplicativos, estão se tornando a interface principal para usuários e ferramentas."
sources:
  - headline: "Como criar um agente de IA com Python, LangChain e ferramentas | IA Expert Academy"
    url: https://iaexpert.academy/2026/10/28/como-criar-um-agente-de-ia-com-python-langchain-e-ferramentas/
    outlet: "IA Expert Academy"
    published: 2026-10-28
  - headline: "As AI agents reshape the web, Google opens Gemini and Search to more apps"
    url: https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/
    outlet: "TechCrunch"
    published: 2026-10-28
  - headline: "Google opens Android development to third-party AI agents and unveils new Gemini APIs"
    url: https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/
    outlet: "The Decoder"
    published: 2026-10-28
dropped: "87 matérias examinadas de 585 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (2), publicado há 149h (1), publicado há 198h (1), publicado há 200h (1), publicado há 384h (1), publicado há 675h (1)"
---

A área de superfície do software está mudando. Por anos, a interface era o aplicativo: uma tela, um botão, um formulário. Agora, a interface é cada vez mais o agente — e quem controla o agente controla o que o usuário pode fazer. Dois anúncios do Google esta semana tornam essa mudança concreta, não especulativa.

O Google está abrindo o Gemini e a Busca para serviços de terceiros através de uma nova plataforma de desenvolvimento, permitindo que empresas tragam suas ofertas diretamente para as experiências de IA do Google [[2]](https://techcrunch.com/2026/10/28/as-ai-agents-reshape-the-web-google-opens-gemini-and-search-to-more-apps/). Ao mesmo tempo, o Android Studio está ganhando um recurso "Bring Your Own Agent" que suporta mais de 40 agentes de codificação, incluindo o Claude Agent da Anthropic e o Codex da OpenAI [[3]](https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/). O padrão é o mesmo em ambos os casos: o Google não está construindo o agente para você. Está construindo o lugar onde seu agente roda e a superfície onde seu agente aparece.

## O agente é o novo ponto de entrada

Para quem está construindo agentes, isso muda a questão da distribuição. Você não precisa mais convencer um usuário a instalar seu app ou visitar seu site. Você precisa convencer um agente — ou a plataforma que hospeda esse agente — de que seu serviço é a ferramenta certa para o trabalho. Esse é um tipo diferente de problema de engenharia. Trata-se de descobribilidade, descrições de ferramentas e execução confiável, não de fluxos de onboarding ou notificações push.

O movimento do Android Studio é mais específico, mas igualmente revelador. O Google não está forçando um único agente de codificação próprio. Está abrindo a IDE para qualquer agente que o desenvolvedor quiser usar. As ferramentas de terminal que o Google menciona são projetadas para ajudar agentes a terminar tarefas de UI mais rápido e com menos tokens [[3]](https://the-decoder.com/google-opens-android-development-to-third-party-ai-agents-and-unveils-new-gemini-apis/). Isso é um reconhecimento de que a performance do agente agora é uma preocupação da plataforma. O trabalho da plataforma é tornar os agentes mais eficientes, não substituí-los.

## O design de ferramentas se torna o verdadeiro trabalho

O tutorial da IA Expert Academy, embora mais básico, aponta na mesma direção. Ele percorre a construção de um agente que usa ferramentas, consulta preços, calcula descontos e combina funções para completar uma tarefa [[1]](https://iaexpert.academy/2026/10/28/como-criar-um-agente-de-ia-com-python-langchain-e-ferramentas/). A parte interessante não é o código em LangChain. É a estrutura: o agente é tão bom quanto as ferramentas que pode chamar e a ordem em que as chama. É aí que reside a verdadeira engenharia agora.

Quando o Google abre a Busca para serviços externos, a mesma lógica se aplica em escala web. Uma empresa que quer ser encontrada por um agente precisa descrever seu serviço de uma forma que um agente possa interpretar, avaliar e agir. Isso é um novo tipo de design de API. Não basta expor um endpoint. Você tem que expor intenção, restrições e modos de falha de uma forma que um agente possa raciocinar sobre.

## O que isso significa para os construtores

A conclusão prática é simples: pare de pensar em agentes como uma funcionalidade dentro do seu produto. Comece a pensar no seu produto como uma ferramenta dentro do agente de outra pessoa. Isso significa investir em descrições claras de ferramentas, saídas previsíveis e ações pequenas e combináveis. Significa testar seu serviço contra múltiplos agentes, não apenas o seu próprio. E significa tratar o ecossistema de agentes como um canal de distribuição, com todo o trabalho de descobribilidade e confiabilidade que isso implica.

As plataformas não estão esperando. Estão construindo os trilhos agora. Os construtores que entenderem que seu usuário real muitas vezes é outro software serão aqueles cujas ferramentas serão chamadas.
