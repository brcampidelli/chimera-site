---
title: "L'entretien n'est plus qu'à un prompt"
date: 2026-10-15
category: analysis
summary: "L'entretien client IA de McKinsey et les expériences d'autonomie du secteur financier révèlent le même changement : les agents ne sont plus des outils que vous utilisez, mais des rôles que vous concevez et évaluez."
sources:
  - headline: "Apple atinge valor de mercado inédito de US$ 5 tri e segue como segunda mais valiosa"
    url: https://www.infomoney.com.br/mercados/apple-atinge-valor-de-mercado-inedito-de-us-5-tri-e-segue-como-segunda-mais-valiosa/
    outlet: "InfoMoney"
    published: 2026-10-14
  - headline: "McKinsey is making job applicants spar with a fake AI client"
    url: https://www.theverge.com/news/1011654/mckinsey-ai-client-interview
    outlet: "The Verge"
    published: 2026-10-14
  - headline: "Crossing the Threshold: How OpenAI and Anthropic Approach Autonomy and Safety in Financial Agents"
    url: https://www.latent.space/p/crossing-the-threshold
    outlet: "Latent Space"
    published: 2026-10-14
dropped: "9 matérias examinadas de 589 reunidas, 3 lidas para este texto."
---

Dès qu'une entreprise demande à un candidat de prouver sa valeur en parlant à une machine, la machine cesse d'être un outil pour devenir la norme. C'est la ligne que nous avons franchie cette semaine, et cela change ce que signifie construire un agent.

McKinsey & Company exigera désormais de certains candidats débutants qu'ils tiennent une conversation de 10 minutes avec une simulation IA d'un client dans le cadre du processus d'entretien [[2]](https://www.theverge.com/news/1011654/mckinsey-ai-client-interview). Ce n'est pas un chatbot qui filtre des mots-clés. C'est un adversaire de jeu de rôle conçu pour tester la façon dont un humain réfléchit sous pression. L'IA n'est pas l'assistant dans la pièce. C'est le gardien.

Pour quiconque construit des agents, l'implication est immédiate. L'évaluation n'est plus une préoccupation distincte que l'on ajoute après l'entraînement. Lorsqu'une entreprise comme McKinsey déploie un client simulé pour juger la performance humaine, la même logique s'applique aux agents que vous livrez. Votre agent n'est pas terminé lorsqu'il réussit un benchmark. Il est terminé lorsqu'il peut tenir tête à un homologue simulé conçu pour exposer ses faiblesses. Si vous ne construisez pas d'environnements d'évaluation adversariaux pour vos agents, quelqu'un d'autre les construira pour vous — et ce seront eux qui décideront si votre système est apte à la production.

## L'autonomie en laisse

La même tension entre capacité et contrôle a émergé dans un contexte très différent. À AI Engineer New York, des laboratoires de pointe et des entreprises financières ont discuté de la manière de donner aux agents une autonomie utile sur des décisions lourdes de conséquences tout en gardant un humain dans la boucle [[3]](https://www.latent.space/p/crossing-the-threshold). Le secteur financier n'a pas le luxe d'agir vite et de s'excuser plus tard. Une mauvaise transaction exécutée par un agent avec de l'argent réel n'est pas une hallucination que l'on peut régénérer. C'est une perte.

Ce qui ressort de ces conversations est un schéma qui s'applique bien au-delà de la finance : les architectures d'agents les plus intéressantes ne sont pas celles qui maximisent l'autonomie, mais celles qui rendent la frontière entre autonomie et supervision explicite et auditable. L'agent ne demande pas la permission à chaque étape. Il opère dans un seuil déclaré, et il expose son raisonnement lorsqu'il approche les limites de ce seuil. Ce n'est pas un détail technique. C'est une primitive de gouvernance.

## La vraie valorisation est la confiance

Apple a brièvement atteint une valorisation boursière de 5 000 milliards de dollars pendant les heures de négociation régulières, un chiffre si énorme qu'il en devient abstrait [[1]](https://www.infomoney.com.br/mercados/apple-atinge-valor-de-mercado-inedito-de-us-5-tri-e-segue-como-segunda-mais-valiosa/). Mais le chiffre en lui-même n'est pas le propos. Le propos est ce qui soutient une telle valorisation dans le temps : une chaîne de décisions sur ce qui s'exécute sur l'appareil, ce qui quitte l'appareil, et qui peut auditer la différence. Cette chaîne est faite des mêmes questions de gouvernance que les entreprises financières se posent à propos de leurs agents et que McKinsey intègre dans son processus de recrutement.

Lorsqu'une entreprise décide qu'une IA peut simuler un client suffisamment bien pour juger un humain, elle fait une déclaration sur l'endroit où elle place sa confiance. La même déclaration est faite chaque fois que vous décidez si votre agent appelle une API externe, écrit dans une base de données ou envoie un e-mail sans humain dans la boucle. Les constructeurs qui comprennent cela cesseront de traiter l'évaluation comme une phase et commenceront à la traiter comme une infrastructure. Ils construiront des homologues simulés qui défient leurs agents avant que le monde ne le fasse. Et ils définiront les seuils d'autonomie non pas dans un document de conception, mais dans du code qui peut être inspecté, testé et tenu responsable.

C'est la leçon pratique. Construisez l'évaluateur avant de construire l'agent. Faites de la frontière entre autonomie et supervision une primitive configurable, pas un accord tacite. Et supposez que chaque agent que vous livrez finira par faire face à un adversaire simulé conçu pour le briser. Si vous ne construisez pas cet adversaire en premier, quelqu'un d'autre le fera.
