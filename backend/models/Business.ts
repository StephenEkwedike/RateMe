import { DataTypes, Model, Sequelize } from 'sequelize';

export interface BusinessAttrs {
  id?: string;
  name: string;
  apiKey: string;
  twilioAccountSid?: string;
  plan?: 'starter' | 'growth' | 'scale';
}
export class Business extends Model<BusinessAttrs> implements BusinessAttrs {
  id!: string;
  name!: string;
  apiKey!: string;
  twilioAccountSid?: string;
  plan?: 'starter' | 'growth' | 'scale';
}

export const initBusiness = (sequelize: Sequelize) =>
  Business.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      apiKey: { type: DataTypes.STRING, allowNull: false, unique: true },
      twilioAccountSid: DataTypes.STRING,
      plan: { type: DataTypes.STRING, defaultValue: 'starter' }
    },
    { tableName: 'businesses', sequelize, timestamps: true }
  );