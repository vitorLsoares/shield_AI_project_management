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
