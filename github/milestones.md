# Shield AI — Milestones

## MVP Milestone

**Name:** MVP  
**Due:** TBD (target: 12 weeks from kickoff)  
**Description:** Shield AI MVP — Architecture Setup, URL Check, Message Checklist, Shareable Verdict, QR Scan, OCR/Vision, Paywall, Contact CTA, Onboarding, Settings, Ground Truth, Infrastructure.

### Exit Criteria (Definition of Release)

- [ ] All P0 User Stories delivered and accepted (including US-0000 Architecture Setup)
- [ ] All P1 User Stories delivered (or explicitly deferred with approval)
- [ ] TTFV p50 ≤ 10s, p95 ≤ 25s (load tested)
- [ ] Rate limiting enforced (10 req/min, 60 req/h)
- [ ] Secrets in vault; no PII in logs
- [ ] LGPD delete-on-request <24h operational
- [ ] Ground truth: 150 samples labeled in first week
- [ ] Paywall: Free cannot access QR/OCR (integration test)
- [ ] URL normalization: 100 test cases pass
- [ ] Security audit (AAC-002) passed
- [ ] DR drill: backup restore, RTO <4h

### Linked Issues

Link all User Stories and Tasks with `milestone:MVP`.
