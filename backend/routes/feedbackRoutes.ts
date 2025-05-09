import { Router } from 'express';
import { postFeedback } from '../controllers/feedbackController';
export const feedbackRouter = Router();
feedbackRouter.post('/submit', postFeedback);
