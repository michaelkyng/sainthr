# SaintHR

SaintHR is a Nuxt 4 landing page for HR services.

## Setup

Install dependencies:

```bash
bun install
```

Add the Clerk keys for the shared auth layer to your local `.env`:

```bash
NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
NUXT_CLERK_SECRET_KEY=sk_test_...
```

Run the development server:

```bash
bun dev
```

Open http://localhost:3000 in your browser.

## Scripts

```bash
bun build
bun start
bun lint
bun typecheck
```
