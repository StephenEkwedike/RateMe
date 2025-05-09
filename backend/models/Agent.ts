import { DataTypes, Model, Sequelize } from 'sequelize';

export interface AgentAttrs {
  id?: string;
  name: string;
  phone?: string;
  businessId: string;
}

export class Agent extends Model<AgentAttrs> implements AgentAttrs {
  id!: string;
  name!: string;
  phone?: string;
  businessId!: string;
}

export const initAgent = (sequelize: Sequelize) =>
  Agent.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      phone: DataTypes.STRING,
      businessId: { type: DataTypes.UUID, allowNull: false }
    },
    { tableName: 'agents', sequelize, timestamps: true }
  );