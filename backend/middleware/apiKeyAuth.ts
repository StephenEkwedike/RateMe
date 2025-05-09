import { RequestHandler } from 'express';
import { Business } from '../database';

// Augment Request to include business
declare global {
  namespace Express {
    interface Request {
      business?: any;
    }
  }
}

export const apiKeyAuth: RequestHandler = async (req, res, next) => {
  const key = req.headers['x-api-key'] as string;
  if (!key) return res.status(401).json({ error: 'missing api key' });

  const biz = await Business.findOne({ where: { apiKey: key } });
  if (!biz) return res.status(403).json({ error: 'bad api key' });

  req.business = biz;
  next();
};