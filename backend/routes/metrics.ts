import { Router } from 'express';

// Metrics endpoints for the dashboard overview
export const metrics = Router();

/**
 * GET /api/metrics
 * Returns dashboard cards + trend + latest feedback stub (replace with real queries)
 */
metrics.get('/', async (_req, res) => {
  res.json({
    avgRating: 0,
    feedbackCount: 0,
    responseRate: 0,
    trend: [],
    latestFeedback: [],
  });
});