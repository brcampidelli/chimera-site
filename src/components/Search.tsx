"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  labels: { open: string; placeholder: string; empty: string; unavailable: string; close: string };
}

interface Result {
  url: string;
  meta: { title?: string };
  excerpt: string;
}

interface PagefindApi {
  search: (query: string) => Promise<{ results: { data: () => Promise<Result> }[] }>;
  options?: (opts: Record<string, unknown>) => Promise<void>;
}

/**
 * Search over the rendered site, indexed by Pagefind after the export.
 *
 * The index and the runtime are both fetched the first time somebody opens this — a search box
 * that ships its engine to every visitor makes the whole site slower for the majority who never
 * search. Nothing here exists until the dialog opens.
 */
export function Search({ labels }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [state, setState] = useState<"idle" | "ready" | "unavailable">("idle");
  const api = useRef<PagefindApi | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    if (api.current || state === "unavailable") return;
    try {
      // Resolved by the browser at runtime, not by the bundler: Pagefind writes this file after
      // the export, so neither the bundler nor TypeScript has ever seen it. The specifier is held
      // in a variable for the same reason — `declare module` cannot match an absolute path, and a
      // literal here makes TypeScript go looking for a file that will not exist until later.
      const specifier = "/_pagefind/pagefind.js";
      const mod = (await import(/* webpackIgnore: true */ specifier)) as PagefindApi;
      await mod.options?.({ excerptLength: 24 });
      api.current = mod;
      setState("ready");
    } catch {
      // In `next dev` there is no export and therefore no index. Saying so is better than a
      // search box that silently returns nothing.
      setState("unavailable");
    }
  }, [state]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    void load();
    input.current?.focus();
  }, [open, load]);

  useEffect(() => {
    if (!open || state !== "ready" || query.trim().length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      const search = await api.current?.search(query);
      if (!search || cancelled) return;
      const top = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));
      if (!cancelled) setResults(top);
    }, 140);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, open, state]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring rounded-chip border border-hairline bg-surface-2 px-3 py-1.5 text-xs text-muted-foreground transition duration-1 ease-out hover:text-foreground"
      >
        {labels.open}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-scrim p-4 pt-[12vh]" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={labels.open}
            className="floating mx-auto max-w-xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <input
              ref={input}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={labels.placeholder}
              aria-label={labels.placeholder}
              className="w-full border-b border-hairline bg-transparent px-4 py-3.5 text-base outline-none"
            />
            <div className="max-h-[52vh] overflow-y-auto p-2">
              {state === "unavailable" ? (
                <p className="p-3 text-sm text-muted-foreground">{labels.unavailable}</p>
              ) : results.length === 0 && query.trim().length >= 2 ? (
                <p className="p-3 text-sm text-muted-foreground">{labels.empty}</p>
              ) : (
                <ul>
                  {results.map((result) => (
                    <li key={result.url}>
                      <a
                        href={result.url}
                        className="focus-ring block rounded-lg px-3 py-2.5 transition duration-1 ease-out hover:bg-surface-hover"
                      >
                        <span className="block text-sm font-semibold">
                          {result.meta.title ?? result.url}
                        </span>
                        <span
                          className="mt-0.5 block text-xs text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: result.excerpt }}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
