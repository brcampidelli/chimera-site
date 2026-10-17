---
title: "Chimera Agent 0.68.0: política, skills e um build quebrado do desktop"
date: 2026-10-17
category: update
summary: "A 0.68.0 traz política de negação no nível do owner, descoberta local de skills, comandos de prompt no projeto e muito mais — mas não instale o app desktop; use a v0.67.4 até sair a 0.68.1."
version: "0.68.0"
---

O destaque da 0.68.0 não é uma feature. É um aviso: **não instale esta release.** O backend do app desktop não sobe porque o freeze do PyInstaller deixou de fora `chimera.cli.commands.apilogs`, que a CLI importa pelo nome. O pacote PyPI não foi afetado. Se você roda o app desktop, fique na v0.67.4 até a v0.68.1 sair. O resto deste post cobre o que de fato mudou para quem constrói agentes.

## Política do owner sai de bloqueios por ferramenta e vira regras somente de negação

Antes desta release, restringir o que um agente podia acessar significava combinar variáveis de ambiente como `CHIMERA_TOOL_DENYLIST` com regras por projeto. Isso funcionava para ferramentas individuais, mas não dava ao owner da instalação um lugar único para dizer "este provider nunca roda aqui" ou "este servidor MCP nunca conecta".

A 0.68.0 adiciona `<CHIMERA_HOME>/policy.json` — ou o arquivo que `CHIMERA_POLICY_FILE` apontar. As regras são somente de negação e ordenadas. Você pode negar um provider, uma integração (`mcp:<nome>`, `skill:<nome>`) ou uma ferramenta. Um provider negado sai das listas de modelos e da escada de tiers, e suas chamadas são recusadas. Um servidor MCP negado nunca conecta. Uma skill negada nunca é carregada. Uma ferramenta negada é recusada no registry.

A regra de ouro importa: um `allow` posterior só desfaz um `deny` anterior dentro do mesmo arquivo. Ele nunca reabre `CHIMERA_TOOL_DENYLIST`, o piso de alcance ou um bloqueio do kernel. Um arquivo de política inválido para `serve`, `chat`, `assist`, `tui` e `acp`, e faz `doctor` falhar. O app desktop inicia mas recusa toda ferramenta até o arquivo ser corrigido. As ferramentas de escrita do agente não conseguem escrever no arquivo de política.

Esse é um modelo diferente das regras por projeto. É no nível do owner, vale para toda a instalação e não pode ser contornado por um prompt engenhoso ou um arquivo de projeto. Para quem roda uma máquina compartilhada ou um fleet de agentes, essa é a mudança que importa.

## Skills, comandos de prompt e perguntas limitadas

Skills de Agentes Locais agora são descobertas como pacotes revisáveis. Skills encontradas nas árvores `.claude/skills` e `.agents/skills` do workspace e do usuário são importadas pelo caminho de upload limitado. Elas permanecem pendentes e marcadas até serem aprovadas, e voltam para pendente quando o manifesto muda. A API reporta a fonte vencedora e colisões. Isso significa que uma skill não é confiada silenciosamente só porque está numa pasta.

Comandos de prompt em Markdown de projeto e globais funcionam do mesmo jeito. O chat no terminal e a TUI descobrem templates com namespace em `.chimera/commands/` e `<CHIMERA_HOME>/commands/`. Templates expandem `$ARGUMENTS` e `$1` em texto comum de mensagem. O conteúdo do template nunca é executado. Isso dá aos projetos uma forma de distribuir prompts repetíveis sem conceder ao template qualquer poder de execução.

O agente Code agora pode fazer uma pergunta limitada ao usuário. `ask_user` pausa um turno assistido do Code para uma resposta de opção ou texto livre, retorna um resultado explícito de sem-resposta no timeout e permanece como um tipo distinto somente de dados que não pode aprovar uma ação governada. Turnos de terminal, bot e não assistidos não o registram. Isso fecha uma lacuna: antes, um turno do Code que precisava de uma decisão do usuário não tinha uma forma estruturada de parar e perguntar.

## O que fazer agora

Se você usa o app desktop, não atualize. Fique na v0.67.4. Se você usa o pacote PyPI, pode instalar a 0.68.0 e começar pelo arquivo de política: crie `<CHIMERA_HOME>/policy.json`, escreva suas regras de negação e rode `chimera policy show` para ver as regras em vigor. As notas de release completas estão em [Chimera Agent v0.68.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.68.0).
