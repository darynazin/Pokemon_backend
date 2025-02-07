import { Schema, model } from "mongoose";

const RosterSchema = new Schema({
  // Define the fields for the roster
});

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userRoster: [RosterSchema],
});

export default model("User", userSchema);
