import { DataTypes, Model, Sequelize } from 'sequelize';

export interface FeedbackAttributes {
  id?: string;
  agentId: string;
  rating: number;
  comment?: string;
  callId?: string;
}

export class Feedback extends Model<FeedbackAttributes> implements FeedbackAttributes {
  public id!: string;
  public agentId!: string;
  public rating!: number;
  public comment?: string;
  public callId?: string;
}

export const initFeedback = (sequelize: Sequelize) => {
  Feedback.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    agentId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    },
    comment: DataTypes.TEXT,
    callId: DataTypes.STRING
  }, {
    tableName: 'feedback',
    sequelize,
    timestamps: true
  });
};
