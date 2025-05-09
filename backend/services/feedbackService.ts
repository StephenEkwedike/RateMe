import { Feedback } from '../database';

export async function submitFeedback(data: {
  agentId: string;
  rating: number;
  comment?: string;
  callId?: string;
}) {
  return Feedback.create(data);
}
