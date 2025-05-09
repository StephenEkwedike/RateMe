# RateMe.com – Monorepo (MVP)

## Backend (Node + Express + TypeScript)

```bash
cd backend
npm install          # installs dependencies
cp .env.example .env # fill in DB, Twilio, OpenAI keys; add JWT_SECRET=super-secret
npm run dev          # ts-node server.ts (port 5001)
```

Endpoints:

- `POST /api/sms/trigger` – body `customerPhone, agentId, callId`
- `POST /api/feedback/submit` – body `agentId, rating, comment?, callId?`
- `GET  /api/summaries?agentId=` – weekly AI summary

## Frontend

A Next.js skeleton can live in `frontend/`.  
For now set up:

```bash
cd frontend
npx create-next-app@latest .
npm run dev # localhost:3000
```

Ensure `.env.local` contains:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Dev Workflow

- Keep two terminals (backend on 5000, Next.js on 3000).
- API requests from the UI use `NEXT_PUBLIC_API_URL`.

## Deployment (later)

- **Frontend**: Vercel
- **Backend** : Render / Railway (or Vercel serverless for light loads)
- **DB**      : Supabase / Neon (Postgres)

BACKEND FLOW:
📞 Call ends (Twilio Voice) ─▶ POST /api/voip/twilio  (validated via sig)
                              └─▶ sendFeedbackSMS()  (auto)

Customer clicks link ─▶ frontend /feedback/[agentId]?callId=… ─▶
  submits POST /api/feedback/submit ─▶ stored in DB

Admins (JWT) ─▶ dashboard
  • GET /api/agents   (list reps)
  • GET /api/summaries (AI weekly summary)
  • Metrics endpoint will compute “total SMS sent vs forms completed”

Nightly / weekly CRON ─▶ summaryService.generateWeeklySummary ─▶
  store / email digest


🗂️ Backend — Remaining Non-Code Tasks (MVP)
objectivec
Copy
Edit
backend/
└── .env            ← fill *real* values
    ├─ DATABASE_URL             = postgres://…
    ├─ TWILIO_ACCOUNT_SID       = ACxxxxxxxx
    ├─ TWILIO_AUTH_TOKEN        = xxxxxxxxx
    ├─ TWILIO_PHONE_NUMBER      = +1…
    ├─ FRONTEND_FEEDBACK_URL            = https://rateme.com/feedback
    ├─ FRONTEND_FEEDBACK_URL_REDIRECT   = https://rateme.com/feedback
    ├─ CLERK_SECRET_KEY         = sk_live_…
    ├─ CRON_TOKEN               = super-secret-cron
    └─ PORT                     = 5001

Item to finish	Action
🗹 Vercel Cron	Add daily job → POST /api/cron/summaries at 0 3 * * * with header x-cron-token.
🗹 DB migrations in prod	Run sequelize.sync() once or ship migrations.
🗹 Twilio number purchase / Messaging Service ID	Configure number in Twilio console.
🗹 Clerk JWT template	Add businessId, role to Clerk → JWT templates.
🗹 ENV values in Vercel / Render	Copy same keys above.
(STOP webhook skipped)	Compliance handled by Twilio auto-opt-out.
🗹 Legacy JWT removed	✔ (clean codebase & npm uninstall complete).
Backend MVP ✅ — only operational / dev-ops steps remain.