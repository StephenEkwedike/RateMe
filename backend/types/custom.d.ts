// Type declarations and module augmentations

// Allow importing 'cors' without types
declare module 'cors';

// Allow importing 'jsonwebtoken' without types
declare module 'jsonwebtoken';
// Allow importing 'express-rate-limit' without types
declare module 'express-rate-limit';

// Extend Express Request to include 'user' property
import 'express-serve-static-core';
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
    business?: any;
  }
}
// Stub Clerk Express SDK if types missing
declare module '@clerk/express' {
  import { RequestHandler } from 'express';
  export function requireAuth(): RequestHandler;
  export const clerkClient: {
    verifyToken(token: string): Promise<{ sub: string; claims: any }>;
  };
}