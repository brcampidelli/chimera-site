import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { resolveProductRoot } from "../../scripts/sync-tokens";
import { localePath, type LocaleSegment } from "@/i18n/locales";

/**
 * The command reference, read from the snapshot the product generates and its CI keeps current.
 *
 * Nothing here is transcribed. `docs/usage.md` is prose about the happy path, written by a human
 * and worth keeping that way; this is the exhaustive part, and an exhaustive list maintained by
 * hand is a list that describes last release.
 */
const SNAPSHOT = join(resolveProductRoot(), "chimera", "_cli_snapshot.json");

export interface CliParam {
  readonly name: string;
  readonly kind: "option" | "argument";
  readonly required: boolean;
  readonly type: string;
  readonly opts?: readonly string[];
  readonly secondary_opts?: readonly string[];
  readonly help?: string;
  readonly default?: string;
  readonly choices?: readonly string[];
}

export interface CliCommand {
  readonly path: string;
  readonly name: string;
  readonly help: string;
  readonly hidden: boolean;
  readonly deprecated: boolean;
  readonly params: readonly CliParam[];
  readonly commands?: readonly CliCommand[];
}

export interface CliSnapshot {
  readonly generated_for: string;
  readonly name: string;
  readonly help: string;
  readonly commands: readonly CliCommand[];
}

let cached: CliSnapshot | null = null;

export function cliAvailable(): boolean {
  return existsSync(SNAPSHOT);
}

export function cli(): CliSnapshot {
  if (!cached) cached = JSON.parse(readFileSync(SNAPSHOT, "utf8")) as CliSnapshot;
  return cached;
}

/**
 * How the reference is grouped.
 *
 * The CLI is alphabetical on `--help`, which is the correct answer for someone who already knows
 * the name and useless for someone who does not. These are the themes; `cli.test.ts` asserts every
 * command lands in exactly one of them, so a new command cannot slip in unlisted.
 */
export const CLI_THEMES: readonly { readonly key: string; readonly commands: readonly string[] }[] =
  [
    {
      key: "cli.themeSetup",
      commands: ["init", "doctor", "version", "features", "maturity", "migrate", "models"],
    },
    {
      key: "cli.themeWork",
      commands: [
        "chat",
        // Shipped with the persistent terminal conversation and never listed here, so the command
        // reference described a CLI that had one fewer command than the CLI does. The gate that
        // catches this has been red since that release.
        "sessions",
        "tui",
        "assist",
        "run",
        "agent",
        "deliver",
        "solve",
        "solve-batch",
        "crew",
        "crew-isolated",
        "lifecycle",
        "meta",
        "explore",
        "workflow",
        "drift",
        "scenarios",
      ],
    },
    {
      key: "cli.themeFusion",
      commands: ["fuse", "fusion-receipts", "orchestrate", "brief", "delegations"],
    },
    {
      key: "cli.themeMemory",
      commands: ["memory", "profile", "playbook", "skills", "tools"],
    },
    {
      key: "cli.themeSkills",
      commands: [
        "skills-pending",
        "skills-stats",
        "skills-approve",
        "skills-export",
        "skills-import",
        "skills-retire",
        "skills-lifecycle",
        "skills-evolve",
        "evolve",
      ],
    },
    {
      key: "cli.themeAutomation",
      commands: ["cron", "kanban", "project", "agents"],
    },
    {
      key: "cli.themeServe",
      // `acp` is the agent side of the Agent Client Protocol — the mirror of the client half the
      // Code screen uses. It belongs beside the other ways something outside reaches the agent.
      commands: ["serve", "app", "mcp", "a2a-card", "acp"],
    },
    {
      key: "cli.themeSafety",
      commands: ["guard", "redteam"],
    },
    {
      key: "cli.themeBench",
      commands: [
        "bench",
        "bench-compare",
        "swe-bench-compare",
        "fusion-bench",
        "cascade-bench",
        "hierarchy-bench",
        "skillcard-bench",
        "schema-bench",
        "sandbox-bench",
        "memory-bench",
        "probe-select",
        "transfer-gate",
        "evoclaw",
        "rubric-grade",
        "context-curve",
      ],
    },
    { key: "cli.themeFun", commands: ["pet"] },
  ];

/** Top-level commands and groups, visible ones only. */
export function topLevel(): CliCommand[] {
  return cli().commands.filter((command) => !command.hidden);
}

export function commandByName(name: string): CliCommand | undefined {
  return topLevel().find((command) => command.name === name);
}

/** Any command in the snapshot that no theme claims. The test requires this to be empty. */
export function unthemedCommands(): string[] {
  const claimed = new Set(CLI_THEMES.flatMap((theme) => theme.commands));
  return topLevel()
    .map((command) => command.name)
    .filter((name) => !claimed.has(name));
}

/** Any theme entry naming a command that does not exist. */
export function phantomThemeEntries(): string[] {
  const real = new Set(topLevel().map((command) => command.name));
  return CLI_THEMES.flatMap((theme) => theme.commands).filter((name) => !real.has(name));
}

export function cliHref(locale: LocaleSegment, name?: string): string {
  return name ? localePath(locale, `/cli/${name}`) : localePath(locale, "/cli");
}

/** How the command is typed, e.g. `chimera kanban add`. */
export function invocation(command: CliCommand): string {
  return `chimera ${command.path}`;
}

/** `--flag` / `-f`, or the bare name for a positional argument. */
export function flagOf(param: CliParam): string {
  if (param.kind === "argument") return param.name.toUpperCase();
  return (param.opts ?? [param.name]).join(", ");
}
