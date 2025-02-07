import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate("roster.pokeId");
  res.status(200).json(users);
});

export const createUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new ErrorResponse("username and password are required", 400);

  const user = await User.create({ username, password, rooster: [] });
  res.status(201).json(user);
});

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new ErrorResponse("User not found", 404);
  res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const { id } = req.params;

  if (!username || !password)
    throw new ErrorResponse("Username and password are required", 400);

  const user = await User.findByIdAndUpdate(
    id,
    { username, password },
    { new: true }
  );
  if (!user) throw new ErrorResponse("User not found", 404);

  res.status(200).json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ErrorResponse("User not found", 404);
  res.status(200).json({ message: "User deleted" });
});

export const addPokemonToUser = asyncHandler(async (req, res) => {
  const { id, pokemonId } = req.params;
  console.log(id, pokemonId)

  if (!pokemonId) throw new ErrorResponse("Pokemon Id is required", 400);

  const user = await User.findById(id);
  if (!user) throw new ErrorResponse("User not found", 404);
    const found = user.roster.find((id) => id == pokemonId);
  if (found) throw new ErrorResponse("Pokemon already added", 400);

  user.roster.push( pokemonId );
  await user.save();

  res.status(201).json({
    message: "Pokemon added successfully!",
    user,
  });
});

export const deletePokemonFromUser = asyncHandler(async (req, res) => {
  const { id, pokemonId } = req.params;
  const user = await User.findById(id);
  if (!user) throw new ErrorResponse("User not found", 404);

  const index = user.roster.findIndex((id) => id == pokemonId);
  if (index === -1) throw new ErrorResponse("Pokemon not found", 404);

  user.roster.splice(index, 1);
  await user.save();

  res.status(201).json({
    message: "Pokemon deleted successfully!",
    user,
  });
});
