import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse("User already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  res.status(201).json({ success: true, token });
});

// Login user
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  console.log("Login attempt:", { email, password });

  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not found");
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password match:", isMatch);

  if (!isMatch) {
    console.log("Password does not match");
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = generateToken(user._id);

  res.status(200).json({ success: true, token });
});

// Logout user
export const logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// get all users
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});
