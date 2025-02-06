import { Schema, model } from "mongoose";

const LeadersSchema = new Schema({
  username: { type: String, required: true, unique: true},
  score: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now },
});

export default model("Leader", LeadersSchema);
