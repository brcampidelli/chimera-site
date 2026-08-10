# Chamado Hostinger — falha de handshake TLS nos endpoints IPv6 do CDN

> Rascunho para colar no suporte. Escrito em PT-BR; há uma versão em inglês no fim, caso o
> atendimento seja em inglês. Os números vêm de medições feitas em 2026-08-10.

---

## Assunto

CDN (hcdn): ~35% dos handshakes TLS falham nos endpoints IPv6 de chimeraagent.space — IPv4 sem falha

## Corpo

Olá,

O domínio **chimeraagent.space** (hospedagem Cloud, CDN da Hostinger ativo até hoje) apresenta falha
intermitente de conexão **somente sobre IPv6**. Cerca de um terço das conexões TLS novas é
encerrada antes de qualquer resposta HTTP. Sobre IPv4, no mesmo instante e da mesma máquina, não há
uma única falha.

### Medições

Cada linha são 40 conexões novas (`curl`, uma conexão por requisição, sem reuso):

| destino | família | resultado |
|---|---|---|
| chimeraagent.space | IPv4 | **40/40 OK** — 0% de falha |
| chimeraagent.space | IPv6 | 26/40 — **35% de falha** |
| chimeraagent.space (forçando HTTP/1.1) | IPv6 | 25/40 — 37,5% de falha |
| www.chimeraagent.space | IPv4 | 25/25 OK |
| www.chimeraagent.space | IPv6 | 16/25 — 36% de falha |
| www.google.com (controle) | IPv6 | 40/40 OK |
| www.hostinger.com (controle) | IPv6 | 40/40 OK |

### Modo de falha

Nas tentativas que falham, o `curl` retorna:

```
http_code = 000    exit = 35   (SSL connect error)
```

`http_code = 000` significa que **nenhuma resposta HTTP chega** — a conexão morre durante o
handshake TLS. Não é 429, não é 5xx, não é timeout de aplicação. O log verboso mostra renegociação
de TLS repetida antes da queda:

```
* Trying [2a02:4780:18:5524:a18e:7b39:8f6:8386]:443...
* schannel: remote party requests renegotiation
* schannel: renegotiating SSL/TLS connection
* schannel: remote party requests renegotiation
* schannel: renegotiating SSL/TLS connection
```

### Endereços envolvidos

O domínio não tem registros A/AAAA próprios: o apex é `ALIAS → chimeraagent.space.cdn.hstgr.net` e
o `www` é `CNAME → www.chimeraagent.space.cdn.hstgr.net`. Portanto os endereços abaixo são entregues
pelo CDN de vocês, não pela minha zona:

```
AAAA  2a02:4780:18:5524:a18e:7b39:8f6:8386
AAAA  2a02:4780:2e:ab74:3e1a:a3f8:ce9d:1e39
```

Testados individualmente (15 conexões cada), **os dois falham**: 11/15 e 9/15 de sucesso. Como os
endereços variam entre consultas (anycast/GeoDNS), o problema parece estar num subconjunto dos nós
de borda IPv6, não num endereço específico.

### A origem está saudável nas DUAS famílias — o defeito é a borda

Depois de desativar o CDN, a zona passou a apontar direto para a hospedagem. Testando **o servidor
de origem diretamente**, com SNI, 20 conexões novas por família:

| destino | família | resultado |
|---|---|---|
| `217.196.57.191` (origem) | IPv4 | **20/20 OK** |
| `2a02:4780:13:1821:0:2eaa:c763:5` (origem) | IPv6 | **20/20 OK** |

Ou seja: o mesmo domínio, o mesmo certificado, o mesmo conteúdo, **sobre IPv6, sem uma única falha**
quando servido pela origem. As falhas de 35% acontecem apenas quando a conexão passa pelos nós de
borda IPv6 do CDN. Isso isola o problema na camada de vocês, não na hospedagem nem no meu lado.

### O que já foi descartado

- **Não é a minha rede nem a minha máquina** — google.com e hostinger.com por IPv6 vão 40/40 do
  mesmo host, na mesma janela de tempo.
- **Não é a Hostinger em geral** — www.hostinger.com por IPv6 é perfeito.
- **Não é HTTP/2** — forçando HTTP/1.1 a taxa de falha é a mesma.
- **Não é a versão de TLS** — limitando a TLS 1.2 as falhas continuam.
- **Não é verificação de revogação (OCSP/CRL)** — com `--ssl-no-revoke` as falhas continuam.
- **Não é limite de taxa** — um 429 devolveria código HTTP; aqui não há resposta alguma. E o IPv4
  simultâneo, sob a mesma carga, vai 100%.
- **A origem está saudável** — o painel do CDN reporta `5xx = 0` nos últimos 7 dias.

### Detalhe possivelmente relevante

O certificado SSL do domínio consta como **criado em 2026-08-09**, ou seja, na véspera das medições.
Se a reemissão foi propagada para os nós IPv4 e ficou incompleta em parte dos nós IPv6, isso
explicaria falha intermitente de handshake exatamente com este padrão. Vale conferir a
consistência do certificado/cadeia entre as duas famílias de endereço.

### Impacto

Visitantes com IPv6 — muito comuns em redes móveis — encontram o site indisponível em cerca de uma
tentativa a cada três, sem página de erro: a conexão simplesmente cai.

### Mitigação aplicada — e um segundo problema que ela revelou

Desativei o CDN para este domínio pelo hPanel, como medida temporária. A desativação reescreveu a
zona corretamente (o apex passou de `ALIAS → chimeraagent.space.cdn.hstgr.net` para `A 217.196.57.191`
+ `AAAA 2a02:4780:13:1821:0:2eaa:c763:5`).

**Porém o botão "Ativar" ficou desabilitado**, com a mensagem: *"O domínio não está apontando para os
nameservers da Hostinger nem para o endereço de IP atribuído"*. Isso não confere: os nameservers são
os de vocês (`ns1.dns-parking.com` / `ns2.dns-parking.com`) e o apex aponta exatamente para o IP
atribuído. O que acontece é que a verificação parece ser feita contra a resolução pública, que ainda
devolve os IPs de borda do CDN durante as 24–48 h de propagação — ou seja, **a desativação deixa o
CDN travado como inativo até a propagação terminar, sem possibilidade de reverter no meio do
caminho.** Isso transforma o que deveria ser um interruptor reversível numa decisão de mão única por
até dois dias, e vale corrigir independentemente do problema de IPv6.

### O que peço

1. Verificação dos nós de borda IPv6 que atendem `chimeraagent.space.cdn.hstgr.net`.
2. Confirmação de que o certificado e a cadeia estão íntegros e idênticos em IPv4 e IPv6.
3. Retorno sobre quando o CDN poderá ser reativado com IPv6 confiável.
4. Que a reativação do CDN não fique bloqueada durante a janela de propagação da desativação
   (ver acima) — ou, se puderem, a reativação manual desta conta assim que o item 1 estiver resolvido.

Obrigado.

---

## English version

**Subject:** CDN (hcdn): ~35% of TLS handshakes fail over IPv6 for chimeraagent.space — IPv4 is clean

Hello,

The domain **chimeraagent.space** (Cloud hosting, Hostinger CDN) fails intermittently **over IPv6
only**. About a third of new TLS connections are dropped before any HTTP response. Over IPv4, from
the same machine at the same moment, there is not a single failure.

Each row below is 40 fresh connections (`curl`, one connection per request, no reuse):

| target | family | result |
|---|---|---|
| chimeraagent.space | IPv4 | **40/40 OK** — 0% failure |
| chimeraagent.space | IPv6 | 26/40 — **35% failure** |
| chimeraagent.space (forced HTTP/1.1) | IPv6 | 25/40 — 37.5% failure |
| www.chimeraagent.space | IPv4 | 25/25 OK |
| www.chimeraagent.space | IPv6 | 16/25 — 36% failure |
| www.google.com (control) | IPv6 | 40/40 OK |
| www.hostinger.com (control) | IPv6 | 40/40 OK |

Failing attempts return `http_code = 000`, `curl exit = 35` (SSL connect error) — **no HTTP response
at all**; the connection dies during the TLS handshake. Verbose output shows repeated TLS
renegotiation requested by the remote party just before the drop.

The domain has no A/AAAA records of its own: the apex is `ALIAS → chimeraagent.space.cdn.hstgr.net`
and `www` is a `CNAME` to the same CDN hostname, so these addresses are served by your CDN:

```
AAAA  2a02:4780:18:5524:a18e:7b39:8f6:8386
AAAA  2a02:4780:2e:ab74:3e1a:a3f8:ce9d:1e39
```

Tested individually (15 connections each), **both fail**: 11/15 and 9/15 success.

**The origin is healthy on both families — the fault is the edge.** After disabling the CDN the zone
began pointing straight at the hosting server. Testing that origin directly, with SNI, 20 fresh
connections per family: `217.196.57.191` (IPv4) **20/20 OK**, and
`2a02:4780:13:1821:0:2eaa:c763:5` (IPv6) **20/20 OK**. Same domain, same certificate, same content —
over IPv6, with zero failures — as long as the request does not go through your IPv6 edge.

**A second issue the mitigation exposed:** after disabling, the "Enable" button is greyed out with
*"the domain is not pointing to Hostinger nameservers nor to the assigned IP address"*. That is not
accurate — the nameservers are yours (`ns1.dns-parking.com` / `ns2.dns-parking.com`) and the apex now
points at exactly the assigned IP. The check appears to run against public resolution, which still
returns CDN edge IPs during the 24–48h propagation window. The practical effect is that disabling the
CDN cannot be undone until propagation finishes — a one-way decision for up to two days, which is
worth fixing regardless of the IPv6 fault.

Already ruled out: my network (Google/Hostinger over IPv6 are perfect from the same host), HTTP/2
(same rate on HTTP/1.1), TLS version (same on TLS 1.2), revocation checking (same with
`--ssl-no-revoke`), and rate limiting (a 429 would return an HTTP code; here there is none, and
simultaneous IPv4 is 100%). Your CDN panel reports `5xx = 0` over the last 7 days, so the origin is
healthy.

Possibly relevant: the SSL certificate is listed as **issued on 2026-08-09**, the day before these
measurements. An incomplete propagation of the reissued certificate to part of the IPv6 edge fleet
would produce exactly this pattern. Please verify certificate/chain consistency across both address
families.

**Impact:** IPv6 visitors — very common on mobile networks — get no page at all on roughly one
attempt in three.

**Mitigation applied:** I disabled the CDN for this domain in hPanel as a temporary measure
(understanding propagation takes 24–48h). I would rather re-enable it once IPv6 is reliable.

**Requested:** (1) check the IPv6 edge nodes serving `chimeraagent.space.cdn.hstgr.net`;
(2) confirm the certificate and chain are intact and identical on IPv4 and IPv6; (3) let me know
when the CDN can be re-enabled with reliable IPv6.

Thank you.

---

## Como reproduzir (para anexar, se pedirem)

```bash
# 40 conexões novas por família. Falha aparece como código 000 / exit 35.
for i in $(seq 1 40); do curl -4 -s -o /dev/null -m 20 -w '%{http_code}\n' https://chimeraagent.space/en/; done | sort | uniq -c
for i in $(seq 1 40); do curl -6 -s -o /dev/null -m 20 -w '%{http_code}\n' https://chimeraagent.space/en/; done | sort | uniq -c

# Um endereço IPv6 específico
curl -6 -v -s -o /dev/null -m 20 --resolve 'chimeraagent.space:443:[2a02:4780:18:5524:a18e:7b39:8f6:8386]' \
  https://chimeraagent.space/en/
```

⚠️ Ressalva de honestidade, para não prometer mais do que foi medido: as medições acima vêm de
**uma** pilha TLS (Schannel, no Windows) sobre IPv6. Não foi possível testar OpenSSL sobre IPv6
(o ambiente Linux usado não tem IPv6 roteável), e o teste feito pelo Chromium usou conexão reusada,
o que não exercita o handshake. Logo: o endpoint IPv6 é comprovadamente instável a partir deste
cliente, com todos os controles limpos — mas não está provado que todo cliente IPv6 é afetado.
