# syntax=docker/dockerfile:1
#
# SaintHR — admin service
#
# IMPORTANT: This is a Bun monorepo. The Docker build context MUST be the
# repository root, not apps/admin. On Render:
#   - Dockerfile Path: apps/admin/Dockerfile
#   - Root Directory:  (leave blank — i.e. the repo root)
#
# To build locally from the repo root:
#   docker build -f apps/admin/Dockerfile -t sainthr-admin .
#   docker run --rm -p 3002:3002 --env-file .env sainthr-admin

ARG BUN_VERSION=1.3.11

# ---------- build ----------
FROM oven/bun:${BUN_VERSION} AS build
WORKDIR /app
ENV NODE_ENV=production

# Install deps from manifests only so this layer caches until the
# lockfile or any workspace package.json changes.
COPY package.json bun.lock ./
COPY apps/site/package.json ./apps/site/package.json
COPY apps/careers/package.json ./apps/careers/package.json
COPY apps/admin/package.json ./apps/admin/package.json
RUN bun install --frozen-lockfile

# Copy the rest of the monorepo (layers/, public/, types/, app source).
COPY . .

# The build script passes `--dotenv ../../.env`; create an empty file so the
# flag resolves. Real values are injected at runtime by Render.
RUN touch .env

# Produce the self-contained Nitro server at apps/admin/.output
RUN bun --filter=@sainthr/admin run build

# ---------- runtime ----------
FROM oven/bun:${BUN_VERSION} AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3002

# Nitro's node-server output is fully self-contained (deps are bundled in).
COPY --from=build /app/apps/admin/.output ./.output

USER bun
EXPOSE 3002
CMD ["bun", "/app/.output/server/index.mjs"]
