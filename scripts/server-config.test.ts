import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { SEGMENTS } from "../src/i18n/locales";
import { renderHtaccess } from "./server-config";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATE = readFileSync(join(ROOT, "deploy", "htaccess"), "utf8");

/** The alternation as the rendered file actually contains it. */
function localeAlternation(rendered: string): string {
  const match = rendered.match(/RewriteCond %\{REQUEST_URI\} !\^\/\(([^)]*)\)/);
  if (!match?.[1]) throw new Error("the language guard is missing from deploy/htaccess");
  return match[1];
}

describe("the server configuration", () => {
  it("names every language the site actually builds", () => {
    const alternation = localeAlternation(renderHtaccess(TEMPLATE, SEGMENTS));
    expect(alternation.split("|").sort()).toEqual([...SEGMENTS].sort());
  });

  it("does not hard-code the languages in the template", () => {
    // The point of the placeholder. If somebody replaces it with the nine codes, a tenth language
    // ships with its own URLs quietly redirected to English and nothing complains.
    expect(TEMPLATE).toContain("@LOCALES@");
    expect(localeAlternation(TEMPLATE)).toBe("@LOCALES@");
  });

  it("refuses to emit a template with a placeholder left in it", () => {
    expect(() => renderHtaccess("RewriteRule ^ /@LANG@/ [L]", SEGMENTS)).toThrow(/@LANG@/);
  });

  it("redirects an unprefixed path to English and leaves real files alone", () => {
    const rendered = renderHtaccess(TEMPLATE, SEGMENTS);
    // The two conditions that keep /_next/, /_pagefind/, /brand/ and /404/ out of the rule: they
    // exist on disk, so the rewrite never sees them. Losing either turns the whole build into
    // redirects.
    expect(rendered).toContain("RewriteCond %{REQUEST_FILENAME} !-f");
    expect(rendered).toContain("RewriteCond %{REQUEST_FILENAME} !-d");
    expect(rendered).toContain("RewriteRule ^(.+)$ /en/$1 [R=301,L]");
  });

  it("keeps www pointing at the apex", () => {
    expect(renderHtaccess(TEMPLATE, SEGMENTS)).toContain(
      "RewriteRule ^(.*)$ https://chimeraagent.space/$1 [R=301,L]",
    );
  });
});
