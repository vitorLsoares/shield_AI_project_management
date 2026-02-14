# Shield AI MVP Backlog & GitHub Projects Bundle

**Generated:** 2026-02-14  
**Source:** PRD v3.0, ARD Consolidated 1.0, Design Spec 1.0  
**Project:** Shield AI Security

---

## Repository Folder Tree

```
/management
  index.md
  mvp-scope.md
  roadmap.md
  metrics.md
  risks.md
  decisions.md
  dependencies.md

/user-stories
  index.md
  US-0001-url-check-free.md
  US-0002-message-checklist-free.md
  US-0003-shareable-verdict-free.md
  US-0004-qr-scan-premium.md
  US-0005-ocr-vision-premium.md
  US-0006-paywall-checkout.md
  US-0007-contact-cta-capture.md
  US-0008-onboarding-home-input.md
  US-0009-settings-privacy-delete.md
  US-0010-ground-truth-labeling.md
  US-0011-infrastructure-deployment.md

/tasks
  index.md
  T-0001-url-normalization-cache.md
  T-0002-url-analysis-pipeline.md
  T-0003-message-analysis-service.md
  T-0004-share-card-generation.md
  T-0005-qr-decode-paywall.md
  T-0006-ocr-vision-pipeline.md
  T-0007-stripe-abacate-checkout.md
  T-0008-contact-cta-form.md
  T-0009-home-input-hub-ui.md
  T-0010-onboarding-flow.md
  T-0011-settings-delete-data.md
  T-0012-ground-truth-panel.md
  T-0013-rate-limiting-abuse.md
  T-0014-secrets-vault-logging.md
  T-0015-observability-events.md
  T-0016-deployment-cicd.md

/kanban
  board.md

/github
  labels.md
  milestones.md
  issue-templates.md
  projects-import.md
```

---

--- file: /management/index.md ---

# Shield AI — Management Index

## Overview

This folder contains the management artifacts for the Shield AI MVP delivery.

## Documents

| Document | Purpose |
|----------|---------|
| [mvp-scope.md](mvp-scope.md) | MVP scope definition, in/out boundaries |
| [roadmap.md](roadmap.md) | Phased delivery plan |
| [metrics.md](metrics.md) | Success metrics and SLIs |
| [risks.md](risks.md) | Risks and mitigations |
| [decisions.md](decisions.md) | Key decisions and conflicts |
| [dependencies.md](dependencies.md) | External dependencies and vendors |

## Traceability

- **PRD:** [PRD/index_PRD.md](../../PRD/index_PRD.md) v3.0
- **ARD:** [ARD/Shield_AI_Security_ARD_Consolidated.md](../../ARD/Shield_AI_Security_ARD_Consolidated.md)
- **Design Spec:** [Design Spec/Shield_Ai_Security_Design_Spec.md](../../Design%20Spec/Shield_Ai_Security_Design_Spec.md)

---

--- file: /management/mvp-scope.md ---

# Shield AI MVP Scope

## In Scope (MVP)

| Feature | Tier | Source |
|---------|------|--------|
| URL Check | Free | PRD §6.1 |
| Message Checklist | Free | PRD §6.2 |
| Shareable Verdict | Free | PRD §6.3 |
| QR Scan | Premium | PRD §6.4 |
| OCR + Vision Screenshot/Image Analysis | Premium | PRD §6.5 |
| Paywall + Web Checkout | — | PRD §2.2, §12 |
| Contact CTA (email/WhatsApp capture) | Free | PRD §2.3 |
| Onboarding (3-screen) | — | Design Spec §5 |
| Home / Input Hub | — | Design Spec §5 |
| Settings (Language, Privacy, Delete data) | — | Design Spec §5, PRD §8.4 |
| LGPD Delete-on-request <24h | — | PRD §8.4 |
| Ground truth labeling pipeline (internal) | — | PRD §9 |
| Rate limiting (10 req/min, 60 req/h) | — | PRD §7.5 |
| Operational cache (48h TTL) | — | PRD §8.2 |
| Analysis Store (persistent, no expiration) | — | ARD §6 |
| Secrets in vault | — | PRD §7.4 |
| Observability (events, logs) | — | PRD §10 |

## Out of Scope (Post-MVP)

| Feature | Source |
|---------|--------|
| User-visible analysis history | PRD §6.6 |
| End-user feedback (thumbs up/down, mark safe/scam) | PRD §6.6 |
| Automated LGPD export report | PRD §6.6 |
| Browser extensions / integrations | PRD §6.6 |
| Proactive alerts | PRD §12 |
| Multi-language (i18n beyond PT-BR) | ARD Appendix B |
| Microservice architecture | ARD Appendix B |

---

--- file: /management/roadmap.md ---

# Shield AI MVP Roadmap

## Phases (ARD §12.1)

| Phase | Duration | Focus |
|-------|----------|-------|
| **MVP1: Core URL Check** | Weeks 1–6 | Provider adapters, scoring engine, cache, Analysis Store, API, frontend URL input, rate limiting |
| **MVP2: QR + Message** | Weeks 7–9 | QR decode, message analysis, OpenAI explanation, frontend QR scanner + message input |
| **MVP3: Polish + Beta** | Weeks 10–12 | Shareable verdict cards, onboarding, feature flags, paywall, checkout |

## Critical Path

- Provider PoC (Week 2)
- OCR/Vision provider selection (Week 3)
- Load testing (Week 10)

## Release Target

**MVP** — All P0 and P1 user stories delivered; exit criteria met (see [milestones.md](../github/milestones.md)).

---

--- file: /management/metrics.md ---

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

---

--- file: /management/risks.md ---

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

---

--- file: /management/decisions.md ---

# Shield AI MVP Decisions

## Document Conflicts (Needs Decision)

### DS-PRD-001: User Feedback and History Scope

**Conflict:** Design Spec §1 lists "User feedback mechanism (mark safe/scam)" and "History" as **IN SCOPE (MVP Design)**. PRD §6.6 explicitly states both are **Post-MVP**.

**PRD §6.6:** "Histórico visível ao usuário" and "Feedback do usuário (para evitar contaminação do dataset)" — Post-MVP.

**Decision:** **PRD prevails.** MVP does NOT include:
- User-visible history
- End-user feedback (thumbs up/down, mark safe/scam)

**Rationale:** PRD is the source of truth; user feedback could contaminate the ground truth dataset. History is deferred to Beta/GA.

**Status:** Resolved — follow PRD.

---

### DS-PRD-002: Verdict Taxonomy (Medium Risk)

**Conflict:** Design Spec uses "Medium Risk" (orange) in several flows. PRD §4.1 defines only: **HIGH RISK**, **LOW RISK**, **UNCERTAIN**.

**Decision:** **PRD prevails.** Use three verdict classes: HIGH RISK, LOW RISK, UNCERTAIN. Map "Medium Risk" UI to UNCERTAIN or adjust Design Spec to remove Medium.

**Status:** Resolved — use PRD taxonomy.

---

## Architecture Decisions (from ARD)

- **ADR-001:** Modular Monolith in Go
- **ADR-002:** Provider abstraction with fallback chain
- **ADR-003:** Aggressive caching (48h TTL)
- **ADR-004:** Weighted ensemble scoring (HIGH/LOW/UNCERTAIN)
- **ADR-005:** AI explanation via LLM (OpenAI/Claude)
- **ADR-006:** Supabase for Auth + DB + Storage
- **ADR-007:** Fly.io + Vercel deployment
- **ADR-008:** Rate limiting (10 req/min, 60 req/h)
- **ADR-013:** No user feedback in MVP

---

--- file: /management/dependencies.md ---

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

---

--- file: /user-stories/index.md ---

# Shield AI User Stories Index

## P0 (Must Have)

| ID | Title | Persona |
|----|-------|---------|
| [US-0001](US-0001-url-check-free.md) | URL Check (Free) | Cautious Everyday User |
| [US-0002](US-0002-message-checklist-free.md) | Message Checklist (Free) | Cautious Everyday User |
| [US-0003](US-0003-shareable-verdict-free.md) | Shareable Verdict (Free) | Family Safety Helper |

## P1 (Should Have)

| ID | Title | Persona |
|----|-------|---------|
| [US-0004](US-0004-qr-scan-premium.md) | QR Scan (Premium) | Cautious Everyday User |
| [US-0005](US-0005-ocr-vision-premium.md) | OCR + Vision (Premium) | Cautious Everyday User |
| [US-0006](US-0006-paywall-checkout.md) | Paywall + Checkout | Cautious Everyday User |

## P1 (Supporting)

| ID | Title | Persona |
|----|-------|---------|
| [US-0007](US-0007-contact-cta-capture.md) | Contact CTA Capture | All |
| [US-0008](US-0008-onboarding-home-input.md) | Onboarding + Home Input Hub | All |
| [US-0009](US-0009-settings-privacy-delete.md) | Settings + Privacy + Delete Data | All |
| [US-0010](US-0010-ground-truth-labeling.md) | Ground Truth Labeling Pipeline | Internal |
| [US-0011](US-0011-infrastructure-deployment.md) | Infrastructure + Deployment | Internal |

---

--- file: /user-stories/US-0001-url-check-free.md ---

# US-0001: URL Check (Free)

## Story ID
US-0001

## Persona
Cautious Everyday User (Everyday User)

## User Story
As a **cautious everyday user**, I want to **paste or share a suspicious URL and get a clear verdict with explanation and next steps**, so that **I can decide quickly whether to click or avoid a potential scam without needing technical knowledge**.

## Problem / Context
Users receive suspicious links via WhatsApp, SMS, or email. They need fast, plain-language guidance to avoid scams. PRD §1.1, §6.1.

## Scope

**In:** Paste/share URL → normalization → cache lookup → pipeline (redirect resolution, providers, heuristics) → verdict + explanation + checklist.

**Out:** User history, user feedback, browser extension.

## User Flow (High Level)
1. User opens app → sees URL input (Home)
2. User pastes or shares URL
3. System analyzes (cache hit → instant; miss → pipeline)
4. Verdict screen: risk score, explanation, recommended actions
5. Optional: Contact CTA after verdict

## Acceptance Criteria

### AC1: URL Normalization
**Given** a raw URL (with www, fragment, tracking params)  
**When** the user submits it  
**Then** the system normalizes it deterministically per PRD §7.1 (lowercase host, remove www, trailing slash, fragment, sort query params, remove utm_*, gclid, fbclid, igshid, IDN to punycode).

### AC2: Cache Hit
**Given** a URL was analyzed within the last 48 hours  
**When** the same (normalized) URL is submitted  
**Then** the system returns the cached verdict without reprocessing.

### AC3: Cache Miss Pipeline
**Given** a cache miss  
**When** the pipeline runs  
**Then** the system executes: redirect resolution (limit N=5), provider checks, heuristics, aggregates result, persists to Analysis Store (no PII), and returns verdict.

### AC4: Verdict Output
**Given** a completed analysis  
**When** the verdict is returned  
**Then** it includes: `url_risk_pct` (0–100), verdict class (HIGH RISK / LOW RISK / UNCERTAIN), and evidence (minimum 2 items when HIGH RISK).

### AC5: Timeout Guardrail
**Given** total analysis time exceeds 25 seconds  
**When** the timeout is reached  
**Then** the system returns UNCERTAIN with reason `timeout`.

## Non-Functional Requirements
- TTFV p50 ≤ 10s, p95 ≤ 25s (PRD §7.2)
- Rate limit: 10 req/min, 60 req/h per IP (PRD §7.5)

## Dependencies
- Provider adapters (VirusTotal, URLhaus, GSB)
- Operational cache (Redis)
- Analysis Store (Supabase)

## Risks & Assumptions
- **Assumption:** Provider APIs meet latency budgets (ARD-ASMP-003)
- **Risk:** Provider outage → UNCERTAIN (mitigated by fallback chain)

## Needs Validation
None.

## Analytics / Events
- `check_started` (check_type: url)
- `check_completed` (ttfv_ms, cache_hit, verdict_class, risk_pct)
- `verdict_shown`

## Release
MVP

## Priority
P0

## Linked Tasks
- [T-0001](../tasks/T-0001-url-normalization-cache.md) — URL Normalization & Cache
- [T-0002](../tasks/T-0002-url-analysis-pipeline.md) — URL Analysis Pipeline

---

--- file: /user-stories/US-0002-message-checklist-free.md ---

# US-0002: Message Checklist (Free)

## Story ID
US-0002

## Persona
Cautious Everyday User

## User Story
As a **cautious everyday user**, I want to **paste a suspicious message (WhatsApp/SMS/email) and get a risk assessment of the message and any links it contains**, so that **I can understand if the message is a phishing attempt and what to do**.

## Problem / Context
Phishing messages often combine urgency language, impersonation, and malicious links. Users need dual granularity: message-level risk + per-link risk. PRD §6.2.

## Scope

**In:** Paste text → extract signals (Pix, urgency, impersonation, etc.) → extract URLs → run URL Check per link (with cache) → return message_risk_pct + url_risk_pct per link.

**Out:** Persisting raw message text; user feedback.

## User Flow (High Level)
1. User taps "Analyze Message"
2. User pastes text in text area
3. System extracts signals and URLs
4. For each URL: URL Check (cached)
5. Verdict: message risk + per-link risk + explanation

## Acceptance Criteria

### AC1: Signal Extraction
**Given** pasted message text  
**When** analysis runs  
**Then** the system extracts structured signals (Pix, urgency, impersonation, etc.) without persisting the raw text.

### AC2: URL Extraction
**Given** message contains URLs  
**When** analysis runs  
**Then** the system extracts and normalizes URLs, running URL Check for each (with cache).

### AC3: Dual Granularity Output
**Given** analysis complete  
**When** verdict is returned  
**Then** it includes `message_risk_pct` and, if links exist, a list with `url_risk_pct` per link.

### AC4: Explanation Separation
**Given** verdict includes both message and URL findings  
**When** displayed to user  
**Then** the explanation separates "why the message is suspicious" from "why the link is suspicious".

## Non-Functional Requirements
- No raw message text stored (PRD §8.1)
- TTFV target < 8s for message-only (Design Spec)

## Dependencies
- US-0001 (URL Check)
- Message signal extraction (regex/keywords)

## Risks & Assumptions
- **Assumption:** Regex + keyword approach sufficient for MVP (no custom NLP)

## Needs Validation
None.

## Analytics / Events
- `message_check_started`
- `message_check_completed` (message_risk_pct, url_count)

## Release
MVP

## Priority
P0

## Linked Tasks
- [T-0003](../tasks/T-0003-message-analysis-service.md) — Message Analysis Service

---

--- file: /user-stories/US-0003-shareable-verdict-free.md ---

# US-0003: Shareable Verdict (Free)

## Story ID
US-0003

## Persona
Family Safety Helper

## User Story
As a **family safety helper**, I want to **share the verdict as a text card to family/group chats**, so that **I can warn others about a scam without them having to run the check themselves**.

## Problem / Context
Family members share suspicious links in group chats. A shareable verdict card helps protect others. PRD §6.3.

## Scope

**In:** Generate shareable card (text or image) with domain, date/time, verdict, 2–4 evidence bullets. PII masked. Share event emitted.

**Out:** Full URL in card; emails, phones, document numbers, Pix keys.

## User Flow (High Level)
1. User views verdict
2. User taps "Share"
3. System generates card (domain only, PII masked)
4. OS share sheet opens
5. User shares to WhatsApp/other

## Acceptance Criteria

### AC1: Share Content
**Given** a verdict is displayed  
**When** user taps "Share"  
**Then** the system generates consistent, readable content (domain + date/time + verdict + 2–4 evidence bullets).

### AC2: PII Masking
**Given** evidence may contain PII (emails, phones, document numbers, Pix keys)  
**When** the card is generated  
**Then** all PII is masked or removed per PRD §6.3.

### AC3: Share Event
**Given** user completes share  
**When** share is sent  
**Then** `share_verdict_completed` event is registered.

## Non-Functional Requirements
- Domain only (no full URL) in card (PRD §6.3)

## Dependencies
- US-0001 or US-0002 (verdict available)

## Risks & Assumptions
- **Risk:** Share cards could become spam (Design Spec §11) — mitigate with informative design.

## Needs Validation
None.

## Analytics / Events
- `share_verdict_clicked`
- `share_verdict_completed`

## Release
MVP

## Priority
P0

## Linked Tasks
- [T-0004](../tasks/T-0004-share-card-generation.md) — Share Card Generation

---

--- file: /user-stories/US-0004-qr-scan-premium.md ---

# US-0004: QR Scan (Premium)

## Story ID
US-0004

## Persona
Cautious Everyday User

## User Story
As a **cautious everyday user**, I want to **scan a QR code and get a verdict on the destination URL**, so that **I can check if a QR at a restaurant or event is safe before scanning**.

## Problem / Context
QR codes are used for menus, payments, and phishing. Users need to verify the destination before opening. PRD §6.4.

## Scope

**In:** Scan QR → resolve URL → run URL Check pipeline. Free: feature visible, paywall on action. Premium: full access.

**Out:** Trial of QR in MVP (PRD §2.2).

## User Flow (High Level)
1. User taps "Scan QR Code"
2. **Free:** Paywall shown → upgrade CTA
3. **Premium:** Camera opens → scan QR → resolve URL → preview → "Check this link" → URL pipeline → verdict

## Acceptance Criteria

### AC1: URL Resolution
**Given** QR code contains a URL  
**When** user scans (Premium)  
**Then** the system resolves the destination and applies URL normalization.

### AC2: Paywall (Free)
**Given** user is on Free tier  
**When** user taps "Scan QR Code"  
**Then** paywall appears; feature is blocked.

### AC3: Premium Flow
**Given** user is Premium  
**When** user scans QR and confirms check  
**Then** full URL Check pipeline runs and returns verdict.

## Non-Functional Requirements
- Never auto-open URL; always ask user to confirm check (Design Spec)

## Dependencies
- US-0001 (URL Check)
- Camera permission
- Subscription validation

## Risks & Assumptions
- **Assumption:** Stripe/AbacatePay viable (ARD-ASMP-002)

## Needs Validation
None.

## Analytics / Events
- `qr_scan_started`
- `qr_scan_completed`
- `paywall_shown` (when Free user attempts)

## Release
MVP

## Priority
P1

## Linked Tasks
- [T-0005](../tasks/T-0005-qr-decode-paywall.md) — QR Decode & Paywall

---

--- file: /user-stories/US-0005-ocr-vision-premium.md ---

# US-0005: OCR + Vision Screenshot/Image Analysis (Premium)

## Story ID
US-0005

## Persona
Cautious Everyday User

## User Story
As a **cautious everyday user**, I want to **upload a screenshot or image and get a risk assessment of the text and visual elements**, so that **I can verify fake invoices, payment requests, or impersonation attempts**.

## Problem / Context
Scams often use screenshots (fake bank messages, invoices). OCR + Vision can extract text and detect visual patterns. PRD §6.5.

## Scope

**In:** Upload image → OCR (text) → Vision (elements) → extract URLs if any → URL pipeline → return message_risk_pct + url_risk_pct. No image persistence. Paywall for Free.

**Out:** Image storage; deepfake detection (ADR-010).

## User Flow (High Level)
1. User taps "Analyze Image" (Premium feature)
2. **Free:** Paywall
3. **Premium:** User selects/ captures image → upload → analysis → verdict

## Acceptance Criteria

### AC1: No Image Persistence
**Given** user uploads image  
**When** analysis completes  
**Then** the image is NOT persisted by default.

### AC2: Combined Explanation
**Given** analysis includes OCR and Vision findings  
**When** verdict is returned  
**Then** explanation combines textual and visual evidence.

### AC3: Paywall (Free)
**Given** user is Free  
**When** user attempts OCR/Vision  
**Then** paywall appears.

## Non-Functional Requirements
- OCR timeout: 5s; Vision timeout: 5s (ARD §9)
- Provider fallback → UNCERTAIN if fail

## Dependencies
- OCR provider (Google Vision, etc.)
- Vision provider (OpenAI GPT-4 Vision, etc.)
- US-0002 (message risk logic)

## Risks & Assumptions
- **Assumption:** Provider selection by Week 3 (ARD §12.1)

## Needs Validation
None.

## Analytics / Events
- `ocr_started`, `ocr_completed`
- `paywall_shown` (Free)

## Release
MVP

## Priority
P1

## Linked Tasks
- [T-0006](../tasks/T-0006-ocr-vision-pipeline.md) — OCR/Vision Pipeline

---

--- file: /user-stories/US-0006-paywall-checkout.md ---

# US-0006: Paywall + Web Checkout

## Story ID
US-0006

## Persona
Cautious Everyday User (converting to Premium)

## User Story
As a **user interested in Premium features**, I want to **see the paywall when I try to use QR/OCR and complete checkout via Stripe or AbacatePay**, so that **I can unlock QR Scan and OCR/Vision**.

## Problem / Context
Monetization via feature gating. Premium features visible but blocked for Free. PRD §2.2, §12.

## Scope

**In:** Paywall on QR/OCR action; checkout web (Stripe or AbacatePay); subscription linked to email/phone.

**Out:** Free trial of Premium features in MVP.

## User Flow (High Level)
1. Free user taps QR or OCR → paywall modal
2. User taps "Upgrade" → redirect to checkout
3. User completes payment
4. Subscription activated; user gains Premium access

## Acceptance Criteria

### AC1: Paywall Display
**Given** Free user attempts QR or OCR  
**When** action is triggered  
**Then** paywall appears with upgrade CTA.

### AC2: Checkout Flow
**Given** user taps upgrade  
**When** checkout completes successfully  
**Then** subscription is activated and user can access Premium features.

### AC3: Subscription Validation
**Given** user has active subscription  
**When** user accesses QR or OCR  
**Then** feature is unlocked without paywall.

## Dependencies
- Stripe or AbacatePay integration
- Supabase Auth (optional for Free; needed for Premium identity)

## Risks & Assumptions
- **Assumption:** Stripe and AbacatePay viable (ARD-ASMP-002)

## Needs Validation
Payment provider final selection (Stripe vs AbacatePay).

## Analytics / Events
- `paywall_shown`
- `checkout_started`
- `checkout_completed`

## Release
MVP

## Priority
P1

## Linked Tasks
- [T-0007](../tasks/T-0007-stripe-abacate-checkout.md) — Stripe/AbacatePay Checkout

---

--- file: /user-stories/US-0007-contact-cta-capture.md ---

# US-0007: Contact CTA Capture

## Story ID
US-0007

## Persona
All users

## User Story
As a **product team**, we want to **show an optional CTA after each verdict to capture email/WhatsApp**, so that **we can build a newsletter and contact list for tips and updates**.

## Problem / Context
PRD §2.3: After every verdict, optional CTA for email/WhatsApp. Non-blocking; does not alter verdict.

## Scope

**In:** CTA after verdict; optional form (email or WhatsApp); submit → store contact; event emitted.

**Out:** Blocking the flow; altering verdict based on capture.

## User Flow (High Level)
1. User sees verdict
2. Optional CTA: "Get tips and updates" (email/WhatsApp)
3. User may skip or submit
4. If submit: store contact; thank-you feedback

## Acceptance Criteria

### AC1: Non-Blocking
**Given** verdict is displayed  
**When** CTA is shown  
**Then** user can dismiss or skip without affecting verdict or flow.

### AC2: Capture
**Given** user submits email or WhatsApp  
**When** form is valid  
**Then** contact is stored and `contact_submitted` event emitted.

### AC3: CTA Shown Event
**Given** CTA is displayed  
**When** verdict screen loads  
**Then** `contact_cta_shown` event is emitted.

## Dependencies
- Backend endpoint for contact storage
- Supabase or similar for contacts

## Risks & Assumptions
- **Assumption:** LGPD-compliant consent (implicit by submission)

## Needs Validation
None.

## Analytics / Events
- `contact_cta_shown`
- `contact_submitted`

## Release
MVP

## Priority
P1

## Linked Tasks
- [T-0008](../tasks/T-0008-contact-cta-form.md) — Contact CTA Form

---

--- file: /user-stories/US-0008-onboarding-home-input.md ---

# US-0008: Onboarding + Home Input Hub

## Story ID
US-0008

## Persona
All users (first-time)

## User Story
As a **first-time user**, I want to **see a brief onboarding and a clear Home screen with URL input, QR, and Message options**, so that **I understand what Shield does and can quickly start checking**.

## Problem / Context
Design Spec §5: Onboarding (3-screen), Home/Input Hub. Mobile-first.

## Scope

**In:** 3-screen onboarding (Welcome, How it works, Permissions); Home with URL input, "Scan QR", "Analyze Message"; auto-focus; paste detection; share-in support.

**Out:** History (Post-MVP); deep customization.

## User Flow (High Level)
1. First launch → Onboarding (3 screens, skippable)
2. Home: URL input (auto-focus), primary CTA "Check URL", secondary "Scan QR" / "Analyze Message"
3. Paste detection: "Check copied link?" if clipboard has URL
4. Share-in: URL pre-populated from WhatsApp/browser

## Acceptance Criteria

### AC1: Onboarding
**Given** first launch  
**When** app opens  
**Then** user sees 3-screen onboarding (Welcome, How it works, Permissions) with skip option.

### AC2: Home Layout
**Given** user is on Home  
**When** screen loads  
**Then** URL input is auto-focused; "Check URL", "Scan QR", "Analyze Message" are visible.

### AC3: Paste Detection
**Given** clipboard contains URL  
**When** user opens Home  
**Then** "Check copied link?" prompt is shown (one-tap shortcut).

### AC4: Share-In
**Given** user shares URL from WhatsApp/browser into app  
**When** app receives share  
**Then** URL is pre-populated and CTA is enabled.

## Dependencies
- Design Spec §5 (Screen 1, 2)
- Deep linking: `shield://check?url=[encoded]`

## Risks & Assumptions
None.

## Needs Validation
None.

## Analytics / Events
- `onboarding_started`, `onboarding_completed` (Design Spec)
- `app_opened` (source: organic, share-in)

## Release
MVP

## Priority
P1

## Linked Tasks
- [T-0009](../tasks/T-0009-home-input-hub-ui.md) — Home Input Hub UI
- [T-0010](../tasks/T-0010-onboarding-flow.md) — Onboarding Flow

---

--- file: /user-stories/US-0009-settings-privacy-delete.md ---

# US-0009: Settings + Privacy + Delete Data

## Story ID
US-0009

## Persona
All users

## User Story
As a **privacy-conscious user**, I want to **access settings, request deletion of my data, and understand data usage**, so that **I can exercise my LGPD rights**.

## Problem / Context
PRD §8.4: Delete-on-request <24h with auditable record. Design Spec §5: Settings (Language, Privacy, Delete data).

## Scope

**In:** Settings screen (Language, Notifications, Privacy); "Delete my data" → confirmation → request submitted; deletion <24h; audit record.

**Out:** Automated LGPD export (Post-MVP).

## User Flow (High Level)
1. User opens Settings
2. User taps "Delete my data"
3. Confirmation modal
4. Request submitted; user informed of <24h SLA
5. Backend processes deletion; audit log created

## Acceptance Criteria

### AC1: Delete Request
**Given** user requests data deletion  
**When** confirmation is confirmed  
**Then** request is submitted and deletion is executed within 24 hours.

### AC2: Audit Record
**Given** deletion is requested and executed  
**When** process completes  
**Then** an auditable record (request date, execution date) is stored.

### AC3: Settings Access
**Given** user opens Settings  
**When** screen loads  
**Then** Language, Notifications, Privacy (Delete data), About are available.

## Non-Functional Requirements
- LGPD compliance (PRD §8.4)

## Dependencies
- Backend deletion job
- Audit logging

## Risks & Assumptions
None.

## Needs Validation
None.

## Analytics / Events
- `delete_data_requested` (internal)

## Release
MVP

## Priority
P1

## Linked Tasks
- [T-0011](../tasks/T-0011-settings-delete-data.md) — Settings & Delete Data

---

--- file: /user-stories/US-0010-ground-truth-labeling.md ---

# US-0010: Ground Truth Labeling Pipeline

## Story ID
US-0010

## Persona
Internal (PM, Security, Ops/QA)

## User Story
As an **internal reviewer**, I want to **label a sample of checks for ground truth and compute FP/FN metrics**, so that **we can improve scoring and monitor quality**.

## Problem / Context
PRD §9: Ground truth via 3 reviewers, 2/3 quorum. Labels stored; FP/FN computed from sampling.

## Scope

**In:** Internal panel; 3 reviewers; 2/3 quorum; labels table; weekly sampling (100 random + 50 edge cases); FP/FN metrics.

**Out:** End-user feedback (contaminates dataset).

## User Flow (High Level)
1. Weekly: 150 checks sampled (100 random + 50 edge)
2. Each check reviewed by 3 reviewers
3. 2/3 quorum → final_label
4. Labels stored in `labels` table
5. FP/FN, Precision/Recall computed

## Acceptance Criteria

### AC1: Labeling Process
**Given** sampled checks  
**When** 3 reviewers vote  
**Then** final_label is determined by 2/3 quorum; stored with decision_reason.

### AC2: Labels Table
**Given** labeling complete  
**When** data is stored  
**Then** schema matches ARD §6.3 (check_id, final_label, votes, decision_reason, timestamp).

### AC3: Metrics
**Given** labels exist  
**When** metrics are computed  
**Then** FP, FN, Precision, Recall are estimated from the sample.

## Dependencies
- Analysis Store
- Internal tooling (simple UI or script)

## Risks & Assumptions
- **Assumption:** 3 reviewers available weekly

## Needs Validation
None.

## Analytics / Events
- Internal only

## Release
MVP

## Priority
P1

## Linked Tasks
- [T-0012](../tasks/T-0012-ground-truth-panel.md) — Ground Truth Panel

---

--- file: /user-stories/US-0011-infrastructure-deployment.md ---

# US-0011: Infrastructure + Deployment

## Story ID
US-0011

## Persona
Internal (Engineering, Ops)

## User Story
As an **engineering team**, we want to **deploy the Go API, Next.js frontend, cache, and database with CI/CD, rate limiting, secrets management, and observability**, so that **the system is production-ready and secure**.

## Problem / Context
ARD §4, §7, §10: Deployment on Fly.io + Vercel; rate limiting; secrets in vault; logging; monitoring.

## Scope

**In:** Fly.io (Go API), Vercel (Next.js), Supabase (DB), Redis (cache); CI/CD (GitHub Actions); rate limiting (10/min, 60/h); secrets in vault; structured logging; metrics; alerts.

**Out:** Microservices; multi-region.

## User Flow (High Level)
N/A — infrastructure.

## Acceptance Criteria

### AC1: Deployment
**Given** code is merged  
**When** CI/CD runs  
**Then** API deploys to Fly.io, frontend to Vercel; rollback supported.

### AC2: Rate Limiting
**Given** API request from IP  
**When** limit exceeded (10/min or 60/h)  
**Then** request is rejected with appropriate status.

### AC3: Secrets
**Given** provider API keys, DB credentials  
**When** application runs  
**Then** all secrets are in vault (not env vars only).

### AC4: Observability
**Given** production traffic  
**When** events occur  
**Then** structured logs (no PII), metrics (TTFV, cache hit, verdict distribution), and alerts (p95, error rate, UNCERTAIN rate) are available.

## Dependencies
- Fly.io, Vercel, Supabase, Upstash
- Vault (AWS Secrets Manager, HashiCorp Vault, or GCP Secret Manager)

## Risks & Assumptions
- **Assumption:** Budget ≤ $500/month (PRD §1.3)

## Needs Validation
None.

## Analytics / Events
- All backend events (PRD §10)

## Release
MVP

## Priority
P0 (cross-cutting)

## Linked Tasks
- [T-0013](../tasks/T-0013-rate-limiting-abuse.md) — Rate Limiting & Abuse
- [T-0014](../tasks/T-0014-secrets-vault-logging.md) — Secrets, Vault & Logging
- [T-0015](../tasks/T-0015-observability-events.md) — Observability & Events
- [T-0016](../tasks/T-0016-deployment-cicd.md) — Deployment & CI/CD

---

--- file: /tasks/index.md ---

# Shield AI Tasks Index

## By Story

| Story | Tasks |
|-------|-------|
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

## By Owner

| Owner | Tasks |
|-------|-------|
| FE | T-0004, T-0009, T-0010, T-0011 |
| BE | T-0001, T-0002, T-0003, T-0005, T-0006, T-0008 |
| Infra | T-0013, T-0014, T-0015, T-0016 |
| QA | T-0012 (partial) |
| Sec | T-0014 (partial) |

---

--- file: /tasks/T-0001-url-normalization-cache.md ---

# T-0001: URL Normalization & Cache

## Task ID
T-0001

## Related Story
[US-0001](../user-stories/US-0001-url-check-free.md) — URL Check (Free)

## Owner
BE

## Description / Goal
Implement deterministic URL normalization per PRD §7.1 and operational cache (L1 in-memory, L2 Redis) with 48h TTL. Cache key = hash(normalized_url).

## Implementation Steps
1. Implement URL normalizer: lowercase host, remove www, trailing slash, fragment, sort query params, remove utm_*, gclid, fbclid, igshid, IDN to punycode.
2. Create cache interface (L1 in-memory, L2 Redis/Upstash).
3. Implement cache key generation: hash(normalized_url).
4. Implement cache get/set with 48h TTL.
5. Add Singleflight pattern for concurrent same-URL requests.
6. Write unit tests for 50+ normalization edge cases (PRD §7.1, ARD §13.1).

## Definition of Done
- [ ] All normalization rules implemented and tested
- [ ] Cache hit returns stored verdict without reprocessing
- [ ] Singleflight prevents duplicate provider calls for same URL
- [ ] 50+ unit tests pass

## Checklist
- [ ] Normalization covers all PRD §7.1 rules
- [ ] Cache TTL = 48h
- [ ] IDN/punycode handled
- [ ] Tracking params removed (configurable list)

## Estimation
M

## Complexity
3

## Dependencies
- Redis/Upstash or in-memory cache
- Go stdlib/crypto for hashing

## Testing Notes
- Unit tests: normalization edge cases (unicode, long URLs, malformed)
- Integration: cache hit/miss flow

## Security/Privacy Notes
- Cache key must not expose full URL
- No PII in cached payload

---

--- file: /tasks/T-0002-url-analysis-pipeline.md ---

# T-0002: URL Analysis Pipeline

## Task ID
T-0002

## Related Story
[US-0001](../user-stories/US-0001-url-check-free.md) — URL Check (Free)

## Owner
BE

## Description / Goal
Implement URL analysis pipeline: redirect resolution (limit 5), provider abstraction with fallback chain, scoring engine, Analysis Store persistence, UNCERTAIN on timeout >25s.

## Implementation Steps
1. Implement redirect resolver (HTTP client, limit N=5, block private IPs per SSRF mitigation).
2. Implement provider adapters: VirusTotal, URLhaus, Google Safe Browsing.
3. Implement Provider Manager with fallback chain and circuit breaker (5 failures, 60s cooldown).
4. Implement Scoring Engine: weighted ensemble, two independent signals rule, verdict classes (HIGH/LOW/UNCERTAIN).
5. Implement Analysis Store write (Supabase Postgres schema per ARD §6.2).
6. Implement 25s total timeout → UNCERTAIN with reason timeout.
7. Integrate LLM client for explanation generation (OpenAI/Claude).
8. Wire cache lookup → store lookup → pipeline → store write → cache write.

## Definition of Done
- [ ] Pipeline returns verdict with url_risk_pct, class, evidence (min 2 for HIGH)
- [ ] Timeout >25s → UNCERTAIN
- [ ] Analysis Store persists result
- [ ] Provider fallback works when primary fails
- [ ] Load test: p95 ≤ 25s under 100 req/min

## Checklist
- [ ] Redirect limit = 5
- [ ] SSRF: block RFC 1918 IPs
- [ ] Two signals rule implemented
- [ ] UNCERTAIN on provider failure

## Estimation
L

## Complexity
5

## Dependencies
- T-0001 (cache)
- Provider API keys
- Supabase

## Testing Notes
- Integration: provider mocks, store hit/miss
- E2E: submit URL → verdict
- Load test: 100 req/min, p95 ≤ 25s
- Chaos: provider failure → UNCERTAIN

## Security/Privacy Notes
- No full URL in logs
- No PII in Analysis Store

---

--- file: /tasks/T-0003-message-analysis-service.md ---

# T-0003: Message Analysis Service

## Task ID
T-0003

## Related Story
[US-0002](../user-stories/US-0002-message-checklist-free.md) — Message Checklist (Free)

## Owner
BE

## Description / Goal
Implement message analysis: extract signals (Pix, urgency, impersonation), extract URLs, run URL Check per link, aggregate message_risk_pct and url_risk_pct per link. No raw text persistence.

## Implementation Steps
1. Implement signal extraction (regex/keywords): Pix, urgency, ameaça, impersonation, pedido de dados.
2. Implement URL extraction from text with normalization.
3. For each URL: call URL Check service (with cache).
4. Compute message_risk_pct from signals + URL results.
5. Return structured response: message_risk_pct, list of {url, url_risk_pct}.
6. Generate explanation separating message vs URL evidence.

## Definition of Done
- [ ] Extracts signals without storing raw text
- [ ] Returns message_risk_pct and url_risk_pct per link
- [ ] Explanation separates message vs URL evidence
- [ ] No raw message in DB or logs

## Checklist
- [ ] Signal flags structured (not free text)
- [ ] URLs normalized before URL Check
- [ ] Critical pattern: (Pix OR "chave") AND (urgência OR ameaça) AND (marca/banco)

## Estimation
M

## Complexity
3

## Dependencies
- T-0002 (URL Check)

## Testing Notes
- Unit: signal extraction on sample messages
- Integration: full message → verdict flow

## Security/Privacy Notes
- PRD §8.1: Do NOT store raw message text

---

--- file: /tasks/T-0004-share-card-generation.md ---

# T-0004: Share Card Generation

## Task ID
T-0004

## Related Story
[US-0003](../user-stories/US-0003-shareable-verdict-free.md) — Shareable Verdict (Free)

## Owner
FE

## Description / Goal
Implement shareable verdict card: domain only, date/time, verdict, 2–4 evidence bullets. PII masked. OS share sheet integration.

## Implementation Steps
1. Create share card component (text or image format).
2. Include: domain, date/time, verdict class, 2–4 evidence bullets.
3. Implement PII masking: emails, phones, document numbers, Pix keys.
4. Integrate with OS share sheet (Web Share API or native).
5. Emit share_verdict_clicked and share_verdict_completed events.

## Definition of Done
- [ ] Card is consistent and readable
- [ ] No full URL; domain only
- [ ] PII masked per PRD §6.3
- [ ] Share events emitted

## Checklist
- [ ] Evidence limited to 2–4 items
- [ ] "Checked with Shield AI Security" footer
- [ ] Test with sample verdicts containing PII

## Estimation
S

## Complexity
2

## Dependencies
- Verdict data from API

## Testing Notes
- Unit: PII masking logic
- Manual: share to WhatsApp, verify content

## Security/Privacy Notes
- PRD §6.3: No URL completa, no PII in card

---

--- file: /tasks/T-0005-qr-decode-paywall.md ---

# T-0005: QR Decode & Paywall

## Task ID
T-0005

## Related Story
[US-0004](../user-stories/US-0004-qr-scan-premium.md) — QR Scan (Premium)

## Owner
FE + BE

## Description / Goal
Implement QR scanner (camera), URL resolution, preview, and paywall for Free users. Premium: full URL Check flow.

## Implementation Steps
1. **FE:** Implement camera view for QR scanning (request permission).
2. **FE:** Decode QR → extract URL (or use backend decode if needed).
3. **FE:** Show URL preview: "This QR points to: [domain]"; CTA "Check this link".
4. **FE:** Check subscription status; if Free → show paywall on "Scan QR" tap.
5. **BE:** Optional endpoint to decode QR from image (if client decode insufficient).
6. **FE:** On Premium + confirm → call URL Check API with resolved URL.

## Definition of Done
- [ ] Free: paywall on QR tap
- [ ] Premium: scan → preview → check → verdict
- [ ] Never auto-open URL
- [ ] Camera permission with clear explanation

## Checklist
- [ ] Paywall blocks feature for Free
- [ ] URL normalization applied before check
- [ ] Edge case: malformed QR → error message

## Estimation
M

## Complexity
3

## Dependencies
- T-0002 (URL Check)
- Subscription validation API
- Camera permission

## Testing Notes
- E2E: Free → paywall; Premium → full flow
- Manual: various QR formats

## Security/Privacy Notes
- No auto-open (prevents drive-by)

---

--- file: /tasks/T-0006-ocr-vision-pipeline.md ---

# T-0006: OCR/Vision Pipeline

## Task ID
T-0006

## Related Story
[US-0005](../user-stories/US-0005-ocr-vision-premium.md) — OCR + Vision (Premium)

## Owner
BE

## Description / Goal
Implement OCR + Vision pipeline: extract text, detect visual elements, extract URLs, run URL Check. No image persistence. Paywall for Free.

## Implementation Steps
1. Integrate OCR provider (Google Vision, AWS Textract, or Azure OCR).
2. Integrate Vision provider (OpenAI GPT-4 Vision or Google Vision).
3. Pipeline: receive image → OCR (text) → Vision (elements) → extract URLs from text → URL Check per link.
4. Combine textual + visual evidence for explanation.
5. Compute message_risk_pct (from signals) + url_risk_pct per link.
6. Do NOT persist image; process in-memory only.
7. Paywall enforced at API level for Free users.

## Definition of Done
- [ ] OCR + Vision return combined explanation
- [ ] No image stored
- [ ] Paywall for Free
- [ ] Timeout 5s per OCR/Vision; fallback → UNCERTAIN

## Checklist
- [ ] Provider selection (Week 3)
- [ ] Image not written to disk/DB
- [ ] URLs in extracted text run through URL pipeline

## Estimation
L

## Complexity
4

## Dependencies
- OCR/Vision provider
- T-0002, T-0003

## Testing Notes
- Integration: mock providers
- E2E: Premium user uploads image → verdict

## Security/Privacy Notes
- PRD §6.5, ARD §8.1: No image persistence

---

--- file: /tasks/T-0007-stripe-abacate-checkout.md ---

# T-0007: Stripe/AbacatePay Checkout

## Task ID
T-0007

## Related Story
[US-0006](../user-stories/US-0006-paywall-checkout.md) — Paywall + Checkout

## Owner
BE + FE

## Description / Goal
Integrate Stripe or AbacatePay for subscription checkout. Validate subscription for Premium features.

## Implementation Steps
1. Create Stripe/AbacatePay account and products.
2. Implement checkout session creation (web redirect).
3. Implement webhook for payment success → activate subscription.
4. Store subscription status (Supabase: user_id/email/phone + subscription_id + status).
5. Implement subscription validation middleware/API for QR and OCR endpoints.
6. **FE:** Paywall modal with "Upgrade" → redirect to checkout URL.
7. **FE:** After checkout return, validate and unlock Premium.

## Definition of Done
- [ ] Checkout flow completes end-to-end
- [ ] Webhook activates subscription
- [ ] Premium features gated by subscription check
- [ ] checkout_started, checkout_completed events

## Checklist
- [ ] Webhook signature verification
- [ ] Idempotent webhook handling
- [ ] Subscription linked to email/phone (checkout identifier)

## Estimation
M

## Complexity
3

## Dependencies
- Stripe or AbacatePay account
- Supabase for subscription state

## Testing Notes
- E2E: checkout with test card
- Webhook: payment success → subscription active

## Security/Privacy Notes
- Webhook secret in vault
- No card data stored

---

--- file: /tasks/T-0008-contact-cta-form.md ---

# T-0008: Contact CTA Form

## Task ID
T-0008

## Related Story
[US-0007](../user-stories/US-0007-contact-cta-capture.md) — Contact CTA Capture

## Owner
FE + BE

## Description / Goal
Implement optional contact CTA after verdict: email or WhatsApp input, non-blocking, store contact, emit events.

## Implementation Steps
1. **FE:** Add CTA component below verdict: "Get tips and updates" (email or WhatsApp).
2. **FE:** Form: email input OR phone (WhatsApp); submit optional.
3. **FE:** CTA does not block verdict display or flow.
4. **BE:** POST /contact endpoint: validate, store in Supabase (contacts table).
5. Emit contact_cta_shown (on verdict display), contact_submitted (on submit).

## Definition of Done
- [ ] CTA shown after verdict
- [ ] User can skip
- [ ] Valid submit stores contact
- [ ] Events emitted

## Checklist
- [ ] Non-blocking
- [ ] LGPD: consent implicit by submit
- [ ] Rate limit on contact endpoint

## Estimation
XS

## Complexity
1

## Dependencies
- Supabase
- Verdict screen

## Testing Notes
- E2E: verdict → CTA → submit → stored

## Security/Privacy Notes
- Validate email/phone format
- No spam: rate limit

---

--- file: /tasks/T-0009-home-input-hub-ui.md ---

# T-0009: Home Input Hub UI

## Task ID
T-0009

## Related Story
[US-0008](../user-stories/US-0008-onboarding-home-input.md) — Onboarding + Home Input Hub

## Owner
FE

## Description / Goal
Implement Home screen: URL input (auto-focus), Check URL CTA, Scan QR, Analyze Message. Paste detection, share-in support.

## Implementation Steps
1. Build Home layout per Design Spec §5 Screen 2.
2. URL input: placeholder "Paste URL or link here...", auto-focus, character limit 2000.
3. Primary CTA "Check URL"; disabled if empty/invalid.
4. Secondary: "Scan QR Code", "Analyze Message" (card buttons).
5. Paste detection: if clipboard has URL → "Check copied link?" prompt.
6. Share-in: handle incoming URL (deep link or share extension) → pre-populate input.
7. Invalid URL: inline error with example.
8. Responsive: mobile-first, bottom nav (Home, Settings; History out of MVP).

## Definition of Done
- [ ] Auto-focus on URL input
- [ ] Paste detection works
- [ ] Share-in pre-populates
- [ ] Invalid URL shows error
- [ ] Mobile-first responsive

## Checklist
- [ ] Design Spec §5 layout
- [ ] Clear button in input
- [ ] Deep link: shield://check?url=[encoded]

## Estimation
M

## Complexity
2

## Dependencies
- Design Spec
- Next.js/React

## Testing Notes
- Manual: paste, share-in, invalid URL
- A11y: focus order, labels

## Security/Privacy Notes
- Validate URL before submit (client + server)

---

--- file: /tasks/T-0010-onboarding-flow.md ---

# T-0010: Onboarding Flow

## Task ID
T-0010

## Related Story
[US-0008](../user-stories/US-0008-onboarding-home-input.md) — Onboarding + Home Input Hub

## Owner
FE

## Description / Goal
Implement 3-screen onboarding: Welcome, How it works, Permissions. Skip option. First-launch only.

## Implementation Steps
1. Screen 1 (Welcome): Hero, "Your digital detective for online safety", CTA "Get started".
2. Screen 2 (How it works): 3-step illustration (paste → analyze → decide), CTA "Continue".
3. Screen 3 (Permissions): Camera + Clipboard explanation, CTA "Allow access", secondary "Set up later".
4. Skip button (top-right) after first screen.
5. Dots indicator (1 of 3, 2 of 3, 3 of 3).
6. Store onboarding_completed in localStorage; do not show again.
7. Emit onboarding_started, onboarding_completed (with skipped flag).

## Definition of Done
- [ ] 3 screens as per Design Spec
- [ ] Skip available
- [ ] Permissions request (camera, clipboard)
- [ ] Only on first launch

## Checklist
- [ ] Design Spec §5 Screen 1
- [ ] Clear permission rationale
- [ ] "Set up later" skips to Home

## Estimation
S

## Complexity
2

## Dependencies
- Design Spec

## Testing Notes
- Manual: first launch, skip, permissions
- Reset localStorage to re-test

## Security/Privacy Notes
- Permission requests with clear explanation

---

--- file: /tasks/T-0011-settings-delete-data.md ---

# T-0011: Settings & Delete Data

## Task ID
T-0011

## Related Story
[US-0009](../user-stories/US-0009-settings-privacy-delete.md) — Settings + Privacy + Delete Data

## Owner
FE + BE

## Description / Goal
Implement Settings screen: Language, Notifications, Privacy (Delete my data), About. Delete request triggers backend job; execution <24h; audit record.

## Implementation Steps
1. **FE:** Settings layout per Design Spec §5 Screen 6.
2. **FE:** Language selector (PT-BR, EN).
3. **FE:** Notifications toggle.
4. **FE:** "Delete my data" → confirmation modal → POST /privacy/delete-request.
5. **BE:** Delete endpoint: accept request, enqueue job or run async, delete user data (contacts, any PII), create audit record (request_ts, execution_ts).
6. **FE:** Show "Request received. Deletion within 24 hours."
7. **FE:** About: version, Terms, Privacy, Contact.

## Definition of Done
- [ ] Delete request submitted
- [ ] Deletion <24h
- [ ] Audit record stored
- [ ] Settings accessible

## Checklist
- [ ] LGPD §8.4 compliant
- [ ] Audit: request date, execution date
- [ ] Confirmation modal prevents accidental delete

## Estimation
M

## Complexity
3

## Dependencies
- Supabase (user data, audit table)
- Job queue or cron for deletion

## Testing Notes
- E2E: request delete → verify audit record
- Verify data removed within 24h (staging)

## Security/Privacy Notes
- PRD §8.4: Delete-on-request <24h, auditable

---

--- file: /tasks/T-0012-ground-truth-panel.md ---

# T-0012: Ground Truth Panel

## Task ID
T-0012

## Related Story
[US-0010](../user-stories/US-0010-ground-truth-labeling.md) — Ground Truth Labeling Pipeline

## Owner
BE + QA

## Description / Goal
Implement internal labeling pipeline: sample 150 checks/week (100 random + 50 edge), 3 reviewers, 2/3 quorum, store in labels table, compute FP/FN.

## Implementation Steps
1. Create `labels` table per ARD §6.3.
2. Implement sampling job: weekly, 100 random + 50 edge cases from analysis_store.
3. Build simple internal UI or script: present check to 3 reviewers, collect votes, compute 2/3 quorum → final_label.
4. Store: check_id, final_label, votes, decision_reason, timestamp.
5. Implement metrics script: FP, FN, Precision, Recall from labels vs system verdict.

## Definition of Done
- [ ] Labels table created
- [ ] 150 samples labeled in first week (AAC-008)
- [ ] 2/3 quorum logic
- [ ] FP/FN metrics computable

## Checklist
- [ ] PRD §9 process
- [ ] Internal only (no public access)

## Estimation
M

## Complexity
3

## Dependencies
- Analysis Store
- 3 reviewers

## Testing Notes
- Manual: run sampling, label, verify metrics

## Security/Privacy Notes
- RLS: admin only
- No PII in labels

---

--- file: /tasks/T-0013-rate-limiting-abuse.md ---

# T-0013: Rate Limiting & Abuse Prevention

## Task ID
T-0013

## Related Story
[US-0011](../user-stories/US-0011-infrastructure-deployment.md) — Infrastructure + Deployment

## Owner
BE / Infra

## Description / Goal
Implement rate limiting: 10 req/min (burst 20), 60 req/h per IP. Simple bot detection (user-agent, volume patterns).

## Implementation Steps
1. Implement rate limiter middleware (e.g., golang.org/x/time/rate or Redis-based).
2. Sliding window or token bucket: 10 req/min, burst 20; 60 req/h.
3. Key: IP address (from X-Forwarded-For or direct).
4. Return 429 when exceeded; include Retry-After header.
5. Optional: bot detection (user-agent blocklist, high volume flagging).
6. Load test: verify 10 req/min enforced.

## Definition of Done
- [ ] 10 req/min, 60 req/h enforced
- [ ] 429 with Retry-After on exceed
- [ ] AAC-006: load test passes

## Checklist
- [ ] PRD §7.5
- [ ] No daily quotas (Free)

## Estimation
S

## Complexity
2

## Dependencies
- Redis (for distributed rate limit) or in-memory

## Testing Notes
- Load test: exceed limit → 429
- Verify legitimate user not blocked

## Security/Privacy Notes
- IP only; no PII in rate limit key

---

--- file: /tasks/T-0014-secrets-vault-logging.md ---

# T-0014: Secrets, Vault & Logging

## Task ID
T-0014

## Related Story
[US-0011](../user-stories/US-0011-infrastructure-deployment.md) — Infrastructure + Deployment

## Owner
BE / Sec

## Description / Goal
Ensure all secrets in vault (not env vars only). Structured logging with zero PII. Kill switch (global + per-provider).

## Implementation Steps
1. Integrate vault (AWS Secrets Manager, HashiCorp Vault, or GCP Secret Manager).
2. Migrate provider API keys, DB credentials to vault.
3. Remove secrets from env vars; load from vault at startup.
4. Implement structured logging (zerolog/zap); JSON format.
5. Implement PII redaction: no URLs, no message content, no emails/phones in logs.
6. Implement kill switch: global and per-provider flags; activation <30s (config or admin API).
7. AAC-002: security audit checklist.

## Definition of Done
- [ ] 100% secrets in vault
- [ ] Zero PII in logs
- [ ] Kill switch operational
- [ ] AAC-002 passed

## Checklist
- [ ] PRD §7.4
- [ ] ARD-NFR-009, ARD-NFR-010
- [ ] Runbook for kill switch

## Estimation
M

## Complexity
3

## Dependencies
- Vault provider
- Log aggregator (Betterstack/Axiom)

## Testing Notes
- Log audit: grep for PII patterns
- Kill switch: activate → verify provider skipped

## Security/Privacy Notes
- PRD §7.4: Secrets in vault mandatory
- ARD-NFR-008: Kill switch <30s

---

--- file: /tasks/T-0015-observability-events.md ---

# T-0015: Observability & Events

## Task ID
T-0015

## Related Story
[US-0011](../user-stories/US-0011-infrastructure-deployment.md) — Infrastructure + Deployment

## Owner
BE / Infra

## Description / Goal
Implement analytics events per PRD §10 and metrics/monitoring. Dashboards: TTFV, verdict distribution, store hit ratio.

## Implementation Steps
1. Implement event emission for all PRD §10.1 events (check_started, check_completed, verdict_shown, share_verdict_*, message_check_*, qr_scan_*, ocr_*, paywall_shown, checkout_*, contact_*).
2. Standard fields: timestamp, session_id, user_state, check_type, ttfv_ms, cache_hit, verdict_class, risk_pct, provider_status, error_type.
3. Send to analytics backend (e.g., PostHog, Mixpanel, or custom).
4. Implement Prometheus metrics: request count, latency p50/p95/p99, cache hit rate, verdict distribution, provider success.
5. Grafana dashboards: TTFV, verdict distribution, store hit, error rate.
6. Alerts: p95 >30s, error >5%, UNCERTAIN >20%, availability breach.

## Definition of Done
- [ ] All PRD §10 events emitted
- [ ] Dashboards available
- [ ] Alerts configured
- [ ] AAC-004: dashboard review

## Checklist
- [ ] No PII in events
- [ ] session_id for correlation

## Estimation
M

## Complexity
3

## Dependencies
- Analytics provider
- Grafana Cloud
- Prometheus

## Testing Notes
- Verify events in analytics
- Load test: metrics accurate

## Security/Privacy Notes
- PRD §10.2: no PII in event payloads

---

--- file: /tasks/T-0016-deployment-cicd.md ---

# T-0016: Deployment & CI/CD

## Task ID
T-0016

## Related Story
[US-0011](../user-stories/US-0011-infrastructure-deployment.md) — Infrastructure + Deployment

## Owner
Infra

## Description / Goal
Set up Fly.io (Go API), Vercel (Next.js), Supabase, Redis. CI/CD via GitHub Actions. Rollback support.

## Implementation Steps
1. Create Fly.io app; Dockerfile for Go API; deploy.
2. Create Vercel project; connect repo; deploy Next.js.
3. Provision Supabase project; run migrations (analysis_store, labels).
4. Provision Upstash Redis (or in-memory for dev).
5. GitHub Actions: lint, test, deploy on merge to main.
6. Fly.io: fly releases rollback for API.
7. Vercel: dashboard rollback for frontend.
8. Document RTO/RPO: backup daily; RTO 4h (ARD §10.4).

## Definition of Done
- [ ] API on Fly.io, frontend on Vercel
- [ ] Supabase + Redis provisioned
- [ ] CI/CD deploys on merge
- [ ] Rollback documented
- [ ] AAC-007: DR drill (backup restore)

## Checklist
- [ ] Environments: local, staging, production
- [ ] Secrets from vault in CI
- [ ] Health check endpoint

## Estimation
L

## Complexity
4

## Dependencies
- Fly.io, Vercel, Supabase, Upstash accounts
- GitHub Actions

## Testing Notes
- Deploy to staging; smoke test
- DR: restore from backup

## Security/Privacy Notes
- No secrets in CI logs
- TLS for all endpoints

---

--- file: /kanban/board.md ---

# Shield AI MVP Kanban Board

## Workflow

Ready → In Progress → Review → Done

---

## Backlog

| Item | Task | Story | Priority |
|------|------|-------|----------|
| 1 | [T-0012](../tasks/T-0012-ground-truth-panel.md) | US-0010 | P1 |
| 2 | [T-0016](../tasks/T-0016-deployment-cicd.md) | US-0011 | P0 |

---

## Ready

| Item | Task | Story | Priority |
|------|------|-------|----------|
| 1 | [T-0001](../tasks/T-0001-url-normalization-cache.md) | US-0001 | P0 |
| 2 | [T-0002](../tasks/T-0002-url-analysis-pipeline.md) | US-0001 | P0 |
| 3 | [T-0003](../tasks/T-0003-message-analysis-service.md) | US-0002 | P0 |
| 4 | [T-0004](../tasks/T-0004-share-card-generation.md) | US-0003 | P0 |
| 5 | [T-0013](../tasks/T-0013-rate-limiting-abuse.md) | US-0011 | P0 |
| 6 | [T-0014](../tasks/T-0014-secrets-vault-logging.md) | US-0011 | P0 |
| 7 | [T-0015](../tasks/T-0015-observability-events.md) | US-0011 | P0 |

---

## In Progress

| Item | Task | Story | Priority |
|------|------|-------|----------|
| — | — | — | — |

---

## Review

| Item | Task | Story | Priority |
|------|------|-------|----------|
| — | — | — | — |

---

## Done

| Item | Task | Story | Priority |
|------|------|-------|----------|
| — | — | — | — |

---

*Update this board as tasks move through the workflow.*

---

--- file: /github/labels.md ---

# Shield AI — GitHub Labels

## Labels to Create

| Label | Color | Description |
|-------|-------|-------------|
| `type:story` | #0052CC | User story (epic) |
| `type:task` | #006B75 | Implementation task |
| `type:bug` | #D73A4A | Bug report |
| `type:chore` | #FEF2C0 | Chore, maintenance |
| `area:frontend` | #BFD4F2 | Frontend work |
| `area:backend` | #BFDADC | Backend work |
| `area:infra` | #C5DEF5 | Infrastructure |
| `area:security` | #F9D0C4 | Security |
| `area:qa` | #FAD8C7 | QA, testing |
| `priority:P0` | #B60205 | Must have (MVP) |
| `priority:P1` | #D93F0B | Should have |
| `priority:P2` | #FBCA04 | Nice to have |
| `status:ready` | #0E8A16 | Ready for development |
| `status:blocked` | #EDEDED | Blocked |
| `status:in-progress` | #1D76DB | In progress |
| `status:review` | #C2E0C6 | In review |
| `status:done` | #0E8A16 | Done |
| `needs-validation` | #FEF2C0 | Needs product/tech validation |

## Usage

- Apply `type:story` to User Story issues.
- Apply `type:task` to Task issues.
- Apply `area:*` based on primary owner (FE/BE/Infra).
- Apply `priority:*` from User Story.
- Apply `status:*` as work progresses.

---

--- file: /github/milestones.md ---

# Shield AI — Milestones

## MVP Milestone

**Name:** MVP  
**Due:** TBD (target: 12 weeks from kickoff)  
**Description:** Shield AI MVP — URL Check, Message Checklist, Shareable Verdict, QR Scan, OCR/Vision, Paywall, Contact CTA, Onboarding, Settings, Ground Truth, Infrastructure.

### Exit Criteria (Definition of Release)

- [ ] All P0 User Stories delivered and accepted
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

---

--- file: /github/issue-templates.md ---

# Shield AI — Issue Templates

## 1. User Story Issue Template

Copy the following into `.github/ISSUE_TEMPLATE/user_story.md`:

```markdown
---
name: User Story
about: Create a user story for Shield AI
title: '[US-XXXX] '
labels: type:story
assignees: ''
---

## User Story
As a [persona], I want [action], so that [benefit].

## Acceptance Criteria
- [ ] AC1: Given/When/Then
- [ ] AC2: Given/When/Then

## Priority
- [ ] P0
- [ ] P1
- [ ] P2

## Release
MVP

## Linked Tasks
- [ ] T-XXXX

## Source
PRD §X.X / ARD §X / Design Spec §X
```

---

## 2. Task Issue Template

Copy the following into `.github/ISSUE_TEMPLATE/task.md`:

```markdown
---
name: Task
about: Create an implementation task for Shield AI
title: '[T-XXXX] '
labels: type:task
assignees: ''
---

## Related Story
US-XXXX

## Owner
- [ ] FE
- [ ] BE
- [ ] Infra
- [ ] QA
- [ ] Sec

## Description / Goal
[What needs to be done]

## Implementation Steps
1. Step 1
2. Step 2
3. Step 3

## Definition of Done
- [ ] Criterion 1
- [ ] Criterion 2

## Estimation
- [ ] XS
- [ ] S
- [ ] M
- [ ] L

## Complexity (1-5)
[ ]

## Dependencies
- Dependency 1

## Testing Notes
[How to test]

## Security/Privacy Notes
[If applicable]
```

---

--- file: /github/projects-import.md ---

# Shield AI — GitHub Projects Import Instructions

## Overview

This guide explains how to set up GitHub Projects for Shield AI MVP using the generated backlog.

---

## Step 1: Create Labels

1. Go to **Repository → Issues → Labels**
2. Create each label from [labels.md](labels.md) with the specified color and description

---

## Step 2: Create MVP Milestone

1. Go to **Repository → Issues → Milestones**
2. Create milestone: **MVP**
3. Add description and due date
4. Copy exit criteria from [milestones.md](milestones.md)

---

## Step 3: Create GitHub Project

1. Go to **Repository → Projects**
2. Click **New project**
3. Choose **Board** or **Table** template
4. Name: **Shield AI MVP**

---

## Step 4: Create Board View (Status-Based)

1. In the project, add a **Board** view
2. Configure **Group by:** Status (or custom field)
3. Create columns:
   - **Backlog**
   - **Ready**
   - **In Progress**
   - **Review**
   - **Done**

4. Add **Status** field (single select):
   - Backlog
   - Ready
   - In Progress
   - Review
   - Done

---

## Step 5: Create Table View (Priority-Based)

1. Add **Table** view to the same project
2. Configure columns: Title, Status, Priority, Owner, Story, Milestone
3. Add **Priority** field (single select): P0, P1, P2
4. Add **Owner** field (single select): FE, BE, Infra, QA, Sec

---

## Step 6: Create Roadmap View (Milestone-Based)

1. Add **Roadmap** view (if available)
2. Group by **Milestone**
3. Filter by **Milestone: MVP**

---

## Step 7: Convert Tasks into Issues

1. For each task in `/tasks/`, create a GitHub Issue
2. Use the **Task** issue template
3. Apply labels: `type:task`, `area:*`, `priority:*`
4. Set **Milestone: MVP**
5. Link to parent Story (use "Linked issues" or custom field)

---

## Step 8: Convert Stories into Issues

1. For each user story in `/user-stories/`, create a GitHub Issue
2. Use the **User Story** issue template
3. Apply labels: `type:story`, `priority:*`
4. Set **Milestone: MVP**
5. Link child Tasks to the Story

---

## Step 9: Link Stories and Tasks

1. In each Task issue, add "Relates to" or "Parent" link to the Story issue
2. In each Story issue, ensure all Tasks are linked

---

## Step 10: Suggested Workflow

| Column | Meaning | Next Action |
|--------|---------|-------------|
| **Backlog** | Not yet prioritized or ready | Groom; move to Ready when ready |
| **Ready** | Ready for development | Assign; move to In Progress |
| **In Progress** | Being worked on | Complete work; move to Review |
| **Review** | Awaiting review | Approve; move to Done |
| **Done** | Completed | Close issue |

---

## Step 11: Automation (Optional)

- **Auto-move:** When PR is merged and linked to issue, move to Done
- **Auto-label:** When issue is created from template, apply template labels
- **Reminders:** Weekly backlog grooming

---

## Traceability

- Stories reference PRD/ARD/Design Spec sections in the issue body
- Tasks reference parent Story ID
- No feature invented; unclear items marked `needs-validation`

---

**End of Shield AI MVP Pack**
