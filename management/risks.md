# Shield AI MVP Risks

## Risks and Mitigations (PRD §11)

| Risk | Mitigation |
|------|------------|
| False negatives (golpe classified as LOW) | UNCERTAIN guardrail; two independent signals rule |
| Abuse (bots using free analysis) | Rate limit (10 req/min, 60 req/h); bot detection |
| PII leakage (logs, share card, storage) | No raw text/URL/images; share card PII masked; vault for secrets |
| Provider cost | Cache 48h; fallback chain; kill switch |

## Threat Model (ARD §7)

| Threat | Mitigation |
|--------|------------|
| T1: Malicious input (XSS, SQLi) | Input validation; parameterized queries |
| T2: SSRF | Allowlist http/https; block private IPs; redirect limit 5 |
| T3: Cache poisoning | Hash-based keys; 48h TTL |
| T4: API abuse | Rate limiting; WAF (Cloudflare) |
| T5: Phishing via Shield | Clear messaging: "Shield is a tool, not a guarantee" |
| T6: PII leakage | Hash URLs; minimal logging; share card masking |
| T7: Provider API key theft | Secrets in vault |
| T8: MITM | TLS 1.3; HSTS |
