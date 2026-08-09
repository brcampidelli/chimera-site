# Deploying chimeraagent.space

A folder of files on Hostinger shared hosting, served by LiteSpeed, behind a certificate the panel
issued on its own.

## Why this shape

The first draft of this directory assumed the VPS — nginx in a container, behind the Traefik that
already terminates TLS there. That was written before the hosting question was settled, and it is
gone. The site lives on the Cloud Enterprise plan that was already paid for, alongside three other
domains, which is a plan with an account rather than a box with a root shell.

What survived the move is the part that mattered: **the document root is a symlink.**

```
/home/<user>/
├── chimera-site/releases/
│   ├── <sha>/          ← the last five builds
│   └── <sha>/
└── domains/chimeraagent.space/public_html -> ../../chimera-site/releases/<sha>
```

That is not an assumption. It was tested against this host before the workflow was written: a probe
directory was symlinked in and fetched over HTTPS, and it came back `200` with the probe's contents.
LiteSpeed follows it.

A deploy writes the new tree beside the old one and moves the symlink. The site is one directory
until the instant it is the other; it is never half-written. A rollback is the same command:

```bash
ln -sfn ~/chimera-site/releases/<older-sha> ~/domains/chimeraagent.space/public_html
```

`rsync --link-dest` points at the previous release, so a deploy that changes six pages transfers six
pages rather than the whole 80 MB.

## What the workflow does

`.github/workflows/deploy.yml`, on push to main, on a release of the product, and nightly:

1. runs the same gates CI runs — including `verify:truth`, after the build, because it reads the
   rendered HTML;
2. rsyncs to a new release directory and moves the symlink;
3. keeps five, deletes the rest;
4. **checks ten URLs against the server by `--resolve`**, not by DNS. A smoke test that resolves
   the domain would pass by reaching whatever the domain currently points at, which during a DNS
   change is precisely not the thing being tested.

There is no pre-compression step. LiteSpeed compresses on the fly, so `.gz` files beside the
originals would be dead weight in every release directory.

The two `.htaccess` files are **not** copied here. `scripts/postbuild.ts` renders them into `out/`,
because one of the rules has to name every language the site builds, and that list already exists in
`src/i18n/locales.ts`. The template carries `@LOCALES@`; a build that leaves it unsubstituted throws
rather than shipping a rewrite rule that matches a literal at-sign.

## Secrets it needs

| Secret | What |
|---|---|
| `HOSTINGER_SSH_KEY` | the private half of the deploy key, ed25519, no passphrase |
| `HOSTINGER_SSH_HOST` | the hosting's IP |
| `HOSTINGER_SSH_USER` | the hosting account's username |

Host and user are secrets rather than literals in this file because the repository is public and SSH
password authentication is enabled on the account: publishing `user@ip` here would be publishing a
target. The port, `65002`, is the same for every Hostinger account and is in the workflow.

And one repository variable, `CHIMERA_REF`, pinning which tag of the product the site renders. It
defaults to `main`, which is fine while both move together and wrong the moment they do not.

## The two ways this breaks

**The panel can un-symlink the document root.** Hostinger's file manager and its site tools expect
`public_html` to be a directory. If someone opens the file manager for this domain and the panel
recreates it, deploys will keep succeeding — writing to a release directory nobody serves — while the
site freezes at whatever it last was. The smoke test is what catches it: it fetches the built pages
through the web server, so a document root that has stopped pointing at the new release fails the
step rather than passing it quietly.

**The plan is shared.** Three other domains live in this account, and a runaway release directory
would eat their disk as well as this one's. Hence keeping five and no more.

## DNS

The domain's nameservers were moved from Hostinger's parking pair to `ns1`/`ns2.dns-parking.com` —
the pair the hosting itself answers on — by the panel's own "connect domain" action. The certificate
was already in place before the site had a single file in it, which is why the probe above could be
fetched over HTTPS at all.
