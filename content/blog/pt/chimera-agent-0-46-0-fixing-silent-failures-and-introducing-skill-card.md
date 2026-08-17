---
title: "Chimera Agent 0.46.0: Corrigindo falhas silenciosas e introduzindo Skill Cards"
date: 2026-08-17
category: update
summary: "O Chimera Agent 0.46.0 resolve falhas silenciosas, introduz uma biblioteca de habilidades curada e garante traduções honestas em nove idiomas."
version: "0.46.0"
---

## Falhas Silenciosas Resolvidas

O Chimera Agent 0.46.0 corrige uma série de falhas silenciosas que passavam despercebidas. Esses problemas não causavam crashes ou erros, mas comprometiam funcionalidades críticas. Por exemplo, cinco armazenamentos JSON perdiam dados silenciosamente devido à falta de mecanismos de bloqueio durante operações de leitura-modificação-escrita. Isso significava que um processo podia sobrescrever as alterações de outro sem qualquer aviso. Um desses armazenamentos era o de habilidades, onde dados aprendidos podiam ser apagados em execuções subsequentes. Agora, todos os cinco armazenamentos bloqueiam e escrevem atomicamente, garantindo integridade dos dados.

Outra falha silenciosa envolvia o bot do Discord do app, que rodava sem proteção adequada. Isso impedia que o build gate o detectasse, deixando uma brecha de segurança potencial. Da mesma forma, um fence de governança que encerrava o CLI durante a importação (quando habilitado) passou despercebido porque ninguém o havia executado com governança ativada. Esses problemas foram corrigidos, garantindo que as funcionalidades se comportem como esperado.

## Biblioteca de Habilidades Curada

Esta versão introduz uma biblioteca de habilidades curada, com 23 skill cards agrupadas por aplicação no fluxo de trabalho: definir, construir, verificar, revisar e enviar. Esses cards são dados, não código, facilitando contribuições e revisões. Cada card inclui seções como Trigger, Do, Avoid, Check e Risk, e estão disponíveis em nove idiomas. As traduções são gerenciadas em um arquivo sidecar, garantindo que o card original permaneça byte-identical.

Porém, a leitura desses cards no prompt do agente é opt-in e desligada por padrão, devido ao aumento significativo no uso de tokens sem ganho relevante de performance. A decisão foi baseada em um teste A/B que mostrou melhora de +16.7pp, mas não atingiu limiares de significância.

## Traduções Honestas

Um novo teste garante que as traduções dos skill cards sejam honestas e completas. Ele separa três estados que parecem idênticos em um arquivo: desatualizado, incompleto e faltante. Traduções desatualizadas alegam traduzir texto que foi alterado, enquanto incompletas faltam seções. Traduções faltantes são dívidas honestas, claramente marcadas como tal. Esse gate evita o problema de cards não traduzidos aparecerem na UI, que antes só era detectável lendo arquivos, não falhando builds.

## Correções na Documentação

Dezesseis afirmações na documentação que o código não suportava foram corrigidas em todos os dez idiomas. Cinco eram falsas, como opções de governança e destinos da rail desktop. Além disso, duas afirmações agora incluem ressalvas necessárias, garantindo informações precisas aos usuários.

## Próximos Passos

Para atualizar para o Chimera Agent 0.46.0, execute:

```
pip install -U chimera-agent
pip install -U 'chimera-agent[desktop]'
```

Para detalhes, consulte as [release notes][Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0).

[Chimera Agent v0.46.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.46.0): chimeraagent.space/release-notes
