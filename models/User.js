import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roster: [{ type: Number }],
  score: { type: Number, default: 0 },
  image: {
    type: String,
    default:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  },
});

export default model("User", userSchema);
