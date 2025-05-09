import { RequestHandler } from 'express';

/**
 * Simple cron auth: expects header x-cron-key to match env CRON_API_KEY
 */
export const cronAuth: RequestHandler = (req, res, next) => {
  const key = req.headers['x-cron-key'];
  if (typeof key !== 'string' || key !== process.env.CRON_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
};
