import { Schema, model } from 'mongoose';

const PokemonSchema = new Schema({
  name: { type: String, required: true },
});
 
export default model('Pokemon', PokemonSchema);