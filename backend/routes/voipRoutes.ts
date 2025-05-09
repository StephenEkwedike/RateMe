import { Router } from 'express';
import bodyParser from 'body-parser';
import { twilioCallEnded } from '../controllers/voipWebhookController';

export const voipRouter = Router();
// Twilio sends application/x-www-form-urlencoded for Voice webhooks
voipRouter.post(
  '/twilio',
  bodyParser.urlencoded({ extended: false }),
  twilioCallEnded
);