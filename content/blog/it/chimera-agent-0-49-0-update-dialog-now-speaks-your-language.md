---
title: "Chimera Agent 0.49.0: Il dialogo di aggiornamento ora parla la tua lingua"
date: 2026-09-04
category: update
summary: "Il dialogo di aggiornamento e i messaggi di errore seguono ora la lingua del sistema, con un'opzione di controllo manuale nel tray."
version: "0.49.0"
---

## Traduzioni del dialogo di aggiornamento e controlli manuali

Il dialogo di aggiornamento in Chimera Agent era precedentemente disponibile solo in inglese, indipendentemente dall'impostazione della lingua dell'applicazione. Questo è stato risolto nella versione 0.49.0 — il dialogo segue ora la lingua del sistema operativo. Questo cambiamento risolve una disconnessione per gli utenti che eseguono l'app in una lingua ma vedono messaggi di sistema critici in un'altra.

Il menu nel tray include ora un'opzione **Controlla aggiornamenti**, che rappresenta il primo modo manuale per avviare un controllo degli aggiornamenti. In precedenza, il controllo automatico avveniva silenziosamente all'avvio, senza fornire feedback a meno che non fosse trovato un aggiornamento. Sebbene questo design eviti notifiche non necessarie, lasciava gli utenti senza un modo per confermare di essere aggiornati senza riavviare l'app. Il nuovo controllo manuale fornisce una conferma esplicita quando non ci sono aggiornamenti disponibili, insieme a messaggi di errore chiari se il controllo fallisce.

## Messaggi di errore tradotti con diagnostica invariata

Anche i dialoghi di errore — inclusi i report di crash del backend e l'opzione Esci nel tray — sono ora tradotti. Tuttavia, c'è una distinzione importante su cosa viene tradotto:

- **Istruzioni per l'utente** appaiono nella lingua del sistema (ad esempio, "Chiudi Chimera e riaprilo")
- **Dettagli tecnici** (percorsi dei file, codici di errore, log del backend) rimangono nella loro forma originale

Questa separazione garantisce che gli utenti ricevano indicazioni chiare nella loro lingua preferita, mantenendo al contempo informazioni di errore ricercabili e utili per la risoluzione dei problemi. Un test verifica questo comportamento, confermando che il testo rivolto all'utente proviene dalle tabelle di traduzione mentre i dati diagnostici passano invariati.

## Cosa rimane invariato

Il meccanismo di aggiornamento stesso non è cambiato — i controlli avvengono ancora automaticamente all'avvio, e le installazioni richiedono sempre la conferma dell'utente. L'app non installa mai aggiornamenti senza un permesso esplicito. Un dettaglio sottile ma importante: la versione che mostra il dialogo di aggiornamento è sempre quella attualmente installata, non la nuova versione offerta. Ciò significa che il prompt che offre la 0.49.0 appare nella lingua utilizzata dalla versione corrente — dalla 0.49.0 in poi, corrisponderà alla lingua del sistema.

Per vedere le modifiche, aggiorna alla versione 0.49.0 o controlla manualmente tramite il menu nel tray. I dettagli completi sono nelle [note di rilascio][Chimera Agent v0.49.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.49.0).
