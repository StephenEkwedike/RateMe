import { RequestHandler } from 'express';
import { isValidTwilioRequest } from '../utils/validateTwilioSig';
import { Business } from '../database';
import { sendFeedbackSMS } from '../services/smsService';

/**
 * Handle Twilio Voice webhook on call completion: verify signature,
 * lookup Business by Twilio AccountSid, resolve or create Agent,
 * and send feedback SMS.
 */
export const twilioCallEnded: RequestHandler = async (req, res) => {
  // 1️⃣ Verify webhook signature
  if (!isValidTwilioRequest(req, process.env.TWILIO_AUTH_TOKEN as string)) {
    return res.status(403).end();
  }

  // Only act on completed calls
  if ((req.body as any).CallStatus !== 'completed') {
    return res.status(200).end();
  }

  const twilioSid = (req.body as any).AccountSid as string;
  const to = (req.body as any).To as string;
  const rep = ((req.body as any).FriendlyName as string) || 'unknown';
  const call = (req.body as any).CallSid as string;

  // 2️⃣ Map Twilio account → Business
  const biz = await Business.findOne({ where: { twilioAccountSid: twilioSid } });
  if (!biz) return res.status(404).end();

  // 3️⃣ Find/create agent record by rep identifier (name)
  // Note: requires Business.hasMany(Agent) association for .
  let agent: any;
  try {
    agent =
      (await (biz as any).getAgents({ where: { name: rep } }))[0] ||
      (await (biz as any).createAgent({ name: rep }));
  } catch {
    // fallback: create new agent without association
    const { Agent } = await import('../database');
    agent = await Agent.create({ name: rep, businessId: biz.id });
  }

  // 4️⃣ Send SMS (log entry created automatically)
  await sendFeedbackSMS(biz.id, to, agent.id, call);
  res.status(200).end();
};