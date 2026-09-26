---
title: "Eficiência de Tokens e Riscos Legais Redefinem o Desenvolvimento de Agentes"
date: 2026-09-26
category: analysis
summary: "O sistema SoL-Pi da Nvidia demonstra o potencial inexplorado na otimização da infraestrutura de agentes, enquanto a ação judicial contra a Suno destaca os crescentes riscos legais na IA generativa."
sources:
  - headline: "Nvidia's SoL-Pi system cuts coding agent token usage nearly in half by optimizing the harness"
    url: https://the-decoder.com/nvidias-sol-pi-system-cuts-coding-agent-token-usage-nearly-in-half-by-optimizing-the-harness/
    outlet: "The Decoder"
    published: 2026-09-26
  - headline: "Sony and UMG are suing Suno again"
    url: https://www.theverge.com/ai-artificial-intelligence/1000758/suno-sony-umg-lawsuit-ai-music
    outlet: "The Verge"
    published: 2026-09-25
  - headline: "Ahead of US IPO, British AI neocloud Nscale secures $3.36B in convertible financing"
    url: https://techcrunch.com/2026/09/25/ahead-of-u-s-ipo-british-ai-neocloud-nscale-secures-3-36b-in-convertible-finacing/
    outlet: "TechCrunch"
    published: 2026-09-25
dropped: "68 matérias examinadas de 573 reunidas, 3 lidas para este texto. Descartadas: publicado há 236h (3), publicado há 94h (1), publicado há 235h (1), publicado há 438h (1), publicado há 618h (1), publicado há 958h (1)"
---

Os maiores ganhos na eficiência dos agentes podem vir não de modelos maiores, mas de repensar como eles interagem com seus ambientes. O sistema SoL-Pi da Nvidia [[1]](https://the-decoder.com/nvidias-sol-pi-system-cuts-coding-agent-token-usage-nearly-in-half-by-optimizing-the-harness/) prova que economias significativas de tokens—até 49% para agentes de codificação—podem ser alcançadas otimizando a camada de controle entre modelos e ambientes de execução. Isso sugere que muitos frameworks de agentes ainda operam com sobrecarga desnecessária, tratando o harness como mera infraestrutura, em vez de um componente ajustável.

## Infraestrutura como Alavanca de Desempenho

A abordagem do SoL-Pi é notável por usar agentes de pesquisa para testar sistematicamente 152 abordagens em milhares de execuções. Embora os resultados tenham variado entre benchmarks, a metodologia aponta para um princípio mais amplo: a infraestrutura dos agentes merece a mesma otimização rigorosa normalmente reservada para arquiteturas de modelos. Desenvolvedores que criam agentes personalizados devem auditar suas camadas de controle em busca de ineficiências semelhantes, especialmente em padrões de interação repetitivos.

## Exposição Legal Cresce para Sistemas Generativos

A renovada ação judicial contra a Suno pela Sony e UMG [[2]](https://www.theverge.com/ai-artificial-intelligence/1000758/suno-sony-umg-lawsuit-ai-music) sinaliza o endurecimento das posições legais em torno dos dados de treinamento. Diferente de casos anteriores focados na similaridade das saídas, esta ação alega infração sistêmica na construção do modelo. Para desenvolvedores de agentes, isso reforça a necessidade de documentar a proveniência dos componentes de treinamento, especialmente ao incorporar modelos ou datasets de terceiros.

## Lições Práticas

1. Analise o uso de tokens do seu agente no nível do harness, não apenas do modelo—procure por passagem redundante de contexto ou gerenciamento de estado subótimo
2. Trate a avaliação de risco legal como um processo contínuo, não como uma verificação de conformidade única
3. Considere estruturas de financiamento conversíveis como a da Nscale [[3]](https://techcrunch.com/2026/09/25/ahead-of-u-s-ipo-british-ai-neocloud-nscale-secures-3-36b-in-convertible-finacing/) ao construir plataformas de agentes intensivas em infraestrutura, mas reconheça que esse caminho exige métricas claras de escalabilidade

O próximo ano separará os frameworks de agentes que apenas envolvem modelos daqueles projetados de forma holística—com igual atenção à eficiência computacional, viabilidade legal e escalabilidade sustentável.
