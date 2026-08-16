---
title: "Chimera Agent 0.45.1: Correção para Falhas no Docker Headless"
date: 2026-08-16
category: update
summary: "A versão 0.45.1 corrige um problema crítico de inicialização no Docker, onde containers headless travavam devido a uma dependência desnecessária do FastAPI."
version: "0.45.1"
---

## Por que os Containers Docker Travavam na Inicialização

O Chimera Agent 0.45.0 introduziu uma falha silenciosa em implantações headless do Docker. A imagem do container instala `.[full]` sem o extra `desktop`, que intencionalmente exclui o FastAPI. Porém, o caminho do cron começou a importar `chimera.api.usage`, disparando a inicialização antecipada do módulo de API. Isso puxou o FastAPI como uma dependência indireta através de um leitor JSONL, fazendo os containers entrarem em crash-loop com `ModuleNotFoundError`.

O bug passou despercebido porque:
1. Ambientes de desenvolvimento normalmente têm o FastAPI instalado
2. Nenhum dos 2.945 testes existentes simulava uma instalação limpa de `.[full]`
3. A falha só se manifestava em implantações de produção

## Carregamento Preguiçoso para Dependências Principais

A correção ataca a causa raiz em vez de mascarar sintomas. Adicionar `desktop` à imagem funcionaria, mas violaria o propósito documentado do extra ("o CLI/gateway principal nunca precisa disso") e aumentaria desnecessariamente o tamanho da imagem.

A v0.45.1 modifica `chimera/api/__init__.py` para:
- Resolver reexportações de forma preguiçosa em vez de antecipada
- Manter as dependências do FastAPI isoladas em componentes web específicos
- Manter modos de falha claros quando `desktop` for realmente necessário

Cinco módulos folha (`usage`, `roles`, `sessions`, `posture` e `config_api`) não puxam mais implicitamente a stack web quando importados por operações CLI. O gateway permanece funcional com apenas `.[full]` instalado.

## Nova Rede de Segurança

Um teste em subprocesso agora verifica se as importações funcionam sem o FastAPI disponível. Isso teria pegado o problema antes do lançamento ao:
1. Rodar em um ambiente onde `fastapi` é deliberadamente impossível de importar
2. Verificar a funcionalidade principal antes de prosseguir com outros checks
3. Espelhar as condições reais de implantação

A verificação end-to-end confirma a correção: uma instalação limpa de `.[full]` agora consegue executar `serve --cron` sem travar.

Atualize com `pip install -U chimera-agent==0.45.1`. Para verificação de implantação, teste seu container com `serve --cron` e verifique as mensagens de inicialização do gateway. [Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1) tem detalhes técnicos completos sobre as mudanças.
