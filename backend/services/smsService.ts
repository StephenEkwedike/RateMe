import { twilioClient } from '../utils/twilioClient';
import { createLog } from './smsLogService';

export async function sendFeedbackSMS(
  businessId: string,
  customerPhone: string,
  agentId: string,
  callId: string
) {
  const log = await createLog({ businessId, agentId, customerPhone, callId });
  const link = `${process.env.FRONTEND_FEEDBACK_URL}/${agentId}?callId=${callId}&logId=${log.id}`;
  const { sid } = await twilioClient.messages.create({
    body: `Thanks for your call! Rate us: ${link}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: customerPhone
  });
  return { sid, logId: log.id };
}
