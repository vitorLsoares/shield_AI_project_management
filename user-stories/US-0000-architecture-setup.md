# US-0000: Architecture Setup & Project Configuration

## Story ID
US-0000

## Persona
Internal (Engineering)

## User Story
As an **engineering team**, we want to **configure the project architecture with Go API and Next.js app scaffolding, so that** we have a clear foundation to build features on, with proper package boundaries and config per ARD.

## Problem / Context
ARD §4.2 defines the architecture: Go modular monolith with packages `handler`, `service`, `provider`, `cache`, `storage`; Next.js on Vercel. US-0011 covers deployment but not project scaffolding. Feature work requires this foundation first.

## Scope

**In:** Go API package structure, main entry, router skeleton, health check; Next.js app structure, routing, env config, Supabase client setup; env schema, config loading; base CI (lint/test). No feature implementation—only scaffolding and wiring.

**Out:** Provider adapters, scoring engine, feature endpoints, UI components.

## User Flow (High Level)
N/A — infrastructure and scaffolding.

## Acceptance Criteria

### AC1: Go Package Structure
**Given** the Go API project  
**When** inspected  
**Then** it has packages `handler`, `service`, `provider`, `cache`, `storage` with empty interfaces/stubs per ARD §4.2.

### AC2: Next.js App Structure
**Given** the Next.js app  
**When** inspected  
**Then** it has routes for Home, Settings, and a placeholder verdict page; env config and Supabase client setup.

### AC3: Health Check
**Given** the Go API is running  
**When** `GET /health` is called  
**Then** it returns 200 with a simple status payload.

### AC4: CI Pipeline
**Given** a PR is opened  
**When** CI runs  
**Then** lint and test execute for both Go and Next.js (or at least one).

### AC5: Config from Env
**Given** the application runs  
**When** config is loaded  
**Then** all config comes from environment variables; no secrets hardcoded in code.

## Non-Functional Requirements
- ARD §4.2 package boundaries respected
- ARD-NFR-009: No secrets in code (config from env)

## Dependencies
- ARD §4 (Architecture Overview)
- ARD §4.2 (Component Responsibilities)

## Risks & Assumptions
- **Assumption:** Monorepo or separate repos for Go and Next.js (plan assumes monorepo or adjacent folders)

## Needs Validation
None.

## Analytics / Events
None (scaffolding only).

## Release
MVP (Phase 0 — Foundation)

## Priority
P0 (blocker for all other work)

## Linked Tasks
- [T-0000a](../tasks/T-0000a-go-scaffolding.md) — Go API Project Scaffolding
- [T-0000b](../tasks/T-0000b-nextjs-scaffolding.md) — Next.js App Scaffolding
- [T-0000c](../tasks/T-0000c-ci-skeleton.md) — CI Skeleton (GitHub Actions)

## Plan
- [Frontend Plan](../management/frontend-plan.md) (Phase 0)
- [Backend Plan](../management/backend-plan.md) (Phase 0)
