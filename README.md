# SmartSpace

SmartSpace is an AI-powered real-estate companion built with Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma, Redis, and BullMQ. It brings market intelligence, commute-aware matching, listing generation, bilingual property guidance, saved items, guest exploration, and moderation foundations into one calm consumer product.

## Included

- Premium responsive landing page and dashboard with dark mode
- Interactive Bengaluru market map with heat layers and explainable locality summaries
- Lifestyle and commute-aware match view with transparent ranking factors
- AI listing studio for photos, English/Hindi voice-note UX, structured facts, and editable drafts
- Grounded English/Hindi assistant with preview-safe responses and source labels
- Google OAuth, email magic-link, and HTTP-only guest-session entry points
- Temporary guest favorites with server-side rate limits
- PostgreSQL schema for users, identities, guest claims, properties, listings, media, analytics, commute profiles, saves, AI output, audit logs, reports, and moderation actions
- Owner-only listing mutations and locked administrator routes
- Security headers, CSP, Zod validation, structured logs, upload size/type checks, and Redis/BullMQ adapters

## Local setup

1. Install Node.js 22 or later and npm.
2. Copy `.env.example` to `.env.local`.
3. Start PostgreSQL and Redis:

   ```bash
   docker compose up -d
   ```

4. Install dependencies and generate the Prisma client:

   ```bash
   npm install
   npm run db:generate
   ```

5. Create tables and load sample database content:

   ```bash
   npm run db:push
   npm run db:seed
   ```

6. Start the app:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

The product UI and the local grounded AI preview work without external provider keys. Google, email, database mutations, object-storage upload signing, queue workers, external AI, and routing providers intentionally activate only when configured.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APP_URL` | Canonical application URL |
| `AUTH_SECRET` | Long random secret used by Auth.js |
| `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` | Google OAuth credentials |
| `EMAIL_SERVER`, `EMAIL_FROM` | SMTP connection and sender for magic links |
| `ADMIN_EMAILS` | Comma-separated administrator allowlist |
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string for cache, distributed rate limits, and queues |
| `OPENAI_API_KEY` | External multimodal AI integration |
| `STORAGE_*` | Private object-storage configuration |
| `NEXT_PUBLIC_MAPBOX_TOKEN`, `MAPBOX_ACCESS_TOKEN` | Client map rendering and server routing credentials |

## Security model

- Sensitive mutations are authorized on the server. Listing edits and archive actions query the listing owner from PostgreSQL and do not trust client-supplied ownership.
- Guest sessions use random opaque HTTP-only cookies with `SameSite=Lax`, expiry limits, isolated temporary state, and per-action throttles.
- The local rate limiter is intentionally process-local for zero-infrastructure development. Deployments should back the same policies with Redis so limits remain consistent across instances.
- Upload negotiation checks permitted MIME types and a 12 MB cap before handing off to private object storage. The app refuses uploads if secure storage is not configured. Production storage adapters should issue short-lived signed URLs, strip image metadata during media processing, and return private delivery URLs.
- The app sends a restrictive CSP and standard browser hardening headers from `next.config.ts`.
- Admin access is denied unless the signed-in email appears in `ADMIN_EMAILS`.
- Logs avoid common secret-bearing fields and privileged actions write audit-log rows.

## Production architecture

Run the Next.js application behind a CDN, reverse proxy, and WAF. Use PostgreSQL for durable domain data, Redis for distributed caching and throttling, and BullMQ workers for image metadata removal, image quality checks, speech transcription, and multimodal listing generation. Keep original uploads private and expose media only through short-lived signed delivery URLs.

The local UI uses curated Bengaluru sample data so the product remains explorable before providers are connected. Replace the map preview with the Mapbox client SDK and connect server-side commute calculations through the Mapbox routing API when tokens are available.

## Useful commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
npm run db:generate
npm run db:push
npm run db:seed
```

=======
# smart-space
>>>>>>> e13b6fabd107ca87f7fde7befcef74bea57c9413



*THE ENTIRE PROJECT WAS VIBECODED BY CODEX AND ANTIGRAVITY FOR A GDG EVENT (yes even the readme).*
