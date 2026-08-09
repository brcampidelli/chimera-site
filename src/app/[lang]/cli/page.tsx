import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLI_THEMES, cli, cliAvailable, cliHref, commandByName } from "@/content/cli";
import { SEGMENTS, canonicalPath, isLocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";

export function generateStaticParams() {
  return SEGMENTS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) return {};
  const t = translator(lang);
  return {
    title: t("cli.title"),
    description: t("cli.subtitle"),
    alternates: { canonical: canonicalPath(lang, "/cli") },
  };
}

export default async function CliIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocaleSegment(lang)) notFound();
  if (!cliAvailable()) notFound();
  const t = translator(lang);
  const data = cli();

  const total = data.commands.reduce(
    (sum, command) => sum + 1 + (command.commands?.length ?? 0),
    0,
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-d1">{t("cli.title")}</h1>
      <p className="mt-4 max-w-measure text-lead text-muted-foreground">{t("cli.subtitle")}</p>
      <p className="mt-4 max-w-measure text-sm text-muted-foreground">{t("cli.intro")}</p>
      <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
        {t("cli.documenting", { version: data.generated_for })} ·{" "}
        {t("cli.commandCount", { count: total })}
      </p>

      <div className="mt-10 space-y-10">
        {CLI_THEMES.map((theme) => (
          <section key={theme.key}>
            <h2 className="text-d3">{t(theme.key)}</h2>
            <ul className="mt-3 grid gap-2">
              {theme.commands.map((name) => {
                const command = commandByName(name);
                if (!command) return null;
                return (
                  <li key={name}>
                    <Link
                      href={cliHref(lang, name)}
                      className="focus-ring surface flex flex-col gap-1 px-4 py-3 transition duration-1 ease-out hover:bg-surface-hover sm:flex-row sm:items-baseline sm:gap-4"
                    >
                      <code className="shrink-0 font-mono text-sm text-accent2">
                        chimera {name}
                        {command.commands ? " …" : ""}
                      </code>
                      <span className="text-sm text-muted-foreground">{command.help}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
