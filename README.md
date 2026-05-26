# Strength Scaling CRM

A fast internal SDR sales operating system for Strength Scaling, built with Next.js, TypeScript, Tailwind CSS, Vercel, and Supabase.

## Product Focus

The main workflow is intentionally narrow:

Rep logs in -> opens My Queue -> works one lead -> logs outcome -> saves note -> loads the next lead instantly.

Pipeline and Clients are merged into one internal team revenue workspace for active opportunities, won clients, onboarding, and manager review.

## Run Locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add your Supabase values.

## Deploy

This project is ready to import into Vercel. Add the same Supabase environment variables in the Vercel project settings.

## Database

Use `supabase/schema.sql` as the starting schema for Supabase.
