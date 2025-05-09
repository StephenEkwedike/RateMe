import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  logging: false
});

import { initFeedback, Feedback } from '../models/Feedback';
import { initAgent, Agent } from '../models/Agent';
import { initBusiness, Business } from '../models/Business';
// import user model removed (using Clerk managed auth)
import { initSmsLog, SmsLog } from '../models/SmsLog';

// Initialize models
initFeedback(sequelize);
initAgent(sequelize);
initBusiness(sequelize);
initSmsLog(sequelize);

export const db = { sequelize, Feedback, Agent, Business, SmsLog };

// Named exports for models
export { Feedback, Agent, Business, SmsLog };
// export { Feedback } from '../models/Feedback';
// export { Agent }    from '../models/Agent';
// export { Business } from '../models/Business';
// export { User }     from '../models/User';
