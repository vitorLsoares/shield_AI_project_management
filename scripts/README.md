# Shield AI - Scripts

## setup-github-project.mjs

Creates the full task and project management flow on GitHub from the Shield AI MVP pack:

- **18 labels** (type, area, priority, status)
- **MVP milestone** with exit criteria
- **11 User Story issues** (US-0001 to US-0011)
- **16 Task issues** (T-0001 to T-0016) linked to stories

### Option 1: Run via GitHub Actions

1. Push this repo to GitHub
2. Go to **Actions** → **Setup GitHub Project**
3. Click **Run workflow**

### Option 2: Run locally

```bash
# Create a Personal Access Token at https://github.com/settings/tokens
# Required scopes: repo (full control)

export GITHUB_TOKEN=ghp_your_token_here
node scripts/setup-github-project.mjs
```

For a different repository:

```bash
export GITHUB_TOKEN=ghp_xxx
export GITHUB_REPO=owner/repo-name
node scripts/setup-github-project.mjs
```

### After running

1. **Create GitHub Project**: Repo → Projects → New project → "Shield AI MVP"
2. **Add Board view** with columns: Backlog, Ready, In Progress, Review, Done
3. **Add Status field** (single select) with those values
4. **Add issues** to the project and organize by Status
5. **Link tasks to stories** via "Relates to" in the issue sidebar (optional; body already references them)
