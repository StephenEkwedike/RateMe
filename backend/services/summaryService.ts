import { Op } from 'sequelize';
import { db } from '../database';
import { aiSummarize } from '../utils/aiSummarize';

export async function generateWeeklySummary(agentId?: string) {
  const since = new Date();
  since.setDate(since.getDate() - 7);

  const where: any = { createdAt: { [Op.gte]: since } };
  if (agentId) where.agentId = agentId;

  const feedback = await db.Feedback.findAll({ where, attributes: ['comment'], raw: true });
  const lines = feedback.map(f => f.comment).filter(Boolean) as string[];
  if (!lines.length) return 'No comments for summary.';
  return aiSummarize(lines);
}
