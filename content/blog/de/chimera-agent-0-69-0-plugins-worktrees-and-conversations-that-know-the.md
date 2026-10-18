---
title: "Chimera Agent 0.69.0: Plugins, Worktrees und Konversationen, die ihr Repository kennen"
date: 2026-10-18
category: update
summary: "Claude Code Plugins kommen als inspizierbare Daten, jede Konversation speichert Repository und Branch, und die Sidebar gruppiert Worktrees endlich unter einem Projekt."
version: "0.69.0"
---

## Plugins als Daten, nicht als laufender Code

Vor diesem Release war ein Plugin ein undurchsichtiges Verzeichnis, das man Chimera übergab und hoffte, dass es funktioniert. Das Framework hatte kein Vokabular dafür, was ein Plugin enthielt, bevor es lief, und keine Möglichkeit, es zu inspizieren, ohne es auszuführen. Diese Lücke machte Plugins in geteilten Umgebungen riskant und vor der Installation nicht bewertbar.

`chimera.plugins` ändert das Modell grundlegend. Es liest ein Plugin-Verzeichnis – sein Manifest, Skills, Commands, Agents, Hooks, MCP- und LSP-Server – und klassifiziert jede Komponente danach, was sie tun würde, wenn sie liefe: reine Text-Anweisungen, ein lokaler Prozessstart, Netzwerkzugriff oder Befehlsausführung. Nichts wird während dieser Inspektion installiert, importiert, ausgeführt oder heruntergeladen. Nur gepinnte Quellen gelten als installierbar: ein lokaler Pfad, ein auf einen Commit-SHA gepinntes GitHub-Repository oder ein HTTPS-Archiv mit einem sha256-Hash. Jedes Problem trägt einen stabilen Fehlercode, kompatibel zu `claude plugin validate`, sodass du das in einen Pre-Commit-Hook oder einen CI-Check einbauen kannst, bevor ein Plugin jemals einen Agenten berührt.

Dieselbe Leselogik treibt die Marketplace-Integration an. `chimera.plugins` liest eine `marketplace.json` und klassifiziert jedes gelistete Plugin nach seiner Fähigkeitsoberfläche. Einträge ohne Pin bleiben sichtbar, mit dem Grund, warum sie nicht installiert werden können, sodass du browsen kannst, ohne versehentlich etwas Veränderliches zu pullen.

Plugins werden deaktiviert installiert. `chimera plugin install` legt sie in `<home>/plugins` als ausstehend ab, und nichts erreicht den Agenten, bis du `chimera plugin enable` ausführst. Das Aktivieren zeigt das Diff: Skills, Commands und Agents erscheinen mit Namespace unter `plugin:name` als nicht vertrauenswürdiger Text. Agents folgen den Projekt-Agent-Regeln; Claude Code Tool-Namen werden übersetzt und können bestehende Berechtigungen nur einschränken; `allowed-tools`- und `model`-Felder im Manifest werden ignoriert. Eine Plugin-Command-Erweiterung markiert den Lauf als beeinträchtigt, und Hooks, `bin/`-Verzeichnisse und Monitore bleiben inaktiv. MCP-Server werden nur hinzugefügt, wenn du sie explizit benennst, durch einen Pinned-Manifest-Hold. Ein Update, das Manifest, Hooks, Server oder Tools ändert, hält das Plugin mit angezeigtem Diff zurück. Bots, Cron-Jobs, `serve` und Gast-Sitzungen erhalten kein Plugin, außer `CHIMERA_UNATTENDED_PLUGINS` listet es explizit.

Der Bildschirm Einstellungen › Plugins zeigt jedes installierte Plugin mit Status, Quelle, Pin, Fähigkeitslinie und Komponentenliste. Entdecken zeigt die von dir hinzugefügten Marketplaces mit Suche und Filtern nach Kategorie und danach, was ein Plugin ausführt. Hinzufügen akzeptiert einen gepinnten Marketplace, einen lokalen Ordner oder eine `.zip`. Das Einschalten eines Plugins zeigt exakt, was den Agenten erreichen wird, und fragt für jeden MCP-Server separat. Nur du kannst das tun: Die MCP-Bridge kann listen, validieren und ausstehende installieren, aber sie kann niemals aktivieren, entfernen oder Marketplaces hinzufügen.

## Jede Konversation kennt ihr Repository

Eine Code-Konversation war früher eine flache Datei in einem Ordner. Die Beziehung zwischen einer Konversation und dem sie umgebenden Git-Repository war implizit: Du wusstest, an welchem Projekt du arbeitest, weil du den Ordner geöffnet hattest, aber das Framework wusste es nicht. Das machte Gruppierung, Bereinigung und Worktree-übergreifendes Reasoning unmöglich zu automatisieren.

Zu Beginn jedes Turns zeichnet die Konversation nun ihr Projekt auf – den Haupt-Checkout des Repositorys – zusammen mit ihrem Branch und ob der Ordner der Haupt-Checkout, ein Git-Worktree oder ein einfacher Ordner ist. Diese Information wird direkt aus den Git-Dateien gelesen, ohne Git auszuführen, ist also schnell und funktioniert selbst, wenn das Repository in einem defekten Zustand ist. Die Aufzeichnung überlebt das Entfernen des Worktrees, was bedeutet, dass die Sitzungsliste die Worktrees eines Repositorys unter dem Repository selbst gruppieren kann.

Die Code-Sidebar nutzt diese Gruppierung. Die Worktrees eines Repositorys fallen unter den Repository-Header – eine einklappbare Sektion mit einem `+` für eine neue Konversation dort, einer Worktree-Anzahl und einem Menü für Öffnen, Einklappen, Umbenennen, Ausblenden, Löschen und Bereinigen. Zeilen zeigen Titel, Branch und Zeit; fünf pro Projekt mit einem "mehr anzeigen"-Link; die Suche umfasst Titel, Branch und Projekt; Statusfilter erscheinen nur, wenn sie Treffer haben. Ein Schalter deaktiviert die Gruppierung, falls du die alte flache Liste bevorzugst.

Die Worktree-Bereinigung hat jetzt einen eigenen Dialog. Er listet jeden Worktree des Repositorys mit dem Grund, warum er behalten wird – Haupt-Checkout, in Benutzung, dirty, unmerged, außerhalb von Chimera erstellt – zeigt eine Vorschau der Entfernung und entfernt nur, was die Vorschau aufgelistet hat, mit `git worktree remove` ohne `--force` und `git branch -d`. Nur von Chimera erstellte Worktrees können dort entfernt werden; ihre Konversationen werden archiviert, niemals gelöscht. Die MCP-Bridge kann listen, aber niemals bereinigen.

Die MCP-Bridge erhält zudem die Fähigkeit, eine Konversation innerhalb eines bestimmten Projekts zu öffnen. `desktop_send` nimmt einen `project`-Parameter – ein registriertes Projekt oder ein bekanntes Repository – und eine `worktree: "new"`-Option mit einem optionalen Branch. Chimera erstellt und besitzt den Worktree neben dem Repository in `.chimera-worktrees/<repo>/`, niemals im Temp-Ordner, und die Konversation gruppiert sich unter dem Projekt. Unbekannte Projekte, Pfade außerhalb des Projekts und Run-Branch-Namen werden abgelehnt. Ein neuer Worktree erbt nicht die Shell-Berechtigung des Projekts.

Konversationstitel sind jetzt lesbar und umbenennbar. Der Titel folgt deinem eigenen Namen dafür, dann einem vom Aufrufer übergebenen Titel, dann der ersten `#`-Überschrift einer Markdown-Datei, die die erste Nachricht im Workspace referenziert, und erst dann der ersten Nachricht selbst. Umbenennen mit dem Stift an der Zeile oder F2; ein leerer Name kehrt zum automatischen zurück. Kein Titel wird von einem Modell generiert.

## Was jetzt zu tun ist

Upgrade auf 0.69.0, öffne den Bildschirm Einstellungen › Plugins und füge einen Marketplace hinzu, dem du vertraust. Inspiziere ein Plugin mit `chimera.plugins`, bevor du es installierst. Erstelle einen Worktree über die MCP-Bridge mit `worktree: "new"` und sieh zu, wie er sich in der Sidebar unter seinem Repository gruppiert.

Die vollständigen Release Notes findest du unter [Chimera Agent v0.69.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.69.0).
