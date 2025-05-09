import { Router } from 'express';

// Manual invite endpoints (e.g. dashboard manual send)
export const invites = Router();

/**
 * GET /api/invites
 * Returns historical invite records (stubbed)
 */
invites.get('/', async (_req, res) => {
  // TODO: fetch from database (e.g., SmsLog) filtered by business/user
  res.json([]);
});

/**
 * POST /api/invites
 * Creates a new manual invite (stubbed)
 */
invites.post('/', async (req, res) => {
  const { agentId, recipient, type } = req.body;
  // TODO: integrate with Twilio/SMS service and log entry
  const now = new Date().toISOString();
  res.status(201).json({
    id: now,
    agentId,
    recipient,
    type,
    sentAt: now,
    status: 'Delivered',
  });
});