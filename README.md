# Dashboard-SMMS

Social Media Management System — Next.js 16 + Supabase + Prisma.

**Repository:** https://github.com/sanggaluriparkpurbalingga-dev/Dashboard-SMMS

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript 5
- Supabase (Auth + Postgres)
- Prisma ORM 5.22
- Tailwind CSS v4

## Getting Started

1. Copy `.env.example` to `.env.local` and fill the new Supabase project's URL,
   publishable key, pooled database URL, and direct database URL.
2. Install deps: `npm install` (auto-runs `prisma generate` via postinstall).
3. Run dev server: `npm run dev` → open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

The production project is deployed from the `main` branch of
[sanggaluriparkpurbalingga-dev/Dashboard-SMMS](https://github.com/sanggaluriparkpurbalingga-dev/Dashboard-SMMS).

Configure these environment variables for both Production and Preview before
deploying:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `DATABASE_URL`
- `DIRECT_URL`

Do not commit production values to GitHub. `.env.local` is only used by the
local machine and is ignored by Git; Vercel reads values configured in the
project's Environment Variables settings. All Supabase and database values
must come from the same Supabase project.

`DATABASE_URL` is required at runtime because the application accesses the
database through Prisma. `DIRECT_URL` is reserved for migrations and other
direct-connection tooling.

After changing environment variables, redeploy the project because
`NEXT_PUBLIC_*` values are embedded during `next build`.

### Supabase production setup

1. Create the production admin in Supabase Auth and copy the user's UUID.
2. Insert `Instagram` and `TikTok` rows into `public.workspace`, using the
   admin UUID as `author_id`.
3. Set the Supabase Auth Site URL to the production Vercel domain.
4. Add `https://<production-domain>/auth/callback` to the allowed redirect
   URLs.

The application intentionally starts without content data, but the two
workspace rows are required for the new admin to enter the dashboard.
