import { Router } from 'express';

const leaderboardRouter = Router();

leaderboardRouter.route('/').get();

export default leaderboardRouter;