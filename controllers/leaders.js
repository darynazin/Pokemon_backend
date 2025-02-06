import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Leader from "../models/Leader.js";
import User from "../models/User.js";

export const getLeaders = asyncHandler(async (req, res) => {
  const scores = await Leader.find().sort({ score: -1 });
  res.status(200).json(scores);
});

export const addScore = asyncHandler(async (req, res) => {
  const { userId, score } = req.body;

  if (!userId || score === undefined)
    throw new ErrorResponse("userId and score are required", 400);

  const user = await User.findById(userId);
  if (!user) throw new ErrorResponse("User not found", 404);

  let found = await Leader.findOne({ username: user.username });

  if (!found) {
    found = new Leader({ username: user.username, score });
    await found.save();

    return res.status(201).json(found);
  }

  found.score = score;
  await found.save();
  await user.updateOne({score});

  res.status(200).json({ message: "Score updated", leader: found });
});
