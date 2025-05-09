import { RequestHandler } from 'express';
import { markClicked } from '../services/smsLogService';

/**
 * Tracks a click event for an SMS log and redirects customer to feedback page.
 * GET /click/:id?agentId=<agent>&callId=<call>
 */
export const trackClick: RequestHandler = async (req, res) => {
  const logId = req.params.id;
  await markClicked(logId);
  const agentId = Array.isArray(req.query.agentId) ? req.query.agentId[0] : req.query.agentId;
  const callId = Array.isArray(req.query.callId) ? req.query.callId[0] : req.query.callId;
  const redirectUrl = `${process.env.FRONTEND_FEEDBACK_URL_REDIRECT}/${agentId}?callId=${callId}&logId=${logId}`;
  res.redirect(redirectUrl);
};