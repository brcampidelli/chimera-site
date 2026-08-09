/**
 * Two things the export cannot do for itself.
 *
 * 1. **The bare domain.** `<html lang>` has to be the page's real language, which means the root
 *    layout lives under `[lang]` — and that leaves `/` without a route. So the English home is
 *    copied to `out/index.html`. A copy, not a redirect: a meta refresh on the root of a site is
 *    a visible stutter on every first visit, and the canonical inside the file already says `/`
 *    is the real address.
 *
 * 2. **Search.** Pagefind indexes the rendered HTML after the fact, which is why the site ships no
 *    search bundle until somebody opens the search.
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "out");

function bareDomain(): void {
  const source = join(OUT, "en", "index.html");
  if (!existsSync(source)) {
    console.error("postbuild: out/en/index.html is missing — did the export run?");
    process.exit(1);
  }
  copyFileSync(source, join(OUT, "index.html"));

  const html = readFileSync(join(OUT, "index.html"), "utf8");
  // The English home claims `/` as its canonical. If that ever stops being true the two addresses
  // become two pages competing with each other, so it is asserted rather than assumed.
  if (!html.includes('rel="canonical" href="https://chimeraagent.space/"')) {
    console.error("postbuild: the English home does not name `/` as its canonical.");
    process.exit(1);
  }
  console.log("postbuild: out/index.html ← out/en/index.html");
}

function main(): void {
  bareDomain();
}

main();
