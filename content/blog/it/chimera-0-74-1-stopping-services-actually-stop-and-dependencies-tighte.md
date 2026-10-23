---
title: "Chimera 0.74.1: Stop ai servizi che funziona davvero, e dipendenze più strette"
date: 2026-10-23
category: update
summary: "Corregge un race condition per cui un servizio in arresto spariva dal tracking prima di terminare, e aggiorna due dipendenze indirette con vulnerabilità note."
version: "0.74.1"
---

Il comando `chimera service stop` aveva un race condition che lo rendeva inaffidabile. Dicevi a un servizio in background di fermarsi, lui accettava la richiesta e poi spariva dalla lista dei servizi mentre era ancora in esecuzione. Se subito dopo lanciavi `chimera service stop --now` per forzare l'uccisione di uno shutdown bloccato, la CLI rispondeva "not running" — anche se il processo era vivo e consumava risorse. La versione 0.74.1 elimina questo buco.

## Perché un servizio in arresto diventava invisibile

Un servizio in background di Chimera esegue un loop agente di lunga durata. Quando riceve un segnale di stop, deve completare i turni in volo, flushare lo stato e chiudere le connessioni. Il vecchio codice rimuoveva il record del servizio dal tracker nel momento stesso in cui accettava la richiesta di stop. Era una scorciatoia contabile: il servizio risultava "in arresto" dal suo punto di vista, ma per il resto del sistema non esisteva più.

Il problema immediato era `--now`. Un force-stop cerca nel tracker un ID servizio corrispondente. Se il record non c'è più, il comando risponde che non c'è niente da fermare ed esce. Il processo reale continuava a girare, tenendo lock, socket o memoria GPU, finché non completava la sua pulizia o veniva killato dall'esterno. Per un operatore che debuggava un agente bloccato, questo significava che il tool diceva che era tutto a posto mentre la tabella dei processi mostrava il contrario.

## Cosa cambia la fix per il lifecycle dei servizi

Un servizio ora rimane visibile nel tracker con stato `stopping` dal momento in cui accetta la richiesta di stop fino a quando non esce. Il tracker mantiene il record, quindi ogni chiamata successiva a `stop` o `status` lo vede. Il servizio esegue il suo shutdown graceful — completando il turno corrente, persistendo ciò che serve, chiudendo i loop — e poi si rimuove da solo. Solo dopo che il processo è uscito il record scompare.

Il flag `--now` esiste ancora, ma il suo comportamento è più rigoroso. Invia un force-kill solo dopo aver confermato che il processo tracciato corrisponde all'ID servizio registrato. Se il servizio è già uscito in modo pulito tra l'ultimo check e la chiamata a `--now`, il comando lo segnala invece di sparare un segnale a un PID riciclato. Questo previene kill accidentali di processi non correlati che per caso hanno riutilizzato lo stesso identificativo.

Per chi esegue più servizi Chimera sulla stessa macchina, questo elimina una classe di heisenbug in cui uno script di restart lanciava una nuova istanza mentre la vecchia era ancora in shutdown, perché lo script non poteva vedere la vecchia istanza per attenderla.

## Patch alle dipendenze incluse in questa release

Due dipendenze indirette vengono aggiornate per chiudere advisory di sicurezza. Nessuna delle due è chiamata direttamente dal codice agente di Chimera, ma entrambe risiedono nella supply chain di workflow comuni.

GitPython passa alla 3.2.1. Le versioni fino alla 3.2.0 controllavano il percorso `.git` di un sottomodulo solo dopo averlo clonato, il che permetteva a un repository malevolo di innescare un path traversal durante l'operazione di clone. Questo è rilevante se il tuo agente clona repository come parte di un loop di tool-calling — per esempio, un agente di code-review che fa il checkout di pull request. L'advisory lo classifica come severità alta.

OpenTelemetry passa alla 1.45.1. Il limite precedente, 1.45.0, parsava l'header `tracestate` senza un bound sul numero di entry. Un servizio a valle che riflette `tracestate` illimitato verso il tuo agente strumentato potrebbe causare un uso eccessivo di memoria. Le superfici di tracing proprie di Chimera non sono impattate, ma qualsiasi agente che esporta span a un collector OpenTelemetry via HTTP è esposto tramite l'SDK. L'advisory lo classifica come severità moderata.

Entrambe le patch sono bump di versione minima nell'albero delle dipendenze. Nessuna superficie API cambia. Se blocchi le dipendenze con un lockfile, eseguire di nuovo il resolver dopo aver aggiornato Chimera preleverà le nuove versioni.

## Aggiornamento

Installa la release direttamente:

```
pip install chimera-agent==0.74.1
```

Se usi la CLI di Chimera per gestire servizi in esecuzione, riavvia tutti gli agenti di lunga durata in modo che recepiscano il lifecycle tracking corretto. Le note di release con il changelog completo sono su [Chimera Agent v0.74.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.74.1).
