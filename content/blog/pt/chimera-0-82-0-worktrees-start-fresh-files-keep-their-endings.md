---
title: "Chimera 0.82.0: Worktrees começam do zero, arquivos mantêm suas terminações"
date: 2026-11-01
category: update
summary: "Worktrees agora clonam do remote em vez de um checkout local desatualizado, gravações de arquivo preservam quebras de linha, e o agente pergunta antes de agir onde comandos estão desligados."
version: "0.82.0"
---

## Worktrees partem do remote, não de um checkout local desatualizado

Antes, um worktree novo ramificava a partir do que estivesse checked out localmente. Se o clone local estivesse dias atrasado, o agente partia de código velho e nunca sabia. O primeiro turno podia perder tempo com problemas já resolvidos ou introduzir conflitos que só apareciam depois.

Agora, uma solicitação de worktree busca a branch padrão do remote e cria o worktree a partir desse commit. A saída informa de qual commit partiu. Quando o fetch não alcança o remote, o agente recua para o HEAD local e avisa você. O fetch nunca pede credenciais, então a operação não trava esperando uma entrada que não pode chegar.

Isso importa porque um agente que parte de código desatualizado produz trabalho que parece correto isoladamente, mas falha contra o estado atual do repositório. A mudança remove uma fonte silenciosa de divergência entre o que o agente vê e o que o resto do time vê.

## Arquivos que o Chimera grava mantêm suas quebras de linha

As gravações de arquivo do agente passavam por um modo texto que convertia toda nova linha para CRLF no Windows. Um arquivo criado no Windows discordava da convenção LF do repositório, e um hash de tradução que passava localmente falhava na CI. A discrepância era difícil de rastrear porque o arquivo parecia idêntico numa ferramenta de diff que normaliza quebras de linha.

As gravações agora são byte a byte exatas. Um arquivo novo recebe LF. Um arquivo CRLF existente mantém CRLF. Hashes de tradução ignoram quebras de linha, então um hash calculado em uma plataforma coincide com o hash calculado em outra. A correção remove uma falha específica de plataforma que quebrava pipelines de CI e forçava desenvolvedores a depurar uma saída do agente que eles não podiam ver.

## O agente pergunta antes de agir onde comandos estão desligados

Uma solicitação de código em uma pasta com comandos desabilitados costumava rodar ferramentas por uma hora e só então relatar que não podia verificar nada. O agente editava, não testava nada e entregava uma resposta não verificada. O dono descobria o problema depois do fato.

Agora, o agente para antes de qualquer ferramenta rodar e pergunta ao dono se permite comandos, continua sem eles ou cancela. Só a tela do dono pode conceder permissão. Um turno sem ninguém na tela nunca espera — ele prossegue sem comandos. A escolha é lembrada por conversa, e uma resposta não verificada declara esse fato no topo. A mudança evita trabalho desperdiçado e torna a restrição visível antes de o agente agir.

## Outras correções que mudam o uso diário

Uma ferramenta de verificação ausente não marca mais um turno como falho. Quando a checagem após um turno não pode rodar porque seu programa não está instalado — `vitest` em um worktree novo sem `node_modules` — o turno aparece como não verificado, com o motivo e a correção. Um comando `setup` em `.chimera/verify.toml` instala o que está faltando. Uma checagem cujos testes rodaram e falharam ainda aparece como falha. A distinção permite ver se a saída do agente quebrou testes ou se o executor de testes simplesmente estava ausente.

Uma extração de memória com falha não é mais silenciosa. Quando a extração por trás de um turno de Código não consegue iniciar, o app registra um aviso com o tipo de erro — nunca a conversa ou uma chave — e o turno ainda responde. Antes, a falha não deixava rrastro e você não podia dizer por que o agente parecia esquecer contexto.

O app instalado mantém suas chaves seja qual for a pasta de onde é aberto. O backend costumava ler o `.env` da pasta de lançamento e gravar essa pasta para o serviço em segundo plano. Um app aberto de um terminal em outro lugar iniciava sem chave de provedor e cada turno falhava. O atalho do menu Iniciar escondia o problema. Uma build empacotada agora semre roda seu backend na pasta de instalação.

Um tweak numérico se aplica quando você termina de digitar, não a cada tecla. Digitar `34` em um tweak que vai de 28 a 56 enviava `3` primeiro, era rejeitado e voltava ao valor anterior. O campo agora aplica uma vez, ao sair do campo ou pressionar Enter, limita ao intervalo, e Esc descarta o rascunho.

O README não chama mais o Chimera de autoevolutivo. Sete execuções de aprendizado pré-registradas não encontraram ganho mensurável, então o título, descrição do pacote, ajuda da CLI, app e READMEs traduzidos agora dizem o que as evidências suportam: um agente governado que publica seus próprios resultados nulos. Os READMEs traduzidos também não prometem mais um teste A/B que o loop de aprendizado não executa.

A ponte pagina e filtra a lista de conversas. Listar conversas pela ponte do Claude retornava todas as 1.465 de uma vez. Agora aceita `limit`, `cursor`, `state`, `project` e `q`, padroniza 50 por págia na ponte, e a lista sem parâmetros da tela permanece inalterada.

Atualize com `pip install --upgrade chimera-agent` e leia as notas completas em [Chimera Agent v0.82.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.82.0).
