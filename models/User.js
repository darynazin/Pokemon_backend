import { Schema, model } from 'mongoose';

const RosterSchema = new Schema({
});
 
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  userRoster: [RosterSchema]
});
 
export default model('User', userSchema);