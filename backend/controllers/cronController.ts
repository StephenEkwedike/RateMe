import { RequestHandler } from 'express';
import { Business } from '../database';
import { generateWeeklySummary } from '../services/summaryService';

/**
 * Daily digest endpoint: generate and log weekly summary for each business.
 */
export const dailyDigest: RequestHandler = async (_req, res) => {
  const businesses = await Business.findAll();
  for (const biz of businesses) {
    const summary = await generateWeeklySummary();
    console.log(`[DailyDigest] ${biz.name}\n${summary}\n`);
    // TODO: email summary to biz.email
  }
  res.json({ processed: businesses.length });
};