import { RequestHandler } from 'express';
import { submitFeedback } from '../services/feedbackService';
import { markCompleted } from '../services/smsLogService';

export const postFeedback: RequestHandler = async (req, res) => {
  try {
    const { logId } = req.body;
    const saved = await submitFeedback(req.body);
    if (logId) await markCompleted(logId);
    res.status(201).json({ data: saved });
  } catch (e) {
    res.status(500).json({ error: 'save failed' });
  }
}
