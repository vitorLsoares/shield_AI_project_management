# T-0000a: Go API Project Scaffolding

## Task ID
T-0000a

## Related Story
[US-0000](../user-stories/US-0000-architecture-setup.md) — Architecture Setup & Project Configuration

## Owner
BE

## Description / Goal
Create the Go API project structure with packages `handler`, `service`, `provider`, `cache`, `storage` per ARD §4.2. Implement main entry, router skeleton (chi/gin/fiber), and health check endpoint. No feature logic—only scaffolding.

## Implementation Steps
1. Initialize Go module (e.g., `go mod init github.com/shield-ai/api`).
2. Create package directories: `internal/handler`, `internal/service`, `internal/provider`, `internal/cache`, `internal/storage`.
3. Add empty interfaces or stubs in each package (e.g., `Provider` interface in `provider`).
4. Implement main entry point with HTTP server setup.
5. Add router (chi, gin, or fiber) with `GET /health` returning 200.
6. Add config loading from env (port, log level, etc.); no secrets in code.
7. Add basic structured logging (zerolog or zap).

## Definition of Done
- [ ] All packages exist with clear boundaries
- [ ] `GET /health` returns 200
- [ ] Config loaded from env
- [ ] Server starts and responds to health check

## Checklist
- [ ] ARD §4.2 package structure
- [ ] No hardcoded secrets
- [ ] Logging configured

## Estimation
S

## Complexity
2

## Dependencies
- Go 1.21+
- Router library (chi, gin, or fiber)

## Testing Notes
- Manual: run server, curl `/health` → 200
- Unit: health handler returns 200

## Security/Privacy Notes
- ARD-NFR-009: No secrets in code
