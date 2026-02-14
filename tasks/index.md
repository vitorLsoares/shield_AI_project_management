# Shield AI Tasks Index

## By Plan

### Phase 0 — Foundation (Cross-cutting)

| Task | Description | Owner |
|------|-------------|-------|
| [T-0000a](T-0000a-go-scaffolding.md) | Go API Project Scaffolding | BE |
| [T-0000b](T-0000b-nextjs-scaffolding.md) | Next.js App Scaffolding | FE |
| [T-0000c](T-0000c-ci-skeleton.md) | CI Skeleton (GitHub Actions) | Infra |

### Frontend Plan

| Task | Description | Owner |
|------|-------------|-------|
| [T-0004](T-0004-share-card-generation.md) | Share Card Generation | FE |
| [T-0005](T-0005-qr-decode-paywall.md) | QR Decode & Paywall | FE + BE |
| [T-0007](T-0007-stripe-abacate-checkout.md) | Stripe/AbacatePay Checkout | BE + FE |
| [T-0008](T-0008-contact-cta-form.md) | Contact CTA Form | FE + BE |
| [T-0009](T-0009-home-input-hub-ui.md) | Home Input Hub UI | FE |
| [T-0010](T-0010-onboarding-flow.md) | Onboarding Flow | FE |
| [T-0011](T-0011-settings-delete-data.md) | Settings & Delete Data | FE + BE |

### Backend Plan

| Task | Description | Owner |
|------|-------------|-------|
| [T-0001](T-0001-url-normalization-cache.md) | URL Normalization & Cache | BE |
| [T-0002](T-0002-url-analysis-pipeline.md) | URL Analysis Pipeline | BE |
| [T-0003](T-0003-message-analysis-service.md) | Message Analysis Service | BE |
| [T-0005](T-0005-qr-decode-paywall.md) | QR Decode & Paywall | FE + BE |
| [T-0006](T-0006-ocr-vision-pipeline.md) | OCR/Vision Pipeline | BE |
| [T-0007](T-0007-stripe-abacate-checkout.md) | Stripe/AbacatePay Checkout | BE + FE |
| [T-0008](T-0008-contact-cta-form.md) | Contact CTA Form | FE + BE |
| [T-0011](T-0011-settings-delete-data.md) | Settings & Delete Data | FE + BE |
| [T-0012](T-0012-ground-truth-panel.md) | Ground Truth Panel | BE + QA |
| [T-0013](T-0013-rate-limiting-abuse.md) | Rate Limiting & Abuse | BE/Infra |
| [T-0014](T-0014-secrets-vault-logging.md) | Secrets, Vault & Logging | BE/Sec |
| [T-0015](T-0015-observability-events.md) | Observability & Events | BE/Infra |
| [T-0016](T-0016-deployment-cicd.md) | Deployment & CI/CD | Infra |

---

## By Story

| Story | Tasks |
|-------|-------|
| US-0000 | T-0000a, T-0000b, T-0000c |
| US-0001 | T-0001, T-0002 |
| US-0002 | T-0003 |
| US-0003 | T-0004 |
| US-0004 | T-0005 |
| US-0005 | T-0006 |
| US-0006 | T-0007 |
| US-0007 | T-0008 |
| US-0008 | T-0009, T-0010 |
| US-0009 | T-0011 |
| US-0010 | T-0012 |
| US-0011 | T-0013, T-0014, T-0015, T-0016 |

---

## By Owner

| Owner | Tasks |
|-------|-------|
| FE | T-0000b, T-0004, T-0009, T-0010, T-0011 (partial) |
| BE | T-0000a, T-0001, T-0002, T-0003, T-0005, T-0006, T-0008, T-0011 (partial) |
| Infra | T-0000c, T-0013, T-0014, T-0015, T-0016 |
| QA | T-0012 (partial) |
| Sec | T-0014 (partial) |
