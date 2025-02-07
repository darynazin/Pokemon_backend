import { Router } from 'express';
import { getLeaders, addScore } from '../controllers/leaders.js';

const leadersdRouter = Router();

leadersdRouter.route('/').get(getLeaders).post(addScore);

export default leadersdRouter;