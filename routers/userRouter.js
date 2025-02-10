import { Router } from "express";
import {
  register,
  login,
  logout,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addPokemonToUser,
  deletePokemonFromUser
} from "../controllers/userController.js";
import { protect } from "../middlewares/authHandler.js";
import User from "../models/User.js";

const userRouter = Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/").get(getUsers);

userRouter.route("/:id").get(protect, getUserById).put(protect, updateUser).delete(protect, deleteUser);
userRouter.route("/:id/roster/:pokemon").post(protect, addPokemonToUser).delete(protect, deletePokemonFromUser);

// Protected route to get user roster
userRouter.get("/roster", protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate("roster");
  res.status(200).json(user.roster);
});

export default userRouter;
