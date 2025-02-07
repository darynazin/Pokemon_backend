import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addPokemonToUser,
  deletePokemonFromUser
} from "../controllers/users.js";

const userRouter = Router();

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
userRouter
  .route("/:id/roster/:pokemonId")
  .post(addPokemonToUser)
  .delete(deletePokemonFromUser);
export default userRouter;
