import { Router } from "express";
import { getLeaders, addScore, getScore } from "../controllers/leaders.js";
import { protect } from "../middlewares/authHandler.js";

const leadersdRouter = Router();

leadersdRouter.route("/").get(getLeaders).post(protect, addScore);

leadersdRouter.route("/score").post(protect, getScore);

export default leadersdRouter;
