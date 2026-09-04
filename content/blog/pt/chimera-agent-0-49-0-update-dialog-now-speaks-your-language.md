---
title: "Chimera Agent 0.49.0: Diálogo de Atualização Agora Fala Sua Língua"
date: 2026-09-04
category: update
summary: "O diálogo de atualização e mensagens de erro agora seguem o idioma do seu sistema, com opção de verificação manual na bandeja."
version: "0.49.0"
---

## Traduções do Diálogo de Atualização e Verificações Manuais

O diálogo de atualização no Chimera Agent antes só aparecia em inglês, independente do idioma configurado no app. Isso foi corrigido na versão 0.49.0 — agora o diálogo segue o idioma do seu sistema operacional. Essa mudança resolve uma desconexão para usuários que rodam o app em um idioma mas vêem mensagens críticas do sistema em outro.

O menu da bandeja agora inclui uma opção **Verificar atualizações**, que serve como a primeira forma manual de checar por updates. Antes, a verificação automática ocorria silenciosamente na inicialização, sem dar feedback a menos que uma atualização fosse encontrada. Embora esse design evite notificações desnecessárias, ele não dava aos usuários nenhuma forma de confirmar se estavam atualizados sem reiniciar o app. A nova verificação manual fornece confirmação explícita quando não há updates disponíveis, junto com mensagens de erro claras se a verificação falhar.

## Mensagens de Falha Traduzidas com Diagnósticos Intactos

Diálogos de falha — incluindo relatórios de crash do backend e a opção Sair na bandeja — agora também são traduzidos. Porém, há uma distinção importante no que é traduzido:

- **Instruções para o usuário** aparecem no idioma do sistema (ex: "Feche o Chimera e abra de novo")
- **Detalhes técnicos** (caminhos de arquivo, códigos de erro, logs do backend) permanecem no formato original

Essa separação garante que usuários recebam orientações claras no idioma preferido, enquanto mantém informações de erro acionáveis e pesquisáveis para troubleshooting. Um teste reforça esse comportamento, verificando que textos visíveis ao usuário vêm de tabelas de tradução enquanto dados de diagnóstico passam intactos.

## O Que Permanece Inalterado

O mecanismo de atualização em si não mudou — as verificações ainda ocorrem automaticamente na inicialização, e instalações sempre exigem confirmação do usuário. O app nunca instala updates sem permissão explícita. Um detalhe sutil mas importante: a versão que exibe o diálogo de atualização é sempre a instalada atualmente, não a nova versão sendo oferecida. Isso significa que o prompt oferecendo a 0.49.0 aparece no idioma que sua versão atual usa — a partir da 0.49.0, isso vai corresponder ao idioma do seu sistema.

Para ver as mudanças, atualize para a 0.49.0 ou verifique manualmente pelo menu da bandeja. Detalhes completos estão nas [notas de versão][Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
