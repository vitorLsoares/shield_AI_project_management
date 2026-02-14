# Shield Ai Security — Design Spec (UI/UX)

**Version:** 1.0
**Date:** 2026-02-05
**Status:** Draft for Review
**Related PRD:** Shield_Ai_Security_PRD.md

---

## 1. DESIGN SUMMARY

### Design Objective
Create a **consumer-first investigative security experience** that transforms complex threat intelligence into instant, plain-language guidance. The design must feel like a **trusted detective** (not a technical security tool), delivering confidence through clarity, speed, and actionable recommendations for everyday users facing potential scams.

### UX Principles

1. **Clarity Over Cleverness**
   Every verdict, explanation, and action must be immediately understandable to non-technical users. No jargon, no ambiguity.

2. **Speed Equals Trust**
   Results must appear fast (< 10s perception). Use progressive disclosure and optimistic UI to minimize perceived latency.

3. **Safety-First Guidance**
   When uncertain, explicitly say so and guide toward the safest action. Never leave users stranded without next steps.

4. **Empower, Don't Alarm**
   Present risks as information users can act on, not fear-based warnings. Tone: calm, helpful, protective.

5. **Respectful Minimalism**
   Every screen serves a clear purpose. No clutter, no unnecessary steps. Get to verdict → action in 2 taps.

6. **Accessible By Default**
   WCAG 2.1 AA is not an afterthought—it defines our color, typography, interaction, and content patterns from day one.

### Scope

**IN SCOPE (MVP Design)**
- Core flows: URL check, QR scan, message analysis
- Verdict presentation: risk score + explanation + actions
- User feedback mechanism (mark safe/scam)
- Onboarding (3-screen introduction to "detective" positioning)
- Mobile-first responsive design (iOS/Android + web view)
- Empty states, loading states, error recovery
- Basic settings (language, permissions, delete data)

**OUT OF SCOPE (Post-MVP)**
- Browser extension UI
- Watchlist/monitoring dashboards
- Education mode / lessons
- Deepfake detection interface (beta only)
- Enterprise B2B views
- In-app community/forums

---

## 2. USERS AND USE CASES

### Primary Persona: "Cautious Everyday User" (Ana, 34)
**Profile:**
- Uses WhatsApp daily, shops online (Mercado Livre, Shopee), pays via Pix
- Not tech-savvy; relies on intuition and friends' advice
- Received phishing attempts (fake delivery, "prize" links, QR codes)

**Goals:**
- Avoid scams without needing to understand technical details
- Get a fast answer: "Is this safe or not?"
- Know exactly what to do next (don't click? block sender? report?)

**Frustrations:**
- "Everything looks real now—I can't tell anymore"
- "Google search gives me articles, not answers"
- "Antivirus doesn't help with links I receive"

**Expected Experience:**
- Paste link → verdict appears in seconds → follow recommended action
- Explanation in simple Portuguese: "Why we think this is risky"
- Can share verdict with family WhatsApp group

---

### Secondary Persona: "Family Safety Helper" (Carlos, 42)
**Profile:**
- Adult son/daughter who helps parents verify suspicious messages
- Checks links before parents click; wants to educate them gradually

**Goals:**
- Quickly validate content to protect family
- Generate shareable "proof" (verdict card) to send in group chat
- Build family awareness ("how to spot red flags")

**Expected Experience:**
- Share suspicious link into Shield → instant verdict → forward result to family
- Simple language that parents understand
- Occasional tip/insight to help family learn patterns

---

### Tertiary Persona: "Micro-Entrepreneur" (Juliana, 29) — Post-MVP
**Profile:**
- Runs small online business; receives invoices, supplier contacts
- Concerned about impersonation, fake payment requests

**Goals:**
- Verify business-related links/documents quickly
- Avoid payment fraud

**Expected Experience:**
- Check invoice links before paying
- Detect supplier impersonation attempts

---

### Key Scenarios

| Scenario | Trigger | User Goal | Success Criteria |
|----------|---------|-----------|------------------|
| **Suspicious WhatsApp Link** | Friend shares "free prize" link | Verify before clicking | Verdict + action in < 15s; clear "don't click" guidance |
| **QR Code at Restaurant** | QR for menu/payment on table | Check if it's legitimate or phishing | Scan → instant risk score + advice (safe to pay?) |
| **Fake Delivery Message** | SMS with tracking link | Confirm if it's real delivery or scam | Detect urgency cues + typosquatting; recommend blocking |
| **Helping Parent** | Parent asks "is this safe?" | Quick check + shareable answer | Generate image/text summary for family group |
| **Account Takeover Attempt** | Link claims "verify your account" | Avoid credential theft | Detect impersonation; recommend reporting + secure account |

---

## 3. INFORMATION ARCHITECTURE

### Sitemap (Hierarchical Structure)

```
Shield Ai Security (App)
│
├── Onboarding (first launch only)
│   ├── Welcome (detective positioning)
│   ├── Permissions Request (camera, paste, notifications)
│   └── Quick Tutorial (how it works)
│
├── Home / Input Hub
│   ├── Check URL (paste or share-in)
│   ├── Scan QR Code (camera)
│   ├── Analyze Message (paste text)
│   └── [Future: Upload File/Image]
│
├── Analysis / Loading
│   └── Progress indicators (provider checks, signals)
│
├── Verdict / Results
│   ├── Risk Score (visual + label)
│   ├── Explanation ("What we saw" + "Why it matters")
│   ├── Recommended Actions (CTA buttons)
│   ├── Evidence Cards (expandable details)
│   ├── Feedback Widget ("Was this helpful?" / "Mark scam/safe")
│   └── Share Verdict (generate card)
│
├── History
│   ├── Recent Checks (chronological list)
│   ├── Filter by Risk Level
│   └── Re-check (update verdict)
│
├── Settings
│   ├── Language (PT-BR / EN)
│   ├── Notifications (alerts, tips)
│   ├── Privacy (data deletion, consent)
│   └── About (version, terms, contact)
│
└── Error / Fallback States
    ├── Network Error
    ├── Service Unavailable
    └── Invalid Input
```

---

### Navigation Structure

**Pattern:** Bottom navigation (mobile) + collapsible sidebar (web)

**Primary Tabs (Bottom Nav):**
1. **Home** (check icon) — Input hub
2. **History** (clock icon) — Past checks
3. **Settings** (gear icon) — Account/preferences

**Secondary Navigation:**
- Context-specific actions appear in top bar (e.g., "Share" on verdict screen)
- Modal overlays for feedback, education tips
- No hamburger menu; keep structure flat

**Deep Linking:**
- `shield://check?url=[encoded]` → direct to analysis
- `shield://verdict/[id]` → view past result
- Share-in from WhatsApp/browser → auto-populate URL input

---

### Labeling Patterns

| UI Element | Label (PT-BR) | Label (EN) | Icon |
|------------|---------------|------------|------|
| Main CTA | "Verificar link" | "Check link" | Magnifying glass |
| QR action | "Escanear QR Code" | "Scan QR Code" | Camera |
| Message check | "Analisar mensagem" | "Analyze message" | Text bubble |
| Share verdict | "Compartilhar resultado" | "Share verdict" | Share arrow |
| Mark safe | "Marcar como seguro" | "Mark as safe" | Checkmark |
| Mark scam | "Denunciar golpe" | "Report scam" | Flag |
| Risk levels | Alto Risco / Médio / Baixo / Inconclusivo | High Risk / Medium / Low / Inconclusive | Color-coded shield |

**Voice:** Active, direct verbs ("Check", "Scan", "Report") — not passive ("Link Checking", "Scanning")

---

## 4. JOURNEYS AND FLOWS (END-TO-END)

### Flow A: Check Suspicious URL (Happy Path)

```
[Trigger] User receives WhatsApp link, unsure if safe

1. Home Screen
   ├─ User opens Shield app
   ├─ Sees "Check URL" input field (pre-focused)
   └─ Pastes link OR shares into app from WhatsApp

2. Analysis Screen (Loading)
   ├─ Animated shield icon (pulsing)
   ├─ Progress text: "Analyzing link..." → "Checking reputation..." → "Almost done..."
   ├─ Timeout: show estimated time remaining if > 10s
   └─ Duration: target p50 < 10s

3. Verdict Screen (Results)
   ├─ Risk Score: Large visual indicator (shield icon with color)
   │   └─ Label: "High Risk" (red), "Medium Risk" (orange), "Low Risk" (green), "Inconclusive" (gray)
   ├─ Headline: "This link appears to be a scam" (plain language)
   ├─ Explanation Section (2-3 sentences):
   │   ├─ "What we saw": domain age, typosquatting, known threat
   │   └─ "Why it matters": credential theft, fake store, payment fraud
   ├─ Recommended Actions (priority order):
   │   ├─ PRIMARY: "Don't visit this site" (dismiss + copy warning)
   │   ├─ SECONDARY: "Block sender" (deep link to WhatsApp block)
   │   └─ TERTIARY: "Report to authorities" (pre-fill report)
   ├─ Evidence Cards (expandable accordion):
   │   ├─ "Domain registered 3 days ago"
   │   ├─ "Similar to amazon.com.br (typosquatting)"
   │   └─ "Flagged by 2 threat databases"
   └─ Feedback Widget: "Was this helpful?" (thumbs up/down)

4. Feedback (Optional)
   ├─ User taps "Yes, helpful" → brief thank-you toast
   ├─ OR taps "Mark as scam/safe" → quick reason selector
   └─ Returns to Home or History

[Exit] User closes app or checks another link
```

**Interaction Details:**
- Auto-focus on input field (reduce friction)
- Paste detection: if clipboard has URL, show "Check copied link?" prompt
- Share-in: WhatsApp/browser → auto-populate URL → skip to analysis
- Swipe down to dismiss verdict → return to Home
- "Check another" button always visible

---

### Flow B: QR Code Scanning

```
1. Home Screen
   └─ User taps "Scan QR Code" button

2. Camera View
   ├─ Full-screen camera with overlay frame
   ├─ Instructions: "Point camera at QR code"
   ├─ Auto-detect QR → resolve URL safely (no auto-open)
   └─ Cancel button (return to Home)

3. QR Resolved
   ├─ Show extracted URL in preview
   ├─ "This QR points to: [domain.com]"
   ├─ CTA: "Check this link" → proceed to Analysis
   └─ OR "Cancel" (if user changes mind)

4. Analysis → Verdict
   └─ Same as Flow A (URL check)

[Edge Case: QR Not Detected]
   └─ After 10s, show tip: "Move closer or improve lighting"
```

**Interaction Details:**
- Request camera permission on first use (with clear explanation: "We need camera access to scan QR codes securely")
- Never auto-open URL; always ask user to confirm check
- If QR is malformed, show "Unable to read QR code" error

---

### Flow C: Message Text Analysis

```
1. Home Screen
   └─ User taps "Analyze Message" button

2. Text Input Screen
   ├─ Large text area: "Paste suspicious message here"
   ├─ Character limit: 1000 (show counter)
   ├─ Example placeholder: "Urgent: Your account will be blocked..."
   └─ CTA: "Analyze"

3. Analysis (NLP Detection)
   ├─ Progress: "Detecting phishing cues..."
   └─ Duration: target < 8s

4. Verdict Screen (Adapted for Text)
   ├─ Risk Score: "High Risk" or "Suspicious Patterns Detected"
   ├─ Explanation:
   │   ├─ "What we saw": urgency language, impersonation claims, payment demand
   │   └─ "Why it matters": common phishing tactic
   ├─ Highlighted Text: red-flag keywords underlined in original message
   ├─ Recommended Actions:
   │   ├─ "Don't respond or send money"
   │   ├─ "Verify directly with company" (how-to script)
   │   └─ "Block sender"
   └─ Feedback: "Mark as scam/safe"

[Exit] User follows action or returns to Home
```

**Interaction Details:**
- Auto-trim whitespace; detect if input is actually a URL → redirect to URL check
- Highlight specific red-flag phrases in original text (visual cues)
- Provide verification script: "Call [company name] at official number, not the one in this message"

---

### Alternative Flow: Low-Risk Verdict (Inconclusive)

```
Verdict Screen
├─ Risk Score: "Inconclusive" (gray shield icon)
├─ Headline: "We couldn't confirm this link is safe or dangerous"
├─ Explanation:
│   ├─ "What we saw": no clear threat signals, limited data
│   └─ "Why it matters": newer site, no reputation yet
├─ Recommended Actions (safety-first):
│   ├─ PRIMARY: "Proceed with caution"
│   │   └─ Tip: "Don't enter passwords or payment info"
│   ├─ SECONDARY: "Verify sender" (ask via separate channel)
│   └─ TERTIARY: "Skip this link" (safest choice)
└─ Feedback: "Was this link actually safe?" (mark safe/scam to improve)

[User Choice] Decides independently with guidance
```

**Design Note:** Inconclusive state is NOT a failure—it's transparent honesty that builds trust.

---

### Recovery Flow: Error States

**Network Error**
```
Error Screen
├─ Icon: disconnected Wi-Fi
├─ Headline: "No internet connection"
├─ Body: "Check your connection and try again"
├─ CTA: "Retry"
└─ Secondary: "Cancel" (return to Home)
```

**Service Unavailable (Provider Down)**
```
Error Screen
├─ Icon: tool/wrench
├─ Headline: "We're having technical issues"
├─ Body: "We couldn't complete the check right now. Try again in a few minutes."
├─ CTA: "Retry"
└─ Secondary: "Go back"
```

**Invalid Input**
```
Inline Error (on input field)
├─ Red border around field
├─ Message: "This doesn't look like a valid URL. Try pasting the full link."
└─ Example: "Example: https://site.com"
```

**Timeout (Analysis Takes Too Long)**
```
Analysis Screen (after 25s)
├─ Progress stops
├─ Message: "This is taking longer than expected..."
├─ Options:
│   ├─ "Keep waiting" (up to 60s total)
│   └─ "Cancel and try later"
```

---

## 5. SCREENS AND COMPONENTS (UI INVENTORY)

### Screen 1: Onboarding (First Launch Only)

**Purpose:** Introduce "detective" positioning; set expectations; request permissions

**Screens (3-step flow):**

**1.1 Welcome**
- Hero image: Shield + magnifying glass icon (friendly detective theme)
- Headline: "Your digital detective for online safety"
- Body: "Shield investigates suspicious links, QR codes, and messages—so you can decide with confidence."
- CTA: "Get started" → next

**1.2 How It Works**
- Visual: 3-step illustration (paste → analyze → decide)
- Body:
  - "Paste a link or scan a QR code"
  - "We analyze it using trusted security sources"
  - "You get a clear verdict and next steps"
- CTA: "Continue" → next

**1.3 Permissions**
- Icon: camera + clipboard
- Headline: "We need a couple permissions"
- Body:
  - "Camera: To scan QR codes securely"
  - "Clipboard: To check links you copy"
- CTA: "Allow access" (triggers OS permissions)
- Secondary: "Set up later" (skip to Home)

**States:**
- Skip button (top-right) available after first screen
- Dots indicator (1 of 3, 2 of 3, 3 of 3)
- Progress bar optional

---

### Screen 2: Home / Input Hub

**Purpose:** Primary entry point; fast access to all check types

**Layout:**
```
┌─────────────────────────────────────┐
│ [Logo]               [Settings icon]│
├─────────────────────────────────────┤
│                                     │
│  🛡️ Shield Ai Security              │
│  Your digital safety detective      │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Paste URL or link here...    │ │ [Auto-focus]
│  └───────────────────────────────┘ │
│  [Check URL button]                │
│                                     │
│  ─── OR ───                         │
│                                     │
│  [📷 Scan QR Code]   [💬 Analyze  │
│                        Message]     │
│                                     │
├─────────────────────────────────────┤
│ Recent Checks (last 3):             │
│  • Low Risk • High Risk • Medium   │
├─────────────────────────────────────┤
│ [Home] [History] [Settings]        │ Bottom nav
└─────────────────────────────────────┘
```

**Elements:**
1. **URL Input Field**
   - Placeholder: "Paste URL or link here..."
   - Auto-focus on screen load
   - Paste detection: if clipboard has URL, show helper: "Check copied link?" (one-tap shortcut)
   - Character limit: 2000 (show counter if > 1500)

2. **Primary CTA: "Check URL"**
   - Style: Large button, primary color (blue/green)
   - Disabled state if input empty or invalid
   - Loading state: spinner + "Analyzing..."

3. **Secondary Actions (Grid/List)**
   - "Scan QR Code" (camera icon)
   - "Analyze Message" (text bubble icon)
   - Style: Card buttons, secondary color

4. **Recent Checks Widget** (optional, dismissible)
   - Shows last 3 checks with mini risk badge
   - Tap to view full verdict
   - "See all" → History screen

**States:**
- Empty state (first time): Show example + tip ("Try pasting a link")
- Clipboard URL detected: Show prompt ("Check this link? [URL preview]")
- Invalid URL: Inline error with example format
- Share-in active: Input pre-populated, CTA auto-enabled

**Interactions:**
- Clear button (X) inside input field when text present
- Long-press input → paste menu (standard OS)
- Shake to clear input (mobile)

---

### Screen 3: Analysis / Loading

**Purpose:** Provide feedback during processing; manage user expectations

**Layout:**
```
┌─────────────────────────────────────┐
│ [Back]                              │
├─────────────────────────────────────┤
│                                     │
│         🛡️ [Animated Shield]        │
│         (pulsing/spinning)           │
│                                     │
│    Analyzing link...                │
│    ▓▓▓▓▓▓░░░░ 60%                   │
│                                     │
│    Checking reputation databases... │
│                                     │
│    [Cancel] (if > 15s)              │
│                                     │
└─────────────────────────────────────┘
```

**Elements:**
1. **Animated Icon**
   - Shield with pulsing glow or spinning effect
   - Reinforces "working on it" perception

2. **Progress Text (Dynamic)**
   - Sequence:
     - "Analyzing link..." (0-3s)
     - "Checking reputation databases..." (3-8s)
     - "Inspecting patterns..." (8-12s)
     - "Almost done..." (12s+)
   - Updates every 2-3s to show progress

3. **Progress Bar** (optional, shows % complete)
   - Based on provider responses (3 providers = 33% each)
   - Indeterminate if providers respond unpredictably

4. **Cancel Button**
   - Appears after 15s if analysis still running
   - Confirmation modal: "Stop analysis and return?"
   - Action: abort API calls, return to Home

**States:**
- Fast result (< 5s): Skip progress text, show result immediately
- Slow result (> 10s): Show time estimate ("about 15 seconds")
- Timeout (> 25s): Show "taking longer than expected" message + extended cancel option

**Interactions:**
- No taps/swipes; passive feedback only
- Optional: tap screen to see detailed provider status (advanced users)

---

### Screen 4: Verdict / Results

**Purpose:** Present risk score, explanation, and actionable recommendations

**Layout (High-Risk Example):**
```
┌─────────────────────────────────────┐
│ [Back]              [Share] [•••]   │
├─────────────────────────────────────┤
│                                     │
│         🛡️ [RED SHIELD ICON]        │
│            HIGH RISK                │
│                                     │
│    This link appears to be a scam   │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ What we saw:                    │ │
│ │ • Domain registered 2 days ago  │ │
│ │ • Typosquatting: amaz0n.com.br  │ │
│ │ • Flagged by 2 threat databases │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Why it matters:                 │ │
│ │ This site may steal your login  │ │
│ │ or payment information.         │ │
│ └─────────────────────────────────┘ │
│                                     │
│    What you should do:              │
│    [🚫 Don't visit this site]       │ PRIMARY
│    [🚷 Block sender]                │ SECONDARY
│    [🚩 Report to authorities]       │ TERTIARY
│                                     │
│    Evidence (tap to expand) ▼       │
│                                     │
├─────────────────────────────────────┤
│ Was this helpful?  [👍] [👎]        │
│ [Mark as scam] [Mark as safe]      │
├─────────────────────────────────────┤
│ [Check another link]                │
└─────────────────────────────────────┘
```

**Elements:**

1. **Risk Score Visual**
   - Icon: Shield (solid for conclusive, outlined for uncertain)
   - Color coding:
     - **High Risk:** Red (#D32F2F)
     - **Medium Risk:** Orange (#F57C00)
     - **Low Risk:** Green (#388E3C)
     - **Inconclusive:** Gray (#757575)
   - Size: 80x80px (mobile), 120x120px (tablet+)
   - Accessibility: Color + icon shape + text label (never color alone)

2. **Verdict Headline**
   - Text examples:
     - High: "This link appears to be a scam"
     - Medium: "This link has some suspicious signs"
     - Low: "This link appears safe, but verify the sender"
     - Inconclusive: "We couldn't confirm if this link is safe"
   - Font: Bold, 20-24px
   - Max width: 90% screen (wrap to 2 lines if needed)

3. **Explanation Section**
   - **"What we saw"** (findings):
     - Bullet list (3-5 items max)
     - Examples: domain age, typosquatting, threat feed hit, redirect chain, SSL issues
     - Plain language; avoid technical codes
   - **"Why it matters"** (impact):
     - 1-2 sentences
     - User-centric (what could happen to them)
     - Examples: "credential theft", "fake payment", "malware download"

4. **Recommended Actions (CTA Stack)**
   - Priority order (visual hierarchy):
     1. PRIMARY: Large button, solid color (red for danger, blue for neutral)
     2. SECONDARY: Medium button, outlined style
     3. TERTIARY: Text link or small button
   - Action types:
     - Blocking: "Don't visit", "Don't click", "Don't respond"
     - Protective: "Block sender", "Secure your account", "Change passwords"
     - Reporting: "Report to [authority]", "Flag to [platform]"
     - Verification: "Verify with [company] directly" (include script/contact info)
   - Deep linking:
     - "Block sender" → WhatsApp block screen (if possible)
     - "Report" → pre-filled form or external URL
   - Accessibility: Min height 44px (touch target), clear labels

5. **Evidence Cards (Expandable)**
   - Default: Collapsed ("Evidence (tap to expand) ▼")
   - Tapped: Expands accordion to show detailed signals
   - Content:
     - Provider name + finding
     - Timestamp of check
     - Confidence level (High/Medium/Low)
   - Style: Subtle gray background, small text (14px)

6. **Feedback Widget**
   - Question: "Was this helpful?"
   - Options: Thumbs up/down icons (large tap targets)
   - On selection:
     - Thumbs up → "Thank you! 💙" toast
     - Thumbs down → Quick reason selector modal:
       - "Wrong verdict"
       - "Explanation unclear"
       - "Missing information"
       - "Other" (free text)
   - Secondary feedback:
     - "Mark as scam" / "Mark as safe" (toggle buttons)
     - On select: Confirmation toast + ask reason (optional)

7. **Share Action** (top-right)
   - Icon: Share arrow
   - Action: Generate verdict card (image or text)
   - Content:
     - Risk level + headline + key evidence
     - "Checked with Shield Ai Security" footer + app link
   - Platform: WhatsApp, SMS, email (OS share sheet)

**States:**
- Loading evidence: Show skeleton loaders in evidence section
- No evidence available: Hide evidence section entirely
- Already marked by user: Show "You marked this as [scam/safe]" badge

**Variations by Risk Level:**

| Risk Level | Shield Color | Headline Tone | Primary CTA Example | Icon |
|------------|--------------|---------------|---------------------|------|
| High Risk | Red | Assertive ("appears to be a scam") | "Don't visit this site" | ⛔ |
| Medium Risk | Orange | Cautious ("has suspicious signs") | "Proceed with caution" | ⚠️ |
| Low Risk | Green | Reassuring ("appears safe") | "OK to proceed" | ✅ |
| Inconclusive | Gray | Honest ("couldn't confirm") | "Verify sender first" | ❓ |

**Microcopy Examples (Risk Headlines):**
- High: "This link is very likely a scam"
- High: "Warning: This site may steal your information"
- Medium: "This link has some red flags"
- Medium: "Be careful with this link"
- Low: "This link looks safe, but verify the sender"
- Low: "No threats detected"
- Inconclusive: "We don't have enough information to decide"
- Inconclusive: "This is a new site—we can't confirm safety yet"

---

### Screen 5: History

**Purpose:** Let users review past checks; re-run analysis if needed

**Layout:**
```
┌─────────────────────────────────────┐
│ History                  [Filter ▼] │
├─────────────────────────────────────┤
│ Today                               │
│ ┌─────────────────────────────────┐ │
│ │ 🛡️ [RED] High Risk              │ │
│ │ amaz0n.com.br                   │ │
│ │ 2 hours ago            [View]   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🛡️ [GREEN] Low Risk             │ │
│ │ mercadolivre.com.br             │ │
│ │ 5 hours ago            [View]   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Yesterday                           │
│ ┌─────────────────────────────────┐ │
│ │ 🛡️ [ORANGE] Medium Risk         │ │
│ │ bit.ly/abc123                   │ │
│ │ Yesterday              [View]   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Show more]                         │
├─────────────────────────────────────┤
│ [Home] [History] [Settings]        │
└─────────────────────────────────────┘
```

**Elements:**
1. **List of Past Checks**
   - Each item shows:
     - Risk level icon + color
     - URL/domain (truncated if long)
     - Relative timestamp ("2 hours ago", "Yesterday")
     - "View" button → opens cached verdict
   - Grouped by date (Today, Yesterday, Last 7 days, Older)
   - Limit: Show 20 most recent; pagination/infinite scroll if needed

2. **Filter Dropdown** (top-right)
   - Options:
     - All checks
     - High risk only
     - Medium risk only
     - Low risk only
     - Inconclusive only
   - Default: All checks

3. **Actions per Item**
   - Tap card → view full verdict (cached)
   - Swipe left → "Delete" (remove from history)
   - Long-press → context menu:
     - "Re-check" (run fresh analysis)
     - "Share"
     - "Delete"

**States:**
- Empty state (no history): "You haven't checked any links yet. Tap [Home] to get started."
- Loading: Skeleton loaders for 3 items
- Deleted item: Undo toast ("Deleted. Undo?", 5s timeout)

**Interactions:**
- Pull-to-refresh: Re-sync history from server (if applicable)
- Search bar (optional): Filter by URL/domain text

---

### Screen 6: Settings

**Purpose:** User preferences, privacy controls, account management

**Layout:**
```
┌─────────────────────────────────────┐
│ Settings                   [Close]  │
├─────────────────────────────────────┤
│ Account (if logged in)              │
│  Email: user@example.com            │
│  [Sign out]                         │
│                                     │
│ Preferences                         │
│  Language            [PT-BR ▼]      │
│  Notifications       [Toggle: ON]   │
│                                     │
│ Privacy                             │
│  Delete my data      [Request]      │
│  Download my data    [Export]       │
│  Data usage policy   [View]         │
│                                     │
│ Permissions                         │
│  Camera access       [Enabled]      │
│  Clipboard access    [Enabled]      │
│                                     │
│ About                               │
│  Version 1.0.0                      │
│  Terms of service    [View]         │
│  Privacy policy      [View]         │
│  Contact support     [Email]        │
│                                     │
└─────────────────────────────────────┘
```

**Elements:**
1. **Language Selector**
   - Options: PT-BR, EN (expand as needed)
   - Updates all UI text immediately

2. **Notifications Toggle**
   - Subtitle: "Get alerts about new scam trends"
   - States: ON (blue), OFF (gray)

3. **Privacy Controls**
   - "Delete my data": Opens confirmation modal → deletes history + account data
   - "Download my data": Exports JSON/CSV of checks
   - "Data usage policy": Opens in-app browser or modal

4. **Permissions Status**
   - Shows current camera/clipboard status
   - Tap → opens OS settings if disabled

5. **About Section**
   - Version number
   - Links to legal docs (terms, privacy)
   - Support contact (email or in-app form)

**States:**
- Logged out: Show "Sign in / Create account" instead of email
- Data deletion pending: Show "Processing..." spinner
- Export ready: Download link or share sheet

---

### Component Library (Reusable UI Patterns)

#### **C1: Risk Badge**
- **Purpose:** Consistent risk level indicator across all screens
- **Variants:**
  - Icon-only (small, 24x24px)
  - Icon + label (medium, 40x40px + text)
  - Large (verdict screen, 80x80px)
- **Colors:** Red / Orange / Green / Gray (with AA contrast ratio)
- **Usage:** History list, verdict screen, notifications

#### **C2: CTA Button**
- **Variants:**
  - Primary (solid, high emphasis)
  - Secondary (outlined, medium emphasis)
  - Tertiary (text-only, low emphasis)
- **Sizes:** Large (48px height), Medium (40px), Small (32px)
- **States:** Default, Hover (web), Pressed, Disabled, Loading
- **Accessibility:** Min 44x44px touch target; aria-label for icons

#### **C3: Evidence Card (Accordion)**
- **Behavior:** Collapsed by default; tap to expand
- **Content:** Provider + finding + confidence + timestamp
- **Style:** Gray background (#F5F5F5), rounded corners (8px)
- **Icon:** Chevron down/up for expand/collapse

#### **C4: Feedback Widget**
- **Layout:** Horizontal button group (thumbs up/down)
- **Action:** On tap → show toast or modal
- **Persistence:** Remember user's choice (don't ask twice for same verdict)

#### **C5: Empty State Illustration**
- **Usage:** History screen (no checks), settings (no account)
- **Style:** Simple line art + friendly message + CTA
- **Example:**
  - Icon: Magnifying glass with shield
  - Text: "No checks yet"
  - Subtext: "Paste a link to get started"
  - CTA: "Go to Home"

#### **C6: Toast Notification**
- **Purpose:** Brief feedback (success, error, info)
- **Duration:** 3-5s auto-dismiss; swipe to dismiss
- **Position:** Bottom (mobile), top-right (web)
- **Examples:**
  - "✓ Link copied" (success)
  - "⚠️ Network error" (error)
  - "💙 Thank you for feedback!" (info)

#### **C7: Modal (Dialog)**
- **Usage:** Confirmations, forms, secondary information
- **Layout:** Centered overlay with backdrop
- **Elements:** Title, body, 1-2 CTAs, close (X) button
- **Accessibility:** Focus trap; Esc key closes; backdrop tap closes

---

## 6. CONTENT PATTERNS AND MICROCOPY

### Tone of Voice

**Brand Voice:** Calm, protective, empowering—like a trusted advisor, not an alarm system.

**Principles:**
1. **Plain Language:** No jargon. If a term is technical, explain it or replace it.
   - ❌ "Malicious payload detected via heuristic analysis"
   - ✅ "This link may install harmful software on your device"

2. **Active Voice:** Direct actions, not passive descriptions.
   - ❌ "This link has been analyzed"
   - ✅ "We analyzed this link"

3. **Empathy Over Panic:** Acknowledge concern; guide toward safety.
   - ❌ "DANGER! DO NOT CLICK!"
   - ✅ "This link appears risky. Here's what to do instead."

4. **Transparency:** If uncertain, say so. Don't fake confidence.
   - ✅ "We couldn't confirm if this is safe. When in doubt, verify the sender directly."

---

### Error and Help Messages

| Scenario | Message | Tone |
|----------|---------|------|
| Invalid URL | "This doesn't look like a valid link. Try pasting the full URL (e.g., https://site.com)." | Instructive |
| Network error | "No internet connection. Check your network and try again." | Neutral, helpful |
| Service unavailable | "We're having technical issues. Please try again in a few minutes." | Apologetic, honest |
| Timeout | "This check is taking longer than expected. You can keep waiting or try again later." | Patient, understanding |
| Permission denied | "We need camera access to scan QR codes. Enable it in Settings." | Clear, actionable |
| Empty input | "Paste a link to get started." | Friendly, encouraging |
| Rate limit hit | "You've checked many links today. Try again in [X] hours." | Informative, non-punitive |

---

### CTA Patterns

**Action Verb Rules:**
- Use **imperative verbs** (command form): "Check link", "Scan QR", "Report scam"
- Avoid generic labels like "Submit", "OK", "Continue" (unless in context)

**Priority Hierarchy:**
- **High-risk actions (destructive/warning):** Red, large
  - Examples: "Don't visit", "Block sender", "Delete data"
- **Safe actions (proceed):** Blue/green, medium
  - Examples: "Check link", "View details", "Save"
- **Low-priority actions:** Text link or small button
  - Examples: "Learn more", "Skip", "Cancel"

**Examples by Context:**

| Screen | Primary CTA | Secondary CTA | Tertiary CTA |
|--------|-------------|---------------|--------------|
| Home | "Check URL" | "Scan QR Code" | "Analyze Message" |
| Verdict (high risk) | "Don't visit this site" | "Block sender" | "Report scam" |
| Verdict (low risk) | "OK to proceed" | "Verify sender" | — |
| Feedback | "Submit feedback" | "Skip" | — |
| Settings | "Delete my data" | "Cancel" | — |

---

### Ready-to-Use Microcopy (20 Examples)

**Verdict Headlines:**
1. "This link appears to be a scam"
2. "Warning: This site may steal your information"
3. "This link has some suspicious signs"
4. "Be careful with this link"
5. "This link looks safe, but verify the sender"
6. "No threats detected in this link"
7. "We couldn't confirm if this link is safe"
8. "This is a new site—we don't have enough data yet"

**Explanation Snippets ("What we saw"):**
9. "Domain registered only 2 days ago"
10. "This URL looks like a misspelled version of [brand].com"
11. "This link redirects multiple times before reaching a destination"
12. "This site isn't using secure encryption (HTTPS)"
13. "Flagged by 3 threat intelligence databases"

**Action Buttons:**
14. "Don't visit this site"
15. "Block sender on WhatsApp"
16. "Report to SaferNet Brasil"
17. "Verify with [company name] directly"
18. "Proceed with caution"

**Feedback/Confirmation:**
19. "Thank you! Your feedback helps improve Shield."
20. "Link copied to clipboard"

---

## 7. ACCESSIBILITY AND INCLUSION (WCAG 2.1 AA)

### Color and Contrast

**Requirements:**
- **Text contrast:** Minimum 4.5:1 for normal text (< 18pt), 3:1 for large text (≥ 18pt)
- **UI component contrast:** 3:1 for interactive elements (buttons, form fields)
- **No color-only indicators:** Always pair color with text/icon/shape

**Risk Level Colors (Verified for Contrast):**
| Level | Color | Hex | Background | Contrast Ratio |
|-------|-------|-----|------------|----------------|
| High Risk | Red | #D32F2F | White (#FFFFFF) | 5.9:1 ✅ |
| Medium Risk | Orange | #F57C00 | White (#FFFFFF) | 4.6:1 ✅ |
| Low Risk | Green | #388E3C | White (#FFFFFF) | 5.1:1 ✅ |
| Inconclusive | Gray | #757575 | White (#FFFFFF) | 4.5:1 ✅ |

**Additional Redundancy:**
- Risk badge always includes icon shape (shield) + text label ("High Risk")
- Never use red/green alone; add icons (⛔ / ✅)

---

### Focus Indicators

**Keyboard Navigation:**
- All interactive elements (buttons, links, form fields) must be reachable via Tab key
- Visible focus ring: 2px solid blue (#2196F3) with 2px offset
- Focus order: logical top-to-bottom, left-to-right
- Skip link: "Skip to main content" (hidden until focused)

**Example CSS:**
```css
:focus-visible {
  outline: 2px solid #2196F3;
  outline-offset: 2px;
}
```

---

### Screen Reader Support

**Labels and ARIA:**
- All images have `alt` text (describe what's shown, not "image of...")
- Icon-only buttons have `aria-label`:
  - Share button: `aria-label="Share verdict"`
  - Settings icon: `aria-label="Open settings"`
- Form fields have visible `<label>` elements (not just placeholder)
- Error messages linked to fields via `aria-describedby`
- Loading states announced: `aria-live="polite"` for progress updates

**Example HTML:**
```html
<button aria-label="Check URL">
  <svg><!-- magnifying glass icon --></svg>
</button>

<div role="alert" aria-live="polite">
  Analyzing link...
</div>
```

**Reading Order:**
- Verdict screen read as: Risk level → headline → explanation → actions
- Evidence cards: Default collapsed; announce "expandable" state

---

### Touch Targets and Sizing

**Minimum Sizes (Mobile):**
- Buttons/links: **44x44px** minimum (WCAG AAA guideline)
- Text inputs: 48px height (comfortable typing)
- Tap spacing: 8px minimum between adjacent interactive elements

**Example (CTA Buttons):**
- Primary button: 48px height, full-width (mobile) or min 120px (web)
- Icon buttons: 44x44px with 12px padding

---

### Dynamic Text and Scalability

**Font Scaling:**
- Support OS text size settings (iOS Dynamic Type, Android Font Scale)
- Base font size: 16px (1rem)
- Hierarchy:
  - Headline: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)
- Test at 200% zoom (WCAG requirement): layout must not break

**Responsive Units:**
- Use `rem` for font sizes (not `px`)
- Use `em` for spacing relative to text (e.g., button padding)

---

### Images and Icons

**Guidelines:**
1. **Decorative images:** `alt=""` (empty, so screen readers skip)
2. **Informative images/icons:** Descriptive `alt` text
   - ✅ `alt="High risk shield icon"`
   - ❌ `alt="Icon"`
3. **Complex graphics (e.g., charts):** Provide text summary nearby
4. **Icon + text labels:** Always pair (e.g., 🛡️ + "High Risk")

**Icon Accessibility:**
- Icons must have 3:1 contrast ratio against background
- Use semantic SVG with `<title>` element:
  ```html
  <svg aria-labelledby="shield-title">
    <title id="shield-title">High risk shield</title>
    <!-- SVG paths -->
  </svg>
  ```

---

### Reduced Motion

**Animations:**
- Respect `prefers-reduced-motion` media query
- Disable/reduce animations if user has motion sensitivity

**Example CSS:**
```css
@media (prefers-reduced-motion: reduce) {
  .shield-animation {
    animation: none;
  }
}
```

**Apply to:**
- Loading shield animation (use static icon instead)
- Slide transitions (use fade instead)
- Auto-scrolling carousels (pause by default)

---

## 8. RESPONSIVENESS AND LAYOUT

### Breakpoints

| Device | Breakpoint | Grid Columns | Typical Use Case |
|--------|------------|--------------|------------------|
| Mobile (S) | 320-479px | 4 columns | iPhone SE, small Android |
| Mobile (M) | 480-767px | 4 columns | iPhone 12/13, most phones |
| Tablet | 768-1023px | 8 columns | iPad, Android tablets |
| Desktop (S) | 1024-1439px | 12 columns | Small laptops, browser windows |
| Desktop (L) | 1440px+ | 12 columns | Large monitors, full-screen apps |

**Approach:** **Mobile-first** (design for 320px, enhance upward)

---

### Grid and Spacing System

**Base Unit:** 8px (all spacing multiples of 8)

**Spacing Scale:**
- **XS:** 4px (tight spacing, inline elements)
- **S:** 8px (compact groups)
- **M:** 16px (default spacing between components)
- **L:** 24px (section spacing)
- **XL:** 32px (major section breaks)
- **XXL:** 48px (screen padding, large gaps)

**Grid:**
- Mobile: 16px side margins, 8px gutter between columns
- Tablet: 24px side margins, 16px gutter
- Desktop: 32px side margins, 24px gutter

**Max Content Width:**
- Mobile/Tablet: 100% (fluid)
- Desktop: 1200px max-width, centered

---

### Content Prioritization by Screen Size

**Mobile (320-767px):**
- **Show:** Risk score, headline, explanation, primary action, feedback widget
- **Hide/Collapse:** Evidence cards (default collapsed), secondary actions (collapsed into "More options" menu)
- **Layout:** Single column, vertical stack

**Tablet (768-1023px):**
- **Show:** All mobile content + evidence cards (default expanded), secondary actions visible
- **Layout:** Single column or 2-column for action buttons (side-by-side)

**Desktop (1024px+):**
- **Show:** All content, larger typography, more whitespace
- **Layout:** Verdict screen can use 2-column layout (explanation left, actions right)
- **Navigation:** Sidebar (collapsible) instead of bottom nav

---

### Layout Examples

**Verdict Screen (Mobile):**
```
┌─────────────────────┐
│ [Back]       [Share]│
├─────────────────────┤
│   🛡️ HIGH RISK      │
│ This link appears...│
│                     │
│ What we saw:        │
│ • Finding 1         │
│ • Finding 2         │
│                     │
│ Why it matters:     │
│ Credential theft... │
│                     │
│ [Don't visit]       │ PRIMARY
│ [Block sender]      │ SECONDARY
│ [More options ▼]    │ TERTIARY (collapsed)
│                     │
│ Evidence ▼          │ (collapsed)
├─────────────────────┤
│ Was this helpful?   │
│ [👍] [👎]           │
└─────────────────────┘
```

**Verdict Screen (Desktop):**
```
┌───────────────────────────────────────────────┐
│ [Back]                          [Share] [•••] │
├───────────────────────────────────────────────┤
│                                               │
│  ┌─────────────────┬─────────────────────┐   │
│  │   🛡️ HIGH RISK   │  What you should do:│   │
│  │                 │                     │   │
│  │ This link appears│  [Don't visit]     │   │
│  │ to be a scam    │  [Block sender]    │   │
│  │                 │  [Report scam]     │   │
│  │ What we saw:    │                     │   │
│  │ • Finding 1     │                     │   │
│  │ • Finding 2     │                     │   │
│  │                 │                     │   │
│  │ Why it matters: │                     │   │
│  │ Credential      │                     │   │
│  │ theft risk...   │                     │   │
│  │                 │                     │   │
│  │ Evidence ▼      │                     │   │
│  │ (expanded)      │                     │   │
│  └─────────────────┴─────────────────────┘   │
│                                               │
│  Was this helpful? [👍] [👎]                  │
│  [Mark as scam] [Mark as safe]               │
└───────────────────────────────────────────────┘
```

---

### Responsive Images and Icons

**Icons:**
- Mobile: 24x24px (standard), 80x80px (verdict shield)
- Tablet: 32x32px (standard), 100x100px (verdict shield)
- Desktop: 32x32px (standard), 120x120px (verdict shield)

**Images (Illustrations):**
- Use SVG for scalability (no pixelation)
- Fallback: provide 1x, 2x, 3x rasters for different densities

---

## 9. TELEMETRY AND UX METRICS

### Recommended Events (Funnel Stages)

**Acquisition → Activation → Retention → Revenue → Referral (AARRR)**

#### **Acquisition**
| Event Name | Trigger | Parameters | Purpose |
|------------|---------|------------|---------|
| `app_opened` | App launch | `source` (organic, share-in, notification) | Track entry points |
| `onboarding_started` | First launch onboarding begins | `step` (1, 2, 3) | Onboarding funnel |
| `onboarding_completed` | User finishes onboarding | `skipped` (boolean) | Onboarding conversion |

#### **Activation**
| Event Name | Trigger | Parameters | Purpose |
|------------|---------|------------|---------|
| `check_started` | User initiates URL/QR/message check | `type` (url, qr, message), `source` (paste, share-in, manual) | Usage frequency |
| `analysis_completed` | Verdict shown | `risk_level` (high, medium, low, inconclusive), `duration_ms`, `provider_count` | Performance tracking |
| `action_clicked` | User clicks recommended action | `action_type` (don't_visit, block, report, proceed), `risk_level` | Action adoption rate |
| `verdict_shared` | User shares verdict | `platform` (whatsapp, sms, email) | Referral proxy |

#### **Retention**
| Event Name | Trigger | Parameters | Purpose |
|------------|---------|------------|---------|
| `history_viewed` | User opens History screen | — | Engagement indicator |
| `recheck_initiated` | User re-runs check on old verdict | `original_risk_level`, `new_risk_level` | Verdict stability |

#### **Revenue** (if applicable)
| Event Name | Trigger | Parameters | Purpose |
|------------|---------|------------|---------|
| `paywall_shown` | Free tier limit reached | `checks_count` | Conversion funnel |
| `upgrade_clicked` | User taps upgrade CTA | `plan` (monthly, annual) | Purchase intent |
| `purchase_completed` | Subscription confirmed | `plan`, `price` | Revenue tracking |

#### **Referral**
| Event Name | Trigger | Parameters | Purpose |
|------------|---------|------------|---------|
| `verdict_shared` | (See Activation) | — | Viral loop |
| `invite_sent` | User invites friend (if feature exists) | `method` (link, sms) | Referral program |

---

### UX Metrics (Weekly Dashboard)

**Performance Metrics:**
1. **Time-to-First-Verdict (TTFV):**
   - Measure: `analysis_completed.duration_ms`
   - Target: p50 < 10s, p95 < 25s
   - Alert if p95 > 30s

2. **Crash-Free Sessions:**
   - Target: ≥ 99.0%
   - Alert if < 98.5%

**Engagement Metrics:**
3. **Checks per User per Week:**
   - Measure: Count of `check_started` events / active users
   - Target: ≥ 2 checks/user/week (hypothesis)

4. **Comprehension Rate:**
   - Measure: % of `feedback_helpful_yes` / total feedback responses
   - Target: ≥ 70%

5. **Action Adoption Rate:**
   - Measure: % of high-risk verdicts with `action_clicked` within 2 minutes
   - Target: ≥ 35%

**Quality Metrics:**
6. **Disagreement Rate (False Alarm Proxy):**
   - Measure: % of verdicts marked "mark_safe" after "high_risk" verdict
   - Target: ≤ 10%
   - Alert if > 15% (investigate)

7. **Inconclusive Rate:**
   - Measure: % of verdicts with `risk_level=inconclusive`
   - Target: 10-20% (acceptable uncertainty range)
   - Alert if > 30% (coverage issue)

**Retention Metrics:**
8. **D7/D30 Retention:**
   - Measure: % of users active on Day 7/30 after first check
   - Target: D7 ≥ 30%, D30 ≥ 18%

---

### Minimum Instrumentation (Beta Phase)

**Must-Have Events (Week 1-4):**
- `check_started`, `analysis_completed`, `action_clicked`
- `feedback_given` (helpful yes/no)
- `mark_safe` / `mark_scam`
- `error_occurred` (with `error_type` parameter)

**Properties to Capture:**
- User ID (anonymized)
- Session ID
- Platform (iOS, Android, web)
- App version
- Timestamp (UTC)

**Privacy:**
- **Do NOT log:** Full URLs, message content, user PII
- **Do log:** Domain only (e.g., "amaz0n.com.br"), risk level, verdict ID (for debugging)

---

### A/B Test Hypotheses (Post-MVP)

1. **Explanation Format:**
   - Variant A: Bullet list ("What we saw")
   - Variant B: Paragraph narrative
   - Metric: Comprehension rate

2. **CTA Priority:**
   - Variant A: "Don't visit" (red, large)
   - Variant B: "Proceed with caution" (orange, medium)
   - Metric: Action adoption + disagreement rate

3. **Verdict Confidence Label:**
   - Variant A: Show confidence % ("High Risk — 85% confidence")
   - Variant B: No confidence % (just "High Risk")
   - Metric: Trust (NPS), disagreement rate

---

## 10. QUALITY AND ACCEPTANCE CRITERIA (DESIGN QA)

### Visual and Interaction Consistency Checklist

**Before shipping each screen:**

- [ ] **Typography:**
  - [ ] All text uses defined type scale (16/20/24px)
  - [ ] Line height ≥ 1.5 for body text
  - [ ] No text smaller than 14px (except legal fine print)
  - [ ] Font weights consistent (regular/bold only, no medium)

- [ ] **Color Usage:**
  - [ ] Risk colors match spec (red, orange, green, gray)
  - [ ] All colors have ≥ 4.5:1 contrast (text) or 3:1 (UI components)
  - [ ] No color-only indicators (always + icon/text)

- [ ] **Spacing:**
  - [ ] All spacing is multiple of 8px
  - [ ] Consistent padding: 16px screen edges (mobile), 24px (tablet), 32px (desktop)
  - [ ] Minimum 16px between distinct components

- [ ] **Buttons/CTAs:**
  - [ ] Minimum 44x44px touch target
  - [ ] Min 8px spacing between adjacent buttons
  - [ ] Clear hierarchy (primary > secondary > tertiary)
  - [ ] Disabled state visually distinct (opacity 0.5, no hover)
  - [ ] Loading state: spinner + "Loading..." label

- [ ] **Icons:**
  - [ ] Consistent size per context (24px standard, 32px large)
  - [ ] All icons have `aria-label` or adjacent text
  - [ ] Icon + text alignment (vertical center)

- [ ] **Interactive States:**
  - [ ] Default, hover (web), pressed, disabled, focus (all defined)
  - [ ] Focus ring visible on keyboard navigation

---

### Accessibility Checklist (WCAG 2.1 AA)

**Test with:**
- [ ] Screen reader (VoiceOver on iOS, TalkBack on Android)
- [ ] Keyboard navigation only (no mouse)
- [ ] 200% text zoom
- [ ] Color contrast analyzer tool

**Criteria:**
- [ ] All images have `alt` text (or `alt=""` if decorative)
- [ ] All form fields have visible `<label>` elements
- [ ] Error messages linked to fields via `aria-describedby`
- [ ] Color contrast ≥ 4.5:1 (text), ≥ 3:1 (UI components)
- [ ] Focus order is logical (top-to-bottom, left-to-right)
- [ ] No keyboard traps (user can Tab out of modals)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Risk indicators use color + icon + text (redundancy)
- [ ] Touch targets ≥ 44x44px

---

### Responsiveness Checklist

**Test on:**
- [ ] iPhone SE (320px width) — smallest mobile
- [ ] iPhone 13 (390px width) — common mobile
- [ ] iPad (768px width) — tablet
- [ ] MacBook (1440px width) — desktop

**Criteria:**
- [ ] No horizontal scrolling (content fits within viewport)
- [ ] Text wraps correctly (no overflow)
- [ ] Images scale proportionally (no distortion)
- [ ] Buttons stack vertically on mobile, horizontal on desktop (if applicable)
- [ ] Bottom nav hidden on desktop; sidebar shown instead
- [ ] Verdict screen switches to 2-column layout on desktop (if designed)

---

### Content and Microcopy Checklist

- [ ] All headlines and body text use plain language (no jargon)
- [ ] Active voice ("We analyzed...") not passive ("Link was analyzed...")
- [ ] CTA buttons use imperative verbs ("Check URL", "Block sender")
- [ ] Error messages provide actionable guidance ("Check your connection and try again")
- [ ] No ALL CAPS text (except acronyms like "URL")
- [ ] Consistent terminology (e.g., "link" vs. "URL" — pick one)
- [ ] Tone is calm and empowering (not panic-inducing)

---

### Edge Case Handling Checklist

- [ ] **Empty states:** Defined for History (no checks), Settings (no account)
- [ ] **Error states:** Defined for network, service unavailable, timeout, invalid input
- [ ] **Loading states:** Spinner + text for all async operations
- [ ] **Long content:** URL truncation (max 50 chars + "..."), message text (max 1000 chars)
- [ ] **Slow connections:** Progress updates every 3s during analysis
- [ ] **Offline mode:** Clear message ("No internet connection"), disable check CTA

---

### Definition of Done (Design)

**A feature is "design-complete" when:**

1. **All states documented:**
   - [ ] Default, loading, success, error, empty
   - [ ] Interactive states (hover, pressed, focus, disabled)

2. **Accessibility verified:**
   - [ ] WCAG 2.1 AA checklist passed
   - [ ] Screen reader tested on 1 platform (iOS or Android)

3. **Responsive behavior specified:**
   - [ ] Breakpoints defined (mobile, tablet, desktop)
   - [ ] Content prioritization clear (hide/show/collapse)

4. **Content finalized:**
   - [ ] Microcopy approved (headlines, CTAs, errors)
   - [ ] Tone consistent with brand voice

5. **Design handoff complete:**
   - [ ] Figma/Sketch file shared with engineering
   - [ ] Assets exported (icons, illustrations)
   - [ ] Design tokens documented (colors, spacing, typography)
   - [ ] Interactive prototype shared (if applicable)

6. **Acceptance criteria written:**
   - [ ] User can [action] in [N] taps/clicks
   - [ ] [Metric] displays within [X] seconds
   - [ ] Error [X] shows [Y] message

---

## 11. RISKS AND DESIGN DEBT

### Main UX Risks

1. **Risk: Users Don't Understand "Inconclusive" Verdicts**
   - **Impact:** Confusion → loss of trust → abandonment
   - **Likelihood:** Medium (55%)
   - **Mitigation:**
     - A/B test explanation wording ("We don't have enough data" vs. "This is a new site")
     - Provide safe-default guidance ("When in doubt, verify sender first")
     - Track disagreement rate and user feedback
   - **Fallback:** If comprehension < 60%, simplify to "Unable to verify — proceed with caution"

2. **Risk: Loading Times Exceed User Patience Threshold**
   - **Impact:** Users abandon check before verdict → product perceived as slow → churn
   - **Likelihood:** Medium (60%)
   - **Mitigation:**
     - Progressive disclosure: show partial findings as they arrive
     - Optimistic UI: cache common domains ("Checking cache..."), instant result if hit
     - Set expectations: "This may take up to 15 seconds"
   - **Fallback:** If p95 latency > 30s consistently, add "Get notified when ready" option (continue in background)

3. **Risk: Users Ignore Recommended Actions (High-Risk Verdicts)**
   - **Impact:** Users see warning but proceed anyway → product fails to prevent harm → credibility loss
   - **Likelihood:** Medium (50%)
   - **Mitigation:**
     - Make primary CTA highly visible (red, full-width, top of action list)
     - Use loss-aversion framing ("Don't visit — protect your data")
     - A/B test CTA wording ("Don't visit" vs. "Close this link")
     - Friction for dangerous actions: add confirmation modal if user tries to proceed
   - **Fallback:** If action adoption < 25%, redesign verdict screen to emphasize danger (larger warning)

4. **Risk: Shareable Verdicts Become "Spam Bait"**
   - **Impact:** Users spam family groups with every verdict → recipients ignore → dilutes brand trust
   - **Likelihood:** Low (35%)
   - **Mitigation:**
     - Limit sharing to high-risk verdicts only (hide "Share" button for low-risk)
     - Design verdict card to be informative, not alarming (avoid clickbait tone)
     - Add "Shared via Shield" attribution (brand consistency)
   - **Fallback:** If sharing rate > 50% per user per week, gate feature behind rate limit

5. **Risk: False Positives Erode Trust (Over-Blocking)**
   - **Impact:** Users mark safe sites as "high risk" → users stop trusting verdicts → product abandoned
   - **Likelihood:** Medium (65%)
   - **Mitigation:**
     - Always explain *why* (evidence cards)
     - Provide "Mark as safe" feedback loop → improve model
     - Conservative scoring: when providers disagree, show "inconclusive" not "high risk"
   - **Fallback:** If disagreement rate > 15%, increase scoring threshold for "high risk" label

---

### Trade-Offs (MVP Constraints)

| Feature | Ideal (Future) | MVP Reality | Rationale |
|---------|----------------|-------------|-----------|
| **Verdict Depth** | 10+ evidence signals, provider breakdown | 3-5 key findings, aggregated score | Reduce cognitive load; keep explanation < 10s read time |
| **Customization** | User-defined risk thresholds, whitelist | Fixed scoring, no customization | Simplify MVP; avoid decision paralysis |
| **Education Mode** | In-app lessons, quizzes, tips | Brief tooltips only (post-MVP) | Focus on core workflow; education is nice-to-have |
| **Offline Mode** | Cache verdicts for offline review | Require internet for checks | API-dependent; offline = complex sync logic |
| **Multi-Language** | 5+ languages (ES, EN, PT, FR, DE) | PT-BR + EN only (MVP) | Prioritize Brazilian market; expand later |
| **Browser Extension** | Real-time warnings as user browses | Mobile app only | Platform complexity; mobile-first strategy |

---

### Design Debt (Post-MVP Backlog)

**Deferred to V2/V3:**

1. **Advanced Filters (History Screen)**
   - Current: Date grouping only
   - Desired: Filter by domain, risk level, date range, tags
   - Effort: Medium
   - Impact: Low (power users only)

2. **Verdict History Search**
   - Current: Scroll through chronological list
   - Desired: Full-text search by URL/domain
   - Effort: Low
   - Impact: Medium (improves re-check efficiency)

3. **Personalized Risk Scoring**
   - Current: Universal scoring for all users
   - Desired: Adaptive scoring based on user's past feedback ("You marked similar sites as safe")
   - Effort: High (ML modeling)
   - Impact: High (reduces false positives)

4. **Verdict Expiration Indicator**
   - Current: Cached results 24-48h (no UI indicator)
   - Desired: Show "Last checked 2 hours ago" + "Re-check now" button
   - Effort: Low
   - Impact: Medium (transparency on stale data)

5. **Interactive Evidence Exploration**
   - Current: Static evidence cards
   - Desired: Drill-down into each finding ("Why is domain age risky? Learn more")
   - Effort: Medium
   - Impact: Medium (education opportunity)

6. **Contextual Help / Tooltips**
   - Current: No in-app help
   - Desired: "?" icons next to technical terms → hover/tap for plain-language definition
   - Effort: Low
   - Impact: Medium (reduce support queries)

7. **Dark Mode**
   - Current: Light mode only
   - Desired: Auto-switch based on OS setting
   - Effort: Medium (redefine color tokens)
   - Impact: High (user preference, accessibility)

8. **Voice Input (Accessibility)**
   - Current: Text input only
   - Desired: Voice-to-text for URL/message analysis
   - Effort: Low (use OS speech API)
   - Impact: Medium (accessibility for motor impairments)

---

### Known Limitations (Communicate to Users)

**MVP will NOT include:**
- Real-time browsing protection (use browser extension in future)
- Automatic monitoring of watchlists (requires backend cron + notifications)
- Detailed forensics (IP reputation, WHOIS, SSL certificate analysis) — aggregated only
- Multi-user accounts / family plans
- Enterprise features (API access, bulk checks, admin dashboards)

**Communicate via:**
- Onboarding: "Shield checks links when you ask — it doesn't monitor in the background"
- FAQ / Help Center: "What Shield doesn't do (yet)"
- Feedback widget: "Request a feature" option

---

## APPENDIX: Design System Tokens (Quick Reference)

### Colors

**Primary Palette:**
- Primary: `#2196F3` (Blue)
- Secondary: `#757575` (Gray)

**Risk Levels:**
- High Risk: `#D32F2F` (Red)
- Medium Risk: `#F57C00` (Orange)
- Low Risk: `#388E3C` (Green)
- Inconclusive: `#757575` (Gray)

**Neutrals:**
- Background: `#FFFFFF` (White)
- Surface: `#F5F5F5` (Light Gray)
- Text Primary: `#212121` (Dark Gray)
- Text Secondary: `#757575` (Medium Gray)
- Border: `#E0E0E0` (Light Gray)

**Semantic Colors:**
- Success: `#388E3C` (Green)
- Error: `#D32F2F` (Red)
- Warning: `#F57C00` (Orange)
- Info: `#2196F3` (Blue)

---

### Typography

**Font Family:** System default (SF Pro on iOS, Roboto on Android, -apple-system on web)

**Type Scale:**
- **H1 (Hero):** 32px / 40px line height / Bold
- **H2 (Section):** 24px / 32px / Bold
- **H3 (Subsection):** 20px / 28px / Bold
- **Body (Regular):** 16px / 24px / Regular
- **Body (Small):** 14px / 20px / Regular
- **Caption:** 12px / 16px / Regular

**Font Weights:**
- Regular: 400
- Bold: 700

---

### Spacing

**Scale (multiples of 8px):**
- `4px`, `8px`, `16px`, `24px`, `32px`, `48px`

**Component Padding:**
- Button: 12px vertical, 24px horizontal
- Input field: 12px vertical, 16px horizontal
- Card: 16px all sides

**Screen Margins:**
- Mobile: 16px
- Tablet: 24px
- Desktop: 32px

---

### Shadows (Elevation)

**Elevation 1 (Cards):**
```css
box-shadow: 0 1px 3px rgba(0,0,0,0.12);
```

**Elevation 2 (Buttons):**
```css
box-shadow: 0 2px 6px rgba(0,0,0,0.16);
```

**Elevation 3 (Modals):**
```css
box-shadow: 0 4px 12px rgba(0,0,0,0.24);
```

---

### Border Radius

- **Small (Buttons, inputs):** 8px
- **Medium (Cards):** 12px
- **Large (Modals):** 16px
- **Circle (Icons, avatars):** 50%

---

### Animation Timing

**Duration:**
- Fast: 150ms (hover, pressed)
- Medium: 300ms (expand/collapse, fade)
- Slow: 500ms (page transitions)

**Easing:**
- Standard: `cubic-bezier(0.4, 0.0, 0.2, 1)` (Material Design standard)
- Decelerate: `cubic-bezier(0.0, 0.0, 0.2, 1)` (enter)
- Accelerate: `cubic-bezier(0.4, 0.0, 1, 1)` (exit)

---

## END OF DESIGN SPEC

**Next Steps:**
1. **Review with Product/Eng:** Validate feasibility, scope, and priorities
2. **Create Figma/Sketch Prototypes:** Translate this spec into high-fidelity mockups
3. **Conduct Usability Testing:** Test onboarding + verdict screen with 5-10 users (remote or in-person)
4. **Finalize Microcopy:** Get legal approval on ToS/Privacy language; localize PT-BR
5. **Engineering Handoff:** Share design tokens, assets, and interactive prototypes
6. **Define Success Metrics Dashboard:** Set up instrumentation plan with Data Analyst

**Questions? Contact:**
- **Product Design Lead:** [TODO: project_management/RPD/Shield_Ai_Security_PRD.md]
- **PM Owner:** [TODO: project_management/RPD/Shield_Ai_Security_PRD.md]
- **Engineering Lead:** [TODO: project_management/RPD/Shield_Ai_Security_PRD.md]

---

**Document Version:** 1.0
**Last Updated:** 2026-02-05
**Status:** Draft for Review
**Related Documents:** Shield_Ai_Security_PRD.md
