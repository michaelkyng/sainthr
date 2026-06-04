# Deploying SaintHR to Render

This is a Bun monorepo with three independent Nuxt 4 apps. Each is dockerized
**separately** (no docker-compose) so you can create one Render **Web Service**
per app.

| App     | Dockerfile                | Default port | Workspace         |
| ------- | ------------------------- | ------------ | ----------------- |
| site    | `apps/site/Dockerfile`    | 3000         | `@sainthr/site`   |
| careers | `apps/careers/Dockerfile` | 3001         | `@sainthr/careers`|
| admin   | `apps/admin/Dockerfile`   | 3002         | `@sainthr/admin`  |

## Why the build context is the repo root

The apps share `layers/`, `public/`, `types/`, the root `package.json`, and a
single `bun.lock`. Each Dockerfile therefore expects the **repository root** as
its build context and references the app via `bun --filter`.

## Create each service on Render

For **each** of the three apps, create a new **Web Service** from this repo and set:

- **Language / Runtime:** Docker
- **Root Directory:** _(leave blank — must be the repo root)_
- **Dockerfile Path:** `apps/<app>/Dockerfile` (e.g. `apps/site/Dockerfile`)
- **Instance Type:** any (the apps are SSR Node/Bun servers)

Render auto-detects the listening port from the `PORT` env var it injects, and
Nitro binds to `0.0.0.0:$PORT` automatically — no extra port config needed.

## Environment variables (set per service in Render)

Secrets are injected at runtime, never baked into the image. Set these in each
service's **Environment** tab (see `.env.example`):

**site**
- `NUXT_PUBLIC_CAREERS_URL` → the careers service's Render URL

**careers**
- `NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NUXT_CLERK_SECRET_KEY`
- `NUXT_PUBLIC_MAIN_SITE_URL` → the site service's Render URL
- `NUXT_PUBLIC_API_BASE_URL` → your backend API (optional)

**admin**
- `NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NUXT_CLERK_SECRET_KEY`
- `NUXT_PUBLIC_MAIN_SITE_URL` → the site service's Render URL
- `NUXT_PUBLIC_CAREERS_URL` → the careers service's Render URL

> All `NUXT_PUBLIC_*` and `NUXT_CLERK_*` values are Nuxt `runtimeConfig`, so they
> can be changed in Render without rebuilding the image.

## Build & run locally (optional sanity check)

From the repository root:

```bash
# site
docker build -f apps/site/Dockerfile -t sainthr-site .
docker run --rm -p 3000:3000 --env-file .env sainthr-site

# careers
docker build -f apps/careers/Dockerfile -t sainthr-careers .
docker run --rm -p 3001:3001 --env-file .env sainthr-careers

# admin
docker build -f apps/admin/Dockerfile -t sainthr-admin .
docker run --rm -p 3002:3002 --env-file .env sainthr-admin
```
