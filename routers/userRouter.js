import { Router } from "express";
import {
  register,
  login,
  logout,
  getUsers,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authHandler.js";
import User from "../models/User.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/", getUsers);

// Protected route to get user roster
userRouter.get("/roster", protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate("userRoster");
  res.status(200).json(user.userRoster);
});

export default userRouter;
