import twilio from 'twilio';
import { Request } from 'express';

/**
 * Validate an incoming Twilio webhook request using its X-Twilio-Signature header.
 * @param req Express request object
 * @param authToken Twilio Auth Token for your account
 * @returns true if the request is valid
 */
export const isValidTwilioRequest = (
  req: Request,
  authToken: string
): boolean => {
  const signature = req.headers['x-twilio-signature'] as string;
  const url = `${process.env.BASE_URL}${req.originalUrl}`;
  return twilio.validateRequest(authToken, signature, url, req.body as any);
};