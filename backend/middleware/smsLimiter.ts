// @ts-ignore: express-rate-limit may not have TypeScript declarations
import rateLimit from 'express-rate-limit';

// Rate limiter for SMS endpoint, tiered by business plan
export const smsLimiter = rateLimit({
  windowMs: 60_000, // 1 minute
  max: (req: any) => (req.business?.plan === 'starter' ? 60 : 600),
  keyGenerator: (req: any) => req.business?.id || req.ip
});