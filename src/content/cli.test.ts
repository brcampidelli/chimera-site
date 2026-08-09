import { describe, expect, it } from "vitest";
import {
  CLI_THEMES,
  cli,
  cliAvailable,
  flagOf,
  invocation,
  phantomThemeEntries,
  topLevel,
  unthemedCommands,
} from "./cli";
import en from "../i18n/messages/en.json";

/**
 * The reference is generated, so what needs guarding is the one hand-written part: the grouping.
 *
 * A theme list is exactly the artefact that rots. Someone adds a command, the CLI grows, and the
 * reference silently stops listing it — the page still looks complete, which is the whole problem.
 */
describe("cli reference — every command is reachable and every entry is real", () => {
  it("puts every command in a theme", () => {
    if (!cliAvailable()) {
      console.warn("skipped: the CLI snapshot was not found");
      return;
    }
    const orphans = unthemedCommands();
    expect(orphans, `not listed anywhere in the reference: ${orphans.join(", ")}`).toEqual([]);
  });

  it("names no command that does not exist", () => {
    if (!cliAvailable()) return;
    const phantoms = phantomThemeEntries();
    expect(phantoms, `themes point at commands the CLI does not have: ${phantoms.join(", ")}`).toEqual(
      [],
    );
  });

  it("never lists the same command under two themes", () => {
    const all = CLI_THEMES.flatMap((theme) => theme.commands);
    const duplicates = all.filter((name, i) => all.indexOf(name) !== i);
    expect(duplicates).toEqual([]);
  });

  it("gives every theme a heading that exists in English", () => {
    const strings = en as Record<string, string>;
    for (const theme of CLI_THEMES) {
      expect(strings[theme.key], theme.key).toBeTruthy();
    }
  });

  it("still finds the command groups the dumper nearly lost", () => {
    // Typer vendors its own Click, so an `isinstance` check in the generator reported all eleven
    // groups as leaf commands and dropped 53 subcommands without erroring. If that regresses, the
    // reference goes quiet rather than red — so it is asserted from this side too.
    if (!cliAvailable()) return;
    const groups = topLevel().filter((command) => command.commands && command.commands.length > 0);
    expect(groups.length).toBeGreaterThanOrEqual(10);
  });

  it("stamps the version it documents", () => {
    if (!cliAvailable()) return;
    expect(cli().generated_for).toMatch(/^\d+\.\d+\.\d+/);
  });

  it("renders an invocation the way a person types it", () => {
    if (!cliAvailable()) return;
    const kanban = topLevel().find((c) => c.name === "kanban");
    const add = kanban?.commands?.find((c) => c.name === "add");
    expect(add && invocation(add)).toBe("chimera kanban add");
  });

  it("shows a flag as its flag and an argument as its placeholder", () => {
    expect(flagOf({ name: "model", kind: "option", required: false, type: "str", opts: ["--model", "-m"] })).toBe(
      "--model, -m",
    );
    expect(flagOf({ name: "task", kind: "argument", required: true, type: "str" })).toBe("TASK");
  });
});
