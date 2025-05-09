import { RequestHandler } from 'express';
import { sendFeedbackSMS } from '../services/smsService';

export const triggerSMS: RequestHandler = async (req, res) => {
  try {
    const { customerPhone, agentId, callId } = req.body;
    if (!customerPhone || !agentId || !callId) return res.status(400).json({ error: 'Missing' });
    const businessId = req.business.id;
    const { sid, logId } = await sendFeedbackSMS(businessId, customerPhone, agentId, callId);
    res.json({ sid, logId });
  } catch (e) {
    res.status(500).json({ error: 'sms failed' });
  }
}
