# T-0000b: Next.js App Scaffolding

## Task ID
T-0000b

## Related Story
[US-0000](../user-stories/US-0000-architecture-setup.md) — Architecture Setup & Project Configuration

## Owner
FE

## Description / Goal
Create the Next.js app with app router structure, routes for Home, Settings, and placeholder verdict page. Configure env, Supabase client setup. Mobile-first base layout.

## Implementation Steps
1. Initialize Next.js app (App Router) with TypeScript.
2. Create route structure: `/` (Home), `/settings`, `/verdict` (placeholder).
3. Add base layout with responsive container.
4. Configure environment variables (`.env.example` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
5. Add Supabase client initialization (createClient).
6. Add placeholder pages with minimal content (e.g., "Home", "Settings", "Verdict placeholder").
7. Configure API base URL for backend (env var).

## Definition of Done
- [ ] Routes exist for Home, Settings, Verdict
- [ ] Supabase client configured
- [ ] Env schema documented in .env.example
- [ ] App runs locally

## Checklist
- [ ] Design Spec §5 routing alignment
- [ ] No secrets in client code (public vars only)
- [ ] Mobile-first base styles

## Estimation
S

## Complexity
2

## Dependencies
- Next.js 14+
- Supabase JS client

## Testing Notes
- Manual: navigate to each route, verify pages render
- Verify env loading

## Security/Privacy Notes
- Only `NEXT_PUBLIC_*` vars in client; no server secrets exposed
