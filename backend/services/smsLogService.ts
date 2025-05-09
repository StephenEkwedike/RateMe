import { SmsLog } from '../database';

/**
 * Creates a new SMS log entry for tracking sent, clicked, and completed events.
 */
export const createLog = (data: {
  businessId: string;
  agentId: string;
  customerPhone: string;
  callId?: string;
}) => SmsLog.create(data);

/**
 * Marks an SMS log as clicked, setting clicked=true and recording timestamp.
 */
export const markClicked = (id: string) =>
  SmsLog.update(
    { clicked: true, clickedAt: new Date() },
    { where: { id } }
  );

/**
 * Marks an SMS log as completed, setting completed=true and recording timestamp.
 */
export const markCompleted = (id: string) =>
  SmsLog.update(
    { completed: true, completedAt: new Date() },
    { where: { id } }
  );