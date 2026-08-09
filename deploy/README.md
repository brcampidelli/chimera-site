# Deploying chimeraagent.space

A folder of files, served by nginx, behind the Traefik that already runs on the VPS.

## Why this shape

The VPS (`srv1666151.hstgr.cloud`, `2.24.95.82`) already has Traefik on 80 and 443 with Let's
Encrypt over the HTTP challenge and a global HTTP→HTTPS redirect. It only routes to containers that
opt in with a label. So the site needed no web server of its own and no certificate handling — two
labels and an nginx container.

The document root is a symlink:

```
/srv/chimeraagent/
├── releases/
│   ├── <sha>/          ← the last five builds
│   └── <sha>/
└── current -> releases/<sha>
```

A deploy writes the new tree beside the old one and moves the symlink. The site is one directory
until the instant it is the other; it is never half-written. A rollback is the same command:

```bash
ln -sfn /srv/chimeraagent/releases/<older-sha> /srv/chimeraagent/current
```

## First run

```bash
ssh root@srv1666151.hstgr.cloud
mkdir -p /srv/chimeraagent/releases
# put deploy/docker-compose.yml and deploy/nginx.conf in /srv/chimeraagent/
cd /srv/chimeraagent && docker compose up -d
```

The container starts before there is anything to serve, and 404s until the first deploy lands.
That is the correct order: Traefik needs the router to exist before it will request a certificate.

## What the workflow does

`.github/workflows/deploy.yml`, on push to main, on a release of the product, and nightly:

1. runs the same gates CI runs — including `verify:truth`, after the build, because it reads the
   rendered HTML;
2. pre-compresses, so nginx spends no CPU on gzip;
3. rsyncs to a new release directory and moves the symlink;
4. keeps five, deletes the rest;
5. **checks five URLs against the server by `Host` header**, not by DNS. A smoke test that resolves
   the domain would pass by reaching whatever the domain currently points at, which during a DNS
   change is precisely not the thing being tested.

## Secrets it needs

| Secret | What |
|---|---|
| `HOSTINGER_SSH_KEY` | private key with access to `root@` the VPS |
| `HOSTINGER_HOST` | `srv1666151.hstgr.cloud` |

And one repository variable, `CHIMERA_REF`, pinning which tag of the product the site renders. It
defaults to `main`, which is fine while both move together and wrong the moment they do not.

## DNS

Two A records at Hostinger, apex and `www`, both `2.24.95.82`. The domain ships with parking
nameservers pointing somewhere else, so nothing works until those two records exist — and the
certificate cannot be issued until they do either, because the HTTP challenge has to reach this
box.
