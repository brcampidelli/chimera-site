/**
 * What the build says when a network hop fails.
 *
 * The behaviour under test is a *message*, which is the kind of thing that rots silently: nothing
 * breaks when an error string stops being true, and nobody reads it until the day it matters, at
 * which point it sends them somewhere wrong. On 2026-08-12 a `503` from the asset CDN surfaced as
 * `SyntaxError: Unexpected token '<'` — accurate about the bytes and silent about the outage.
 *
 * So these assert the facts a reader needs, not the wording: which hop, what status, and whether a
 * re-run can possibly help. Rephrasing the sentences keeps these green; dropping the status or the
 * upstream/ours distinction does not.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { collectListed, findPreview, getJson, isPublishedStable, newerThan } from "./fetch-releases";

/** `process.exit` never returns; in a test it has to become something catchable. */
class Exited extends Error {
  constructor(readonly code: number) {
    super(`exit ${code}`);
  }
}

function harness() {
  const said: string[] = [];
  vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
    said.push(args.map(String).join(" "));
  });
  vi.spyOn(process, "exit").mockImplementation(((code: number) => {
    throw new Exited(code);
  }) as never);
  return { said, out: () => said.join("\n") };
}

/** Fails the first `times` calls the given way, then answers normally. Counts the attempts. */
function failingThenOk(times: number, how: "connection" | 503 | 404) {
  const calls = { n: 0 };
  vi.stubGlobal("fetch", async () => {
    calls.n += 1;
    if (calls.n <= times) {
      if (how === "connection") throw new Error("socket hang up");
      return new Response("<html>upstream</html>", { status: how });
    }
    return new Response(JSON.stringify({ version: "0.44.0" }), { status: 200 });
  });
  return calls;
}

function answering(init: { status: number; body?: string; json?: unknown }) {
  vi.stubGlobal("fetch", async () =>
    init.json !== undefined
      ? new Response(JSON.stringify(init.json), { status: init.status })
      : new Response(init.body ?? "", { status: init.status }),
  );
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("getJson — retrying the failures that are worth retrying", () => {
  const NOW = [0, 0, 0];

  it("survives a dropped connection that succeeds on the second try", async () => {
    // The actual production failure, five times on 2026-08-12: the connection to the release CDN
    // never completed, and a manual re-run seconds later worked. This is that, automated.
    const calls = failingThenOk(1, "connection");
    await expect(getJson("https://x/y", "the manifest", undefined, NOW)).resolves.toEqual({
      version: "0.44.0",
    });
    expect(calls.n).toBe(2);
  });

  it("survives a 5xx, and keeps trying to the end of the schedule", async () => {
    const calls = failingThenOk(3, 503);
    await expect(getJson("https://x/y", "the manifest", undefined, NOW)).resolves.toBeTruthy();
    expect(calls.n).toBe(4); // three failures, then the attempt that worked
  });

  it("does NOT retry a 404, because waiting cannot turn a wrong token into a right one", async () => {
    const { out } = harness();
    const calls = failingThenOk(99, 404);

    await expect(getJson("https://x/y", "the release list", undefined, NOW)).rejects.toBeInstanceOf(
      Exited,
    );

    // One attempt. Sleeping three times to be told the same thing is worse than being told once,
    // and it is the same misjudgement as advising a re-run that cannot pass.
    expect(calls.n).toBe(1);
    expect(out().toLowerCase()).not.toContain("re-run the build");
  });

  it("gives up eventually rather than retrying for ever", async () => {
    const { out } = harness();
    const calls = failingThenOk(99, "connection");

    await expect(getJson("https://x/y", "the manifest", undefined, NOW)).rejects.toBeInstanceOf(
      Exited,
    );

    expect(calls.n).toBe(NOW.length + 1);
    // And it says how many, because "re-run the build" after three silent retries would be advice
    // to repeat something that already happened.
    expect(out()).toContain(`${NOW.length + 1} attempts`);
  });
});

describe("getJson — the message a failed build leaves behind", () => {
  it("returns the parsed body when the hop succeeds", async () => {
    answering({ status: 200, json: { version: "0.44.0" } });
    await expect(getJson<{ version: string }>("https://x/y", "the thing")).resolves.toEqual({
      version: "0.44.0",
    });
  });

  it("names the hop, the status and the URL when the server refuses", async () => {
    const { out } = harness();
    answering({ status: 503, body: "<html><body><h1>503 Service Unavailable</h1>" });

    await expect(
      getJson("https://cdn.example/latest.json", "the updater manifest (latest.json)", undefined, []),
    ).rejects.toBeInstanceOf(Exited);

    // The three facts. Without the first, "the build failed" says nothing about where.
    expect(out()).toContain("the updater manifest (latest.json)");
    expect(out()).toContain("503");
    expect(out()).toContain("https://cdn.example/latest.json");
    // And never the old symptom, which described the bytes instead of the outage.
    expect(out()).not.toContain("Unexpected token");
  });

  it("separates an outage from our own mistake, because only one is worth re-running", async () => {
    const upstream = harness();
    answering({ status: 502, body: "nope" });
    await expect(getJson("https://x/y", "the release list", undefined, [])).rejects.toBeInstanceOf(Exited);
    expect(upstream.out().toLowerCase()).toContain("re-run");

    vi.restoreAllMocks();

    const ours = harness();
    answering({ status: 404, body: "nope" });
    await expect(getJson("https://x/y", "the release list", undefined, [])).rejects.toBeInstanceOf(Exited);
    // A 404 is a wrong repo or a dead token. Telling someone to re-run would send them to wait for
    // a recovery that is never coming.
    expect(ours.out().toLowerCase()).not.toContain("re-run the build");
  });

  it("says so when a 200 is not JSON, which is the case that used to be unreadable", async () => {
    const { out } = harness();
    answering({ status: 200, body: "<html><body>hi" });

    await expect(getJson("https://x/y", "the latest release", undefined, [])).rejects.toBeInstanceOf(Exited);

    expect(out()).toContain("200");
    expect(out()).toContain("not JSON");
    expect(out()).toContain("the latest release");
  });

  it("reports a connection that never got a reply at all", async () => {
    const { out } = harness();
    vi.stubGlobal("fetch", async () => {
      throw new Error("getaddrinfo ENOTFOUND api.github.com");
    });

    await expect(getJson("https://x/y", "the latest release", undefined, [])).rejects.toBeInstanceOf(Exited);

    // No status exists here, so the status branch must not be the one that runs.
    expect(out()).toContain("could not reach");
    expect(out()).toContain("ENOTFOUND");
    // And it must still answer the question the reader actually has. This branch fires on the most
    // transient failure of the three and was the one saying nothing about whether to retry — it
    // shipped that way and a real outage found it the same day.
    expect(out().toLowerCase()).toContain("re-run");
  });
});

/**
 * Which candidate the download page offers, and — mostly — which it does not.
 *
 * A "try the preview" card is a promise with a shelf life. The failure worth guarding is not
 * showing the wrong version; it is showing a version that stopped leading and staying there,
 * because nobody edits a site to remove a card they cannot see.
 */
describe("newerThan — when a candidate still leads", () => {
  it("offers a candidate whose base version is ahead of the stable release", () => {
    expect(newerThan("0.48.0rc1", "0.47.0")).toBe(true);
  });

  it("stops offering it the moment the stable of the same version ships", () => {
    // The case that decides whether this feature ages well. `0.48.0rc1` and `0.48.0` share a base,
    // and a prerelease of a version that already shipped is behind it in every sense that matters.
    expect(newerThan("0.48.0rc1", "0.48.0")).toBe(false);
  });

  it("never offers a candidate older than the stable release", () => {
    expect(newerThan("0.47.0rc2", "0.48.0")).toBe(false);
  });

  it("compares numerically, not as text", () => {
    // "0.9.0" > "0.10.0" as strings, which is how a version picker starts recommending the past.
    expect(newerThan("0.10.0rc1", "0.9.0")).toBe(true);
    expect(newerThan("0.9.0rc1", "0.10.0")).toBe(false);
  });

  it("answers no to anything it cannot parse, rather than guessing", () => {
    expect(newerThan("nightly", "0.47.0")).toBe(false);
    expect(newerThan("0.48.0rc1", "")).toBe(false);
  });
});

describe("findPreview — the card is all-or-nothing", () => {
  const headers = { Accept: "application/vnd.github+json" };
  const listed = (over: Partial<Record<string, unknown>> = {}) => [
    {
      tag_name: "v0.48.0rc1",
      name: "rc",
      body: "notes",
      published_at: "2026-08-19T00:07:00Z",
      html_url: "https://example.invalid/rc",
      prerelease: true,
      draft: false,
      ...over,
    },
  ];
  const assets = [
    { name: "Chimera_0.48.0-rc.1_x64-setup.exe", browser_download_url: "u", size: 1 },
    { name: "Chimera_0.48.0-rc.1_aarch64.dmg", browser_download_url: "u", size: 1 },
    { name: "Chimera_0.48.0-rc.1_x64.dmg", browser_download_url: "u", size: 1 },
    { name: "Chimera_0.48.0-rc.1_amd64.AppImage", browser_download_url: "u", size: 1 },
    { name: "Chimera_0.48.0-rc.1_amd64.deb", browser_download_url: "u", size: 1 },
  ];

  afterEach(() => vi.unstubAllGlobals());

  it("returns the candidate with every platform resolved", async () => {
    vi.stubGlobal("fetch", async () => new Response(JSON.stringify({ assets })));
    const found = await findPreview(listed(), "0.47.0", headers);
    expect(found?.version).toBe("0.48.0rc1");
    expect(found?.downloads).toHaveLength(5);
  });

  it("skips a candidate whose installers are not all uploaded yet", async () => {
    // The release workflow uploads per platform, so there is a window where the tag exists and half
    // the assets do not. A card with three of five platforms is worse than no card: whoever is on
    // the missing one reads it as unsupported.
    vi.stubGlobal("fetch", async () => new Response(JSON.stringify({ assets: assets.slice(0, 2) })));
    expect(await findPreview(listed(), "0.47.0", headers)).toBeNull();
  });

  it("ignores drafts and stable releases in the list", async () => {
    vi.stubGlobal("fetch", async () => new Response(JSON.stringify({ assets })));
    expect(await findPreview(listed({ draft: true }), "0.47.0", headers)).toBeNull();
    expect(await findPreview(listed({ prerelease: false }), "0.47.0", headers)).toBeNull();
  });

  it("says nothing when the release it names cannot be fetched", async () => {
    // Best-effort, unlike the stable downloads: an optional card must never take a build down.
    vi.stubGlobal("fetch", async () => new Response("nope", { status: 503 }));
    expect(await findPreview(listed(), "0.47.0", headers)).toBeNull();
  });
});


describe("collectListed — one page of thirty was a bet on the release cadence", () => {
  const headers = { Accept: "application/vnd.github+json" };

  /** `n` releases, all prerelease unless `stableFrom` says otherwise. */
  function page(n: number, stableFrom = Infinity) {
    return Array.from({ length: n }, (_unused, i) => ({
      tag_name: `v0.48.0rc${i + 1}`,
      name: `rc${i + 1}`,
      body: "notes",
      published_at: "2026-08-25T00:00:00Z",
      html_url: "https://example.invalid",
      prerelease: i < stableFrom,
      draft: false,
    }));
  }

  it("keeps asking for pages while every release it has seen is a prerelease", async () => {
    // The failure of 2026-08-25, exactly: rc1..rc30 filled the first page and the newest stable
    // release sat just past the end. The API was answering perfectly and the history came back
    // empty, so the build blamed upstream and asked to be re-run.
    const pedidas: string[] = [];
    const read = async (url: string) => {
      pedidas.push(url);
      // page 1: 100 prereleases (a full page, so there is more). page 2: stable ones.
      // `endsWith`, not `includes`: `per_page=100` CONTAINS "page=1", so a substring check made
      // every page look like page one and the walk ran to its cap. The mock was the defect.
      return url.endsWith("page=1") ? page(100) : page(40, 0);
    };

    const all = await collectListed(headers, read as never);

    expect(pedidas).toHaveLength(2);
    expect(all.filter(isPublishedStable).length).toBeGreaterThan(0);
  });

  it("stops at a short page instead of spending a request to be told nothing", async () => {
    const pedidas: string[] = [];
    const read = async (url: string) => {
      pedidas.push(url);
      return page(7);
    };

    await collectListed(headers, read as never);

    expect(pedidas).toHaveLength(1);
  });

  it("stops once it has enough stable releases, rather than walking to the cap", async () => {
    const pedidas: string[] = [];
    const read = async (url: string) => {
      pedidas.push(url);
      return page(100, 0); // a full page, all stable
    };

    await collectListed(headers, read as never);

    expect(pedidas).toHaveLength(1);
  });

  it("walks a bounded number of pages even when nothing stable is ever found", async () => {
    const pedidas: string[] = [];
    const read = async (url: string) => {
      pedidas.push(url);
      return page(100); // a full page of prereleases, for ever
    };

    await collectListed(headers, read as never);

    expect(pedidas.length).toBeGreaterThan(1);
    expect(pedidas.length).toBeLessThanOrEqual(5);
  });

  it("treats a page it could not read as empty rather than crashing the walk", async () => {
    const all = await collectListed(headers, (async () => null) as never);
    expect(all).toEqual([]);
  });
});

describe("isPublishedStable — what earns a release page", () => {
  const base = {
    tag_name: "v0.47.0",
    name: "0.47.0",
    body: "notes",
    published_at: "2026-08-01T00:00:00Z",
    html_url: "https://example.invalid",
    prerelease: false,
    draft: false,
  };

  it("accepts a shipped stable release that has something written on it", () => {
    expect(isPublishedStable(base as never)).toBe(true);
  });

  it("refuses a prerelease, a draft, and a release with an empty body", () => {
    expect(isPublishedStable({ ...base, prerelease: true } as never)).toBe(false);
    expect(isPublishedStable({ ...base, draft: true } as never)).toBe(false);
    expect(isPublishedStable({ ...base, body: "   " } as never)).toBe(false);
  });
});
