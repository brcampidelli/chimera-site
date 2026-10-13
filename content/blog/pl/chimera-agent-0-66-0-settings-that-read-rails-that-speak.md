---
title: "Chimera Agent 0.66.0: Configurações que se leem, trilhos que falam"
date: 2026-10-13
category: update
summary: "Settings passa a ser um documento navegável, o trilho e o compositor deixam de esconder os seus controlos, e Work, Memory e Profile deixam de falar em identificadores."
version: "0.66.0"
---

## O que mudou para quem constrói agentes

Esta versão aperta as partes da aplicação que estavam tecnicamente presentes mas eram praticamente invisíveis. As Settings são o exemplo mais claro. Eram uma única lista de scroll onde Appearance vivia dentro de General, e onde linhas para key pools, MCP, sandbox e diagnósticos partilhavam espaço com preferências do dia-a-dia. Isto tornava o ecrã difícil de percorrer e ainda mais difícil de referenciar. Na 0.66.0, as Settings lêem-se como um documento com um índice. As secções ficam ao lado do conteúdo numa janela larga, Appearance é a sua própria secção, e as linhas que a maioria nunca muda recolhem-se em Advanced. Nada foi removido; foi apenas tirado do caminho.

A mesma lógica aplica-se ao trilho do ambiente de trabalho. Cinco ícones com nomes apenas ao passar o rato obrigavam as pessoas a lembrar o que cada destino era. Agora o trilho escreve o nome por baixo de cada ícone. O compositor do ecrã de Code segue o mesmo princípio. Os seletores de quem executa o turn, perfil de custo, modelo e estilo ocupavam quatro linhas acima da caixa de mensagem. Agora começam como uma linha de chips, e a linha inteira os abre. Armed Fuse e Plan aparecem primeiro como contornos pressionados, o que deixa Send como o único botão preenchido na linha. A mudança é pequena, mas remove a competição visual entre configuração e ação.

## Onde a aplicação deixou de falar a sua própria língua

Vários ecrãs imprimiam identificadores internos em vez de significado. Os tipos de Memory apareciam como episodic e semantic em monospace em cada linha. As Schedules eram descritas em inglês independentemente do idioma da aplicação. O Profile mostrava ids de origem como chat e extracted, mais a flag tainted do store, em inglês para qualquer locale. As linhas de learned-skills faziam o mesmo com tainted e retire?, e a segunda usava o vermelho de uma falha. Work › Git pedia confirmação através da caixa de confirm do browser, que não conseguia nomear os ficheiros e não se parecia com a aplicação.

Cada um destes era um local onde a interface expunha o modelo de dados em vez da decisão. Esta versão traduz os tipos de Memory, descreve as schedules na língua da aplicação, e faz o Profile dizer de onde veio um facto numa frase. As contagens não verificadas e a nota de no OS sandbox passam de vermelho para âmbar, porque são condições a rever, não erros. A questão de descartar no Git aparece agora por baixo do botão, a vermelho, com Cancel primeiro, e cada checkbox de ficheiro tem um nome. Em português, Connections e Usage também deixam de usar jargão: Ferramentas externas (MCP), Ferramentas, e APIs (OpenAPI) substituem os rótulos anteriores.

## O que fazer agora

Atualize para a 0.66.0 e abra as Settings. A nova secção Appearance é onde vivem a cor de destaque, o tom da superfície e a opção de alto contraste, e cada combinação é verificada quanto ao contraste. Depois abra Work › Runs e use o filtro de pesquisa e resultado num histórico longo; as tentativas anteriores de uma run recolhem-se sob aquela que a decidiu. Se mantém links para dentro da aplicação, note que os separadores Knowledge e Automation agora têm endereços, por isso sobrevivem a um reload e respondem ao botão de voltar atrás. A lista completa está nas notas de versão. [Chimera Agent v0.66.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.66.0)
