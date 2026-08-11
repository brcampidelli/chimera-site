import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { resolveProductRoot } from "../../scripts/sync-tokens";
import { cli, cliAvailable } from "./cli";
import { localePath, type LocaleSegment } from "@/i18n/locales";
import { LINKS } from "@/lib/site";

/**
 * The skill library, read from the product repository.
 *
 * There is deliberately no second home for skills. `skills/` is already an open contribution area
 * with a CODEOWNERS default, and a card that lives there is a card the CLI can import by path
 * today. Copying the library into the site would create a second thing to review and a second
 * thing to go stale.
 *
 * What this hub shows that an aggregator cannot: where the card came from, what state its review
 * is in, and a hash of the exact bytes on the page. A rival index carries ninety thousand cards
 * and none of that. Volume is a race already lost; provenance is not.
 */
const SKILLS_DIR = join(resolveProductRoot(), "skills");

/**
 * Translated card DESCRIPTIONS, and deliberately nothing else.
 *
 * The body of a card is not prose about the product. It is the payload the agent reads at runtime
 * (`card_context()` injects it into the prompt), the bytes the published SHA-256 attests to, and
 * the text the CLI imports by path. Translating it breaks all three at once: the page would show a
 * hash that does not match what the reader is reading, and the translation would never reach the
 * agent anyway, because the CLI only ever imports `skills/`.
 *
 * So the description travels in a sidecar that leaves `SKILL.md` byte-identical — the hash on the
 * page keeps meaning what it says. Each entry declares the hash of the English description it was
 * made from, exactly like the documentation translations, so a description that has drifted falls
 * back to English instead of paraphrasing a sentence that no longer exists.
 */
const SKILLS_I18N_DIR = join(SKILLS_DIR, "i18n");

export interface LocalisedDescription {
  readonly text: string;
  /** False when the reader is getting the English original — no translation, or a stale one. */
  readonly translated: boolean;
}

export function describeSkill(locale: LocaleSegment, skill: Skill): LocalisedDescription {
  const english = { text: skill.description, translated: false };
  if (locale === "en") return english;
  const path = join(SKILLS_I18N_DIR, `${locale}.json`);
  if (!existsSync(path)) return english;
  try {
    const entry = JSON.parse(readFileSync(path, "utf8"))?.descriptions?.[skill.slug];
    if (typeof entry?.text !== "string") return english;
    const current = createHash("sha256").update(skill.description, "utf8").digest("hex");
    return entry.source_sha256 === current ? { text: entry.text, translated: true } : english;
  } catch {
    // A malformed sidecar must not take the page down. English is always a correct answer here.
    return english;
  }
}

/** The five sections a card must have, in order. Mirrors `_CARD_SECTIONS` in the product. */
export const SECTIONS = ["Trigger", "Do", "Avoid", "Check", "Risk"] as const;
export type SectionName = (typeof SECTIONS)[number];

export interface Skill {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly version: string;
  readonly kind: "pattern" | "anti_pattern";
  readonly triggers: readonly string[];
  /** `clean` is conferred by review. A card claiming it about itself proves nothing. */
  readonly provenance: "clean" | "tainted";
  readonly status: "active" | "provisional" | "pending" | "retired";
  readonly license: string;
  readonly sections: Readonly<Record<SectionName, string>>;
  readonly sectionsComplete: boolean;
  /** SHA-256 of the file, so an importer can check that what it got is what was shown. */
  readonly sha256: string;
  readonly bytes: number;
  readonly source: string;
}

export function skillsAvailable(): boolean {
  return existsSync(SKILLS_DIR);
}

function splitSections(body: string): Record<SectionName, string> {
  const out = {} as Record<SectionName, string>;
  for (const section of SECTIONS) {
    const marker = `## ${section}`;
    const start = body.indexOf(marker);
    if (start === -1) {
      out[section] = "";
      continue;
    }
    const after = body.slice(start + marker.length);
    const next = SECTIONS.map((s) => after.indexOf(`## ${s}`))
      .filter((i) => i > 0)
      .sort((a, b) => a - b)[0];
    out[section] = after.slice(0, next ?? after.length).trim();
  }
  return out;
}

let cached: Skill[] | null = null;

export function skills(): Skill[] {
  if (cached) return cached;
  if (!skillsAvailable()) return [];

  const found: Skill[] = [];
  for (const entry of readdirSync(SKILLS_DIR)) {
    const card = join(SKILLS_DIR, entry, "SKILL.md");
    if (!statSync(join(SKILLS_DIR, entry)).isDirectory() || !existsSync(card)) continue;

    const raw = readFileSync(card, "utf8");
    const parsed = matter(raw);
    const data = parsed.data as Record<string, unknown>;
    const sections = splitSections(parsed.content);

    found.push({
      slug: entry,
      name: String(data.name ?? entry),
      description: String(data.description ?? ""),
      version: String(data.version ?? ""),
      kind: (String(data.kind ?? "pattern") as Skill["kind"]),
      triggers: Array.isArray(data.triggers) ? data.triggers.map(String) : [],
      provenance: (String(data.provenance ?? "tainted") as Skill["provenance"]),
      status: (String(data.status ?? "pending") as Skill["status"]),
      license: String(data.license ?? ""),
      sections,
      sectionsComplete: SECTIONS.every((s) => sections[s].length > 40),
      sha256: createHash("sha256").update(raw, "utf8").digest("hex"),
      bytes: Buffer.byteLength(raw, "utf8"),
      source: `skills/${entry}/SKILL.md`,
    });
  }

  cached = found.sort((a, b) => a.name.localeCompare(b.name));
  return cached;
}

export function skillBySlug(slug: string): Skill | undefined {
  return skills().find((skill) => skill.slug === slug);
}

export function skillHref(locale: LocaleSegment, slug?: string): string {
  return slug ? localePath(locale, `/skills/${slug}`) : localePath(locale, "/skills");
}

export function skillSourceUrl(skill: Skill): string {
  return `${LINKS.github}/blob/main/${skill.source}`;
}

/**
 * Whether the installed CLI can import a skill by name from a URL.
 *
 * Today it cannot — `skills-import` takes a path — so the page shows a clone and a local path
 * rather than a one-liner that does not exist. The answer comes from the CLI snapshot, so the
 * instructions cannot advertise a capability the released version lacks.
 */
export function cliImportsFromUrl(): boolean {
  if (!cliAvailable()) return false;
  const command = cli().commands.find((c) => c.name === "skills-import");
  if (!command) return false;
  return command.params.some((param) =>
    /url|remote|from/i.test([param.name, ...(param.opts ?? []), param.help ?? ""].join(" ")),
  );
}

/** The published index — data for tooling, and the same figures the pages show. */
export function skillsIndex(): unknown {
  return {
    generated_for: cliAvailable() ? cli().generated_for : null,
    source: `${LINKS.github}/tree/main/skills`,
    skills: skills().map((skill) => ({
      slug: skill.slug,
      name: skill.name,
      description: skill.description,
      version: skill.version,
      kind: skill.kind,
      triggers: skill.triggers,
      provenance: skill.provenance,
      status: skill.status,
      license: skill.license,
      sections_complete: skill.sectionsComplete,
      source: skill.source,
      url: skillSourceUrl(skill),
      integrity: { sha256: skill.sha256, bytes: skill.bytes },
    })),
  };
}
