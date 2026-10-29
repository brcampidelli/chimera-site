---
title: "Chimera 0.79.1: Approvals que Funcionam, Conectores que Iniciam, e Designs com Forma"
date: 2026-10-29
category: update
summary: "A 0.79.1 corrige condições de corrida na aprovação de design, conectores quebrados no Windows, inundação de contexto por base64 e primeiras propostas em branco — além de persistência de permissão por projeto."
version: "0.79.1"
---

## O que quebrava as aprovações — e o que impede a corrida agora

Antes desta release, aprovar um design podia falhar com uma mensagem confusa: “outro processo do Chimera fez esta pergunta.” A falha não tinha nada a ver com outro processo. A aprovação de design é respondida como uma pergunta na própria conversa, e a resposta aparece na janela de aprovações, na barra de status e na lista de Governança. Apenas a tela do owner pode respondê-la. O problema era que duas respostas chegando ao mesmo tempo podiam colidir, e o sistema não tinha como registrar exatamente uma e seguir adiante. O erro era ruído, mas bloqueava a aprovação e deixava o usuário sem um caminho claro de recuperação.

A versão 0.79.1 trata isso corretamente. Quando duas respostas chegam à aprovação ao mesmo tempo, exatamente uma é registrada — a corrida é resolvida, não rejeitada. A aprovação é concluída, o design avança e o usuário vê um estado consistente nas três superfícies da UI. Quem constrói agentes que geram output de design e o encaminham por uma etapa de aprovação humana agora pode contar com o fluxo de Governança sem um crash intermitente que, no fundo, nunca foi sobre concorrência.

## Uma proposta de design que não é texto em branco

O Chimera Design tinha um problema mais profundo: sua primeira proposta era praticamente inútil. O modelo retornava uma operação malformada, o sistema exibia um erro bruto que o modelo não conseguia reparar, e a conversa empacava. Mesmo quando a operação era estruturalmente válida, a proposta em si era texto puro — sem tipografia, sem planos de fundo, sem formas. Isso significava que a primeira interação com o Design era um prompt pedindo output visual e não recebendo nada visual de volta.

A correção tem quatro partes. Uma operação malformada agora retorna como um erro de argumento que o modelo consegue corrigir, então a conversa se autocorrige em vez de parar. Cada operação mostra sua forma esperada, o que dá ao modelo um alvo que ele pode atingir. Quando uma proposta é truncada por tentar empacotar operações demais em um único turno, o sistema detecta o truncamento e pergunta de novo com menos operações. Por fim, a primeira proposta solicita tipografia, planos de fundo e formas por padrão — o output começa visual desde o primeiro turno. O resultado é uma primeira proposta utilizável, sem um loop manual de retentativas.

## Conectores que iniciam, e arquivos que não inundam o contexto

Duas correções de infraestrutura importam para quem conecta ferramentas externas. Primeiro, usuários Windows executando conectores via lançadores `.cmd` — Supabase via `npx` é o caso comum — enfrentavam uma quebra silenciosa quando o comando do conector continha um `&` na URL. O lançador interpretava o caractere, o comando se dividia e o conector nunca iniciava. O Chimera agora recusa um argumento que não pode ser passado com segurança e informa o motivo, então a falha é explícita e corrigível. O app também não espera mais os servidores MCP conectarem para abrir. Antes, a UI podia ficar em “Failed to fetch” por até dois minutos enquanto os conectores expiravam. O serviço abre imediatamente, e as conexões se resolvem em segundo plano.

Segundo, conectores que retornam áudio ou imagens inline — a narração do VoiceStudio, por exemplo — costumavam despejar base64 diretamente no contexto do modelo. O modelo tinha que ler o blob codificado como texto, o que preenchia a janela de contexto e interrompia o turno. Esses arquivos agora são salvos na pasta `mcp-output/` do projeto, mantidos fora dos commits, e a conversa os referencia como artefatos reproduzíveis ou visualizáveis. O modelo nunca vê os bytes brutos, e o turno é concluído sem exaustão de contexto.

## Estado de permissão que sobrevive a um restart

O switch “Ignore permissions” agora reside no nível do projeto e persiste entre reinicializações. Um switch no nível do projeto cobre todas as suas conversas, inclusive as novas, enquanto cada conversa ainda mantém seu próprio toggle independente. Ligar o switch do projeto libera imediatamente cards que já estão aguardando permissão. Após um restart, um banner lista cada projeto e conversa salvos que estavam com o switch ligado; você confirma com um clique para reativá-los, e o resto é descartado. Apenas a tela do desktop pode ligar o switch, e desligá-lo sempre se aplica em todos os lugares — a fronteira de segurança é unidirecional.

## O que fazer agora

Atualize com `pip install chimera-agent==0.79.1`. Se você usa Design, inicie uma nova proposta e verifique se a primeira resposta inclui estrutura visual. Se você roda no Windows com Supabase ou qualquer conector baseado em `npx`, confira se o conector inicia sem escape manual de argumentos. As notas completas estão em [Chimera Agent v0.79.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.79.1).
