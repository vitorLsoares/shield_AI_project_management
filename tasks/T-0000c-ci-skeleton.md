# T-0000c: CI Skeleton (GitHub Actions)

## Task ID
T-0000c

## Related Story
[US-0000](../user-stories/US-0000-architecture-setup.md) — Architecture Setup & Project Configuration

## Owner
Infra / BE

## Description / Goal
Set up GitHub Actions CI pipeline that runs lint and test on PR. Covers Go and/or Next.js. No deployment—only validation.

## Implementation Steps
1. Create `.github/workflows/ci.yml` (or extend existing).
2. Add job for Go: `go build`, `go test`, `golangci-lint` (or similar).
3. Add job for Next.js: `npm ci`, `npm run lint`, `npm run build` (if applicable).
4. Trigger on push to main and on pull_request.
5. Ensure jobs run in parallel where possible.
6. Add basic caching for dependencies (Go modules, npm).

## Definition of Done
- [ ] CI runs on PR
- [ ] Lint and test execute for at least Go (or Next.js if Go not yet present)
- [ ] Failing lint/test blocks merge (or reports status)

## Checklist
- [ ] No secrets in workflow (use GitHub Secrets for any needed later)
- [ ] Caching for faster runs
- [ ] Clear job names

## Estimation
XS

## Complexity
1

## Dependencies
- GitHub Actions
- Go / Node.js setup actions

## Testing Notes
- Open PR, verify CI runs
- Intentionally fail lint, verify CI fails

## Security/Privacy Notes
- No secrets logged; use `${{ secrets.X }}` for any future needs
