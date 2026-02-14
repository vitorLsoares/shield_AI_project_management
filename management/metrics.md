# Shield AI MVP Metrics

## Success Metrics (PRD §1.3)

| Metric | Target | Source |
|--------|--------|--------|
| TTFV p50 | ≤ 10s | PRD §1.3 |
| TTFV p95 | ≤ 25s | PRD §1.3 |
| Cache hit rate | High (reduce reprocessing) | PRD §1.3 |
| UNCERTAIN when uncertain | Guardrail | PRD §4.2 |
| FP/FN (via ground truth) | Measured by sampling | PRD §9 |

## SLI/SLO (ARD §5.7)

| SLI | SLO Target | Alert Threshold |
|-----|------------|------------------|
| Availability (Verdict API) | 99.5% monthly | 5-min downtime |
| TTFV p50 | ≤ 10s | p50 >12s for 10 min |
| TTFV p95 | ≤ 25s | p95 >30s for 10 min |
| Error Rate | <2% | >5% for 5 min |
| UNCERTAIN Rate | <10% (normal) | >20% for 15 min |
| Store Hit Ratio | >30% after 1 month | <20% for 24h |

## Analytics Events (PRD §10.1)

- `check_started`, `check_completed`, `verdict_shown`
- `share_verdict_clicked`, `share_verdict_completed`
- `message_check_started`, `message_check_completed`
- `qr_scan_started`, `qr_scan_completed`
- `ocr_started`, `ocr_completed`
- `paywall_shown`, `checkout_started`, `checkout_completed`
- `contact_cta_shown`, `contact_submitted`
