/**
 * The two `.htaccess` files, written into the export.
 *
 * They are here rather than copied verbatim by the deploy because one of their rules has to know
 * the list of languages, and the list of languages already exists — in `src/i18n/locales.ts`, which
 * is itself checked against the app. A hand-typed alternation in a server config is the same bug as
 * a hand-typed benchmark figure: correct on the day it is written, silently wrong on the day a
 * tenth language ships and its URLs start being aliased to English.
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SEGMENTS } from "../src/i18n/locales";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Substitute the placeholders. Throws if any survives — a template that ships `@LOCALES@` to the
 * server is a rewrite rule that matches a literal at-sign and nothing else. */
export function renderHtaccess(template: string, segments: readonly string[]): string {
  const rendered = template.replace(/@LOCALES@/g, segments.join("|"));
  const leftover = rendered.match(/@[A-Z_]+@/);
  if (leftover) throw new Error(`unsubstituted placeholder in deploy/htaccess: ${leftover[0]}`);
  return rendered;
}

export function writeServerConfig(out = join(ROOT, "out")): void {
  const template = readFileSync(join(ROOT, "deploy", "htaccess"), "utf8");
  writeFileSync(join(out, ".htaccess"), renderHtaccess(template, SEGMENTS), "utf8");

  const staticDir = join(out, "_next", "static");
  if (!existsSync(staticDir)) {
    throw new Error("server-config: out/_next/static is missing — did the export run?");
  }
  copyFileSync(join(ROOT, "deploy", "htaccess-static"), join(staticDir, ".htaccess"));

  console.log(`server-config: out/.htaccess (${SEGMENTS.length} languages) and _next/static/.htaccess`);
}
