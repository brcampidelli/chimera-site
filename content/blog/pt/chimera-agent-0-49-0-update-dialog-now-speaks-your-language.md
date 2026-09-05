---
title: "Chimera Agent 0.49.0: Diálogo de Atualização Agora Fala a Sua Língua"
date: 2026-09-05
category: update
summary: "Chimera Agent 0.49.0 introduz diálogos de atualização localizados e uma verificação manual de atualizações, melhorando a experiência do usuário em dez idiomas."
version: "0.49.0"
---

## Diálogo de Atualização no Seu Idioma

O Chimera Agent agora suporta diálogos de atualização localizados em dez idiomas. Anteriormente, o diálogo de atualização era exibido apenas em inglês, independentemente do idioma selecionado no aplicativo. Essa inconsistência foi resolvida, garantindo que o diálogo de atualização siga as configurações de idioma do sistema operacional. Essa mudança é especialmente benéfica para usuários que dependem do idioma padrão do sistema, já que a detecção de idioma do app recai para o mesmo local.

Além disso, o menu da bandeja agora inclui uma opção **Verificar atualizações**, oferecendo aos usuários uma maneira manual de verificar se há atualizações disponíveis. A verificação automática de atualizações, que é executada uma vez na inicialização, permanece silenciosa quando não há atualizações para evitar interrupções desnecessárias. No entanto, a verificação manual informa explicitamente aos usuários se eles estão atualizados ou se a verificação falhou, resolvendo o problema anterior em que o silêncio após um clique poderia ser interpretado como uma funcionalidade quebrada.

## Diálogos de Falha e Diagnósticos

Os diálogos de falha no backend e a opção Sair na bandeja também foram traduzidos. No entanto, as informações de diagnóstico permanecem no idioma original. Essa distinção é crucial: **o que te diz o que fazer é traduzido, mas o que vai para um relatório de bug não é.** Por exemplo, enquanto a mensagem de erro explicando o problema é exibida no seu idioma, o caminho, o erro do sistema e o stderr do backend permanecem verbatim. Isso garante que os usuários possam buscar soluções e reportar bugs de forma eficaz sem encontrar barreiras linguísticas.

## O Que Permanece Inalterado

Esta atualização não altera o mecanismo de atualização em si. A verificação automática ainda é executada a cada inicialização, e o processo de instalação continua sendo iniciado pelo usuário, exigindo consentimento explícito antes de prosseguir. Não há verificação periódica enquanto o app está em execução. Além disso, é importante notar que a versão que exibe o diálogo de atualização é a que está instalada atualmente, não a que está sendo oferecida. Isso significa que o prompt oferecendo a versão 0.49.0 é gerado pela versão que você está usando no momento.

Para mais detalhes, consulte [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
