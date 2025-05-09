import 'express';
declare module 'express-serve-static-core' {
  interface Request {
    /** Populated by ClerkExpressWithAuth middleware */
    auth?: any;
    user?: { userId: string; businessId: string; role: string };
    business?: any;
  }
}
