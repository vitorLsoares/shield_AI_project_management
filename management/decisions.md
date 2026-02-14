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
