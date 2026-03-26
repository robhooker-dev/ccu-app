<<<<<<< HEAD
# 🛡️ SHIELD REPORT
### Anonymous Two-Way Reporting System — Counter Corruption Unit (CCU)

---

## Overview

Shield Report is a secure, anonymous reporting platform built for Counter Corruption Units. It enables members of the public or police personnel to submit sensitive reports without revealing their identity, and allows CCU officers to review, triage, and respond to those reports through a two-way anonymous messaging system.

This repository contains the **frontend prototype** built in React. It is intended as a proof-of-concept and UX demonstration. A production deployment requires a backend, database, and security infrastructure outlined in the Technical Proposal document.

---

## Features

- Anonymous report submission with unique token-based identity system
- AI-powered risk triage (CRITICAL / HIGH / MEDIUM / LOW) using Claude API
- Two-way anonymous messaging between reporter and CCU officer
- CCU officer dashboard with status management and filtering
- Broadcast system — CCU can push general updates to opted-in reporters
- Offline draft saving (session-based)
- Multi-language support: English, Spanish, French, Polish, Urdu

---

## Demo Credentials

| Role | Access |
|------|--------|
| CCU Officer | Password: `CCU2024` |
| Reporter Inbox | Token: `RPT-7823-XKQP` |

---

## Tech Stack (Prototype)

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 |
| Styling | Inline CSS with CSS variables |
| AI Triage | Anthropic Claude API (claude-sonnet-4) |
| State | React useState (in-memory only) |
| Fonts | Barlow Condensed, Barlow, JetBrains Mono |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher — download from [nodejs.org](https://nodejs.org)
- A code editor — [VS Code](https://code.visualstudio.com) recommended

### Installation

```bash
# 1. Create a new React app
npx create-react-app ccu-app

# 2. Navigate into the folder
cd ccu-app

# 3. Copy ccu-report-app.jsx into the src folder

# 4. Replace the contents of src/App.js with:
```

```javascript
import CCUApp from './ccu-report-app';

function App() {
  return <CCUApp />;
}

export default App;
```

```bash
# 5. Start the development server
npm start
```

The app will open automatically at `http://localhost:3000`

---

## Project Structure

```
ccu-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js                  ← Entry point (edit this)
│   ├── ccu-report-app.jsx      ← Main application component
│   └── index.js
├── package.json
└── README.md
```

---

## How It Works

### Reporter Flow
1. Reporter visits the app and selects **Submit a Report**
2. They choose a category and describe the incident
3. On submission, the Claude API assesses the risk level automatically
4. A unique anonymous token is issued (e.g. `RPT-XXXX-XXXX`)
5. The reporter saves this token and uses it to access their inbox later
6. They can read CCU replies and send additional messages — all without revealing their identity

### CCU Officer Flow
1. Officer logs in with their access code
2. Dashboard displays all reports filtered by risk level and status
3. Officer can update report status (New → Under Review → Escalated → Closed)
4. Officer can send a reply directly to the anonymous reporter
5. Officer can broadcast a general update to all opted-in reporters

---

## AI Risk Triage

When a report is submitted, the app calls the Anthropic Claude API and returns:

- **Risk Level** — CRITICAL, HIGH, MEDIUM, or LOW
- **Risk Reason** — A one-sentence explanation
- **Urgency** — Immediate / Within 24h / Within 48h / Routine
- **Keywords** — Flagged terms from the report content

If the API is unavailable, the app falls back to a local keyword-based assessment.

> **Note:** The AI triage is an assistive tool only. All risk assessments should be reviewed and confirmed by a trained CCU officer.

---

## Important Limitations of This Prototype

This prototype is a **frontend demonstration only**. The following are not implemented and are required for any real-world deployment:

| Feature | Status | Required For Production |
|---------|--------|------------------------|
| Backend API | Not included | Node.js / Django / Go |
| Database | Not included | PostgreSQL on Azure |
| Real encryption | Not included | End-to-end encryption |
| Authentication | Demo only | MFA + hardware tokens |
| Anonymity | Not enforced | Tor / onion routing |
| Data persistence | Session only | Persistent database |
| Penetration testing | Not done | Mandatory before launch |

---

## Recommended Production Stack

| Layer | Recommended Technology |
|-------|----------------------|
| Frontend | React (this codebase) |
| Backend | Node.js + Express |
| Database | PostgreSQL via Supabase |
| Hosting | Azure UK South (data sovereignty) |
| Auth | Auth0 or Clerk with MFA |
| Encryption | Signal Protocol or equivalent |
| CI/CD | GitHub Actions |

---

## Security Considerations

Before this application handles any real reports it must undergo:

- Independent penetration testing
- Vulnerability assessment
- Anonymous user testing
- Legal review (Data Protection Act 2018 / UK GDPR)
- Consultation with Force IT security team
- Review against College of Policing APP on Covert Internet Investigations

Hosting must comply with UK Government security classifications. For police use, **Azure Government Cloud (UK South)** or an on-premise deployment is recommended.

---

## Roadmap

- [ ] Backend API (Node.js)
- [ ] PostgreSQL database integration
- [ ] Real anonymous token authentication
- [ ] End-to-end message encryption
- [ ] PDF export of reports
- [ ] Attachment / evidence upload
- [ ] Audit logging for CCU actions
- [ ] Email / SMS notification for CCU officers
- [ ] Progressive Web App (offline support)
- [ ] Accessibility audit (WCAG 2.1 AA)

---

## Author

Built as a prototype for the Counter Corruption Unit.  
Developed with assistance from Claude (Anthropic).

---

## Disclaimer

This software is a prototype for demonstration and planning purposes only. It must not be used to handle real intelligence, personal data, or live reports until a full security review, penetration test, and legal compliance assessment has been completed.
=======
# work-projects
Work based solutions
>>>>>>> 84a067fb76139c6e882ca435dec4a46c3f625045
