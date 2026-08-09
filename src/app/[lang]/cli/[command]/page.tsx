import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cliAvailable,
  cliHref,
  commandByName,
  flagOf,
  invocation,
  topLevel,
  type CliCommand,
  type CliParam,
} from "@/content/cli";
import { SEGMENTS, canonicalPath, isLocaleSegment, type LocaleSegment } from "@/i18n/locales";
import { translator } from "@/i18n/messages";

export function generateStaticParams() {
  if (!cliAvailable()) return [];
  return SEGMENTS.flatMap((lang) =>
    topLevel().map((command) => ({ lang, command: command.name })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; command: string }>;
}): Promise<Metadata> {
  const { lang, command } = await params;
  if (!isLocaleSegment(lang) || !cliAvailable()) return {};
  const found = commandByName(command);
  if (!found) return {};
  return {
    title: `chimera ${found.name}`,
    description: found.help,
    alternates: { canonical: canonicalPath(lang, `/cli/${command}`) },
  };
}

function Params({
  locale,
  params,
}: {
  locale: LocaleSegment;
  params: readonly CliParam[];
}) {
  const t = translator(locale);
  const args = params.filter((p) => p.kind === "argument");
  const options = params.filter((p) => p.kind === "option");

  const row = (param: CliParam) => (
    <li key={`${param.kind}:${param.name}`} className="border-t border-hairline py-3">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <code className="font-mono text-sm text-accent2">{flagOf(param)}</code>
        <span className="text-xs text-muted-foreground">{param.type}</span>
        {param.required ? (
          <span className="rounded-chip bg-warn/15 px-2 py-0.5 text-xs text-warn-foreground">
            {t("cli.required")}
          </span>
        ) : null}
        {param.default !== undefined ? (
          <span className="text-xs text-muted-foreground">
            {t("cli.default")}: <code className="font-mono">{param.default}</code>
          </span>
        ) : null}
      </div>
      {param.help ? (
        <p className="mt-1 max-w-measure text-sm text-muted-foreground">{param.help}</p>
      ) : null}
      {param.choices ? (
        <p className="mt-1 font-mono text-xs text-muted-foreground">{param.choices.join(" · ")}</p>
      ) : null}
    </li>
  );

  return (
    <>
      {args.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-d3">{t("cli.arguments")}</h2>
          <ul className="mt-2">{args.map(row)}</ul>
        </section>
      ) : null}
      <section className="mt-8">
        <h2 className="text-d3">{t("cli.options")}</h2>
        {options.length > 0 ? (
          <ul className="mt-2">{options.map(row)}</ul>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">{t("cli.noOptions")}</p>
        )}
      </section>
    </>
  );
}

function Subcommand({ locale, command }: { locale: LocaleSegment; command: CliCommand }) {
  const id = command.path.replace(/\s+/g, "-");
  return (
    <article id={id} className="surface scroll-mt-20 p-5">
      <h3 className="font-mono text-base text-accent2">{invocation(command)}</h3>
      <p className="mt-1 max-w-measure text-sm text-muted-foreground">{command.help}</p>
      <Params locale={locale} params={command.params} />
    </article>
  );
}

export default async function CommandPage({
  params,
}: {
  params: Promise<{ lang: string; command: string }>;
}) {
  const { lang, command } = await params;
  if (!isLocaleSegment(lang)) notFound();
  if (!cliAvailable()) notFound();
  const found = commandByName(command);
  if (!found) notFound();

  const t = translator(lang);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="text-sm">
        <Link href={cliHref(lang)} className="focus-ring rounded text-accent2 hover:text-accent">
          ← {t("cli.back")}
        </Link>
      </p>

      <h1 className="mt-4 font-mono text-d2">{invocation(found)}</h1>
      <p className="mt-3 max-w-measure text-lead text-muted-foreground">{found.help}</p>
      {found.deprecated ? (
        <p className="surface mt-4 border-l-2 border-l-warn p-3 text-sm text-warn-foreground">
          deprecated
        </p>
      ) : null}

      {/* A group's own flags are usually just its callback's; the subcommands are the point. */}
      {found.commands && found.commands.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-d3">{t("cli.subcommands")}</h2>
          <div className="mt-3 grid gap-3">
            {found.commands.map((child) => (
              <Subcommand key={child.path} locale={lang} command={child} />
            ))}
          </div>
        </section>
      ) : (
        <Params locale={lang} params={found.params} />
      )}
    </div>
  );
}
