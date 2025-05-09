import { Router } from 'express';
import * as ctrl from '../controllers/agentController';

export const agentRouter = Router();
agentRouter.get('/', ctrl.getAgents);
agentRouter.post('/', ctrl.addAgent);
agentRouter.patch('/:id', ctrl.patchAgent);
agentRouter.delete('/:id', ctrl.removeAgent);