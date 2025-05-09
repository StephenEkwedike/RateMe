import { Router } from 'express';
import * as ctrl from '../controllers/businessController';

export const businessRouter = Router();

businessRouter.get('/', ctrl.list);
businessRouter.post('/', ctrl.create);
businessRouter.delete('/:id', ctrl.remove);