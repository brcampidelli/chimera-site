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
 * How the reference is grouped, read from the product like the snapshot above it.
 *
 * This was a hand-written const here until 0.48.0, and that is precisely why it kept going stale:
 * the assertion that every command lands in a theme could only run where the list was, so it ran at
 * DEPLOY time — after the release. Three times it caught the same omission (`sessions`, the
 * installable skills catalogue, then `approve` and `secrets`), and three times this page stayed on
 * the previous version until somebody read a red deploy to find out why.
 *
 * The list now lives in `chimera/cli/themes.py`, where the commands are, and `chimera-agent`'s CI
 * fails on the pull request that adds a command without listing it. What stays here is the part
 * that is genuinely the site's: the translation of each `key`, and the rendering.
 *
 * The tests below stay too. They cost nothing and they are the only thing that would notice if the
 * product ever shipped a grouping this site cannot render.
 */
const THEMES_FILE = join(resolveProductRoot(), "chimera", "_cli_themes.json");

export interface CliTheme {
  readonly key: string;
  readonly commands: readonly string[];
}

let themesCached: readonly CliTheme[] | null = null;

export function themesAvailable(): boolean {
  return existsSync(THEMES_FILE);
}

/**
 * Throws rather than returning `[]` when the file is missing.
 *
 * An empty grouping renders an empty reference, which looks like a page with nothing to say instead
 * of a build that could not read its input — the exact failure mode this whole change is about.
 */
export function cliThemes(): readonly CliTheme[] {
  if (!themesCached) {
    if (!existsSync(THEMES_FILE)) {
      throw new Error(
        `the command reference grouping was not found at ${THEMES_FILE}. It ships with ` +
          "chimera-agent from 0.48.0; regenerate it there with " +
          "`python -m chimera.cli.themes_dump > chimera/_cli_themes.json`.",
      );
    }
    themesCached = JSON.parse(readFileSync(THEMES_FILE, "utf8")) as readonly CliTheme[];
  }
  return themesCached;
}

/** Top-level commands and groups, visible ones only. */
export function topLevel(): CliCommand[] {
  return cli().commands.filter((command) => !command.hidden);
}

export function commandByName(name: string): CliCommand | undefined {
  return topLevel().find((command) => command.name === name);
}

/** Any command in the snapshot that no theme claims. The test requires this to be empty. */
export function unthemedCommands(): string[] {
  const claimed = new Set(cliThemes().flatMap((theme) => theme.commands));
  return topLevel()
    .map((command) => command.name)
    .filter((name) => !claimed.has(name));
}

/** Any theme entry naming a command that does not exist. */
export function phantomThemeEntries(): string[] {
  const real = new Set(topLevel().map((command) => command.name));
  return cliThemes().flatMap((theme) => theme.commands).filter((name) => !real.has(name));
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
