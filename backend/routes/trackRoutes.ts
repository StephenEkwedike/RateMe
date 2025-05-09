import { Router } from 'express';
import { trackClick } from '../controllers/trackController';

export const trackRouter = Router();
// Customer clicks the feedback link, which logs click and redirects
trackRouter.get('/click/:id', trackClick);