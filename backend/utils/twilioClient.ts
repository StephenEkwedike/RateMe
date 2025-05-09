import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

export const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);
