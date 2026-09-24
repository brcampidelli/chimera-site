---
title: "Chimera Agent 0.49.0: Diálogo de Atualização Multilíngue e Verificações por Solicitação do Usuário"
date: 2026-09-06
category: update
summary: "Chimera Agent 0.49.0 introduz suporte multilíngue para o diálogo de atualização e adiciona uma opção de verificação manual de atualizações na bandeja do sistema."
version: "0.49.0"
---

## Diálogo de Atualização Multilíngue e Verificação Manual

O Chimera Agent agora fala sua língua em todos os lugares, incluindo o diálogo de atualização. Antes, esse diálogo aparecia apenas em inglês, independente da configuração de idioma do aplicativo. Isso foi corrigido, e o diálogo agora segue o idioma do seu sistema operacional. Essa mudança garante que usuários que não alteraram a configuração de idioma do app vejam o diálogo no idioma do sistema, enquanto quem personalizou a configuração continuará vendo o diálogo em inglês.

Além disso, a bandeja do sistema agora inclui uma opção **Verificar atualizações**. Essa é a primeira forma de solicitar manualmente uma verificação. A checagem automática ocorre uma vez na inicialização e permanece silenciosa se não houver atualização, para não incomodar o usuário. Porém, esse silêncio poderia ser interpretado como uma falha, levando usuários a reiniciar o app sem necessidade. Com a verificação manual, agora é possível confirmar se o app está atualizado ou receber feedback se a verificação falhar.

## Diálogos de Falha Traduzidos e Diagnósticos Intocados

O diálogo de atualização não é a única parte do app que foi traduzida. Os dois diálogos de falha no backend e a opção **Sair** na bandeja também estão disponíveis em múltiplos idiomas. Porém, há uma distinção clara entre o que é traduzido e o que não é:

> **O que te diz o que fazer é traduzido. O que vai para um relatório de bug não é.**

Por exemplo, se o backend falhar, a mensagem de erro estará no seu idioma, mas o caminho, erro do sistema e stderr do backend permanecerão no formato original. Isso garante que usuários ainda possam buscar e entender erros de sistema sem confusão.

## O Que Permanece Inalterado

Esta atualização não altera o mecanismo de atualização em si, que funciona desde a versão 0.48.0. A verificação automática ainda ocorre a cada inicialização, e o processo de instalação continua sendo iniciado pelo usuário. Não há verificações periódicas enquanto o app está em execução.

Um aspecto contra-intuitivo permanece: **a versão que exibe o diálogo é a já instalada**, não a que está sendo oferecida. Isso significa que o aviso sobre a versão 0.49.0 é gerado pela versão que você está executando no momento. A partir da versão 0.49.0, esse aviso estará no seu idioma.

Para todos os detalhes, consulte [Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
