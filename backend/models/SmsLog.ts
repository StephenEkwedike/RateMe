import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface SmsLogAttrs {
  id?: string;
  businessId: string;
  agentId: string;
  customerPhone: string;
  callId?: string;
  clicked: boolean;
  completed: boolean;
  sentAt?: Date;
  clickedAt?: Date;
  completedAt?: Date;
}
/**
 * Attributes needed to create a new SmsLog.
 * Fields with defaults (id, clicked, completed, sentAt, clickedAt, completedAt) are optional.
 */
export interface SmsLogCreationAttrs extends Optional<SmsLogAttrs, 'id' | 'clicked' | 'completed' | 'sentAt' | 'clickedAt' | 'completedAt'> {}

export class SmsLog extends Model<SmsLogAttrs, SmsLogCreationAttrs> implements SmsLogAttrs {
  public id!: string;
  public businessId!: string;
  public agentId!: string;
  public customerPhone!: string;
  public callId?: string;
  public clicked!: boolean;
  public completed!: boolean;
  public sentAt!: Date;
  public clickedAt?: Date;
  public completedAt?: Date;
}

export const initSmsLog = (sequelize: Sequelize) =>
  SmsLog.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      businessId: { type: DataTypes.UUID, allowNull: false },
      agentId: { type: DataTypes.UUID, allowNull: false },
      customerPhone: DataTypes.STRING,
      callId: DataTypes.STRING,
      clicked: { type: DataTypes.BOOLEAN, defaultValue: false },
      completed: { type: DataTypes.BOOLEAN, defaultValue: false },
      sentAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      clickedAt: DataTypes.DATE,
      completedAt: DataTypes.DATE
    },
    { sequelize, tableName: 'sms_log', timestamps: false }
  );