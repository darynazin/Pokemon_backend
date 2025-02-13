import { Router } from 'express';
import { getLeaders, addScore } from '../controllers/leaders.js';
import { protect } from '../middlewares/authHandler.js';

const leadersdRouter = Router();

leadersdRouter.route('/').get(getLeaders).post(protect, addScore);

export default leadersdRouter;