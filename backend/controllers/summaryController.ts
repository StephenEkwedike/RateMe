import { RequestHandler } from 'express';
import { generateWeeklySummary } from '../services/summaryService';

export const getSummary: RequestHandler = async (req, res) => {
  try {
    const summary = await generateWeeklySummary(req.query.agentId as string);
    res.json({ summary });
  } catch (e) {
    res.status(500).json({ error: 'summary failed' });
  }
}
