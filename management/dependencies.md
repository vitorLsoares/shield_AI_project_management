# Shield AI MVP Dependencies

## External Vendors (ARD §9)

| Provider Type | Examples | Purpose | Latency Budget |
|---------------|----------|---------|-----------------|
| URL Reputation | VirusTotal, URLhaus, Google Safe Browsing | Malicious URL detection | 3s per call |
| OCR | Google Vision, AWS Textract, Azure OCR | Extract text from images | 5s |
| Vision | OpenAI GPT-4 Vision, Google Vision | Visual scam patterns | 5s |
| Payment | Stripe, AbacatePay | Subscription checkout | Not critical path |
| Auth | Supabase Auth | JWT validation | — |

## Infrastructure

| Service | Provider | Purpose |
|---------|----------|---------|
| API | Fly.io | Go API hosting |
| Frontend | Vercel | Next.js hosting |
| Database | Supabase Postgres | Analysis Store, labels |
| Cache | Upstash Redis (or in-memory) | Operational cache |
| Logs | Betterstack/Axiom | Structured logging |
| Metrics | Grafana Cloud | Prometheus |

## Budget Ceiling

**Target:** ≤ $500/month (PRD §1.3)
