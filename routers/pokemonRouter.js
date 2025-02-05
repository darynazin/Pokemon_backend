import { Router } from 'express';

const pokemonRouter = Router();

pokemonRouter.route('/').get();

export default pokemonRouter;
