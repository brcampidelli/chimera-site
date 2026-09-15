---
title: "Chimera Agent 0.49.1: Correções para Fluxo de Atualização e Consistência de UI"
date: 2026-09-15
category: update
summary: "Chimera Agent 0.49.1 resolve problemas críticos no processo de atualização, consistência da interface e lacunas de tradução, garantindo operação mais suave e interações mais claras."
version: "0.49.1"
---

## Melhorias no Processo de Atualização

O mecanismo de atualização no Chimera Agent 0.49.0 tinha um defeito significativo: o processo de backend reportava incorretamente a versão devido a arquivos residuais de instalações anteriores. Especificamente, o bundle do PyInstaller mantinha diretórios `dist-info` tanto da versão antiga quanto da nova, fazendo com que `importlib.metadata` retornasse a versão errada. Isso fazia com que o app insistisse em oferecer uma atualização para a versão já instalada. O instalador agora remove o bundle antigo antes de escrever o novo, garantindo que apenas a versão correta seja reportada. Observe que essa correção se aplica ao instalador enviado com a 0.49.1, não ao que a instala. Se você estiver atualizando da 0.49.0, ainda pode ver um `dist-info` desatualizado até a próxima atualização.

## Confiabilidade da Atualização Automática

Outro problema foi descoberto no mecanismo de auto-atualização. Por aproximadamente vinte e cinco minutos após cada release, o atualizador falhava porque o endpoint `latest.json` retornava um erro 404. Isso acontecia porque o release era marcado como "latest" antes que todas as builds para plataformas estivessem completas. Agora, os releases são retidos com `--latest=false` e só são promovidos uma vez que o manifesto é anexado. Isso garante que o endpoint sempre resolva para um release válido, melhorando a confiabilidade e evitando que releases quebrados sejam oferecidos.

## Consistência e Clareza na Interface

O painel 'nova versão disponível' anteriormente fazia uma pergunta que não podia responder: *"Uma nova versão está disponível. Atualizar?"* No entanto, o painel só oferecia opções para visualizar o release ou dispensar a notificação, sem funcionalidade real de atualização. O painel agora simplesmente informa que uma nova versão está disponível e direciona os usuários para a opção **Verificar atualizações** na bandeja do sistema. Essa mudança elimina confusões e alinha a UI com suas capacidades reais.

## Correções de Tradução

O assistente de primeira execução tinha um problema de tradução menor mas perceptível: o dropdown de modo de custo exibia valores brutos (`auto / cheap / balanced / premium`) em vez de suas contrapartes traduzidas. Embora os rótulos existissem e estivessem traduzidos, não estavam sendo usados nesse contexto. Essa inconsistência foi resolvida, garantindo que o dropdown agora exiba os rótulos traduzidos corretos, consistentes com a tela de Configurações.

Para detalhes completos, consulte as [notas de release][Chimera Agent v0.49.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.1). Para atualizar, execute `chimera-desktop --update` ou baixe a versão mais recente do site oficial.
