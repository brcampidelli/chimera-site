---
title: "Chimera Agent 0.66.0: Configurações que se leem, trilhos que falam"
date: 2026-10-13
category: update
summary: "Configurações vira um documento navegável, o trilho e o composer param de esconder seus controles, e Work, Memory e Profile param de falar em identificadores."
version: "0.66.0"
---

## O que mudou para quem constrói agentes

A release aperta as partes do app que estavam tecnicamente presentes, mas praticamente invisíveis. Configurações é o exemplo mais claro. Era uma lista única de rolagem onde Aparência ficava dentro de Geral, e onde linhas de key pools, MCP, sandbox e diagnósticos dividiam espaço com preferências do dia a dia. Isso tornava a tela difícil de escanear e mais difícil ainda de linkar. Na 0.66.0, Configurações se lê como um documento com sumário. As seções ficam ao lado do conteúdo em janela larga, Aparência é uma seção própria, e as linhas que a maioria nunca muda se recolhem em Avançado. Nada foi removido; foi tirado do caminho.

A mesma lógica se aplica ao trilho do desktop. Cinco ícones com nomes só no hover forçavam as pessoas a lembrar o que cada destino era. Agora o trilho escreve o nome embaixo de cada ícone. O composer da tela de Code segue o mesmo princípio. Os seletores de quem executa o turno, perfil de custo, modelo e estilo ocupavam quatro linhas acima da caixa de mensagem. Agora começam como uma linha de chips, e a linha inteira os abre. Armed Fuse e Plan primeiro aparecem como contornos pressionados, o que deixa Send como o único botão preenchido da linha. A mudança é pequena, mas remove a competição visual entre configuração e ação.

## Onde o app parou de falar a própria língua

Várias telas imprimiam identificadores internos em vez de significado. Os tipos de Memory apareciam como episodic e semantic em monoespaçada em cada linha. Schedules eram descritos em inglês independentemente do idioma do app. Profile mostrava ids de origem como chat e extracted, além da flag tainted do store, em inglês para qualquer locale. As linhas de learned-skills faziam o mesmo com tainted e retire?, e a segunda usava o vermelho de uma falha. Work › Git pedia confirmação pela caixa de confirm do navegador, que não conseguia nomear os arquivos e não parecia o app.

Cada um desses era um lugar onde a interface expunha o modelo de dados em vez da decisão. A release traduz os tipos de Memory, descreve schedules no idioma do app e faz Profile dizer de onde um fato veio em uma frase. Contagens não verificadas e a nota de no OS sandbox saem do vermelho para o âmbar, porque são condições a revisar, não erros. A pergunta de descarte do Git agora fica embaixo do botão, em vermelho, com Cancel primeiro, e cada checkbox de arquivo tem um nome. Em português, Connections e Usage também param de usar jargão: Ferramentas externas (MCP), Ferramentas e APIs (OpenAPI) substituem os rótulos anteriores.

## O que fazer agora

Atualize para a 0.66.0 e abra Configurações. A nova seção Aparência é onde vivem a cor de destaque, o tint de superfície e a opção de alto contraste, e cada combinação é verificada quanto a contraste. Depois abra Work › Runs e use a busca e o filtro de outcome em um histórico longo; as tentativas anteriores de um run se recolhem sob a que decidiu. Se você mantém links para dentro do app, note que as abas Knowledge e Automation agora têm endereços, então sobrevivem a um reload e respondem ao botão voltar. A lista completa está nas notas da release. [Chimera Agent v0.66.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.66.0)
