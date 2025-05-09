import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import { smsRouter } from './routes/smsRoutes';
import { feedbackRouter } from './routes/feedbackRoutes';
import { agentRouter } from './routes/agentRoutes';
import { metrics } from './routes/metrics';
import { summaryRouter } from './routes/summaryRoutes';
import { trackRouter } from './routes/trackRoutes';
import { cronRouter } from './routes/cronRoutes';
import { businessRouter } from './routes/businessRoutes';
import { voipRouter } from './routes/voipRoutes';
import { invites } from './routes/invites';
import { clerkAuth, requireUser } from './auth';

export const app = express();
// Enable CORS for the front-end application
// Allow the Next.js dev server (default http://localhost:3000)
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: frontendOrigin, credentials: true }));
app.use(bodyParser.json());

// Liveness probe
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// All /api routes are protected by Clerk (authenticate user)
const apiRouter = express.Router();
apiRouter.use(clerkAuth, requireUser);
apiRouter.use('/sms', smsRouter);
apiRouter.use('/track', trackRouter);
apiRouter.use('/feedback', feedbackRouter);
apiRouter.use('/metrics', metrics);
apiRouter.use('/summaries', summaryRouter);
apiRouter.use('/agents', agentRouter);
apiRouter.use('/voip', voipRouter);
apiRouter.use('/businesses', businessRouter);
apiRouter.use('/cron', cronRouter);
apiRouter.use('/invites', invites);
app.use('/api', apiRouter);
