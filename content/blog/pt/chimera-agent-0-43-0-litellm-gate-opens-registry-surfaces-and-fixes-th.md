---
title: "Chimera Agent 0.43.0: Portão LiteLLM Aberto, Registro Exposto e Correções Essenciais"
date: 2026-08-16
category: update
summary: "Chimera 0.43.0 remove restrições arbitrárias de provedores, expõe configurações ocultas e corrige uploads de documentos e persistência de sessão."
version: "0.43.0"
---

## Portão LiteLLM Agora Aceita Qualquer Chave de Provedor

Antes, o Chimera só reconhecia cinco provedores LiteLLM, rejeitando chaves válidas de serviços como Groq ou Mistral com um erro enganoso de "Nenhuma chave de provedor configurada". Agora, o portão aceita qualquer `<PROVIDER>_API_KEY`, com duas proteções:

1. Uma lista de bloqueio evita que provedores não-modelo (como ElevenLabs ou Stability AI) sejam identificados erroneamente como fontes de modelo
2. `doctor` agora valida nomes de provedores contra o enum do LiteLLM, capturando erros de digitação que antes falhavam silenciosamente

A mudança resolve um problema mais profundo: chaves colocadas no `.env` estavam sendo ignoradas silenciosamente devido à configuração `extra="ignore"` do Pydantic. Como `chimera init` cria arquivos `.env` e a documentação direciona usuários para lá, isso causava falhas persistentes de configuração.

## Funcionalidades Ocultas Agora Acessíveis

Três capacidades importantes existiam no código mas faltavam interfaces:

1. **Registro de Agentes**: A caixa de lane do board era um campo de texto livre que tentava adivinhar IDs de registro nunca exibidos. Agora acessível na terceira aba do Automation, mostra agentes existentes enquanto ainda permite trabalho contra IDs inexistentes (que aguardam no backlog).
2. **Seleção de Modelo de Embed**: Antes oculta, agora aparece diretamente sob o switch de memória semântica que afeta. Falhas degradam silenciosamente para busca léxica, tornando a configuração visível crucial.
3. **Pools de Chaves**: Rotacionavam em round-robin com cooldowns mas não tinham UI. A interface agora as gerencia por operação (adicionar/remover) em vez de expor valores secretos.

## Correções Críticas para Funcionalidade Básica

Dois recursos foram lançados quebrados no app:

- **Uploads de Arquivo e Ditado de Mensagens**: Ambos falhavam com erros 422 porque `authHeaders()` forçava Content-Type `application/json`, impedindo limites corretos de formulário multipart. Testes não pegaram isso porque simulavam toda a camada de API.

- **Persistência de Sessão**: O app perdia configurações de tema, workspace e idioma ao iniciar devido à atribuição aleatória de portas mudando a origem do `localStorage`. Agora lembra e reutiliza portas.

O assistente de primeira execução também lida melhor com seleção de modelo, mostrando (mas não aplicando automaticamente) modelos compatíveis com seu provedor para evitar erros 401 imediatos.

Atualize com `pip install --upgrade chimera-agent` ou veja [Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0) para detalhes completos.
