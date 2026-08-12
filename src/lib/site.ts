/**
 * Every external URL the site knows, in one place.
 *
 * All of these were read out of the product repository — README badges, `pyproject.toml` urls,
 * `tauri.conf.json`, the release workflow. There is deliberately no Twitter, no YouTube and no
 * GitHub Sponsors here, because those do not exist. A footer link to a channel nobody runs is a
 * small lie that costs a visitor a click and some trust.
 */
export const SITE = {
  name: "Chimera",
  domain: "chimeraagent.space",
  url: "https://chimeraagent.space",
  /** The product is alpha and says so in four places in its own README. So does the site. */
  status: "alpha",
  license: "Apache-2.0",
  copyrightHolder: "The Chimera Agent Authors",
} as const;

export const LINKS = {
  github: "https://github.com/brcampidelli/chimera-agent",
  issues: "https://github.com/brcampidelli/chimera-agent/issues",
  releases: "https://github.com/brcampidelli/chimera-agent/releases",
  releasesLatest: "https://github.com/brcampidelli/chimera-agent/releases/latest",
  changelog: "https://github.com/brcampidelli/chimera-agent/blob/main/CHANGELOG.md",
  license: "https://github.com/brcampidelli/chimera-agent/blob/main/LICENSE",
  contributing: "https://github.com/brcampidelli/chimera-agent/blob/main/CONTRIBUTING.md",
  security: "https://github.com/brcampidelli/chimera-agent/blob/main/SECURITY.md",
  pypi: "https://pypi.org/project/chimera-agent/",
  discord: "https://discord.gg/ACvBbrmguV",
  reddit: "https://www.reddit.com/r/ChimeraAgent/",
  donate: "https://buy.stripe.com/9B6aEQ57q91m1Gp7Lz77O01",
} as const;

export const REPO = { owner: "brcampidelli", name: "chimera-agent" } as const;
