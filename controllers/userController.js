import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { bucket } from "../config/firebase.js";

// Register a new user
export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const file = req.file;
  let imageUrl = "default-profile.png";

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse("User already exists", 400));
  }

  if (file) {
    try {
      const fileName = `images/${username}/${username}_${Date.now()}.${
        file.mimetype.split("/")[1]
      }`;
      const fileUpload = bucket.file(fileName);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      await new Promise((resolve, reject) => {
        blobStream.on("error", reject);
        blobStream.on("finish", resolve);
        blobStream.end(file.buffer);
      });

      const [signedUrl] = await fileUpload.getSignedUrl({
        action: "read",
        expires: "03-01-2500",
      });

      imageUrl = signedUrl;
    } catch (error) {
      console.error("Firebase Upload Error:", error);
      return next(new ErrorResponse("Image upload failed", 500));
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    image: imageUrl,
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    username: user.username,
    email: user.email,
    id: user._id,
    image: user.image,
  });
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

  res.status(200).json({
    success: true,
    token,
    username: user.username,
    email: user.email,
    image: user.image,
  });
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
  const { pokemon } = req.params;

  if (!pokemon) throw new ErrorResponse("Pokemon is required", 400);

  const user = req.user;

  if (!user) throw new ErrorResponse("User not found", 404);
  const found = user.roster.find((pok) => pok == pokemon);
  if (found) throw new ErrorResponse("Pokemon already added", 400);

  user.roster.push(pokemon);
  await user.save();

  res.status(201).json({
    message: "Pokemon added successfully!",
    user,
  });
});

export const deletePokemonFromUser = asyncHandler(async (req, res) => {
  const { pokemon } = req.params;
  const user = req.user;
  if (!user) throw new ErrorResponse("User not found", 404);

  const index = user.roster.findIndex((pok) => pok == pokemon);
  if (index === -1) throw new ErrorResponse("Pokemon not found", 404);

  user.roster.splice(index, 1);
  await user.save();

  res.status(201).json({
    message: "Pokemon deleted successfully!",
    user,
  });
});

export const getUsersData = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    username: user.username,
    roster: user.roster,
    score: user.score,
    image: user. image,
  });
});
