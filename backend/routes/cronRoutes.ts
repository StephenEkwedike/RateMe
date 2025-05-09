import { Router } from 'express';
import { dailyDigest } from '../controllers/cronController';
import { cronAuth } from '../middleware/cronAuth';

export const cronRouter = Router();
// Secured cron endpoint for triggering daily summaries
cronRouter.post('/summaries', cronAuth, dailyDigest);