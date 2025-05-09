import { Router } from 'express';
import { triggerSMS } from '../controllers/smsController';
import { apiKeyAuth } from '../middleware/apiKeyAuth';
import { smsLimiter } from '../middleware/smsLimiter';

export const smsRouter = Router();
// Protect with API key and rate limit per business plan


/**
 * Machine-to-machine endpoint.
 * Businesses call this manually if their VOIP can’t fire a webhook.
 * Required headers:
 *    x-api-key:   <business.apiKey>
 *
 * Body JSON:
 *    {
 *      "customerPhone": "+15551234567",
 *      "agentId": "UUID-or-string",
 *      "callId": "optional-call-id"
 *    }
 */

smsRouter.post('/trigger', apiKeyAuth, smsLimiter, triggerSMS);
