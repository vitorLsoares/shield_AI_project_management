#!/usr/bin/env node
/**
 * Shield AI MVP - GitHub Project Setup Script
 * Creates labels, milestone, user stories, and tasks from shield-ai-mvp-pack.md
 *
 * Usage:
 *   GITHUB_TOKEN=ghp_xxx node scripts/setup-github-project.mjs
 *   # Or with repo override:
 *   GITHUB_TOKEN=ghp_xxx GITHUB_REPO=vitorLsoares/shield_AI_project_management node scripts/setup-github-project.mjs
 */

const REPO = process.env.GITHUB_REPO || process.env.GITHUB_REPOSITORY || 'vitorLsoares/shield_AI_project_management';
const [owner, repo] = REPO.split('/');
const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.error('Error: GITHUB_TOKEN environment variable is required');
  process.exit(1);
}

const api = (path, options = {}) =>
  fetch(`https://api.github.com/repos/${owner}/${repo}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

async function createLabel(name, color, description) {
  const res = await api('/labels', {
    method: 'POST',
    body: JSON.stringify({ name, color, description }),
  });
  if (res.status === 201 || res.status === 422) return; // created or exists
  throw new Error(`Failed to create label ${name}: ${res.status}`);
}

async function createMilestone(title, description) {
  const res = await api('/milestones', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
  });
  if (res.status === 201) return (await res.json()).number;
  throw new Error(`Failed to create milestone: ${res.status}`);
}

async function createIssue(title, body, labels = [], milestone = null) {
  const res = await api('/issues', {
    method: 'POST',
    body: JSON.stringify({ title, body, labels, milestone }),
  });
  if (res.status !== 201) throw new Error(`Failed to create issue ${title}: ${res.status}`);
  return await res.json();
}

const LABELS = [
  { name: 'type:story', color: '0052CC', description: 'User story (epic)' },
  { name: 'type:task', color: '006B75', description: 'Implementation task' },
  { name: 'type:bug', color: 'D73A4A', description: 'Bug report' },
  { name: 'type:chore', color: 'FEF2C0', description: 'Chore, maintenance' },
  { name: 'area:frontend', color: 'BFD4F2', description: 'Frontend work' },
  { name: 'area:backend', color: 'BFDADC', description: 'Backend work' },
  { name: 'area:infra', color: 'C5DEF5', description: 'Infrastructure' },
  { name: 'area:security', color: 'F9D0C4', description: 'Security' },
  { name: 'area:qa', color: 'FAD8C7', description: 'QA, testing' },
  { name: 'priority:P0', color: 'B60205', description: 'Must have (MVP)' },
  { name: 'priority:P1', color: 'D93F0B', description: 'Should have' },
  { name: 'priority:P2', color: 'FBCA04', description: 'Nice to have' },
  { name: 'status:ready', color: '0E8A16', description: 'Ready for development' },
  { name: 'status:blocked', color: 'EDEDED', description: 'Blocked' },
  { name: 'status:in-progress', color: '1D76DB', description: 'In progress' },
  { name: 'status:review', color: 'C2E0C6', description: 'In review' },
  { name: 'status:done', color: '0E8A16', description: 'Done' },
  { name: 'needs-validation', color: 'FEF2C0', description: 'Needs product/tech validation' },
];

const USER_STORIES = [
  { id: 'US-0001', title: 'URL Check (Free)', priority: 'P0', labels: ['type:story', 'priority:P0'], body: `## User Story
As a **cautious everyday user**, I want to **paste or share a suspicious URL and get a clear verdict with explanation and next steps**, so that **I can decide quickly whether to click or avoid a potential scam without needing technical knowledge**.

## Acceptance Criteria
- [ ] AC1: URL Normalization per PRD §7.1
- [ ] AC2: Cache Hit - cached verdict within 48h
- [ ] AC3: Cache Miss Pipeline - redirect resolution, providers, heuristics
- [ ] AC4: Verdict Output - url_risk_pct, verdict class, evidence (min 2 for HIGH)
- [ ] AC5: Timeout Guardrail - UNCERTAIN on >25s

## Linked Tasks
- T-0001, T-0002

## Source
PRD §1.1, §6.1` },
  { id: 'US-0002', title: 'Message Checklist (Free)', priority: 'P0', labels: ['type:story', 'priority:P0'], body: `## User Story
As a **cautious everyday user**, I want to **paste a suspicious message and get a risk assessment of the message and any links**, so that **I can understand if it's phishing**.

## Acceptance Criteria
- [ ] AC1: Signal extraction (Pix, urgency, impersonation)
- [ ] AC2: URL extraction + URL Check per link
- [ ] AC3: Dual granularity - message_risk_pct + url_risk_pct per link
- [ ] AC4: Explanation separates message vs URL evidence

## Linked Tasks
- T-0003

## Source
PRD §6.2` },
  { id: 'US-0003', title: 'Shareable Verdict (Free)', priority: 'P0', labels: ['type:story', 'priority:P0'], body: `## User Story
As a **family safety helper**, I want to **share the verdict as a text card to family/group chats**, so that **I can warn others about a scam**.

## Acceptance Criteria
- [ ] AC1: Share content - domain, date/time, verdict, 2-4 evidence bullets
- [ ] AC2: PII masking in card
- [ ] AC3: share_verdict_completed event

## Linked Tasks
- T-0004

## Source
PRD §6.3` },
  { id: 'US-0004', title: 'QR Scan (Premium)', priority: 'P1', labels: ['type:story', 'priority:P1'], body: `## User Story
As a **cautious everyday user**, I want to **scan a QR code and get a verdict on the destination URL**, so that **I can check if a QR is safe before scanning**.

## Acceptance Criteria
- [ ] AC1: URL resolution from QR
- [ ] AC2: Paywall for Free users
- [ ] AC3: Premium flow - full URL Check pipeline

## Linked Tasks
- T-0005

## Source
PRD §6.4` },
  { id: 'US-0005', title: 'OCR + Vision (Premium)', priority: 'P1', labels: ['type:story', 'priority:P1'], body: `## User Story
As a **cautious everyday user**, I want to **upload a screenshot/image and get risk assessment of text and visual elements**, so that **I can verify fake invoices or impersonation**.

## Acceptance Criteria
- [ ] AC1: No image persistence
- [ ] AC2: Combined OCR + Vision explanation
- [ ] AC3: Paywall for Free users

## Linked Tasks
- T-0006

## Source
PRD §6.5` },
  { id: 'US-0006', title: 'Paywall + Web Checkout', priority: 'P1', labels: ['type:story', 'priority:P1'], body: `## User Story
As a **user interested in Premium**, I want to **see paywall when trying QR/OCR and complete checkout via Stripe/AbacatePay**, so that **I can unlock Premium features**.

## Acceptance Criteria
- [ ] AC1: Paywall on QR/OCR for Free
- [ ] AC2: Checkout flow activates subscription
- [ ] AC3: Subscription validation for Premium features

## Linked Tasks
- T-0007

## Source
PRD §2.2, §12` },
  { id: 'US-0007', title: 'Contact CTA Capture', priority: 'P1', labels: ['type:story', 'priority:P1'], body: `## User Story
As a **product team**, we want to **show optional CTA after verdict to capture email/WhatsApp**, so that **we can build newsletter and contact list**.

## Acceptance Criteria
- [ ] AC1: Non-blocking CTA
- [ ] AC2: Capture and store contact on submit
- [ ] AC3: contact_cta_shown, contact_submitted events

## Linked Tasks
- T-0008

## Source
PRD §2.3` },
  { id: 'US-0008', title: 'Onboarding + Home Input Hub', priority: 'P1', labels: ['type:story', 'priority:P1'], body: `## User Story
As a **first-time user**, I want to **see brief onboarding and clear Home with URL input, QR, Message options**, so that **I understand Shield and can start checking quickly**.

## Acceptance Criteria
- [ ] AC1: 3-screen onboarding (Welcome, How it works, Permissions)
- [ ] AC2: Home - URL input, Check URL, Scan QR, Analyze Message
- [ ] AC3: Paste detection - "Check copied link?"
- [ ] AC4: Share-in pre-populates URL

## Linked Tasks
- T-0009, T-0010

## Source
Design Spec §5` },
  { id: 'US-0009', title: 'Settings + Privacy + Delete Data', priority: 'P1', labels: ['type:story', 'priority:P1'], body: `## User Story
As a **privacy-conscious user**, I want to **access settings, request deletion, understand data usage**, so that **I can exercise LGPD rights**.

## Acceptance Criteria
- [ ] AC1: Delete request executed <24h
- [ ] AC2: Audit record stored
- [ ] AC3: Settings - Language, Notifications, Privacy, About

## Linked Tasks
- T-0011

## Source
PRD §8.4, Design Spec §5` },
  { id: 'US-0010', title: 'Ground Truth Labeling Pipeline', priority: 'P1', labels: ['type:story', 'priority:P1'], body: `## User Story
As an **internal reviewer**, I want to **label sample checks for ground truth and compute FP/FN metrics**, so that **we can improve scoring**.

## Acceptance Criteria
- [ ] AC1: 3 reviewers, 2/3 quorum
- [ ] AC2: Labels table per ARD §6.3
- [ ] AC3: FP/FN, Precision, Recall from sample

## Linked Tasks
- T-0012

## Source
PRD §9` },
  { id: 'US-0011', title: 'Infrastructure + Deployment', priority: 'P0', labels: ['type:story', 'priority:P0'], body: `## User Story
As an **engineering team**, we want to **deploy Go API, Next.js, cache, DB with CI/CD, rate limiting, secrets, observability**, so that **the system is production-ready**.

## Acceptance Criteria
- [ ] AC1: Fly.io + Vercel deployment
- [ ] AC2: Rate limiting 10/min, 60/h
- [ ] AC3: Secrets in vault
- [ ] AC4: Structured logs, metrics, alerts

## Linked Tasks
- T-0013, T-0014, T-0015, T-0016

## Source
ARD §4, §7, §10` },
];

const TASKS = [
  { id: 'T-0001', storyId: 'US-0001', title: 'URL Normalization & Cache', owner: 'BE', labels: ['type:task', 'area:backend', 'priority:P0', 'status:ready'], estimation: 'M' },
  { id: 'T-0002', storyId: 'US-0001', title: 'URL Analysis Pipeline', owner: 'BE', labels: ['type:task', 'area:backend', 'priority:P0', 'status:ready'], estimation: 'L' },
  { id: 'T-0003', storyId: 'US-0002', title: 'Message Analysis Service', owner: 'BE', labels: ['type:task', 'area:backend', 'priority:P0', 'status:ready'], estimation: 'M' },
  { id: 'T-0004', storyId: 'US-0003', title: 'Share Card Generation', owner: 'FE', labels: ['type:task', 'area:frontend', 'priority:P0', 'status:ready'], estimation: 'S' },
  { id: 'T-0005', storyId: 'US-0004', title: 'QR Decode & Paywall', owner: 'FE', labels: ['type:task', 'area:frontend', 'priority:P1'], estimation: 'M' },
  { id: 'T-0006', storyId: 'US-0005', title: 'OCR/Vision Pipeline', owner: 'BE', labels: ['type:task', 'area:backend', 'priority:P1'], estimation: 'L' },
  { id: 'T-0007', storyId: 'US-0006', title: 'Stripe/AbacatePay Checkout', owner: 'BE', labels: ['type:task', 'area:backend', 'priority:P1'], estimation: 'M' },
  { id: 'T-0008', storyId: 'US-0007', title: 'Contact CTA Form', owner: 'FE', labels: ['type:task', 'area:frontend', 'priority:P1'], estimation: 'XS' },
  { id: 'T-0009', storyId: 'US-0008', title: 'Home Input Hub UI', owner: 'FE', labels: ['type:task', 'area:frontend', 'priority:P1'], estimation: 'M' },
  { id: 'T-0010', storyId: 'US-0008', title: 'Onboarding Flow', owner: 'FE', labels: ['type:task', 'area:frontend', 'priority:P1'], estimation: 'S' },
  { id: 'T-0011', storyId: 'US-0009', title: 'Settings & Delete Data', owner: 'FE', labels: ['type:task', 'area:frontend', 'priority:P1'], estimation: 'M' },
  { id: 'T-0012', storyId: 'US-0010', title: 'Ground Truth Panel', owner: 'BE', labels: ['type:task', 'area:backend', 'area:qa', 'priority:P1'], estimation: 'M' },
  { id: 'T-0013', storyId: 'US-0011', title: 'Rate Limiting & Abuse', owner: 'BE', labels: ['type:task', 'area:infra', 'priority:P0', 'status:ready'], estimation: 'S' },
  { id: 'T-0014', storyId: 'US-0011', title: 'Secrets, Vault & Logging', owner: 'BE', labels: ['type:task', 'area:security', 'priority:P0', 'status:ready'], estimation: 'M' },
  { id: 'T-0015', storyId: 'US-0011', title: 'Observability & Events', owner: 'BE', labels: ['type:task', 'area:infra', 'priority:P0', 'status:ready'], estimation: 'M' },
  { id: 'T-0016', storyId: 'US-0011', title: 'Deployment & CI/CD', owner: 'Infra', labels: ['type:task', 'area:infra', 'priority:P0'], estimation: 'L' },
];

async function main() {
  console.log(`\n🛡️  Shield AI MVP - GitHub Setup\n`);
  console.log(`Repository: ${owner}/${repo}\n`);

  // 1. Create labels
  console.log('📌 Creating labels...');
  for (const l of LABELS) {
    try {
      await createLabel(l.name, l.color, l.description);
      console.log(`   ✓ ${l.name}`);
    } catch (e) {
      if (e.message.includes('422')) console.log(`   - ${l.name} (exists)`);
      else throw e;
    }
  }

  // 2. Create milestone
  console.log('\n📅 Creating MVP milestone...');
  const milestoneDesc = `Shield AI MVP — URL Check, Message Checklist, Shareable Verdict, QR Scan, OCR/Vision, Paywall, Contact CTA, Onboarding, Settings, Ground Truth, Infrastructure. Exit criteria: All P0/P1 delivered, TTFV p50≤10s, rate limiting, secrets in vault, LGPD delete <24h.`;
  const milestoneNumber = await createMilestone('MVP', milestoneDesc);
  console.log(`   ✓ MVP (milestone #${milestoneNumber})`);

  // 3. Create User Stories
  console.log('\n📖 Creating User Stories...');
  const storyNumbers = {};
  for (const s of USER_STORIES) {
    const issue = await createIssue(
      `[${s.id}] ${s.title}`,
      s.body,
      s.labels,
      milestoneNumber
    );
    storyNumbers[s.id] = issue.number;
    console.log(`   ✓ ${s.id} → #${issue.number}`);
  }

  // 4. Create Tasks (with story link in body)
  console.log('\n📋 Creating Tasks...');
  for (const t of TASKS) {
    const storyNum = storyNumbers[t.storyId];
    const body = `## Related Story\n${t.storyId} (#${storyNum})

## Owner\n${t.owner}

## Estimation\n${t.estimation}

## Source\nSee shield-ai-mvp-pack.md for full task details.
`;
    const issue = await createIssue(
      `[${t.id}] ${t.title}`,
      body,
      t.labels,
      milestoneNumber
    );
    console.log(`   ✓ ${t.id} → #${issue.number} (relates to ${t.storyId})`);
  }

  console.log('\n✅ Setup complete!\n');
  console.log('Next steps:');
  console.log('1. Go to your repo → Projects → New project');
  console.log('2. Name it "Shield AI MVP"');
  console.log('3. Add Board view with columns: Backlog, Ready, In Progress, Review, Done');
  console.log('4. Add issues to the project and set Status field');
  console.log('5. Link tasks to stories using "Relates to" in the issue sidebar\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
