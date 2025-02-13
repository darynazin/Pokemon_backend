import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Leader from "../models/Leader.js";
import User from "../models/User.js";

export const getLeaders = asyncHandler(async (req, res) => {
  const scores = await Leader.find().sort({ score: -1 });
  res.status(200).json(scores);
});

export const addScore = asyncHandler(async (req, res) => {
  const { score } = req.body;
  const user = req.user;

  if (!user.id || score === undefined)
    throw new ErrorResponse("User and score are required", 400);
  
  let foundLeader = await Leader.findOne({ username: user.username });

  if (!foundLeader) {
    foundLeader = new Leader({ username: user.username, score: 0 });
    await foundLeader.save();

    return res.status(201).json({ message: "User added successfully", leader: foundLeader });
  }

  foundLeader.score += score;
  await foundLeader.save();

  foundUser.score += score;
  await foundUser.save();

  res.status(200).json({ message: "User updated successfully", leader: foundLeader });
});
