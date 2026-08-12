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
import { getJson } from "./fetch-releases";

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
      getJson("https://cdn.example/latest.json", "the updater manifest (latest.json)"),
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
    await expect(getJson("https://x/y", "the release list")).rejects.toBeInstanceOf(Exited);
    expect(upstream.out().toLowerCase()).toContain("re-run");

    vi.restoreAllMocks();

    const ours = harness();
    answering({ status: 404, body: "nope" });
    await expect(getJson("https://x/y", "the release list")).rejects.toBeInstanceOf(Exited);
    // A 404 is a wrong repo or a dead token. Telling someone to re-run would send them to wait for
    // a recovery that is never coming.
    expect(ours.out().toLowerCase()).not.toContain("re-run the build");
  });

  it("says so when a 200 is not JSON, which is the case that used to be unreadable", async () => {
    const { out } = harness();
    answering({ status: 200, body: "<html><body>hi" });

    await expect(getJson("https://x/y", "the latest release")).rejects.toBeInstanceOf(Exited);

    expect(out()).toContain("200");
    expect(out()).toContain("not JSON");
    expect(out()).toContain("the latest release");
  });

  it("reports a connection that never got a reply at all", async () => {
    const { out } = harness();
    vi.stubGlobal("fetch", async () => {
      throw new Error("getaddrinfo ENOTFOUND api.github.com");
    });

    await expect(getJson("https://x/y", "the latest release")).rejects.toBeInstanceOf(Exited);

    // No status exists here, so the status branch must not be the one that runs.
    expect(out()).toContain("could not reach");
    expect(out()).toContain("ENOTFOUND");
  });
});
