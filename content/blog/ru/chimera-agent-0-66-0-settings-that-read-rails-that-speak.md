---
title: "Chimera Agent 0.66.0: Configurações que se leem, trilhos que falam"
date: 2026-10-13
category: update
summary: "Configurações vira um documento navegável, a barra lateral e o compositor param de esconder seus controles, e Trabalho, Memória e Perfil param de falar em identificadores."
version: "0.66.0"
---

## O que mudou para quem constrói agentes

A versão aperta as partes do app que estavam tecnicamente presentes, mas praticamente invisíveis. Configurações é o exemplo mais claro. Era uma lista única e rolável onde Aparência ficava dentro de Geral, e onde linhas de key pools, MCP, sandbox e diagnósticos dividiam espaço com preferências do dia a dia. Isso tornava a tela difícil de escanear e mais difícil de referenciar. Na 0.66.0, Configurações se lê como um documento com sumário. As seções ficam ao lado do conteúdo em uma janela larga, Aparência é sua própria seção, e as linhas que a maioria nunca muda se recolhem em Avançado. Nada foi removido; foi tirado do caminho.

A mesma lógica se aplica à barra lateral. Cinco ícones com nomes só no hover forçavam as pessoas a lembrar o que cada destino era. Agora a barra escreve o nome sob cada ícone. O compositor da tela de Código segue o mesmo princípio. Os seletores de quem executa o turno, perfil de custo, modelo e estilo ocupavam quatro linhas acima da caixa de mensagem. Agora eles começam como uma linha de chips, e a linha inteira os abre. Armed Fuse e Plan primeiro aparecem como contornos pressionados, o que deixa Enviar como o único botão preenchido da linha. A mudança é pequena, mas elimina a competição visual entre configuração e ação.

## Onde o app parou de falar sua própria língua

Várias telas imprimiam identificadores internos em vez de significado. Tipos de memória apareciam como episodic e semantic em monoespaçado em cada linha. Agendamentos eram descritos em inglês independentemente do idioma do app. Perfil mostrava ids de origem como chat e extracted, mais a flag tainted do armazenamento, em inglês para qualquer localidade. As linhas de habilidades aprendidas faziam o mesmo com tainted e retire?, e a segunda usava o vermelho de uma falha. Trabalho › Git pedia confirmação pela caixa de diálogo do navegador, que não conseguia nomear os arquivos e não parecia parte do app.

Cada um desses era um lugar onde a interface expunha o modelo de dados em vez da decisão. A versão traduz os tipos de Memória, descreve agendamentos no idioma do app e faz o Perfil dizer de onde um fato veio em uma frase. Contagens não verificadas e o aviso de ausência de sandbox do SO passam de vermelho para âmbar, porque são condições a revisar, não erros. A pergunta de descarte do Git agora fica sob o botão, em vermelho, com Cancelar primeiro, e cada checkbox de arquivo tem um nome. Em português, Conexões e Uso também abandonam o jargão: Ferramentas externas (MCP), Ferramentas e APIs (OpenAPI) substituem os rótulos anteriores.

## O que fazer agora

Atualize para 0.66.0 e abra Configurações. A nova seção Aparência é onde a cor de destaque, o tom de superfície e a opção de alto contraste ficam, e cada combinação é verificada quanto ao contraste. Depois abra Trabalho › Execuções e use a busca e o filtro de resultado em um histórico longo; as tentativas anteriores de uma execução se recolhem sob a que decidiu. Se você mantém links para dentro do app, note que as abas Conhecimento e Automação agora têm endereços, então sobrevivem a um reload e respondem ao botão voltar. A lista completa está nas notas da versão. [Chimera Agent v0.66.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.66.0)
