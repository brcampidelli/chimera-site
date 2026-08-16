---
title: "Chimera Agent 0.43.0: Suporte Ampliado a Provedores e Controles Aprimorados"
date: 2026-08-16
category: update
summary: "Chimera Agent 0.43.0 traz suporte ampliado a provedores via LiteLLM, novos controles na interface para configurações antes ocultas e correções para anexos de documentos e persistência de temas."
version: "0.43.0"
---

## Suporte Ampliado a Provedores com LiteLLM

O Chimera Agent agora está totalmente integrado ao LiteLLM, permitindo que os usuários se conectem a qualquer provedor suportado pelo LiteLLM. Antes, apenas cinco provedores eram reconhecidos, deixando usuários com chaves de fornecedores como Groq ou Mistral sem opção. A atualização garante que qualquer `<PROVIDER>_API_KEY` seja aceita, com uma lista de bloqueio para excluir provedores que não são de modelos, como ElevenLabs e Stability. Além disso, o `doctor` agora sinaliza nomes de provedores não reconhecidos, ajudando os usuários a evitar erros de digitação que poderiam simular provedores válidos.

## Controles de Interface Aprimorados

Três configurações anteriormente acessíveis apenas via arquivos `.env` agora estão disponíveis na interface: o modelo de embeddings, a URL base do Ollama e pools de chaves. A configuração do modelo de embeddings agora está diretamente vinculada ao switch de memória semântica, garantindo que os usuários possam configurá-lo sem falhas silenciosas. Os pools de chaves são gerenciados por meio de operações (adicionar/remover) em vez de edição direta, mantendo a segurança ao evitar a exibição de informações sensíveis.

## Correções e Melhorias

Anexar documentos e ditar mensagens agora funcionam corretamente, resolvendo um erro 422 causado por cabeçalhos Content-Type incorretos. O aplicativo também mantém seu tema, espaço de trabalho, lista de projetos e idioma entre inicializações, corrigindo um problema em que essas configurações eram perdidas devido a mudanças de porta.

Para explorar essas atualizações, confira as [notas de lançamento][Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0).
